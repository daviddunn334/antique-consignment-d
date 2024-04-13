import { createFileRoute } from "@tanstack/react-router";
import { UserContext } from "../../components/auth-provider.tsx";
import { useContext } from "react";
import NewItemForm, { NewItemFormData } from "../../components/NewItemForm.tsx";
import { supabase } from "../../lib/supabase.ts";
import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";

export const Route = createFileRoute("/_authenticated/add-item")({
  component: AddItemPage,
  beforeLoad: () => {
    return {
      currentPageTitle: "AddItem",
    };
  },
});

function AddItemPage() {
  const user = useContext(UserContext);
  if (!user) throw new Error("User not found");

  // TODO: Move this logic into the add and update mutation item hooks
  async function createItem(data: NewItemFormData) {
    const createdItem = (
      await supabase
        .from("inventory_item")
        .insert([
          {
            name: data.name,
            price: data.price,
            cost: data.consignerCost,
            description: data.description || "",
            consigner_id: user!.id,
          },
        ])
        .select()
        .single()
        .throwOnError()
    ).data;
    if (!createdItem) throw new Error("Item creation failed");
    let imagePathPromises = data.images.map(
      async (image) =>
        await supabase.storage
          .from("item-images")
          .upload(`${createdItem.id}/${uuid()}`, image),
    );
    let imagePaths = (await Promise.all(imagePathPromises)).map(
      (res) => res.data!.path,
    );
    const { error } = await supabase.from("item_image").upsert(
      imagePaths.map((path) => ({
        item_id: createdItem.id,
        image_path: path,
      })),
    );
    if (error) throw error;
    showAddedAlert();
  }

  function showAddedAlert() {
    const toast = document.getElementById("successToast");
    if (toast) {
      toast.classList.remove("hidden");
      setTimeout(() => {
        toast.classList.add("hidden");
      }, 3000);
    }
  }

  return (
    <>
      <NewItemForm handleData={createItem}></NewItemForm>
      <div className="hidden toast mb-16 lg:mb-0" id="successToast">
        <div className="alert alert-success bg-success/70">
          <span>Item added!</span>
        </div>
      </div>
    </>
  );
}

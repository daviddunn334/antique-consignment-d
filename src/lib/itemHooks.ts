import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./supabase.ts";
import Item from "./models/item.ts";
import { ProductFormData } from "../components/productForm.tsx";
import { User } from "../components/auth-provider.tsx";

export function useMyItems(user: User) {
  return useQuery({
    queryKey: ["myItems"],
    queryFn: async () => {
      const items = (
        await supabase
          .from("inventory_item")
          .select("*")
          .eq("consigner_id", user.id)
          .throwOnError()
      ).data;
      const images =
        (
          await supabase
            .from("item_image")
            .select("item_id, image_path")
            .in("item_id", items?.map((item) => item.id) || [""])
            .throwOnError()
        ).data || [];
      console.log({ items, images });
      return { items, images };
    },
    select: (data): Item[] =>
      data?.items?.map((supaItem) => {
        return {
          id: supaItem.id,
          name: supaItem.name,
          price: supaItem.price,
          consignerCost: supaItem.cost,
          description: supaItem.description,
          imageUrls: data.images
            .filter((img) => img.item_id === supaItem.id)
            .map((img) => img.image_path)
            .map(
              (path) =>
                supabase.storage.from("item-images").getPublicUrl(path).data
                  .publicUrl,
            ),
          soldAt: supaItem.sold_at ? new Date(supaItem.sold_at) : null,
          boothId: supaItem.booth_id || "",
          categories: [],
        };
      }) || [],
  });
}

export function useAddItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ProductFormData & { userId: string }) =>
      await supabase
        .from("inventory_item")
        .insert([
          {
            name: data.name,
            price: data.price,
            cost: data.consignerCost,
            description: data.description,
            consigner_id: data.userId,
          },
        ])
        .select()
        .single()
        .throwOnError(),
    onSuccess: (response) => {
      queryClient.setQueryData(["myItems"], (oldData: any[]) => {
        if (!response.data)
          throw new Error("No data returned from addItemMutation");
        return oldData ? [...oldData, response.data] : [response.data];
      });
      (document.getElementById("addItemModal") as HTMLDialogElement).close();
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export function useEditItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any & { userId: string }) => {
      if (!data.id) throw new Error("Item id is required");
      return supabase
        .from("inventory_item")
        .update({
          id: data.id,
          name: data.name,
          price: data.price,
          cost: data.consignerCost,
          description: data.description,
          consigner_id: data.userId,
          sold_at: data.soldAt,
        })
        .eq("id", data.id)
        .select()
        .single()
        .throwOnError();
    },
    onSuccess: (response) => {
      queryClient.setQueryData(["myItems"], (oldData: any[]) => {
        if (!response.data || !oldData)
          throw new Error(
            "No data returned from editItemMutation, or no data in my items query.",
          );
        const indexOfItem = oldData.findIndex((i) => i.id === response.data.id);
        return [
          ...oldData.slice(0, indexOfItem),
          response.data,
          ...oldData.slice(indexOfItem + 1),
        ];
      });
      (document.getElementById("editItemModal") as HTMLDialogElement).close();
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

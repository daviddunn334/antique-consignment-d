import { createFileRoute } from "@tanstack/react-router";
import { UserContext } from "../../components/auth-provider.tsx";
import { useContext } from "react";
import NewItemForm from "../../components/NewItemForm.tsx";

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

  return (
    <>
      <NewItemForm handleData={(data) => console.log(data)}></NewItemForm>
    </>
  );
}

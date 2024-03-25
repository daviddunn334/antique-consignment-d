import { createFileRoute } from "@tanstack/react-router";
import { UserContext } from "../../components/auth-provider.tsx";
import { useContext } from "react";
import { useMyItems } from "../../lib/itemHooks.ts";

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
  const myItemsQuery = useMyItems(user);

  return <></>;
}

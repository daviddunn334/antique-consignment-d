import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./supabase.ts";
import Item, { getDefaultImage } from "./models/item.ts";
import { ProductFormData } from "../components/productForm.tsx";
import { User } from "../components/auth-provider.tsx";

export function useMyItems(user: User) {
  return useQuery({
    queryKey: ["myItems"],
    queryFn: async () => {
      const data = (
        await supabase
          .from("inventory_item")
          .select("*")
          .eq("consigner_id", user.id)
          .throwOnError()
      ).data;
      data?.forEach(
        (item) => (item.imageUrl = item.imageUrl || getDefaultImage()),
      );
      return data;
    },
    select: (data): Item[] =>
      data?.map((supaItem) => {
        if (!supaItem.imageUrl) throw new Error("No default image set");
        return {
          id: supaItem.id,
          name: supaItem.name,
          price: supaItem.price,
          consignerCost: supaItem.cost,
          description: supaItem.description,
          imageUrl: supaItem.imageUrl,
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
        response.data.imageUrl ??= getDefaultImage();
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
        response.data.imageUrl ??=
          oldData[indexOfItem].imageUrl || getDefaultImage();
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

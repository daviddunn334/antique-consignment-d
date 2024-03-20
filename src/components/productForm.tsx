import {useForm} from "react-hook-form";
import Item from "../lib/models/item.ts";
import {useEffect} from "react";

export type ProductFormData = {
    id: string;
    name: string;
    price: number;
    consignerCost: number;
    description: string;
}

interface ProductFormProps {
    handleData: (data: ProductFormData) => void;
    item?: Item;
}

export default function ProductForm({ handleData, item }: ProductFormProps) {
    const { register, handleSubmit, reset} = useForm<ProductFormData>();

    useEffect(() => {
        if (!item) return;
        reset({
            id: item.id,
            name: item.name,
            price: item.price || 0,
            consignerCost: item.consignerCost || 0,
            description: item.description || "",
        })
    }, [item]);

    return (
        <>
            <form onSubmit={handleSubmit(handleData)} className="flex flex-col gap-4 align-baseline">
                <h2 className="text-xl">{!item ? "Add Item" : "Edit item"}</h2>
                <input type="text" className="hidden invisible"
                       {...register("id")} />
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Name" required
                           {...register("name")} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="number" className="grow" placeholder="Price (to customer)" required
                        step=".01" min="0"
                        {...register("price")} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="number" className="grow" placeholder="Cost (to you)" required
                           step=".01" min="0"
                           {...register("consignerCost")} />
                </label>
                <label className="">
                    <textarea rows={3} className="textarea input-bordered grow w-full" placeholder="Description"
                        {...register("description")} />
                </label>
                <button type="submit" className="btn btn-primary text-primary-content">{!item ? "Add Item" : "Save changes"}</button>
            </form>
        </>
    )
}
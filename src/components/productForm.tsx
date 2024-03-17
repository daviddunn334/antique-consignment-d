import {useForm} from "react-hook-form";

export type ProductFormData = {
    name: string;
    price?: number;
    consignerCost?: number;
    description?: string;
}

export default function ProductForm({ handleData }: { handleData: (data: ProductFormData) => void }) {

    const { register, handleSubmit} = useForm<ProductFormData>();

    return (
        <>
            <form onSubmit={handleSubmit(handleData)} className="flex flex-col gap-4">
                <h2 className="text-xl">Add Item</h2>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Name" required
                        {...register("name")} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="number" className="grow" placeholder="Price (to customer)"
                        step=".01" min="0"
                        {...register("price")} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="number" className="grow" placeholder="Cost (to you)"
                           step=".01" min="0"
                           {...register("consignerCost")} />
                </label>
                <label className="">
                    <textarea rows={3} className="textarea input-bordered grow w-full" placeholder="Description"
                        {...register("description")} />
                </label>
                <button type="submit" className="btn btn-primary">Add Item</button>
            </form>
        </>
    )
}
import { useForm } from "react-hook-form";

export type NewItemFormData = {
  id: string;
  name: string;
  price: number;
  consignerCost: number;
  description: string;
};

interface NewItemFormProps {
  handleData: (data: NewItemFormData) => void;
}

export default function NewItemForm({ handleData }: NewItemFormProps) {
  const { register, handleSubmit } = useForm<NewItemFormData>();

  return (
    <>
      <form
        onSubmit={handleSubmit(handleData)}
        className="flex flex-col gap-4 align-baseline"
      >
        <input type="text" className="hidden invisible" {...register("id")} />
        <input type="file" accept="image/*" capture="environment" />
        <label className="form-control w-full">
          <span className="label">Item name</span>
          <input
            type="text"
            placeholder="An amazing item!"
            className="input input-bordered"
          />
        </label>
        <label className="form-control w-full">
          <span className="label">Price tag</span>
          <input
            type="number"
            className="input input-bordered"
            placeholder="0.00"
            required
            step=".01"
            min="0"
            {...register("price")}
          />
        </label>
        <label className="form-control w-full">
          <span className="label">Cost to you</span>
          <input
            type="number"
            className="input input-bordered"
            placeholder="0.00"
            required
            step=".01"
            min="0"
            {...register("consignerCost")}
          />
        </label>
        <label className="form-control w-full">
          <span className="label">Description</span>
          <textarea
            rows={3}
            className="textarea"
            placeholder="The story of this item (optional)"
            {...register("description")}
          />
        </label>
        <div className="w-full flex justify-between gap-4 sm:gap-6">
          <button
            type="button"
            className="btn btn-outline btn-error bg-error/20 text-primary-content flex-1 max-w-80"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary text-primary-content flex-1 max-w-80"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}

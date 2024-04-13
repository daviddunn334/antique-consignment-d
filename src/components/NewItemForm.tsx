import ImagesUpload from "./form/images-upload.tsx";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";

export type NewItemFormData = {
  id: string;
  images: File[];
  name: string;
  price: number;
  consignerCost: number;
  description: string;
};

interface NewItemFormProps {
  handleData: (data: NewItemFormData) => void;
}

export default function NewItemForm({ handleData }: NewItemFormProps) {
  const [images, setImages] = useState<File[]>([]);
  const form = useForm<NewItemFormData>({
    onSubmit: async ({ value }) => {
      handleData(value);
    },
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
        className="flex flex-col gap-4 align-baseline"
      >
        <form.Field
          name="id"
          children={(field) => (
            <input
              type="text"
              className="hidden invisible"
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        />
        <form.Field
          name="images"
          children={(field) => (
            <ImagesUpload
              images={images}
              addImages={(newImages) => {
                let newState = [...images, ...newImages];
                setImages(newState);
                field.handleChange(newState);
              }}
              removeImage={(image) => {
                let newState = images.filter((i) => i !== image);
                setImages(newState);
                field.handleChange(newState);
              }}
            ></ImagesUpload>
          )}
        />
        <form.Field
          name="name"
          children={(field) => (
            <label className="form-control w-full">
              <span className="label">Item name</span>
              <input
                type="text"
                placeholder="An amazing item!"
                className="input input-bordered"
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </label>
          )}
        />
        <form.Field
          name="price"
          children={(field) => (
            <label className="form-control w-full">
              <span className="label">Price tag</span>
              <input
                type="number"
                className="input input-bordered"
                placeholder="0.00"
                required
                step=".01"
                min="0"
                onChange={(e) => field.handleChange(parseFloat(e.target.value))}
              />
            </label>
          )}
        />
        <form.Field
          name="consignerCost"
          children={(field) => (
            <label className="form-control w-full">
              <span className="label">Cost to you</span>
              <input
                type="number"
                className="input input-bordered"
                placeholder="0.00"
                required
                step=".01"
                min="0"
                onChange={(e) => field.handleChange(parseFloat(e.target.value))}
              />
            </label>
          )}
        />
        <form.Field
          name="description"
          children={(field) => (
            <label className="form-control w-full">
              <span className="label">Description</span>
              <textarea
                rows={3}
                className="textarea"
                placeholder="The story of this item (optional)"
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </label>
          )}
        />
        <div className="mt-2 w-full flex justify-between gap-4 sm:gap-6">
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

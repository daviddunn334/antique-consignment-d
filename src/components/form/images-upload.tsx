import { CameraIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ImagesUpload({
  images,
  addImages,
  removeImage,
}: {
  images: File[];
  addImages: (images: File[]) => void;
  removeImage: (image: File) => void;
}) {
  return (
    <div className="flex gap-4 overflow-x-scroll lg:flex-wrap pt-2.5 no-scrollbar">
      {images.map((image: File) => (
        <figure className="relative" key={image.name}>
          <img
            key={image.name}
            src={URL.createObjectURL(image)}
            alt={image.name}
            className="card h-32 sm:h-40 md:h-48 lg:h-56 aspect-square shadow object-cover"
          />
          <button
            className="absolute -top-2.5 -right-2.5 p-1 bg-error text-error-content rounded-full"
            onClick={() => removeImage(image)}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </figure>
      ))}
      <label className="h-32 sm:h-40 md:h-48 lg:h-56">
        <div className="card h-full aspect-square shadow bg-primary/70 border-dashed border-primary-content/20 border-2">
          <CameraIcon className="w-12 h-12 m-auto text-primary-content/70" />
        </div>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          multiple={true}
          className="hidden"
          onChange={(e) => {
            addImages(Array.from(e.target.files || []));
          }}
        />
      </label>
    </div>
  );
}

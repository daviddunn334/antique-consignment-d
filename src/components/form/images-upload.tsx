import { CameraIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function ImagesUpload() {
  const [images, setImages] = useState<File[]>([]);

  return (
    <div className="flex gap-4 overflow-x-scroll lg:flex-wrap">
      {images.map((image: File) => (
        <img
          key={image.name}
          src={URL.createObjectURL(image)}
          alt={image.name}
          className="card h-32 sm:h-40 md:h-48 lg:h-56 aspect-square shadow"
        />
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
            setImages(Array.from(e.target.files || []));
          }}
        />
      </label>
    </div>
  );
}

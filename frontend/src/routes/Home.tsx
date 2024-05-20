import { useEffect, useState } from "react";
import { imagesService } from "../services";
import { IImage } from "../types";

export default function Home() {
  const [images, setImages] = useState<IImage[] | null>(null);

  useEffect(() => {
    (async () => {
      const res = await imagesService.get<IImage[]>("/images");
      setImages(res.data);
    })();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[500px] flex py-12 flex-col gap-12">
        {images?.map((img) => (
          <div key={img.id} className="flex flex-col gap-4">
            <div className="flex gap-3 items-center font-bold w-full">
              <p className="min-w-max">{img.name}</p>
              <div className="bg-zinc-800 h-[6px] w-full rounded-xl mt-1"></div>
            </div>
            <div className="aspect-square bg-zinc-950 rounded-xl overflow-hidden flex items-center">
              <img
                src={img.url}
                alt={img.description}
                className="w-full object-cover"
              />
            </div>
            <div className="bg-zinc-800 rounded-xl py-4 px-3">
              {img.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState, useCallback } from "react";
import { ImageLightbox } from "./ImageLightbox";
import { AnimatedImage } from "./motion";

interface InteractivePhotoGridProps {
  photos: { src: string; alt: string }[];
  columns?: 2 | 3;
}

export function InteractivePhotoGrid({ photos, columns = 3 }: InteractivePhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const isOpen = lightboxIndex >= 0;

  const close = useCallback(() => setLightboxIndex(-1), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i <= 0 ? photos.length - 1 : i - 1)),
    [photos.length]
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i >= photos.length - 1 ? 0 : i + 1)),
    [photos.length]
  );

  const gridCols =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      <div className={`grid ${gridCols} gap-4`}>
        {photos.map((img, index) => (
          <div
            key={index}
            className="group relative aspect-[4/3] overflow-hidden bg-[var(--color-stone)] cursor-pointer"
            onClick={() => setLightboxIndex(index)}
          >
            <AnimatedImage
              src={img.src}
              alt={img.alt}
              fill
              sizes={columns === 2 ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </div>
        ))}
      </div>

      <ImageLightbox
        images={photos}
        currentIndex={isOpen ? lightboxIndex : 0}
        isOpen={isOpen}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </>
  );
}

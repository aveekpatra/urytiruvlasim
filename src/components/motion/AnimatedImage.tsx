"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type AnimatedImageProps = ImageProps & {
  wrapperClassName?: string;
};

// Same fade + blur and easing as Reveal, without the rise. Set inline so a
// caller's transition classes (hover zooms) can't drop the fade.
const EASE = "cubic-bezier(0.33, 1, 0.68, 1)";
const TRANSITION = `opacity 1100ms ${EASE}, filter 1100ms ${EASE}, transform 700ms ${EASE}`;

export function AnimatedImage({
  className,
  wrapperClassName,
  onLoad,
  style,
  ...props
}: AnimatedImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      style={{ transition: TRANSITION, ...style }}
      className={cn(
        loaded ? "opacity-100 blur-0" : "opacity-0 blur-[10px]",
        className
      )}
      onLoad={(e) => {
        setLoaded(true);
        if (onLoad) onLoad(e);
      }}
    />
  );
}

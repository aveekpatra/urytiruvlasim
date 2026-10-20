"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type AnimatedImageProps = ImageProps & {
  wrapperClassName?: string;
};

export function AnimatedImage({
  className,
  wrapperClassName,
  onLoad,
  ...props
}: AnimatedImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      className={cn(
        // Same fade + blur and easing as Reveal, without the rise.
        "transition-[opacity,filter] duration-[1100ms] ease-[cubic-bezier(0.33,1,0.68,1)]",
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

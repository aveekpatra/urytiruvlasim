import { optimizedSrc } from "./images";

/* next/image loader: picks the pre-built WebP for the requested width
   (see scripts/optimize-media.mjs), so Vercel never resizes anything. */
export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
}): string {
  return optimizedSrc(src, width) ?? src;
}

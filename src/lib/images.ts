/**
 * Local restaurant images — professional photography by JHK
 * Served from jsDelivr's free GitHub CDN instead of Vercel, pinned to the
 * commit that holds the files so browsers and the CDN can cache them forever.
 * After changing anything in public/: run `npm run optimize-media`, commit
 * and push, then set MEDIA_COMMIT to that commit. Dev serves public/ locally.
 */

const MEDIA_COMMIT = "02a5771159394e6f2739457a079b41a9759045cd";

const CDN_BASE =
  process.env.NODE_ENV === "development"
    ? ""
    : `https://cdn.jsdelivr.net/gh/aveekpatra/urytiruvlasim@${MEDIA_COMMIT}/public`;

/** Prefix any /public path with the media CDN */
export function cdn(path: string): string {
  return `${CDN_BASE}${path}`;
}

/** Widths built by scripts/optimize-media.mjs */
export const MEDIA_WIDTHS = [640, 1280, 1920];

/**
 * The WebP copy of a /public/images file at the smallest built width that
 * covers `width`. Returns null for anything that has no built copies.
 */
export function optimizedSrc(src: string, width: number): string | null {
  const match = src.match(/^(.*)\/images\/(.+)\.(jpe?g|png)$/i);
  if (!match || match[1] !== CDN_BASE) return null;
  const built =
    MEDIA_WIDTHS.find((w) => w >= width) ?? MEDIA_WIDTHS[MEDIA_WIDTHS.length - 1];
  return cdn(`/media/images/${match[2]}-${built}.webp`);
}

export const IMAGES = {
  // Hero Section - Local video
  hero: {
    video: cdn("/media/bg.mp4"),
    poster: cdn("/media/bg-poster.webp"),
    fallback: cdn("/images/JHK09411-Enhanced-NR.jpg"),
  },

  // About Section - Restaurant Interior
  about: {
    interior: cdn("/images/JHK09424-Enhanced-NR.jpg"),
  },

  // Wedding / Events Section
  wedding: {
    background: cdn("/images/JHK09458-Enhanced-NR.jpg"),
    gallery: [
      cdn("/images/JHK09452-Enhanced-NR.jpg"),
      cdn("/images/JHK09524.jpg"),
      cdn("/images/JHK09458-Enhanced-NR.jpg"),
      cdn("/images/JHK09408-Enhanced-NR-Edit.jpg"),
    ],
  },

  // Home page gallery grid
  gallery: [
    {
      src: cdn("/images/castle-2.jpeg"),
      alt: "Zámek Vlašim — panorama",
      span: "col-span-2 row-span-2",
    },
    {
      src: cdn("/images/JHK09458-Enhanced-NR.jpg"),
      alt: "Restaurace — slavnostní tabule",
      span: "col-span-1",
    },
    {
      src: cdn("/images/dishes/JHK09557.jpg"),
      alt: "Hovězí biftek s pepřovou omáčkou",
      span: "col-span-1",
    },
    {
      src: cdn("/images/JHK09524.jpg"),
      alt: "Venkovní terasa",
      span: "col-span-1 row-span-2",
    },
    {
      src: cdn("/images/dishes/JHK09591.jpg"),
      alt: "Crème brûlée s čerstvým ovocem",
      span: "col-span-1",
    },
    {
      src: cdn("/images/JHK09380.jpg"),
      alt: "Květiny na baru",
      span: "col-span-1",
    },
    {
      src: cdn("/images/drinks/JHK09520-Enhanced-NR.jpg"),
      alt: "Pivo U Blanických rytířů",
      span: "col-span-1",
    },
    {
      src: cdn("/images/JHK09347.jpg"),
      alt: "Rytířská zbroj",
      span: "col-span-1",
    },
  ],

  // Open Graph / Social sharing
  og: cdn("/images/JHK09408-Enhanced-NR-Edit.jpg"),
};

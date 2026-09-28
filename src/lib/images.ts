/**
 * Local restaurant images — professional photography by JHK
 * Served from GitHub raw to reduce Vercel CDN bandwidth costs.
 */

const CDN_BASE =
  "https://raw.githubusercontent.com/aveekpatra/urytiruvlasim/master/public";

/** Prefix any /public path with GitHub raw CDN */
export function cdn(path: string): string {
  return `${CDN_BASE}${path}`;
}

export const IMAGES = {
  // Hero Section - Local video
  hero: {
    video: cdn("/bg.mp4"),
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

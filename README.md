# U Blanickych rytiru

Website for U Blanickych rytiru, the restaurant in Vlasim castle. Live at [www.urytiruvlasim.cz](https://www.urytiruvlasim.cz).

The site is in Czech. Staff update the daily lunch menu and handle table reservations from an admin page.

## Pages

- `/`: hero with video, about the restaurant, today's lunch menu, weddings, gallery
- `/menu`: full food and drinks menu
- `/rezervace`: table reservation form
- `/svatby`: weddings and events
- `/galerie`: photo gallery with lightbox
- `/kontakt`: address, opening hours, contact details
- `/admin`: password login, daily menu editor with version history and PDF preview, reservation list with confirm and reject

## How reservations work

1. A guest submits the form on `/rezervace`. `POST /api/reservation` saves it in Convex as `pending` and emails the restaurant.
2. Staff confirm or reject it in `/admin`. `/api/reservation/confirm` and `/api/reservation/reject` update the status and email the guest.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Convex for data (daily menus, menu history, reservations, admin sessions)
- Nodemailer over SMTP for reservation emails
- `@react-pdf/renderer` for the daily menu PDF
- Tailwind CSS 4, Framer Motion, Hugeicons

## Getting started

```bash
npm install
npx convex dev   # in one terminal; creates the Convex deployment and .env.local
npm run dev      # in another terminal
```

Open http://localhost:3000.

Environment variables in `.env.local` (Next.js):

- `NEXT_PUBLIC_CONVEX_URL`
- `SMTP_HOST` (defaults to `smtp.seznam.cz`)
- `SMTP_PORT` (defaults to `465`)
- `SMTP_USER`
- `SMTP_PASS`

Set in the Convex dashboard (Convex environment):

- `ADMIN_PASSWORD`

## Project structure

```
convex/                 schema and functions: dailyMenu, reservations, auth
src/app/                routes, admin page, api/reservation routes, sitemap, robots
src/components/sections page sections (hero, about, daily menu, weddings, gallery, footer)
src/components/admin/   login, menu editor, reservation panel
src/lib/                restaurant info, full menu data, email templates, image paths
public/                 photos, logo, hero video
```

## Deployment

The Next.js app runs on Vercel. Deploy the Convex backend separately with `npx convex deploy`.

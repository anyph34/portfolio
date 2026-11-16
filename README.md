# FindMyHome and Anyph Kipngetich's portfolio

This repository contains the portfolio site and the FindMyHome rental marketplace. FindMyHome is the homepage on Vercel; the GitHub Pages build keeps the portfolio at `/portfolio/` and also exports a marketplace preview at `/portfolio/findmyhome/`.

## FindMyHome

The app supports property search by area, type, availability, and rent; property details; viewing requests; and a landlord dashboard for creating listings, uploading photos, and marking homes occupied or available. Occupied homes cannot accept viewing requests.

Without `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, the app runs in demo mode. Sample listings and landlord changes are stored only in the current browser and are not shared or durable across devices. The app labels this mode clearly. Demo photos are limited to 650 KB each to fit browser storage.

To enable shared listings and landlord accounts:

1. Configure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the Vercel project's environment variables. Use only the public anon/publishable key in browser code; never use a service-role key.
2. Apply `supabase/migrations/003_findmyhome_marketplace.sql` to the Supabase project.
3. Configure Supabase Auth's site URL and redirect allowlist for the deployed Vercel domain.
4. Redeploy after setting environment variables.

The marketplace migrations use row-level security for landlord-owned listings and private viewing-request details. Migrations `001` and `002` are retained as historical database migrations so an existing Supabase migration history is not rewritten; the FindMyHome application no longer uses their business-management tables.

The existing Vercel project/domain is `https://biasharadesk.vercel.app`. GitHub pushes to the connected `main` branch should trigger its deployment. The project name and URL are controlled in Vercel and are not changed by this repository.

## Portfolio and StockPilot AI

The responsive portfolio includes Home, About, Projects, and Contact pages. The FindMyHome project case study links to the marketplace deployment. StockPilot AI remains a separate portfolio project with its dedicated `/stockpilot/` landing page and `/stockpilot/dashboard/` sample dashboard; its data is a demo and is not connected to a live inventory service.

The GitHub Pages site is `https://anyph34.github.io/portfolio/`. Its workflow builds a static export and does not change the Vercel app's runtime behavior.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root page is the portfolio locally; open `/findmyhome/` for the marketplace.

## Portfolio details

- The contact form submits to FormSubmit at `anyphbett9@gmail.com`.
- The About page uses `public/assets/profile.jpg`.
- The CV is served from `public/assets/Anyph_Kipngetich_CV.pdf`.
- `.env.example` contains placeholders only. Keep real credentials in ignored local environment files or hosting settings.

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

The GitHub Pages export can be checked with:

```powershell
$env:GITHUB_PAGES = "true"
npm run build
Remove-Item Env:GITHUB_PAGES
```

# Anyph Kipngetich - Developer Portfolio

A responsive, editorial-style portfolio built with Next.js 16, React, TypeScript, and Tailwind CSS. It includes Home, About, Projects, and Contact pages and highlights BiasharaDesk as a flagship case study.

## GitHub Pages

The GitHub Actions workflow builds and deploys a static export. In the repository settings, open **Settings -> Pages** and set the build and deployment source to **GitHub Actions**. The project site URL is `https://anyph34.github.io/portfolio/`.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form

The contact form submits directly to FormSubmit at `anyphbett9@gmail.com`, so it works on the static GitHub Pages deployment without an API key. FormSubmit may email the recipient a one-time activation request before the first message is delivered.

## BiasharaDesk interface

BiasharaDesk is deployed as a separate Vercel project at [biasharadesk.vercel.app](https://biasharadesk.vercel.app/login). The Home and Projects buttons open its sign-in page in a new tab. To enable sign-in and registration, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the Vercel project's environment variables, then redeploy. Set the Supabase Auth site URL to `https://biasharadesk.vercel.app` and add the Vercel app URL to its redirect allowlist. For the GitHub Pages build, add the same values as repository Actions secrets and allow `https://anyph34.github.io/portfolio/` in Supabase. Do not paste credentials into source files or commit them.

## Profile avatar

The About page uses `public/assets/profile.jpg`, the provided portrait image.

## CV

The CV is served from `public/assets/Anyph_Kipngetich_CV.pdf` and includes a clickable LinkedIn profile link.

## Quality checks

```bash
npm run lint
npm run build
```

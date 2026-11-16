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

The Home and Projects pages link directly to the hosted BiasharaDesk sign-in interface at `/login/`; visitors do not need to open the source repository to view it. To enable account sign-in and registration on GitHub Pages, add repository Actions secrets named `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, then redeploy. Configure the Supabase Auth site URL and redirect allowlist for `https://anyph34.github.io/portfolio/`. Do not paste credentials into source files or commit them.

## Profile avatar

The About page uses `public/assets/profile.jpg`, the provided portrait image.

## CV

The CV is served from `public/assets/Anyph_Kipngetich_CV.pdf` and includes a clickable LinkedIn profile link.

## Quality checks

```bash
npm run lint
npm run build
```

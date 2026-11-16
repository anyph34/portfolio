# Anyph Kipngetich - Developer Portfolio

A responsive, editorial-style portfolio built with Next.js 16, React, TypeScript, and Tailwind CSS. It includes Home, About, Projects, and Contact pages and highlights BiasharaDesk as a flagship case study.

## GitHub Pages

The GitHub Actions workflow builds and deploys a static export. In the repository settings, open **Settings -> Pages** and set the build and deployment source to **GitHub Actions**. The project site URL is `https://anyph34.github.io/new-respiratory/`.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form

The contact form submits directly to FormSubmit at `anyphbett9@gmail.com`, so it works on the static GitHub Pages deployment without an API key. FormSubmit may email the recipient a one-time activation request before the first message is delivered.

## Profile avatar

The About page uses a self-contained SVG avatar, so there is no image file or external asset to configure.

## Quality checks

```bash
npm run lint
npm run build
```

# Anyph Kipngetich - Developer Portfolio

A responsive, editorial-style portfolio built with Next.js 16, React, TypeScript, and Tailwind CSS. It includes Home, About, Projects, and Contact pages and highlights BiasharaDesk as a flagship case study.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form setup

The contact form uses Web3Forms. Create a free access key for `anyphbett9@gmail.com`, then set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env.local` and in the deployment provider's environment settings. Restart or redeploy after setting the key. Without it, the form explains that it is not connected and direct email remains available.

## Quality checks

```bash
npm run lint
npm run build
```

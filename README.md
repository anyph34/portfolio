# BiasharaDesk

BiasharaDesk is a Next.js app for Kenyan businesses. Supabase provides email/password authentication and the PostgreSQL database.

## Connect Supabase

1. Create a Supabase project.
2. In the Supabase SQL Editor, run `supabase/migrations/001_initial_schema.sql`, then `supabase/migrations/002_auth_and_tenant_policies.sql`.
3. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to your project's URL and publishable (or legacy anon) key.
4. In Supabase Authentication settings, enable email/password sign-in and set `http://localhost:3000` as a local redirect URL.

The registration form creates an auth user. A database trigger saves the user's profile and business, including when email confirmation is required. Row-level security policies restrict business records to their owner. Users can be viewed in the Supabase dashboard under **Authentication → Users**.

## Run locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Run the project checks with:

```bash
npm run lint
npm run build
```

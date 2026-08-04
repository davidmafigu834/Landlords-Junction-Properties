# Landlords Junction Properties

**Landlords Junction Properties** is a property stewardship company based in Bulawayo, Zimbabwe.

**Tagline:** Trusted steward of property wealth  
**Motto:** Steward property wealth with trust and discipline

We protect and grow property wealth through disciplined advice, ethical execution, and accountable service — treating every property as a lasting asset, not inventory.

This repository is the company website and agent portal.

## What it does

**Public website**
- Browse homes, apartments, land, commercial property, and farms for sale or to let
- Search by suburb, city, price, and property type across Bulawayo and beyond
- Meet the agents and explore area guides
- Read stewardship-minded market insights
- Enquire about a property, get in touch, or request a market assessment

**Agent & admin portal** (`/login`)
- Agents sign in to add and update their listings
- Admins manage agents and oversee published stock

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript + Tailwind CSS
- [Supabase](https://supabase.com/) — database, authentication, and image storage
- [SegmiQ](https://segmiq.com) — CRM lead intake for agents (optional)

## Getting started

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Add your Supabase keys to `.env.local`, then run the SQL in [`supabase/migrations/001_initial.sql`](supabase/migrations/001_initial.sql) in the Supabase SQL Editor.  
Optional demo data: `node scripts/seed-supabase.mjs`

Without Supabase credentials, the public site still runs on built-in demo listings.

### SegmiQ (agent lead management)

1. In SegmiQ, open (or create) the Landlords Junction Properties client (`business_type = real_estate`).
2. Add agents with phones that match LJP agent phones (used for assignment).
3. Optionally set listing `external_reference` to the LJP property **slug**.
4. In **Client Settings → Website Integration**, click **Generate key** and copy `sk_live_…`.
5. Add to `.env.local`:

```
SEGMIQ_API_URL=https://your-segmiq-host
SEGMIQ_WEBSITE_API_KEY=sk_live_…
```

Website forms then forward enquiries to SegmiQ while still saving to Supabase when configured.

## Project layout

| Path | Purpose |
|------|---------|
| `src/app` | Pages (home, properties, agents, areas, news, contact, sell, dashboard) |
| `src/components` | UI building blocks |
| `src/lib` | Brand constants, data queries, auth helpers, Supabase clients |
| `supabase/` | Database migration and seed SQL |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint |

## Licence

Private project for Landlords Junction Properties.

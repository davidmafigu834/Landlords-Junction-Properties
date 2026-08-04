# Landlords Junction Properties

**Landlords Junction Properties** is a real estate agency based in Bulawayo, Zimbabwe.  
Tagline: *The confluence of buyers and sellers.*

This repository is the company website and agent portal — a place for buyers, sellers, and tenants to browse listings, and for agents to manage properties online.

## What it does

**Public website**
- Browse homes, apartments, land, commercial property, and farms for sale or to let
- Search by suburb, city, price, and property type across Bulawayo and beyond
- Meet the agents and explore area guides
- Read market news and tips
- Enquire about a property, get in touch, or request a sale / market assessment

**Agent & admin portal** (`/login`)
- Agents sign in to add and update their listings
- Admins manage agents and oversee published stock

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript + Tailwind CSS
- [Supabase](https://supabase.com/) — database, authentication, and image storage

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

## Project layout

| Path | Purpose |
|------|---------|
| `src/app` | Pages (home, properties, agents, areas, news, contact, sell, dashboard) |
| `src/components` | UI building blocks |
| `src/lib` | Data queries, auth helpers, Supabase clients |
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

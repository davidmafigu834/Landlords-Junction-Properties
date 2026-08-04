-- Seed data for Landlords Junction Properties.
-- Prefer: node scripts/seed-supabase.mjs
-- That script also creates agent auth users + properties (profiles require auth.users).
--
-- Areas & posts below can be run in the Supabase SQL Editor if needed.

insert into public.areas (slug, name, description, image_url, city) values
  ('bulawayo', 'Bulawayo', 'Zimbabwe''s City of Kings — established suburbs, strong rental demand, and a property market shaped by industry, education, and growing diaspora investment.', 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1400&q=80', 'Bulawayo'),
  ('harare', 'Harare', 'The capital''s northern suburbs continue to set national pricing benchmarks, with demand shaped by employment concentration and suburb-level differentiation.', 'https://images.unsplash.com/photo-1449844908441-882987f99da4?auto=format&fit=crop&w=1400&q=80', 'Harare'),
  ('hillside', 'Hillside', 'Leafy, established, and consistently sought-after — Hillside remains one of Bulawayo''s most trusted addresses for family living.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 'Bulawayo'),
  ('ascot', 'Ascot', 'Central convenience with solid stock — Ascot attracts buyers who want proximity without sacrificing a suburban feel.', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', 'Bulawayo')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  image_url = excluded.image_url,
  city = excluded.city;

insert into public.posts (slug, title, excerpt, body, cover_image, published_at) values
  (
    'buying-costs-in-zimbabwe',
    'How much does it cost to buy property in Zimbabwe?',
    'Transfer fees, agent commission, and the extras buyers often overlook when purchasing in Bulawayo and Harare.',
    'Buying property in Zimbabwe is still largely a USD-denominated journey. Beyond the purchase price, budget for conveyancing, stamp duties where applicable, and agency fees.

In Bulawayo, well-presented homes in Hillside, Ascot and Parklands continue to move when priced against recent comparable sales — not aspirational asking prices.

Landlords Junction Properties walks every buyer through a clear cost sheet before you commit.',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80',
    '2026-02-13T00:00:00.000Z'
  ),
  (
    'affordable-suburbs-bulawayo',
    'Affordable suburbs worth watching in Bulawayo',
    'Where value still exists for first-time buyers and landlords building a rental portfolio.',
    'Not every strong suburb carries a premium price tag. Emerging pockets around greater Bulawayo offer rental yields that reward patient landlords.

We look at stock quality, infrastructure, and tenant demand — then shortlist streets that punch above their price band.',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
    '2026-04-07T00:00:00.000Z'
  ),
  (
    'pricing-your-home-to-sell',
    'Pricing your home to sell in today''s market',
    'A practical valuation mindset for sellers who want serious buyers, not months of tyre-kickers.',
    'Overpricing is the most expensive mistake a seller can make. In Bulawayo''s selective market, buyers compare relentlessly.

A market assessment from Landlords Junction Properties anchors your asking price to active demand — so you sell with confidence, not guesswork.',
    'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1000&q=80',
    '2026-05-21T00:00:00.000Z'
  )
on conflict (slug) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  body = excluded.body,
  cover_image = excluded.cover_image,
  published_at = excluded.published_at;

-- Properties need real profiles.id values (auth users). Use:
--   node scripts/seed-supabase.mjs

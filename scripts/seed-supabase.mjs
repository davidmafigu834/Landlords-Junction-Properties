/**
 * Seeds Supabase from the demo data in src/lib/data/seed.ts (inline copy).
 * Usage: node scripts/seed-supabase.mjs
 *
 * Creates agent auth users + profiles, then areas, posts, and properties.
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  const text = readFileSync(path, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const AGENT_PASSWORD = process.env.SEED_AGENT_PASSWORD || "DemoAgent123!";

const img = {
  house1:
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  house2:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  house3:
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
  house4:
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
  land: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
  apartment:
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
  commercial:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  farm: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
  byo: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1400&q=80",
  harare:
    "https://images.unsplash.com/photo-1449844908441-882987f99da4?auto=format&fit=crop&w=1400&q=80",
  agent1:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  agent2:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
  agent3:
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  news1:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80",
  news2:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80",
  news3:
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1000&q=80",
};

const agents = [
  {
    id: "a1111111-1111-1111-1111-111111111111",
    name: "Thandi Ncube",
    email: "thandi@landlordsjunction.co.zw",
    role: "AGENT",
    phone: "+263 77 123 4567",
    title: "Principal Agent",
    bio: "Bulawayo-born and market-obsessed, Thandi has guided families and investors across Matabeleland for over a decade.",
    image_url: img.agent1,
    active: true,
    slug: "thandi-ncube",
  },
  {
    id: "a2222222-2222-2222-2222-222222222222",
    name: "Brian Dube",
    email: "brian@landlordsjunction.co.zw",
    role: "AGENT",
    phone: "+263 71 987 6543",
    title: "Residential Specialist",
    bio: "Brian specialises in family homes across Hillside, Ascot and Parklands — matching buyers to the right street, not just the right listing.",
    image_url: img.agent2,
    active: true,
    slug: "brian-dube",
  },
  {
    id: "a3333333-3333-3333-3333-333333333333",
    name: "Rudo Moyo",
    email: "rudo@landlordsjunction.co.zw",
    role: "AGENT",
    phone: "+263 78 555 0199",
    title: "Commercial & Land",
    bio: "From vacant stands to warehouse stock, Rudo helps landlords unlock commercial value across Bulawayo and surrounds.",
    image_url: img.agent3,
    active: true,
    slug: "rudo-moyo",
  },
];

const areas = [
  {
    slug: "bulawayo",
    name: "Bulawayo",
    city: "Bulawayo",
    image_url: img.byo,
    description:
      "Zimbabwe's City of Kings — established suburbs, strong rental demand, and a property market shaped by industry, education, and growing diaspora investment.",
  },
  {
    slug: "harare",
    name: "Harare",
    city: "Harare",
    image_url: img.harare,
    description:
      "The capital's northern suburbs continue to set national pricing benchmarks, with demand shaped by employment concentration and suburb-level differentiation.",
  },
  {
    slug: "hillside",
    name: "Hillside",
    city: "Bulawayo",
    image_url: img.house2,
    description:
      "Leafy, established, and consistently sought-after — Hillside remains one of Bulawayo's most trusted addresses for family living.",
  },
  {
    slug: "ascot",
    name: "Ascot",
    city: "Bulawayo",
    image_url: img.house1,
    description:
      "Central convenience with solid stock — Ascot attracts buyers who want proximity without sacrificing a suburban feel.",
  },
];

const posts = [
  {
    slug: "buying-costs-in-zimbabwe",
    title: "How much does it cost to buy property in Zimbabwe?",
    excerpt:
      "Transfer fees, agent commission, and the extras buyers often overlook when purchasing in Bulawayo and Harare.",
    body: `Buying property in Zimbabwe is still largely a USD-denominated journey. Beyond the purchase price, budget for conveyancing, stamp duties where applicable, and agency fees.

In Bulawayo, well-presented homes in Hillside, Ascot and Parklands continue to move when priced against recent comparable sales — not aspirational asking prices.

Landlords Junction Properties walks every buyer through a clear cost sheet before you commit.`,
    cover_image: img.news1,
    published_at: "2026-02-13T00:00:00.000Z",
  },
  {
    slug: "affordable-suburbs-bulawayo",
    title: "Affordable suburbs worth watching in Bulawayo",
    excerpt:
      "Where value still exists for first-time buyers and landlords building a rental portfolio.",
    body: `Not every strong suburb carries a premium price tag. Emerging pockets around greater Bulawayo offer rental yields that reward patient landlords.

We look at stock quality, infrastructure, and tenant demand — then shortlist streets that punch above their price band.`,
    cover_image: img.news2,
    published_at: "2026-04-07T00:00:00.000Z",
  },
  {
    slug: "pricing-your-home-to-sell",
    title: "Pricing your home to sell in today's market",
    excerpt:
      "A practical valuation mindset for sellers who want serious buyers, not months of tyre-kickers.",
    body: `Overpricing is the most expensive mistake a seller can make. In Bulawayo's selective market, buyers compare relentlessly.

A market assessment from Landlords Junction Properties anchors your asking price to active demand — so you sell with confidence, not guesswork.`,
    cover_image: img.news3,
    published_at: "2026-05-21T00:00:00.000Z",
  },
];

const properties = [
  {
    slug: "3-bedroom-house-hillside",
    title: "3 Bedroom House For Sale in Hillside",
    description:
      "A sunlit family home on a quiet Hillside avenue with mature gardens, staff quarters, and a double garage. Ideal for buyers seeking established Bulawayo living.",
    status: "FOR_SALE",
    type: "HOUSE",
    price: 185000,
    currency: "USD",
    beds: 3,
    baths: 2,
    size_sqm: 280,
    suburb: "Hillside",
    city: "Bulawayo",
    featured: true,
    on_show: true,
    published: true,
    images: [img.house1, img.house2],
    agent_id: agents[0].id,
  },
  {
    slug: "4-bedroom-house-ascot",
    title: "4 Bedroom House For Sale in Ascot",
    description:
      "Spacious Ascot residence with open-plan living, borehole, solar-ready roof, and a landscaped yard perfect for entertaining.",
    status: "FOR_SALE",
    type: "HOUSE",
    price: 245000,
    currency: "USD",
    beds: 4,
    baths: 3,
    size_sqm: 360,
    suburb: "Ascot",
    city: "Bulawayo",
    featured: true,
    on_show: false,
    published: true,
    images: [img.house2, img.house3],
    agent_id: agents[1].id,
  },
  {
    slug: "modern-home-parklands",
    title: "4 Bedroom House For Sale in Parklands",
    description:
      "Contemporary Parklands home with high ceilings, a pool-ready yard, and secure boundary walls — ready for the next chapter.",
    status: "FOR_SALE",
    type: "HOUSE",
    price: 320000,
    currency: "USD",
    beds: 4,
    baths: 4,
    size_sqm: 420,
    suburb: "Parklands",
    city: "Bulawayo",
    featured: true,
    on_show: true,
    published: true,
    images: [img.house3, img.house4],
    agent_id: agents[0].id,
  },
  {
    slug: "vacant-land-kumalo",
    title: "2,000m² Vacant Land For Sale in Kumalo",
    description:
      "Prime residential stand in Kumalo with clear title and excellent access — build the home that matches your brief.",
    status: "FOR_SALE",
    type: "VACANT_LAND",
    price: 75000,
    currency: "USD",
    beds: null,
    baths: null,
    size_sqm: 2000,
    suburb: "Kumalo",
    city: "Bulawayo",
    featured: true,
    on_show: false,
    published: true,
    images: [img.land],
    agent_id: agents[2].id,
  },
  {
    slug: "apartment-to-let-suburbs",
    title: "2 Bedroom Apartment To Let in Suburbs",
    description:
      "Secure lock-up-and-go apartment with covered parking, prepaid utilities setup, and walking distance to shops.",
    status: "TO_LET",
    type: "APARTMENT",
    price: 450,
    currency: "USD",
    beds: 2,
    baths: 1,
    size_sqm: 95,
    suburb: "Suburbs",
    city: "Bulawayo",
    featured: true,
    on_show: false,
    published: true,
    images: [img.apartment],
    agent_id: agents[1].id,
  },
  {
    slug: "house-to-let-hillside",
    title: "3 Bedroom House To Let in Hillside",
    description:
      "Fully walled Hillside rental with borehole water, fitted kitchen, and a private garden — available immediately.",
    status: "TO_LET",
    type: "HOUSE",
    price: 650,
    currency: "USD",
    beds: 3,
    baths: 2,
    size_sqm: 250,
    suburb: "Hillside",
    city: "Bulawayo",
    featured: false,
    on_show: true,
    published: true,
    images: [img.house4],
    agent_id: agents[0].id,
  },
  {
    slug: "commercial-unit-cbd",
    title: "Commercial Unit For Sale in CBD",
    description:
      "Street-facing commercial unit with high foot traffic potential, suitable for retail or professional services.",
    status: "FOR_SALE",
    type: "COMMERCIAL",
    price: 180000,
    currency: "USD",
    beds: null,
    baths: 2,
    size_sqm: 180,
    suburb: "CBD",
    city: "Bulawayo",
    featured: false,
    on_show: false,
    published: true,
    images: [img.commercial],
    agent_id: agents[2].id,
  },
  {
    slug: "farm-matabeleland",
    title: "Smallholding For Sale near Bulawayo",
    description:
      "Productive smallholding with outbuildings and borehole — a short drive from the city for weekend or full-time living.",
    status: "FOR_SALE",
    type: "FARM",
    price: 210000,
    currency: "USD",
    beds: 3,
    baths: 2,
    size_sqm: 50000,
    suburb: "Matsheumhlope",
    city: "Bulawayo",
    featured: false,
    on_show: true,
    published: true,
    images: [img.farm, img.land],
    agent_id: agents[2].id,
  },
];

function assertOk(label, error) {
  if (error) {
    console.error(`✗ ${label}:`, error.message || error);
    process.exit(1);
  }
  console.log(`✓ ${label}`);
}

async function ensureAgent(agent) {
  const { data: listed, error: listError } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });
  assertOk(`list users (for ${agent.email})`, listError);

  const existing = listed.users.find((u) => u.id === agent.id || u.email === agent.email);

  if (!existing) {
    const { error } = await supabase.auth.admin.createUser({
      id: agent.id,
      email: agent.email,
      password: AGENT_PASSWORD,
      email_confirm: true,
      user_metadata: {
        name: agent.name,
        role: agent.role,
        slug: agent.slug,
      },
    });
    assertOk(`create auth user ${agent.email}`, error);
  } else {
    console.log(`· auth user already exists: ${agent.email}`);
    if (existing.id !== agent.id) {
      console.error(
        `Email ${agent.email} exists with id ${existing.id}, expected ${agent.id}. Aborting.`,
      );
      process.exit(1);
    }
  }

  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: agent.id,
      name: agent.name,
      email: agent.email,
      role: agent.role,
      phone: agent.phone,
      title: agent.title,
      bio: agent.bio,
      image_url: agent.image_url,
      active: agent.active,
      slug: agent.slug,
    },
    { onConflict: "id" },
  );
  assertOk(`upsert profile ${agent.slug}`, profileError);
}

async function main() {
  console.log(`Seeding ${url} …\n`);

  for (const agent of agents) {
    await ensureAgent(agent);
  }

  const { error: areasError } = await supabase.from("areas").upsert(areas, { onConflict: "slug" });
  assertOk("upsert areas", areasError);

  const { error: postsError } = await supabase.from("posts").upsert(posts, { onConflict: "slug" });
  assertOk("upsert posts", postsError);

  const { error: propsError } = await supabase
    .from("properties")
    .upsert(properties, { onConflict: "slug" });
  assertOk("upsert properties", propsError);

  console.log("\nDone.");
  console.log(`Agent login password (all three): ${AGENT_PASSWORD}`);
  console.log("Emails:");
  for (const a of agents) console.log(`  - ${a.email}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

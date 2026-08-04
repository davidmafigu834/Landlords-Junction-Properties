import { seedAgents, seedAreas, seedPosts, seedProperties } from "./seed";
import type { Area, Post, Profile, Property, PropertyFilters } from "./types";
import { isSupabaseConfigured } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";

function withAgents(properties: Property[], agents: Profile[] = seedAgents): Property[] {
  return properties.map((p) => ({
    ...p,
    agent: agents.find((a) => a.id === p.agent_id),
  }));
}

function filterProperties(list: Property[], filters: PropertyFilters = {}) {
  return list.filter((p) => {
    if (!p.published && !filters.agentId) return false;
    if (filters.status && filters.status !== "ALL" && p.status !== filters.status) return false;
    if (filters.type && filters.type !== "ALL" && p.type !== filters.type) return false;
    if (filters.city && p.city.toLowerCase() !== filters.city.toLowerCase()) return false;
    if (filters.suburb && !p.suburb.toLowerCase().includes(filters.suburb.toLowerCase()))
      return false;
    if (filters.beds && (p.beds ?? 0) < filters.beds) return false;
    if (filters.minPrice && p.price < filters.minPrice) return false;
    if (filters.maxPrice && p.price > filters.maxPrice) return false;
    if (filters.featured && !p.featured) return false;
    if (filters.onShow && !p.on_show) return false;
    if (filters.agentId && p.agent_id !== filters.agentId) return false;
    if (filters.q) {
      const q = filters.q.toLowerCase();
      const hay = `${p.title} ${p.suburb} ${p.city} ${p.description}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export async function getProperties(filters: PropertyFilters = {}): Promise<Property[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      let query = supabase
        .from("properties")
        .select("*, agent:profiles(*)")
        .order("created_at", { ascending: false });

      if (filters.status && filters.status !== "ALL") query = query.eq("status", filters.status);
      if (filters.type && filters.type !== "ALL") query = query.eq("type", filters.type);
      if (filters.city) query = query.ilike("city", filters.city);
      if (filters.suburb) query = query.ilike("suburb", `%${filters.suburb}%`);
      if (filters.beds) query = query.gte("beds", filters.beds);
      if (filters.minPrice) query = query.gte("price", filters.minPrice);
      if (filters.maxPrice) query = query.lte("price", filters.maxPrice);
      if (filters.featured) query = query.eq("featured", true);
      if (filters.onShow) query = query.eq("on_show", true);
      if (filters.agentId) query = query.eq("agent_id", filters.agentId);
      if (filters.q) query = query.or(
        `title.ilike.%${filters.q}%,suburb.ilike.%${filters.q}%,city.ilike.%${filters.q}%`,
      );

      const { data, error } = await query;
      if (!error && data) return data as Property[];
    } catch {
      // fall through to seed
    }
  }
  return withAgents(filterProperties(seedProperties, filters));
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("properties")
        .select("*, agent:profiles(*)")
        .eq("slug", slug)
        .maybeSingle();
      if (data) return data as Property;
    } catch {
      // fall through
    }
  }
  const found = seedProperties.find((p) => p.slug === slug);
  return found ? withAgents([found])[0] : null;
}

export async function getAgents(): Promise<Profile[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("active", true)
        .eq("role", "AGENT")
        .order("name");
      if (!error && data?.length) return data as Profile[];
    } catch {
      // fall through
    }
  }
  return seedAgents.filter((a) => a.active);
}

export async function getAgentBySlug(slug: string): Promise<Profile | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("slug", slug)
        .eq("active", true)
        .maybeSingle();
      if (data) return data as Profile;
    } catch {
      // fall through
    }
  }
  return seedAgents.find((a) => a.slug === slug) ?? null;
}

export async function getAreas(): Promise<Area[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from("areas").select("*").order("name");
      if (!error && data?.length) return data as Area[];
    } catch {
      // fall through
    }
  }
  return seedAreas;
}

export async function getAreaBySlug(slug: string): Promise<Area | null> {
  const areas = await getAreas();
  return areas.find((a) => a.slug === slug) ?? null;
}

export async function getPosts(): Promise<Post[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("published_at", { ascending: false });
      if (!error && data?.length) return data as Post[];
    } catch {
      // fall through
    }
  }
  return seedPosts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getListingCounts() {
  const properties = await getProperties();
  return {
    forSale: properties.filter((p) => p.status === "FOR_SALE").length,
    toLet: properties.filter((p) => p.status === "TO_LET").length,
    onShow: properties.filter((p) => p.on_show).length,
    byType: Object.fromEntries(
      (
        [
          "HOUSE",
          "APARTMENT",
          "COMMERCIAL",
          "INDUSTRIAL",
          "VACANT_LAND",
          "FARM",
          "DEVELOPMENT",
        ] as const
      ).map((type) => [type, properties.filter((p) => p.type === type).length]),
    ),
  };
}

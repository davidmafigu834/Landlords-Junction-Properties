export type UserRole = "ADMIN" | "AGENT";
export type PropertyStatus = "FOR_SALE" | "TO_LET";
export type PropertyType =
  | "HOUSE"
  | "APARTMENT"
  | "COMMERCIAL"
  | "INDUSTRIAL"
  | "VACANT_LAND"
  | "FARM"
  | "DEVELOPMENT";
export type EnquiryType = "GENERAL" | "PROPERTY" | "SELL";

export type Profile = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string | null;
  title: string | null;
  bio: string | null;
  image_url: string | null;
  active: boolean;
  slug: string;
  created_at: string;
};

export type Property = {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: PropertyStatus;
  type: PropertyType;
  price: number;
  currency: string;
  beds: number | null;
  baths: number | null;
  size_sqm: number | null;
  suburb: string;
  city: string;
  featured: boolean;
  on_show: boolean;
  published: boolean;
  images: string[];
  agent_id: string;
  created_at: string;
  updated_at: string;
  agent?: Profile;
};

export type Area = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image_url: string;
  city: string;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image: string;
  published_at: string;
};

export type Enquiry = {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  message: string;
  property_id: string | null;
  agent_id: string | null;
  type: EnquiryType;
  created_at: string;
};

export type PropertyFilters = {
  status?: PropertyStatus | "ALL";
  type?: PropertyType | "ALL";
  city?: string;
  suburb?: string;
  q?: string;
  beds?: number;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  onShow?: boolean;
  agentId?: string;
};

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  HOUSE: "Houses",
  APARTMENT: "Apartments",
  COMMERCIAL: "Commercial",
  INDUSTRIAL: "Industrial",
  VACANT_LAND: "Vacant Land",
  FARM: "Farms",
  DEVELOPMENT: "Developments",
};

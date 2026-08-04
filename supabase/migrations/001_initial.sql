-- Landlords Junction Properties — initial schema
-- Run in Supabase SQL Editor

create extension if not exists "pgcrypto";

create type public.user_role as enum ('ADMIN', 'AGENT');
create type public.property_status as enum ('FOR_SALE', 'TO_LET');
create type public.property_type as enum (
  'HOUSE', 'APARTMENT', 'COMMERCIAL', 'INDUSTRIAL', 'VACANT_LAND', 'FARM', 'DEVELOPMENT'
);
create type public.enquiry_type as enum ('GENERAL', 'PROPERTY', 'SELL');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  email text not null unique,
  role public.user_role not null default 'AGENT',
  phone text,
  title text,
  bio text,
  image_url text,
  active boolean not null default true,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.areas (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  image_url text not null,
  city text not null default 'Bulawayo',
  created_at timestamptz not null default now()
);

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  status public.property_status not null,
  type public.property_type not null,
  price numeric(12, 2) not null,
  currency text not null default 'USD',
  beds int,
  baths int,
  size_sqm numeric(12, 2),
  suburb text not null,
  city text not null default 'Bulawayo',
  featured boolean not null default false,
  on_show boolean not null default false,
  published boolean not null default true,
  images text[] not null default '{}',
  agent_id uuid not null references public.profiles (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text not null,
  message text not null,
  property_id uuid references public.properties (id) on delete set null,
  agent_id uuid references public.profiles (id) on delete set null,
  type public.enquiry_type not null default 'GENERAL',
  created_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  body text not null,
  cover_image text not null,
  published_at timestamptz not null default now()
);

create index properties_status_idx on public.properties (status);
create index properties_city_suburb_idx on public.properties (city, suburb);
create index properties_agent_idx on public.properties (agent_id);
create index properties_featured_idx on public.properties (featured) where featured = true;
create index properties_on_show_idx on public.properties (on_show) where on_show = true;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'ADMIN' and p.active = true
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, role, slug)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'AGENT'),
    coalesce(new.raw_user_meta_data->>'slug', replace(lower(split_part(new.email, '@', 1)), '.', '-'))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.enquiries enable row level security;
alter table public.areas enable row level security;
alter table public.posts enable row level security;

-- Profiles
create policy "Public can view active agents"
  on public.profiles for select
  using (active = true or auth.uid() = id or public.is_admin());

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id or public.is_admin());

create policy "Admins can insert profiles"
  on public.profiles for insert
  with check (public.is_admin());

-- Properties
create policy "Public can view published properties"
  on public.properties for select
  using (published = true or agent_id = auth.uid() or public.is_admin());

create policy "Agents can insert own properties"
  on public.properties for insert
  with check (agent_id = auth.uid() or public.is_admin());

create policy "Agents can update own properties"
  on public.properties for update
  using (agent_id = auth.uid() or public.is_admin());

create policy "Agents can delete own properties"
  on public.properties for delete
  using (agent_id = auth.uid() or public.is_admin());

-- Enquiries
create policy "Anyone can create enquiries"
  on public.enquiries for insert
  with check (true);

create policy "Agents view relevant enquiries"
  on public.enquiries for select
  using (
    public.is_admin()
    or agent_id = auth.uid()
    or property_id in (select id from public.properties where agent_id = auth.uid())
  );

-- Areas & posts (public read, admin write)
create policy "Public read areas" on public.areas for select using (true);
create policy "Admin write areas" on public.areas for all using (public.is_admin());
create policy "Public read posts" on public.posts for select using (true);
create policy "Admin write posts" on public.posts for all using (public.is_admin());

-- Storage buckets (run after creating buckets in dashboard, or via storage API)
insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true),
       ('agent-avatars', 'agent-avatars', true)
on conflict (id) do nothing;

create policy "Public read property images"
  on storage.objects for select
  using (bucket_id = 'property-images');

create policy "Auth upload property images"
  on storage.objects for insert
  with check (bucket_id = 'property-images' and auth.role() = 'authenticated');

create policy "Owners update property images"
  on storage.objects for update
  using (bucket_id = 'property-images' and auth.role() = 'authenticated');

create policy "Owners delete property images"
  on storage.objects for delete
  using (bucket_id = 'property-images' and auth.role() = 'authenticated');

create policy "Public read agent avatars"
  on storage.objects for select
  using (bucket_id = 'agent-avatars');

create policy "Auth upload agent avatars"
  on storage.objects for insert
  with check (bucket_id = 'agent-avatars' and auth.role() = 'authenticated');

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  slug text not null unique,
  title text not null check (char_length(title) between 5 and 100),
  location text not null check (char_length(location) between 2 and 100),
  neighborhood text not null check (char_length(neighborhood) between 2 and 60),
  property_type text not null check (property_type in ('Apartment', 'Townhouse', 'Studio', 'House')),
  monthly_rent integer not null check (monthly_rent > 0),
  bedrooms integer not null check (bedrooms >= 0),
  bathrooms integer not null check (bathrooms > 0),
  area_sqm numeric(8, 2) not null check (area_sqm > 0),
  description text not null check (char_length(description) between 20 and 1200),
  amenities text[] not null default '{}',
  status text not null default 'available' check (status in ('available', 'occupied')),
  photo_urls text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists properties_status_location_idx
  on public.properties (status, location);
create index if not exists properties_owner_created_idx
  on public.properties (owner_id, created_at desc);

alter table public.properties enable row level security;
grant select on public.properties to anon, authenticated;
grant insert, update, delete on public.properties to authenticated;

create policy "Anyone can browse property listings"
  on public.properties for select
  using (true);

create policy "Landlords can create their own listings"
  on public.properties for insert to authenticated
  with check (owner_id = auth.uid());

create policy "Landlords can update their own listings"
  on public.properties for update to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy "Landlords can remove their own listings"
  on public.properties for delete to authenticated
  using (owner_id = auth.uid());

create table if not exists public.property_viewing_requests (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 254),
  message text not null default '' check (char_length(message) <= 1000),
  created_at timestamptz not null default now()
);

create index if not exists property_viewing_requests_property_created_idx
  on public.property_viewing_requests (property_id, created_at desc);

alter table public.property_viewing_requests enable row level security;
grant insert on public.property_viewing_requests to anon, authenticated;
grant select on public.property_viewing_requests to authenticated;

create policy "Renters can request viewings for available homes"
  on public.property_viewing_requests for insert
  with check (
    exists (
      select 1
      from public.properties
      where properties.id = property_viewing_requests.property_id
        and properties.status = 'available'
    )
  );

create policy "Landlords can view requests for their properties"
  on public.property_viewing_requests for select to authenticated
  using (
    exists (
      select 1
      from public.properties
      where properties.id = property_viewing_requests.property_id
        and properties.owner_id = auth.uid()
    )
  );

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'property-photos',
  'property-photos',
  true,
  5000000,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create policy "Anyone can view property photos"
  on storage.objects for select
  using (bucket_id = 'property-photos');

create policy "Landlords can upload their own property photos"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'property-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Landlords can update their own property photos"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'property-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'property-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Landlords can remove their own property photos"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'property-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

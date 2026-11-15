create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text,
  role text not null default 'business_owner',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references profiles(id) on delete cascade,
  name text not null,
  category text,
  phone text,
  email text,
  location text,
  currency text not null default 'KES',
  timezone text not null default 'Africa/Nairobi',
  logo_url text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists business_members (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  role text not null default 'employee',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  unique (business_id, user_id)
);

create table if not exists subscription_plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  billing_cycle text not null,
  price numeric(10,2) not null default 0,
  features jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  plan_id uuid not null references subscription_plans(id),
  status text not null default 'active',
  start_date timestamptz not null default now(),
  end_date timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists business_settings (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  currency text not null default 'KES',
  timezone text not null default 'Africa/Nairobi',
  default_tax numeric(10,2) not null default 0,
  working_hours jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete set null,
  user_id uuid references profiles(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_businesses_owner_id on businesses(owner_id);
create index if not exists idx_business_members_business_id on business_members(business_id);
create index if not exists idx_business_members_user_id on business_members(user_id);
create index if not exists idx_subscriptions_business_id on subscriptions(business_id);
create index if not exists idx_audit_logs_business_id on audit_logs(business_id);

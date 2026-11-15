create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  full_name text := nullif(pg_catalog.btrim(new.raw_user_meta_data ->> 'full_name'), '');
  business_name text := coalesce(
    nullif(pg_catalog.btrim(new.raw_user_meta_data ->> 'business_name'), ''),
    'My business'
  );
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, full_name)
  on conflict (id) do update
    set email = excluded.email,
        full_name = excluded.full_name;

  insert into public.businesses (owner_id, name, email)
  values (new.id, business_name, new.email);

  return new;
end;
$$;

revoke all on function public.handle_new_user() from public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

insert into public.profiles (id, email, full_name)
select
  users.id,
  users.email,
  nullif(pg_catalog.btrim(users.raw_user_meta_data ->> 'full_name'), '')
from auth.users as users
where users.email is not null
on conflict (id) do nothing;

insert into public.businesses (owner_id, name, email)
select
  users.id,
  coalesce(
    nullif(pg_catalog.btrim(users.raw_user_meta_data ->> 'business_name'), ''),
    'My business'
  ),
  users.email
from auth.users as users
where users.email is not null
  and not exists (
    select 1
    from public.businesses
    where businesses.owner_id = users.id
  );

alter table public.profiles enable row level security;
alter table public.businesses enable row level security;
alter table public.business_members enable row level security;
alter table public.subscription_plans enable row level security;
alter table public.subscriptions enable row level security;
alter table public.business_settings enable row level security;
alter table public.audit_logs enable row level security;

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()));

drop policy if exists "Owners can view their business" on public.businesses;
create policy "Owners can view their business"
  on public.businesses for select to authenticated
  using (owner_id = (select auth.uid()));

drop policy if exists "Owners can update their business" on public.businesses;
create policy "Owners can update their business"
  on public.businesses for update to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

drop policy if exists "Users can view their memberships" on public.business_members;
create policy "Users can view their memberships"
  on public.business_members for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Authenticated users can view active plans" on public.subscription_plans;
create policy "Authenticated users can view active plans"
  on public.subscription_plans for select to authenticated
  using (is_active = true);

drop policy if exists "Owners can view their subscriptions" on public.subscriptions;
create policy "Owners can view their subscriptions"
  on public.subscriptions for select to authenticated
  using (
    exists (
      select 1
      from public.businesses
      where businesses.id = subscriptions.business_id
        and businesses.owner_id = (select auth.uid())
    )
  );

drop policy if exists "Owners can view their business settings" on public.business_settings;
create policy "Owners can view their business settings"
  on public.business_settings for select to authenticated
  using (
    exists (
      select 1
      from public.businesses
      where businesses.id = business_settings.business_id
        and businesses.owner_id = (select auth.uid())
    )
  );

drop policy if exists "Owners can view their audit logs" on public.audit_logs;
create policy "Owners can view their audit logs"
  on public.audit_logs for select to authenticated
  using (
    exists (
      select 1
      from public.businesses
      where businesses.id = audit_logs.business_id
        and businesses.owner_id = (select auth.uid())
    )
  );

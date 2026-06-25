-- Kografly Supabase schema
-- Jalankan file ini di Supabase SQL Editor.

create extension if not exists "pgcrypto";
create extension if not exists "citext";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null unique references auth.users(id) on delete cascade,
  username citext not null unique,
  display_name text not null default 'Kografly Creator',
  bio text default 'Tulis bio singkat kamu di builder Kografly.',
  avatar_url text,
  is_published boolean not null default true,
  theme jsonb not null default '{"accent":"indigo","buttonStyle":"thread","background":"stone"}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint username_format check (username ~ '^[a-z0-9_][a-z0-9_.-]{2,29}$')
);

create table if not exists public.links (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Link baru',
  url text not null default 'https://example.com',
  icon_name text not null default 'Globe2',
  animation text not null default 'none',
  style_variant text not null default 'solid',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint links_animation_check check (animation in ('none', 'rise', 'pulse', 'wiggle', 'bounce', 'glow')),
  constraint links_style_check check (style_variant in ('solid', 'outline', 'soft', 'glass')),
  constraint links_url_check check (url ~* '^https?://')
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  link_id uuid references public.links(id) on delete set null,
  type text not null check (type in ('view', 'click')),
  referrer text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists idx_profiles_username on public.profiles(username);
create index if not exists idx_links_profile_sort on public.links(profile_id, sort_order);
create index if not exists idx_analytics_profile_created on public.analytics_events(profile_id, created_at desc);
create index if not exists idx_analytics_link_type on public.analytics_events(link_id, type);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

drop trigger if exists set_links_updated_at on public.links;
create trigger set_links_updated_at
before update on public.links
for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.links enable row level security;
alter table public.analytics_events enable row level security;

-- PROFILES
drop policy if exists "Public can read published profiles" on public.profiles;
create policy "Public can read published profiles"
on public.profiles
for select
using (is_published = true or owner_id = auth.uid());

drop policy if exists "Owners can insert own profile" on public.profiles;
create policy "Owners can insert own profile"
on public.profiles
for insert
to authenticated
with check (owner_id = auth.uid());

drop policy if exists "Owners can update own profile" on public.profiles;
create policy "Owners can update own profile"
on public.profiles
for update
to authenticated
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

drop policy if exists "Owners can delete own profile" on public.profiles;
create policy "Owners can delete own profile"
on public.profiles
for delete
to authenticated
using (owner_id = auth.uid());

-- LINKS
drop policy if exists "Public can read active links of published profiles" on public.links;
create policy "Public can read active links of published profiles"
on public.links
for select
using (
  owner_id = auth.uid()
  or (
    is_active = true
    and exists (
      select 1 from public.profiles p
      where p.id = links.profile_id
      and p.is_published = true
    )
  )
);

drop policy if exists "Owners can insert links" on public.links;
create policy "Owners can insert links"
on public.links
for insert
to authenticated
with check (
  owner_id = auth.uid()
  and exists (
    select 1 from public.profiles p
    where p.id = links.profile_id
    and p.owner_id = auth.uid()
  )
);

drop policy if exists "Owners can update links" on public.links;
create policy "Owners can update links"
on public.links
for update
to authenticated
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

drop policy if exists "Owners can delete links" on public.links;
create policy "Owners can delete links"
on public.links
for delete
to authenticated
using (owner_id = auth.uid());

-- ANALYTICS
drop policy if exists "Anyone can insert anonymous analytics" on public.analytics_events;
create policy "Anyone can insert anonymous analytics"
on public.analytics_events
for insert
to anon, authenticated
with check (type in ('view', 'click'));

drop policy if exists "Owners can read own analytics" on public.analytics_events;
create policy "Owners can read own analytics"
on public.analytics_events
for select
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = analytics_events.profile_id
    and p.owner_id = auth.uid()
  )
);

-- Storage bucket untuk avatar.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[])
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can read avatars" on storage.objects;
create policy "Public can read avatars"
on storage.objects
for select
using (bucket_id = 'avatars');

drop policy if exists "Users can upload own avatars" on storage.objects;
create policy "Users can upload own avatars"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can update own avatars" on storage.objects;
create policy "Users can update own avatars"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can delete own avatars" on storage.objects;
create policy "Users can delete own avatars"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Realtime publication. Supabase kadang sudah punya publication ini.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
    and schemaname = 'public'
    and tablename = 'profiles'
  ) then
    execute 'alter publication supabase_realtime add table public.profiles';
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
    and schemaname = 'public'
    and tablename = 'links'
  ) then
    execute 'alter publication supabase_realtime add table public.links';
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
    and schemaname = 'public'
    and tablename = 'analytics_events'
  ) then
    execute 'alter publication supabase_realtime add table public.analytics_events';
  end if;
exception
  when undefined_object then
    raise notice 'supabase_realtime publication belum tersedia. Aktifkan Realtime dari dashboard Supabase.';
end $$;

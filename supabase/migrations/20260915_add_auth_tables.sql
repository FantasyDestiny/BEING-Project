-- ==============================================
-- BEING-App: komentar, admins, progress
-- Jalankan di Supabase Dashboard -> SQL Editor
-- ==============================================

-- ---------- 1. comments ----------
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  target_type text not null check (target_type in ('module', 'session')),
  target_id text not null,
  author text not null,
  body text not null,
  hidden boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.comments enable row level security;

drop policy if exists "comments_public_all" on public.comments;
create policy "comments_public_all"
  on public.comments for all
  using (true)
  with check (true);

grant all on public.comments to anon, authenticated;

-- ---------- 2. admins ----------
create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  email text not null unique
);

alter table public.admins enable row level security;

drop policy if exists "admins_select_auth" on public.admins;
create policy "admins_select_auth"
  on public.admins for select
  using (true);

grant select on public.admins to anon, authenticated;

-- Daftarkan email admin di sini (ubah sesuaikan akun kamu):
-- insert into public.admins (email) values ('email-admin@siapa.yang');

-- ---------- 3. progress ----------
create table if not exists public.progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  quiz_level text,
  completed_modules text[] not null default '{}',
  updated_at timestamptz not null default now()
);

alter table public.progress enable row level security;

drop policy if exists "progress_select_own" on public.progress;
create policy "progress_select_own"
  on public.progress for select
  using (user_id = auth.uid());

drop policy if exists "progress_insert_own" on public.progress;
create policy "progress_insert_own"
  on public.progress for insert
  with check (user_id = auth.uid());

drop policy if exists "progress_update_own" on public.progress;
create policy "progress_update_own"
  on public.progress for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

grant select, insert, update on public.progress to authenticated;
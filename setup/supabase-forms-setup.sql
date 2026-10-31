-- Kaizen Fitness website forms. Safe to run more than once.

create table if not exists public.consultation_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  fitness_goal text not null,
  fitness_experience text not null,
  preferred_date date not null,
  preferred_time text not null,
  message text,
  consent boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.consultation_requests enable row level security;
alter table public.contact_messages enable row level security;

grant insert on public.consultation_requests to anon;
grant insert on public.contact_messages to anon;

drop policy if exists "anon can submit consultation requests" on public.consultation_requests;
create policy "anon can submit consultation requests"
  on public.consultation_requests for insert to anon with check (true);

drop policy if exists "anon can submit contact messages" on public.contact_messages;
create policy "anon can submit contact messages"
  on public.contact_messages for insert to anon with check (true);

-- Added 2026-10-31: "How did you hear about us?" and link tracking.
alter table public.consultation_requests
  add column if not exists heard_from text,
  add column if not exists heard_from_detail text,
  add column if not exists ref text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists landing_page text,
  add column if not exists referrer_site text;

alter table public.contact_messages
  add column if not exists heard_from text,
  add column if not exists heard_from_detail text,
  add column if not exists ref text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists landing_page text,
  add column if not exists referrer_site text;

-- Tell the API about the new columns straight away.
notify pgrst, 'reload schema';

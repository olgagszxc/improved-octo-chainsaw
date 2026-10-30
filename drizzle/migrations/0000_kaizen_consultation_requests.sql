create table public.consultation_requests (
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

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

grant insert on public.consultation_requests to anon;
grant all on public.consultation_requests to service_role;
grant insert on public.contact_messages to anon;
grant all on public.contact_messages to service_role;

alter table public.consultation_requests enable row level security;
alter table public.contact_messages enable row level security;

create policy "anon can submit consultation requests"
  on public.consultation_requests for insert to anon
  with check (true);

create policy "anon can submit contact messages"
  on public.contact_messages for insert to anon
  with check (true);
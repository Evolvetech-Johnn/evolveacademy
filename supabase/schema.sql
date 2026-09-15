-- Evolveacademy schema (Supabase / Postgres)
-- Run this in the Supabase SQL editor (or via `supabase db push`) before seeding.

create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password text not null,
  name text not null,
  role text not null default 'student' check (role in ('owner', 'professor', 'student')),
  avatar text,
  created_at timestamptz not null default now()
);

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  price numeric,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  position int not null,
  title text not null,
  created_at timestamptz not null default now()
);

create table if not exists lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  module_id uuid not null references modules(id) on delete cascade,
  position int not null,
  slug text not null unique,
  title text not null,
  objetivo text not null,
  conceito text not null,
  aprofundamento text not null,
  exemplo_pratico text not null,
  contraexemplo text not null,
  erro_comum text not null,
  exercicio text not null,
  para_ir_alem text not null,
  is_free_preview boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  status text not null default 'active' check (status in ('active', 'cancelled')),
  enrolled_at timestamptz not null default now(),
  unique (user_id, course_id)
);

-- All access goes through the server using the service role key, which bypasses RLS.
-- Enabling RLS with no policies locks these tables down from the anon/public key by default.
alter table users enable row level security;
alter table courses enable row level security;
alter table modules enable row level security;
alter table lessons enable row level security;
alter table enrollments enable row level security;

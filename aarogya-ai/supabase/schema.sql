-- ============================================================
-- AarogyaAI — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. PROFILES (extends auth.users 1:1)
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  role        text not null check (role in ('patient','rural','elderly','women','chronic','mental','doctor','hospital')),
  full_name   text,
  phone       text,
  created_at  timestamptz default now()
);

-- 2. PATIENT PROFILES
create table if not exists public.patient_profiles (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references public.profiles(id) on delete cascade,
  dob         date,
  gender      text,
  health_score int default 0
);

-- 3. RURAL PROFILES
create table if not exists public.rural_profiles (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references public.profiles(id) on delete cascade,
  state       text,
  language    text,
  district    text
);

-- 4. ELDERLY PROFILES
create table if not exists public.elderly_profiles (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references public.profiles(id) on delete cascade,
  age              int,
  caregiver_name   text,
  caregiver_phone  text
);

-- 5. WOMEN PROFILES
create table if not exists public.women_profiles (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid references public.profiles(id) on delete cascade,
  pregnancy_status    text,
  cycle_length        int default 28
);

-- 6. CHRONIC PROFILES
create table if not exists public.chronic_profiles (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references public.profiles(id) on delete cascade,
  disease_type    text,
  diagnosis_date  date
);

-- 7. MENTAL PROFILES
create table if not exists public.mental_profiles (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references public.profiles(id) on delete cascade,
  is_anonymous    boolean default false
);

-- 8. DOCTOR PROFILES
create table if not exists public.doctor_profiles (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references public.profiles(id) on delete cascade,
  license_no       text unique,
  specialization   text,
  hospital_name    text
);

-- 9. HOSPITAL PROFILES
create table if not exists public.hospital_profiles (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references public.profiles(id) on delete cascade,
  hospital_name   text,
  reg_no          text unique,
  city            text,
  bed_capacity    int
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles          enable row level security;
alter table public.patient_profiles  enable row level security;
alter table public.rural_profiles    enable row level security;
alter table public.elderly_profiles  enable row level security;
alter table public.women_profiles    enable row level security;
alter table public.chronic_profiles  enable row level security;
alter table public.mental_profiles   enable row level security;
alter table public.doctor_profiles   enable row level security;
alter table public.hospital_profiles enable row level security;

-- Profiles: user can only see/edit their own row
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- ============================================================
-- TRIGGER: auto-create profile on auth.users insert
-- ============================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, role, full_name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'patient'),
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Food logs: one row per log entry per user.
-- RLS uses auth.uid() (set from Firebase JWT "sub" when Supabase is configured for custom JWT).
create table if not exists public.food_logs (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  logged_at timestamptz not null default now(),
  meal_type text not null check (meal_type in ('breakfast', 'lunch', 'dinner', 'snack', 'other')),
  item_name text not null,
  emoji text not null,
  is_custom boolean not null default false
);

create index if not exists idx_food_logs_user_logged on public.food_logs (user_id, logged_at desc);

alter table public.food_logs enable row level security;

-- Use JWT 'sub' for Firebase UID (string). If using Supabase Auth, use auth.uid()::text instead.
create policy "Users can read own food_logs"
  on public.food_logs for select
  using ((auth.jwt()->>'sub') = user_id);

create policy "Users can insert own food_logs"
  on public.food_logs for insert
  with check ((auth.jwt()->>'sub') = user_id);

create policy "Users can update own food_logs"
  on public.food_logs for update
  using ((auth.jwt()->>'sub') = user_id);

create policy "Users can delete own food_logs"
  on public.food_logs for delete
  using ((auth.jwt()->>'sub') = user_id);

-- User custom list items (merged with app defaults per category).
create table if not exists public.user_food_items (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  category_type text not null check (category_type in ('breakfast', 'lunch', 'dinner', 'snack')),
  name text not null,
  emoji text not null,
  calories int,
  created_at timestamptz not null default now()
);

create index if not exists idx_user_food_items_user_category on public.user_food_items (user_id, category_type);

alter table public.user_food_items enable row level security;

create policy "Users can read own user_food_items"
  on public.user_food_items for select
  using ((auth.jwt()->>'sub') = user_id);

create policy "Users can insert own user_food_items"
  on public.user_food_items for insert
  with check ((auth.jwt()->>'sub') = user_id);

create policy "Users can update own user_food_items"
  on public.user_food_items for update
  using ((auth.jwt()->>'sub') = user_id);

create policy "Users can delete own user_food_items"
  on public.user_food_items for delete
  using ((auth.jwt()->>'sub') = user_id);

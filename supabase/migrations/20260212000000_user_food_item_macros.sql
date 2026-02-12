-- Add nutrition fields to user_food_items for macros tracking.
alter table public.user_food_items
  add column if not exists fat numeric,
  add column if not exists protein numeric,
  add column if not exists sugar numeric;

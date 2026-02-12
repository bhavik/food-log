-- Add nutrition snapshot fields to food_logs for historical accuracy.
alter table public.food_logs
  add column if not exists calories numeric,
  add column if not exists fat numeric,
  add column if not exists protein numeric,
  add column if not exists sugar numeric;

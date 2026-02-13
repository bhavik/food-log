-- Run this in Supabase → SQL Editor if you're unsure the DB has all columns the app needs.
-- Idempotent: safe to run multiple times.

-- 1. food_logs: nutrition columns (for logging calories, fat, protein, sugar per entry)
ALTER TABLE public.food_logs
  ADD COLUMN IF NOT EXISTS calories numeric,
  ADD COLUMN IF NOT EXISTS fat numeric,
  ADD COLUMN IF NOT EXISTS protein numeric,
  ADD COLUMN IF NOT EXISTS sugar numeric;

-- 2. user_food_items: nutrition columns (for custom items with macros)
ALTER TABLE public.user_food_items
  ADD COLUMN IF NOT EXISTS fat numeric,
  ADD COLUMN IF NOT EXISTS protein numeric,
  ADD COLUMN IF NOT EXISTS sugar numeric;

-- 3. Reload PostgREST schema cache so API sees new columns
NOTIFY pgrst, 'reload schema';

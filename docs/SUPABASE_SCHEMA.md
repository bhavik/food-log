# Supabase schema – what the app needs

This doc lists the tables and columns the app uses. Run the migrations in order (or the ensure script below) so your Supabase project matches.

---

## 1. Tables and columns

### `public.food_logs`

| Column      | Type         | App use                          |
|------------|--------------|-----------------------------------|
| id         | uuid         | Primary key, default gen_random_uuid() |
| user_id    | text         | Firebase UID (RLS uses `auth.jwt()->>'sub'`) |
| logged_at  | timestamptz  | When the food was logged         |
| meal_type  | text         | breakfast, lunch, dinner, snack, other |
| item_name  | text         | Display name                     |
| emoji      | text         | Single emoji                     |
| is_custom  | boolean      | Default false                    |
| **calories** | numeric    | Optional (from migration 20260212000001) |
| **fat**      | numeric    | Optional (from migration 20260212000001) |
| **protein**  | numeric    | Optional (from migration 20260212000001) |
| **sugar**    | numeric    | Optional (from migration 20260212000001) |

**RLS:** Select/insert/update/delete where `(auth.jwt()->>'sub') = user_id`.

---

### `public.user_food_items`

| Column         | Type        | App use                          |
|----------------|-------------|-----------------------------------|
| id             | uuid        | Primary key                      |
| user_id        | text        | Firebase UID                     |
| category_type  | text        | breakfast, lunch, dinner, snack  |
| name           | text        | Item name                        |
| emoji          | text        | Single emoji                     |
| calories       | int         | Optional (base migration)        |
| created_at     | timestamptz | Default now()                    |
| **fat**        | numeric     | Optional (from migration 20260212000000) |
| **protein**    | numeric     | Optional (from migration 20260212000000) |
| **sugar**      | numeric     | Optional (from migration 20260212000000) |

**RLS:** Same as above.

---

## 2. Migrations (run in this order)

1. **20250203000000_food_logs.sql** – Creates `food_logs` and `user_food_items`, RLS, indexes.
2. **20260212000000_user_food_item_macros.sql** – Adds `fat`, `protein`, `sugar` to `user_food_items`.
3. **20260212000001_food_logs_macros.sql** – Adds `calories`, `fat`, `protein`, `sugar` to `food_logs`.

Each of the 2026 migrations ends with `notify pgrst, 'reload schema';` so the API sees new columns.

---

## 3. One-off “ensure schema” script (Supabase SQL Editor)

If you’re not sure migrations were applied, run this in **Supabase → SQL Editor**. It is idempotent (safe to run more than once).

```sql
-- Ensure food_logs has nutrition columns
ALTER TABLE public.food_logs
  ADD COLUMN IF NOT EXISTS calories numeric,
  ADD COLUMN IF NOT EXISTS fat numeric,
  ADD COLUMN IF NOT EXISTS protein numeric,
  ADD COLUMN IF NOT EXISTS sugar numeric;

-- Ensure user_food_items has nutrition columns
ALTER TABLE public.user_food_items
  ADD COLUMN IF NOT EXISTS fat numeric,
  ADD COLUMN IF NOT EXISTS protein numeric,
  ADD COLUMN IF NOT EXISTS sugar numeric;

-- Reload PostgREST schema cache so the API sees all columns
NOTIFY pgrst, 'reload schema';
```

After running, wait a few seconds and try the app again (log a food item, add a custom item).

---

## 4. Quick check in Supabase

- **Table Editor → food_logs:** Columns should include `calories`, `fat`, `protein`, `sugar`.
- **Table Editor → user_food_items:** Columns should include `fat`, `protein`, `sugar`.
- **Authentication → Providers:** Firebase added with your project ID (for JWT and RLS).

If any of these are missing, run the migrations or the ensure script above.

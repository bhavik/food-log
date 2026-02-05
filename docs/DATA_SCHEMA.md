# Per-user data structure for FoodLog

Designed for **Supabase (Postgres)** with **Firebase Auth** for user identity. Use Firebase `uid` as `user_id` everywhere.

---

## 1. Food logs (one row per log entry)

Each row is a single “I ate this at this time” entry for one user.

| Column       | Type      | Description |
|-------------|-----------|-------------|
| `id`        | `uuid`    | Primary key (default: `gen_random_uuid()`) |
| `user_id`   | `text`    | Firebase Auth UID – **who** logged it |
| `logged_at` | `timestamptz` | When the food was logged (or eaten) |
| `meal_type` | `text`    | One of: `breakfast`, `lunch`, `dinner`, `snack`, `other` |
| `item_name` | `text`    | Display name (e.g. "Tea & Khakra") |
| `emoji`     | `text`    | Single emoji (e.g. "☕") |
| `is_custom` | `boolean` | `true` if user-created item, `false` if from default list |

**Maps to:** your existing `LogEntry` (add `user_id`; `timestamp` → `logged_at`).

**Index:** `(user_id, logged_at DESC)` for “my logs, newest first”.

---

## 2. User food items (custom list items only)

Stores only **custom items** a user added to their lists (Breakfast, Lunch, Dinner, Snacks). Default items stay in app constants; on load you merge defaults + these rows per category.

| Column         | Type    | Description |
|----------------|---------|-------------|
| `id`           | `uuid`  | Primary key |
| `user_id`      | `text`  | Firebase Auth UID |
| `category_type`| `text`  | One of: `breakfast`, `lunch`, `dinner`, `snack` |
| `name`         | `text`  | Item name |
| `emoji`        | `text`  | Single emoji |
| `calories`     | `int`   | Optional |
| `created_at`   | `timestamptz` | When they added it (optional) |

**Maps to:** `FoodItem` + which `MealCategory.type` it belongs to. Your app builds `MealCategory[]` by: default categories from `constants` + these rows grouped by `category_type`.

---

## 3. Optional: user category overrides

Only if you want per-user **labels** (e.g. rename “SNACKS” to “Afternoon bites”) or order. If you don’t need this, skip it.

| Column   | Type   | Description |
|----------|--------|-------------|
| `user_id`| `text` | Firebase Auth UID |
| `type`   | `text` | `breakfast` \| `lunch` \| `dinner` \| `snack` |
| `label`  | `text` | Custom label (e.g. "Afternoon bites") |

---

## Summary

- **Logs:** `food_logs` – one row per log, keyed by `user_id` and `logged_at`.
- **Custom list items:** `user_food_items` – custom items per user per category; merge with default categories in the app.
- **Optional:** `user_category_overrides` if you want custom category names.

Use Firebase Auth `uid` as `user_id` in all tables and enforce RLS in Supabase so each user only reads/writes their own rows.

# Diet Plans – Onboarding Content & Implementation Plan

This document defines the **content** (food items per diet) and **implementation approach** for onboarding new users with a chosen diet plan. Review and approve before we implement in code.

---

## 1. Diet plan options (user-facing)

| Diet plan ID | Display name |
|--------------|--------------|
| `gujarati-low-sugar-fat` | Gujarati Low Sugar Low Fat |
| `mediterranean` | Mediterranean Diet |
| `indian-vegetarian` | Indian Vegetarian Diet |
| `indian-vegan` | Indian Vegan Diet |

---

## 2. Content – food items per diet

- **Gujarati Low Sugar Low Fat:** All items from current `constants.ts` (no limit per category).
- **Other diets (Mediterranean, Indian Vegetarian, Indian Vegan):** **10 items per meal type** (Breakfast, Snacks, Lunch, Dinner).
- **Existing users:** Their food items (saved categories, custom items) are **never removed**; diet plan base is merged with user data.

Nutrition values are per serving (calories, fat/protein/sugar in grams). Recipe/description is optional.

---

### 2.1 Gujarati Low Sugar Low Fat

*Full current `constants.ts` – all items in every category (breakfast, snacks, lunch, dinner). No reduction.*

**Breakfast (all current items)**

| Name | Emoji | Cal | Fat | Protein | Sugar | Recipe/notes |
|------|-------|-----|-----|---------|-------|--------------|
| Tea & Khakra (No Sugar) | ☕ | 121 | 5.2 | 4.1 | 1.0 | 1 cup water, 1/4 cup 2% milk, ginger, wag bakri tea |
| Oats with Nuts | 🥣 | 132 | 5.7 | 4.5 | 0.9 | 1/4 cup oats, 5 almonds, 5 pista |
| 5 Almonds | 🥜 | 35 | 3.0 | 1.3 | 0.3 | 5 almonds |
| 5 Walnuts | 🥜 | 65 | 6.5 | 1.5 | 0.3 | 5 walnuts |

**Snacks (all current items)**

| Name | Emoji | Cal | Fat | Protein | Sugar | Recipe/notes |
|------|-------|-----|-----|---------|-------|--------------|
| Siggi's Chas (Buttermilk) | 🥛 | 144 | 0.0 | 27.4 | 7.2 | Non-fat yogurt, jeera, black salt |
| Fresh Apple | 🍎 | 107 | 0.3 | 0.5 | 19.5 | 1 apple |
| Roasted Makhana | 🍿 | 31 | 0.1 | 1.3 | 0.0 | 1/4 cup makhana, light oil, salt |
| Sprouted Moong Salad | 🥗 | 174 | 0.6 | 11.9 | 3.3 | Moong, lemon, salt |

**Lunch (all current items)**

| Name | Emoji | Cal | Fat | Protein | Sugar | Recipe/notes |
|------|-------|-----|-----|---------|-------|--------------|
| Sprouted Moong Salad | 🥗 | 174 | 0.6 | 11.9 | 3.3 | As above |
| Grilled Tofu Bowl | 🍲 | 198 | 11.1 | 22.7 | 0.8 | Tofu, vegetables, olive oil |
| Quinoa & Veggie Pulao | 🍛 | 338 | 3.8 | 12.3 | 2.6 | Quinoa, vegetables |
| Lentil Soup & Sprouted Bread | 🥣 | 354 | 1.2 | 24.6 | 2.7 | Lentils, vegetables |

**Dinner (all current items)**

| Name | Emoji | Cal | Fat | Protein | Sugar | Recipe/notes |
|------|-------|-----|-----|---------|-------|--------------|
| Bajra Roti, Chana Dal, Bhindi | 🫓 | 555 | 7.6 | 27.1 | 4.2 | Bajra roti, chana dal, bhindi |
| Bajra Roti, Masoor Dal, Lauki | 🫓 | 574 | 3.6 | 30.4 | 2.9 | Bajra roti, masoor dal, lauki |
| Bajra Roti, Rajma, Spinach | 🍲 | 543 | 3.7 | 27.6 | 3.0 | Bajra roti, rajma, spinach |
| Moong Dal Cheela (2) | 🥞 | 347 | 1.2 | 23.9 | 6.6 | Moong dal cheela |

---

### 2.2 Mediterranean Diet

*10 items per category.*

**Breakfast (10 items)**

| Name | Emoji | Cal | Fat | Protein | Sugar | Recipe/notes |
|------|-------|-----|-----|---------|-------|--------------|
| Greek Yogurt with Honey & Walnuts | 🥣 | 220 | 12 | 12 | 14 | 1 cup Greek yogurt, 1 tbsp honey, 5 walnuts |
| Oats with Olive Oil & Tomato | 🥣 | 180 | 6 | 5 | 2 | Oats, olive oil, cherry tomatoes |
| Whole Grain Toast with Avocado | 🍞 | 250 | 18 | 6 | 2 | 1 slice whole grain, 1/2 avocado |
| Mediterranean Omelette (Veg) | 🍳 | 200 | 14 | 12 | 2 | Eggs, spinach, feta, olive oil |
| *(+ 6 more to reach 10)* | | | | | | |

**Snacks (10 items)**

| Name | Emoji | Cal | Fat | Protein | Sugar | Recipe/notes |
|------|-------|-----|-----|---------|-------|--------------|
| Hummus with Veggie Sticks | 🥕 | 150 | 10 | 5 | 4 | 1/4 cup hummus, cucumber/carrot |
| Handful of Olives & Almonds | 🫒 | 120 | 11 | 3 | 1 | 8–10 olives, 8–10 almonds |
| Fresh Apple | 🍎 | 107 | 0.3 | 0.5 | 19.5 | 1 apple |
| Greek Yogurt (Plain) | 🥛 | 100 | 0.5 | 17 | 4 | 1 cup non-fat Greek yogurt |
| *(+ 6 more to reach 10)* | | | | | | |

**Lunch (10 items)**

| Name | Emoji | Cal | Fat | Protein | Sugar | Recipe/notes |
|------|-------|-----|-----|---------|-------|--------------|
| Mediterranean Salad (TJ's style) | 🥗 | 55 | 3.5 | 1.0 | 1.5 | Greens, olives, feta, dressing |
| Mediterranean Bowl | 🥙 | 338 | 3.8 | 12.3 | 2.6 | Quinoa, chickpeas, veg, olive oil |
| Grilled Tofu Bowl | 🍲 | 198 | 11.1 | 22.7 | 0.8 | Tofu, vegetables |
| Lentil & Vegetable Soup | 🥣 | 280 | 4 | 16 | 5 | Lentils, celery, carrot, olive oil |
| *(+ 6 more to reach 10)* | | | | | | |

**Dinner (10 items)**

| Name | Emoji | Cal | Fat | Protein | Sugar | Recipe/notes |
|------|-------|-----|-----|---------|-------|--------------|
| Grilled Veggies & Chickpeas | 🥦 | 320 | 12 | 14 | 8 | Bell pepper, zucchini, chickpeas, olive oil |
| Mediterranean Bowl | 🥙 | 338 | 3.8 | 12.3 | 2.6 | Same as lunch option |
| Tofu & Veggie Stir-fry | 🥦 | 198 | 11.1 | 22.7 | 0.8 | Tofu, broccoli, olive oil |
| Black-eyed Pea Salad | 🥗 | 297 | 1.1 | 20.4 | 6.8 | Black-eyed peas, veg, herbs |
| *(+ 6 more to reach 10)* | | | | | | |

---

### 2.3 Indian Vegetarian Diet

*10 items per category. Includes Gujarati-style items plus Pav Bhaji, Pizza, Roti/Daal/Rice/Sabzi, Poha, Idli, etc.*

**Breakfast (10 items)**

| Name | Emoji | Cal | Fat | Protein | Sugar | Recipe/notes |
|------|-------|-----|-----|---------|-------|--------------|
| Tea & Khakra (No Sugar) | ☕ | 121 | 5.2 | 4.1 | 1.0 | As in Gujarati plan |
| Oats with Nuts | 🥣 | 132 | 5.7 | 4.5 | 0.9 | As in Gujarati plan |
| Poha | 🍲 | 250 | 8 | 5 | 2 | Flattened rice, peanuts, lemon |
| Idli with Chutney (2 pc) | 🍛 | 140 | 2 | 4 | 2 | 2 idlis, coconut chutney |
| *(+ 6 more to reach 10)* | | | | | | |

**Snacks (10 items)**

| Name | Emoji | Cal | Fat | Protein | Sugar | Recipe/notes |
|------|-------|-----|-----|---------|-------|--------------|
| Fresh Apple | 🍎 | 107 | 0.3 | 0.5 | 19.5 | 1 apple |
| Roasted Chana (1/4 cup) | 🥜 | 110 | 4.0 | 5.0 | 0.0 | Roasted chana |
| Sprouted Moong Salad | 🥗 | 174 | 0.6 | 11.9 | 3.3 | Moong, lemon |
| Siggi's Chas (Buttermilk) | 🥛 | 144 | 0.0 | 27.4 | 7.2 | As in Gujarati plan |
| *(+ 6 more to reach 10)* | | | | | | |

**Lunch (10 items)**

| Name | Emoji | Cal | Fat | Protein | Sugar | Recipe/notes |
|------|-------|-----|-----|---------|-------|--------------|
| Roti, Daal, Rice, Sabzi | 🍛 | 520 | 12 | 18 | 4 | 2 roti, 1 cup daal, 1 cup rice, sabzi |
| Pav Bhaji | 🍞 | 380 | 16 | 10 | 8 | 2 pav, 1 cup bhaji |
| Quinoa & Veggie Pulao | 🍛 | 338 | 3.8 | 12.3 | 2.6 | As in current constants |
| Lentil Soup & Sprouted Bread | 🥣 | 354 | 1.2 | 24.6 | 2.7 | As in current constants |
| *(+ 6 more to reach 10)* | | | | | | |

**Dinner (10 items)**

| Name | Emoji | Cal | Fat | Protein | Sugar | Recipe/notes |
|------|-------|-----|-----|---------|-------|--------------|
| Pizza (2 slices, veg) | 🍕 | 400 | 16 | 14 | 6 | 2 slices cheese/veg pizza |
| Bajra Roti, Chana Dal, Bhindi | 🫓 | 555 | 7.6 | 27.1 | 4.2 | As in Gujarati plan |
| Roti, Daal, Rice, Sabzi | 🍛 | 520 | 12 | 18 | 4 | Same as lunch |
| Tofu Bhurji (Turmeric) | 🍳 | 198 | 11.1 | 22.7 | 0.8 | As in current constants |
| *(+ 6 more to reach 10)* | | | | | | |

---

### 2.4 Indian Vegan Diet

*10 items per category. No dairy, no eggs; plant-based only.*

**Breakfast (10 items)**

| Name | Emoji | Cal | Fat | Protein | Sugar | Recipe/notes |
|------|-------|-----|-----|---------|-------|--------------|
| Oats with Nuts (no milk / plant milk) | 🥣 | 160 | 8 | 5 | 1 | Oats, almonds, pista, water/oat milk |
| 5 Almonds | 🥜 | 35 | 3.0 | 1.3 | 0.3 | 5 almonds |
| 5 Walnuts | 🥜 | 65 | 6.5 | 1.5 | 0.3 | 5 walnuts |
| Moong Dal Cheela (2) | 🥞 | 347 | 1.2 | 23.9 | 6.6 | Moong dal, no dairy |
| *(+ 6 more to reach 10)* | | | | | | |

**Snacks (10 items)**

| Name | Emoji | Cal | Fat | Protein | Sugar | Recipe/notes |
|------|-------|-----|-----|---------|-------|--------------|
| Fresh Apple | 🍎 | 107 | 0.3 | 0.5 | 19.5 | 1 apple |
| Roasted Makhana | 🍿 | 31 | 0.1 | 1.3 | 0.0 | 1/4 cup makhana |
| Sprouted Moong Salad | 🥗 | 174 | 0.6 | 11.9 | 3.3 | Moong, lemon |
| Roasted Chana (1/4 cup) | 🥜 | 110 | 4.0 | 5.0 | 0.0 | Roasted chana |
| *(+ 6 more to reach 10)* | | | | | | |

**Lunch (10 items)**

| Name | Emoji | Cal | Fat | Protein | Sugar | Recipe/notes |
|------|-------|-----|-----|---------|-------|--------------|
| Roti, Daal, Rice, Sabzi | 🍛 | 520 | 12 | 18 | 4 | 2 roti, daal, rice, sabzi (no ghee/butter) |
| Grilled Tofu Bowl | 🍲 | 198 | 11.1 | 22.7 | 0.8 | Tofu, vegetables |
| Quinoa & Veggie Pulao | 🍛 | 338 | 3.8 | 12.3 | 2.6 | Quinoa, vegetables |
| Lentil Soup & Sprouted Bread | 🥣 | 354 | 1.2 | 24.6 | 2.7 | Lentils, bread |
| *(+ 6 more to reach 10)* | | | | | | |

**Dinner (10 items)**

| Name | Emoji | Cal | Fat | Protein | Sugar | Recipe/notes |
|------|-------|-----|-----|---------|-------|--------------|
| Bajra Roti, Chana Dal, Bhindi | 🫓 | 555 | 7.6 | 27.1 | 4.2 | No ghee |
| Bajra Roti, Rajma, Spinach | 🍲 | 543 | 3.7 | 27.6 | 3.0 | Plant-based |
| Tofu & Veggie Stir-fry | 🥦 | 198 | 11.1 | 22.7 | 0.8 | Tofu, vegetables |
| Tofu Steaks & Broccoli | 🥦 | 198 | 11.1 | 23.2 | 0.8 | Tofu, broccoli |
| *(+ 6 more to reach 10)* | | | | | | |

---

## 3. Implementation plan

### 3.1 Data structure (**Option A – chosen**)

- **Diet plan definitions**  
  - New file **`dietPlans.ts`** exporting:
    - `DIET_PLANS: Record<DietPlanId, { name: string; categories: MealCategory[] }>`
    - Each `categories` array has `type`, `label`, `color`, `items[]` with `id`, `name`, `emoji`, `calories`, `fat`, `protein`, `sugar`, optional `recipe`/`link`.
  - Current **`constants.ts`** refactored: default categories come from `DIET_PLANS['gujarati-low-sugar-fat'].categories` (or export `DEFAULT_DIET_PLAN_ID` and use that).

- **Stable IDs for items**  
  - Each item has a **unique, prefixed `id`** (e.g. `gujarati-b1`, `med-b1`, `indian-veg-l2`).  
  - Prevents duplicates when merging with user-created items.

- **Existing users’ items never removed**  
  - When loading categories: always **merge** diet plan base + user custom items (from Supabase `user_food_items`).  
  - For returning users who already have a diet selected or saved categories in localStorage: do not replace their data; apply diet base and merge their custom/saved items on top.

### 3.2 Login required to log food + dedicated login page

- **Unauthenticated users** cannot log (add) food items.  
- When a user **clicks an item to track** and is not signed in: show a message that they need to sign in to track food, and **redirect to a dedicated Login page**.  
- **Login page:** Full-screen view with **“Sign in with Google”** only (for now). Same Firebase `signInWithPopup` + Google as existing AuthButton. After successful sign-in, redirect back to the app (and they can then log the item).
- No router required: app state can include `showLoginPage: boolean`; when true, render Login page instead of main/onboarding UI.

### 3.3 When to show onboarding (diet selection)

- **First-time only:**  
  - Show diet selection when the app detects “no diet chosen yet” (e.g. no value in `localStorage` and, if signed in, no “diet_plan_id” from backend).  
- **Where:**  
  - Dedicated **onboarding screen** (full-screen or modal) after app load or after first sign-in, before the main Track/History/Nutrition UI.  
- **Skip for returning users:**  
  - If `localStorage` (and/or backend) already has a diet plan id, go straight to main app.

### 3.4 Flow

1. User opens app (or signs in for the first time).  
2. Check: has user already selected a diet?  
   - **Yes** → Load categories from `DIET_PLANS[storedId].categories` (and merge with `user_food_items` if signed in). Show main app.  
   - **No** → Show onboarding: “Choose your diet to get started” with the 4 options (name + short description optional).  
3. On selection:  
   - Save choice in `localStorage` (e.g. `foodlog_diet_plan_id`) and, if we add backend support later, save `diet_plan_id` on the user profile.  
   - Set app state to the selected diet’s categories (same structure as current `categories`).  
   - Navigate to main app (Track tab).  
4. **Optional:** “Change diet” in Settings later: same 4 options; on confirm, replace categories with the new diet’s set (and optionally keep or clear user custom items).

### 3.5 App state and persistence

- **State:**  
  - Categories (and thus the food lists) come from the selected diet plan’s `categories` plus any **user-created items** from Supabase `user_food_items` (when signed in).  
  - So: `categories = merge(DIET_PLANS[dietPlanId].categories, userFoodItems)` (same merge logic as today).  
- **Persistence:**  
  - **Local:** `localStorage` key for `diet_plan_id` (e.g. `foodlog_diet_plan_id`).  
  - **Remote (optional, later):** Add column or table in Supabase for user’s `diet_plan_id` so signed-in users get the same diet across devices.

### 3.6 Files to add/change (high level)

| Action | File / area |
|--------|-------------|
| Add | `dietPlans.ts` (or `constants/dietPlans.ts`) – all 4 diets with full item lists and nutrition. |
| Refactor | `constants.ts` – remove or shrink `MEAL_CATEGORIES`; export default diet id and/or use `DIET_PLANS['gujarati-low-sugar-fat']` as default. |
| Add | **Login page** component: full-screen “Sign in with Google” only; shown when unauthenticated user tries to log food (redirect to login). |
| Add | Onboarding UI component(s): diet selection screen + wiring to set `dietPlanId` and load that diet’s categories. |
| Change | `App.tsx` (or root): on load, check “has diet?”; if not, show onboarding; if yes, load categories from `DIET_PLANS[dietPlanId]` and merge with user items. When user not signed in and taps item to log → show “Sign in to track” and show Login page. |
| Optional | Supabase: migration for `user_profiles.diet_plan_id` (or similar) if we want cross-device diet preference. |

### 3.7 Edge cases

- **Existing users** who already have data and no `diet_plan_id`: treat as “Gujarati Low Sugar Low Fat” (current behavior) and set `foodlog_diet_plan_id = 'gujarati-low-sugar-fat'` on first load so they don’t see onboarding.  
- **User custom items:** always merged on top of the selected diet’s categories (no change to current merge logic).  
- **Ids:** New diet items use prefixed ids (e.g. `gujarati-b1`, `med-b1`) so they don’t collide with existing `b1`, `s1`, etc., and we can migrate existing constants to the same id scheme.

---

## 4. Summary for review

- **Content:** Four diets (Gujarati Low Sugar Low Fat, Mediterranean, Indian Vegetarian, Indian Vegan), each with 3–4 items per meal type (breakfast, snacks, lunch, dinner). Current `constants.ts` content is the basis for Gujarati; Indian Vegetarian adds Pav Bhaji, Pizza, Roti/Daal/Rice/Sabzi, Poha, Idli, etc.  
- **Implementation:** Central `dietPlans.ts` (or JSON) with one structure per diet; onboarding screen for first-time diet selection; persist choice in `localStorage` (and optionally Supabase); app loads categories from selected diet + user custom items. Existing users get Gujarati by default and do not see onboarding.

If you want to change any diet’s items, add/remove diets, or adjust the flow (e.g. when to show onboarding, or “change diet” in settings), we can update this doc before coding.

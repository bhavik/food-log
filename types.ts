export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'other';

export interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  calories?: number;
}

export interface LogEntry {
  id: string;
  timestamp: number;
  mealType: MealType;
  itemName: string;
  emoji: string;
  isCustom?: boolean;
}

export interface MealCategory {
  type: MealType;
  label: string;
  items: FoodItem[];
  color: string;
}

// --- Per-user persistence (Supabase / API) ---

/** One row in `food_logs` table. user_id is set by the backend from auth. */
export interface FoodLogRow {
  id: string;
  user_id: string;
  logged_at: string; // ISO timestamp
  meal_type: MealType;
  item_name: string;
  emoji: string;
  is_custom: boolean;
}

/** One row in `user_food_items` table (custom items only). */
export interface UserFoodItemRow {
  id: string;
  user_id: string;
  category_type: MealType;
  name: string;
  emoji: string;
  calories?: number;
  created_at?: string;
}

/** Convert API row → app LogEntry */
export function foodLogRowToEntry(row: FoodLogRow): LogEntry {
  return {
    id: row.id,
    timestamp: new Date(row.logged_at).getTime(),
    mealType: row.meal_type,
    itemName: row.item_name,
    emoji: row.emoji,
    isCustom: row.is_custom,
  };
}

/** Convert app LogEntry → API payload (omit id if insert) */
export function entryToFoodLogPayload(entry: LogEntry, userId: string): Omit<FoodLogRow, 'id'> {
  return {
    user_id: userId,
    logged_at: new Date(entry.timestamp).toISOString(),
    meal_type: entry.mealType,
    item_name: entry.itemName,
    emoji: entry.emoji,
    is_custom: entry.isCustom ?? false,
  };
}

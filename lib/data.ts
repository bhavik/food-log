import { getSupabase } from './supabase';
import type { LogEntry, MealType, MealCategory, FoodItem, FoodLogRow, UserFoodItemRow } from '../types';
import { foodLogRowToEntry, entryToFoodLogPayload } from '../types';
import { MEAL_CATEGORIES as DEFAULT_CATEGORIES } from '../constants';

export async function fetchFoodLogs(): Promise<LogEntry[]> {
  const supabase = await getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('food_logs')
    .select('*')
    .order('logged_at', { ascending: false });
  if (error) {
    console.error('fetchFoodLogs', error);
    return [];
  }
  return (data as FoodLogRow[]).map(foodLogRowToEntry);
}

export async function insertFoodLog(entry: Omit<LogEntry, 'id'>, userId: string): Promise<LogEntry | null> {
  const supabase = await getSupabase();
  if (!supabase) return null;
  const full: LogEntry = { ...entry, id: '' };
  const payload = entryToFoodLogPayload(full, userId);
  const { data, error } = await supabase.from('food_logs').insert(payload).select('id, user_id, logged_at, meal_type, item_name, emoji, is_custom').single();
  if (error) {
    console.error('insertFoodLog', error);
    return null;
  }
  return foodLogRowToEntry(data as FoodLogRow);
}

export async function deleteFoodLog(id: string): Promise<boolean> {
  const supabase = await getSupabase();
  if (!supabase) return false;
  const { error } = await supabase.from('food_logs').delete().eq('id', id);
  if (error) {
    console.error('deleteFoodLog', error);
    return false;
  }
  return true;
}

export async function fetchUserFoodItems(): Promise<UserFoodItemRow[]> {
  const supabase = await getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase.from('user_food_items').select('*').order('created_at', { ascending: true });
  if (error) {
    console.error('fetchUserFoodItems', error);
    return [];
  }
  return (data ?? []) as UserFoodItemRow[];
}

export async function insertUserFoodItem(
  userId: string,
  categoryType: MealType,
  name: string,
  emoji: string
): Promise<FoodItem | null> {
  const supabase = await getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('user_food_items')
    .insert({ user_id: userId, category_type: categoryType, name, emoji })
    .select('id, user_id, category_type, name, emoji, calories, created_at')
    .single();
  if (error) {
    console.error('insertUserFoodItem', error);
    return null;
  }
  const row = data as UserFoodItemRow;
  return { id: row.id, name: row.name, emoji: row.emoji, calories: row.calories };
}

export async function updateUserFoodItem(id: string, name: string): Promise<boolean> {
  const supabase = await getSupabase();
  if (!supabase) return false;
  const { error } = await supabase.from('user_food_items').update({ name }).eq('id', id);
  if (error) {
    console.error('updateUserFoodItem', error);
    return false;
  }
  return true;
}

/** Merge default categories with user custom items from DB. */
export function buildCategoriesWithUserItems(
  defaultCategories: MealCategory[],
  userItems: UserFoodItemRow[]
): MealCategory[] {
  const byCategory = new Map<MealType, FoodItem[]>();
  for (const cat of defaultCategories) {
    byCategory.set(cat.type, [...cat.items]);
  }
  for (const row of userItems) {
    const items = byCategory.get(row.category_type);
    if (items) items.push({ id: row.id, name: row.name, emoji: row.emoji, calories: row.calories });
  }
  return defaultCategories.map(cat => ({
    ...cat,
    items: byCategory.get(cat.type) ?? cat.items,
  }));
}

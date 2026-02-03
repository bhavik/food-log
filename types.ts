
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

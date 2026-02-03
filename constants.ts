
import { MealCategory } from './types';

export const MEAL_CATEGORIES: MealCategory[] = [
  {
    type: 'breakfast',
    label: 'BREAKFAST',
    color: 'border-slate-200',
    items: [
      { id: 'b1', name: 'Tea & Khakra (No Sugar)', emoji: '☕' },
      { id: 'b2', name: 'Oats with Nuts', emoji: '🥣' },
      { id: 'b3', name: '5 Almonds', emoji: '🥜' },
      { id: 'b4', name: '5 Walnuts', emoji: '🥜' }
    ]
  },
  {
    type: 'snack',
    label: 'SNACKS',
    color: 'border-slate-200',
    items: [
      { id: 's1', name: 'Siggi\'s Chas (Buttermilk)', emoji: '🥛' },
      { id: 's2', name: 'Fresh Apple / Pear', emoji: '🍎' },
      { id: 's3', name: 'Smoothie (Siggi\'s + Flax)', emoji: '🥤' },
      { id: 's4', name: 'Roasted Makhana', emoji: '🍿' },
      { id: 's5', name: 'Roasted Chana (1/4 cup)', emoji: '🥜' },
      { id: 's6', name: 'Sprouted Moong Salad', emoji: '🥗' },
      { id: 's7', name: 'Mixed Nuts (Almonds/Walnuts)', emoji: '🥜' }
    ]
  },
  {
    type: 'lunch',
    label: 'LUNCH',
    color: 'border-slate-200',
    items: [
      { id: 'l1', name: 'TJ / Costco Salad', emoji: '🥗' },
      { id: 'l2', name: 'Sprouted Moong Salad', emoji: '🥗' },
      { id: 'l3', name: 'Grilled Tofu Bowl', emoji: '🍲' },
      { id: 'l4', name: 'Chickpea (Chole) Salad', emoji: '🥗' },
      { id: 'l5', name: 'Tofu & Veggie Stir-fry', emoji: '🥦' },
      { id: 'l6', name: 'Mediterranean Bowl', emoji: '🥙' },
      { id: 'l7', name: 'Black-eyed Pea Salad', emoji: '🥗' },
      { id: 'l8', name: 'Quinoa & Veggie Pulao', emoji: '🍛' },
      { id: 'l9', name: 'Lentil Soup & Sprouted Bread', emoji: '🥣' },
      { id: 'l10', name: 'Tofu Bhurji (Turmeric)', emoji: '🍳' }
    ]
  },
  {
    type: 'dinner',
    label: 'DINNER',
    color: 'border-slate-200',
    items: [
      { id: 'd1', name: 'Bajra Roti, Chana Dal, Bhindi', emoji: '🫓' },
      { id: 'd2', name: 'Bajra Roti, Masoor Dal, Lauki', emoji: '🫓' },
      { id: 'd3', name: 'Bajra Roti, Mixed Sprouts', emoji: '🍛' },
      { id: 'd4', name: 'Bajra Roti, Rajma, Spinach', emoji: '🍲' },
      { id: 'd5', name: 'Bajra Roti, Yellow Moong, Methi', emoji: '🍛' },
      { id: 'd6', name: 'Tofu Steaks & Broccoli', emoji: '🥦' },
      { id: 'd7', name: 'Bajra Roti, Tofu, Bhindi', emoji: '🫓' },
      { id: 'd8', name: 'Moong Dal Cheela (2)', emoji: '🥞' }
    ]
  }
];

export const STORAGE_KEY = 'foodlog_v1_data';

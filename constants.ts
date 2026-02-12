
import { MealCategory } from './types';

export const MEAL_CATEGORIES: MealCategory[] = [
  {
    type: 'breakfast',
    label: 'BREAKFAST',
    color: 'border-slate-200',
    items: [
      { id: 'b1', name: 'Tea & Khakra (No Sugar)', recipe: '1 cup water, 1/4 cup 2% milk, 1 teaspoon of ginger, 1 tablespoon of wag bakri tea', emoji: '☕' },
      { id: 'b2', name: 'Oats with Nuts', recipe: '1 cup water, 1/4 cup oats, 5 almonds, 5 pista',  emoji: '🥣' },
      { id: 'b3', name: '5 Almonds', recipe: '5 almonds', emoji: '🥜' },
      { id: 'b4', name: '5 Walnuts', recipe: '5 walnuts', emoji: '🥜' }
    ]
  },
  {
    type: 'snack',
    label: 'SNACKS',
    color: 'border-slate-200',
    items: [
      { id: 's1', name: 'Siggi\'s Chas (Buttermilk)', recipe: '1 cup Siggi\'s Plain NonFat yogurt, 1/2 cup water, 1 teaspoon Jeera powder, 1 teaspoon of black salt', emoji: '🥛' },
      { id: 's2', name: 'Fresh Apple', recipe: '1 apple', emoji: '🍎' },
      { id: 's3', name: 'Smoothie (Siggi\'s + Flax)', recipe: '1 cup Siggi\'s Plain NonFat yogurt, 1/2 cup water, 1 teaspoon Jeera powder, 1 teaspoon of black salt', emoji: '🥤' },
      { id: 's4', name: 'Roasted Makhana', recipe: '1/4 cup makhana, 1 tablespoon of oil, 1 teaspoon of salt', emoji: '🍿' },
      { id: 's5', name: 'Roasted Chana (1/4 cup)', recipe: '1/4 cup chana, 1 tablespoon of oil, 1 teaspoon of salt', emoji: '🥜' },
      { id: 's6', name: 'Sprouted Moong Salad', recipe: '1/4 cup moong, 1 tablespoon of oil, 1 teaspoon of salt, 1 teaspoon of lemon juice', emoji: '🥗' },
      { id: 's7', name: 'Mixed Nuts (Almonds/Walnuts)', recipe: '5 almonds, 5 walnuts, 1 tablespoon of honey', emoji: '🥜' }
    ]
  },
  {
    type: 'lunch',
    label: 'LUNCH',
    color: 'border-slate-200',
    items: [
      { id: 'l1', name: 'Trader Joe\'s Mediterranean Salad', recipe: 'Salad bag', link: 'https://www.traderjoes.com/home/products/pdp/organic-mediterranean-style-salad-kit-062016', emoji: '🥗' },
      { id: 'l2', name: 'Trader Joe\'s Southwest Salad', recipe: 'Salad bag', link: 'https://www.traderjoes.com/home/products/pdp/southwestern-chopped-salad-kit-058463', emoji: '🥗' },
      { id: 'l3', name: 'Costco Mediterranean Salad', recipe: 'Salad bag', link: 'https://www.costco.com/organic-mediterranean-style-salad-kit-062016', emoji: '🥗' },
      { id: 'l4', name: 'Sprouted Moong Salad', recipe: '1/4 cup moong, 1 tablespoon of oil, 1 teaspoon of salt, 1 teaspoon of lemon juice', emoji: '🥗' },
      { id: 'l5', name: 'Grilled Tofu Bowl', recipe: '1/2 cup tofu, 1/2 cup vegetables, 1 tablespoon of olive oil, 1 teaspoon of salt', emoji: '🍲' },
      { id: 'l6', name: 'Trader Joe\'s Vegetable Roll', recipe: 'Vegetable roll bag', link: 'https://www.traderjoes.com/home/products/pdp/vegetable-roll-077695', emoji: '🥗' },
      { id: 'l7', name: 'Tofu & Veggie Stir-fry', recipe: '1/2 cup tofu, 1/2 cup vegetables, 1 tablespoon of olive oil, 1 teaspoon of salt', emoji: '🥦' },
      { id: 'l8', name: 'Mediterranean Bowl', recipe: '1/2 cup quinoa, 1/2 cup vegetables, 1 tablespoon of olive oil, 1 teaspoon of salt', emoji: '🥙' },
      { id: 'l9', name: 'Black-eyed Pea Salad', recipe: '1/2 cup black-eyed peas, 1/2 cup vegetables, 1 tablespoon of olive oil, 1 teaspoon of salt', emoji: '🥗' },
      { id: 'l10', name: 'Quinoa & Veggie Pulao', recipe: '1/2 cup quinoa, 1/2 cup vegetables, 1 tablespoon of olive oil, 1 teaspoon of salt', emoji: '🍛' },
      { id: 'l11', name: 'Lentil Soup & Sprouted Bread', recipe: '1/2 cup lentils, 1/2 cup vegetables, 1 tablespoon of olive oil, 1 teaspoon of salt', emoji: '🥣' },
      { id: 'l12', name: 'Tofu Bhurji (Turmeric)', recipe: '1/2 cup tofu, 1/2 cup vegetables, 1 tablespoon of olive oil, 1 teaspoon of salt', emoji: '🍳' }
    ]
  },
  {
    type: 'dinner',
    label: 'DINNER',
    color: 'border-slate-200',
    items: [
      { id: 'd1', name: 'Bajra Roti, Chana Dal, Bhindi', recipe: '1/2 cup bajra, 1/2 cup chana dal, 1/2 cup bhindi, 1 tablespoon of olive oil, 1 teaspoon of salt', emoji: '🫓' },
      { id: 'd2', name: 'Bajra Roti, Masoor Dal, Lauki', recipe: '1/2 cup bajra, 1/2 cup masoor dal, 1/2 cup lauki, 1 tablespoon of olive oil, 1 teaspoon of salt', emoji: '🫓' },
      { id: 'd3', name: 'Bajra Roti, Mixed Sprouts', recipe: '1/2 cup bajra, 1/2 cup mixed sprouts, 1 tablespoon of olive oil, 1 teaspoon of salt', emoji: '🍛' },
      { id: 'd4', name: 'Bajra Roti, Rajma, Spinach', recipe: '1/2 cup bajra, 1/2 cup rajma, 1/2 cup spinach, 1 tablespoon of olive oil, 1 teaspoon of salt', emoji: '🍲' },
      { id: 'd5', name: 'Bajra Roti, Yellow Moong, Methi', recipe: '1/2 cup bajra, 1/2 cup yellow moong, 1/2 cup methi, 1 tablespoon of olive oil, 1 teaspoon of salt', emoji: '🍛' },
      { id: 'd6', name: 'Tofu Steaks & Broccoli', recipe: '1/2 cup tofu, 1/2 cup broccoli, 1 tablespoon of olive oil, 1 teaspoon of salt', emoji: '🥦' },
      { id: 'd7', name: 'Bajra Roti, Tofu, Bhindi', recipe: '1/2 cup bajra, 1/2 cup tofu, 1/2 cup bhindi, 1 tablespoon of olive oil, 1 teaspoon of salt', emoji: '🫓' },
      { id: 'd8', name: 'Moong Dal Cheela (2)', recipe: '1/2 cup moong dal, 2 tablespoons of oil, 1 teaspoon of salt', emoji: '🥞' },
      { id: 'd9', name: 'Bajra Roti, Khichdi, Kadi, Lauki', recipe: '1/2 cup bajra, 1/2 cup khichdi, 1/2 cup kadi, 1/2 cup lauki, 1 tablespoon of olive oil, 1 teaspoon of salt', emoji: '🥞' }

    ]
  }
];

export const STORAGE_KEY = 'foodlog_v1_data';

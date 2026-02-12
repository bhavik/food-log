import type { MealCategory, MealType, FoodItem } from './types';

export type DietPlanId = 'gujarati-low-sugar-fat' | 'mediterranean' | 'indian-vegetarian' | 'indian-vegan';

export interface DietPlan {
  id: DietPlanId;
  name: string;
  description: string;
  benefits: string[];
  categories: MealCategory[];
}

const CATEGORY_LABELS: Record<MealType, string> = {
  breakfast: 'BREAKFAST',
  lunch: 'LUNCH',
  dinner: 'DINNER',
  snack: 'SNACKS',
  other: 'OTHER',
};

const CATEGORY_COLOR = 'border-slate-200';

// ----- Gujarati Low Sugar Low Fat (full list from original constants) -----
const gujaratiCategories: MealCategory[] = [
  {
    type: 'breakfast',
    label: CATEGORY_LABELS.breakfast,
    color: CATEGORY_COLOR,
    items: [
      { id: 'gujarati-b1', name: 'Tea & Khakra (No Sugar)', recipe: '1 cup water, 1/4 cup 2% milk, 1 teaspoon of ginger, 1 tablespoon of wag bakri tea', calories: 121.2, fat: 5.2, protein: 4.1, sugar: 1.0, emoji: '☕' },
      { id: 'gujarati-b2', name: 'Oats with Nuts', recipe: '1 cup water, 1/4 cup oats, 5 almonds, 5 pista', calories: 131.5, fat: 5.7, protein: 4.5, sugar: 0.9, emoji: '🥣' },
      { id: 'gujarati-b3', name: '5 Almonds', recipe: '5 almonds', calories: 34.7, fat: 3.0, protein: 1.3, sugar: 0.3, emoji: '🥜' },
      { id: 'gujarati-b4', name: '5 Walnuts', recipe: '5 walnuts', calories: 65.4, fat: 6.5, protein: 1.5, sugar: 0.3, emoji: '🥜' },
    ],
  },
  {
    type: 'snack',
    label: CATEGORY_LABELS.snack,
    color: CATEGORY_COLOR,
    items: [
      { id: 'gujarati-s1', name: "Siggi's Chas (Buttermilk)", recipe: "1 cup Siggi's Plain NonFat yogurt, 1/2 cup water, 1 teaspoon Jeera powder, 1 teaspoon of black salt", calories: 144.1, fat: 0.0, protein: 27.4, sugar: 7.2, emoji: '🥛' },
      { id: 'gujarati-s2', name: 'Fresh Apple', recipe: '1 apple', calories: 107.4, fat: 0.3, protein: 0.5, sugar: 19.5, emoji: '🍎' },
      { id: 'gujarati-s3', name: "Smoothie (Siggi's + Flax)", recipe: "1 cup Siggi's Plain NonFat yogurt, 1/2 cup water, 1 teaspoon Jeera powder, 1 teaspoon of black salt", calories: 144.1, fat: 0.0, protein: 27.4, sugar: 7.2, emoji: '🥤' },
      { id: 'gujarati-s4', name: 'Roasted Makhana', recipe: '1/4 cup makhana, 1 tablespoon of oil, 1 teaspoon of salt', calories: 31.3, fat: 0.1, protein: 1.3, sugar: 0.0, emoji: '🍿' },
      { id: 'gujarati-s5', name: 'Roasted Chana (1/4 cup)', recipe: '1/4 cup chana, 1 tablespoon of oil, 1 teaspoon of salt', calories: 110.1, fat: 4.0, protein: 5.0, sugar: 0.0, emoji: '🥜' },
      { id: 'gujarati-s6', name: 'Sprouted Moong Salad', recipe: '1/4 cup moong, 1 tablespoon of oil, 1 teaspoon of salt, 1 teaspoon of lemon juice', calories: 173.5, fat: 0.6, protein: 11.9, sugar: 3.3, emoji: '🥗' },
      { id: 'gujarati-s7', name: 'Mixed Nuts (Almonds/Walnuts)', recipe: '5 almonds, 5 walnuts, 1 tablespoon of honey', calories: 164.0, fat: 9.5, protein: 2.9, sugar: 17.8, emoji: '🥜' },
    ],
  },
  {
    type: 'lunch',
    label: CATEGORY_LABELS.lunch,
    color: CATEGORY_COLOR,
    items: [
      { id: 'gujarati-l1', name: "Trader Joe's Mediterranean Salad", recipe: 'Salad bag', link: 'https://www.traderjoes.com/home/products/pdp/organic-mediterranean-style-salad-kit-062016', calories: 55.0, fat: 3.5, protein: 1.0, sugar: 1.5, emoji: '🥗' },
      { id: 'gujarati-l2', name: "Trader Joe's Southwest Salad", recipe: 'Salad bag', link: 'https://www.traderjoes.com/home/products/pdp/southwestern-chopped-salad-kit-058463', calories: 80.0, fat: 6.0, protein: 2.5, sugar: 1.5, emoji: '🥗' },
      { id: 'gujarati-l3', name: 'Costco Mediterranean Salad', recipe: 'Salad bag', link: 'https://www.costco.com/organic-mediterranean-style-salad-kit-062016', calories: 75.0, fat: 5.0, protein: 1.0, sugar: 3.0, emoji: '🥗' },
      { id: 'gujarati-l4', name: 'Sprouted Moong Salad', recipe: '1/4 cup moong, 1 tablespoon of oil, 1 teaspoon of salt, 1 teaspoon of lemon juice', calories: 173.5, fat: 0.6, protein: 11.9, sugar: 3.3, emoji: '🥗' },
      { id: 'gujarati-l5', name: 'Grilled Tofu Bowl', recipe: '1/2 cup tofu, 1/2 cup vegetables, 1 tablespoon of olive oil, 1 teaspoon of salt', calories: 197.9, fat: 11.1, protein: 22.7, sugar: 0.8, emoji: '🍲' },
      { id: 'gujarati-l6', name: "Trader Joe's Vegetable Roll", recipe: 'Vegetable roll bag', link: 'https://www.traderjoes.com/home/products/pdp/vegetable-roll-077695', calories: 120.0, fat: 1.8, protein: 2.5, sugar: 5.5, emoji: '🥗' },
      { id: 'gujarati-l7', name: 'Tofu & Veggie Stir-fry', recipe: '1/2 cup tofu, 1/2 cup vegetables, 1 tablespoon of olive oil, 1 teaspoon of salt', calories: 197.9, fat: 11.1, protein: 22.7, sugar: 0.8, emoji: '🥦' },
      { id: 'gujarati-l8', name: 'Mediterranean Bowl', recipe: '1/2 cup quinoa, 1/2 cup vegetables, 1 tablespoon of olive oil, 1 teaspoon of salt', calories: 337.8, fat: 3.8, protein: 12.3, sugar: 2.6, emoji: '🥙' },
      { id: 'gujarati-l9', name: 'Black-eyed Pea Salad', recipe: '1/2 cup black-eyed peas, 1/2 cup vegetables, 1 tablespoon of olive oil, 1 teaspoon of salt', calories: 297.0, fat: 1.1, protein: 20.4, sugar: 6.8, emoji: '🥗' },
      { id: 'gujarati-l10', name: 'Quinoa & Veggie Pulao', recipe: '1/2 cup quinoa, 1/2 cup vegetables, 1 tablespoon of olive oil, 1 teaspoon of salt', calories: 337.8, fat: 3.8, protein: 12.3, sugar: 2.6, emoji: '🍛' },
      { id: 'gujarati-l11', name: 'Lentil Soup & Sprouted Bread', recipe: '1/2 cup lentils, 1/2 cup vegetables, 1 tablespoon of olive oil, 1 teaspoon of salt', calories: 354.4, fat: 1.2, protein: 24.6, sugar: 2.7, emoji: '🥣' },
      { id: 'gujarati-l12', name: 'Tofu Bhurji (Turmeric)', recipe: '1/2 cup tofu, 1/2 cup vegetables, 1 tablespoon of olive oil, 1 teaspoon of salt', calories: 197.9, fat: 11.1, protein: 22.7, sugar: 0.8, emoji: '🍳' },
    ],
  },
  {
    type: 'dinner',
    label: CATEGORY_LABELS.dinner,
    color: CATEGORY_COLOR,
    items: [
      { id: 'gujarati-d1', name: 'Bajra Roti, Chana Dal, Bhindi', recipe: '1/2 cup bajra, 1/2 cup chana dal, 1/2 cup bhindi, 1 tablespoon of olive oil, 1 teaspoon of salt', calories: 554.8, fat: 7.6, protein: 27.1, sugar: 4.2, emoji: '🫓' },
      { id: 'gujarati-d2', name: 'Bajra Roti, Masoor Dal, Lauki', recipe: '1/2 cup bajra, 1/2 cup masoor dal, 1/2 cup lauki, 1 tablespoon of olive oil, 1 teaspoon of salt', calories: 574.1, fat: 3.6, protein: 30.4, sugar: 2.9, emoji: '🫓' },
      { id: 'gujarati-d3', name: 'Bajra Roti, Mixed Sprouts', recipe: '1/2 cup bajra, 1/2 cup mixed sprouts, 1 tablespoon of olive oil, 1 teaspoon of salt', calories: 576.2, fat: 3.8, protein: 30.4, sugar: 7.6, emoji: '🍛' },
      { id: 'gujarati-d4', name: 'Bajra Roti, Rajma, Spinach', recipe: '1/2 cup bajra, 1/2 cup rajma, 1/2 cup spinach, 1 tablespoon of olive oil, 1 teaspoon of salt', calories: 542.7, fat: 3.7, protein: 27.6, sugar: 3.0, emoji: '🍲' },
      { id: 'gujarati-d5', name: 'Bajra Roti, Yellow Moong, Methi', recipe: '1/2 cup bajra, 1/2 cup yellow moong, 1/2 cup methi, 1 tablespoon of olive oil, 1 teaspoon of salt', calories: 579.7, fat: 3.8, protein: 30.8, sugar: 7.7, emoji: '🍛' },
      { id: 'gujarati-d6', name: 'Tofu Steaks & Broccoli', recipe: '1/2 cup tofu, 1/2 cup broccoli, 1 tablespoon of olive oil, 1 teaspoon of salt', calories: 198.4, fat: 11.1, protein: 23.2, sugar: 0.8, emoji: '🥦' },
      { id: 'gujarati-d7', name: 'Bajra Roti, Tofu, Bhindi', recipe: '1/2 cup bajra, 1/2 cup tofu, 1/2 cup bhindi, 1 tablespoon of olive oil, 1 teaspoon of salt', calories: 427.1, fat: 13.6, protein: 29.2, sugar: 1.8, emoji: '🫓' },
      { id: 'gujarati-d8', name: 'Moong Dal Cheela (2)', recipe: '1/2 cup moong dal, 2 tablespoons of oil, 1 teaspoon of salt', calories: 347.0, fat: 1.2, protein: 23.9, sugar: 6.6, emoji: '🥞' },
      { id: 'gujarati-d9', name: 'Bajra Roti, Khichdi, Kadi, Lauki', recipe: '1/2 cup bajra, 1/2 cup khichdi, 1/2 cup kadi, 1/2 cup lauki, 1 tablespoon of olive oil, 1 teaspoon of salt', calories: 839.7, fat: 13.0, protein: 57.0, sugar: 10.0, emoji: '🥞' },
    ],
  },
];

// ----- Mediterranean (10 items per category) -----
const mediterraneanCategories: MealCategory[] = [
  {
    type: 'breakfast',
    label: CATEGORY_LABELS.breakfast,
    color: CATEGORY_COLOR,
    items: [
      { id: 'med-b1', name: 'Greek Yogurt with Honey & Walnuts', recipe: '1 cup Greek yogurt, 1 tbsp honey, 5 walnuts', calories: 220, fat: 12, protein: 12, sugar: 14, emoji: '🥣' },
      { id: 'med-b2', name: 'Oats with Olive Oil & Tomato', recipe: 'Oats, olive oil, cherry tomatoes', calories: 180, fat: 6, protein: 5, sugar: 2, emoji: '🥣' },
      { id: 'med-b3', name: 'Whole Grain Toast with Avocado', recipe: '1 slice whole grain, 1/2 avocado', calories: 250, fat: 18, protein: 6, sugar: 2, emoji: '🍞' },
      { id: 'med-b4', name: 'Mediterranean Omelette (Veg)', recipe: 'Eggs, spinach, feta, olive oil', calories: 200, fat: 14, protein: 12, sugar: 2, emoji: '🍳' },
      { id: 'med-b5', name: 'Fruit & Nut Bowl', recipe: 'Mixed berries, almonds, walnuts', calories: 190, fat: 10, protein: 5, sugar: 18, emoji: '🍓' },
      { id: 'med-b6', name: 'Cottage Cheese with Cucumber', recipe: '1/2 cup cottage cheese, cucumber', calories: 120, fat: 3, protein: 14, sugar: 4, emoji: '🥒' },
      { id: 'med-b7', name: 'Hummus Toast', recipe: 'Whole grain toast, 2 tbsp hummus', calories: 180, fat: 8, protein: 7, sugar: 3, emoji: '🍞' },
      { id: 'med-b8', name: 'Olive & Feta Scramble', recipe: 'Eggs, olives, feta, herbs', calories: 240, fat: 18, protein: 14, sugar: 2, emoji: '🍳' },
      { id: 'med-b9', name: 'Overnight Oats with Figs', recipe: 'Oats, figs, almond milk', calories: 280, fat: 6, protein: 8, sugar: 22, emoji: '🥣' },
      { id: 'med-b10', name: 'Tomato & Basil Bruschetta', recipe: '2 slices bread, tomato, basil, olive oil', calories: 200, fat: 10, protein: 5, sugar: 4, emoji: '🍞' },
    ],
  },
  {
    type: 'snack',
    label: CATEGORY_LABELS.snack,
    color: CATEGORY_COLOR,
    items: [
      { id: 'med-s1', name: 'Hummus with Veggie Sticks', recipe: '1/4 cup hummus, cucumber/carrot', calories: 150, fat: 10, protein: 5, sugar: 4, emoji: '🥕' },
      { id: 'med-s2', name: 'Handful of Olives & Almonds', recipe: '8-10 olives, 8-10 almonds', calories: 120, fat: 11, protein: 3, sugar: 1, emoji: '🫒' },
      { id: 'med-s3', name: 'Fresh Apple', recipe: '1 apple', calories: 107, fat: 0.3, protein: 0.5, sugar: 19.5, emoji: '🍎' },
      { id: 'med-s4', name: 'Greek Yogurt (Plain)', recipe: '1 cup non-fat Greek yogurt', calories: 100, fat: 0.5, protein: 17, sugar: 4, emoji: '🥛' },
      { id: 'med-s5', name: 'Cherry Tomatoes & Mozzarella', recipe: '1 cup tomatoes, 1 oz mozzarella', calories: 90, fat: 5, protein: 6, sugar: 4, emoji: '🍅' },
      { id: 'med-s6', name: 'Whole Grain Crackers & Tahini', recipe: '5 crackers, 1 tbsp tahini', calories: 160, fat: 10, protein: 5, sugar: 2, emoji: '🍘' },
      { id: 'med-s7', name: 'Orange', recipe: '1 medium orange', calories: 62, fat: 0.2, protein: 1.2, sugar: 12, emoji: '🍊' },
      { id: 'med-s8', name: 'Roasted Chickpeas (1/4 cup)', recipe: 'Chickpeas, olive oil, spices', calories: 130, fat: 4, protein: 6, sugar: 2, emoji: '🥜' },
      { id: 'med-s9', name: 'Cucumber with Tzatziki', recipe: '1/2 cucumber, 2 tbsp tzatziki', calories: 60, fat: 2, protein: 3, sugar: 4, emoji: '🥒' },
      { id: 'med-s10', name: 'Dates & Almonds (3+5)', recipe: '3 dates, 5 almonds', calories: 140, fat: 6, protein: 3, sugar: 18, emoji: '🫒' },
    ],
  },
  {
    type: 'lunch',
    label: CATEGORY_LABELS.lunch,
    color: CATEGORY_COLOR,
    items: [
      { id: 'med-l1', name: "Mediterranean Salad (TJ's style)", recipe: 'Greens, olives, feta, dressing', calories: 55, fat: 3.5, protein: 1, sugar: 1.5, emoji: '🥗' },
      { id: 'med-l2', name: 'Mediterranean Bowl', recipe: 'Quinoa, chickpeas, veg, olive oil', calories: 338, fat: 3.8, protein: 12.3, sugar: 2.6, emoji: '🥙' },
      { id: 'med-l3', name: 'Grilled Tofu Bowl', recipe: 'Tofu, vegetables', calories: 198, fat: 11.1, protein: 22.7, sugar: 0.8, emoji: '🍲' },
      { id: 'med-l4', name: 'Lentil & Vegetable Soup', recipe: 'Lentils, celery, carrot, olive oil', calories: 280, fat: 4, protein: 16, sugar: 5, emoji: '🥣' },
      { id: 'med-l5', name: 'Falafel Wrap (2 falafel)', recipe: 'Whole wheat wrap, falafel, tahini, salad', calories: 380, fat: 16, protein: 12, sugar: 6, emoji: '🥙' },
      { id: 'med-l6', name: 'Greek Salad with Grilled Halloumi', recipe: 'Tomato, cucumber, olives, halloumi', calories: 320, fat: 24, protein: 14, sugar: 8, emoji: '🥗' },
      { id: 'med-l7', name: 'Ratatouille with Quinoa', recipe: 'Eggplant, zucchini, tomato, quinoa', calories: 290, fat: 8, protein: 10, sugar: 12, emoji: '🍲' },
      { id: 'med-l8', name: 'Chickpea Buddha Bowl', recipe: 'Chickpeas, greens, avocado, tahini', calories: 420, fat: 22, protein: 16, sugar: 10, emoji: '🥣' },
      { id: 'med-l9', name: 'Tofu & Veggie Stir-fry', recipe: 'Tofu, broccoli, olive oil', calories: 198, fat: 11.1, protein: 22.7, sugar: 0.8, emoji: '🥦' },
      { id: 'med-l10', name: 'Black-eyed Pea Salad', recipe: 'Black-eyed peas, veg, herbs', calories: 297, fat: 1.1, protein: 20.4, sugar: 6.8, emoji: '🥗' },
    ],
  },
  {
    type: 'dinner',
    label: CATEGORY_LABELS.dinner,
    color: CATEGORY_COLOR,
    items: [
      { id: 'med-d1', name: 'Grilled Veggies & Chickpeas', recipe: 'Bell pepper, zucchini, chickpeas, olive oil', calories: 320, fat: 12, protein: 14, sugar: 8, emoji: '🥦' },
      { id: 'med-d2', name: 'Mediterranean Bowl', recipe: 'Quinoa, chickpeas, veg', calories: 338, fat: 3.8, protein: 12.3, sugar: 2.6, emoji: '🥙' },
      { id: 'med-d3', name: 'Tofu & Veggie Stir-fry', recipe: 'Tofu, broccoli, olive oil', calories: 198, fat: 11.1, protein: 22.7, sugar: 0.8, emoji: '🥦' },
      { id: 'med-d4', name: 'Black-eyed Pea Salad', recipe: 'Black-eyed peas, veg, herbs', calories: 297, fat: 1.1, protein: 20.4, sugar: 6.8, emoji: '🥗' },
      { id: 'med-d5', name: 'Baked Salmon with Roasted Veg', recipe: '4 oz salmon, zucchini, tomato', calories: 350, fat: 18, protein: 32, sugar: 4, emoji: '🐟' },
      { id: 'med-d6', name: 'Stuffed Bell Peppers', recipe: 'Quinoa, chickpeas, feta, herbs', calories: 280, fat: 10, protein: 12, sugar: 8, emoji: '🫑' },
      { id: 'med-d7', name: 'Lentil Soup with Whole Grain Bread', recipe: 'Lentils, veg, 1 slice bread', calories: 320, fat: 5, protein: 18, sugar: 6, emoji: '🥣' },
      { id: 'med-d8', name: 'Grilled Eggplant with Tahini', recipe: 'Eggplant, tahini, lemon', calories: 220, fat: 14, protein: 6, sugar: 8, emoji: '🍆' },
      { id: 'med-d9', name: 'White Bean & Spinach Stew', recipe: 'Cannellini beans, spinach, tomato', calories: 260, fat: 6, protein: 14, sugar: 6, emoji: '🍲' },
      { id: 'med-d10', name: 'Quinoa Tabbouleh', recipe: 'Quinoa, parsley, tomato, cucumber', calories: 240, fat: 10, protein: 8, sugar: 6, emoji: '🥗' },
    ],
  },
];

// ----- Indian Vegetarian (10 items per category) -----
const indianVegetarianCategories: MealCategory[] = [
  {
    type: 'breakfast',
    label: CATEGORY_LABELS.breakfast,
    color: CATEGORY_COLOR,
    items: [
      { id: 'indveg-b1', name: 'Tea & Khakra (No Sugar)', recipe: '1 cup water, 1/4 cup 2% milk, ginger, wag bakri tea', calories: 121.2, fat: 5.2, protein: 4.1, sugar: 1.0, emoji: '☕' },
      { id: 'indveg-b2', name: 'Oats with Nuts', recipe: '1/4 cup oats, 5 almonds, 5 pista', calories: 131.5, fat: 5.7, protein: 4.5, sugar: 0.9, emoji: '🥣' },
      { id: 'indveg-b3', name: 'Poha', recipe: 'Flattened rice, peanuts, lemon', calories: 250, fat: 8, protein: 5, sugar: 2, emoji: '🍲' },
      { id: 'indveg-b4', name: 'Idli with Chutney (2 pc)', recipe: '2 idlis, coconut chutney', calories: 140, fat: 2, protein: 4, sugar: 2, emoji: '🍛' },
      { id: 'indveg-b5', name: 'Upma', recipe: 'Semolina, vegetables, mustard seeds', calories: 220, fat: 8, protein: 6, sugar: 2, emoji: '🍲' },
      { id: 'indveg-b6', name: 'Dosa (1) with Chutney', recipe: '1 dosa, coconut chutney', calories: 180, fat: 5, protein: 4, sugar: 2, emoji: '🥞' },
      { id: 'indveg-b7', name: 'Paratha (1) with Curd', recipe: '1 aloo/plain paratha, curd', calories: 280, fat: 12, protein: 8, sugar: 3, emoji: '🫓' },
      { id: 'indveg-b8', name: '5 Almonds', recipe: '5 almonds', calories: 34.7, fat: 3, protein: 1.3, sugar: 0.3, emoji: '🥜' },
      { id: 'indveg-b9', name: 'Methi Thepla (2)', recipe: '2 methi thepla', calories: 200, fat: 8, protein: 6, sugar: 2, emoji: '🫓' },
      { id: 'indveg-b10', name: 'Besan Chilla (2)', recipe: '2 besan chilla', calories: 180, fat: 6, protein: 10, sugar: 4, emoji: '🥞' },
    ],
  },
  {
    type: 'snack',
    label: CATEGORY_LABELS.snack,
    color: CATEGORY_COLOR,
    items: [
      { id: 'indveg-s1', name: 'Fresh Apple', recipe: '1 apple', calories: 107.4, fat: 0.3, protein: 0.5, sugar: 19.5, emoji: '🍎' },
      { id: 'indveg-s2', name: 'Roasted Chana (1/4 cup)', recipe: 'Roasted chana', calories: 110, fat: 4, protein: 5, sugar: 0, emoji: '🥜' },
      { id: 'indveg-s3', name: 'Sprouted Moong Salad', recipe: 'Moong, lemon', calories: 174, fat: 0.6, protein: 11.9, sugar: 3.3, emoji: '🥗' },
      { id: 'indveg-s4', name: "Siggi's Chas (Buttermilk)", recipe: 'Non-fat yogurt, jeera, black salt', calories: 144, fat: 0, protein: 27.4, sugar: 7.2, emoji: '🥛' },
      { id: 'indveg-s5', name: 'Roasted Makhana', recipe: '1/4 cup makhana', calories: 31, fat: 0.1, protein: 1.3, sugar: 0, emoji: '🍿' },
      { id: 'indveg-s6', name: 'Fruit Chaat', recipe: 'Apple, banana, pomegranate, chaat masala', calories: 150, fat: 2, protein: 2, sugar: 28, emoji: '🍎' },
      { id: 'indveg-s7', name: 'Dhokla (2 pc)', recipe: '2 pieces dhokla', calories: 120, fat: 2, protein: 5, sugar: 4, emoji: '🍲' },
      { id: 'indveg-s8', name: 'Bhel Puri (1 cup)', recipe: 'Puffed rice, chutney, veggies', calories: 200, fat: 6, protein: 4, sugar: 8, emoji: '🥗' },
      { id: 'indveg-s9', name: 'Masala Chai with Biscuit', recipe: '1 cup chai, 2 biscuits', calories: 140, fat: 5, protein: 2, sugar: 12, emoji: '☕' },
      { id: 'indveg-s10', name: 'Mixed Nuts (Almonds/Walnuts)', recipe: '5 almonds, 5 walnuts', calories: 164, fat: 9.5, protein: 2.9, sugar: 17.8, emoji: '🥜' },
    ],
  },
  {
    type: 'lunch',
    label: CATEGORY_LABELS.lunch,
    color: CATEGORY_COLOR,
    items: [
      { id: 'indveg-l1', name: 'Roti, Daal, Rice, Sabzi', recipe: '2 roti, 1 cup daal, 1 cup rice, sabzi', calories: 520, fat: 12, protein: 18, sugar: 4, emoji: '🍛' },
      { id: 'indveg-l2', name: 'Pav Bhaji', recipe: '2 pav, 1 cup bhaji', calories: 380, fat: 16, protein: 10, sugar: 8, emoji: '🍞' },
      { id: 'indveg-l3', name: 'Quinoa & Veggie Pulao', recipe: 'Quinoa, vegetables', calories: 338, fat: 3.8, protein: 12.3, sugar: 2.6, emoji: '🍛' },
      { id: 'indveg-l4', name: 'Lentil Soup & Sprouted Bread', recipe: 'Lentils, vegetables', calories: 354, fat: 1.2, protein: 24.6, sugar: 2.7, emoji: '🥣' },
      { id: 'indveg-l5', name: 'Rajma Chawal', recipe: '1 cup rajma, 1 cup rice', calories: 450, fat: 10, protein: 18, sugar: 4, emoji: '🍛' },
      { id: 'indveg-l6', name: 'Chole Bhature (1 bhatura)', recipe: 'Chole, 1 bhatura', calories: 420, fat: 18, protein: 12, sugar: 6, emoji: '🫓' },
      { id: 'indveg-l7', name: 'Vegetable Biryani (1 cup)', recipe: 'Rice, mixed vegetables, spices', calories: 380, fat: 12, protein: 10, sugar: 4, emoji: '🍛' },
      { id: 'indveg-l8', name: 'Dal Fry, Rice, Salad', recipe: '1 cup dal, 1 cup rice, salad', calories: 400, fat: 8, protein: 16, sugar: 4, emoji: '🍲' },
      { id: 'indveg-l9', name: 'Grilled Tofu Bowl', recipe: 'Tofu, vegetables', calories: 198, fat: 11.1, protein: 22.7, sugar: 0.8, emoji: '🍲' },
      { id: 'indveg-l10', name: 'Tofu Bhurji (Turmeric)', recipe: 'Tofu, vegetables', calories: 198, fat: 11.1, protein: 22.7, sugar: 0.8, emoji: '🍳' },
    ],
  },
  {
    type: 'dinner',
    label: CATEGORY_LABELS.dinner,
    color: CATEGORY_COLOR,
    items: [
      { id: 'indveg-d1', name: 'Pizza (2 slices, veg)', recipe: '2 slices cheese/veg pizza', calories: 400, fat: 16, protein: 14, sugar: 6, emoji: '🍕' },
      { id: 'indveg-d2', name: 'Bajra Roti, Chana Dal, Bhindi', recipe: 'Bajra roti, chana dal, bhindi', calories: 555, fat: 7.6, protein: 27.1, sugar: 4.2, emoji: '🫓' },
      { id: 'indveg-d3', name: 'Roti, Daal, Rice, Sabzi', recipe: '2 roti, daal, rice, sabzi', calories: 520, fat: 12, protein: 18, sugar: 4, emoji: '🍛' },
      { id: 'indveg-d4', name: 'Tofu Bhurji (Turmeric)', recipe: 'Tofu, vegetables', calories: 198, fat: 11.1, protein: 22.7, sugar: 0.8, emoji: '🍳' },
      { id: 'indveg-d5', name: 'Palak Paneer, 2 Roti', recipe: 'Palak paneer, 2 roti', calories: 480, fat: 22, protein: 24, sugar: 6, emoji: '🍲' },
      { id: 'indveg-d6', name: 'Vegetable Pulao, Raita', recipe: '1 cup pulao, 1/2 cup raita', calories: 420, fat: 10, protein: 12, sugar: 8, emoji: '🍛' },
      { id: 'indveg-d7', name: 'Khichdi, Kadhi', recipe: '1 cup khichdi, 1/2 cup kadhi', calories: 380, fat: 8, protein: 14, sugar: 6, emoji: '🍲' },
      { id: 'indveg-d8', name: 'Moong Dal Cheela (2)', recipe: '2 moong dal cheela', calories: 347, fat: 1.2, protein: 23.9, sugar: 6.6, emoji: '🥞' },
      { id: 'indveg-d9', name: 'Dosa (2) with Sambar', recipe: '2 dosa, sambar', calories: 360, fat: 10, protein: 10, sugar: 4, emoji: '🥞' },
      { id: 'indveg-d10', name: 'Bajra Roti, Rajma, Spinach', recipe: 'Bajra roti, rajma, spinach', calories: 543, fat: 3.7, protein: 27.6, sugar: 3, emoji: '🍲' },
    ],
  },
];

// ----- Indian Vegan (10 items per category) -----
const indianVeganCategories: MealCategory[] = [
  {
    type: 'breakfast',
    label: CATEGORY_LABELS.breakfast,
    color: CATEGORY_COLOR,
    items: [
      { id: 'indvegan-b1', name: 'Oats with Nuts (plant milk)', recipe: 'Oats, almonds, pista, water/oat milk', calories: 160, fat: 8, protein: 5, sugar: 1, emoji: '🥣' },
      { id: 'indvegan-b2', name: '5 Almonds', recipe: '5 almonds', calories: 35, fat: 3, protein: 1.3, sugar: 0.3, emoji: '🥜' },
      { id: 'indvegan-b3', name: '5 Walnuts', recipe: '5 walnuts', calories: 65, fat: 6.5, protein: 1.5, sugar: 0.3, emoji: '🥜' },
      { id: 'indvegan-b4', name: 'Moong Dal Cheela (2)', recipe: 'Moong dal, no dairy', calories: 347, fat: 1.2, protein: 23.9, sugar: 6.6, emoji: '🥞' },
      { id: 'indvegan-b5', name: 'Poha (no dairy)', recipe: 'Flattened rice, peanuts, lemon', calories: 240, fat: 7, protein: 5, sugar: 2, emoji: '🍲' },
      { id: 'indvegan-b6', name: 'Upma (vegan)', recipe: 'Semolina, vegetables', calories: 210, fat: 7, protein: 5, sugar: 2, emoji: '🍲' },
      { id: 'indvegan-b7', name: 'Idli (2) with Coconut Chutney', recipe: '2 idlis, coconut chutney (no dairy)', calories: 140, fat: 2, protein: 4, sugar: 2, emoji: '🍛' },
      { id: 'indvegan-b8', name: 'Smoothie (plant milk, banana, nuts)', recipe: 'Oat milk, banana, almonds', calories: 220, fat: 8, protein: 5, sugar: 24, emoji: '🥤' },
      { id: 'indvegan-b9', name: 'Besan Chilla (2)', recipe: '2 besan chilla, no ghee', calories: 170, fat: 5, protein: 10, sugar: 4, emoji: '🥞' },
      { id: 'indvegan-b10', name: 'Fruit Bowl', recipe: 'Banana, apple, pomegranate', calories: 180, fat: 1, protein: 2, sugar: 38, emoji: '🍎' },
    ],
  },
  {
    type: 'snack',
    label: CATEGORY_LABELS.snack,
    color: CATEGORY_COLOR,
    items: [
      { id: 'indvegan-s1', name: 'Fresh Apple', recipe: '1 apple', calories: 107, fat: 0.3, protein: 0.5, sugar: 19.5, emoji: '🍎' },
      { id: 'indvegan-s2', name: 'Roasted Makhana', recipe: '1/4 cup makhana', calories: 31, fat: 0.1, protein: 1.3, sugar: 0, emoji: '🍿' },
      { id: 'indvegan-s3', name: 'Sprouted Moong Salad', recipe: 'Moong, lemon', calories: 174, fat: 0.6, protein: 11.9, sugar: 3.3, emoji: '🥗' },
      { id: 'indvegan-s4', name: 'Roasted Chana (1/4 cup)', recipe: 'Roasted chana', calories: 110, fat: 4, protein: 5, sugar: 0, emoji: '🥜' },
      { id: 'indvegan-s5', name: 'Fruit Chaat (vegan)', recipe: 'Apple, banana, pomegranate', calories: 140, fat: 1, protein: 2, sugar: 30, emoji: '🍎' },
      { id: 'indvegan-s6', name: 'Dhokla (2 pc)', recipe: '2 pieces dhokla', calories: 120, fat: 2, protein: 5, sugar: 4, emoji: '🍲' },
      { id: 'indvegan-s7', name: 'Hummus with Carrot Sticks', recipe: '1/4 cup hummus, carrot', calories: 130, fat: 8, protein: 5, sugar: 4, emoji: '🥕' },
      { id: 'indvegan-s8', name: 'Dates (3)', recipe: '3 dates', calories: 90, fat: 0, protein: 1, sugar: 22, emoji: '🌴' },
      { id: 'indvegan-s9', name: 'Roasted Chickpeas (1/4 cup)', recipe: 'Chickpeas, spices', calories: 130, fat: 4, protein: 6, sugar: 2, emoji: '🥜' },
      { id: 'indvegan-s10', name: 'Mixed Nuts', recipe: '5 almonds, 5 walnuts', calories: 164, fat: 9.5, protein: 2.9, sugar: 17.8, emoji: '🥜' },
    ],
  },
  {
    type: 'lunch',
    label: CATEGORY_LABELS.lunch,
    color: CATEGORY_COLOR,
    items: [
      { id: 'indvegan-l1', name: 'Roti, Daal, Rice, Sabzi', recipe: '2 roti, daal, rice, sabzi (no ghee)', calories: 520, fat: 12, protein: 18, sugar: 4, emoji: '🍛' },
      { id: 'indvegan-l2', name: 'Grilled Tofu Bowl', recipe: 'Tofu, vegetables', calories: 198, fat: 11.1, protein: 22.7, sugar: 0.8, emoji: '🍲' },
      { id: 'indvegan-l3', name: 'Quinoa & Veggie Pulao', recipe: 'Quinoa, vegetables', calories: 338, fat: 3.8, protein: 12.3, sugar: 2.6, emoji: '🍛' },
      { id: 'indvegan-l4', name: 'Lentil Soup & Sprouted Bread', recipe: 'Lentils, bread', calories: 354, fat: 1.2, protein: 24.6, sugar: 2.7, emoji: '🥣' },
      { id: 'indvegan-l5', name: 'Rajma Chawal', recipe: '1 cup rajma, 1 cup rice', calories: 450, fat: 10, protein: 18, sugar: 4, emoji: '🍛' },
      { id: 'indvegan-l6', name: 'Chole with Roti (2)', recipe: 'Chole, 2 roti (no ghee)', calories: 380, fat: 10, protein: 14, sugar: 6, emoji: '🫓' },
      { id: 'indvegan-l7', name: 'Vegetable Biryani (1 cup)', recipe: 'Rice, mixed vegetables', calories: 380, fat: 12, protein: 10, sugar: 4, emoji: '🍛' },
      { id: 'indvegan-l8', name: 'Dal Fry, Rice, Salad', recipe: '1 cup dal, 1 cup rice, salad', calories: 400, fat: 8, protein: 16, sugar: 4, emoji: '🍲' },
      { id: 'indvegan-l9', name: 'Tofu & Veggie Stir-fry', recipe: 'Tofu, vegetables', calories: 198, fat: 11.1, protein: 22.7, sugar: 0.8, emoji: '🥦' },
      { id: 'indvegan-l10', name: 'Sprouted Moong Salad', recipe: 'Moong, lemon', calories: 174, fat: 0.6, protein: 11.9, sugar: 3.3, emoji: '🥗' },
    ],
  },
  {
    type: 'dinner',
    label: CATEGORY_LABELS.dinner,
    color: CATEGORY_COLOR,
    items: [
      { id: 'indvegan-d1', name: 'Bajra Roti, Chana Dal, Bhindi', recipe: 'No ghee', calories: 555, fat: 7.6, protein: 27.1, sugar: 4.2, emoji: '🫓' },
      { id: 'indvegan-d2', name: 'Bajra Roti, Rajma, Spinach', recipe: 'Plant-based', calories: 543, fat: 3.7, protein: 27.6, sugar: 3, emoji: '🍲' },
      { id: 'indvegan-d3', name: 'Tofu & Veggie Stir-fry', recipe: 'Tofu, vegetables', calories: 198, fat: 11.1, protein: 22.7, sugar: 0.8, emoji: '🥦' },
      { id: 'indvegan-d4', name: 'Tofu Steaks & Broccoli', recipe: 'Tofu, broccoli', calories: 198, fat: 11.1, protein: 23.2, sugar: 0.8, emoji: '🥦' },
      { id: 'indvegan-d5', name: 'Khichdi (vegan)', recipe: '1 cup khichdi', calories: 320, fat: 6, protein: 12, sugar: 4, emoji: '🍲' },
      { id: 'indvegan-d6', name: 'Roti, Daal, Rice, Sabzi', recipe: '2 roti, daal, rice, sabzi', calories: 520, fat: 12, protein: 18, sugar: 4, emoji: '🍛' },
      { id: 'indvegan-d7', name: 'Moong Dal Cheela (2)', recipe: '2 moong dal cheela', calories: 347, fat: 1.2, protein: 23.9, sugar: 6.6, emoji: '🥞' },
      { id: 'indvegan-d8', name: 'Vegetable Pulao', recipe: '1 cup pulao', calories: 380, fat: 10, protein: 10, sugar: 4, emoji: '🍛' },
      { id: 'indvegan-d9', name: 'Bajra Roti, Masoor Dal, Lauki', recipe: 'Bajra roti, masoor dal, lauki', calories: 574, fat: 3.6, protein: 30.4, sugar: 2.9, emoji: '🫓' },
      { id: 'indvegan-d10', name: 'Lentil Curry with Rice', recipe: '1 cup dal, 1 cup rice', calories: 420, fat: 8, protein: 20, sugar: 4, emoji: '🍲' },
    ],
  },
];

// ----- Export -----
export const DEFAULT_DIET_PLAN_ID: DietPlanId = 'gujarati-low-sugar-fat';

export const DIET_PLANS: Record<DietPlanId, DietPlan> = {
  'gujarati-low-sugar-fat': {
    id: 'gujarati-low-sugar-fat',
    name: 'Gujarati Low Sugar Low Fat',
    description: 'Traditional Gujarati foods with minimal sugar and fat—whole grains, dal, vegetables, and light dairy.',
    benefits: [
      'Supports stable blood sugar',
      'Heart-friendly, lower saturated fat',
      'High fiber from bajra, moong, and vegetables',
      'Familiar, sustainable for long-term use',
    ],
    categories: gujaratiCategories,
  },
  mediterranean: {
    id: 'mediterranean',
    name: 'Mediterranean Diet',
    description: 'Olive oil, vegetables, whole grains, legumes, and moderate dairy—inspired by eating patterns from the Mediterranean region.',
    benefits: [
      'Linked to heart health and longevity',
      'Rich in healthy fats (olive oil, nuts)',
      'Plenty of vegetables and legumes',
      'Flexible and widely recommended by health experts',
    ],
    categories: mediterraneanCategories,
  },
  'indian-vegetarian': {
    id: 'indian-vegetarian',
    name: 'Indian Vegetarian Diet',
    description: 'Classic Indian vegetarian meals—rotis, dals, rice, sabzi, plus everyday favorites like pav bhaji and pizza.',
    benefits: [
      'Wide variety of familiar dishes',
      'Plant-forward with dairy and eggs allowed',
      'Balanced carbs, protein, and fiber',
      'Easy to adapt to taste and schedule',
    ],
    categories: indianVegetarianCategories,
  },
  'indian-vegan': {
    id: 'indian-vegan',
    name: 'Indian Vegan Diet',
    description: 'Fully plant-based Indian eating—no dairy or eggs. Dal, roti, vegetables, tofu, and legumes only.',
    benefits: [
      '100% plant-based, no animal products',
      'Supports heart and metabolic health',
      'Eco-friendly and allergy-friendly',
      'High in fiber and plant protein',
    ],
    categories: indianVeganCategories,
  },
};

/** Categories for the default diet (Gujarati). Use for backward compatibility and as initial state. */
export function getDefaultCategories(): MealCategory[] {
  return DIET_PLANS[DEFAULT_DIET_PLAN_ID].categories;
}

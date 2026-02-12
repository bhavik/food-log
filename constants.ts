
import { MealCategory } from './types';

export const MEAL_CATEGORIES: MealCategory[] = [
  {
    type: 'breakfast',
    label: 'BREAKFAST',
    color: 'border-slate-200',
    items: [
      {
        id: 'b1',
        name: 'Tea & Khakra (No Sugar)',
        recipe: '1 cup water, 1/4 cup 2% milk, 1 teaspoon of ginger, 1 tablespoon of wag bakri tea',
        calories: 121.2,
        fat: 5.2,
        protein: 4.1,
        sugar: 1.0,
        emoji: '☕'
      },
      {
        id: 'b2',
        name: 'Oats with Nuts',
        recipe: '1 cup water, 1/4 cup oats, 5 almonds, 5 pista',
        calories: 131.5,
        fat: 5.7,
        protein: 4.5,
        sugar: 0.9,
        emoji: '🥣'
      },
      {
        id: 'b3',
        name: '5 Almonds',
        recipe: '5 almonds',
        calories: 34.7,
        fat: 3.0,
        protein: 1.3,
        sugar: 0.3,
        emoji: '🥜'
      },
      {
        id: 'b4',
        name: '5 Walnuts',
        recipe: '5 walnuts',
        calories: 65.4,
        fat: 6.5,
        protein: 1.5,
        sugar: 0.3,
        emoji: '🥜'
      }
    ]
  },
  {
    type: 'snack',
    label: 'SNACKS',
    color: 'border-slate-200',
    items: [
      {
        id: 's1',
        name: 'Siggi\'s Chas (Buttermilk)',
        recipe: '1 cup Siggi\'s Plain NonFat yogurt, 1/2 cup water, 1 teaspoon Jeera powder, 1 teaspoon of black salt',
        calories: 144.1,
        fat: 0.0,
        protein: 27.4,
        sugar: 7.2,
        emoji: '🥛'
      },
      {
        id: 's2',
        name: 'Fresh Apple',
        recipe: '1 apple',
        calories: 107.4,
        fat: 0.3,
        protein: 0.5,
        sugar: 19.5,
        emoji: '🍎'
      },
      {
        id: 's3',
        name: 'Smoothie (Siggi\'s + Flax)',
        recipe: '1 cup Siggi\'s Plain NonFat yogurt, 1/2 cup water, 1 teaspoon Jeera powder, 1 teaspoon of black salt',
        calories: 144.1,
        fat: 0.0,
        protein: 27.4,
        sugar: 7.2,
        emoji: '🥤'
      },
      {
        id: 's4',
        name: 'Roasted Makhana',
        recipe: '1/4 cup makhana, 1 tablespoon of oil, 1 teaspoon of salt',
        calories: 31.3,
        fat: 0.1,
        protein: 1.3,
        sugar: 0.0,
        emoji: '🍿'
      },
      {
        id: 's5',
        name: 'Roasted Chana (1/4 cup)',
        recipe: '1/4 cup chana, 1 tablespoon of oil, 1 teaspoon of salt',
        calories: 110.1,
        fat: 4.0,
        protein: 5.0,
        sugar: 0.0,
        emoji: '🥜'
      },
      {
        id: 's6',
        name: 'Sprouted Moong Salad',
        recipe: '1/4 cup moong, 1 tablespoon of oil, 1 teaspoon of salt, 1 teaspoon of lemon juice',
        calories: 173.5,
        fat: 0.6,
        protein: 11.9,
        sugar: 3.3,
        emoji: '🥗'
      },
      {
        id: 's7',
        name: 'Mixed Nuts (Almonds/Walnuts)',
        recipe: '5 almonds, 5 walnuts, 1 tablespoon of honey',
        calories: 164.0,
        fat: 9.5,
        protein: 2.9,
        sugar: 17.8,
        emoji: '🥜'
      }
    ]
  },
  {
    type: 'lunch',
    label: 'LUNCH',
    color: 'border-slate-200',
    items: [
      {
        id: 'l1',
        name: 'Trader Joe\'s Mediterranean Salad',
        recipe: 'Salad bag',
        link: 'https://www.traderjoes.com/home/products/pdp/organic-mediterranean-style-salad-kit-062016',
        calories: 55.0,
        fat: 3.5,
        protein: 1.0,
        sugar: 1.5,
        emoji: '🥗'
      },
      {
        id: 'l2',
        name: 'Trader Joe\'s Southwest Salad',
        recipe: 'Salad bag',
        link: 'https://www.traderjoes.com/home/products/pdp/southwestern-chopped-salad-kit-058463',
        calories: 80.0,
        fat: 6.0,
        protein: 2.5,
        sugar: 1.5,
        emoji: '🥗'
      },
      {
        id: 'l3',
        name: 'Costco Mediterranean Salad',
        recipe: 'Salad bag',
        link: 'https://www.costco.com/organic-mediterranean-style-salad-kit-062016',
        calories: 75.0,
        fat: 5.0,
        protein: 1.0,
        sugar: 3.0,
        emoji: '🥗'
      },
      {
        id: 'l4',
        name: 'Sprouted Moong Salad',
        recipe: '1/4 cup moong, 1 tablespoon of oil, 1 teaspoon of salt, 1 teaspoon of lemon juice',
        calories: 173.5,
        fat: 0.6,
        protein: 11.9,
        sugar: 3.3,
        emoji: '🥗'
      },
      {
        id: 'l5',
        name: 'Grilled Tofu Bowl',
        recipe: '1/2 cup tofu, 1/2 cup vegetables, 1 tablespoon of olive oil, 1 teaspoon of salt',
        calories: 197.9,
        fat: 11.1,
        protein: 22.7,
        sugar: 0.8,
        emoji: '🍲'
      },
      {
        id: 'l6',
        name: 'Trader Joe\'s Vegetable Roll',
        recipe: 'Vegetable roll bag',
        link: 'https://www.traderjoes.com/home/products/pdp/vegetable-roll-077695',
        calories: 120.0,
        fat: 1.8,
        protein: 2.5,
        sugar: 5.5,
        emoji: '🥗'
      },
      {
        id: 'l7',
        name: 'Tofu & Veggie Stir-fry',
        recipe: '1/2 cup tofu, 1/2 cup vegetables, 1 tablespoon of olive oil, 1 teaspoon of salt',
        calories: 197.9,
        fat: 11.1,
        protein: 22.7,
        sugar: 0.8,
        emoji: '🥦'
      },
      {
        id: 'l8',
        name: 'Mediterranean Bowl',
        recipe: '1/2 cup quinoa, 1/2 cup vegetables, 1 tablespoon of olive oil, 1 teaspoon of salt',
        calories: 337.8,
        fat: 3.8,
        protein: 12.3,
        sugar: 2.6,
        emoji: '🥙'
      },
      {
        id: 'l9',
        name: 'Black-eyed Pea Salad',
        recipe: '1/2 cup black-eyed peas, 1/2 cup vegetables, 1 tablespoon of olive oil, 1 teaspoon of salt',
        calories: 297.0,
        fat: 1.1,
        protein: 20.4,
        sugar: 6.8,
        emoji: '🥗'
      },
      {
        id: 'l10',
        name: 'Quinoa & Veggie Pulao',
        recipe: '1/2 cup quinoa, 1/2 cup vegetables, 1 tablespoon of olive oil, 1 teaspoon of salt',
        calories: 337.8,
        fat: 3.8,
        protein: 12.3,
        sugar: 2.6,
        emoji: '🍛'
      },
      {
        id: 'l11',
        name: 'Lentil Soup & Sprouted Bread',
        recipe: '1/2 cup lentils, 1/2 cup vegetables, 1 tablespoon of olive oil, 1 teaspoon of salt',
        calories: 354.4,
        fat: 1.2,
        protein: 24.6,
        sugar: 2.7,
        emoji: '🥣'
      },
      {
        id: 'l12',
        name: 'Tofu Bhurji (Turmeric)',
        recipe: '1/2 cup tofu, 1/2 cup vegetables, 1 tablespoon of olive oil, 1 teaspoon of salt',
        calories: 197.9,
        fat: 11.1,
        protein: 22.7,
        sugar: 0.8,
        emoji: '🍳'
      }
    ]
  },
  {
    type: 'dinner',
    label: 'DINNER',
    color: 'border-slate-200',
    items: [
      {
        id: 'd1',
        name: 'Bajra Roti, Chana Dal, Bhindi',
        recipe: '1/2 cup bajra, 1/2 cup chana dal, 1/2 cup bhindi, 1 tablespoon of olive oil, 1 teaspoon of salt',
        calories: 554.8,
        fat: 7.6,
        protein: 27.1,
        sugar: 4.2,
        emoji: '🫓'
      },
      {
        id: 'd2',
        name: 'Bajra Roti, Masoor Dal, Lauki',
        recipe: '1/2 cup bajra, 1/2 cup masoor dal, 1/2 cup lauki, 1 tablespoon of olive oil, 1 teaspoon of salt',
        calories: 574.1,
        fat: 3.6,
        protein: 30.4,
        sugar: 2.9,
        emoji: '🫓'
      },
      {
        id: 'd3',
        name: 'Bajra Roti, Mixed Sprouts',
        recipe: '1/2 cup bajra, 1/2 cup mixed sprouts, 1 tablespoon of olive oil, 1 teaspoon of salt',
        calories: 576.2,
        fat: 3.8,
        protein: 30.4,
        sugar: 7.6,
        emoji: '🍛'
      },
      {
        id: 'd4',
        name: 'Bajra Roti, Rajma, Spinach',
        recipe: '1/2 cup bajra, 1/2 cup rajma, 1/2 cup spinach, 1 tablespoon of olive oil, 1 teaspoon of salt',
        calories: 542.7,
        fat: 3.7,
        protein: 27.6,
        sugar: 3.0,
        emoji: '🍲'
      },
      {
        id: 'd5',
        name: 'Bajra Roti, Yellow Moong, Methi',
        recipe: '1/2 cup bajra, 1/2 cup yellow moong, 1/2 cup methi, 1 tablespoon of olive oil, 1 teaspoon of salt',
        calories: 579.7,
        fat: 3.8,
        protein: 30.8,
        sugar: 7.7,
        emoji: '🍛'
      },
      {
        id: 'd6',
        name: 'Tofu Steaks & Broccoli',
        recipe: '1/2 cup tofu, 1/2 cup broccoli, 1 tablespoon of olive oil, 1 teaspoon of salt',
        calories: 198.4,
        fat: 11.1,
        protein: 23.2,
        sugar: 0.8,
        emoji: '🥦'
      },
      {
        id: 'd7',
        name: 'Bajra Roti, Tofu, Bhindi',
        recipe: '1/2 cup bajra, 1/2 cup tofu, 1/2 cup bhindi, 1 tablespoon of olive oil, 1 teaspoon of salt',
        calories: 427.1,
        fat: 13.6,
        protein: 29.2,
        sugar: 1.8,
        emoji: '🫓'
      },
      {
        id: 'd8',
        name: 'Moong Dal Cheela (2)',
        recipe: '1/2 cup moong dal, 2 tablespoons of oil, 1 teaspoon of salt',
        calories: 347.0,
        fat: 1.2,
        protein: 23.9,
        sugar: 6.6,
        emoji: '🥞'
      },
      {
        id: 'd9',
        name: 'Bajra Roti, Khichdi, Kadi, Lauki',
        recipe: '1/2 cup bajra, 1/2 cup khichdi, 1/2 cup kadi, 1/2 cup lauki, 1 tablespoon of olive oil, 1 teaspoon of salt',
        calories: 839.7,
        fat: 13.0,
        protein: 57.0,
        sugar: 10.0,
        emoji: '🥞'
      }

    ]
  }
];

export const STORAGE_KEY = 'foodlog_v1_data';

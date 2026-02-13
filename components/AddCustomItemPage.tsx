import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, CheckIcon, BookmarkIcon } from 'lucide-react';
import { MealType } from '../types';
import type { CustomItemAction } from './CustomItemModal';

interface AddCustomItemPageProps {
  onBack: () => void;
  onAdd: (
    name: string,
    emoji: string,
    action: CustomItemAction,
    nutrition?: { calories?: number; fat?: number; protein?: number; sugar?: number }
  ) => void;
  categoryLabels: { type: MealType; label: string }[];
  initialName?: string;
}

const SYMBOLS = ['🥗', '🍛', '🍲', '🥛', '☕', '🍎', '🍐', '🥦', '🍳', '🥜', '🍪', '🥤'];

const AddCustomItemPage: React.FC<AddCustomItemPageProps> = ({
  onBack,
  onAdd,
  categoryLabels,
  initialName = '',
}) => {
  const [name, setName] = useState(initialName);
  const [selectedEmoji, setSelectedEmoji] = useState('🥗');
  const [savePermanently, setSavePermanently] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MealType>('breakfast');
  const [calories, setCalories] = useState('');
  const [fat, setFat] = useState('');
  const [protein, setProtein] = useState('');
  const [sugar, setSugar] = useState('');

  useEffect(() => {
    if (initialName) setName(initialName);
  }, [initialName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const action: CustomItemAction = savePermanently
      ? { savePermanently: true, mealType: selectedCategory }
      : { savePermanently: false };
    const nutrition =
      savePermanently && (calories || fat || protein || sugar)
        ? {
            calories: calories ? Number(calories) : undefined,
            fat: fat ? Number(fat) : undefined,
            protein: protein ? Number(protein) : undefined,
            sugar: sugar ? Number(sugar) : undefined,
          }
        : undefined;
    onAdd(name.trim(), selectedEmoji, action, nutrition);
  };

  return (
    <div className="min-h-screen pb-8 animate-fade-up">
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={onBack}
          className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/5 transition-smooth"
          aria-label="Back"
        >
          <ArrowLeftIcon size={22} strokeWidth={2} />
        </button>
        <h1 className="text-xl font-semibold text-stone-100">Add custom item</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-base font-medium text-stone-500 mb-2">Name</label>
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Green smoothie"
            className="w-full bg-stone-800/60 border border-white/[0.06] rounded-xl px-4 py-3.5 text-base text-white placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
            required
          />
        </div>
        <div>
          <label className="block text-base font-medium text-stone-500 mb-2">Emoji</label>
          <div className="grid grid-cols-6 gap-2">
            {SYMBOLS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setSelectedEmoji(emoji)}
                className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl transition-smooth ${
                  selectedEmoji === emoji
                    ? 'bg-emerald-500 text-stone-900 ring-2 ring-emerald-400/50'
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-400'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-base font-medium text-stone-500 mb-3">Save to list?</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setSavePermanently(false)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border transition-smooth ${
                !savePermanently
                  ? 'bg-stone-700 border-emerald-500/50 text-white'
                  : 'bg-stone-800/50 border-white/[0.06] text-stone-400 hover:text-stone-300'
              }`}
            >
              <span className="text-base font-medium">Just this time</span>
            </button>
            <button
              type="button"
              onClick={() => setSavePermanently(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border transition-smooth ${
                savePermanently
                  ? 'bg-stone-700 border-emerald-500/50 text-white'
                  : 'bg-stone-800/50 border-white/[0.06] text-stone-400 hover:text-stone-300'
              }`}
            >
              <BookmarkIcon size={18} />
              <span className="text-base font-medium">Add to my list</span>
            </button>
          </div>
        </div>

        {savePermanently && (
          <div>
            <label className="block text-base font-medium text-stone-500 mb-2">Which list?</label>
            <div className="grid grid-cols-2 gap-2">
              {categoryLabels.map((cat) => (
                <button
                  key={cat.type}
                  type="button"
                  onClick={() => setSelectedCategory(cat.type)}
                  className={`py-3 px-3 rounded-xl text-base font-medium transition-smooth ${
                    selectedCategory === cat.type
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-stone-800 border border-white/[0.06] text-stone-400 hover:text-stone-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {savePermanently && (
          <div>
            <label className="block text-base font-medium text-stone-500 mb-3">Nutrition (per serving)</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1">Calories</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  placeholder="e.g. 220"
                  className="w-full bg-stone-800/60 border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1">Protein (g)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  placeholder="e.g. 12"
                  className="w-full bg-stone-800/60 border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1">Fat (g)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                  placeholder="e.g. 6"
                  className="w-full bg-stone-800/60 border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1">Sugar (g)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={sugar}
                  onChange={(e) => setSugar(e.target.value)}
                  placeholder="e.g. 4"
                  className="w-full bg-stone-800/60 border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                />
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-stone-900 font-medium rounded-xl transition-smooth flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <CheckIcon size={20} strokeWidth={2.5} />
          {savePermanently ? 'Add to list & log' : 'Log entry'}
        </button>
      </form>
    </div>
  );
};

export default AddCustomItemPage;

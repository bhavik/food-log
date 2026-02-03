import React, { useState } from 'react';
import { XIcon, CheckIcon, BookmarkIcon } from 'lucide-react';
import { MealType } from '../types';

export type CustomItemAction =
  | { savePermanently: false }
  | { savePermanently: true; mealType: MealType };

interface CustomItemModalProps {
  onClose: () => void;
  onAdd: (name: string, emoji: string, action: CustomItemAction) => void;
  categoryLabels: { type: MealType; label: string }[];
}

const SYMBOLS = ['🥗', '🍛', '🍲', '🥛', '☕', '🍎', '🍐', '🥦', '🍳', '🥜', '🍪', '🥤'];

const CustomItemModal: React.FC<CustomItemModalProps> = ({ onClose, onAdd, categoryLabels }) => {
  const [name, setName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🥗');
  const [savePermanently, setSavePermanently] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MealType>('breakfast');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const action: CustomItemAction = savePermanently
      ? { savePermanently: true, mealType: selectedCategory }
      : { savePermanently: false };
    onAdd(name.trim(), selectedEmoji, action);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-lg bg-stone-800 rounded-t-2xl p-6 shadow-xl border border-t border-white/[0.06] animate-fade-up max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-semibold text-stone-100">Add custom item</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-500 hover:text-white hover:bg-white/5 transition-smooth"
            aria-label="Close"
          >
            <XIcon size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 pb-6">
          <div>
            <label className="block text-sm font-medium text-stone-500 mb-2">Name</label>
            <input
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Green smoothie"
              className="w-full bg-stone-900/50 border border-white/[0.06] rounded-xl px-4 py-3 text-base text-white placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-500 mb-2">Emoji</label>
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
            <label className="block text-sm font-medium text-stone-500 mb-3">Save to list?</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSavePermanently(false)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-smooth ${
                  !savePermanently
                    ? 'bg-stone-700 border-emerald-500/50 text-white'
                    : 'bg-stone-800/50 border-white/[0.06] text-stone-400 hover:text-stone-300'
                }`}
              >
                <span className="text-sm font-medium">Just this time</span>
              </button>
              <button
                type="button"
                onClick={() => setSavePermanently(true)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-smooth ${
                  savePermanently
                    ? 'bg-stone-700 border-emerald-500/50 text-white'
                    : 'bg-stone-800/50 border-white/[0.06] text-stone-400 hover:text-stone-300'
                }`}
              >
                <BookmarkIcon size={16} />
                <span className="text-sm font-medium">Add to my list</span>
              </button>
            </div>
          </div>

          {savePermanently && (
            <div>
              <label className="block text-sm font-medium text-stone-500 mb-2">Which list?</label>
              <div className="grid grid-cols-2 gap-2">
                {categoryLabels.map((cat) => (
                  <button
                    key={cat.type}
                    type="button"
                    onClick={() => setSelectedCategory(cat.type)}
                    className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-smooth ${
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

          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-stone-900 font-medium rounded-xl transition-smooth flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <CheckIcon size={18} strokeWidth={2.5} />
            {savePermanently ? 'Add to list & log' : 'Log entry'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomItemModal;

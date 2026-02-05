
import React, { useState, useMemo } from 'react';
import { MealType, LogEntry, MealCategory, FoodItem } from '../types';
import CustomItemModal from './CustomItemModal';
import { ChevronRightIcon, PlusIcon, Edit3Icon, XIcon, SearchIcon, ActivityIcon } from 'lucide-react';

interface DashboardProps {
  onLog: (name: string, type: MealType, emoji: string, isCustom?: boolean) => void;
  logs: LogEntry[];
  categories: MealCategory[];
  onUpdateTitle: (itemId: string, newTitle: string) => void;
  onAddCustomItem: (name: string, emoji: string, action: import('./CustomItemModal').CustomItemAction) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLog, logs, categories, onUpdateTitle, onAddCustomItem }) => {
  const [selectedType, setSelectedType] = useState<MealType>(() => {
    const hour = new Date().getHours();
    if (hour < 10) return 'breakfast';
    if (hour < 15) return 'lunch';
    if (hour < 19) return 'snack';
    return 'dinner';
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{id: string, name: string} | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const todayLogs = useMemo(() => {
    const startOfDay = new Date().setHours(0, 0, 0, 0);
    return logs.filter(log => log.timestamp >= startOfDay);
  }, [logs]);

  const getTodayCountForItem = (name: string) => {
    return todayLogs.filter(log => log.itemName === name).length;
  };

  const activeCategory = categories.find(c => c.type === selectedType) || categories[0];

  const filteredItems = useMemo((): FoodItem[] => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return activeCategory.items;
    return activeCategory.items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.emoji.includes(q)
    );
  }, [activeCategory.items, searchQuery]);

  const handleUpdateTitle = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem && editingItem.name.trim()) {
      onUpdateTitle(editingItem.id, editingItem.name.trim());
      setEditingItem(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Quick search */}
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-stone-500 pointer-events-none" strokeWidth={2} />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search food items..."
          className="w-full bg-stone-800/60 border border-white/[0.06] rounded-xl pl-11 pr-4 py-3 text-base text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-smooth"
          aria-label="Search food items"
        />
        {searchQuery.length > 0 && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-stone-500 hover:text-stone-300 hover:bg-white/5"
            aria-label="Clear search"
          >
            <XIcon size={18} strokeWidth={2} />
          </button>
        )}
      </div>

      {/* Meal tabs */}
      <div className="flex bg-stone-800/60 p-1.5 rounded-xl overflow-x-auto no-scrollbar gap-1">
        {categories.map((cat) => (
          <button
            key={cat.type}
            onClick={() => setSelectedType(cat.type)}
            className={`whitespace-nowrap flex-1 min-w-[5.5rem] py-3 pl-4 pr-5 rounded-lg text-base font-medium transition-smooth text-center ${
              selectedType === cat.type
                ? 'meal-tab-active'
                : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-2">
            <ActivityIcon size={16} className="text-amber-500" strokeWidth={2} />
            <h2 className="text-base font-semibold uppercase tracking-wider text-stone-400">
              Available protocols
            </h2>
          </div>
          <span className="text-xs font-semibold text-stone-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 uppercase tracking-tight">
            {todayLogs.filter(l => l.mealType === selectedType).length} Recorded
          </span>
        </div>

        <div className="space-y-2">
          {filteredItems.length === 0 ? (
            <p className="py-8 text-center text-base text-stone-500">
              {searchQuery.trim() ? `No items match "${searchQuery.trim()}"` : 'No items in this category.'}
            </p>
          ) : (
          filteredItems.map((item) => {
            const count = getTodayCountForItem(item.name);
            return (
              <div
                key={item.id}
                className={`flex items-center justify-between rounded-2xl border transition-smooth group ${
                  count > 0
                    ? 'bg-stone-800/50 border-white/[0.06]'
                    : 'bg-stone-800/30 border-transparent hover:bg-stone-800/50 hover:border-white/[0.06]'
                }`}
              >
                <button
                  onClick={() => onLog(item.name, selectedType, item.emoji)}
                  className="flex-1 flex items-center gap-4 py-4 pl-4 pr-2 text-left"
                >
                  <span className="text-3xl leading-none">{item.emoji}</span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[17px] sm:text-lg font-medium text-stone-100 truncate">
                      {item.name}
                    </span>
                    {count > 0 && (
                      <span className="text-sm text-emerald-400/90 mt-0.5">
                        {count}× today
                      </span>
                    )}
                  </div>
                </button>
                <div className="flex items-center gap-1 pr-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); setEditingItem({ id: item.id, name: item.name }); }}
                    className="p-2 rounded-lg text-stone-500 hover:text-stone-300 hover:bg-white/5 transition-smooth"
                    aria-label="Edit"
                  >
                    <Edit3Icon size={16} strokeWidth={2} />
                  </button>
                  {count > 0 && (
                    <span className="text-sm font-semibold text-emerald-400/90 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
                      {count}×
                    </span>
                  )}
                  <ChevronRightIcon size={18} className="text-stone-600 group-hover:text-stone-400 transition-smooth" strokeWidth={2} aria-hidden />
                </div>
              </div>
            );
          })
          )}
        </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full flex items-center gap-4 p-5 rounded-2xl border border-dashed border-stone-600 hover:border-stone-500 hover:bg-stone-800/30 transition-smooth text-stone-400 hover:text-stone-300"
      >
        <div className="h-12 w-12 rounded-xl bg-stone-800 flex items-center justify-center">
          <PlusIcon size={24} strokeWidth={2} />
        </div>
        <div className="text-left">
          <p className="text-base font-medium">Add custom item</p>
          <p className="text-sm text-stone-500">Not in the list?</p>
        </div>
      </button>

      {editingItem && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setEditingItem(null)} />
          <form
            onSubmit={handleUpdateTitle}
            className="relative w-full max-w-sm bg-stone-800 rounded-2xl p-6 border border-white/[0.06] shadow-xl animate-fade-up"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-medium text-stone-400">Edit item</h3>
              <button type="button" onClick={() => setEditingItem(null)} className="p-2 rounded-lg text-stone-500 hover:text-white hover:bg-white/5">
                <XIcon size={18} />
              </button>
            </div>
            <input
              autoFocus
              type="text"
              value={editingItem.name}
              onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
              className="w-full bg-stone-900/50 border border-white/[0.06] rounded-xl px-4 py-3.5 text-[17px] font-medium text-white placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 mb-4"
              placeholder="Item name"
            />
            <button
              type="submit"
              className="w-full py-3.5 text-base bg-emerald-500 hover:bg-emerald-400 text-stone-900 font-medium rounded-xl transition-smooth active:scale-[0.98]"
            >
              Save
            </button>
          </form>
        </div>
      )}

      {isModalOpen && (
        <CustomItemModal 
          onClose={() => setIsModalOpen(false)} 
          onAdd={(name, emoji, action) => {
            onAddCustomItem(name, emoji, action);
            setIsModalOpen(false);
          }}
          categoryLabels={categories.map(c => ({ type: c.type, label: c.label }))}
        />
      )}
    </div>
  );
};

export default Dashboard;

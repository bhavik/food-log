
import React, { useState, useMemo } from 'react';
import { MealType, LogEntry, MealCategory, FoodItem } from '../types';
import { PlusIcon, Edit3Icon, XIcon, SearchIcon, MinusIcon } from 'lucide-react';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface DashboardProps {
  onLog: (
    name: string,
    type: MealType,
    emoji: string,
    isCustom?: boolean,
    nutrition?: { calories?: number; fat?: number; protein?: number; sugar?: number }
  ) => void;
  logs: LogEntry[];
  categories: MealCategory[];
  onUpdateTitle: (itemId: string, newTitle: string) => void;
  onOpenAddCustomPage: (initialName?: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLog, logs, categories, onUpdateTitle, onOpenAddCustomPage }) => {
  const [selectedType, setSelectedType] = useState<MealType>(() => {
    const hour = new Date().getHours();
    if (hour < 10) return 'breakfast';
    if (hour < 15) return 'lunch';
    if (hour < 19) return 'snack';
    return 'dinner';
  });
  const [editingItem, setEditingItem] = useState<{id: string, name: string} | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [logQuantity, setLogQuantity] = useState(1);

  const todayLogs = useMemo(() => {
    const startOfDay = new Date().setHours(0, 0, 0, 0);
    return logs.filter(log => log.timestamp >= startOfDay);
  }, [logs]);

  const getTodayCountForItem = (name: string) => {
    return todayLogs.filter(log => log.itemName === name).length;
  };

  const activeCategory = categories.find(c => c.type === selectedType) || categories[0];

  const q = searchQuery.trim().toLowerCase();
  const isSearchActive = q.length > 0;

  const filteredItems = useMemo((): FoodItem[] => {
    if (!q) return activeCategory.items;
    return activeCategory.items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.emoji.includes(q)
    );
  }, [activeCategory.items, searchQuery]);

  type SearchHit =
    | { type: 'item'; item: FoodItem; mealType: MealType; categoryLabel: string }
    | { type: 'log'; name: string; emoji: string };
  const searchResults = useMemo((): SearchHit[] => {
    if (!q) return [];
    const hits: SearchHit[] = [];
    categories.forEach((cat) => {
      cat.items.forEach((item) => {
        if (
          item.name.toLowerCase().includes(q) ||
          item.emoji.includes(q)
        ) {
          hits.push({ type: 'item', item, mealType: cat.type, categoryLabel: cat.label });
        }
      });
    });
    const seen = new Set<string>();
    logs.forEach((log) => {
      const key = `${log.itemName}|${log.emoji}`;
      if (seen.has(key)) return;
      if (!log.itemName.toLowerCase().includes(q)) return;
      seen.add(key);
      hits.push({ type: 'log', name: log.itemName, emoji: log.emoji });
    });
    return hits;
  }, [q, categories, logs]);

  const handleLogItem = (item: FoodItem, mealType?: MealType) => {
    const type = mealType ?? selectedType;
    const isCustomItem = item.id.startsWith('custom_') || UUID_REGEX.test(item.id);
    const nutrition = { calories: item.calories, fat: item.fat, protein: item.protein, sugar: item.sugar };
    for (let i = 0; i < logQuantity; i++) {
      onLog(item.name, type, item.emoji, isCustomItem, nutrition);
    }
  };

  const handleLogFromLogEntry = (name: string, emoji: string) => {
    for (let i = 0; i < logQuantity; i++) {
      onLog(name, selectedType, emoji, true);
    }
  };

  const webSearchUrl = q
    ? `https://www.google.com/search?q=${encodeURIComponent(q + ' nutrition calories')}`
    : '';

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
            className={`whitespace-nowrap flex-1 min-w-0 py-3 rounded-lg text-base font-medium transition-smooth text-center meal-tab ${
              selectedType === cat.type
                ? 'meal-tab-active'
                : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Quantity to log */}
      <div className="flex items-center justify-between gap-3 py-1">
        <span className="text-sm text-stone-500">Serving size to log</span>
        <div className="flex items-center gap-1 rounded-xl bg-stone-800/60 border border-white/[0.06] p-1">
          <button
            type="button"
            onClick={() => setLogQuantity((q) => Math.max(1, q - 1))}
            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-white/5 transition-smooth"
            aria-label="Decrease"
          >
            <MinusIcon size={18} strokeWidth={2.5} />
          </button>
          <span className="w-8 text-center text-base font-semibold text-stone-200 tabular-nums">{logQuantity}</span>
          <button
            type="button"
            onClick={() => setLogQuantity((q) => Math.min(99, q + 1))}
            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-white/5 transition-smooth"
            aria-label="Increase"
          >
            <PlusIcon size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          {isSearchActive ? (
            <>
              {searchResults.length === 0 ? (
                <p className="py-6 text-center text-base text-stone-500">No items or logs match &quot;{q}&quot;</p>
              ) : (
                <div className="space-y-2">
                  {searchResults.map((hit, idx) => {
                    if (hit.type === 'item') {
                      const count = getTodayCountForItem(hit.item.name);
                      return (
                        <div
                          key={`${hit.item.id}-${hit.mealType}-${idx}`}
                          className={`flex items-center justify-between rounded-2xl border transition-smooth ${
                            count > 0 ? 'bg-stone-800/50 border-white/[0.06]' : 'bg-stone-800/30 border-transparent hover:bg-stone-800/50 hover:border-white/[0.06]'
                          }`}
                        >
                          <button
                            onClick={() => handleLogItem(hit.item, hit.mealType)}
                            className="flex-1 flex items-center gap-4 py-4 pl-4 pr-2 text-left"
                          >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-700/80 text-emerald-400">
                              <PlusIcon size={20} strokeWidth={2.5} />
                            </span>
                            <span className="text-3xl leading-none shrink-0">{hit.item.emoji}</span>
                            <div className="flex flex-col min-w-0">
                              <span className="text-[17px] font-medium text-stone-100 truncate">{hit.item.name}</span>
                              <span className="text-xs text-stone-500">{hit.categoryLabel}</span>
                              {count > 0 && <span className="text-sm text-emerald-400/90 mt-0.5">{count}× today</span>}
                            </div>
                          </button>
                          <div className="flex items-center gap-1 pr-3">
                            {hit.mealType === selectedType && (
                              <button
                                onClick={(e) => { e.stopPropagation(); setEditingItem({ id: hit.item.id, name: hit.item.name }); }}
                                className="p-2 rounded-lg text-stone-500 hover:text-stone-300 hover:bg-white/5"
                                aria-label="Edit"
                              >
                                <Edit3Icon size={16} strokeWidth={2} />
                              </button>
                            )}
                            {count > 0 && (
                              <span className="text-sm font-semibold text-emerald-400/90 bg-emerald-500/10 px-3 py-1.5 rounded-lg">{count}×</span>
                            )}
                          </div>
                        </div>
                      );
                    }
                    const count = getTodayCountForItem(hit.name);
                    return (
                      <div
                        key={`log-${hit.name}-${idx}`}
                        className="flex items-center justify-between rounded-2xl border border-transparent bg-stone-800/30 hover:bg-stone-800/50 hover:border-white/[0.06] transition-smooth"
                      >
                        <button
                          onClick={() => handleLogFromLogEntry(hit.name, hit.emoji)}
                          className="flex-1 flex items-center gap-4 py-4 pl-4 pr-2 text-left"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-700/80 text-emerald-400">
                            <PlusIcon size={20} strokeWidth={2.5} />
                          </span>
                          <span className="text-3xl leading-none shrink-0">{hit.emoji}</span>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[17px] font-medium text-stone-100 truncate">{hit.name}</span>
                            <span className="text-xs text-stone-500">From your log</span>
                            {count > 0 && <span className="text-sm text-emerald-400/90 mt-0.5">{count}× today</span>}
                          </div>
                        </button>
                        {count > 0 && (
                          <span className="text-sm font-semibold text-emerald-400/90 bg-emerald-500/10 px-3 py-1.5 rounded-lg mr-3">{count}×</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              {isSearchActive && (
                <div className="pt-4 space-y-3 border-t border-white/[0.06]">
                  <p className="text-sm text-stone-500">Not found?</p>
                  <button
                    type="button"
                    onClick={() => onOpenAddCustomPage(q)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-800/60 border border-white/[0.08] text-stone-300 hover:bg-stone-800 transition-smooth text-base font-medium"
                  >
                    <PlusIcon size={18} strokeWidth={2.5} />
                    Add &quot;{q}&quot; as custom item
                  </button>
                  {webSearchUrl && (
                    <a
                      href={webSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-800/60 border border-white/[0.08] text-stone-400 hover:bg-stone-700 transition-smooth text-sm"
                    >
                      <SearchIcon size={16} strokeWidth={2} />
                      Search web for &quot;{q}&quot;
                    </a>
                  )}
                </div>
              )}
            </>
          ) : filteredItems.length === 0 ? (
            <p className="py-8 text-center text-base text-stone-500">No items in this category.</p>
          ) : (
            filteredItems.map((item) => {
              const count = getTodayCountForItem(item.name);
              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between rounded-2xl border transition-smooth group ${
                    count > 0 ? 'bg-stone-800/50 border-white/[0.06]' : 'bg-stone-800/30 border-transparent hover:bg-stone-800/50 hover:border-white/[0.06]'
                  }`}
                >
                  <button
                    onClick={() => handleLogItem(item)}
                    className="flex-1 flex items-center gap-4 py-4 pl-4 pr-2 text-left"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-700/80 text-emerald-400" aria-hidden>
                      <PlusIcon size={20} strokeWidth={2.5} />
                    </span>
                    <span className="text-3xl leading-none shrink-0">{item.emoji}</span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[17px] sm:text-lg font-medium text-stone-100 truncate">{item.name}</span>
                      {count > 0 ? (
                        <span className="text-sm text-emerald-400/90 mt-0.5">{count}× today</span>
                      ) : (
                        <span className="text-xs text-stone-500 mt-0.5">Tap to log</span>
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
                      <span className="text-sm font-semibold text-emerald-400/90 bg-emerald-500/10 px-3 py-1.5 rounded-lg">{count}×</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <button
        onClick={() => onOpenAddCustomPage()}
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

    </div>
  );
};

export default Dashboard;

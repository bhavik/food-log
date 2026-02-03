
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { LogEntry, MealType, MealCategory, FoodItem } from './types';
import { STORAGE_KEY, MEAL_CATEGORIES as DEFAULT_CATEGORIES } from './constants';
import Dashboard from './components/Dashboard';
import History from './components/History';
import BottomNav from './components/BottomNav';
import type { CustomItemAction } from './components/CustomItemModal';

const CATEGORIES_STORAGE_KEY = 'foodlog_v1_categories';

const App: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [categories, setCategories] = useState<MealCategory[]>(DEFAULT_CATEGORIES);
  const [activeTab, setActiveTab] = useState<'track' | 'history'>('track');
  const [toast, setToast] = useState<{msg: string} | null>(null);

  useEffect(() => {
    const savedLogs = localStorage.getItem(STORAGE_KEY);
    if (savedLogs) {
      try { setLogs(JSON.parse(savedLogs)); } catch (e) { console.error(e); }
    }
    const savedCats = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (savedCats) {
      try { setCategories(JSON.parse(savedCats)); } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  const addLog = useCallback((name: string, type: MealType, emoji: string, isCustom = false) => {
    const newEntry: LogEntry = {
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
      mealType: type,
      itemName: name,
      emoji: emoji,
      isCustom
    };
    setLogs(prev => [newEntry, ...prev]);
    setToast({ msg: name });
    setTimeout(() => setToast(null), 2500);
  }, []);

  const addItemToCategory = useCallback((mealType: MealType, item: FoodItem) => {
    setCategories(prev => prev.map(cat =>
      cat.type === mealType ? { ...cat, items: [...cat.items, item] } : cat
    ));
  }, []);

  const handleCustomItem = useCallback((name: string, emoji: string, action: CustomItemAction) => {
    if (action.savePermanently && action.mealType) {
      const newItem: FoodItem = {
        id: `custom_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        name,
        emoji
      };
      addItemToCategory(action.mealType, newItem);
      addLog(name, action.mealType, emoji, true);
    } else {
      addLog(name, 'other', emoji, true);
    }
  }, [addItemToCategory, addLog]);

  const updateItemTitle = useCallback((itemId: string, newTitle: string) => {
    setCategories(prev => prev.map(cat => ({
      ...cat,
      items: cat.items.map(item => item.id === itemId ? { ...item, name: newTitle } : item)
    })));
  }, []);

  const deleteLog = useCallback((id: string) => {
    setLogs(prev => prev.filter(log => log.id !== id));
  }, []);

  const handleImportLogs = useCallback((newLogs: LogEntry[]) => {
    setLogs(newLogs);
  }, []);

  const dateStr = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'short', 
      month: 'long', 
      day: 'numeric' 
    }).format(new Date());
  }, []);

  return (
    <div className="min-h-screen pb-32 antialiased">
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[var(--bg-primary)]/90 backdrop-blur-xl">
        <div className="max-w-xl mx-auto px-5 pt-6 pb-5">
          <p className="text-sm text-stone-500 mb-0.5">{dateStr}</p>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            FoodLog
          </h1>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-5 pt-6">
        {activeTab === 'track' ? (
          <Dashboard 
            onLog={addLog} 
            logs={logs} 
            categories={categories} 
            onUpdateTitle={updateItemTitle}
            onAddCustomItem={handleCustomItem}
          />
        ) : (
          <History 
            logs={logs} 
            onDelete={deleteLog} 
            onImport={handleImportLogs} 
          />
        )}
      </main>

      {toast && (
        <div className="fixed bottom-28 left-0 right-0 flex justify-center z-50 px-5 animate-fade-up">
          <div className="bg-stone-800 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 border border-white/[0.08]">
            <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium whitespace-nowrap">Added {toast.msg}</span>
          </div>
        </div>
      )}

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;

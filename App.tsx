import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { LogEntry, MealType, MealCategory, FoodItem } from './types';
import { STORAGE_KEY, MEAL_CATEGORIES as DEFAULT_CATEGORIES } from './constants';
import Dashboard from './components/Dashboard';
import History from './components/History';
import BottomNav from './components/BottomNav';
import AuthButton from './components/AuthButton';
import type { CustomItemAction } from './components/CustomItemModal';
import { useAuth } from './lib/auth-context';
import * as data from './lib/data';

const CATEGORIES_STORAGE_KEY = 'foodlog_v1_categories';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isDbItemId(id: string): boolean {
  return UUID_REGEX.test(id);
}

const App: React.FC = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [categories, setCategories] = useState<MealCategory[]>(DEFAULT_CATEGORIES);
  const [activeTab, setActiveTab] = useState<'track' | 'history'>('track');
  const [toast, setToast] = useState<{ msg: string } | null>(null);
  const [syncing, setSyncing] = useState(false);

  const isSignedIn = !!user;
  const userId = user?.uid ?? null;

  useEffect(() => {
    if (!isSignedIn) {
      const savedLogs = localStorage.getItem(STORAGE_KEY);
      if (savedLogs) {
        try {
          setLogs(JSON.parse(savedLogs));
        } catch (e) {
          console.error(e);
        }
      }
      const savedCats = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (savedCats) {
        try {
          setCategories(JSON.parse(savedCats));
        } catch (e) {
          console.error(e);
        }
      }
      return;
    }
    setSyncing(true);
    Promise.all([data.fetchFoodLogs(), data.fetchUserFoodItems()])
      .then(([logEntries, userItems]) => {
        setLogs(logEntries);
        setCategories(data.buildCategoriesWithUserItems(DEFAULT_CATEGORIES, userItems));
      })
      .catch(console.error)
      .finally(() => setSyncing(false));
  }, [isSignedIn]);

  useEffect(() => {
    if (isSignedIn) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }, [isSignedIn, logs]);

  useEffect(() => {
    if (isSignedIn) return;
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
  }, [isSignedIn, categories]);

  const addLog = useCallback(
    async (name: string, type: MealType, emoji: string, isCustom = false) => {
      const newEntry: Omit<LogEntry, 'id'> = {
        timestamp: Date.now(),
        mealType: type,
        itemName: name,
        emoji,
        isCustom,
      };
      if (isSignedIn && userId) {
        const inserted = await data.insertFoodLog(newEntry, userId);
        if (inserted) {
          setLogs((prev) => [inserted, ...prev]);
          setToast({ msg: name });
          setTimeout(() => setToast(null), 2500);
        } else {
          setLogs((prev) => [
            { ...newEntry, id: Math.random().toString(36).substring(7) },
            ...prev,
          ]);
          setToast({ msg: name });
          setTimeout(() => setToast(null), 2500);
        }
      } else {
        setLogs((prev) => [
          { ...newEntry, id: Math.random().toString(36).substring(7) },
          ...prev,
        ]);
        setToast({ msg: name });
        setTimeout(() => setToast(null), 2500);
      }
    },
    [isSignedIn, userId]
  );

  const addItemToCategory = useCallback(
    (mealType: MealType, item: FoodItem) => {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.type === mealType ? { ...cat, items: [...cat.items, item] } : cat
        )
      );
    },
    []
  );

  const handleCustomItem = useCallback(
    async (name: string, emoji: string, action: CustomItemAction) => {
      if (action.savePermanently && action.mealType) {
        if (isSignedIn && userId) {
          const newItem = await data.insertUserFoodItem(
            userId,
            action.mealType,
            name,
            emoji
          );
          if (newItem) {
            addItemToCategory(action.mealType, newItem);
            await addLog(name, action.mealType, emoji, true);
          }
        } else {
          const newItem: FoodItem = {
            id: `custom_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
            name,
            emoji,
          };
          addItemToCategory(action.mealType, newItem);
          await addLog(name, action.mealType, emoji, true);
        }
      } else {
        await addLog(name, 'other', emoji, true);
      }
    },
    [isSignedIn, userId, addItemToCategory, addLog]
  );

  const updateItemTitle = useCallback(
    async (itemId: string, newTitle: string) => {
      if (isSignedIn && isDbItemId(itemId)) {
        const ok = await data.updateUserFoodItem(itemId, newTitle);
        if (!ok) return;
      }
      setCategories((prev) =>
        prev.map((cat) => ({
          ...cat,
          items: cat.items.map((item) =>
            item.id === itemId ? { ...item, name: newTitle } : item
          ),
        }))
      );
    },
    [isSignedIn]
  );

  const deleteLog = useCallback(
    async (id: string) => {
      if (isSignedIn) {
        const ok = await data.deleteFoodLog(id);
        if (ok) setLogs((prev) => prev.filter((log) => log.id !== id));
      } else {
        setLogs((prev) => prev.filter((log) => log.id !== id));
      }
    },
    [isSignedIn]
  );

  const handleImportLogs = useCallback((newLogs: LogEntry[]) => {
    setLogs(newLogs);
  }, []);

  const dateStr = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
      }).format(new Date()),
    []
  );

  return (
    <div className="min-h-screen pb-28 antialiased">
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[var(--bg-primary)]/90 backdrop-blur-xl">
        <div className="max-w-xl mx-auto px-4 sm:px-5 pt-5 pb-4 flex justify-between items-start gap-4">
          <div className="min-w-0">
            <p className="text-base text-stone-500 mb-0.5">{dateStr}</p>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight title-foodlog">
              <span className="title-food">Food</span>
              <span className="title-log">Log</span>
            </h1>
            {isSignedIn && user && (
              <p className="text-base text-emerald-400/90 mt-1 truncate">
                Welcome, {user.displayName || user.email || 'back'}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">System ready</span>
            </div>
            <AuthButton isSignedIn={isSignedIn} />
          </div>
        </div>
      </header>

      {syncing && (
        <div className="max-w-xl mx-auto px-4 sm:px-5 py-2">
          <p className="text-sm text-stone-500">Syncing…</p>
        </div>
      )}

      <main className="max-w-xl mx-auto px-4 sm:px-5 pt-5">
        {activeTab === 'track' ? (
          <Dashboard
            onLog={addLog}
            logs={logs}
            categories={categories}
            onUpdateTitle={updateItemTitle}
            onAddCustomItem={handleCustomItem}
          />
        ) : (
          <History logs={logs} onDelete={deleteLog} onImport={handleImportLogs} />
        )}
      </main>

      {toast && (
        <div className="fixed bottom-24 left-0 right-0 flex justify-center z-50 px-4 animate-fade-up">
          <div className="bg-stone-800 text-white px-5 py-3.5 rounded-xl shadow-lg flex items-center gap-3 border border-white/[0.08]">
            <div className="h-2.5 w-2.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-base font-medium whitespace-nowrap">Added {toast.msg}</span>
          </div>
        </div>
      )}

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;

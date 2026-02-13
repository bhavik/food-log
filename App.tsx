import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { LogEntry, MealType, MealCategory, FoodItem } from './types';
import { STORAGE_KEY, MEAL_CATEGORIES as DEFAULT_CATEGORIES } from './constants';
import { DIET_PLANS, DEFAULT_DIET_PLAN_ID, getDefaultCategories } from './dietPlans';
import type { DietPlanId } from './dietPlans';
import Dashboard from './components/Dashboard';
import History from './components/History';
import BottomNav from './components/BottomNav';
import AuthButton from './components/AuthButton';
import Nutrition from './components/Nutrition';
import LoginPage from './components/LoginPage';
import OnboardingDiet from './components/OnboardingDiet';
import HomePage from './components/HomePage';
import type { CustomItemAction } from './components/CustomItemModal';
import { useAuth } from './lib/auth-context';
import * as data from './lib/data';

const CATEGORIES_STORAGE_KEY = 'foodlog_v2_categories';
const DIET_PLAN_STORAGE_KEY = 'foodlog_diet_plan_id';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isDbItemId(id: string): boolean {
  return UUID_REGEX.test(id);
}

function buildItemKey(item: Pick<FoodItem, 'name' | 'emoji'>): string {
  return `${item.name}__${item.emoji}`;
}

function backfillLogsWithNutrition(
  logs: LogEntry[],
  categories: MealCategory[]
): { updatedLogs: LogEntry[]; updates: { id: string; nutrition: Partial<LogEntry> }[] } {
  const itemMap = new Map<string, FoodItem>();
  categories.forEach((cat) => {
    cat.items.forEach((item) => {
      itemMap.set(buildItemKey(item), item);
    });
  });
  const updates: { id: string; nutrition: Partial<LogEntry> }[] = [];
  const updatedLogs = logs.map((log) => {
    const hasNutrition =
      log.calories !== undefined ||
      log.fat !== undefined ||
      log.protein !== undefined ||
      log.sugar !== undefined;
    if (hasNutrition) return log;
    const item = itemMap.get(buildItemKey({ name: log.itemName, emoji: log.emoji }));
    if (!item) return log;
    const nutrition: Partial<LogEntry> = {
      calories: item.calories,
      fat: item.fat,
      protein: item.protein,
      sugar: item.sugar,
    };
    if (
      nutrition.calories === undefined &&
      nutrition.fat === undefined &&
      nutrition.protein === undefined &&
      nutrition.sugar === undefined
    ) {
      return log;
    }
    updates.push({ id: log.id, nutrition });
    return { ...log, ...nutrition };
  });
  return { updatedLogs, updates };
}

function getStoredDietPlanId(): DietPlanId | null {
  const id = localStorage.getItem(DIET_PLAN_STORAGE_KEY);
  if (id && id in DIET_PLANS) return id as DietPlanId;
  return null;
}

const App: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [categories, setCategories] = useState<MealCategory[]>(DEFAULT_CATEGORIES);
  const [activeTab, setActiveTab] = useState<'track' | 'history' | 'nutrition'>('track');
  const [toast, setToast] = useState<{ msg: string; error?: boolean } | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const backfillDoneRef = useRef(false);

  const isSignedIn = !!user;
  const userId = user?.uid ?? null;

  useEffect(() => {
    if (isSignedIn) {
      setShowLoginPage(false);
    }
  }, [isSignedIn]);

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
          if (!localStorage.getItem(DIET_PLAN_STORAGE_KEY)) {
            localStorage.setItem(DIET_PLAN_STORAGE_KEY, DEFAULT_DIET_PLAN_ID);
          }
        } catch (e) {
          console.error(e);
        }
      }
      return;
    }
    setSyncing(true);
    const dietId = getStoredDietPlanId();
    const baseCategories = dietId ? DIET_PLANS[dietId].categories : getDefaultCategories();
    Promise.all([data.fetchFoodLogs(), data.fetchUserFoodItems()])
      .then(([logEntries, userItems]) => {
        const mergedCategories = data.buildCategoriesWithUserItems(baseCategories, userItems);
        setCategories(mergedCategories);
        setLogs(logEntries);
      })
      .catch(console.error)
      .finally(() => setSyncing(false));
  }, [isSignedIn]);

  const handleDietSelect = useCallback((dietPlanId: DietPlanId) => {
    localStorage.setItem(DIET_PLAN_STORAGE_KEY, dietPlanId);
    setCategories(DIET_PLANS[dietPlanId].categories);
    setShowOnboarding(false);
    if (!isSignedIn) {
      setShowLoginPage(true);
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (isSignedIn) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }, [isSignedIn, logs]);

  useEffect(() => {
    if (isSignedIn) return;
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
  }, [isSignedIn, categories]);

  useEffect(() => {
    if (backfillDoneRef.current) return;
    if (logs.length === 0 || categories.length === 0) return;
    const { updatedLogs, updates } = backfillLogsWithNutrition(logs, categories);
    if (updates.length === 0) {
      backfillDoneRef.current = true;
      return;
    }
    setLogs(updatedLogs);
    if (isSignedIn) {
      Promise.all(updates.map((u) => data.updateFoodLogNutrition(u.id, u.nutrition))).catch(console.error);
    }
    backfillDoneRef.current = true;
  }, [logs, categories, isSignedIn]);

  const addLog = useCallback(
    async (
      name: string,
      type: MealType,
      emoji: string,
      isCustom = false,
      nutrition?: { calories?: number; fat?: number; protein?: number; sugar?: number }
    ) => {
      if (!isSignedIn) {
        setToast({ msg: 'Sign in to track food', error: true });
        setTimeout(() => setToast(null), 3000);
        setShowLoginPage(true);
        return;
      }
      const newEntry: Omit<LogEntry, 'id'> = {
        timestamp: Date.now(),
        mealType: type,
        itemName: name,
        emoji,
        isCustom,
        calories: nutrition?.calories,
        fat: nutrition?.fat,
        protein: nutrition?.protein,
        sugar: nutrition?.sugar,
      };
      if (userId) {
        const result = await data.insertFoodLog(newEntry, userId);
        if ('error' in result) {
          const errMsg = result.error;
          setLogs((prev) => [
            { ...newEntry, id: Math.random().toString(36).substring(7) },
            ...prev,
          ]);
          setToast({ msg: errMsg, error: true });
          setTimeout(() => setToast(null), 6000);
        } else {
          setLogs((prev) => [result.entry, ...prev]);
          setToast({ msg: name });
          setTimeout(() => setToast(null), 2500);
        }
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
    async (
      name: string,
      emoji: string,
      action: CustomItemAction,
      nutrition?: { calories?: number; fat?: number; protein?: number; sugar?: number }
    ) => {
      if (action.savePermanently && action.mealType) {
        const fallbackItem: FoodItem = {
          id: `custom_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          name,
          emoji,
          calories: nutrition?.calories,
          fat: nutrition?.fat,
          protein: nutrition?.protein,
          sugar: nutrition?.sugar,
        };
        if (isSignedIn && userId) {
          const newItem = await data.insertUserFoodItem(
            userId,
            action.mealType,
            name,
            emoji,
            nutrition
          );
          if (newItem) {
            addItemToCategory(action.mealType, newItem);
            await addLog(name, action.mealType, emoji, true, nutrition);
          } else {
            addItemToCategory(action.mealType, fallbackItem);
            await addLog(name, action.mealType, emoji, true, nutrition);
            setToast({ msg: 'Item added to list but couldn\'t save to cloud.', error: true });
            setTimeout(() => setToast(null), 5000);
          }
        } else {
          addItemToCategory(action.mealType, fallbackItem);
          await addLog(name, action.mealType, emoji, true, nutrition);
        }
      } else {
        await addLog(name, 'other', emoji, true, nutrition);
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

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-950 text-stone-400">
        <div className="animate-pulse text-sm">Loading…</div>
      </div>
    );
  }

  if (showLoginPage && !isSignedIn) {
    return (
      <LoginPage
        onBack={() => setShowLoginPage(false)}
        message="Sign in to track your meals and see your nutrition history."
      />
    );
  }

  if (!isSignedIn && showOnboarding) {
    return (
      <OnboardingDiet
        onSelect={handleDietSelect}
        onBack={() => setShowOnboarding(false)}
      />
    );
  }

  if (!isSignedIn) {
    return (
      <HomePage
        onGetStarted={() => setShowOnboarding(true)}
        onSignIn={() => setShowLoginPage(true)}
        isSignedIn={false}
      />
    );
  }

  if (showOnboarding) {
    return (
      <OnboardingDiet
        onSelect={handleDietSelect}
        onBack={() => setShowOnboarding(false)}
      />
    );
  }

  return (
    <div className="min-h-screen pb-28 antialiased">
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[var(--bg-primary)]/90 backdrop-blur-xl">
        <div className="max-w-xl mx-auto px-4 sm:px-5 pt-5 pb-4 flex justify-between items-start gap-4">
          <div className="min-w-0 flex-1">
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
            {logs.length === 0 && (
              <button
                type="button"
                onClick={() => setShowOnboarding(true)}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 border border-emerald-500/60 rounded-lg px-4 py-2 transition-smooth shadow-sm"
              >
                Change diet plan
              </button>
            )}
          </div>
          <div className="flex items-center pt-1">
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
        {activeTab === 'track' && (
          <Dashboard
            onLog={addLog}
            logs={logs}
            categories={categories}
            onUpdateTitle={updateItemTitle}
            onAddCustomItem={handleCustomItem}
          />
        )}
        {activeTab === 'history' && (
          <History logs={logs} onDelete={deleteLog} onImport={handleImportLogs} />
        )}
        {activeTab === 'nutrition' && (
          <Nutrition logs={logs} categories={categories} />
        )}
      </main>

      {toast && (
        <div className="fixed bottom-24 left-0 right-0 flex justify-center z-50 px-4 animate-fade-up">
          <div className={`text-white px-5 py-3.5 rounded-xl shadow-lg flex items-center gap-3 border ${toast.error ? 'bg-amber-900/90 border-amber-500/30' : 'bg-stone-800 border-white/[0.08]'}`}>
            {toast.error ? (
              <div className="h-2.5 w-2.5 bg-amber-400 rounded-full" />
            ) : (
              <div className="h-2.5 w-2.5 bg-emerald-400 rounded-full animate-pulse" />
            )}
            <span className="text-base font-medium whitespace-nowrap">
              {toast.error ? toast.msg : `Added ${toast.msg}`}
            </span>
          </div>
        </div>
      )}

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;

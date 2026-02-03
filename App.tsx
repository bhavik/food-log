
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { LogEntry, MealType, MealCategory } from './types';
import { STORAGE_KEY, MEAL_CATEGORIES as DEFAULT_CATEGORIES } from './constants';
import Dashboard from './components/Dashboard';
import History from './components/History';
import BottomNav from './components/BottomNav';

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
    <div className="min-h-screen bg-[#020617] pb-40 text-slate-200 antialiased">
      {/* High-End Sticky Header */}
      <header className="px-6 pt-14 pb-8 sticky top-0 z-40 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[10px] font-extrabold tracking-[0.4em] text-amber-500 uppercase opacity-90">
              {dateStr}
            </p>
            <h1 className="text-3xl font-black tracking-tighter text-white">
              Food<span className="text-slate-500 font-light italic">Log</span>
            </h1>
          </div>
          <div className="flex flex-col items-end">
            <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
              <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">System Ready</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-6 mt-10">
        {activeTab === 'track' ? (
          <Dashboard 
            onLog={addLog} 
            logs={logs} 
            categories={categories} 
            onUpdateTitle={updateItemTitle}
          />
        ) : (
          <History 
            logs={logs} 
            onDelete={deleteLog} 
            onImport={handleImportLogs} 
          />
        )}
      </main>

      {/* Premium Toast Notification */}
      {toast && (
        <div className="fixed bottom-36 left-0 right-0 flex justify-center z-50 px-6 animate-lux">
          <div className="bg-white text-black px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/20">
            <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-black tracking-widest uppercase whitespace-nowrap">Logged: {toast.msg}</span>
          </div>
        </div>
      )}

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;

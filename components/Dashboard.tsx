
import React, { useState, useMemo } from 'react';
import { MealType, LogEntry, MealCategory } from '../types';
import CustomItemModal from './CustomItemModal';
import { ChevronRightIcon, PlusIcon, CheckIcon, Edit3Icon, XIcon, ActivityIcon } from 'lucide-react';

interface DashboardProps {
  onLog: (name: string, type: MealType, emoji: string, isCustom?: boolean) => void;
  logs: LogEntry[];
  categories: MealCategory[];
  onUpdateTitle: (itemId: string, newTitle: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLog, logs, categories, onUpdateTitle }) => {
  const [selectedType, setSelectedType] = useState<MealType>(() => {
    const hour = new Date().getHours();
    if (hour < 10) return 'breakfast';
    if (hour < 15) return 'lunch';
    if (hour < 19) return 'snack';
    return 'dinner';
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{id: string, name: string} | null>(null);

  const todayLogs = useMemo(() => {
    const startOfDay = new Date().setHours(0, 0, 0, 0);
    return logs.filter(log => log.timestamp >= startOfDay);
  }, [logs]);

  const isItemLoggedToday = (name: string) => {
    return todayLogs.some(log => log.itemName === name);
  };

  const activeCategory = categories.find(c => c.type === selectedType) || categories[0];

  const handleUpdateTitle = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem && editingItem.name.trim()) {
      onUpdateTitle(editingItem.id, editingItem.name.trim());
      setEditingItem(null);
    }
  };

  return (
    <div className="space-y-12 animate-lux">
      {/* Luxury Category Selector */}
      <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar gap-1">
        {categories.map((cat) => (
          <button
            key={cat.type}
            onClick={() => setSelectedType(cat.type)}
            className={`whitespace-nowrap flex-1 py-3 px-6 rounded-xl text-[10px] font-black tracking-[0.2em] transition-lux uppercase ${
              selectedType === cat.type 
                ? 'bg-amber-500 text-[#020617] shadow-lg shadow-amber-500/20' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main List Interface */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <div className="flex items-center gap-3">
              <ActivityIcon size={14} className="text-amber-500" />
              <h2 className="text-[11px] font-black tracking-[0.3em] text-slate-400 uppercase">Available Protocols</h2>
           </div>
           <span className="text-[10px] font-bold text-slate-600 bg-white/5 px-3 py-1 rounded-full border border-white/5 uppercase tracking-tighter">
            {todayLogs.filter(l => l.mealType === selectedType).length} Recorded
           </span>
        </div>

        <div className="space-y-3">
          {activeCategory.items.map((item) => {
            const logged = isItemLoggedToday(item.name);
            return (
              <div
                key={item.id}
                className={`relative overflow-hidden flex items-center justify-between p-6 rounded-3xl transition-lux group border ${
                  logged 
                    ? 'bg-slate-900/40 border-slate-800/50' 
                    : 'bg-white/[0.03] border-white/[0.05] hover:border-amber-500/30 hover:bg-white/[0.05]'
                }`}
              >
                <button
                  disabled={logged}
                  onClick={() => onLog(item.name, selectedType, item.emoji)}
                  className="flex-1 flex items-center gap-6 text-left relative z-10"
                >
                  <div className={`h-1.5 w-1.5 rounded-full shadow-lg transition-lux ${
                    logged ? 'bg-amber-500 shadow-amber-500/50 scale-125' : 'bg-slate-700 group-hover:bg-slate-400'
                  }`}></div>
                  <div className="flex flex-col">
                    <span className={`text-[15px] font-bold tracking-tight transition-lux ${
                      logged ? 'text-slate-500 opacity-60' : 'text-slate-200 group-hover:text-white'
                    }`}>
                      {item.name}
                    </span>
                    {logged && (
                      <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest mt-1">Confirmed Log</span>
                    )}
                  </div>
                </button>
                
                <div className="flex items-center gap-6 relative z-10">
                  {!logged && (
                    <button 
                      onClick={() => setEditingItem({ id: item.id, name: item.name })}
                      className="text-slate-600 hover:text-amber-500 transition-lux p-2 rounded-xl hover:bg-white/5"
                    >
                      <Edit3Icon size={16} strokeWidth={2.5} />
                    </button>
                  )}
                  {logged ? (
                    <div className="bg-amber-500/10 p-2 rounded-xl border border-amber-500/20">
                      <CheckIcon size={16} strokeWidth={3} className="text-amber-500" />
                    </div>
                  ) : (
                    <div className="p-2 text-slate-700 transition-lux group-hover:text-slate-200">
                      <ChevronRightIcon size={20} strokeWidth={1.5} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Addition Trigger */}
      <div className="pt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-between p-8 rounded-3xl border border-dashed border-white/10 hover:border-amber-500/40 hover:bg-amber-500/[0.02] transition-lux group"
          >
            <div className="flex items-center gap-6">
               <div className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 group-hover:bg-amber-500 group-hover:text-[#020617] transition-lux shadow-2xl">
                  <PlusIcon size={20} strokeWidth={3} />
               </div>
               <div className="text-left">
                  <p className="text-xs font-black text-slate-300 uppercase tracking-[0.2em]">Manual Entry</p>
                  <p className="text-[10px] font-bold text-slate-600 mt-1 uppercase tracking-tighter italic">Override Standard Protocol</p>
               </div>
            </div>
          </button>
      </div>

      {/* Minimalist Edit Overlay */}
      {editingItem && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-[#020617]/95 backdrop-blur-md" onClick={() => setEditingItem(null)}></div>
          <form 
            onSubmit={handleUpdateTitle}
            className="relative w-full max-w-sm bg-[#0f172a] rounded-[2rem] p-10 border border-white/10 shadow-2xl animate-lux"
          >
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-500">Edit Title</h3>
              <button type="button" onClick={() => setEditingItem(null)} className="text-slate-500 hover:text-white p-2">
                <XIcon size={20} />
              </button>
            </div>
            <input 
              autoFocus
              type="text"
              value={editingItem.name}
              onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
              className="w-full bg-transparent text-2xl font-black py-4 border-b-2 border-white/5 focus:outline-none focus:border-amber-500 transition-lux mb-12 text-white placeholder:text-slate-800"
            />
            <button 
              type="submit"
              className="w-full py-5 bg-amber-500 text-[#020617] rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-xl hover:bg-amber-400 transition-lux active:scale-95"
            >
              Confirm Changes
            </button>
          </form>
        </div>
      )}

      {isModalOpen && (
        <CustomItemModal 
          onClose={() => setIsModalOpen(false)} 
          onAdd={(name, emoji) => {
            onLog(name, 'other', emoji, true);
            setIsModalOpen(false);
          }} 
        />
      )}
    </div>
  );
};

export default Dashboard;

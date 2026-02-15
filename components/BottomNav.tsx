import React from 'react';
import { PlusCircleIcon, ClockIcon, PieChartIcon, UtensilsCrossedIcon } from 'lucide-react';

export type TabId = 'track' | 'add' | 'nutrition' | 'history';

interface BottomNavProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'track', label: 'Track', icon: <PlusCircleIcon size={24} strokeWidth={2} /> },
  { id: 'add', label: 'Add', icon: <UtensilsCrossedIcon size={24} strokeWidth={2} /> },
  { id: 'nutrition', label: 'Nutrition', icon: <PieChartIcon size={24} strokeWidth={2} /> },
  { id: 'history', label: 'History', icon: <ClockIcon size={24} strokeWidth={2} /> },
];

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      <div className="max-w-xl mx-auto px-3 mb-2">
        <div className="rounded-t-2xl bg-stone-900/95 backdrop-blur-xl border border-b-0 border-white/[0.08] shadow-2xl overflow-hidden">
          <div className="flex items-stretch">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 min-w-0 transition-smooth ${
                  isActive ? 'text-emerald-400' : 'text-stone-500 active:text-stone-300'
                }`}
              >
                <span className={`inline-flex transition-transform duration-200 ${isActive ? 'scale-110' : 'scale-100'}`}>{tab.icon}</span>
                <span className="text-[10px] font-medium uppercase tracking-wide truncate w-full text-center px-0.5">
                  {tab.label}
                </span>
              </button>
            );
          })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;

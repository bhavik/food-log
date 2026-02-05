import React from 'react';
import { PlusCircleIcon, ClockIcon } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'track' | 'history';
  setActiveTab: (tab: 'track' | 'history') => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-stone-950/95 backdrop-blur-xl border-t border-white/[0.06] safe-area-pb">
      <div className="max-w-xl mx-auto px-6 py-4 flex justify-center">
        <div className="flex items-center gap-6 sm:gap-8">
        <button
          onClick={() => setActiveTab('track')}
          className={`flex flex-col items-center gap-1.5 transition-smooth ${
            activeTab === 'track' ? 'nav-tab-active' : 'text-stone-500 hover:text-stone-400'
          }`}
        >
          <PlusCircleIcon size={24} strokeWidth={activeTab === 'track' ? 2.5 : 2} />
          <span className="text-xs font-medium uppercase tracking-wider">Track</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center gap-1.5 transition-smooth ${
            activeTab === 'history' ? 'nav-tab-active' : 'text-stone-500 hover:text-stone-400'
          }`}
        >
          <ClockIcon size={24} strokeWidth={activeTab === 'history' ? 2.5 : 2} />
          <span className="text-xs font-medium uppercase tracking-wider">History</span>
        </button>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;

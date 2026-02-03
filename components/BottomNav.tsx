
import React from 'react';
import { TargetIcon, ScrollTextIcon } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'track' | 'history';
  setActiveTab: (tab: 'track' | 'history') => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#020617]/90 backdrop-blur-2xl border-t border-white/5 pb-10 pt-5 px-10 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <button
        onClick={() => setActiveTab('track')}
        className={`flex flex-col items-center gap-2 transition-lux group ${
          activeTab === 'track' ? 'text-amber-500' : 'text-slate-600 hover:text-slate-400'
        }`}
      >
        <div className={`p-3 rounded-2xl transition-lux ${activeTab === 'track' ? 'bg-amber-500/10' : 'group-hover:bg-white/5'}`}>
          <TargetIcon size={20} strokeWidth={activeTab === 'track' ? 3 : 2} />
        </div>
        <span className="text-[9px] font-black uppercase tracking-[0.3em]">Track</span>
      </button>
      
      <div className="h-10 w-px bg-white/5"></div>

      <button
        onClick={() => setActiveTab('history')}
        className={`flex flex-col items-center gap-2 transition-lux group ${
          activeTab === 'history' ? 'text-amber-500' : 'text-slate-600 hover:text-slate-400'
        }`}
      >
        <div className={`p-3 rounded-2xl transition-lux ${activeTab === 'history' ? 'bg-amber-500/10' : 'group-hover:bg-white/5'}`}>
          <ScrollTextIcon size={20} strokeWidth={activeTab === 'history' ? 3 : 2} />
        </div>
        <span className="text-[9px] font-black uppercase tracking-[0.3em]">History</span>
      </button>
    </nav>
  );
};

export default BottomNav;

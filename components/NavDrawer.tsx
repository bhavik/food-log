import React from 'react';
import { MenuIcon, XIcon, PlusCircleIcon, ClockIcon } from 'lucide-react';

interface NavDrawerProps {
  activeTab: 'track' | 'history';
  setActiveTab: (tab: 'track' | 'history') => void;
}

const NavDrawer: React.FC<NavDrawerProps> = ({ activeTab, setActiveTab }) => {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (tab: 'track' | 'history') => {
    setActiveTab(tab);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="p-2.5 -ml-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/5 transition-smooth"
        aria-label="Open menu"
      >
        <MenuIcon size={24} strokeWidth={2} />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <aside
            className="fixed top-0 left-0 z-[101] h-full w-64 max-w-[80vw] bg-stone-900 border-r border-white/10 shadow-2xl flex flex-col animate-slide-in-left"
            role="dialog"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <span className="text-sm font-semibold uppercase tracking-wider text-amber-400/90">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2.5 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-smooth"
                aria-label="Close menu"
              >
                <XIcon size={20} strokeWidth={2} />
              </button>
            </div>
            <nav className="p-3 flex flex-col gap-1">
              <button
                type="button"
                onClick={() => handleSelect('track')}
                className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-left transition-smooth ${
                  activeTab === 'track'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'text-stone-300 hover:bg-white/5 border border-transparent'
                }`}
              >
                <PlusCircleIcon size={20} strokeWidth={2} />
                <span className="text-base font-medium">Log food</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelect('history')}
                className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-left transition-smooth ${
                  activeTab === 'history'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'text-stone-300 hover:bg-white/5 border border-transparent'
                }`}
              >
                <ClockIcon size={20} strokeWidth={2} />
                <span className="text-base font-medium">History</span>
              </button>
            </nav>
          </aside>
        </>
      )}
    </>
  );
};

export default NavDrawer;

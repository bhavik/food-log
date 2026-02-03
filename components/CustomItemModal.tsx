
import React, { useState } from 'react';
import { XIcon, CheckIcon, LayersIcon } from 'lucide-react';

interface CustomItemModalProps {
  onClose: () => void;
  onAdd: (name: string, emoji: string) => void;
}

const SYMBOLS = ['🥗', '🍛', '🍲', '🥛', '☕', '🍎', '🍐', '🥦', '🍳', '🥜', '🍪', '🥤'];

const CustomItemModal: React.FC<CustomItemModalProps> = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🥗');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), selectedEmoji);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center px-4">
      <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-xl transition-opacity" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg bg-[#0f172a] rounded-t-[3rem] p-10 shadow-2xl animate-lux border-t border-white/10">
        <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
               <LayersIcon size={16} className="text-amber-500" />
               <h2 className="text-xs font-black tracking-[0.4em] text-slate-400 uppercase">Override Protocol</h2>
            </div>
            <button 
              onClick={onClose}
              className="h-10 w-10 text-slate-500 hover:text-white flex items-center justify-center transition-lux bg-white/5 rounded-2xl"
            >
              <XIcon size={20} />
            </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-12 pb-6">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 ml-1">Manual Description</label>
            <input
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type entry title..."
              className="w-full bg-transparent text-2xl font-black py-4 border-b-2 border-white/5 focus:outline-none focus:border-amber-500 transition-lux text-white placeholder:text-slate-800"
              required
            />
          </div>

          <div className="space-y-6">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 ml-1">Contextual Marker</label>
            <div className="grid grid-cols-6 gap-3">
              {SYMBOLS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`h-14 w-14 rounded-2xl flex items-center justify-center text-xl transition-lux ${
                    selectedEmoji === emoji 
                        ? 'bg-amber-500 text-[#020617] shadow-xl shadow-amber-500/20 scale-110' 
                        : 'bg-white/5 hover:bg-white/10 text-slate-500'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-6 bg-white text-[#020617] rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-amber-500 transition-lux active:scale-95 flex items-center justify-center gap-4"
          >
            <CheckIcon size={20} strokeWidth={3} />
            Commit Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomItemModal;

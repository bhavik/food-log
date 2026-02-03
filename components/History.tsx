
import React, { useState, useMemo, useRef } from 'react';
import { LogEntry } from '../types';
import { Trash2Icon, CalendarIcon, ClockIcon, DatabaseIcon, DownloadIcon, UploadIcon } from 'lucide-react';

interface HistoryProps {
  logs: LogEntry[];
  onDelete: (id: string) => void;
  onImport?: (logs: LogEntry[]) => void;
}

type FilterType = 'day' | 'week' | 'month';

const History: React.FC<HistoryProps> = ({ logs, onDelete, onImport }) => {
  const [filter, setFilter] = useState<FilterType>('day');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredLogs = useMemo(() => {
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const weekMs = 7 * dayMs;
    const monthMs = 30 * dayMs;

    return logs.filter(log => {
      const diff = now - log.timestamp;
      if (filter === 'day') return diff < dayMs;
      if (filter === 'week') return diff < weekMs;
      return diff < monthMs;
    });
  }, [logs, filter]);

  const groupedLogs = useMemo(() => {
    const groups: { [key: string]: LogEntry[] } = {};
    filteredLogs.forEach(log => {
      const date = new Date(log.timestamp).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
      if (!groups[date]) groups[date] = [];
      groups[date].push(log);
    });
    return groups;
  }, [filteredLogs]);

  const handleExport = () => {
    const dataStr = JSON.stringify(logs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `foodlog_backup_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedLogs = JSON.parse(event.target?.result as string);
        if (Array.isArray(importedLogs) && onImport) {
          onImport(importedLogs);
          alert('System data successfully restored.');
        }
      } catch (err) {
        alert('Invalid backup file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-12 animate-lux">
      {/* Luxury Segmented Toggle */}
      <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
        {(['day', 'week', 'month'] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-lux ${
              filter === f 
                ? 'bg-white text-[#020617] shadow-xl' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {Object.keys(groupedLogs).length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="h-16 w-16 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center justify-center mb-8 text-slate-700">
            <CalendarIcon size={24} strokeWidth={1.5} />
          </div>
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">Vault Empty</h3>
          <p className="text-[10px] text-slate-700 font-bold mt-2 uppercase italic">No history detected in current scope</p>
        </div>
      ) : (
        <div className="space-y-16">
          {Object.entries(groupedLogs).map(([date, entries]) => (
            <div key={date} className="relative">
              <div className="flex items-center gap-6 mb-8">
                 <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-500">
                  {date}
                </h3>
                <div className="h-px flex-1 bg-white/5"></div>
              </div>
              
              <div className="space-y-4">
                {(entries as LogEntry[]).map((log) => (
                  <div 
                    key={log.id} 
                    className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/[0.05] rounded-[1.5rem] group hover:bg-white/[0.05] transition-lux"
                  >
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-center gap-1 text-slate-600">
                        <ClockIcon size={12} />
                        <span className="text-[10px] font-black tracking-tighter tabular-nums">
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                        </span>
                      </div>
                      <div className="h-8 w-px bg-white/5"></div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{log.emoji}</span>
                        <div>
                          <p className="font-bold text-slate-100 text-[15px] tracking-tight">{log.itemName}</p>
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1 opacity-60">{log.mealType}</p>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => onDelete(log.id)}
                      className="opacity-0 group-hover:opacity-100 transition-lux h-10 w-10 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 rounded-xl"
                    >
                      <Trash2Icon size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* System Management Section */}
      <div className="pt-12 border-t border-white/5">
        <div className="flex items-center gap-3 mb-8 px-2">
           <DatabaseIcon size={14} className="text-slate-600" />
           <h2 className="text-[11px] font-black tracking-[0.3em] text-slate-600 uppercase">System Maintenance</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={handleExport}
            className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.08] transition-lux"
          >
            <DownloadIcon size={16} />
            <span className="text-[9px] font-black uppercase tracking-widest">Backup Data</span>
          </button>
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.08] transition-lux"
          >
            <UploadIcon size={16} />
            <span className="text-[9px] font-black uppercase tracking-widest">Restore Data</span>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImport} 
            accept=".json" 
            className="hidden" 
          />
        </div>
      </div>
    </div>
  );
};

export default History;

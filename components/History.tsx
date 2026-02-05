import React, { useState, useMemo, useRef } from 'react';
import { LogEntry } from '../types';
import { Trash2Icon, CalendarIcon, DownloadIcon, UploadIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface HistoryProps {
  logs: LogEntry[];
  onDelete: (id: string) => void;
  onImport?: (logs: LogEntry[]) => void;
}

type FilterType = 'day' | 'week' | 'month';

const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * DAY_MS;
const MONTH_MS = 30 * DAY_MS;

function startOfDay(ts: number): number {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function dateKey(ts: number): string {
  return new Date(ts).toLocaleDateString('en-CA'); // YYYY-MM-DD
}

function formatDayHeader(ts: number): string {
  const d = new Date(ts);
  const today = startOfDay(Date.now());
  const thisDay = startOfDay(ts);
  if (thisDay === today) return 'Today';
  if (thisDay === today - DAY_MS) return 'Yesterday';
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

const History: React.FC<HistoryProps> = ({ logs, onDelete, onImport }) => {
  const [filter, setFilter] = useState<FilterType>('day');
  const [monthOffset, setMonthOffset] = useState(0); // for month view: 0 = current month
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const now = Date.now();

  const filteredLogsDay = useMemo(() => {
    return logs.filter(log => now - log.timestamp < DAY_MS);
  }, [logs, now]);

  const filteredLogsWeek = useMemo(() => {
    return logs.filter(log => now - log.timestamp < WEEK_MS);
  }, [logs, now]);

  const filteredLogsMonth = useMemo(() => {
    return logs.filter(log => now - log.timestamp < MONTH_MS);
  }, [logs, now]);

  const groupedByDateDay = useMemo(() => {
    const groups: Record<string, LogEntry[]> = {};
    filteredLogsDay.forEach(log => {
      const key = dateKey(log.timestamp);
      if (!groups[key]) groups[key] = [];
      groups[key].push(log);
    });
    return groups;
  }, [filteredLogsDay]);

  const weekDays = useMemo(() => {
    const days: number[] = [];
    const todayStart = startOfDay(now);
    for (let i = 6; i >= 0; i--) days.push(todayStart - i * DAY_MS);
    return days;
  }, [now]);

  const weekLogsByDay = useMemo(() => {
    const byDay: Record<number, LogEntry[]> = {};
    weekDays.forEach(dayStart => {
      byDay[dayStart] = filteredLogsWeek.filter(log => startOfDay(log.timestamp) === dayStart);
    });
    return byDay;
  }, [filteredLogsWeek, weekDays]);

  const monthGrid = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + monthOffset);
    d.setDate(1);
    const year = d.getFullYear();
    const month = d.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startWeekday = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const cells: { date: number | null; key: string | null; count: number }[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push({ date: null, key: null, count: 0 });
    for (let day = 1; day <= daysInMonth; day++) {
      const ts = new Date(year, month, day).getTime();
      cells.push({ date: ts, key: dateKey(ts), count: 0 });
    }
    const totalCells = cells.length;
    const remainder = totalCells % 7;
    if (remainder !== 0) {
      for (let i = 0; i < 7 - remainder; i++) {
        cells.push({ date: null, key: null, count: 0 });
      }
    }
    const logsByKey: Record<string, LogEntry[]> = {};
    filteredLogsMonth.forEach(log => {
      const key = dateKey(log.timestamp);
      if (!logsByKey[key]) logsByKey[key] = [];
      logsByKey[key].push(log);
    });
    cells.forEach(c => {
      if (c.key) c.count = (logsByKey[c.key] || []).length;
    });
    return {
      year,
      month,
      monthName: firstDay.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      cells,
      logsByKey
    };
  }, [monthOffset, filteredLogsMonth]);

  const selectedDayLogs = useMemo(() => {
    if (!selectedDateKey) return [];
    return monthGrid.logsByKey[selectedDateKey] || [];
  }, [selectedDateKey, monthGrid.logsByKey]);

  const handleExport = () => {
    const dataStr = JSON.stringify(logs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
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

  const renderDayView = () => {
    if (Object.keys(groupedByDateDay).length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-14 w-14 bg-stone-800 rounded-2xl flex items-center justify-center mb-6 text-stone-600">
            <CalendarIcon size={28} strokeWidth={1.5} />
          </div>
          <h3 className="text-base font-medium text-stone-500">No entries yet</h3>
          <p className="text-sm text-stone-600 mt-1">Log something from the Log tab</p>
        </div>
      );
    }
    return (
      <div className="space-y-6">
        {Object.entries(groupedByDateDay).map(([date, entries]) => (
          <div key={date}>
            <h3 className="text-base font-medium text-stone-500 mb-4">
              {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </h3>
            <div className="space-y-2">
              {(entries as LogEntry[]).map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between py-3 px-4 bg-stone-800/40 rounded-xl border border-transparent hover:border-white/[0.06] group transition-smooth"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="text-xl shrink-0">{log.emoji}</span>
                    <div className="min-w-0">
                      <p className="font-medium text-stone-100 text-base truncate">{log.itemName}</p>
                      <p className="text-sm text-stone-500 mt-0.5 capitalize">{log.mealType}</p>
                      </div>
                    <span className="text-sm text-stone-600 tabular-nums shrink-0 ml-auto mr-2">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </span>
                  </div>
                  <button
                    onClick={() => onDelete(log.id)}
                    className="p-2 rounded-lg text-stone-500 hover:text-red-400 hover:bg-red-500/10 transition-smooth"
                    aria-label="Delete"
                  >
                    <Trash2Icon size={16} strokeWidth={2} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderWeekView = () => {
    const hasAny = weekDays.some(day => (weekLogsByDay[day] || []).length > 0);
    if (!hasAny) {
      return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-14 w-14 bg-stone-800 rounded-2xl flex items-center justify-center mb-6 text-stone-600">
            <CalendarIcon size={28} strokeWidth={1.5} />
          </div>
          <h3 className="text-base font-medium text-stone-500">No entries this week</h3>
        </div>
      );
    }
    return (
      <div className="overflow-x-auto no-scrollbar -mx-1">
        <div className="flex gap-3 min-w-max pb-2">
          {weekDays.map(dayStart => {
            const dayLogs = weekLogsByDay[dayStart] || [];
            return (
              <div
                key={dayStart}
                className="w-[160px] shrink-0 rounded-xl bg-stone-800/50 border border-white/[0.06] overflow-hidden"
              >
                <div className="px-3 py-2 border-b border-white/[0.06] bg-stone-800/80">
                  <p className="text-sm font-medium text-stone-400">{formatDayHeader(dayStart)}</p>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {new Date(dayStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div className="p-2 space-y-1.5 max-h-[280px] overflow-y-auto">
                  {dayLogs.length === 0 ? (
                    <p className="text-sm text-stone-600 py-2 text-center">—</p>
                  ) : (
                    dayLogs.map(log => (
                      <div
                        key={log.id}
                        className="flex items-center gap-2 py-2 px-2 rounded-lg bg-stone-900/50 group/row"
                      >
                        <span className="text-base shrink-0">{log.emoji}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-stone-200 truncate">{log.itemName}</p>
                          <p className="text-xs text-stone-500">
                            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                          </p>
                        </div>
                        <button
                          onClick={() => onDelete(log.id)}
                          className="p-1.5 rounded text-stone-500 opacity-0 group-hover/row:opacity-100 hover:text-red-400 hover:bg-red-500/10 transition-smooth"
                          aria-label="Delete"
                        >
                          <Trash2Icon size={12} strokeWidth={2} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const { monthName, cells, logsByKey } = monthGrid;
    const weekDaysHeader = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setMonthOffset(m => m - 1)}
            className="p-2 rounded-lg text-stone-500 hover:text-white hover:bg-white/5 transition-smooth"
            aria-label="Previous month"
          >
            <ChevronLeftIcon size={20} />
          </button>
          <h3 className="text-base font-medium text-stone-300">{monthName}</h3>
          <button
            onClick={() => setMonthOffset(m => m + 1)}
            className="p-2 rounded-lg text-stone-500 hover:text-white hover:bg-white/5 transition-smooth"
            aria-label="Next month"
          >
            <ChevronRightIcon size={20} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {weekDaysHeader.map(day => (
            <div key={day} className="py-1.5 text-center text-xs font-medium text-stone-500 uppercase">
              {day}
            </div>
          ))}
          {cells.map((cell, i) => {
            if (cell.date === null) {
              return <div key={`empty-${i}`} className="aspect-square" />;
            }
            const isSelected = selectedDateKey === cell.key;
            const hasLogs = cell.count > 0;
            return (
              <button
                key={cell.key!}
                type="button"
                onClick={() => setSelectedDateKey(isSelected ? null : cell.key)}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-base transition-smooth ${
                  isSelected
                    ? 'bg-emerald-500/30 text-emerald-300 ring-1 ring-emerald-500/50'
                    : hasLogs
                      ? 'bg-stone-800/60 text-stone-200 hover:bg-stone-700/60'
                      : 'text-stone-500 hover:bg-stone-800/40'
                }`}
              >
                <span className="tabular-nums">{new Date(cell.date!).getDate()}</span>
                {hasLogs && (
                  <span className="text-xs text-stone-500 mt-0.5">{cell.count}</span>
                )}
              </button>
            );
          })}
        </div>
        {selectedDateKey && selectedDayLogs.length > 0 && (
          <div className="pt-4 border-t border-white/[0.06]">
            <h4 className="text-base font-medium text-stone-500 mb-3">
              {new Date(selectedDateKey).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </h4>
            <div className="space-y-2">
              {selectedDayLogs.map(log => (
                <div
                  key={log.id}
                  className="flex items-center justify-between py-2.5 px-3 bg-stone-800/40 rounded-xl group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-lg shrink-0">{log.emoji}</span>
                    <div className="min-w-0">
                      <p className="font-medium text-stone-100 text-base truncate">{log.itemName}</p>
                      <p className="text-sm text-stone-500 capitalize">{log.mealType}</p>
                    </div>
                    <span className="text-sm text-stone-600 tabular-nums shrink-0 ml-auto mr-2">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </span>
                  </div>
                  <button
                    onClick={() => onDelete(log.id)}
                    className="p-2 rounded-lg text-stone-500 hover:text-red-400 hover:bg-red-500/10 transition-smooth"
                    aria-label="Delete"
                  >
                    <Trash2Icon size={16} strokeWidth={2} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedDateKey && selectedDayLogs.length === 0 && (
          <div className="pt-4 border-t border-white/[0.06]">
            <p className="text-base text-stone-500">
              No entries on {new Date(selectedDateKey).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex bg-stone-800/60 p-1 rounded-xl">
        {(['day', 'week', 'month'] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-3 text-base font-medium rounded-lg transition-smooth capitalize ${
              filter === f ? 'bg-stone-700 text-white' : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filter === 'day' && renderDayView()}
      {filter === 'week' && renderWeekView()}
      {filter === 'month' && renderMonthView()}

      <div className="pt-8 border-t border-white/[0.06]">
        <h2 className="text-base font-medium text-stone-500 mb-4">Data</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-stone-800/50 border border-white/[0.06] text-stone-400 hover:text-white hover:bg-stone-800 transition-smooth text-base font-medium"
          >
            <DownloadIcon size={20} />
            Backup
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-stone-800/50 border border-white/[0.06] text-stone-400 hover:text-white hover:bg-stone-800 transition-smooth text-base font-medium"
          >
            <UploadIcon size={20} />
            Restore
          </button>
          <input type="file" ref={fileInputRef} onChange={handleImport} accept=".json" className="hidden" />
        </div>
      </div>
    </div>
  );
};

export default History;

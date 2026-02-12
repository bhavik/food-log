import React, { useMemo, useState } from 'react';
import type { LogEntry, MealCategory, FoodItem } from '../types';
import { LeafIcon } from 'lucide-react';

interface NutritionProps {
  logs: LogEntry[];
  categories: MealCategory[];
}

function dateKey(ts: number): string {
  return new Date(ts).toLocaleDateString('en-CA');
}

function formatDateLabel(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

type NutritionTotals = {
  calories: number;
  protein: number;
  fat: number;
  sugar: number;
};

const EMPTY_TOTALS: NutritionTotals = { calories: 0, protein: 0, fat: 0, sugar: 0 };

function buildItemKey(item: Pick<FoodItem, 'name' | 'emoji'>): string {
  return `${item.name}__${item.emoji}`;
}

const Nutrition: React.FC<NutritionProps> = ({ logs, categories }) => {
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));

  const itemLookup = useMemo(() => {
    const map = new Map<string, FoodItem>();
    categories.forEach((cat) => {
      cat.items.forEach((item) => {
        map.set(buildItemKey(item), item);
      });
    });
    return map;
  }, [categories]);

  const dayLogs = useMemo(
    () => logs.filter((log) => dateKey(log.timestamp) === selectedDate),
    [logs, selectedDate]
  );

  const { totals, missingCount, resolvedLogs } = useMemo(() => {
    const totalsAcc = { ...EMPTY_TOTALS };
    let missing = 0;
    const resolved = dayLogs.map((log) => {
      const item = itemLookup.get(buildItemKey({ name: log.itemName, emoji: log.emoji }));
      const calories = log.calories ?? item?.calories;
      const protein = log.protein ?? item?.protein;
      const fat = log.fat ?? item?.fat;
      const sugar = log.sugar ?? item?.sugar;
      const hasAll = calories !== undefined || protein !== undefined || fat !== undefined || sugar !== undefined;
      if (!hasAll) missing += 1;
      if (calories) totalsAcc.calories += calories;
      if (protein) totalsAcc.protein += protein;
      if (fat) totalsAcc.fat += fat;
      if (sugar) totalsAcc.sugar += sugar;
      return { log, item, calories, protein, fat, sugar };
    });
    return { totals: totalsAcc, missingCount: missing, resolvedLogs: resolved };
  }, [dayLogs, itemLookup]);

  return (
    <section className="space-y-6 pb-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-stone-100">Nutrition</h2>
          <p className="text-sm text-stone-500">Daily totals for {formatDateLabel(selectedDate)}</p>
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="bg-stone-900/60 border border-white/[0.08] rounded-xl px-3 py-2 text-sm text-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/[0.08] bg-stone-900/60 px-4 py-3">
          <p className="text-xs uppercase tracking-wider text-stone-500">Calories</p>
          <p className="text-2xl font-semibold text-white tabular-nums">{Math.round(totals.calories)}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-stone-900/60 px-4 py-3">
          <p className="text-xs uppercase tracking-wider text-stone-500">Protein (g)</p>
          <p className="text-2xl font-semibold text-white tabular-nums">{totals.protein.toFixed(1)}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-stone-900/60 px-4 py-3">
          <p className="text-xs uppercase tracking-wider text-stone-500">Fat (g)</p>
          <p className="text-2xl font-semibold text-white tabular-nums">{totals.fat.toFixed(1)}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-stone-900/60 px-4 py-3">
          <p className="text-xs uppercase tracking-wider text-stone-500">Sugar (g)</p>
          <p className="text-2xl font-semibold text-white tabular-nums">{totals.sugar.toFixed(1)}</p>
        </div>
      </div>

      {missingCount > 0 && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
          <p className="text-sm text-amber-200">
            {missingCount} item{missingCount === 1 ? '' : 's'} in this day are missing nutrition data.
          </p>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500">Entries</h3>
        {resolvedLogs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-14 w-14 bg-stone-800 rounded-2xl flex items-center justify-center mb-4 text-stone-600">
              <LeafIcon size={28} strokeWidth={1.5} />
            </div>
            <p className="text-sm text-stone-500">No logs for this day.</p>
          </div>
        )}
        {resolvedLogs.map(({ log, item, calories, protein, fat, sugar }) => (
          <div
            key={log.id}
            className="flex items-center justify-between py-3 px-4 bg-stone-800/40 rounded-xl border border-transparent hover:border-white/[0.06] transition-smooth"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xl">{log.emoji}</span>
              <div className="min-w-0">
                <p className="text-base font-medium text-stone-100 truncate">{log.itemName}</p>
                <p className="text-xs text-stone-500 capitalize">{log.mealType}</p>
              </div>
            </div>
            <div className="text-right text-xs text-stone-400 tabular-nums">
              <div>{calories !== undefined ? `${Math.round(calories)} cal` : '—'}</div>
              <div>
                {protein !== undefined ? `${protein.toFixed(1)}p` : '—'} ·{' '}
                {fat !== undefined ? `${fat.toFixed(1)}f` : '—'} ·{' '}
                {sugar !== undefined ? `${sugar.toFixed(1)}s` : '—'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Nutrition;

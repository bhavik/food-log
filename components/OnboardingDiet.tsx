import React from 'react';
import type { DietPlanId } from '../dietPlans';
import { DIET_PLANS } from '../dietPlans';
import { LeafIcon, ChevronRightIcon, CheckIcon, UtensilsCrossedIcon, BarChart3Icon, HeartIcon } from 'lucide-react';

const DIET_ORDER: DietPlanId[] = [
  'gujarati-low-sugar-fat',
  'mediterranean',
  'indian-vegetarian',
  'indian-vegan',
];

/** Accent via left border + icon ring only; card stays neutral dark for better contrast */
const DIET_ACCENT: Record<DietPlanId, { borderLeft: string; iconRing: string; icon: string; label: string }> = {
  'gujarati-low-sugar-fat': {
    borderLeft: 'border-l-amber-400',
    iconRing: 'ring-amber-500/30',
    icon: '🫓',
    label: 'Low sugar & fat',
  },
  mediterranean: {
    borderLeft: 'border-l-sky-400',
    iconRing: 'ring-sky-500/30',
    icon: '🥙',
    label: 'Heart-healthy',
  },
  'indian-vegetarian': {
    borderLeft: 'border-l-emerald-400',
    iconRing: 'ring-emerald-500/30',
    icon: '🍛',
    label: 'Classic & varied',
  },
  'indian-vegan': {
    borderLeft: 'border-l-violet-400',
    iconRing: 'ring-violet-500/30',
    icon: '🌱',
    label: '100% plant-based',
  },
};

const GETTING_STARTED_STEPS = [
  { icon: UtensilsCrossedIcon, text: 'Pick a diet plan to get started. Don\'t worry—you can add and remove items whenever you want.', color: 'text-amber-400' },
  { icon: LeafIcon, text: 'Start tracking the food you eat.', color: 'text-emerald-400' },
  { icon: BarChart3Icon, text: 'Monitor your nutrition.', color: 'text-sky-400' },
  { icon: HeartIcon, text: 'Get healthy!', color: 'text-rose-400' },
];

interface OnboardingDietProps {
  onSelect: (dietPlanId: DietPlanId) => void;
  onBack?: () => void;
}

const OnboardingDiet: React.FC<OnboardingDietProps> = ({ onSelect, onBack }) => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-950 text-stone-200">
      {/* Hero */}
      <div className="relative overflow-hidden px-6 pt-10 pb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-md mx-auto">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-300 transition-smooth mb-6"
            >
              ← Back
            </button>
          )}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/20">
              <LeafIcon size={26} strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-stone-100 tracking-tight">
                Choose your diet plan
              </h1>
              <p className="text-sm text-stone-500 mt-0.5">
                Start with a set of foods that match how you eat. You can add your own anytime.
              </p>
            </div>
          </div>

          {/* Getting started steps */}
          <div className="rounded-2xl border border-white/[0.06] bg-stone-900/60 p-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">How it works</p>
            {GETTING_STARTED_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-800 ${step.color}`}>
                    <Icon size={16} strokeWidth={2} />
                  </div>
                  <p className="text-sm text-stone-400 leading-snug pt-0.5">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Diet cards */}
      <div className="flex-1 px-6 pb-12 space-y-4 max-w-md mx-auto w-full">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 px-0.5 mb-1">Pick a plan</p>
        {DIET_ORDER.map((id) => {
          const plan = DIET_PLANS[id];
          const accent = DIET_ACCENT[id];
          const itemCount = plan.categories.reduce((acc, c) => acc + c.items.length, 0);
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              className={`w-full text-left rounded-2xl border border-white/[0.06] border-l-4 bg-stone-800/50 hover:bg-stone-700/50 p-5 transition-all duration-200 ${accent.borderLeft} active:scale-[0.99]`}
            >
              <div className="flex gap-4">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-stone-800 text-2xl ring-2 ${accent.iconRing}`}>
                  {accent.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-stone-100 text-base">{plan.name}</p>
                      <p className="text-xs text-stone-500 mt-0.5">{accent.label} · {itemCount} items</p>
                    </div>
                    <ChevronRightIcon size={20} className="text-stone-500 shrink-0 mt-0.5" />
                  </div>
                  <p className="text-sm text-stone-400 mt-3 leading-snug">
                    {plan.description}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {plan.benefits.slice(0, 3).map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-stone-500">
                        <CheckIcon size={14} className="text-emerald-500/80 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OnboardingDiet;

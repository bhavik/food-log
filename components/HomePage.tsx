import React from 'react';
import {
  LeafIcon,
  UtensilsCrossedIcon,
  PieChartIcon,
  TrendingUpIcon,
  ChevronRightIcon,
  CheckIcon,
} from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
  isSignedIn: boolean;
}

const FEATURES = [
  {
    icon: UtensilsCrossedIcon,
    title: 'Diet plans that fit you',
    description: 'Start with Gujarati low-sugar, Mediterranean, Indian vegetarian, or vegan. Add and remove items anytime.',
    color: 'text-amber-400',
    ring: 'ring-amber-500/20',
  },
  {
    icon: LeafIcon,
    title: 'Log food in seconds',
    description: 'Tap to log breakfast, lunch, dinner, and snacks. Your history stays in one place.',
    color: 'text-emerald-400',
    ring: 'ring-emerald-500/20',
  },
  {
    icon: PieChartIcon,
    title: 'Nutrition at a glance',
    description: 'See daily calories, protein, fat, and sugar. Spot missing data and keep goals in mind.',
    color: 'text-sky-400',
    ring: 'ring-sky-500/20',
  },
  {
    icon: TrendingUpIcon,
    title: '7-day trends',
    description: 'Bar charts show how your nutrition changes over the week so you can adjust habits.',
    color: 'text-violet-400',
    ring: 'ring-violet-500/20',
  },
];

const HomePage: React.FC<HomePageProps> = ({ onGetStarted, onSignIn, isSignedIn }) => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-950 text-stone-200">
      {/* Subtle background gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col">
        {/* Header */}
        <header className="px-6 pt-8 pb-4 max-w-3xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/20">
                <LeafIcon size={22} strokeWidth={2} />
              </div>
              <span className="text-xl font-semibold text-stone-100 tracking-tight">
                Food<span className="text-emerald-400">Log</span>
              </span>
            </div>
            {!isSignedIn && (
              <button
                type="button"
                onClick={onSignIn}
                className="text-sm font-medium text-stone-400 hover:text-stone-200 transition-smooth"
              >
                Sign in
              </button>
            )}
          </div>
        </header>

        {/* Hero */}
        <section className="px-6 pt-12 pb-16 max-w-3xl mx-auto w-full text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-100 tracking-tight leading-tight">
            Track meals.
            <br />
            <span className="text-emerald-400">Monitor nutrition.</span> Get healthy.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-stone-500 max-w-xl mx-auto leading-relaxed">
            Choose a diet plan, log what you eat, and see your nutrition over time—simple and private.
          </p>
          <button
            type="button"
            onClick={onGetStarted}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold text-base shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Get started
            <ChevronRightIcon size={20} strokeWidth={2.5} />
          </button>
        </section>

        {/* Features */}
        <section className="px-6 pb-20 max-w-3xl mx-auto w-full">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500 mb-6 text-center">
            What you can do
          </h2>
          <div className="grid gap-5 sm:gap-6">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="flex gap-4 p-5 rounded-2xl border border-white/[0.06] bg-stone-900/40 hover:bg-stone-800/50 transition-smooth"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-800 ring-2 ${feature.ring} ${feature.color}`}
                  >
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-stone-100 text-base">{feature.title}</h3>
                    <p className="mt-1 text-sm text-stone-500 leading-snug">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-6 pb-16 max-w-3xl mx-auto w-full">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
            <p className="text-sm font-medium text-stone-300">
              Pick a diet plan, then start logging. No commitment—you’re in control.
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-stone-500">
              <li className="flex items-center gap-1.5">
                <CheckIcon size={14} className="text-emerald-500 shrink-0" />
                Add & remove items anytime
              </li>
              <li className="flex items-center gap-1.5">
                <CheckIcon size={14} className="text-emerald-500 shrink-0" />
                Sign in to sync across devices
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;

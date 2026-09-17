import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Sparkline } from './Sparkline';
import clsx from 'clsx';

export default function StatCard({ title, value, suffix = '', previous, change, trend, accent = 'slate' }) {
  const positive = change > 0;
  const negative = change < 0;
  const neutral = change === 0;
  const accentClasses = {
    slate: 'border-slate-200 dark:border-slate-800',
    emerald: 'border-emerald-200 dark:border-emerald-900/60',
    sky: 'border-sky-200 dark:border-sky-900/60',
    amber: 'border-amber-200 dark:border-amber-900/60',
    rose: 'border-rose-200 dark:border-rose-900/60',
    violet: 'border-violet-200 dark:border-violet-900/60',
  };

  return (
    <div className={clsx('bg-white dark:bg-slate-900 rounded-lg border p-5', accentClasses[accent])}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{title}</p>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-slate-900 dark:text-slate-100 tabular-nums">{value}</span>
            {suffix && <span className="text-lg text-slate-500 dark:text-slate-400 tabular-nums">{suffix}</span>}
          </div>
        </div>
        {trend && trend.length > 0 && (
          <div className="w-24 h-10"><Sparkline data={trend} positive={previous === undefined ? positive : (positive ? true : value < (suffix.includes('%') ? 100 : Infinity))} /></div>
        )}
      </div>
      {change !== undefined && (
        <div className="mt-3 flex items-center gap-2">
          <span className={clsx(
            'inline-flex items-center gap-0.5 text-xs font-medium rounded-md px-1.5 py-0.5',
            positive && 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40',
            negative && 'text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/40',
            neutral && 'text-slate-600 bg-slate-100 dark:text-slate-400 dark:bg-slate-800'
          )}>
            {positive && <TrendingUp className="w-3 h-3" />}
            {negative && <TrendingDown className="w-3 h-3" />}
            {neutral && <Minus className="w-3 h-3" />}
            {change > 0 ? '+' : ''}{change}%
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">vs. previous period</span>
        </div>
      )}
    </div>
  );
}

import clsx from 'clsx';

const variants = {
  solid: {
    base: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
    emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 ring-1 ring-emerald-200/60 dark:ring-emerald-900/60',
    sky: 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400 ring-1 ring-sky-200/60 dark:ring-sky-900/60',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 ring-1 ring-amber-200/60 dark:ring-amber-900/60',
    rose: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 ring-1 ring-rose-200/60 dark:ring-rose-900/60',
    violet: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 ring-1 ring-violet-200/60 dark:ring-violet-900/60',
    slate: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
    indigo: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 ring-1 ring-indigo-200/60 dark:ring-indigo-900/60',
  },
  outline: {
    base: 'bg-transparent text-slate-600 dark:text-slate-300 ring-1 ring-slate-200 dark:ring-slate-700',
    emerald: 'bg-transparent text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-800',
    sky: 'bg-transparent text-sky-700 dark:text-sky-400 ring-1 ring-sky-200 dark:ring-sky-800',
    amber: 'bg-transparent text-amber-700 dark:text-amber-400 ring-1 ring-amber-200 dark:ring-amber-800',
    rose: 'bg-transparent text-rose-700 dark:text-rose-400 ring-1 ring-rose-200 dark:ring-rose-800',
    violet: 'bg-transparent text-violet-700 dark:text-violet-400 ring-1 ring-violet-200 dark:ring-violet-800',
  },
};

const sizes = {
  xs: 'px-2 py-0.5 text-[10px]',
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

const statusVariantMap = {
  Open: 'rose',
  'In Progress': 'amber',
  Pending: 'violet',
  Resolved: 'emerald',
};

const priorityVariantMap = {
  Low: 'slate',
  Medium: 'sky',
  High: 'amber',
  Urgent: 'rose',
};

export default function Badge({
  children,
  variant = 'solid',
  color = 'base',
  size = 'sm',
  status,
  priority,
  dot,
  className,
}) {
  let finalColor = color;
  if (status && statusVariantMap[status]) finalColor = statusVariantMap[status];
  if (priority && priorityVariantMap[priority]) finalColor = priorityVariantMap[priority];
  const dotColorMap = {
    base: 'bg-slate-400',
    emerald: 'bg-emerald-500',
    sky: 'bg-sky-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    violet: 'bg-violet-500',
    indigo: 'bg-indigo-500',
    slate: 'bg-slate-400',
  };
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-md font-medium whitespace-nowrap',
        variants[variant]?.[finalColor] || variants.solid.base,
        sizes[size],
        className
      )}
    >
      {dot && <span className={clsx('w-1.5 h-1.5 rounded-full', dotColorMap[finalColor])} />}
      {children}
    </span>
  );
}

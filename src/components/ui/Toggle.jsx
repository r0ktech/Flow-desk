import { forwardRef } from 'react';
import clsx from 'clsx';

const Toggle = forwardRef(function Toggle({ checked, onChange, label, description, disabled, size = 'md', className }, ref) {
  const sizes = {
    sm: checked
      ? 'w-8 h-4 [&>span]:w-3 [&>span]:h-3 checked:[&>span]:translate-x-4'
      : 'w-8 h-4 [&>span]:w-3 [&>span]:h-3 [&>span]:translate-x-0.5',
    md: checked
      ? 'w-11 h-6 [&>span]:w-5 [&>span]:h-5 checked:[&>span]:translate-x-5'
      : 'w-11 h-6 [&>span]:w-5 [&>span]:h-5 [&>span]:translate-x-0.5',
  };
  return (
    <label className={clsx('inline-flex items-start gap-3 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed', className)}>
      <button
        type="button"
        role="switch"
        ref={ref}
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange && onChange(!checked)}
        className={clsx(
          'relative inline-flex flex-shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-indigo-500',
          checked ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700',
          size === 'sm' ? 'w-8 h-4' : 'w-11 h-6'
        )}
      >
        <span
          className={clsx(
            'absolute top-0.5 rounded-full bg-white shadow transition-transform duration-200',
            size === 'sm' ? 'w-3 h-3' : 'w-5 h-5',
            checked ? (size === 'sm' ? 'translate-x-4' : 'translate-x-5') : 'translate-x-0.5'
          )}
        />
      </button>
      {(label || description) && (
        <div className="pt-0.5">
          {label && (
            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{label}</div>
          )}
          {description && (
            <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{description}</div>
          )}
        </div>
      )}
    </label>
  );
});

export default Toggle;

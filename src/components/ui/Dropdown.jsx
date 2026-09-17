import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export default function Dropdown({
  trigger, items = [], children, align = 'left', className, menuClassName }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onEscape = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEscape);
    };
  }, [open]);

  const renderItem = (item, i) => {
    if (item.separator) {
      return <div key={`sep-${i}`} className="my-1 h-px bg-slate-100 dark:bg-slate-800" />;
    }
    if (item.type === 'label') {
      return <div key={`label-${i}`} className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{item.label}</div>;
    }
    return (
      <button
        key={item.key || i}
        disabled={item.disabled}
        onClick={() => {
          if (!item.disabled) {
            setOpen(false);
            item.onClick && item.onClick();
          }
        }}
        className={clsx(
          'w-full flex items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors',
          'hover:bg-slate-50 dark:hover:bg-slate-800',
          item.danger && 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40',
          item.disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        {item.icon && <span className="flex-shrink-0 text-slate-500 dark:text-slate-400">{item.icon}</span>}
        <span className="flex-1">{item.label}</span>
        {item.shortcut && (
          <span className="text-xs text-slate-400 dark:text-slate-500">{item.shortcut}</span>
        )}
      </button>
    );
  };

  return (
    <div ref={ref} className={clsx('relative inline-block', className)}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className={clsx(
              'absolute z-50 mt-1.5 min-w-[200px] rounded-md border bg-white dark:bg-slate-900 shadow-lg ring-1 ring-black/5 dark:ring-white/5 py-1 animate-fade-in',
              align === 'right' ? 'right-0' : 'left-0',
              align === 'end' ? 'end-0' : '',
              menuClassName
            )}
          >
            {items.map(renderItem)}
            {children}
          </div>
        </>
      )}
    </div>
  );
}

Dropdown.Separator = function Separator() {
  return <div className="my-1 h-px bg-slate-100 dark:bg-slate-800" />;
};

Dropdown.Label = function Label({ children }) {
  return <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{children}</div>;
};

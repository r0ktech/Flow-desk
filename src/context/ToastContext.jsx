import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';
import clsx from 'clsx';

const ToastContext = createContext(null);

const variants = {
  success: { icon: CheckCircle2, iconClass: 'text-emerald-600 dark:text-emerald-400', bgClass: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900' },
  error: { icon: XCircle, iconClass: 'text-rose-600 dark:text-rose-400', bgClass: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900' },
  warning: { icon: AlertCircle, iconClass: 'text-amber-600 dark:text-amber-400', bgClass: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900' },
  info: { icon: Info, iconClass: 'text-sky-600 dark:text-sky-400', bgClass: 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900' },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const removeToast = useCallback((id) => {
    const t = timers.current.get(id);
    if (t) {
      clearTimeout(t);
      timers.current.delete(id);
    }
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message, options = {}) => {
    const id = Math.random().toString(36).slice(2);
    const { variant = 'info', duration = 4000 } = options;
    setToasts((prev) => [...prev, { id, message, variant }]);
    if (duration > 0) {
      const timer = setTimeout(() => removeToast(id), duration);
      timers.current.set(id, timer);
    }
    return id;
  }, [removeToast]);

  const toast = {
    success: (msg, opts) => showToast(msg, { ...opts, variant: 'success' }),
    error: (msg, opts) => showToast(msg, { ...opts, variant: 'error' }),
    warning: (msg, opts) => showToast(msg, { ...opts, variant: 'warning' }),
    info: (msg, opts) => showToast(msg, { ...opts, variant: 'info' }),
    dismiss: removeToast,
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
        {toasts.map((t) => {
          const v = variants[t.variant];
          const Icon = v.icon;
          return (
            <div
              key={t.id}
              className={clsx(
                'pointer-events-auto animate-slide-up shadow-lg border rounded-lg p-4 flex items-start gap-3',
                v.bgClass
              )}
              role="status"
            >
              <Icon className={clsx('w-5 h-5 mt-0.5 flex-shrink-0', v.iconClass)} />
              <p className="text-sm text-slate-900 dark:text-slate-100 flex-1">{t.message}</p>
              <button
                onClick={() => removeToast(t.id)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex-shrink-0 -m-1 p-1 rounded"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

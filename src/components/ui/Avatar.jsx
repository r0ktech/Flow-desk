import clsx from 'clsx';
import { getAvatarColor, getInitials } from '../../utils/format';

export default function Avatar({ name, seed, size = 'md', src, className, status }) {
  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
    xl: 'w-14 h-14 text-lg',
    '2xl': 'w-20 h-20 text-2xl',
  };
  const statusSizeClasses = {
    xs: 'w-2 h-2 border-2',
    sm: 'w-2.5 h-2.5 border-2',
    md: 'w-3 h-3 border-2',
    lg: 'w-3.5 h-3.5 border-2',
    xl: 'w-4 h-4 border-2',
    '2xl': 'w-5 h-5 border-4',
  };
  const statusColors = {
    online: 'bg-emerald-500',
    busy: 'bg-amber-500',
    away: 'bg-orange-500',
    offline: 'bg-slate-400 dark:bg-slate-500',
  };
  const colorClass = getAvatarColor(seed || name || 'anon');
  const initials = getInitials(name || seed || '?');

  return (
    <div className={clsx('relative inline-flex flex-shrink-0', className)}>
      <div
        className={clsx(
          'inline-flex items-center justify-center rounded-md font-medium ring-1 ring-white dark:ring-slate-900',
          sizeClasses[size],
          colorClass
        )}
      >
        {src ? (
          <img src={src} alt={name} className="w-full h-full rounded-md object-cover" />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {status && (
        <span
          className={clsx(
            'absolute bottom-0 right-0 rounded-full border-white dark:border-slate-900',
            statusSizeClasses[size],
            statusColors[status]
          )}
        />
      )}
    </div>
  );
}

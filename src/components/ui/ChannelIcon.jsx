import { Mail, MessageCircle, Phone, Twitter } from 'lucide-react';
import clsx from 'clsx';

export default function ChannelIcon({ channel, size = 'sm', className }) {
  const sizeClass = size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5';
  const icons = {
    email: { icon: Mail, bg: 'bg-sky-50 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400' },
    chat: { icon: MessageCircle, bg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' },
    phone: { icon: Phone, bg: 'bg-violet-50 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400' },
    twitter: { icon: Twitter, bg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' },
  };
  const c = icons[channel] || icons.email;
  const Icon = c.icon;
  return (
    <span className={clsx('inline-flex items-center justify-center rounded-md p-1', c.bg, className)}>
      <Icon className={sizeClass} />
    </span>
  );
}

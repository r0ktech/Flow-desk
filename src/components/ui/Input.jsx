import { forwardRef } from 'react';
import clsx from 'clsx';

const Input = forwardRef(function Input(
  { value, onChange, placeholder, type = 'text', icon, rightIcon, disabled, size = 'md', className, ...props },
  ref
) {
  const sizeClasses = {
    sm: 'h-8 pl-8 pr-3 text-xs',
    md: 'h-9 pl-9 pr-3 text-sm',
    lg: 'h-10 pl-10 pr-3 text-sm',
  };
  return (
    <div className={clsx('relative w-full', className)}>
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400 dark:text-slate-500 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          'w-full rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors',
          icon ? sizeClasses[size] : `h-9 px-3 text-sm`,
          rightIcon && 'pr-9',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        {...props}
      />
      {rightIcon && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 dark:text-slate-500 pointer-events-none">
          {rightIcon}
        </div>
      )}
    </div>
  );
});

export default Input;

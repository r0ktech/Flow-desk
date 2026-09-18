import { forwardRef } from "react";
import clsx from "clsx";

const variants = {
  primary:
    "bg-[#153f35] text-white hover:bg-[#1d594a] dark:bg-[#d9f5e9] dark:text-[#153f35] dark:hover:bg-white focus-visible:outline-[#153f35]",
  secondary:
    "bg-white text-[#17201e] ring-1 ring-[#d7e0da] hover:bg-[#f2f6f3] dark:bg-[#18201e] dark:text-[#f3f5f2] dark:ring-[#34413b] dark:hover:bg-[#202c27]",
  ghost:
    "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
  outline:
    "text-slate-700 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-800",
  danger: "bg-rose-600 text-white hover:bg-rose-500",
  dangerGhost:
    "text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40",
};

const sizes = {
  xs: "h-7 px-2.5 text-xs gap-1",
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-9 px-3.5 text-sm gap-2",
  lg: "h-10 px-4 text-sm gap-2",
};

const Button = forwardRef(function Button(
  {
    children,
    variant = "secondary",
    size = "md",
    icon,
    rightIcon,
    fullWidth,
    disabled,
    className,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={clsx(
        "inline-flex items-center justify-center rounded-[6px] font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#2c9b7a]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
});

export default Button;

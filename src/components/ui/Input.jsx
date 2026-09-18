import { forwardRef } from "react";
import clsx from "clsx";

const Input = forwardRef(function Input(
  {
    value,
    onChange,
    placeholder,
    type = "text",
    icon,
    rightIcon,
    disabled,
    size = "md",
    className,
    ...props
  },
  ref,
) {
  const sizeClasses = {
    sm: "h-8 pl-8 pr-3 text-xs",
    md: "h-9 pl-9 pr-3 text-sm",
    lg: "h-10 pl-10 pr-3 text-sm",
  };
  return (
    <div className={clsx("relative w-full", className)}>
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
          "w-full rounded-[6px] bg-white dark:bg-[#18201e] border border-[#d7e0da] dark:border-[#34413b] text-[#17201e] dark:text-[#f3f5f2] placeholder-[#8a9791] dark:placeholder-[#708079]",
          "focus:outline-none focus:ring-2 focus:ring-[#2c9b7a] focus:border-transparent transition-colors",
          icon ? sizeClasses[size] : `h-9 px-3 text-sm`,
          rightIcon && "pr-9",
          disabled && "opacity-50 cursor-not-allowed",
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

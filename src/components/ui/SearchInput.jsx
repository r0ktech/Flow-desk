import { Search, X } from "lucide-react";
import clsx from "clsx";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  size = "md",
  className,
  iconClassName,
  onClear,
  disabled,
}) {
  const sizes = {
    sm: "h-8 pl-8 pr-7 text-xs",
    md: "h-9 pl-9 pr-8 text-sm",
    lg: "h-10 pl-10 pr-9 text-sm",
  };
  return (
    <div className={clsx("relative w-full", className)}>
      <div
        className={clsx(
          "absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400 dark:text-slate-500 pointer-events-none",
          iconClassName,
        )}
      >
        <Search className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          "w-full rounded-[6px] bg-white dark:bg-[#18201e] border border-[#d7e0da] dark:border-[#34413b] text-[#17201e] dark:text-[#f3f5f2] placeholder-[#8a9791] dark:placeholder-[#708079]",
          "focus:outline-none focus:ring-2 focus:ring-[#2c9b7a] focus:border-transparent",
          "transition-colors",
          sizes[size],
          disabled && "opacity-50 cursor-not-allowed",
        )}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={() => onClear("")}
          className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        >
          <X className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />
        </button>
      )}
    </div>
  );
}

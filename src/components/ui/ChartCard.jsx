import clsx from "clsx";

export default function ChartCard({
  title,
  subtitle,
  description,
  actions,
  children,
  className,
}) {
  return (
    <div
      className={clsx(
        "bg-white/90 dark:bg-[#18201e] rounded-[7px] border border-[#dfe5e0] dark:border-[#2a3732] overflow-hidden shadow-[0_1px_2px_rgba(23,32,30,0.03)]",
        className,
      )}
    >
      <div className="flex items-start justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

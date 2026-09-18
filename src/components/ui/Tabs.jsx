import clsx from "clsx";

export default function Tabs({ tabs, active, onChange, className }) {
  return (
    <div
      className={clsx(
        "inline-flex rounded-[6px] bg-[#edf1ee] dark:bg-[#202b27] p-0.5",
        className,
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={clsx(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] text-xs font-medium transition-colors",
            active === tab.value
              ? "bg-white dark:bg-[#18201e] text-[#153f35] dark:text-[#d9f5e9] shadow-sm ring-1 ring-[#d7e0da] dark:ring-[#34413b]"
              : "text-[#6b7973] dark:text-[#93a29d] hover:text-[#17201e] dark:hover:text-[#f3f5f2]",
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

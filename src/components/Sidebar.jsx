import { NavLink, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Inbox,
  Ticket,
  Users,
  BarChart3,
  UserCog,
  HelpCircle,
  Settings,
  ChevronRight,
  Menu,
  X,
  Workflow,
} from "lucide-react";
import clsx from "clsx";
import Avatar from "./ui/Avatar";
import Dropdown from "./ui/Dropdown";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Overview", end: true },
  { to: "/inbox", icon: Inbox, label: "Inbox", badge: 8 },
  { to: "/tickets", icon: Ticket, label: "Tickets" },
  { to: "/customers", icon: Users, label: "Customers" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/team", icon: UserCog, label: "Team" },
];

export default function Sidebar({ open, setOpen, mobile }) {
  const location = useLocation();

  const navContent = (
    <>
      <div className="flex items-center gap-2.5 h-16 px-4 border-b border-[#dfe5e0] dark:border-[#26312e]">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-md bg-[#153f35] text-[#d9f5e9] flex items-center justify-center shadow-[0_3px_0_#9dcabb]">
            <Workflow className="w-4.5 h-4.5" />
          </div>
          <div>
            <div className="display-font text-[15px] font-semibold tracking-[-0.02em] text-[#17201e] dark:text-[#f3f5f2] leading-none">
              Flowdesk
            </div>
            <div className="text-[11px] text-[#74817c] dark:text-[#93a29d] mt-1">
              Support operations
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        <div className="px-2 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a9791] dark:text-[#708079]">
          Workspace
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.end
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => mobile && setOpen(false)}
              className={clsx(
                "group flex items-center gap-2.5 px-2.5 py-2 rounded-[6px] text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#e4f0eb] text-[#153f35] dark:bg-[#19372f] dark:text-[#d9f5e9]"
                  : "text-[#6b7973] hover:bg-[#eef2ef] hover:text-[#17201e] dark:text-[#93a29d] dark:hover:bg-[#1a2421] dark:hover:text-[#f3f5f2]",
              )}
            >
              <Icon
                className={clsx(
                  "w-4 h-4 flex-shrink-0",
                  isActive
                    ? "text-[#1d725d]"
                    : "text-[#9aa6a0] group-hover:text-[#53645c] dark:group-hover:text-[#c1cdc7]",
                )}
              />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="inline-flex items-center justify-center rounded-full bg-[#cce8df] text-[#1d725d] dark:bg-[#24564a] dark:text-[#d9f5e9] min-w-[18px] h-[18px] px-1 text-[10px] font-semibold">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-2 py-3 border-t border-[#dfe5e0] dark:border-[#26312e] space-y-0.5">
        <NavLink
          to="/help"
          onClick={() => mobile && setOpen(false)}
          className="group flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <HelpCircle className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
          <span className="flex-1">Help</span>
        </NavLink>
        <NavLink
          to="/settings"
          onClick={() => mobile && setOpen(false)}
          className="group flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <Settings className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
          <span className="flex-1">Settings</span>
        </NavLink>
        <div className="mt-1.5 px-1">
          <Dropdown
            align="left"
            menuClassName="min-w-[240px]"
            trigger={
              <button className="w-full flex items-center gap-2.5 px-1.5 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <Avatar
                  name="Alex Chen"
                  seed="alex"
                  size="sm"
                  status="online"
                />
                <div className="flex-1 text-left min-w-0">
                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                    Alex Chen
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    alex@flowdesk.co
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            }
            items={[
              { label: "View profile", onClick: () => {} },
              { label: "Account settings", onClick: () => {} },
              { separator: true },
              { label: "Help center", onClick: () => {} },
              { label: "Keyboard shortcuts", onClick: () => {} },
              { separator: true },
              { label: "Sign out", danger: true, onClick: () => {} },
            ]}
          />
        </div>
      </div>
    </>
  );

  return (
    <>
      {mobile && (
        <>
          <div className="flex items-center justify-between h-14 px-4 border-b border-slate-200 dark:border-slate-800 lg:hidden">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-[#153f35] text-[#d9f5e9] flex items-center justify-center shadow-[0_3px_0_#9dcabb]">
                <Workflow className="w-4.5 h-4.5" />
              </div>
              <div className="display-font text-[15px] font-semibold text-[#17201e] dark:text-[#f3f5f2]">
                Flowdesk
              </div>
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          {open && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <div
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
                onClick={() => setOpen(false)}
              />
              <aside className="relative w-72 max-w-[85%] h-full bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col animate-slide-in">
                <div className="absolute top-4 right-4 z-10 lg:hidden">
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {navContent}
              </aside>
            </div>
          )}
        </>
      )}
      {!mobile && (
        <aside className="hidden lg:flex h-full w-64 xl:w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 flex-shrink-0">
          {navContent}
        </aside>
      )}
    </>
  );
}

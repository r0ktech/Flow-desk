import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  ChevronDown,
  Building2,
  CheckCircle,
  Command,
  X,
  Inbox,
  Ticket,
  Users,
} from 'lucide-react';
import clsx from 'clsx';
import Avatar from './ui/Avatar';
import Dropdown from './ui/Dropdown';
import Badge from './ui/Badge';
import { useAppState } from '../context/AppStateContext';
import { formatRelative } from '../utils/format';

const workspaces = [
  { id: 'w1', name: 'Flowdesk Support', domain: 'flowdesk.flowdesk.co', current: true },
  { id: 'w2', name: 'Acme Inc', domain: 'acme.flowdesk.co', current: false },
  { id: 'w3', name: 'Test Workspace', domain: 'test.flowdesk.co', current: false },
];

function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { tickets, customers, conversations } = useAppState();

  if (!open) return null;

  const filteredTickets = query
    ? tickets.filter((t) => `${t.id} ${t.subject} ${t.customer}`.toLowerCase().includes(query.toLowerCase())).slice(0, 4)
    : [];
  const filteredCustomers = query
    ? customers.filter((c) => `${c.name} ${c.email} ${c.company}`.toLowerCase().includes(query.toLowerCase())).slice(0, 4)
    : [];
  const filteredConvos = query
    ? conversations.filter((c) => `${c.customer} ${c.preview}`.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
    : [];

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative min-h-screen flex items-start justify-center pt-[10vh] p-4">
        <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl ring-1 ring-black/5 dark:ring-white/5 animate-slide-up overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-2.5 px-4 h-14 border-b border-slate-200 dark:border-slate-800">
            <Search className="w-4.5 h-4.5 text-slate-400 flex-shrink-0" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tickets, customers, conversations..."
              className="flex-1 bg-transparent border-0 outline-none text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400"
            />
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] rounded bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
              <Command className="w-3 h-3" /> K
            </kbd>
            <button onClick={onClose} className="sm:hidden p-1 -mr-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="max-h-[60vh] overflow-y-auto scrollbar-thin p-2">
            {!query ? (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Type to search across all your data</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 max-w-md mx-auto">
                  {[
                    { label: 'Tickets', icon: Ticket, desc: '142 entries' },
                    { label: 'Customers', icon: Users, desc: '184 companies' },
                    { label: 'Inbox', icon: Inbox, desc: '32 open' },
                    { label: 'Help docs', icon: CheckCircle, desc: 'Search help' },
                  ].map((i) => {
                    const Icon = i.icon;
                    return (
                      <div key={i.label} className="rounded-lg border border-slate-200 dark:border-slate-800 p-3 text-left">
                        <Icon className="w-4 h-4 text-slate-400 mb-1.5" />
                        <div className="text-xs font-medium text-slate-900 dark:text-slate-100">{i.label}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{i.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <>
                {filteredTickets.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Tickets</div>
                    {filteredTickets.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => { navigate(`/tickets?t=${t.id}`); onClose(); }}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 flex items-start gap-3"
                      >
                        <Ticket className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-mono font-medium text-indigo-600 dark:text-indigo-400">{t.id}</span>
                            <Badge status={t.status} size="xs" />
                          </div>
                          <div className="mt-0.5 text-sm text-slate-900 dark:text-slate-100 truncate">{t.subject}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {filteredCustomers.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Customers</div>
                    {filteredCustomers.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => { navigate(`/customers?c=${c.id}`); onClose(); }}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3"
                      >
                        <Avatar name={c.name} seed={c.avatarSeed} size="sm" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{c.name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{c.company}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {filteredConvos.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Conversations</div>
                    {filteredConvos.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => { navigate(`/inbox?c=${c.id}`); onClose(); }}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{c.customer}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{c.preview}</div>
                      </button>
                    ))}
                  </div>
                )}
                {filteredTickets.length === 0 && filteredCustomers.length === 0 && filteredConvos.length === 0 && (
                  <div className="px-4 py-10 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400">No results for <span className="font-medium text-slate-700 dark:text-slate-300">"{query}"</span></p>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">↑↓</kbd> Navigate</span>
              <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">↵</kbd> Select</span>
              <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Esc</kbd> Close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Topbar({ pageTitle, pageDescription }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { notifications, dismissNotification, markAllNotificationsRead } = useAppState();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const workspaceSwitcher = (
    <Dropdown
      menuClassName="min-w-[280px]"
      trigger={
        <button className="group inline-flex items-center gap-2 h-9 pl-2.5 pr-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 max-w-[260px]">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center flex-shrink-0">
            <Building2 className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0 text-left">
            <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">Flowdesk Support</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate hidden sm:block">flowdesk.flowdesk.co</div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 flex-shrink-0" />
        </button>
      }
      items={[
        { type: 'label', label: 'Workspaces' },
        ...workspaces.map((w) => ({
          label: w.name,
          onClick: () => {},
          icon: w.current ? <CheckCircle className="w-4 h-4 text-indigo-500" /> : <Building2 className="w-4 h-4" />,
          rightIcon: w.current,
          shortcut: w.domain,
        })),
        { separator: true },
        { label: 'Create new workspace', onClick: () => {} },
        { label: 'Workspace settings', onClick: () => {} },
      ]}
    />
  );

  return (
    <>
      <header className="sticky top-0 z-30 h-14 bg-white dark:bg-slate-950/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
        <div className="h-full px-4 lg:px-6 flex items-center gap-3 md:gap-4">
          <div className="hidden lg:block flex-shrink-0">{workspaceSwitcher}</div>
          <div className="lg:hidden flex-shrink-0">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="hidden md:block flex-1 max-w-xl">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full h-9 px-3 flex items-center gap-2.5 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-white hover:border-slate-300 dark:hover:bg-slate-800/60 dark:hover:border-slate-700 transition-colors group"
            >
              <Search className="w-4 h-4 text-slate-400 group-hover:text-slate-500" />
              <span className="text-sm text-slate-500 dark:text-slate-400 flex-1 text-left">Search tickets, customers, conversations...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] rounded bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                <Command className="w-3 h-3" />K
              </kbd>
            </button>
          </div>
          <div className="md:hidden flex-1">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full h-9 px-3 flex items-center gap-2.5 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              aria-label="Open search"
            >
              <Search className="w-4 h-4 text-slate-400" />
            </button>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <Dropdown
              align="right"
              menuClassName="min-w-[360px] max-h-[80vh]"
              trigger={
                <button className="relative h-9 w-9 flex items-center justify-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors" aria-label="Notifications">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className={clsx(
                      'absolute top-1.5 right-1.5 min-w-[16px] h-4 rounded-full px-1 text-[10px] font-semibold flex items-center justify-center ring-2 ring-white dark:ring-slate-950',
                      unreadCount > 2 ? 'bg-rose-500 text-white' : 'bg-indigo-500 text-white'
                    )}>
                      {unreadCount}
                    </span>
                  )}
                </button>
              }
              items={[]}
            >
              <div className="px-3 py-2.5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Notifications</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{unreadCount} unread</p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-[60vh] overflow-y-auto scrollbar-thin py-1">
                {notifications.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => dismissNotification(n.id)}
                    className={clsx(
                      'w-full text-left px-3 py-3 flex items-start gap-3 border-b border-slate-50 dark:border-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors',
                      !n.read && 'bg-indigo-50/50 dark:bg-indigo-950/20'
                    )}
                  >
                    <div className={clsx(
                      'w-2 h-2 mt-2 rounded-full flex-shrink-0',
                      n.read ? 'bg-transparent' : 'bg-indigo-500'
                    )} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-slate-900 dark:text-slate-100">{n.title}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{n.description}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">{formatRelative(n.time)}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="px-3 py-2.5 border-t border-slate-100 dark:border-slate-800">
                <button className="w-full text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 text-center py-1">
                  View all notifications
                </button>
              </div>
            </Dropdown>
            <Dropdown
              align="right"
              menuClassName="min-w-[200px]"
              trigger={
                <button className="h-9 px-1.5 flex items-center gap-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Avatar name="Alex Chen" seed="alex" size="sm" />
                </button>
              }
              items={[
                {
                  type: 'custom',
                  label: '',
                },
                { label: 'Profile', onClick: () => {} },
                { label: 'Settings', onClick: () => window.location = '/settings' },
                { separator: true },
                { label: 'Help center', onClick: () => {} },
                { label: 'Keyboard shortcuts', onClick: () => {} },
                { separator: true },
                { label: 'Sign out', danger: true, onClick: () => {} },
              ]}
            >
              <div className="px-3 py-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Avatar name="Alex Chen" seed="alex" size="md" />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">Alex Chen</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate">alex@flowdesk.co</div>
                  </div>
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
      </header>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

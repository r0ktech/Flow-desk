import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Inbox,
  UserRound,
  AlertCircle,
  Clock4,
  CheckCircle2,
  Send,
  Paperclip,
  Smile,
  StickyNote,
  MoreHorizontal,
  X,
  ChevronDown,
  UserCheck,
  Flag,
  CalendarClock,
  ArrowLeft,
  XCircle,
  ChevronRight,
  MessageSquare,
  Ticket as TicketIcon,
} from 'lucide-react';
import clsx from 'clsx';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Dropdown from '../components/ui/Dropdown';
import ChannelIcon from '../components/ui/ChannelIcon';
import EmptyState from '../components/ui/EmptyState';
import { useAppState } from '../context/AppStateContext';
import { useToast } from '../context/ToastContext';
import { formatRelative, formatDateTime } from '../utils/format';

const filters = [
  { key: 'all', label: 'All', icon: Inbox, count: null },
  { key: 'unassigned', label: 'Unassigned', icon: UserRound, count: null },
  { key: 'mine', label: 'Assigned to me', icon: UserCheck, count: null },
  { key: 'urgent', label: 'Urgent', icon: AlertCircle, count: null },
  { key: 'waiting', label: 'Waiting for reply', icon: Clock4, count: null },
  { key: 'resolved', label: 'Resolved', icon: CheckCircle2, count: null },
];

export default function InboxPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { conversations, addMessage, updateConversation, team } = useAppState();
  const toast = useToast();
  const messagesEndRef = useRef(null);

  const [activeFilter, setActiveFilter] = useState('all');
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const [isNote, setIsNote] = useState(false);
  const [mobileView, setMobileView] = useState('list'); // 'list' | 'conversation'

  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const c = params.get('c');
    if (c) {
      setSelectedId(c);
      if (window.innerWidth < 768) setMobileView('conversation');
    } else {
      setSelectedId(conversations[0]?.id || null);
    }
  }, [params, conversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [selectedId, conversations]);

  const filteredConversations = useMemo(() => {
    let list = [...conversations].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    switch (activeFilter) {
      case 'unassigned': return list.filter((c) => !c.assigneeId);
      case 'mine': return list.filter((c) => c.assigneeId === 'u1');
      case 'urgent': return list.filter((c) => c.priority === 'Urgent');
      case 'waiting': return list.filter((c) => c.status === 'Pending');
      case 'resolved': return list.filter((c) => c.status === 'Resolved');
      default: return list;
    }
  }, [conversations, activeFilter]);

  const selected = conversations.find((c) => c.id === selectedId) || null;

  const sendReply = async () => {
    if (!reply.trim() || !selected) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 400));
    addMessage(selected.id, {
      author: isNote ? 'note' : 'agent',
      agentId: 'u1',
      agentName: 'Alex Chen',
      content: reply.trim(),
    });
    toast.success(isNote ? 'Internal note added' : 'Reply sent');
    setReply('');
    setSending(false);
  };

  const markResolved = () => {
    if (!selected) return;
    updateConversation(selected.id, { status: 'Resolved' });
    toast.success('Conversation marked resolved');
  };

  const snoozeConv = () => {
    if (!selected) return;
    updateConversation(selected.id, { status: 'Pending' });
    toast.info('Conversation snoozed until tomorrow');
  };

  const changePriority = (p) => {
    if (!selected) return;
    updateConversation(selected.id, { priority: p });
    toast.success(`Priority changed to ${p}`);
  };

  const assignTo = (id) => {
    if (!selected) return;
    const m = team.find((t) => t.id === id);
    updateConversation(selected.id, { assigneeId: id, assignee: m?.name || 'Unassigned' });
    toast.success(`Assigned to ${m?.name}`);
  };

  return (
    <div className="h-full flex flex-col md:flex-row md:h-[calc(100vh-3.5rem)] min-h-0">
      {/* Left column - filters */}
      <aside className={clsx(
        'flex-shrink-0 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 md:w-56 bg-white dark:bg-slate-950/40',
        mobileView === 'list' ? 'block' : 'hidden md:block'
      )}>
        <div className="p-3 space-y-0.5">
          <div className="px-2 py-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Folders</div>
          {filters.map((f) => {
            const Icon = f.icon;
            const count = f.key === 'all'
              ? conversations.filter((c) => c.status !== 'Resolved').length
              : f.key === 'unassigned'
                ? conversations.filter((c) => !c.assigneeId && c.status !== 'Resolved').length
                : f.key === 'mine'
                  ? conversations.filter((c) => c.assigneeId === 'u1' && c.status !== 'Resolved').length
                  : f.key === 'urgent'
                    ? conversations.filter((c) => c.priority === 'Urgent' && c.status !== 'Resolved').length
                    : f.key === 'waiting'
                      ? conversations.filter((c) => c.status === 'Pending').length
                      : conversations.filter((c) => c.status === 'Resolved').length;
            return (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={clsx(
                  'w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors',
                  activeFilter === f.key
                    ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
                    : 'text-slate-600 hover:bg-slate-100/60 dark:text-slate-400 dark:hover:bg-slate-800/60'
                )}
              >
                <Icon className={clsx('w-4 h-4 flex-shrink-0', activeFilter === f.key ? 'text-indigo-500' : 'text-slate-400')} />
                <span className="flex-1 text-left">{f.label}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">{count}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Middle column - conversation list */}
      <section className={clsx(
        'flex-shrink-0 w-full md:w-[360px] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/20 flex flex-col min-h-0',
        (mobileView === 'list' || window.innerWidth >= 768) ? 'flex' : 'hidden md:flex'
      )}>
        <div className="p-3 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between">
            {filters.find((f) => f.key === activeFilter)?.label || 'All'}
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{filteredConversations.length}</span>
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin min-h-0">
          {filteredConversations.length === 0 ? (
            <div className="h-full"><EmptyState title="No conversations" description={`Nothing in ${filters.find((f) => f.key === activeFilter)?.label.toLowerCase()}.`} /></div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredConversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setSelectedId(c.id); setMobileView('conversation'); }}
                  className={clsx(
                    'w-full text-left p-3 transition-colors',
                    selectedId === c.id
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/30 border-l-2 border-l-indigo-500 pl-[10px]'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 border-l-2 border-l-transparent'
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <Avatar name={c.customer} seed={c.avatarSeed} size="sm" />
                      {c.unread && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-slate-950" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className={clsx('text-xs truncate flex-1', c.unread ? 'font-semibold text-slate-900 dark:text-slate-100' : 'font-medium text-slate-700 dark:text-slate-200')}>
                          {c.customer}
                        </div>
                        <ChannelIcon channel={c.channel} />
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 flex-shrink-0 tabular-nums">{formatRelative(c.timestamp)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Badge priority={c.priority} size="xs" dot className="text-[10px] px-1.5 py-0" />
                        <Badge status={c.status} size="xs" className="text-[10px] px-1.5 py-0" />
                      </div>
                      <div className={clsx('text-xs mt-1 line-clamp-1 truncate', c.unread ? 'text-slate-700 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400')}>
                        {c.preview}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Right column - conversation view */}
      <section className={clsx(
        'flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-950/30',
        (mobileView === 'conversation' || window.innerWidth >= 768) ? 'flex' : 'hidden md:flex'
      )}>
        {selected ? (
          <>
            <div className="h-14 border-b border-slate-200 dark:border-slate-800 px-3 md:px-5 flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setMobileView('list')}
                className="md:hidden p-1.5 -ml-1.5 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <Avatar name={selected.customer} seed={selected.avatarSeed} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{selected.customer}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">·</span>
                  <a href={`mailto:${selected.customerEmail}`} className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-500 truncate">{selected.customerEmail}</a>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Badge status={selected.status} size="xs" />
                  <Badge priority={selected.priority} size="xs" dot />
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <UserCheck className="w-3 h-3" />
                    {selected.assignee}
                  </span>
                  {selected.ticketId && (
                    <button onClick={() => navigate(`/tickets?t=${selected.ticketId}`)} className="text-[10px] text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5 ml-1">
                      <TicketIcon className="w-3 h-3" /> {selected.ticketId}
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Dropdown
                  align="end"
                  menuClassName="min-w-[200px]"
                  trigger={
                    <button className="p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800" aria-label="Change status">
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  }
                  items={[
                    { type: 'label', label: 'Change status' },
                    { label: 'Open', onClick: () => updateConversation(selected.id, { status: 'Open' }) },
                    { label: 'In Progress', onClick: () => updateConversation(selected.id, { status: 'In Progress' }) },
                    { label: 'Pending', onClick: () => updateConversation(selected.id, { status: 'Pending' }) },
                    { label: 'Resolved', onClick: markResolved, icon: <CheckCircle2 className="w-4 h-4" /> },
                  ]}
                />
                <Dropdown
                  align="end"
                  menuClassName="min-w-[200px]"
                  trigger={
                    <button className="p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800" aria-label="Change priority">
                      <Flag className="w-4 h-4" />
                    </button>
                  }
                  items={[
                    { type: 'label', label: 'Change priority' },
                    { label: 'Low', onClick: () => changePriority('Low') },
                    { label: 'Medium', onClick: () => changePriority('Medium') },
                    { label: 'High', onClick: () => changePriority('High') },
                    { label: 'Urgent', onClick: () => changePriority('Urgent') },
                  ]}
                />
                <Button size="sm" variant="ghost" onClick={snoozeConv} icon={<CalendarClock className="w-4 h-4" />}>
                  <span className="hidden sm:inline">Snooze</span>
                </Button>
                <Dropdown
                  align="end"
                  menuClassName="min-w-[220px]"
                  trigger={
                    <button className="p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800" aria-label="Assign">
                      <div className="flex items-center gap-1">
                        <UserCheck className="w-4 h-4" />
                        <ChevronDown className="w-3 h-3 hidden sm:block" />
                      </div>
                    </button>
                  }
                  items={[
                    { type: 'label', label: 'Assign to' },
                    { label: 'Unassign', onClick: () => assignTo(null), icon: <XCircle className="w-4 h-4" /> },
                    { separator: true },
                    ...team.map((m) => ({
                      label: m.name,
                      onClick: () => assignTo(m.id),
                      icon: (
                        <div className="-m-1 -ml-0.5">
                          <Avatar name={m.name} seed={m.avatarSeed} size="xs" />
                        </div>
                      ),
                    })),
                  ]}
                />
                <Dropdown
                  align="end"
                  trigger={
                    <button className="p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800" aria-label="More actions">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  }
                  items={[
                    { label: 'Merge conversation', onClick: () => {} },
                    { label: 'Move to spam', danger: true, onClick: () => toast.warning('Conversation moved to spam') },
                  ]}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin p-4 md:p-6 space-y-5 min-h-0">
              {selected.messages.map((m, i) => {
                if (m.author === 'note') {
                  return (
                    <div key={m.id} className="border-l-2 border-amber-400 dark:border-amber-500 pl-4 my-4 relative">
                      <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-amber-100 dark:bg-amber-900/60 border-2 border-white dark:border-slate-950 flex items-center justify-center">
                        <StickyNote className="w-2 h-2 text-amber-700 dark:text-amber-300" />
                      </div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">Internal Note</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">· {m.agentName}</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">· {formatRelative(m.timestamp)}</span>
                      </div>
                      <div className="text-xs text-slate-700 dark:text-slate-300 bg-amber-50/70 dark:bg-amber-950/20 rounded-md px-3 py-2 leading-relaxed">
                        {m.content}
                      </div>
                    </div>
                  );
                }
                const isAgent = m.author === 'agent';
                const member = team.find((t) => t.id === m.agentId);
                return (
                  <div key={m.id} className={clsx('flex gap-2.5 max-w-[90%]', isAgent ? 'ml-auto flex-row-reverse' : '')}>
                    <Avatar
                      name={isAgent ? m.agentName : selected.customer}
                      seed={isAgent ? member?.avatarSeed || m.agentName : selected.avatarSeed}
                      size="sm"
                    />
                    <div className={clsx('flex flex-col min-w-0', isAgent ? 'items-end' : '')}>
                      <div className={clsx(
                        'flex items-center gap-1.5 mb-1.5 text-[10px]',
                        isAgent ? 'flex-row-reverse' : ''
                      )}>
                        <span className="font-medium text-slate-700 dark:text-slate-200">{isAgent ? m.agentName : selected.customer}</span>
                        <span className="text-slate-400 dark:text-slate-500">· {formatDateTime(m.timestamp)}</span>
                      </div>
                      <div className={clsx(
                        'rounded-lg px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words',
                        isAgent
                          ? 'bg-indigo-600 text-white rounded-br-sm shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-sm'
                      )}>
                        {m.content}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 p-3 md:p-4 flex-shrink-0">
              <div className={clsx(
                'rounded-lg border transition-colors',
                isNote
                  ? 'border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
              )}>
                <div className="flex items-center gap-1 border-b border-slate-100 dark:border-slate-800 px-2 py-1.5">
                  <button
                    onClick={() => setIsNote(!isNote)}
                    className={clsx(
                      'flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors',
                      isNote
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
                        : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                    )}
                  >
                    <StickyNote className="w-3.5 h-3.5" />
                    Internal note
                  </button>
                  <div className="flex-1" />
                  <button
                    className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-500 dark:hover:text-slate-300 dark:hover:bg-slate-800"
                    aria-label="Attach"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button
                    className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-500 dark:hover:text-slate-300 dark:hover:bg-slate-800"
                    aria-label="Emoji"
                  >
                    <Smile className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder={isNote ? 'Write an internal note...' : 'Write a reply...'}
                  rows={3}
                  className="w-full resize-none rounded-b-lg bg-transparent px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      e.preventDefault();
                      sendReply();
                    }
                  }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-[11px] text-slate-400 dark:text-slate-500 hidden sm:block">
                  <span className="inline-flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] border border-slate-200 dark:border-slate-700">⌘</kbd>
                    <kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] border border-slate-200 dark:border-slate-700">↵</kbd>
                    to send
                  </span>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <Button variant="ghost" size="sm" onClick={() => setReply('')} disabled={!reply || sending}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" icon={<Send className="w-4 h-4" />} onClick={sendReply} disabled={!reply.trim() || sending}>
                    {isNote ? 'Add note' : 'Send reply'}
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center">
            <EmptyState
              icon={MessageSquare}
              title="Select a conversation"
              description="Pick a conversation from the list to start responding to customers."
            />
          </div>
        )}
      </section>
    </div>
  );
}

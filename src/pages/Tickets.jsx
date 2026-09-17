import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Ticket as TicketIcon,
  Plus,
  Filter as FilterIcon,
  ArrowUpDown,
  Search,
  X,
  ChevronRight,
  ArrowLeft,
  Tag,
  Calendar,
  Clock,
  UserCheck,
  Flag,
  MessageSquare,
  MoreHorizontal,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import clsx from 'clsx';
import SearchInput from '../components/ui/SearchInput';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import Tabs from '../components/ui/Tabs';
import Dropdown from '../components/ui/Dropdown';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';
import ChannelIcon from '../components/ui/ChannelIcon';
import { useAppState } from '../context/AppStateContext';
import { useToast } from '../context/ToastContext';
import { categories, statuses, priorities } from '../data/mockData';
import { formatDate, formatRelative, formatDateTime } from '../utils/format';

export default function TicketsPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { tickets, customers, team, updateTicket, createTicket } = useAppState();
  const toast = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('updated');
  const [sortDir, setSortDir] = useState('desc');
  const [selectedId, setSelectedId] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    const t = params.get('t');
    if (t) setSelectedId(t);
    else setSelectedId(null);
    if (params.get('new') === '1') setCreateOpen(true);
  }, [params]);

  const filteredTickets = useMemo(() => {
    let list = [...tickets];
    if (statusFilter !== 'all') list = list.filter((t) => t.status === statusFilter);
    if (priorityFilter !== 'all') list = list.filter((t) => t.priority === priorityFilter);
    if (assigneeFilter !== 'all') {
      if (assigneeFilter === 'unassigned') list = list.filter((t) => !t.assigneeId);
      else list = list.filter((t) => t.assigneeId === assigneeFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((t) =>
        `${t.id} ${t.subject} ${t.customer} ${t.assignee}`.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      let av, bv;
      switch (sortBy) {
        case 'id': av = parseInt(a.id.replace('T-', ''), 10); bv = parseInt(b.id.replace('T-', ''), 10); break;
        case 'priority':
          av = ['Low', 'Medium', 'High', 'Urgent'].indexOf(a.priority);
          bv = ['Low', 'Medium', 'High', 'Urgent'].indexOf(b.priority); break;
        case 'created': av = new Date(a.createdAt); bv = new Date(b.createdAt); break;
        case 'updated':
        default: av = new Date(a.updatedAt); bv = new Date(b.updatedAt);
      }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [tickets, statusFilter, priorityFilter, assigneeFilter, search, sortBy, sortDir]);

  const toggleSort = (key) => {
    if (sortBy === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortBy(key); setSortDir('desc'); }
  };

  const selected = tickets.find((t) => t.id === selectedId) || null;
  const selectedCustomer = selected ? customers.find((c) => c.id === selected.customerId) : null;
  const selectedAssignee = selected ? team.find((t) => t.id === selected.assigneeId) : null;

  const changeStatus = (t, s) => { updateTicket(t.id, { status: s }); toast.success(`Ticket ${t.id} set to ${s}`); };
  const changePriority = (t, p) => { updateTicket(t.id, { priority: p }); toast.success(`Priority set to ${p}`); };
  const changeAssignee = (t, id) => {
    const a = team.find((m) => m.id === id);
    updateTicket(t.id, { assigneeId: id, assignee: a ? a.name : 'Unassigned' });
    toast.success(id ? `Assigned to ${a?.name}` : 'Ticket unassigned');
  };

  // Create ticket form state
  const [form, setForm] = useState({ subject: '', customerId: customers[0]?.id || '', category: 'Technical', priority: 'Medium', assigneeId: 'u1', description: '' });
  const submitTicket = () => {
    if (!form.subject.trim()) return;
    createTicket({
      subject: form.subject,
      customerId: form.customerId,
      category: form.category,
      priority: form.priority,
      assigneeId: form.assigneeId,
      status: 'Open',
      channel: 'email',
      description: form.description,
    });
    toast.success('Ticket created successfully');
    setCreateOpen(false);
    setForm({ subject: '', customerId: customers[0]?.id || '', category: 'Technical', priority: 'Medium', assigneeId: 'u1', description: '' });
  };

  return (
    <div className="p-4 lg:p-8 max-w-[1800px] mx-auto space-y-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100">Tickets</h1>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            {filteredTickets.length} {filteredTickets.length === 1 ? 'ticket' : 'tickets'} · {tickets.filter((t) => t.status !== 'Resolved').length} open
          </p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={() => setCreateOpen(true)}>
          Create ticket
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1 md:max-w-md"><SearchInput value={search} onChange={setSearch} placeholder="Search tickets..." onClear={setSearch} /></div>
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 px-3 rounded-md text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All statuses</option>
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
              value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}
              className="h-9 px-3 rounded-md text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All priorities</option>
              {priorities.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <select
              value={assigneeFilter} onChange={(e) => setAssigneeFilter(e.target.value)}
              className="h-9 px-3 rounded-md text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All assignees</option>
              <option value="unassigned">Unassigned</option>
              {team.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Ticket list */}
        <div className={clsx('lg:col-span-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden', selectedId && 'hidden lg:block')}>
          {filteredTickets.length === 0 ? (
            <EmptyState title="No tickets match filters" description="Try clearing some filters or search for something else." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800 text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="px-4 py-2.5 font-medium cursor-pointer" onClick={() => toggleSort('id')}>
                      <span className="inline-flex items-center gap-1">Ticket <ArrowUpDown className="w-3 h-3" /></span>
                    </th>
                    <th className="px-4 py-2.5 font-medium">Customer</th>
                    <th className="px-4 py-2.5 font-medium">Subject</th>
                    <th className="px-4 py-2.5 font-medium">Status</th>
                    <th className="px-4 py-2.5 font-medium cursor-pointer" onClick={() => toggleSort('priority')}>
                      <span className="inline-flex items-center gap-1">Priority <ArrowUpDown className="w-3 h-3" /></span>
                    </th>
                    <th className="px-4 py-2.5 font-medium">Assignee</th>
                    <th className="px-4 py-2.5 font-medium cursor-pointer" onClick={() => toggleSort('updated')}>
                      <span className="inline-flex items-center gap-1">Updated <ArrowUpDown className="w-3 h-3" /></span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredTickets.map((t) => {
                    const cust = customers.find((c) => c.id === t.customerId);
                    return (
                      <tr
                        key={t.id}
                        onClick={() => setSelectedId(t.id)}
                        className={clsx(
                          'cursor-pointer transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/40',
                          selectedId === t.id && 'bg-indigo-50/60 dark:bg-indigo-950/20'
                        )}
                      >
                        <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{t.id}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Avatar name={t.customer} seed={cust?.avatarSeed || t.customerId} size="xs" />
                            <div className="min-w-0">
                              <div className="text-xs font-medium text-slate-800 dark:text-slate-100 truncate max-w-[120px]">{t.customer}</div>
                              {cust && <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[120px]">{cust.company}</div>}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 max-w-sm">
                          <div className="flex items-center gap-1.5">
                            <ChannelIcon channel={t.channel} size="xs" />
                            <div className="text-xs text-slate-800 dark:text-slate-100 truncate">{t.subject}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3"><Badge status={t.status} size="xs" /></td>
                        <td className="px-4 py-3"><Badge priority={t.priority} size="xs" dot /></td>
                        <td className="px-4 py-3">
                          {t.assigneeId ? (
                            <div className="flex items-center gap-2">
                              <Avatar name={t.assignee} seed={t.assignee} size="xs" />
                              <span className="text-xs text-slate-600 dark:text-slate-300 hidden xl:inline">{t.assignee}</span>
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-400 dark:text-slate-500">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">{formatRelative(t.updatedAt)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Ticket detail */}
        <div className={clsx('lg:col-span-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden flex flex-col', !selectedId && 'hidden lg:flex')}>
          {selected ? (
            <>
              <div className="border-b border-slate-100 dark:border-slate-800 px-5 py-4 flex items-start gap-3">
                <button onClick={() => setSelectedId(null)} className="lg:hidden p-1.5 -ml-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">{selected.id}</span>
                    <Badge status={selected.status} size="xs" />
                    <Badge priority={selected.priority} size="xs" dot />
                  </div>
                  <h2 className="mt-1.5 text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug">{selected.subject}</h2>
                </div>
                <Dropdown align="end" trigger={
                  <button className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 -m-1.5">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                } items={[
                  { label: 'Reopen', onClick: () => changeStatus(selected, 'Open'), disabled: selected.status === 'Open' },
                  { label: 'Mark resolved', onClick: () => changeStatus(selected, 'Resolved'), icon: <CheckCircle2 className="w-4 h-4" /> },
                  { separator: true },
                  { label: 'Delete ticket', danger: true, onClick: () => toast.warning('Ticket deletion not available in demo') },
                ]} />
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-6">
                {selectedCustomer && (
                  <div className="rounded-lg border border-slate-100 dark:border-slate-800 p-4 flex items-start gap-3">
                    <Avatar name={selectedCustomer.name} seed={selectedCustomer.avatarSeed} size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{selectedCustomer.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{selectedCustomer.email} · {selectedCustomer.company}</div>
                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        <Badge size="xs" color="sky">{selectedCustomer.plan}</Badge>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1"><TicketIcon className="w-3 h-3" /> {selectedCustomer.totalTickets} tickets</span>
                      </div>
                    </div>
                    <button onClick={() => navigate(`/customers?c=${selectedCustomer.id}`)} className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                      View profile
                    </button>
                  </div>
                )}

                {/* Status / priority / assignee quick edit */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Dropdown
                    trigger={
                      <button className="text-left rounded-lg border border-slate-200 dark:border-slate-800 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 w-full">
                        <div className="text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Status
                        </div>
                        <div className="mt-1.5"><Badge status={selected.status} size="sm" /></div>
                      </button>
                    }
                    items={statuses.map((s) => ({ label: s, onClick: () => changeStatus(selected, s) }))}
                  />
                  <Dropdown
                    trigger={
                      <button className="text-left rounded-lg border border-slate-200 dark:border-slate-800 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 w-full">
                        <div className="text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
                          <Flag className="w-3 h-3" /> Priority
                        </div>
                        <div className="mt-1.5"><Badge priority={selected.priority} size="sm" dot /></div>
                      </button>
                    }
                    items={priorities.map((p) => ({ label: p, onClick: () => changePriority(selected, p) }))}
                  />
                  <Dropdown
                    trigger={
                      <button className="text-left rounded-lg border border-slate-200 dark:border-slate-800 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 w-full">
                        <div className="text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
                          <UserCheck className="w-3 h-3" /> Assignee
                        </div>
                        <div className="mt-1.5 flex items-center gap-1.5">
                          {selectedAssignee ? (
                            <><Avatar name={selected.assignee} seed={selected.assignee} size="xs" /><span className="text-xs text-slate-700 dark:text-slate-200">{selected.assignee}</span></>
                          ) : <span className="text-xs text-slate-500 dark:text-slate-400">Unassigned</span>}
                        </div>
                      </button>
                    }
                    items={[
                      { label: 'Unassign', onClick: () => changeAssignee(selected, null) },
                      { separator: true },
                      ...team.map((m) => ({ label: m.name, onClick: () => changeAssignee(selected, m.id) })),
                    ]}
                  />
                </div>

                {/* Metadata */}
                <div className="rounded-lg bg-slate-50/70 dark:bg-slate-950/40 p-4 space-y-2.5">
                  <h3 className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Details</h3>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                    <div className="flex items-start gap-2">
                      <Tag className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-slate-400 dark:text-slate-500 text-[10px] uppercase">Category</div>
                        <div className="text-slate-700 dark:text-slate-200">{selected.category}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-slate-400 dark:text-slate-500 text-[10px] uppercase">Created</div>
                        <div className="text-slate-700 dark:text-slate-200">{formatDate(selected.createdAt)}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 col-span-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-slate-400 dark:text-slate-500 text-[10px] uppercase">Last updated</div>
                        <div className="text-slate-700 dark:text-slate-200">{formatDateTime(selected.updatedAt)}</div>
                      </div>
                    </div>
                  </div>
                  {selected.tags && selected.tags.length > 0 && (
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400 font-medium">Tags</span>
                      {selected.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Description */}
                {selected.description && (
                  <div>
                    <h3 className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">Description</h3>
                    <div className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap rounded-lg border border-slate-100 dark:border-slate-800 p-4 bg-white dark:bg-slate-950/30">
                      {selected.description}
                    </div>
                  </div>
                )}

                {/* Activity timeline */}
                <div>
                  <h3 className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">Activity</h3>
                  <div className="space-y-3 pl-4 border-l-2 border-slate-100 dark:border-slate-800 -ml-0.5">
                    {[
                      { icon: MessageSquare, color: 'text-indigo-500', text: 'Ticket created from incoming message', time: selected.createdAt, user: selected.customer },
                      { icon: UserCheck, color: 'text-emerald-500', text: `Assigned to ${selected.assignee}`, time: selected.createdAt, user: selected.assignee },
                      selected.status !== 'Open' ? {
                        icon: selected.status === 'Resolved' ? CheckCircle2 : AlertTriangle,
                        color: selected.status === 'Resolved' ? 'text-emerald-500' : 'text-amber-500',
                        text: `Status set to ${selected.status}`,
                        time: selected.updatedAt,
                        user: selected.assignee,
                      } : null,
                    ].filter(Boolean).map((e, i) => {
                      const Icon = e.icon;
                      return (
                        <div key={i} className="relative">
                          <div className={clsx('absolute -left-[22px] w-4 h-4 rounded-full ring-2 ring-white dark:ring-slate-900 bg-white dark:bg-slate-900 flex items-center justify-center', e.color)}>
                            <Icon className="w-3 h-3" />
                          </div>
                          <div className="text-xs">
                            <div className="text-slate-800 dark:text-slate-100"><span className="font-medium">{e.user}</span> {e.text}</div>
                            <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{formatDateTime(e.time)}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full min-h-[400px]">
              <EmptyState
                icon={TicketIcon}
                title="Select a ticket"
                description="Choose a ticket from the list to view details, update status, or change assignee."
              />
            </div>
          )}
        </div>
      </div>

      {/* Create ticket modal */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create new ticket"
        description="File a new support ticket on behalf of a customer."
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={submitTicket} icon={<Plus className="w-4 h-4" />} disabled={!form.subject.trim()}>Create ticket</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">Subject *</label>
            <input
              type="text"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="Brief summary of the issue"
              className="w-full h-9 px-3 rounded-md text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">Customer</label>
              <select
                value={form.customerId}
                onChange={(e) => setForm({ ...form, customerId: e.target.value })}
                className="w-full h-9 px-3 rounded-md text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
              >
                {customers.map((c) => <option key={c.id} value={c.id}>{c.name} — {c.company}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full h-9 px-3 rounded-md text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
              >
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full h-9 px-3 rounded-md text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
              >
                {priorities.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">Assignee</label>
              <select
                value={form.assigneeId || ''}
                onChange={(e) => setForm({ ...form, assigneeId: e.target.value })}
                className="w-full h-9 px-3 rounded-md text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
              >
                <option value="">Unassigned</option>
                {team.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">Description</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Full description of the ticket..."
              className="w-full resize-none px-3 py-2.5 rounded-md text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

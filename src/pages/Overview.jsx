import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  Ticket,
  ChevronRight,
  AlertTriangle,
  MoreHorizontal,
  UserPlus,
  Clock,
  Filter,
} from 'lucide-react';
import clsx from 'clsx';
import StatCard from '../components/ui/StatCard';
import ChartCard from '../components/ui/ChartCard';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import Tabs from '../components/ui/Tabs';
import ChannelIcon from '../components/ui/ChannelIcon';
import Dropdown from '../components/ui/Dropdown';
import { kpis, volumeData7d, volumeData30d, volumeData90d, teamActivity } from '../data/mockData';
import { useAppState } from '../context/AppStateContext';
import { formatRelative } from '../utils/format';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const volumeMap = { '7d': volumeData7d, '30d': volumeData30d, '90d': volumeData90d };

export default function Overview() {
  const navigate = useNavigate();
  const { tickets, conversations, team } = useAppState();
  const [range, setRange] = useState('7d');
  const [filter, setFilter] = useState('all');

  const volumeData = volumeMap[range] || volumeData7d;

  const recentConversations = useMemo(() => {
    const sorted = [...conversations].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    if (filter === 'unread') return sorted.filter((c) => c.unread);
    if (filter === 'urgent') return sorted.filter((c) => c.priority === 'Urgent');
    if (filter === 'open') return sorted.filter((c) => c.status !== 'Resolved');
    return sorted;
  }, [conversations, filter]);

  const openTickets = tickets.filter((t) => t.status !== 'Resolved').length;
  const urgentCount = tickets.filter((t) => t.priority === 'Urgent' && t.status !== 'Resolved').length;

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, Alex
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Here's what's happening with your support team today.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="ghost" icon={<Filter className="w-4 h-4" />} size="sm">Quick filters</Button>
          <Button variant="primary" icon={<Ticket className="w-4 h-4" />} size="sm" onClick={() => navigate('/tickets?new=1')}>
            New ticket
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Open Tickets" value={openTickets} change={kpis.openTickets.change} trend={kpis.openTickets.trend} accent="rose" />
        <StatCard title="Resolved Today" value={kpis.resolvedToday.value} change={kpis.resolvedToday.change} trend={kpis.resolvedToday.trend} accent="emerald" />
        <StatCard title="Avg. Response Time" value={kpis.avgResponseTime.value} suffix={kpis.avgResponseTime.suffix} change={kpis.avgResponseTime.change} trend={kpis.avgResponseTime.trend} accent="sky" />
        <StatCard title="Customer Satisfaction" value={kpis.csat.value} suffix={kpis.csat.suffix} change={kpis.csat.change} trend={kpis.csat.trend} accent="violet" />
      </div>

      {urgentCount > 0 && (
        <div className="rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/30 px-4 py-3 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-amber-800 dark:text-amber-300">
              {urgentCount} urgent {urgentCount === 1 ? 'ticket' : 'tickets'} need attention
            </div>
            <div className="text-xs text-amber-700/80 dark:text-amber-300/70 mt-0.5">
              Triaging urgent tickets within 30 minutes keeps CSAT high
            </div>
          </div>
          <Button size="xs" variant="secondary" onClick={() => navigate('/tickets?priority=Urgent')}>
            View all
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ChartCard
            title="Ticket Volume"
            subtitle="Incoming vs. resolved tickets"
            actions={
              <Tabs
                tabs={[
                  { label: '7 days', value: '7d' },
                  { label: '30 days', value: '30d' },
                  { label: '90 days', value: '90d' },
                ]}
                active={range}
                onChange={setRange}
              />
            }
          >
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volumeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIncoming" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                  <XAxis dataKey="label" stroke="#94a3b8" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#94a3b8" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} width={32} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: '1px solid rgb(226 232 240)',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)',
                      backgroundColor: 'rgb(255 255 255)',
                      fontFamily: 'Inter',
                      fontSize: 12,
                    }}
                    labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                    itemStyle={{ padding: '2px 0' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 12, fontFamily: 'Inter', paddingTop: 10 }} />
                  <Area type="monotone" dataKey="incoming" name="Incoming" stroke="#6366f1" strokeWidth={2} fill="url(#colorIncoming)" />
                  <Area type="monotone" dataKey="resolved" name="Resolved" stroke="#10b981" strokeWidth={2} fill="url(#colorResolved)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div className="xl:col-span-1">
          <ChartCard title="Team Activity" subtitle="Real-time actions">
            <div className="space-y-4 -my-1 max-h-[360px] overflow-y-auto scrollbar-thin pr-1">
              {teamActivity.map((a) => {
                const member = team.find((t) => t.id === a.userId);
                return (
                  <div key={a.id} className="flex items-start gap-3 py-1">
                    <Avatar name={a.userName} seed={member?.avatarSeed || a.userId} size="sm" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-slate-900 dark:text-slate-100 leading-snug">
                        <span className="font-medium">{a.userName}</span>
                        <span className="text-slate-500 dark:text-slate-400"> {a.action} </span>
                        <span className="font-medium">{a.target}</span>
                      </div>
                      {a.forCustomer && (
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{a.forCustomer}</div>
                      )}
                      <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatRelative(a.timestamp)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="mt-3 w-full text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 py-1.5 flex items-center justify-center gap-1">
              View all activity <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </ChartCard>
        </div>
      </div>

      <ChartCard
        title="Recent Conversations"
        subtitle={`${recentConversations.length} open conversations`}
        actions={
          <div className="flex items-center gap-2">
            <Tabs
              tabs={[
                { label: 'All', value: 'all' },
                { label: 'Unread', value: 'unread' },
                { label: 'Open', value: 'open' },
                { label: 'Urgent', value: 'urgent' },
              ]}
              active={filter}
              onChange={setFilter}
            />
            <Button size="sm" variant="ghost" onClick={() => navigate('/inbox')} rightIcon={<ChevronRight className="w-4 h-4" />}>
              Inbox
            </Button>
          </div>
        }
      >
        <div className="overflow-x-auto -mx-4 -my-4">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 bg-slate-50/60 dark:bg-slate-900/60 border-y border-slate-100 dark:border-slate-800">
                <th className="py-2.5 px-4 font-medium">Customer</th>
                <th className="py-2.5 px-4 font-medium">Preview</th>
                <th className="py-2.5 px-4 font-medium">Channel</th>
                <th className="py-2.5 px-4 font-medium">Priority</th>
                <th className="py-2.5 px-4 font-medium">Agent</th>
                <th className="py-2.5 px-4 font-medium">Status</th>
                <th className="py-2.5 px-4 font-medium w-24">Time</th>
                <th className="py-2.5 px-4 font-medium w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentConversations.slice(0, 8).map((c) => (
                <tr
                  key={c.id}
                  onClick={() => navigate(`/inbox?c=${c.id}`)}
                  className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <Avatar name={c.customer} seed={c.avatarSeed} size="sm" />
                        {c.unread && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-slate-900" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-slate-900 dark:text-slate-100 truncate">{c.customer}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{c.customerEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 max-w-md">
                    <div className={clsx('text-xs truncate', c.unread ? 'text-slate-900 dark:text-slate-100 font-medium' : 'text-slate-600 dark:text-slate-300')}>
                      {c.preview}
                    </div>
                  </td>
                  <td className="py-3 px-4"><ChannelIcon channel={c.channel} /></td>
                  <td className="py-3 px-4"><Badge priority={c.priority} size="xs" dot /></td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Avatar name={c.assignee} seed={c.assignee} size="xs" />
                      <span className="text-xs text-slate-600 dark:text-slate-300 hidden sm:inline">{c.assignee}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4"><Badge status={c.status} size="xs" /></td>
                  <td className="py-3 px-4 text-xs text-slate-500 dark:text-slate-400">{formatRelative(c.timestamp)}</td>
                  <td className="py-3 px-4">
                    <Dropdown
                      align="end"
                      trigger={
                        <button className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 -m-1">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      }
                      items={[
                        { label: 'Open conversation', onClick: () => navigate(`/inbox?c=${c.id}`), icon: <MessageSquare className="w-4 h-4" /> },
                        { label: 'Assign to me', onClick: () => {} },
                        { separator: true },
                        { label: 'Mark resolved', onClick: () => {} },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>

      <ChartCard title="Team status" subtitle="8 team members across 3 roles">
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-4">
          {team.map((m) => (
            <div
              key={m.id}
              className="rounded-lg border border-slate-100 dark:border-slate-800 p-3 hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
              onClick={() => navigate('/team')}
            >
              <div className="flex items-center justify-between">
                <Avatar name={m.name} seed={m.avatarSeed} size="md" status={m.status} />
                <Badge size="xs" color={m.role === 'Admin' ? 'rose' : m.role === 'Manager' ? 'violet' : 'base'} className="text-[10px]">{m.role.replace(' Support', '')}</Badge>
              </div>
              <div className="mt-2.5 text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">{m.name}</div>
              <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1"><Ticket className="w-3 h-3" /> {m.ticketsHandled}</span>
                <span>·</span>
                <span>{m.csat} CSAT</span>
              </div>
            </div>
          ))}
          <div
            className="rounded-lg border border-dashed border-slate-200 dark:border-slate-800 p-3 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer flex flex-col items-center justify-center"
            onClick={() => navigate('/team?add=1')}
          >
            <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 mb-2">
              <UserPlus className="w-4 h-4" />
            </div>
            <div className="text-xs font-medium text-slate-600 dark:text-slate-300">Add member</div>
          </div>
        </div>
      </ChartCard>
    </div>
  );
}

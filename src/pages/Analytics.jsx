import { useState, useMemo } from 'react';
import {
  BarChart3,
  Clock,
  Smile,
  Ticket as TicketIcon,
  CheckCircle2,
  Users,
  TrendingUp,
  CalendarClock,
  BarChart2,
  PieChart as PieIcon,
  ListChecks,
  AlertCircle,
} from 'lucide-react';
import clsx from 'clsx';
import ChartCard from '../components/ui/ChartCard';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Tabs from '../components/ui/Tabs';
import { useAppState } from '../context/AppStateContext';
import {
  volumeData7d, volumeData30d, volumeData90d,
  csatData7d, csatData30d, csatData90d,
  responseTimeData7d, responseTimeData30d, responseTimeData90d,
  resolutionRateData, categoryData,
} from '../data/mockData';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts';

const ranges = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
];

export default function AnalyticsPage() {
  const [range, setRange] = useState('30d');
  const { team, tickets } = useAppState();

  const volumeData = range === '7d' ? volumeData7d : range === '30d' ? volumeData30d : volumeData90d;
  const csatData = range === '7d' ? csatData7d : range === '30d' ? csatData30d : csatData90d;
  const respData = range === '7d' ? responseTimeData7d : range === '30d' ? responseTimeData30d : responseTimeData90d;

  const totals = useMemo(() => {
    const incoming = volumeData.reduce((s, d) => s + d.incoming, 0);
    const resolved = volumeData.reduce((s, d) => s + d.resolved, 0);
    const avgResp = respData.length ? respData.reduce((s, d) => s + d.avg, 0) / respData.length : 0;
    const avgCsat = csatData.length ? csatData.reduce((s, d) => s + d.csat, 0) / csatData.length : 0;
    return { incoming, resolved, avgResp: Number(avgResp.toFixed(1)), avgCsat: Number(avgCsat.toFixed(1)) };
  }, [volumeData, respData, csatData]);

  const agentStats = useMemo(() => {
    return team.map((m) => {
      const handled = tickets.filter((t) => t.assigneeId === m.id);
      const resolved = handled.filter((t) => t.status === 'Resolved').length;
      const rate = handled.length ? Math.round((resolved / handled.length) * 100) : 0;
      return {
        id: m.id,
        name: m.name,
        avatarSeed: m.avatarSeed,
        role: m.role,
        handled: m.ticketsHandled || handled.length || 12,
        resolutionRate: rate || Math.min(100, 85 + Math.floor(Math.random() * 15)),
        avgResponseTime: m.avgResponseTime || 4.2,
        csat: m.csat || 4.5,
      };
    }).sort((a, b) => b.handled - a.handled);
  }, [team, tickets]);

  const renderDot = (color) => <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: color }} />;

  return (
    <div className="p-4 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-500" />
            Support Analytics
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Trends and insights across your support operations.
          </p>
        </div>
        <Tabs tabs={ranges} active={range} onChange={setRange} />
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Tickets received', value: totals.incoming, sub: `+${Math.round(totals.incoming * 0.12)} vs prior`, icon: TicketIcon, color: 'text-indigo-500', accent: 'bg-indigo-50 dark:bg-indigo-950/40' },
          { label: 'Tickets resolved', value: totals.resolved, sub: `${Math.round(totals.resolved / totals.incoming * 100)}% resolution rate`, icon: CheckCircle2, color: 'text-emerald-500', accent: 'bg-emerald-50 dark:bg-emerald-950/40' },
          { label: 'Avg response time', value: `${totals.avgResp}m`, sub: 'First response average', icon: Clock, color: 'text-sky-500', accent: 'bg-sky-50 dark:bg-sky-950/40' },
          { label: 'Avg CSAT', value: `${totals.avgCsat}%`, sub: `${totals.avgCsat >= 95 ? 'Excellent' : 'Good'} satisfaction`, icon: Smile, color: 'text-violet-500', accent: 'bg-violet-50 dark:bg-violet-950/40' },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">{s.label}</div>
                  <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100 tabular-nums">{s.value}</div>
                  <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{s.sub}</div>
                </div>
                <div className={clsx('w-10 h-10 rounded-md flex items-center justify-center', s.accent)}>
                  <Icon className={clsx('w-5 h-5', s.color)} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Ticket Volume" subtitle="Incoming vs. resolved over time" actions={<span className="text-xs text-slate-500 dark:text-slate-400">Total: {totals.incoming}</span>}>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="inc" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.22} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient>
                  <linearGradient id="res" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.18} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="label" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} width={32} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid rgb(226 232 240)', backgroundColor: 'white', fontSize: 12, fontFamily: 'Inter' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, fontFamily: 'Inter' }} />
                <Area type="monotone" dataKey="incoming" name="Incoming" stroke="#6366f1" strokeWidth={2} fill="url(#inc)" />
                <Area type="monotone" dataKey="resolved" name="Resolved" stroke="#10b981" strokeWidth={2} fill="url(#res)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Resolution Rate" subtitle="Speed of ticket resolution by SLA tiers" actions={<Badge size="xs" color="emerald">Strong performance</Badge>}>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resolutionRateData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="label" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} width={32} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid rgb(226 232 240)', backgroundColor: 'white', fontSize: 12, fontFamily: 'Inter' }} formatter={(v) => [`${v}%`]} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, fontFamily: 'Inter' }} />
                <Bar dataKey="firstResponse" name="< 1 hour (first response)" stackId="a" fill="#06b6d4" radius={[0, 0, 0, 0]} />
                <Bar dataKey="within24h" name="< 24 hours" stackId="a" fill="#6366f1" />
                <Bar dataKey="within48h" name="< 48 hours" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Average Response Time" subtitle="Minutes, average vs 95th percentile">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={respData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="label" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} width={32} tickFormatter={(v) => `${v}m`} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid rgb(226 232 240)', backgroundColor: 'white', fontSize: 12, fontFamily: 'Inter' }} formatter={(v) => [`${v} min`]} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, fontFamily: 'Inter' }} />
                <Line type="monotone" dataKey="avg" name="Average" stroke="#0ea5e9" strokeWidth={2.25} dot={{ r: 3, strokeWidth: 0, fill: '#0ea5e9' }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="p95" name="95th %ile" stroke="#f43f5e" strokeWidth={2} strokeDasharray="4 3" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Customer Satisfaction" subtitle="Daily CSAT score (%)">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={csatData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="csatg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.22} /><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="label" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                <YAxis domain={[85, 100]} tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} width={32} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid rgb(226 232 240)', backgroundColor: 'white', fontSize: 12, fontFamily: 'Inter' }} formatter={(v) => [`${v}%`]} />
                <Area type="monotone" dataKey="csat" name="CSAT" stroke="#8b5cf6" strokeWidth={2.25} fill="url(#csatg)" dot={{ r: 3, strokeWidth: 0, fill: '#8b5cf6' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Tickets by Category" subtitle="Distribution across ticket types">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={92} paddingAngle={3} dataKey="value">
                  {categoryData.map((e, idx) => <Cell key={`cell-${idx}`} fill={e.color} strokeWidth={0} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid rgb(226 232 240)', backgroundColor: 'white', fontSize: 12, fontFamily: 'Inter' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-1 px-2">
              {categoryData.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                    {renderDot(c.color)} {c.name}
                  </span>
                  <span className="tabular-nums font-medium text-slate-600 dark:text-slate-300">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Agent performance */}
      <ChartCard title="Agent Performance" subtitle={`${agentStats.length} team members`} actions={
        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <CalendarClock className="w-3.5 h-3.5" /> {range === '7d' ? 'Last 7 days' : range === '30d' ? 'Last 30 days' : 'Last 90 days'}
        </div>
      }>
        <div className="overflow-x-auto -mx-4 -my-4">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-950/40 text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-y border-slate-100 dark:border-slate-800">
                <th className="px-4 py-2.5 font-medium">Agent</th>
                <th className="px-4 py-2.5 font-medium">Role</th>
                <th className="px-4 py-2.5 font-medium text-right">Tickets handled</th>
                <th className="px-4 py-2.5 font-medium text-right">Resolution rate</th>
                <th className="px-4 py-2.5 font-medium text-right">Avg. response</th>
                <th className="px-4 py-2.5 font-medium text-right">CSAT</th>
                <th className="px-4 py-2.5 font-medium">Distribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {agentStats.map((a, i) => {
                const barWidth = Math.round((a.handled / Math.max(...agentStats.map((x) => x.handled))) * 100);
                return (
                  <tr key={a.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="relative">
                          <Avatar name={a.name} seed={a.avatarSeed} size="sm" />
                          {i === 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-100 dark:bg-amber-900/60 ring-2 ring-white dark:ring-slate-900 flex items-center justify-center text-[10px]">🥇</span>}
                          {i === 1 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-700 ring-2 ring-white dark:ring-slate-900 flex items-center justify-center text-[10px]">🥈</span>}
                          {i === 2 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-100 dark:bg-orange-900/50 ring-2 ring-white dark:ring-slate-900 flex items-center justify-center text-[10px]">🥉</span>}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">{a.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        size="xs"
                        color={a.role === 'Admin' ? 'rose' : a.role === 'Manager' ? 'violet' : 'base'}
                      >{a.role.replace(' Support', '')}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs text-slate-800 dark:text-slate-100 tabular-nums font-semibold">{a.handled}</td>
                    <td className="px-4 py-3 text-right text-xs tabular-nums">
                      <span className={clsx(
                        'font-medium',
                        a.resolutionRate >= 90 ? 'text-emerald-600 dark:text-emerald-400' :
                        a.resolutionRate >= 75 ? 'text-slate-700 dark:text-slate-200' :
                        'text-amber-600 dark:text-amber-400'
                      )}>{a.resolutionRate}%</span>
                    </td>
                    <td className="px-4 py-3 text-right text-xs tabular-nums text-slate-700 dark:text-slate-200">{a.avgResponseTime} min</td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-800 dark:text-slate-100 tabular-nums">
                        {a.csat.toFixed(1)} <span className="text-amber-400">★</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 w-44">
                      <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" style={{ width: `${barWidth}%` }} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Users,
  Search,
  ArrowLeft,
  Mail,
  Building2,
  Crown,
  Calendar,
  Ticket,
  MessageSquare,
  Activity,
  Clock,
  MoreHorizontal,
  Filter,
  CheckCircle2,
  XCircle,
  Star,
} from "lucide-react";
import clsx from "clsx";
import SearchInput from "../components/ui/SearchInput";
import Badge from "../components/ui/Badge";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import Tabs from "../components/ui/Tabs";
import Dropdown from "../components/ui/Dropdown";
import EmptyState from "../components/ui/EmptyState";
import { useAppState } from "../context/AppStateContext";
import { useToast } from "../context/ToastContext";
import { formatDate, formatRelative } from "../utils/format";

export default function CustomersPage() {
  const [params] = useSearchParams();
  const { customers, tickets, conversations } = useAppState();
  const toast = useToast();

  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    const c = params.get("c");
    if (c) setSelectedId(c);
  }, [params]);

  const filteredCustomers = useMemo(() => {
    let list = [...customers];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((c) =>
        `${c.name} ${c.email} ${c.company} ${c.plan}`.toLowerCase().includes(q),
      );
    }
    if (planFilter !== "all") list = list.filter((c) => c.plan === planFilter);
    if (statusFilter !== "all")
      list = list.filter((c) => c.status === statusFilter);
    return list;
  }, [customers, search, planFilter, statusFilter]);

  const selected = customers.find((c) => c.id === selectedId) || null;
  const selTickets = selected
    ? tickets.filter((t) => t.customerId === selected.id)
    : [];
  const selConvos = selected
    ? conversations.filter((c) => c.customerId === selected.id)
    : [];

  const plans = ["all", ...Array.from(new Set(customers.map((c) => c.plan)))];

  return (
    <div className="p-4 lg:p-8 max-w-[1800px] mx-auto space-y-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Customers
          </h1>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            {filteredCustomers.length} of {customers.length} customers
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="h-9 px-3 rounded-md text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2c9b7a]"
          >
            {plans.map((p) => (
              <option key={p} value={p}>
                {p === "all" ? "All plans" : p}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 rounded-md text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2c9b7a]"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        {/* List */}
        <div
          className={clsx(
            "xl:col-span-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden",
            selectedId && "hidden xl:block",
          )}
        >
          <div className="p-3 border-b border-slate-100 dark:border-slate-800">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search customers..."
              onClear={setSearch}
            />
          </div>
          {filteredCustomers.length === 0 ? (
            <EmptyState
              title="No customers found"
              description="Try a different search or adjust filters."
            />
          ) : (
            <div className="overflow-x-auto max-h-[75vh] overflow-y-auto scrollbar-thin">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/70 dark:bg-slate-950/40 sticky top-0 border-b border-slate-100 dark:border-slate-800 text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 z-10">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">Customer</th>
                    <th className="px-4 py-2.5 font-medium hidden sm:table-cell">
                      Company
                    </th>
                    <th className="px-4 py-2.5 font-medium">Plan</th>
                    <th className="px-4 py-2.5 font-medium hidden md:table-cell">
                      Tickets
                    </th>
                    <th className="px-4 py-2.5 font-medium hidden lg:table-cell">
                      Last interaction
                    </th>
                    <th className="px-4 py-2.5 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredCustomers.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedId(c.id)}
                      className={clsx(
                        "cursor-pointer transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/40",
                        selectedId === c.id &&
                          "bg-indigo-50/60 dark:bg-indigo-950/20",
                      )}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={c.name} seed={c.avatarSeed} size="sm" />
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate max-w-[180px]">
                              {c.name}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
                              {c.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <div className="text-xs text-slate-700 dark:text-slate-200">
                          {c.company}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          size="xs"
                          color={
                            c.plan === "Enterprise"
                              ? "rose"
                              : c.plan === "Business"
                                ? "violet"
                                : c.plan === "Growth"
                                  ? "sky"
                                  : "base"
                          }
                        >
                          {c.plan}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className="text-xs text-slate-700 dark:text-slate-200 tabular-nums">
                          {c.totalTickets}
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <div className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {formatRelative(c.lastInteraction)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={clsx(
                            "inline-flex items-center gap-1.5 text-xs font-medium",
                            c.status === "active"
                              ? "text-emerald-700 dark:text-emerald-400"
                              : "text-slate-500 dark:text-slate-400",
                          )}
                        >
                          <span
                            className={clsx(
                              "w-1.5 h-1.5 rounded-full",
                              c.status === "active"
                                ? "bg-emerald-500"
                                : "bg-slate-400",
                            )}
                          />
                          {c.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Profile */}
        <div
          className={clsx(
            "xl:col-span-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden flex flex-col",
            !selectedId && "hidden xl:flex",
          )}
        >
          {selected ? (
            <>
              {/* Profile header */}
              <div className="relative border-b border-slate-100 dark:border-slate-800 p-5 md:p-6 overflow-hidden">
                <button
                  onClick={() => setSelectedId(null)}
                  className="xl:hidden absolute top-3 left-3 p-1.5 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 z-10 bg-white dark:bg-slate-900"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div
                  className="absolute inset-0 opacity-[0.035] dark:opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 20%, #6366f1 0, transparent 50%), radial-gradient(circle at 80% 80%, #8b5cf6 0, transparent 50%)",
                  }}
                />
                <div className="relative flex items-start gap-4">
                  <Avatar
                    name={selected.name}
                    seed={selected.avatarSeed}
                    size="2xl"
                  />
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-start gap-2 flex-wrap">
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {selected.name}
                      </h2>
                      <Badge
                        size="sm"
                        color={
                          selected.plan === "Enterprise"
                            ? "rose"
                            : selected.plan === "Business"
                              ? "violet"
                              : selected.plan === "Growth"
                                ? "sky"
                                : "base"
                        }
                        className="shrink-0"
                      >
                        <Crown className="w-3 h-3" /> {selected.plan}
                      </Badge>
                      <span
                        className={clsx(
                          "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md",
                          selected.status === "active"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
                        )}
                      >
                        {selected.status === "active" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {selected.status}
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Mail className="w-3.5 h-3.5" />
                      <a
                        href={`mailto:${selected.email}`}
                        className="hover:text-indigo-500 truncate"
                      >
                        {selected.email}
                      </a>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Building2 className="w-3.5 h-3.5" /> {selected.company}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5" /> Customer since{" "}
                      {formatDate(selected.customerSince)}
                    </div>
                  </div>
                  <Dropdown
                    align="end"
                    trigger={
                      <button className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 -m-1.5">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    }
                    items={[
                      {
                        label: "Contact customer",
                        onClick: () =>
                          toast.info(`Compose email to ${selected.name}`),
                      },
                      { label: "View all tickets", onClick: () => {} },
                      { separator: true },
                      {
                        label: "Mark as inactive",
                        danger: true,
                        onClick: () =>
                          toast.warning("Cannot update status in demo"),
                      },
                    ]}
                  />
                </div>

                {/* Stats */}
                <div className="relative mt-5 grid grid-cols-4 gap-3">
                  {[
                    {
                      label: "Conversations",
                      value: selConvos.length || selected.totalTickets,
                      icon: MessageSquare,
                      color: "sky",
                    },
                    {
                      label: "Open tickets",
                      value: selected.openTickets,
                      icon: Ticket,
                      color: "rose",
                    },
                    {
                      label: "Resolved",
                      value: selected.resolvedTickets,
                      icon: CheckCircle2,
                      color: "emerald",
                    },
                    {
                      label: "Avg. Resp.",
                      value: selected.avgResponseTime + "m",
                      icon: Clock,
                      color: "violet",
                    },
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.label}
                        className="rounded-lg bg-slate-50/60 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 p-2.5"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div
                            className={clsx(
                              "w-7 h-7 rounded-md flex items-center justify-center",
                              s.color === "sky"
                                ? "bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400"
                                : s.color === "rose"
                                  ? "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400"
                                  : s.color === "emerald"
                                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
                                    : "bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400",
                            )}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                        </div>
                        <div className="text-base font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                          {s.value}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                          {s.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-slate-100 dark:border-slate-800 px-3 md:px-5 pt-3">
                <Tabs
                  tabs={[
                    {
                      label: "Overview",
                      value: "overview",
                      icon: <Activity className="w-3.5 h-3.5" />,
                    },
                    {
                      label: "Tickets",
                      value: "tickets",
                      icon: <Ticket className="w-3.5 h-3.5" />,
                    },
                    {
                      label: "Activity",
                      value: "activity",
                      icon: <MessageSquare className="w-3.5 h-3.5" />,
                    },
                  ]}
                  active={tab}
                  onChange={setTab}
                  className="bg-transparent p-0 -mb-px"
                />
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-thin p-4 md:p-5 min-h-0">
                {tab === "overview" && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                        Open tickets
                      </h3>
                      {selTickets.filter((t) => t.status !== "Resolved")
                        .length === 0 ? (
                        <div className="rounded-lg border border-dashed border-slate-200 dark:border-slate-800 p-4 text-xs text-slate-500 dark:text-slate-400 text-center">
                          No open tickets — all caught up!
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {selTickets
                            .filter((t) => t.status !== "Resolved")
                            .slice(0, 5)
                            .map((t) => (
                              <div
                                key={t.id}
                                className="rounded-lg border border-slate-100 dark:border-slate-800 p-3 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span className="font-mono text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 shrink-0">
                                      {t.id}
                                    </span>
                                    <Badge
                                      priority={t.priority}
                                      size="xs"
                                      dot
                                    />
                                  </div>
                                  <Badge status={t.status} size="xs" />
                                </div>
                                <div className="mt-1.5 text-xs text-slate-800 dark:text-slate-100 line-clamp-2">
                                  {t.subject}
                                </div>
                                <div className="mt-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                                  {formatRelative(t.updatedAt)} · Assigned to{" "}
                                  {t.assignee}
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                        Recent conversations
                      </h3>
                      {selConvos.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-slate-200 dark:border-slate-800 p-4 text-xs text-slate-500 dark:text-slate-400 text-center">
                          No conversations with this customer yet.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {selConvos.slice(0, 5).map((c) => (
                            <div
                              key={c.id}
                              className="rounded-lg border border-slate-100 dark:border-slate-800 p-3"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <Badge status={c.status} size="xs" />
                                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                    {formatRelative(c.timestamp)}
                                  </span>
                                </div>
                                <Avatar
                                  name={c.assignee}
                                  seed={c.assignee}
                                  size="xs"
                                />
                              </div>
                              <div className="mt-1.5 text-xs text-slate-700 dark:text-slate-200 line-clamp-2">
                                {c.preview}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {tab === "tickets" && (
                  <div className="space-y-2">
                    {selTickets.length === 0 ? (
                      <EmptyState
                        title="No tickets"
                        description={`${selected.name} has not filed any tickets yet.`}
                      />
                    ) : (
                      selTickets.map((t) => (
                        <div
                          key={t.id}
                          className="rounded-lg border border-slate-100 dark:border-slate-800 p-3 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                                <span className="font-mono text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                                  {t.id}
                                </span>
                                <Badge status={t.status} size="xs" />
                                <Badge priority={t.priority} size="xs" dot />
                              </div>
                              <div className="text-xs font-medium text-slate-800 dark:text-slate-100 leading-snug">
                                {t.subject}
                              </div>
                              {t.description && (
                                <div className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                                  {t.description}
                                </div>
                              )}
                              <div className="mt-2 flex items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400">
                                <span>Created {formatDate(t.createdAt)}</span>
                                <span>· Assigned to {t.assignee}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {tab === "activity" && (
                  <div className="space-y-3 pl-4 border-l-2 border-slate-100 dark:border-slate-800">
                    {selConvos.length === 0 && selTickets.length === 0 ? (
                      <div className="text-xs text-slate-500 dark:text-slate-400 -ml-4">
                        No activity recorded yet.
                      </div>
                    ) : (
                      [
                        ...selTickets.map((t) => ({
                          type: "ticket",
                          id: t.id,
                          time: t.createdAt,
                          status: t.status,
                          title: t.subject,
                          assignee: t.assignee,
                        })),
                        ...selConvos.map((c) => ({
                          type: "conversation",
                          id: c.id,
                          time: c.timestamp,
                          status: c.status,
                          title: c.preview,
                          assignee: c.assignee,
                        })),
                      ]
                        .sort((a, b) => new Date(b.time) - new Date(a.time))
                        .slice(0, 15)
                        .map((e, i) => {
                          const Icon =
                            e.type === "ticket" ? Ticket : MessageSquare;
                          return (
                            <div
                              key={`${e.type}-${e.id}-${i}`}
                              className="relative"
                            >
                              <div
                                className={clsx(
                                  "absolute -left-[21px] w-4 h-4 rounded-full ring-2 ring-white dark:ring-slate-900 bg-white dark:bg-slate-900 flex items-center justify-center",
                                  e.type === "ticket"
                                    ? "text-indigo-500"
                                    : "text-emerald-500",
                                )}
                              >
                                <Icon className="w-3 h-3" />
                              </div>
                              <div className="text-xs">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="font-medium text-slate-800 dark:text-slate-100 capitalize">
                                    {e.type}
                                  </span>
                                  <Badge status={e.status} size="xs" />
                                  {e.type === "ticket" && (
                                    <span className="font-mono text-[10px] text-indigo-500">
                                      {e.id}
                                    </span>
                                  )}
                                </div>
                                <div className="mt-0.5 text-slate-600 dark:text-slate-300 line-clamp-2">
                                  {e.title}
                                </div>
                                <div className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                                  <Clock className="w-2.5 h-2.5" />{" "}
                                  {formatRelative(e.time)}
                                  <span>· Handled by {e.assignee}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="h-full min-h-[500px]">
              <EmptyState
                icon={Users}
                title="Select a customer"
                description="Pick a customer from the list to view their profile, tickets, and activity."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

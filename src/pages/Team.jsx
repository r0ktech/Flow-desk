import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  UserPlus,
  Users,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  X,
  Mail,
  MoreHorizontal,
  MailCheck,
  Trash2,
  Ticket as TicketIcon,
  Clock,
  Star,
  Edit2,
  UserCog,
} from "lucide-react";
import clsx from "clsx";
import SearchInput from "../components/ui/SearchInput";
import Badge from "../components/ui/Badge";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Dropdown from "../components/ui/Dropdown";
import EmptyState from "../components/ui/EmptyState";
import { useAppState } from "../context/AppStateContext";
import { useToast } from "../context/ToastContext";

const roles = [
  {
    value: "Admin",
    label: "Admin",
    description: "Full access to everything",
    icon: ShieldAlert,
    color: "rose",
  },
  {
    value: "Manager",
    label: "Manager",
    description: "Manage team and tickets",
    icon: ShieldCheck,
    color: "violet",
  },
  {
    value: "Support Agent",
    label: "Support Agent",
    description: "Handle support tickets only",
    icon: Shield,
    color: "sky",
  },
];

export default function TeamPage() {
  const [params] = useSearchParams();
  const { team, addTeamMember } = useAppState();
  const toast = useToast();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Support Agent",
  });

  useEffect(() => {
    if (params.get("add") === "1") setAddOpen(true);
  }, [params]);

  const filtered = team
    .filter((m) => {
      if (roleFilter !== "all" && m.role !== roleFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!`${m.name} ${m.email} ${m.role}`.toLowerCase().includes(q))
          return false;
      }
      return true;
    })
    .sort((a, b) => {
      const order = { Admin: 0, Manager: 1, "Support Agent": 2 };
      if (order[a.role] !== order[b.role]) return order[a.role] - order[b.role];
      return b.ticketsHandled - a.ticketsHandled;
    });

  const submitAdd = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    const member = addTeamMember({
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
    });
    toast.success(`${member.name} added to team`);
    setAddOpen(false);
    setForm({ name: "", email: "", role: "Support Agent" });
  };

  return (
    <div className="p-4 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <UserCog className="w-6 h-6 text-indigo-500" /> Team
          </h1>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            {team.length} team members across 3 roles
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-9 px-3 rounded-md text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2c9b7a]"
          >
            <option value="all">All roles</option>
            {roles.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          <Button
            variant="primary"
            icon={<UserPlus className="w-4 h-4" />}
            onClick={() => setAddOpen(true)}
          >
            Add member
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {roles.map((r) => {
          const count = team.filter((m) => m.role === r.value).length;
          const Icon = r.icon;
          return (
            <div
              key={r.value}
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center gap-4"
            >
              <div
                className={clsx(
                  "w-12 h-12 rounded-lg flex items-center justify-center",
                  r.color === "rose"
                    ? "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400"
                    : r.color === "violet"
                      ? "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400"
                      : "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400",
                )}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">
                  {r.label}
                  {r.value !== "Admin" && "s"}
                </div>
                <div className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                  {count}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and card grid */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 space-y-4">
        <div className="max-w-md">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search team members..."
            onClear={setSearch}
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No team members match"
            description="Try clearing the search or filters."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((m) => {
              const roleMeta =
                roles.find((r) => r.value === m.role) || roles[2];
              const barWidth = Math.round(
                (m.ticketsHandled /
                  Math.max(...team.map((t) => t.ticketsHandled))) *
                  100,
              );
              return (
                <div
                  key={m.id}
                  className="rounded-lg border border-slate-100 dark:border-slate-800 p-4 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-3">
                    <Avatar
                      name={m.name}
                      seed={m.avatarSeed}
                      size="lg"
                      status={m.status}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                            {m.name}
                          </div>
                          <a
                            href={`mailto:${m.email}`}
                            className="text-xs text-slate-500 dark:text-slate-400 truncate block mt-0.5 hover:text-indigo-500 flex items-center gap-1"
                          >
                            <Mail className="w-3 h-3" />
                            <span className="truncate">{m.email}</span>
                          </a>
                        </div>
                        <Dropdown
                          align="end"
                          trigger={
                            <button className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 -mr-1">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          }
                          items={[
                            {
                              label: "Edit profile",
                              icon: <Edit2 className="w-4 h-4" />,
                              onClick: () =>
                                toast.info("Editing not available in demo"),
                            },
                            {
                              label: "View tickets",
                              icon: <TicketIcon className="w-4 h-4" />,
                              onClick: () => {},
                            },
                            {
                              label: "Send reset email",
                              icon: <MailCheck className="w-4 h-4" />,
                              onClick: () =>
                                toast.success(
                                  `Password reset email sent to ${m.name}`,
                                ),
                            },
                            { separator: true },
                            {
                              label: "Remove from team",
                              danger: true,
                              icon: <Trash2 className="w-4 h-4" />,
                              onClick: () =>
                                toast.warning("Cannot remove members in demo"),
                            },
                          ]}
                        />
                      </div>
                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        <Badge
                          size="xs"
                          color={
                            m.role === "Admin"
                              ? "rose"
                              : m.role === "Manager"
                                ? "violet"
                                : "sky"
                          }
                        >
                          {m.role}
                        </Badge>
                        <span
                          className={clsx(
                            "inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded-md",
                            m.status === "online" &&
                              "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
                            m.status === "busy" &&
                              "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
                            m.status === "away" &&
                              "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400",
                            m.status === "offline" &&
                              "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
                          )}
                        >
                          <span
                            className={clsx(
                              "w-1.5 h-1.5 rounded-full",
                              m.status === "online" && "bg-emerald-500",
                              m.status === "busy" && "bg-amber-500",
                              m.status === "away" && "bg-orange-500",
                              m.status === "offline" && "bg-slate-400",
                            )}
                          />
                          {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500 font-medium">
                        Tickets
                      </div>
                      <div className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-slate-100 tabular-nums flex items-center gap-1">
                        <TicketIcon className="w-3.5 h-3.5 text-slate-400" />
                        {m.ticketsHandled}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500 font-medium">
                        Avg resp.
                      </div>
                      <div className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-slate-100 tabular-nums flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {m.avgResponseTime}m
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500 font-medium">
                        CSAT
                      </div>
                      <div className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-slate-100 tabular-nums flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        {m.csat}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mb-1">
                      <span>Contribution</span>
                      <span className="tabular-nums">{barWidth}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${barWidth}%`,
                          background:
                            m.role === "Admin"
                              ? "linear-gradient(90deg, #f43f5e, #e11d48)"
                              : m.role === "Manager"
                                ? "linear-gradient(90deg, #8b5cf6, #7c3aed)"
                                : "linear-gradient(90deg, #0ea5e9, #0284c7)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add member modal */}
      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add team member"
        description="Invite a new member to your workspace."
        footer={
          <>
            <Button variant="ghost" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={submitAdd}
              icon={<UserPlus className="w-4 h-4" />}
              disabled={!form.name.trim() || !form.email.trim()}
            >
              Send invitation
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
            <div className="w-10 h-10 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="text-xs text-indigo-900 dark:text-indigo-200">
              <div className="font-medium">
                An invitation email will be sent
              </div>
              <div className="mt-0.5 text-indigo-700/80 dark:text-indigo-300/80">
                New members must accept the invite before joining the workspace.
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                Full name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Sarah Johnson"
                className="w-full h-9 px-3 rounded-md text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2c9b7a] text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                Work email *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="sarah@company.com"
                className="w-full h-9 px-3 rounded-md text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2c9b7a] text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-2">
                Role
              </label>
              <div className="space-y-2">
                {roles.map((r) => {
                  const Icon = r.icon;
                  const selected = form.role === r.value;
                  return (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setForm({ ...form, role: r.value })}
                      className={clsx(
                        "w-full text-left p-3 rounded-lg border transition-all flex items-start gap-3",
                        selected
                          ? "border-indigo-400 dark:border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20"
                          : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60",
                      )}
                    >
                      <div
                        className={clsx(
                          "w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0",
                          selected
                            ? r.color === "rose"
                              ? "bg-rose-100 text-rose-600 dark:bg-rose-900/60 dark:text-rose-300"
                              : r.color === "violet"
                                ? "bg-violet-100 text-violet-600 dark:bg-violet-900/60 dark:text-violet-300"
                                : "bg-sky-100 text-sky-600 dark:bg-sky-900/60 dark:text-sky-300"
                            : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
                        )}
                      >
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {r.label}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {r.description}
                        </div>
                      </div>
                      <div
                        className={clsx(
                          "w-4 h-4 rounded-full border-2 mt-1 flex items-center justify-center flex-shrink-0",
                          selected
                            ? "border-indigo-500 bg-indigo-500"
                            : "border-slate-300 dark:border-slate-600",
                        )}
                      >
                        {selected && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

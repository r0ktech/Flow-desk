import { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Building2,
  Bell,
  Sun,
  Moon,
  Monitor,
  Camera,
  Mail,
  FileText,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Globe,
  Clock3,
  Link2,
  X,
} from 'lucide-react';
import clsx from 'clsx';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Toggle from '../components/ui/Toggle';
import Input from '../components/ui/Input';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

const sections = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'workspace', label: 'Workspace', icon: Building2 },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'appearance', label: 'Appearance', icon: Monitor },
];

export default function SettingsPage() {
  const [active, setActive] = useState('profile');
  const { theme, setTheme } = useTheme();
  const toast = useToast();

  const [profile, setProfile] = useState({ name: 'Alex Chen', email: 'alex@flowdesk.co', role: 'Admin' });
  const [profileDirty, setProfileDirty] = useState(false);
  const updateProfile = (updates) => { setProfile({ ...profile, ...updates }); setProfileDirty(true); };
  const saveProfile = () => { toast.success('Profile updated successfully'); setProfileDirty(false); };

  const [workspace, setWorkspace] = useState({ name: 'Flowdesk Support', url: 'flowdesk.flowdesk.co', timezone: 'UTC-08:00 Pacific Time (Los Angeles)' });
  const saveWorkspace = () => { toast.success('Workspace settings saved'); };

  const [notifications, setNotifications] = useState({
    email: true,
    desktop: false,
    assignment: true,
    mentions: true,
    weeklyReport: true,
    productUpdates: false,
  });

  return (
    <div className="p-4 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-indigo-500" /> Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your profile, workspace, and preferences.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Side nav */}
        <nav className="lg:w-56 flex-shrink-0">
          <div className="flex lg:flex-col gap-1 p-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.key} onClick={() => setActive(s.key)}
                  className={clsx(
                    'flex-shrink-0 lg:w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors text-left whitespace-nowrap',
                    active === s.key
                      ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/60'
                  )}
                >
                  <Icon className={clsx('w-4 h-4', active === s.key ? 'text-indigo-500' : 'text-slate-400')} />
                  <span className="flex-1">{s.label}</span>
                  <ChevronRight className={clsx('w-4 h-4 lg:hidden transition-transform', active === s.key && 'rotate-90')} />
                </button>
              );
            })}
          </div>
        </nav>

        <div className="flex-1 min-w-0 space-y-5">
          {active === 'profile' && (
            <Section title="Profile" description="Information about you and how it appears across Flowdesk.">
              <div className="space-y-6">
                <div className="flex items-start gap-5 p-4 rounded-lg bg-slate-50/70 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800">
                  <Avatar name={profile.name} seed="alex" size="2xl" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{profile.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{profile.email}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                        <Camera className="w-3.5 h-3.5" /> Upload new photo
                      </button>
                      <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                        <X className="w-3.5 h-3.5" /> Remove photo
                      </button>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">JPG, PNG or GIF. Max 2MB.</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full name">
                    <Input value={profile.name} onChange={(v) => updateProfile({ name: v })} />
                  </Field>
                  <Field label="Email address">
                    <Input value={profile.email} type="email" onChange={(v) => updateProfile({ email: v })} />
                  </Field>
                  <Field label="Role">
                    <div className="h-9 px-3 rounded-md bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-sm">
                      <Badge size="xs" color="rose">Admin</Badge>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Managed by owner</span>
                    </div>
                  </Field>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {profileDirty ? 'You have unsaved changes' : 'All changes saved'}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" disabled={!profileDirty}>Discard</Button>
                    <Button variant="primary" size="sm" onClick={saveProfile} disabled={!profileDirty}>Save changes</Button>
                  </div>
                </div>
              </div>
            </Section>
          )}

          {active === 'workspace' && (
            <Section title="Workspace" description="Information about your organization and how your team uses Flowdesk.">
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Workspace name" hint="Shown in the sidebar and emails">
                    <Input value={workspace.name} onChange={(v) => setWorkspace({ ...workspace, name: v })} />
                  </Field>
                  <Field label="Workspace URL" hint="Your custom Flowdesk domain">
                    <div className="relative">
                      <Input value={workspace.url} onChange={(v) => setWorkspace({ ...workspace, url: v })} icon={<Link2 className="w-4 h-4" />} />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Badge size="xs" color="emerald"><CheckCircle2 className="w-3 h-3" /> Verified</Badge>
                      </div>
                    </div>
                  </Field>
                  <Field label="Default timezone" hint="Used for schedules and reports">
                    <select
                      value={workspace.timezone}
                      onChange={(e) => setWorkspace({ ...workspace, timezone: e.target.value })}
                      className="w-full h-9 px-3 rounded-md text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {[
                        'UTC-11:00 Pacific/Midway',
                        'UTC-10:00 Hawaii/Honolulu',
                        'UTC-09:00 Alaska/Anchorage',
                        'UTC-08:00 Pacific Time (Los Angeles)',
                        'UTC-07:00 Mountain Time (Denver)',
                        'UTC-06:00 Central Time (Chicago)',
                        'UTC-05:00 Eastern Time (New York)',
                        'UTC-04:00 Atlantic Time (Halifax)',
                        'UTC-03:00 Sao Paulo',
                        'UTC+00:00 Greenwich Mean Time',
                        'UTC+01:00 Central European Time',
                        'UTC+02:00 Eastern European Time',
                        'UTC+03:00 Moscow',
                        'UTC+05:30 India Standard Time',
                        'UTC+08:00 Singapore/Hong Kong',
                        'UTC+09:00 Tokyo',
                        'UTC+10:00 Sydney',
                      ].map((tz) => <option key={tz} value={tz}>{tz}</option>)}
                    </select>
                  </Field>
                  <Field label="Default language" hint="Language for emails and UI">
                    <select
                      defaultValue="en-US"
                      className="w-full h-9 px-3 rounded-md text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {[
                        ['en-US', 'English (United States)'],
                        ['en-GB', 'English (United Kingdom)'],
                        ['es-ES', 'Spanish (Spain)'],
                        ['fr-FR', 'French (France)'],
                        ['de-DE', 'German (Germany)'],
                        ['ja-JP', 'Japanese'],
                        ['pt-BR', 'Portuguese (Brazil)'],
                      ].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </Field>
                </div>

                <div className="rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/30 p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-amber-800 dark:text-amber-300">Danger zone</div>
                    <div className="text-[11px] text-amber-700/80 dark:text-amber-300/80 mt-0.5 mb-2">
                      Deleting this workspace will permanently remove all tickets, customers, and team data. This action cannot be undone.
                    </div>
                    <Button size="xs" variant="danger">Delete workspace</Button>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Button variant="ghost" size="sm">Discard</Button>
                  <Button variant="primary" size="sm" onClick={saveWorkspace}>Save changes</Button>
                </div>
              </div>
            </Section>
          )}

          {active === 'notifications' && (
            <Section title="Notifications" description="Decide what updates and activities you want to receive.">
              <div className="rounded-lg border border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
                <div className="p-4 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-md bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Email notifications</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Receive updates about tickets, mentions, and activity via email.
                      </div>
                    </div>
                  </div>
                  <Toggle checked={notifications.email} onChange={(v) => setNotifications({ ...notifications, email: v })} />
                </div>
                <div className="p-4 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-md bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center flex-shrink-0">
                      <Monitor className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Desktop notifications</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Receive push notifications directly to your desktop when Flowdesk is open.
                      </div>
                    </div>
                  </div>
                  <Toggle checked={notifications.desktop} onChange={(v) => setNotifications({ ...notifications, desktop: v })} />
                </div>
                <div className="p-4 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                      <User className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Ticket assignments</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Get notified when a new ticket is assigned to you or to your team.
                      </div>
                    </div>
                  </div>
                  <Toggle checked={notifications.assignment} onChange={(v) => setNotifications({ ...notifications, assignment: v })} />
                </div>
                <div className="p-4 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                      <Bell className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Mentions and replies</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Be notified when someone mentions you in notes or replies to your messages.
                      </div>
                    </div>
                  </div>
                  <Toggle checked={notifications.mentions} onChange={(v) => setNotifications({ ...notifications, mentions: v })} />
                </div>
                <div className="p-4 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Weekly reports</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Get a summary of your team's performance delivered every Monday morning.
                      </div>
                    </div>
                  </div>
                  <Toggle checked={notifications.weeklyReport} onChange={(v) => setNotifications({ ...notifications, weeklyReport: v })} />
                </div>
                <div className="p-4 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Product updates</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Occasionally receive emails about new features and product improvements.
                      </div>
                    </div>
                  </div>
                  <Toggle checked={notifications.productUpdates} onChange={(v) => setNotifications({ ...notifications, productUpdates: v })} />
                </div>
              </div>
            </Section>
          )}

          {active === 'appearance' && (
            <Section title="Appearance" description="Customize how Flowdesk looks on your device. Changes sync across browsers.">
              <div>
                <div className="text-xs font-medium text-slate-700 dark:text-slate-200 mb-3">Theme</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { key: 'light', label: 'Light', desc: 'Clean and bright', icon: Sun, preview: 'bg-gradient-to-br from-slate-50 to-white border-slate-200', accent: 'bg-indigo-500' },
                    { key: 'dark', label: 'Dark', desc: 'Easy on the eyes', icon: Moon, preview: 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-700', accent: 'bg-indigo-400' },
                    { key: 'system', label: 'System', desc: 'Follows device', icon: Monitor, preview: 'bg-gradient-to-br from-white via-slate-100 to-slate-900 border-slate-300', accent: 'bg-slate-500' },
                  ].map((t) => {
                    const Icon = t.icon;
                    const selected = theme === t.key;
                    return (
                      <button
                        key={t.key} onClick={() => setTheme(t.key)}
                        className={clsx(
                          'p-3 rounded-xl border text-left transition-all',
                          selected
                            ? 'border-indigo-500 ring-2 ring-indigo-500/30 shadow-md'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm'
                        )}
                      >
                        <div className={clsx('h-24 rounded-lg border p-2 overflow-hidden mb-3', t.preview)}>
                          <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-full bg-rose-400/60" />
                            <div className="w-3 h-3 rounded-full bg-amber-400/60" />
                            <div className="w-3 h-3 rounded-full bg-emerald-400/60" />
                          </div>
                          <div className="mt-3 space-y-1">
                            <div className={clsx('h-1.5 w-12 rounded-sm', t.accent)} />
                            <div className="h-1 w-24 rounded-sm bg-slate-300/40 dark:bg-slate-500/30" />
                            <div className="h-1 w-20 rounded-sm bg-slate-300/40 dark:bg-slate-500/30" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className={clsx('w-4 h-4', selected ? 'text-indigo-500' : 'text-slate-400')} />
                            <div>
                              <div className={clsx('text-sm font-medium', selected ? 'text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-200')}>{t.label}</div>
                            </div>
                          </div>
                          <div className={clsx(
                            'w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                            selected ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300 dark:border-slate-600'
                          )}>
                            {selected && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
                          </div>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 pl-6">{t.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8">
                <div className="text-xs font-medium text-slate-700 dark:text-slate-200 mb-3">Density</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { key: 'compact', label: 'Compact', desc: 'More content, less spacing' },
                    { key: 'comfortable', label: 'Comfortable', desc: 'Balanced spacing' },
                    { key: 'spacious', label: 'Spacious', desc: 'Larger targets and padding' },
                  ].map((t, i) => (
                    <button
                      key={t.key}
                      className={clsx(
                        'p-3 rounded-lg border text-left transition-all',
                        i === 1
                          ? 'border-indigo-500 ring-2 ring-indigo-500/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      )}
                    >
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{t.label}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-lg bg-slate-50/70 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 p-4 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Clock3 className="w-4 h-4 flex-shrink-0" />
                Appearance preferences are saved locally and applied to this browser automatically.
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, description, children }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 md:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{description}</p>
      </div>
      {children}
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">{label}</label>
      {children}
      {hint && <div className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-1.5">{hint}</div>}
    </div>
  );
}

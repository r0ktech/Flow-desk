import { Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';
import Overview from './pages/Overview';
import InboxPage from './pages/Inbox';
import TicketsPage from './pages/Tickets';
import CustomersPage from './pages/Customers';
import AnalyticsPage from './pages/Analytics';
import TeamPage from './pages/Team';
import SettingsPage from './pages/Settings';
import EmptyState from './components/ui/EmptyState';
import { HelpCircle, FileQuestion } from 'lucide-react';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={
          <div className="p-4 lg:p-8 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-sky-50 dark:bg-sky-950/40 text-sky-500 flex items-center justify-center mb-4">
                  <HelpCircle className="w-7 h-7" />
                </div>
                <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Help Center</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 max-w-md">
                  Quick guide to using Flowdesk support operations platform. Documentation and best practices.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: 'Getting Started', desc: 'Set up your workspace, invite team, configure channels' },
                  { title: 'Inbox Basics', desc: 'Triaging conversations, assigning, using macros and snippets' },
                  { title: 'Ticket Workflows', desc: 'Statuses, priorities, SLAs, automations and tags' },
                  { title: 'Customer Profiles', desc: 'Organization data, plans, custom fields and segments' },
                  { title: 'Reports & Analytics', desc: 'CSAT, response time, agent performance and exports' },
                  { title: 'Security & Permissions', desc: 'Roles, SSO, audit logs and data retention' },
                ].map((d) => (
                  <button key={d.title} className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-left transition-colors">
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{d.title}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{d.desc}</div>
                  </button>
                ))}
              </div>
              <div className="mt-6 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 p-4">
                <div className="flex items-start gap-3">
                  <FileQuestion className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Can't find what you need?</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Email our support team directly at <a href="mailto:support@flowdesk.co" className="text-indigo-600 dark:text-indigo-400 hover:underline">support@flowdesk.co</a>.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        } />
        <Route path="*" element={
          <div className="h-full"><EmptyState title="Page not found" description="The page you're looking for doesn't exist or has been moved." /></div>
        } />
      </Routes>
    </AppShell>
  );
}

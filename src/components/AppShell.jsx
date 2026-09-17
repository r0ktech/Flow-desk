import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // Topbar search modal listens for this via its trigger - we simulate a click via window
        const evt = new CustomEvent('flowdesk:open-search');
        window.dispatchEvent(evt);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} mobile />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className={clsx('flex-1 overflow-y-auto scrollbar-thin min-w-0')}>
          <div className="min-h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}

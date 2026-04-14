import { useState, useEffect } from 'react';
import type { Bootcamp } from '@/content/types';
import AppSidebar from './AppSidebar';
import { cn } from '@/lib/utils';

interface Props {
  bootcamp: Bootcamp;
  children: React.ReactNode;
}

export default function AppShell({ bootcamp, children }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Auto-open on desktop
  useEffect(() => {
    const handle = () => setIsOpen(window.innerWidth >= 768);
    handle();
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  return (
    <div className="flex min-h-screen">
      <AppSidebar
        bootcamp={bootcamp}
        isCollapsed={isCollapsed}
        isOpen={isOpen}
        onToggleCollapse={() => setIsCollapsed(c => !c)}
        onToggleMobile={() => setIsOpen(o => !o)}
      />
      <div className={cn(
        'flex-1 min-w-0 transition-all duration-300',
      )}>
        {children}
      </div>
    </div>
  );
}

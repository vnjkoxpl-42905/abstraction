import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Check,
} from 'lucide-react';
import type { Bootcamp } from '@/content/types';
import { useProgress } from '@/lib/progress';
import { cn } from '@/lib/utils';

interface Props {
  bootcamp: Bootcamp;
  isCollapsed: boolean;
  isOpen: boolean;
  onToggleCollapse: () => void;
  onToggleMobile: () => void;
}

export default function AppSidebar({
  bootcamp,
  isCollapsed,
  isOpen,
  onToggleCollapse,
  onToggleMobile,
}: Props) {
  const { state, getModule } = useProgress(bootcamp);
  const { pathname } = useLocation();
  const ordered = [...bootcamp.modules].sort((a, b) => a.order - b.order);

  // Parse active module and section from route
  const parts = pathname.split('/').filter(Boolean);
  const activeModuleSlug = parts[0] === 'm' ? parts[1] : null;
  const activeSectionSlug = parts[2]; // section slug, 'lsat', 'complete', or undefined

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={onToggleMobile}
        className="fixed top-4 left-4 z-50 p-2.5 rounded-lg bg-white shadow-md border border-ink-200 md:hidden"
        aria-label="Toggle navigation"
      >
        {isOpen
          ? <X className="h-4 w-4 text-ink-600" />
          : <Menu className="h-4 w-4 text-ink-600" />
        }
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
          onClick={onToggleMobile}
        />
      )}

      {/* Sidebar panel */}
      <div className={cn(
        'fixed top-0 left-0 h-full bg-white border-r border-ink-200 z-40 flex flex-col transition-all duration-300 ease-in-out',
        'md:translate-x-0 md:static md:z-auto',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        isCollapsed ? 'w-[72px]' : 'w-[260px]',
      )}>

        {/* Logo + collapse toggle */}
        <div className={cn(
          'flex items-center border-b border-ink-200 h-14 px-4 shrink-0',
          isCollapsed ? 'justify-center' : 'justify-between',
        )}>
          {!isCollapsed && (
            <Link to="/" className="flex items-center gap-2 text-ink-900 min-w-0">
              <Logo />
              <span className="font-semibold tracking-tight truncate">Abstraction</span>
            </Link>
          )}
          {isCollapsed && (
            <Link to="/" aria-label="Dashboard">
              <Logo />
            </Link>
          )}
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex shrink-0 p-1.5 rounded-md hover:bg-ink-100 transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed
              ? <ChevronRight className="h-4 w-4 text-ink-400" />
              : <ChevronLeft className="h-4 w-4 text-ink-400" />
            }
          </button>
        </div>

        {/* Nav section label */}
        {!isCollapsed && (
          <div className="px-4 pt-5 pb-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-400">
              Modules
            </span>
          </div>
        )}

        {/* Module list */}
        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
          {ordered.map((module) => {
            const mp = getModule(module.slug);
            const { status } = mp;
            const done = mp.sectionsCompleted.length;
            const total = module.sections.length;
            const locked = status === 'locked';
            const completed = status === 'completed';
            const isActive = module.slug === activeModuleSlug;

            // Icon for status
            const StatusIcon = completed
              ? CheckCircle2
              : locked
                ? Lock
                : BookOpen;

            const moduleItem = (
              <div
                className={cn(
                  'group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13.5px] transition-colors relative',
                  locked
                    ? 'opacity-40 cursor-not-allowed'
                    : isActive
                      ? 'bg-ink-100 text-ink-900'
                      : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900 cursor-pointer',
                  isCollapsed && 'justify-center px-0',
                )}
              >
                <StatusIcon
                  size={15}
                  className={cn(
                    'shrink-0',
                    completed ? 'text-ok' : locked ? 'text-ink-400' : isActive ? 'text-ink-900' : 'text-ink-400 group-hover:text-ink-700',
                  )}
                />
                {!isCollapsed && (
                  <>
                    <span className={cn('flex-1 leading-snug truncate', isActive && 'font-medium')}>
                      {module.title}
                    </span>
                    <span className={cn(
                      'text-[11px] tabular-nums shrink-0',
                      completed ? 'text-ok' : 'text-ink-400',
                    )}>
                      {completed ? '✓' : `${done}/${total}`}
                    </span>
                  </>
                )}

                {/* Tooltip when collapsed */}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-ink-900 text-white text-[12px] rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                    {module.title}
                    <span className="ml-2 text-ink-400">{done}/{total}</span>
                  </div>
                )}
              </div>
            );

            return (
              <div key={module.slug}>
                {locked
                  ? <div>{moduleItem}</div>
                  : <Link to={`/m/${module.slug}`}>{moduleItem}</Link>
                }

                {/* Section sub-list — only shown when this module is active and sidebar is expanded */}
                {isActive && !isCollapsed && (
                  <ol className="mt-0.5 ml-7 mb-1 space-y-0.5 border-l border-ink-100 pl-3">
                    {module.sections.map((s, i) => {
                      const sectionActive = s.slug === activeSectionSlug;
                      const sectionDone = mp.sectionsCompleted.includes(s.slug);
                      return (
                        <li key={s.slug}>
                          <Link
                            to={`/m/${module.slug}/${s.slug}`}
                            className={cn(
                              'flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[12.5px] leading-snug transition-colors',
                              sectionActive
                                ? 'bg-ink-900 text-white'
                                : 'text-ink-500 hover:bg-ink-100 hover:text-ink-900',
                            )}
                          >
                            <span className={cn('tabular-nums text-[10px] w-4 shrink-0', sectionActive ? 'opacity-70' : 'opacity-40')}>
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="flex-1 leading-snug">{s.title}</span>
                            {sectionDone && !sectionActive && (
                              <Check size={10} className="shrink-0 text-ok" strokeWidth={2.5} />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                    <li className="pt-1 mt-1 border-t border-ink-100">
                      <Link
                        to={`/m/${module.slug}/lsat`}
                        className={cn(
                          'flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[12.5px] leading-snug transition-colors',
                          activeSectionSlug === 'lsat'
                            ? 'bg-ink-900 text-white'
                            : 'text-ink-500 hover:bg-ink-100 hover:text-ink-900',
                        )}
                      >
                        <span className="tabular-nums text-[10px] w-4 shrink-0 opacity-40">LS</span>
                        <span>LSAT set</span>
                      </Link>
                    </li>
                  </ol>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom: Dashboard link */}
        <div className="shrink-0 border-t border-ink-200 p-2">
          <Link
            to="/"
            className={cn(
              'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-ink-500 hover:bg-ink-50 hover:text-ink-900 transition-colors',
              isCollapsed && 'justify-center',
              pathname === '/' && 'bg-ink-100 text-ink-900',
            )}
          >
            <svg width="15" height="15" viewBox="0 0 22 22" fill="none" className="shrink-0">
              <rect x="2" y="2" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 14 L11 7 L15 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.5 11.5 H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {!isCollapsed && <span>Dashboard</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-ink-900 text-white text-[12px] rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                Dashboard
              </div>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}

function Logo() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0">
      <rect x="2" y="2" width="18" height="18" rx="5" stroke="#0F0F0E" strokeWidth="1.5"/>
      <path d="M7 14 L11 7 L15 14" stroke="#0F0F0E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 11.5 H13.5" stroke="#0F0F0E" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

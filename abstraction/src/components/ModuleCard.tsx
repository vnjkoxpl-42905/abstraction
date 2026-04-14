import { Link } from 'react-router-dom';
import { BookOpen, Eye, HelpCircle, Network, Zap, Lock, CheckCircle2 } from 'lucide-react';
import type { Module } from '@/content/types';
import type { ModuleProgress } from '@/lib/progress';
import { cn } from '@/lib/utils';

interface Props {
  module: Module;
  progress: ModuleProgress;
  span?: string;
  animationDelay?: string;
  isVisible?: boolean;
}

const MODULE_ICONS = [BookOpen, Eye, HelpCircle, Network, Zap];
const MODULE_ANIMATIONS = [
  'bento2-float 6s ease-in-out infinite',
  'bento2-pulse 4s ease-in-out infinite',
  'bento2-tilt 5.5s ease-in-out infinite',
  'bento2-drift 8s ease-in-out infinite',
  'bento2-glow 7s ease-in-out infinite',
];

const statusMeta: Record<string, string> = {
  locked: 'Locked',
  unlocked: 'Ready',
  in_progress: 'In Progress',
  completed: 'Complete',
};

export default function ModuleCard({ module, progress, span = '', animationDelay = '0s', isVisible = true }: Props) {
  const { status } = progress;
  const totalSections = module.sections.length;
  const done = progress.sectionsCompleted.length;
  const pct = totalSections ? Math.round((done / totalSections) * 100) : 0;

  const locked = status === 'locked';
  const completed = status === 'completed';
  const iconIdx = (module.order - 1) % MODULE_ICONS.length;
  const Icon = MODULE_ICONS[iconIdx];
  const animation = MODULE_ANIMATIONS[iconIdx];
  const meta = statusMeta[status];

  const card = (
    <article
      className={cn(
        'group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl',
        'border border-neutral-900/10 bg-white/80 p-5',
        'shadow-[0_10px_40px_rgba(0,0,0,0.04)]',
        'transition-transform duration-300 ease-out',
        'motion-safe:opacity-0',
        isVisible && 'motion-safe:animate-[bento2-card_0.8s_ease-out_forwards]',
        !locked && 'hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] cursor-pointer',
        locked && 'opacity-60',
        span,
      )}
      style={{ animationDelay }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-white/85" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background: completed
              ? 'radial-gradient(ellipse 60% 120% at 12% 0%, rgba(34,197,94,0.18), transparent 72%)'
              : 'radial-gradient(ellipse 60% 120% at 12% 0%, rgba(148,163,184,0.32), transparent 72%)',
          }}
        />
      </div>

      {/* Header row */}
      <div className="flex items-start gap-4">
        <div className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-white',
          completed ? 'border-green-200' : 'border-neutral-900/15',
        )}>
          {completed ? (
            <CheckCircle2 className="h-6 w-6 text-green-500" strokeWidth={1.5} />
          ) : locked ? (
            <Lock className="h-5 w-5 text-neutral-400" strokeWidth={1.5} />
          ) : (
            <Icon
              className="h-7 w-7 text-neutral-900"
              strokeWidth={1.5}
              style={{ animation }}
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400 tabular-nums mb-0.5">
                Module {String(module.order).padStart(2, '0')}
              </div>
              <h3 className="text-[15px] font-semibold uppercase tracking-wide text-neutral-900 leading-snug">
                {module.title}
              </h3>
            </div>
            <span className="shrink-0 rounded-full border border-neutral-900/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.3em] text-neutral-500">
              {meta}
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
            {module.subtitle}
          </p>
        </div>
      </div>

      {/* Progress footer */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1 h-1 rounded-full bg-neutral-900/8 overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              completed ? 'bg-green-500' : 'bg-neutral-900',
            )}
            style={{ width: `${completed ? 100 : pct}%` }}
          />
        </div>
        <span className="text-[11px] text-neutral-400 tabular-nums shrink-0">
          {completed ? 'Complete' : `${done}/${totalSections}`}
        </span>
      </div>

      {/* Hover outline effect */}
      {!locked && (
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div
            className="absolute inset-0 rounded-2xl border border-neutral-900/10"
            style={{
              maskImage: 'radial-gradient(220px_220px_at_var(--x,50%)_var(--y,50%), black, transparent)',
              WebkitMaskImage: 'radial-gradient(220px_220px_at_var(--x,50%)_var(--y,50%), black, transparent)',
            }}
          />
        </div>
      )}
    </article>
  );

  if (locked) return <div className={cn('h-full', span)}>{card}</div>;
  return <Link to={`/m/${module.slug}`} className={cn('block h-full', span)}>{card}</Link>;
}

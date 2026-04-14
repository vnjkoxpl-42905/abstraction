import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import type { Module } from '@/content/types';
import type { ModuleProgress } from '@/lib/progress';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Props { module: Module; progress: ModuleProgress; }

const statusConfig = {
  locked:      { label: 'Locked',      variant: 'locked'      } as const,
  unlocked:    { label: 'Ready',       variant: 'ready'       } as const,
  in_progress: { label: 'In progress', variant: 'in_progress' } as const,
  completed:   { label: 'Complete',    variant: 'complete'    } as const,
};

export default function ModuleCard({ module, progress }: Props) {
  const { status } = progress;
  const totalSections = module.sections.length;
  const done = progress.sectionsCompleted.length;
  const pct = totalSections ? Math.round((done / totalSections) * 100) : 0;

  const locked = status === 'locked';
  const completed = status === 'completed';

  const { label, variant } = statusConfig[status];

  const body = (
    <Card className={cn(
      'relative p-6 h-full transition',
      locked ? 'opacity-55' : 'hover:border-ink-300 hover:shadow-pop cursor-pointer'
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500 tabular-nums">
          Module {String(module.order).padStart(2, '0')}
        </div>
        <Badge variant={variant}>{label}</Badge>
      </div>

      <h3 className="text-[17px] font-semibold text-ink-900 leading-snug mb-1">{module.title}</h3>
      <p className="text-[13.5px] text-ink-500 leading-relaxed mb-5">{module.subtitle}</p>

      <div className="flex items-center gap-3">
        <Progress
          value={completed ? 100 : pct}
          className="flex-1"
          indicatorClassName={completed ? 'bg-ok' : 'bg-ink-900'}
        />
        <span className="text-[12.5px] text-ink-500 tabular-nums shrink-0">
          {completed ? 'Complete' : `${done}/${totalSections}`}
        </span>
      </div>

      {locked && (
        <div className="mt-4 flex items-center gap-1.5 text-[12px] text-ink-400">
          <Lock size={11} />
          <span>Unlocks after the previous module.</span>
        </div>
      )}
    </Card>
  );

  if (locked) return <div>{body}</div>;
  return <Link to={`/m/${module.slug}`} className="block h-full">{body}</Link>;
}

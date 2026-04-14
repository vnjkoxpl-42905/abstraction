import { Link } from 'react-router-dom';
import type { Module } from '@/content/types';
import type { ModuleProgress } from '@/lib/progress';

interface Props { module: Module; progress: ModuleProgress; }

export default function ModuleCard({ module, progress }: Props) {
  const { status } = progress;
  const totalSections = module.sections.length;
  const done = progress.sectionsCompleted.length;
  const pct = totalSections ? Math.round((done / totalSections) * 100) : 0;

  const locked = status === 'locked';
  const completed = status === 'completed';

  const body = (
    <div className={`relative card p-6 h-full transition ${
      locked ? 'opacity-55' : 'hover:border-ink-300 hover:shadow-pop'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500">
          Module {String(module.order).padStart(2, '0')}
        </div>
        <StatusPill status={status} />
      </div>
      <h3 className="text-[17px] font-semibold text-ink-900 leading-snug mb-1">{module.title}</h3>
      <p className="text-[13.5px] text-ink-500 leading-relaxed mb-5">{module.subtitle}</p>

      <div className="flex items-center gap-3 text-[12.5px] text-ink-500">
        <div className="flex-1 h-[6px] rounded-full bg-ink-100 overflow-hidden">
          <div
            className={`h-full ${completed ? 'bg-ok' : 'bg-ink-900'}`}
            style={{ width: `${completed ? 100 : pct}%` }}
          />
        </div>
        <span className="tabular-nums">
          {completed ? 'Complete' : `${done}/${totalSections}`}
        </span>
      </div>

      {locked && (
        <div className="mt-4 text-[12px] text-ink-500">
          Unlocks after the previous module.
        </div>
      )}
    </div>
  );

  if (locked) return <div>{body}</div>;
  return <Link to={`/m/${module.slug}`} className="block h-full">{body}</Link>;
}

function StatusPill({ status }: { status: ModuleProgress['status'] }) {
  const map = {
    locked:       ['Locked',      'bg-ink-100 text-ink-500'],
    unlocked:     ['Ready',       'bg-accent-soft text-accent'],
    in_progress:  ['In progress', 'bg-ink-900 text-white'],
    completed:    ['Complete',    'bg-ok/10 text-ok'],
  } as const;
  const [label, cls] = map[status];
  return (
    <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${cls}`}>{label}</span>
  );
}

import { Link, Navigate, useParams } from 'react-router-dom';
import type { Bootcamp } from '@/content/types';
import { useProgress } from '@/lib/progress';
import { ProgressCircle } from '@/components/ui/progress-1';

export default function Complete({ bootcamp }: { bootcamp: Bootcamp }) {
  const { moduleSlug } = useParams();
  const module = bootcamp.modules.find(m => m.slug === moduleSlug);
  const { getModule } = useProgress(bootcamp);
  if (!module) return <Navigate to="/" replace />;
  const mp = getModule(module.slug);
  const score = mp.score ?? 0;

  const ordered = [...bootcamp.modules].sort((a, b) => a.order - b.order);
  const idx = ordered.findIndex(m => m.slug === module.slug);
  const nextModule = ordered[idx + 1];

  const correctCount = module.lsatSet.filter(q => mp.lsatAttempts[q.id]?.isCorrect).length;

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-ink-200">
        <div className="mx-auto max-w-[900px] flex items-center justify-between px-8 h-14">
          <Link to="/" className="btn-ghost text-sm">← Dashboard</Link>
          <div className="text-[11px] uppercase tracking-[0.14em] text-ink-500">Module complete</div>
        </div>
      </header>
      <main className="mx-auto max-w-[760px] px-8 py-16">
        <div className="flex items-center gap-6 mb-10">
          <ProgressCircle value={score} size={96} strokeWidth={7}>
            <span className="text-sm font-bold text-ink-900">{score}%</span>
          </ProgressCircle>
          <div>
            <div className="text-[11px] uppercase tracking-[0.14em] text-ok mb-1">Complete</div>
            <h1 className="text-3xl font-semibold tracking-tight text-ink-900">
              {module.summary.headline}
            </h1>
            <div className="text-sm text-ink-500 mt-1">
              {correctCount} of {module.lsatSet.length} correct on the LSAT set
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-12">
          <Panel title="What you did well">
            <ul className="list-disc pl-5 space-y-1.5 text-ink-700">
              {module.summary.didWell.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </Panel>
          <Panel title="Watch for next time">
            <ul className="list-disc pl-5 space-y-1.5 text-ink-700">
              {module.summary.watchFor.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </Panel>
        </div>

        <div className="card p-6 flex items-center gap-6">
          <div className="flex-1">
            <div className="text-[11px] uppercase tracking-[0.14em] text-ink-500 mb-1">Unlocked</div>
            <div className="text-lg font-semibold text-ink-900">
              {nextModule ? nextModule.title : 'You finished the bootcamp.'}
            </div>
            {nextModule && <div className="text-sm text-ink-500 mt-1">{nextModule.subtitle}</div>}
          </div>
          {nextModule ? (
            <Link to={`/m/${nextModule.slug}`} className="btn-primary">Start next module →</Link>
          ) : (
            <Link to="/" className="btn-primary">Back to dashboard</Link>
          )}
        </div>
      </main>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5">
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500 mb-3">{title}</div>
      <div className="text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}

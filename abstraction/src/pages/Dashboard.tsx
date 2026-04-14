import { Link } from 'react-router-dom';
import type { Bootcamp } from '@/content/types';
import { useProgress } from '@/lib/progress';
import ModuleCard from '@/components/ModuleCard';
import ProgressRing from '@/components/ProgressRing';

export default function Dashboard({ bootcamp }: { bootcamp: Bootcamp }) {
  const { state, getModule, resetAll } = useProgress(bootcamp);
  const ordered = [...bootcamp.modules].sort((a, b) => a.order - b.order);
  const totalSections = ordered.reduce((n, m) => n + m.sections.length, 0);
  const doneSections = ordered.reduce(
    (n, m) => n + (state.modules[m.slug]?.sectionsCompleted.length ?? 0), 0
  );
  const overall = totalSections ? Math.round((doneSections / totalSections) * 100) : 0;

  const next = ordered.find(m => {
    const mp = state.modules[m.slug];
    return mp && mp.status !== 'completed' && mp.status !== 'locked';
  }) ?? ordered.find(m => state.modules[m.slug]?.status === 'unlocked');

  const resume = state.lastVisited;

  return (
    <div className="min-h-screen">
      <header className="border-b border-ink-200 bg-white">
        <div className="mx-auto max-w-[1100px] flex items-center justify-between px-8 h-14">
          <div className="flex items-center gap-2 text-ink-900">
            <Logo />
            <span className="font-semibold tracking-tight">Abstraction</span>
          </div>
          <button
            onClick={() => {
              if (confirm('Reset all progress? This cannot be undone.')) resetAll();
            }}
            className="btn-ghost text-sm"
          >Reset progress</button>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-8 py-12">
        <div className="mb-10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500 mb-2">
            Bootcamp
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-ink-900">{bootcamp.title}</h1>
          <p className="mt-3 text-ink-500 max-w-2xl leading-relaxed">{bootcamp.tagline}</p>
        </div>

        {/* Resume / next action card */}
        <div className="card p-6 mb-10 flex items-center gap-6">
          <ProgressRing value={overall} size={72} stroke={6} />
          <div className="flex-1">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500 mb-1">
              {resume ? 'Resume where you left off' : 'Next up'}
            </div>
            <div className="text-lg font-semibold text-ink-900">
              {next ? next.title : 'All modules complete — congratulations.'}
            </div>
            {next && (
              <div className="text-sm text-ink-500 mt-1">{next.subtitle}</div>
            )}
          </div>
          {next && (
            <Link
              to={
                resume && resume.moduleSlug === next.slug && resume.sectionSlug
                  ? `/m/${resume.moduleSlug}/${resume.sectionSlug}`
                  : `/m/${next.slug}`
              }
              className="btn-primary"
            >
              {resume?.sectionSlug ? 'Resume' : 'Begin module'}
            </Link>
          )}
        </div>

        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-[15px] font-semibold text-ink-900">Modules</h2>
          <div className="text-[12px] text-ink-500 tabular-nums">
            {doneSections} / {totalSections} sections
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {ordered.map(m => (
            <ModuleCard key={m.slug} module={m} progress={getModule(m.slug)} />
          ))}
        </div>
      </main>
    </div>
  );
}

function Logo() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2" y="2" width="18" height="18" rx="5" stroke="#0F0F0E" strokeWidth="1.5"/>
      <path d="M7 14 L11 7 L15 14" stroke="#0F0F0E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 11.5 H13.5" stroke="#0F0F0E" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import type { Bootcamp } from '@/content/types';
import { useProgress } from '@/lib/progress';
import ModuleCard from '@/components/ModuleCard';
import { ProgressCircle } from '@/components/ui/progress-1';
import { Separator } from '@/components/ui/separator';

// Bento grid spans for 5 modules — asymmetric layout
const BENTO_SPANS = [
  'md:col-span-4 md:row-span-2',
  'md:col-span-2 md:row-span-1',
  'md:col-span-2 md:row-span-1',
  'md:col-span-3 md:row-span-1',
  'md:col-span-3 md:row-span-1',
];

function useBentoKeyframes() {
  useEffect(() => {
    const id = 'bento2-animations';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.innerHTML = `
      @keyframes bento2-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6%)} }
      @keyframes bento2-pulse { 0%,100%{transform:scale(1);opacity:.85} 50%{transform:scale(1.08);opacity:1} }
      @keyframes bento2-tilt  { 0%{transform:rotate(-2deg)} 50%{transform:rotate(2deg)} 100%{transform:rotate(-2deg)} }
      @keyframes bento2-drift { 0%,100%{transform:translate3d(0,0,0)} 50%{transform:translate3d(6%,-6%,0)} }
      @keyframes bento2-glow  { 0%,100%{opacity:.6;filter:drop-shadow(0 0 0 rgba(0,0,0,.4))} 50%{opacity:1;filter:drop-shadow(0 0 6px rgba(0,0,0,.2))} }
      @keyframes bento2-card  { 0%{opacity:0;transform:translate3d(0,18px,0) scale(.96)} 100%{opacity:1;transform:translate3d(0,0,0) scale(1)} }
    `;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);
}

export default function Dashboard({ bootcamp }: { bootcamp: Bootcamp }) {
  useBentoKeyframes();

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
      {/* Thin top bar */}
      <div className="border-b border-ink-200 h-14 flex items-center justify-end px-8">
        <button
          onClick={() => { if (confirm('Reset all progress? This cannot be undone.')) resetAll(); }}
          className="btn-ghost text-sm"
        >
          Reset progress
        </button>
      </div>

      <main className="max-w-[960px] px-8 py-12">
        {/* Bootcamp header */}
        <div className="mb-10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500 mb-2">
            Bootcamp
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-ink-900">{bootcamp.title}</h1>
          <p className="mt-3 text-ink-500 max-w-2xl leading-relaxed">{bootcamp.tagline}</p>
        </div>

        {/* Resume / next action card */}
        <div className="bg-white border border-ink-200 rounded-xl shadow-card border-t-2 border-t-accent mb-10 p-8 flex items-center gap-8">
          <ProgressCircle value={overall} size={80} strokeWidth={7}>
            <span className="text-xs font-semibold text-ink-900">{overall}%</span>
          </ProgressCircle>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500 mb-1">
              {resume ? 'Resume where you left off' : 'Next up'}
            </div>
            <div className="text-lg font-semibold text-ink-900 leading-snug">
              {next ? next.title : 'All modules complete — congratulations.'}
            </div>
            {next && <div className="text-sm text-ink-500 mt-1">{next.subtitle}</div>}
          </div>
          {next && (
            <Link
              to={
                resume && resume.moduleSlug === next.slug && resume.sectionSlug
                  ? `/m/${resume.moduleSlug}/${resume.sectionSlug}`
                  : `/m/${next.slug}`
              }
              className="btn-primary shrink-0"
            >
              {resume?.sectionSlug ? 'Resume' : 'Begin module'}
            </Link>
          )}
        </div>

        {/* Module bento grid */}
        <div className="mb-5">
          <div className="flex items-baseline justify-between mb-1">
            <h2 className="text-[15px] font-semibold text-ink-900">Modules</h2>
            <div className="text-[12px] font-mono text-ink-500 tabular-nums">
              {doneSections} / {totalSections} sections
            </div>
          </div>
          <Separator className="mb-5" />
        </div>

        <div className="grid grid-cols-1 gap-3 md:auto-rows-[minmax(140px,auto)] md:grid-cols-6">
          {ordered.map((m, i) => (
            <ModuleCard
              key={m.slug}
              module={m}
              progress={getModule(m.slug)}
              span={BENTO_SPANS[i] ?? ''}
              animationDelay={`${i * 0.12}s`}
              isVisible={true}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

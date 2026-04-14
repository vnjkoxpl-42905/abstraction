import { Link, Navigate, useParams } from 'react-router-dom';
import type { Bootcamp } from '@/content/types';
import { useProgress } from '@/lib/progress';

export default function ModuleOrientation({ bootcamp }: { bootcamp: Bootcamp }) {
  const { moduleSlug } = useParams();
  const module = bootcamp.modules.find(m => m.slug === moduleSlug);
  const { getModule } = useProgress(bootcamp);
  if (!module) return <Navigate to="/" replace />;
  const mp = getModule(module.slug);
  if (mp.status === 'locked') return <Navigate to="/" replace />;

  const firstSection = module.sections[0];
  const resumeSlug = mp.resumeSectionSlug;
  const next = resumeSlug
    ? module.sections.find(s => s.slug === resumeSlug)?.slug ?? firstSection.slug
    : firstSection.slug;

  const resumeSection = resumeSlug
    ? module.sections.find(s => s.slug === resumeSlug)
    : null;

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-ink-200">
        <div className="mx-auto max-w-[900px] flex items-center justify-between px-8 h-14">
          <Link to="/" className="btn-ghost text-sm">← Dashboard</Link>
          <div className="text-[11px] uppercase tracking-[0.14em] text-ink-500">
            Module {String(module.order).padStart(2, '0')}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[680px] px-8 py-14">

        {/* Block 1 — Hero */}
        <div className="mb-10 pb-10 border-b border-ink-100">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400 mb-3">
            Module {String(module.order).padStart(2, '0')}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-ink-900 mb-3">
            {module.title}
          </h1>
          <p className="text-ink-500 leading-relaxed text-[17px] max-w-xl">
            {module.subtitle}
          </p>
        </div>

        {/* Block 2 — What this module is (context aside) */}
        <div className="bg-ink-50 rounded-xl px-5 py-4 mb-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400 mb-2">
            What this module is
          </div>
          <p className="text-[14px] leading-relaxed text-ink-600">
            {module.orientation.whatItIs}
          </p>
        </div>

        {/* Block 3 — Why it matters (accent callout) */}
        <div className="border-l-2 border-accent pl-5 py-1 mb-10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent mb-2">
            Why it matters
          </div>
          <p className="text-[15px] leading-relaxed text-ink-800">
            {module.orientation.whyItMatters}
          </p>
        </div>

        {/* Block 4 — Outcome chips */}
        <div className="mb-10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500 mb-4">
            By the end, you'll be able to
          </div>
          <div className="grid grid-cols-2 gap-3">
            {module.orientation.youWillBeAbleTo.map((outcome, i) => (
              <div
                key={i}
                className="rounded-xl border border-ink-200 bg-white px-4 py-3.5"
              >
                <div className="text-[11px] font-semibold text-ink-400 tabular-nums mb-1.5">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-[13.5px] leading-snug text-ink-800">{outcome}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Block 5 — Section sequence strip */}
        <div className="border border-ink-200 rounded-xl p-5 mb-10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500 mb-4">
            In this module
          </div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-3">
            {module.sections.map((section, i) => (
              <div key={section.slug} className="flex items-baseline gap-2">
                <span className="text-[11px] font-semibold text-ink-300 tabular-nums shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[13px] text-ink-600 leading-snug">{section.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Block 6 — Begin area */}
        <div className="border-t border-ink-200 pt-8 flex items-center justify-between">
          <div>
            <div className="text-[12px] text-ink-400 mb-0.5">
              {resumeSection ? 'Resume from' : 'You\'ll start with'}
            </div>
            <div className="text-[16px] font-semibold text-ink-900">
              {resumeSection ? resumeSection.title : firstSection.title}
            </div>
          </div>
          <Link to={`/m/${module.slug}/${next}`} className="btn-primary">
            {resumeSlug ? 'Resume' : 'Begin'}
          </Link>
        </div>

      </main>
    </div>
  );
}

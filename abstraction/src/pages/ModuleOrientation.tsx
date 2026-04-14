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

      <main className="mx-auto max-w-[720px] px-8 py-16">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent mb-3">
          Orientation
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-ink-900 mb-4">{module.title}</h1>
        <p className="text-ink-500 leading-relaxed text-lg mb-10">{module.subtitle}</p>

        <Pane label="What this module is">
          <p>{module.orientation.whatItIs}</p>
        </Pane>
        <Pane label="Why it matters">
          <p>{module.orientation.whyItMatters}</p>
        </Pane>
        <Pane label="By the end, you'll be able to">
          <ul className="list-disc pl-6 space-y-2">
            {module.orientation.youWillBeAbleTo.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </Pane>

        <div className="mt-12 flex items-center justify-between border-t border-ink-200 pt-8">
          <div className="text-sm text-ink-500">
            {module.sections.length} sections · {module.lsatSet.length} LSAT questions
          </div>
          <Link to={`/m/${module.slug}/${next}`} className="btn-primary">
            {resumeSlug ? 'Resume' : 'Begin'}
          </Link>
        </div>
      </main>
    </div>
  );
}

function Pane({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500 mb-3">
        {label}
      </div>
      <div className="text-[16px] leading-[1.7] text-ink-800">{children}</div>
    </section>
  );
}

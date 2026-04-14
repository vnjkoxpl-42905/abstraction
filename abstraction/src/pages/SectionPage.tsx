import { Link, Navigate, useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import type { Bootcamp } from '@/content/types';
import { useProgress } from '@/lib/progress';
import SectionLayout from '@/components/SectionLayout';
import Callout from '@/components/Callout';
import Checkpoint from '@/components/Checkpoint';
import { Markdown } from '@/lib/markdown';

export default function SectionPage({ bootcamp }: { bootcamp: Bootcamp }) {
  const { moduleSlug, sectionSlug } = useParams();
  const navigate = useNavigate();
  const module = bootcamp.modules.find(m => m.slug === moduleSlug);
  const section = module?.sections.find(s => s.slug === sectionSlug);
  const index = module?.sections.findIndex(s => s.slug === sectionSlug) ?? -1;

  const { getModule, markSectionComplete, recordCheckpoint, setLastVisited } = useProgress(bootcamp);

  useEffect(() => {
    if (module && section) setLastVisited(module.slug, section.slug);
  }, [module?.slug, section?.slug]);

  if (!module || !section || index < 0) return <Navigate to="/" replace />;
  const mp = getModule(module.slug);
  if (mp.status === 'locked') return <Navigate to="/" replace />;

  const total = module.sections.length;
  const isLast = index === total - 1;
  const prior = section.checkpoint ? mp.checkpointAttempts[section.checkpoint.id] : null;
  const checkpointSatisfied = !section.checkpoint || !!prior;

  function next() {
    if (!module || !section) return;
    markSectionComplete(module.slug, section.slug);
    if (isLast) navigate(`/m/${module.slug}/lsat`);
    else navigate(`/m/${module.slug}/${module.sections[index + 1].slug}`);
  }

  return (
    <SectionLayout module={module} section={section} sectionIndex={index} sectionsCompleted={mp.sectionsCompleted}>
      <Markdown source={section.body} />
      {section.callout && <Callout {...section.callout} />}
      {section.checkpoint && (
        <Checkpoint
          checkpoint={section.checkpoint}
          moduleTitle={module.title}
          sectionTitle={section.title}
          priorAttempt={prior ?? null}
          onSubmit={(resp, isCorrect) => {
            recordCheckpoint(module.slug, section.checkpoint!.id, {
              response: resp, isCorrect, at: new Date().toISOString(),
            });
          }}
        />
      )}
      {section.application && (
        <ApplicationBlock prompt={section.application.prompt} model={section.application.modelAnswer} placeholder={section.application.placeholder} />
      )}

      <div className="mt-14 flex items-center justify-between border-t border-ink-200 pt-6 not-prose">
        {index > 0 ? (
          <Link
            to={`/m/${module.slug}/${module.sections[index - 1].slug}`}
            className="btn-secondary"
          >← Previous</Link>
        ) : <span />}
        <button
          onClick={next}
          disabled={!checkpointSatisfied}
          className="btn-primary"
          title={!checkpointSatisfied ? 'Commit to the checkpoint first' : undefined}
        >
          {isLast ? 'Begin LSAT set →' : 'Next section →'}
        </button>
      </div>
    </SectionLayout>
  );
}

import { useState } from 'react';
function ApplicationBlock({ prompt, model, placeholder }: { prompt: string; model: string; placeholder?: string }) {
  const [text, setText] = useState('');
  const [revealed, setRevealed] = useState(false);
  return (
    <section className="not-prose my-10 rounded-2xl border border-ink-200 bg-ink-50 p-6">
      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500 mb-2">
        Apply it
      </div>
      <div className="text-[16px] font-medium text-ink-900 mb-4">{prompt}</div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        disabled={revealed}
        rows={3}
        placeholder={placeholder ?? 'Write your answer in your own words…'}
        className="w-full rounded-lg border border-ink-200 bg-white p-3 text-[15px] focus:outline-none focus:border-ink-900 disabled:bg-ink-100"
      />
      {!revealed ? (
        <button
          disabled={text.trim().length === 0}
          onClick={() => setRevealed(true)}
          className="btn-primary mt-4"
        >Reveal model answer</button>
      ) : (
        <div className="mt-4 rounded-lg border border-ink-200 bg-white p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500 mb-2">Model answer</div>
          <div className="text-[15px] leading-relaxed text-ink-800">{model}</div>
        </div>
      )}
    </section>
  );
}

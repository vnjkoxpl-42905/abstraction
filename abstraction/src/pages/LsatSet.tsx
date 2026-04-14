import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import type { Bootcamp, LsatQuestion } from '@/content/types';
import { useProgress } from '@/lib/progress';
import { getFeedback } from '@/lib/aiFeedback';

type Stage = 1 | 2 | 3 | 4;

export default function LsatSet({ bootcamp }: { bootcamp: Bootcamp }) {
  const { moduleSlug } = useParams();
  const navigate = useNavigate();
  const module = bootcamp.modules.find(m => m.slug === moduleSlug);
  const { getModule, recordLsat, completeLsatSet } = useProgress(bootcamp);
  const [qIndex, setQIndex] = useState(0);

  if (!module) return <Navigate to="/" replace />;
  const mp = getModule(module.slug);
  if (mp.status === 'locked') return <Navigate to="/" replace />;
  if (module.lsatSet.length === 0) {
    // no set — auto complete
    completeLsatSet(module.slug, module);
    return <Navigate to={`/m/${module.slug}/complete`} replace />;
  }

  const total = module.lsatSet.length;
  const q = module.lsatSet[qIndex];

  function onQuestionDone(_qid: string) {
    if (qIndex + 1 < total) setQIndex(qIndex + 1);
    else {
      completeLsatSet(module!.slug, module!);
      navigate(`/m/${module!.slug}/complete`);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-ink-200 sticky top-0 bg-white/90 backdrop-blur z-10">
        <div className="mx-auto max-w-[1100px] flex items-center justify-between px-8 h-14">
          <Link to={`/m/${module.slug}`} className="btn-ghost text-sm">← {module.title}</Link>
          <div className="text-[12px] text-ink-500 tabular-nums">
            Question {qIndex + 1} of {total}
          </div>
        </div>
      </header>
      <LsatPlayer
        key={q.id}
        q={q}
        moduleTitle={module.title}
        onRecord={(stage, selected, isCorrect) =>
          recordLsat(module.slug, q.id, { stage, selected, isCorrect, at: new Date().toISOString() })
        }
        onDone={() => onQuestionDone(q.id)}
      />
    </div>
  );
}

function LsatPlayer({
  q, moduleTitle, onRecord, onDone,
}: {
  q: LsatQuestion;
  moduleTitle: string;
  onRecord: (stage: Stage, selected?: 'A' | 'B' | 'C' | 'D' | 'E', isCorrect?: boolean) => void;
  onDone: () => void;
}) {
  const [stage, setStage] = useState<Stage>(1);
  const [selected, setSelected] = useState<'A' | 'B' | 'C' | 'D' | 'E' | null>(null);
  const [committed, setCommitted] = useState(false);
  const [acTranslations, setAcTranslations] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const isCorrect = selected === q.correct;

  async function commitStage1() {
    if (!selected) return;
    setCommitted(true);
    onRecord(1, selected, isCorrect);
  }

  async function toStage4() {
    setStage(4);
    const fb = await getFeedback({
      moduleTitle,
      sectionTitle: q.source,
      prompt: q.stem,
      studentResponse: selected ?? '',
      correctResponse: q.correct,
      baselineExplanation: q.explanation,
      isCorrect,
    });
    setFeedback(fb);
    onRecord(4, selected ?? undefined, isCorrect);
  }

  return (
    <main className="mx-auto max-w-[860px] px-8 py-10">
      <Stepper stage={stage} />

      <div className="text-[11px] uppercase tracking-[0.14em] text-ink-500 mt-8 mb-2">
        {q.source}{q.trait ? ` · ${q.trait}` : ''}
      </div>

      {stage === 1 && (
        <>
          <Stimulus text={q.stimulus} />
          <Stem text={q.stem} />
          <Choices q={q} selected={selected} onSelect={setSelected} disabled={committed} reveal={committed} />
          {!committed ? (
            <button onClick={commitStage1} disabled={!selected} className="btn-primary mt-8">
              Commit answer
            </button>
          ) : (
            <div className="mt-8 flex items-center gap-3">
              <div className={`text-sm font-medium ${isCorrect ? 'text-ok' : 'text-err'}`}>
                {isCorrect ? 'You got it.' : 'Not the credited answer.'}
              </div>
              <span className="text-ink-400">·</span>
              <span className="text-sm text-ink-500">
                Before seeing the full coaching, let's map the argument.
              </span>
              <button onClick={() => setStage(2)} className="btn-primary ml-auto">
                Map the structure →
              </button>
            </div>
          )}
        </>
      )}

      {stage === 2 && (
        <>
          <Stimulus text={q.stimulus} />
          <div className="mt-6 rounded-xl border border-ink-200 bg-ink-50 p-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500 mb-2">
              Argument structure
            </div>
            <div className="text-[15px] leading-relaxed text-ink-800 whitespace-pre-line">{q.structureMap}</div>
          </div>
          <div className="mt-8 flex justify-end">
            <button onClick={() => setStage(3)} className="btn-primary">
              Translate each answer choice →
            </button>
          </div>
        </>
      )}

      {stage === 3 && (
        <>
          <Stem text={q.stem} />
          <div className="mt-4 space-y-4">
            {q.choices.map(c => (
              <div key={c.letter} className="rounded-xl border border-ink-200 p-4">
                <div className="text-[15px] text-ink-900 mb-3">
                  <span className="font-medium mr-2 text-ink-500">{c.letter}.</span>
                  {c.text}
                </div>
                <label className="block text-[11px] uppercase tracking-[0.12em] text-ink-500 mb-1.5">
                  Your plain-English translation
                </label>
                <textarea
                  value={acTranslations[c.letter] ?? ''}
                  onChange={e => setAcTranslations(t => ({ ...t, [c.letter]: e.target.value }))}
                  rows={2}
                  placeholder="What is this answer actually claiming about the argument?"
                  className="w-full rounded-lg border border-ink-200 bg-white p-2.5 text-[14.5px] focus:outline-none focus:border-ink-900"
                />
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <button
              onClick={toStage4}
              disabled={q.choices.some(c => !(acTranslations[c.letter] ?? '').trim())}
              className="btn-primary"
            >
              Reveal coaching →
            </button>
          </div>
        </>
      )}

      {stage === 4 && (
        <>
          <Stem text={q.stem} />
          <div className="mt-4 space-y-2">
            {q.choices.map(c => {
              const right = c.letter === q.correct;
              const chosen = c.letter === selected;
              return (
                <div
                  key={c.letter}
                  className={`rounded-lg border p-4 ${
                    right ? 'border-ok bg-[#EAF6EF]' : chosen ? 'border-err bg-[#FDECEA]' : 'border-ink-200'
                  }`}
                >
                  <div className="text-[15px]">
                    <span className="font-medium mr-2 text-ink-500">{c.letter}.</span>
                    {c.text}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={`mt-6 rounded-xl border p-5 ${isCorrect ? 'border-ok/30 bg-[#EAF6EF]' : 'border-err/30 bg-[#FDECEA]'}`}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-900/80 mb-2">
              Coaching
            </div>
            <div className="text-[15px] leading-relaxed text-ink-800">
              {feedback ?? q.explanation}
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button onClick={onDone} className="btn-primary">Next question →</button>
          </div>
        </>
      )}
    </main>
  );
}

function Stepper({ stage }: { stage: Stage }) {
  const labels = ['First attempt', 'Structure map', 'Translate answers', 'Coaching'];
  return (
    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink-500">
      {labels.map((l, i) => {
        const n = (i + 1) as Stage;
        const active = n === stage;
        const done = n < stage;
        return (
          <div key={l} className="flex items-center gap-2">
            <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold ${
              active ? 'bg-ink-900 text-white' : done ? 'bg-ok text-white' : 'bg-ink-200 text-ink-500'
            }`}>{n}</span>
            <span className={active ? 'text-ink-900' : ''}>{l}</span>
            {i < 3 && <span className="mx-1 h-px w-6 bg-ink-200" />}
          </div>
        );
      })}
    </div>
  );
}

function Stimulus({ text }: { text: string }) {
  return (
    <div className="mt-2 rounded-xl border border-ink-200 bg-white p-6 font-serif text-[17px] leading-[1.75] text-ink-800 whitespace-pre-line">
      {text}
    </div>
  );
}
function Stem({ text }: { text: string }) {
  return <div className="mt-5 text-[15px] font-medium text-ink-900">{text}</div>;
}
function Choices({
  q, selected, onSelect, disabled, reveal,
}: {
  q: LsatQuestion;
  selected: 'A'|'B'|'C'|'D'|'E'|null;
  onSelect: (s: 'A'|'B'|'C'|'D'|'E') => void;
  disabled: boolean;
  reveal: boolean;
}) {
  return (
    <div className="mt-4 space-y-2">
      {q.choices.map(c => {
        const chosen = selected === c.letter;
        const right = reveal && c.letter === q.correct;
        const wrong = reveal && chosen && c.letter !== q.correct;
        return (
          <button
            key={c.letter}
            disabled={disabled}
            onClick={() => onSelect(c.letter)}
            className={`w-full text-left rounded-lg border px-4 py-3 text-[15px] transition ${
              right ? 'border-ok bg-[#EAF6EF]' :
              wrong ? 'border-err bg-[#FDECEA]' :
              chosen ? 'border-ink-900 bg-ink-50' :
              'border-ink-200 hover:border-ink-300'
            }`}
          >
            <span className="font-medium mr-2 text-ink-500">{c.letter}.</span>
            {c.text}
          </button>
        );
      })}
    </div>
  );
}

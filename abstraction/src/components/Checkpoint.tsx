import { useState } from 'react';
import type { Checkpoint as CP } from '@/content/types';
import { getFeedback } from '@/lib/aiFeedback';

interface Props {
  checkpoint: CP;
  moduleTitle: string;
  sectionTitle: string;
  priorAttempt?: { response: string | string[]; isCorrect: boolean } | null;
  onSubmit: (resp: string | string[], isCorrect: boolean) => void;
}

export default function Checkpoint({ checkpoint, moduleTitle, sectionTitle, priorAttempt, onSubmit }: Props) {
  const [selected, setSelected] = useState<string[]>(
    priorAttempt
      ? Array.isArray(priorAttempt.response) ? priorAttempt.response : [priorAttempt.response]
      : []
  );
  const [shortText, setShortText] = useState<string>(
    priorAttempt && typeof priorAttempt.response === 'string' ? priorAttempt.response : ''
  );
  const [submitted, setSubmitted] = useState<boolean>(!!priorAttempt);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const multi = checkpoint.kind === 'multi';
  const isCorrect = computeCorrect(checkpoint, selected, shortText);

  async function submit() {
    if (submitted) return;
    setSubmitted(true);
    setLoading(true);
    const response = checkpoint.kind === 'short' ? shortText : (multi ? selected : selected[0]);
    onSubmit(response, isCorrect);
    const fb = await getFeedback({
      moduleTitle,
      sectionTitle,
      prompt: checkpoint.prompt,
      studentResponse: String(response),
      correctResponse: String(checkpoint.correct),
      baselineExplanation: checkpoint.explanation,
      isCorrect,
    });
    setFeedback(fb);
    setLoading(false);
  }

  const canSubmit =
    checkpoint.kind === 'short' ? shortText.trim().length > 0 : selected.length > 0;

  return (
    <section className="not-prose my-10 rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
          Checkpoint
        </span>
        <span className="h-1 w-1 rounded-full bg-ink-300" />
        <span className="text-[11px] text-ink-500">
          Commit to an answer before the coaching appears
        </span>
      </div>
      <div className="text-[17px] font-medium text-ink-900 mb-5">{checkpoint.prompt}</div>

      {checkpoint.kind !== 'short' && checkpoint.choices && (
        <div className="space-y-2 mb-5">
          {checkpoint.choices.map(c => {
            const chosen = selected.includes(c.id);
            const correctIds = Array.isArray(checkpoint.correct) ? checkpoint.correct : [checkpoint.correct];
            const isRight = correctIds.includes(c.id);
            const showState = submitted;
            const stateCls = !showState
              ? (chosen ? 'border-ink-900 bg-ink-50' : 'border-ink-200 hover:border-ink-300')
              : isRight
                ? 'border-ok bg-[#EAF6EF]'
                : chosen
                  ? 'border-err bg-[#FDECEA]'
                  : 'border-ink-200 opacity-60';
            return (
              <button
                key={c.id}
                disabled={submitted}
                onClick={() => {
                  if (multi) setSelected(s => s.includes(c.id) ? s.filter(x => x !== c.id) : [...s, c.id]);
                  else setSelected([c.id]);
                }}
                className={`w-full text-left rounded-lg border px-4 py-3 text-[15px] transition ${stateCls}`}
              >
                <span className="font-medium mr-2 text-ink-500">{c.id.toUpperCase()}.</span>
                {c.text}
                {submitted && c.redFlag && (
                  <span className="ml-2 inline-block rounded bg-err/10 text-err text-[11px] font-semibold uppercase tracking-wider px-1.5 py-0.5">
                    Red flag
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {checkpoint.kind === 'short' && (
        <textarea
          value={shortText}
          disabled={submitted}
          onChange={e => setShortText(e.target.value)}
          rows={3}
          placeholder="Type your answer…"
          className="w-full rounded-lg border border-ink-200 bg-white p-3 text-[15px] text-ink-900 focus:outline-none focus:border-ink-900 mb-5 disabled:bg-ink-50"
        />
      )}

      {!submitted && (
        <button onClick={submit} disabled={!canSubmit} className="btn-primary">
          Commit answer
        </button>
      )}

      {submitted && (
        <div className={`mt-4 rounded-lg border p-4 ${isCorrect ? 'border-ok/30 bg-[#EAF6EF]' : 'border-err/30 bg-[#FDECEA]'}`}>
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-2 text-ink-900/80">
            {isCorrect ? 'Correct' : 'Not quite'}
          </div>
          <div className="text-[15px] leading-relaxed text-ink-800">
            {loading && !feedback ? <span className="text-ink-500">Generating coaching…</span> : feedback ?? checkpoint.explanation}
          </div>
        </div>
      )}
    </section>
  );
}

function computeCorrect(cp: CP, selected: string[], shortText: string): boolean {
  if (cp.kind === 'short') {
    const norm = (s: string) => s.trim().toLowerCase();
    const correct = Array.isArray(cp.correct) ? cp.correct : [cp.correct];
    return correct.some(c => norm(shortText) === norm(c));
  }
  const correct = Array.isArray(cp.correct) ? cp.correct : [cp.correct];
  if (cp.kind === 'mcq') return selected.length === 1 && correct.includes(selected[0]);
  // multi
  if (selected.length !== correct.length) return false;
  return correct.every(c => selected.includes(c));
}

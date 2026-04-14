import type { Callout as C } from '@/content/types';
import { Markdown } from '@/lib/markdown';

export default function Callout({ kind, title, body }: C) {
  const style = {
    takeaway: 'border-accent/30 bg-accent-soft text-ink-800',
    warning:  'border-err/30 bg-[#FDECEA] text-ink-800',
    note:     'border-ink-200 bg-ink-50 text-ink-700',
  }[kind];
  const label = {
    takeaway: 'Key takeaway',
    warning:  'Red flag',
    note:     'Note',
  }[kind];
  return (
    <div className={`my-7 rounded-xl border px-5 py-4 ${style}`}>
      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-2 text-ink-900/80">
        {title ?? label}
      </div>
      <div className="prose-reader !text-[15px] [&_p]:!mb-2 [&_p:last-child]:!mb-0">
        <Markdown source={body} />
      </div>
    </div>
  );
}

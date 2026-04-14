import type { Module, Section } from '@/content/types';

interface Props {
  module: Module;
  section: Section;
  sectionIndex: number;
  sectionsCompleted?: string[];
  children: React.ReactNode;
}

export default function SectionLayout({ module, section, sectionIndex, children }: Props) {
  const total = module.sections.length;
  return (
    <div className="min-h-screen">
      <div className="max-w-[800px] px-8 py-10">
        <div className="mb-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500 mb-2">
            Section {sectionIndex + 1} of {total}{section.kicker ? ` · ${section.kicker}` : ''}
          </div>
          <h1 className="text-3xl font-semibold text-ink-900 tracking-tight">{section.title}</h1>
        </div>
        <article className="prose-reader max-w-[72ch]">
          {children}
        </article>
      </div>
    </div>
  );
}

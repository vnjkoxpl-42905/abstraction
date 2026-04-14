import { Link } from 'react-router-dom';
import type { Module, Section } from '@/content/types';

interface Props {
  module: Module;
  section: Section;
  sectionIndex: number;
  children: React.ReactNode;
}

export default function SectionLayout({ module, section, sectionIndex, children }: Props) {
  const total = module.sections.length;
  return (
    <div className="min-h-screen">
      <TopBar module={module} />
      <div className="mx-auto max-w-[1100px] grid grid-cols-12 gap-10 px-8 py-10">
        <aside className="col-span-3">
          <div className="sticky top-24">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500 mb-3">
              {module.title}
            </div>
            <ol className="space-y-1.5">
              {module.sections.map((s, i) => {
                const active = s.slug === section.slug;
                return (
                  <li key={s.slug}>
                    <Link
                      to={`/m/${module.slug}/${s.slug}`}
                      className={`block rounded-md px-3 py-2 text-[13.5px] leading-snug transition ${
                        active ? 'bg-ink-900 text-white' : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
                      }`}
                    >
                      <span className="tabular-nums text-[11px] mr-2 opacity-60">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {s.title}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2 mt-2 border-t border-ink-200">
                <Link
                  to={`/m/${module.slug}/lsat`}
                  className="block rounded-md px-3 py-2 text-[13.5px] leading-snug text-ink-600 hover:bg-ink-100 hover:text-ink-900"
                >
                  <span className="tabular-nums text-[11px] mr-2 opacity-60">LS</span>
                  LSAT set
                </Link>
              </li>
            </ol>
          </div>
        </aside>
        <main className="col-span-9">
          <div className="mb-8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500 mb-2">
              Section {sectionIndex + 1} of {total}{section.kicker ? ` · ${section.kicker}` : ''}
            </div>
            <h1 className="text-3xl font-semibold text-ink-900 tracking-tight">{section.title}</h1>
          </div>
          <article className="prose-reader max-w-[68ch]">
            {children}
          </article>
        </main>
      </div>
    </div>
  );
}

function TopBar({ module }: { module: Module }) {
  return (
    <header className="sticky top-0 z-10 border-b border-ink-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-[1100px] flex items-center justify-between px-8 h-14">
        <Link to="/" className="flex items-center gap-2 text-ink-900">
          <Logo />
          <span className="font-semibold tracking-tight">Abstraction</span>
          <span className="text-ink-400 text-sm">/ {module.title}</span>
        </Link>
        <Link to="/" className="btn-ghost text-sm">Dashboard</Link>
      </div>
    </header>
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

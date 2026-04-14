import React from 'react';

// Minimal markdown renderer: paragraphs, **bold**, *italic*, - bullets, ### headings.
// Keeps us from pulling in a full markdown dep for the MVP.
export function Markdown({ source }: { source: string }) {
  const blocks = source.trim().split(/\n{2,}/);
  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split('\n');
        if (lines.every(l => l.startsWith('- '))) {
          return (
            <ul key={i}>
              {lines.map((l, j) => <li key={j}>{inline(l.slice(2))}</li>)}
            </ul>
          );
        }
        if (lines[0].startsWith('### ')) {
          return <h3 key={i}>{inline(lines[0].slice(4))}</h3>;
        }
        if (lines[0].startsWith('## ')) {
          return <h2 key={i}>{inline(lines[0].slice(3))}</h2>;
        }
        if (lines[0].startsWith('> ')) {
          return <blockquote key={i}>{inline(lines.map(l => l.replace(/^> ?/, '')).join(' '))}</blockquote>;
        }
        return <p key={i}>{inline(block.replace(/\n/g, ' '))}</p>;
      })}
    </>
  );
}

function inline(text: string): React.ReactNode {
  // **bold**, *italic*, `code`
  const parts: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0; let m: RegExpExecArray | null; let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('**')) parts.push(<strong key={i++}>{tok.slice(2, -2)}</strong>);
    else if (tok.startsWith('`')) parts.push(<code key={i++}>{tok.slice(1, -1)}</code>);
    else parts.push(<em key={i++}>{tok.slice(1, -1)}</em>);
    last = m.index + tok.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

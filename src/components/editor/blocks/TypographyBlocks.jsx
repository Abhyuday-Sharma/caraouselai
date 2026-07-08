import React from 'react';

// Helper to parse *text* into a highlighted span
const parseHighlight = (text) => {
  if (!text || typeof text !== 'string') return text;
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return <span key={i} className="slide-highlight" style={{ color: 'var(--sys-accent)' }}>{part.slice(1, -1)}</span>;
    }
    return part;
  });
};

export function HeroHeading({ text }) {
  // Typography Intelligence: Scale based on length
  const length = text?.length || 0;
  let baseScale = 3.5;
  if (length > 40) baseScale = 2.8;
  if (length > 80) baseScale = 2.2;
  
  return (
    <h1 style={{ 
      fontSize: `clamp(2em, 8cqw, ${baseScale}em)`, 
      fontWeight: 'var(--sys-font-heading-weight, 800)',
      lineHeight: length > 40 ? '1.1' : '1.05',
      letterSpacing: '-0.03em',
      color: 'var(--sys-text)',
      margin: '0',
      whiteSpace: 'pre-line',
      maxWidth: '20ch' // Keep massive headers relatively tight
    }}>
      {parseHighlight(text)}
    </h1>
  );
}

export function SectionHeading({ text }) {
  const length = text?.length || 0;
  const baseScale = length > 40 ? 1.8 : 2.2;

  return (
    <h2 style={{ 
      fontSize: `clamp(1.5em, 6cqw, ${baseScale}em)`, 
      fontWeight: 'var(--sys-font-heading-weight, 700)',
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
      color: 'var(--sys-primary)',
      margin: '0',
      maxWidth: '30ch'
    }}>
      {parseHighlight(text)}
    </h2>
  );
}

export function Paragraph({ text }) {
  const length = text?.length || 0;
  // Shorter paragraphs can be slightly larger for emphasis
  const baseScale = length < 100 ? 1.6 : 1.4;

  return (
    <p style={{ 
      fontSize: `clamp(0.9em, 3cqw, ${baseScale * 0.9}em)`, 
      lineHeight: '1.5',
      color: 'var(--sys-text-muted)',
      margin: '0',
      width: '100%',
      maxWidth: '65ch', // Perfect editorial measure
      whiteSpace: 'pre-line'
    }}>
      {text}
    </p>
  );
}

export function QuoteBlock({ quote, author, role }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75em', borderLeft: '4px solid var(--sys-accent)', paddingLeft: '1.5em' }}>
      <h3 style={{ 
        fontSize: 'clamp(1.2em, 4.5cqw, 1.8em)', 
        fontStyle: 'italic',
        lineHeight: '1.4',
        margin: 0,
        color: 'var(--sys-text)'
      }}>
        "{quote}"
      </h3>
      <div>
        <strong style={{ display: 'block', color: 'var(--sys-primary)', fontSize: '1.1em' }}>{author}</strong>
        <span style={{ color: 'var(--sys-text-muted)', fontSize: '0.9em' }}>{role}</span>
      </div>
    </div>
  );
}

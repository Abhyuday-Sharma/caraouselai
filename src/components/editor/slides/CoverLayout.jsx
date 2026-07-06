import React from 'react';
import { Sparkles } from 'lucide-react';

export default function CoverLayout({ content }) {
  return (
    <div className="slide-inner" style={{ justifyContent: 'center', textAlign: 'center' }}>
      
      {/* Decorative top element */}
      <div style={{ marginBottom: 'auto', display: 'flex', justifyContent: 'center' }}>
        <div style={{ 
          background: 'var(--sys-primary)', 
          color: 'var(--sys-bg)', 
          padding: '0.5em 1.5em', 
          borderRadius: 'var(--sys-radius-full)',
          fontSize: '0.8em',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5em'
        }}>
          <Sparkles size={16} /> Swipe to learn
        </div>
      </div>

      <h1 style={{ 
        fontSize: '3.5em', 
        fontWeight: 'var(--sys-font-heading-weight, 700)',
        marginBottom: '0.2em',
        whiteSpace: 'pre-line' // respects \n from content engine
      }}>
        {content.title}
      </h1>
      
      <p style={{ 
        fontSize: '1.5em', 
        color: 'var(--sys-primary)',
        marginBottom: '2em'
      }}>
        {content.subtitle}
      </p>

      {/* Decorative bottom element */}
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5em' }}>
        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--sys-accent)' }}></div>
        <span style={{ fontWeight: '600' }}>{content.author}</span>
      </div>
    </div>
  );
}

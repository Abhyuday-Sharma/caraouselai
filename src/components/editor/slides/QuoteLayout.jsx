import React from 'react';
import { Quote } from 'lucide-react';

export default function QuoteLayout({ content }) {
  return (
    <div className="slide-inner" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <Quote size={64} style={{ color: 'var(--sys-accent)', opacity: 0.5, marginBottom: '0.5em' }} />
      
      <h2 style={{ 
        fontSize: '2.5em', 
        fontStyle: 'italic',
        lineHeight: '1.4',
        marginBottom: '1em'
      }}>
        "{content.quote}"
      </h2>
      
      <div style={{ 
        borderTop: '2px solid var(--sys-primary)', 
        paddingTop: '1em',
        display: 'inline-block'
      }}>
        <strong style={{ display: 'block', fontSize: '1.2em', color: 'var(--sys-primary)' }}>{content.author}</strong>
        <span style={{ color: 'var(--sys-text-muted)', fontSize: '0.9em' }}>{content.role}</span>
      </div>
    </div>
  );
}

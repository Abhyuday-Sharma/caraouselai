import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ListLayout({ content }) {
  return (
    <div className="slide-inner">
      <h2 style={{ fontSize: '2.5em', marginBottom: '1.5em', color: 'var(--sys-primary)' }}>
        {content.heading}
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5em' }}>
        {content.items && content.items.map((item, index) => (
          <div key={index} className="slide-glass-card" style={{ 
            display: 'flex', 
            gap: '1em',
            alignItems: 'flex-start',
            padding: '1.5em'
          }}>
            <CheckCircle2 size={32} style={{ color: 'var(--sys-accent)', flexShrink: 0, marginTop: '0.2em' }} />
            <div>
              <h3 style={{ fontSize: '1.3em', marginBottom: '0.3em' }}>{item.title}</h3>
              <p style={{ fontSize: '1em', margin: 0 }}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

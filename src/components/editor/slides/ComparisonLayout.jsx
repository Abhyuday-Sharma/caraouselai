import React from 'react';
import { XCircle, CheckCircle2 } from 'lucide-react';

export default function ComparisonLayout({ content }) {
  return (
    <div className="slide-inner" style={{ justifyContent: 'center' }}>
      
      <h2 style={{ fontSize: '2.5em', marginBottom: '1.5em', textAlign: 'center', color: 'var(--sys-text)' }}>
        {content.heading}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2em' }}>
        
        {/* Left Side (Myth/Bad) */}
        <div className="slide-glass-card" style={{ borderTop: '4px solid #ef4444' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em', marginBottom: '1em', color: '#ef4444' }}>
            <XCircle size={24} />
            <span style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {content.leftSide.label}
            </span>
          </div>
          <p style={{ fontSize: '1.2em', margin: 0, color: 'var(--sys-text-muted)' }}>
            {content.leftSide.text}
          </p>
        </div>

        {/* Right Side (Fact/Good) */}
        <div className="slide-glass-card" style={{ borderTop: '4px solid #22c55e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em', marginBottom: '1em', color: '#22c55e' }}>
            <CheckCircle2 size={24} />
            <span style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {content.rightSide.label}
            </span>
          </div>
          <p style={{ fontSize: '1.2em', margin: 0, fontWeight: '500', color: 'var(--sys-text)' }}>
            {content.rightSide.text}
          </p>
        </div>

      </div>
    </div>
  );
}

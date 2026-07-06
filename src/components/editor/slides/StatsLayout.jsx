import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function StatsLayout({ content }) {
  return (
    <div className="slide-inner" style={{ justifyContent: 'center' }}>
      
      <h2 style={{ fontSize: '2em', marginBottom: '2em', color: 'var(--sys-text)' }}>
        {content.heading}
      </h2>

      <div className="slide-glass-card" style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '3em 2em',
        marginBottom: '2em',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <TrendingUp size={120} style={{ 
          position: 'absolute', 
          right: '-20px', 
          bottom: '-20px', 
          opacity: 0.1, 
          color: 'var(--sys-primary)' 
        }} />
        
        <div style={{ fontSize: '5em', fontWeight: '900', color: 'var(--sys-primary)', lineHeight: 1 }}>
          {content.statNumber}
        </div>
        <div style={{ fontSize: '1.5em', fontWeight: '600', color: 'var(--sys-accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.5em' }}>
          {content.statLabel}
        </div>
      </div>

      <p style={{ fontSize: '1.2em' }}>{content.body}</p>
      
    </div>
  );
}

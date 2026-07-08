import React from 'react';
import { CheckCircle2, TrendingUp, XCircle } from 'lucide-react';

export function StatisticCard({ number, label }) {
  return (
    <div className="slide-glass-card" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '0.5em', 
      position: 'relative', 
      overflow: 'hidden',
      padding: '1.25em',
      borderRadius: 'var(--sys-radius-lg)',
      background: 'var(--sys-card-bg)',
      backdropFilter: 'blur(12px)',
      border: 'var(--sys-card-border, 1px solid rgba(255, 255, 255, 0.1))',
      boxShadow: 'var(--sys-shadow-soft)'
    }}>
      <TrendingUp style={{ position: 'absolute', right: '-10%', bottom: '-10%', width: '60%', height: 'auto', opacity: 0.05, color: 'var(--sys-primary)' }} />
      <span style={{ fontSize: 'clamp(3em, 12cqw, 6em)', fontWeight: '900', color: 'var(--sys-primary)', lineHeight: 1 }}>
        {number}
      </span>
      <span style={{ fontSize: '1.2em', fontWeight: '600', color: 'var(--sys-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {label}
      </span>
    </div>
  );
}

export function HighlightCard({ title, subtitle }) {
  return (
    <div className="slide-glass-card" style={{ 
      borderLeft: '4px solid var(--sys-accent)', 
      padding: '1.25em',
      borderRadius: 'var(--sys-radius-lg)',
      background: 'var(--sys-card-bg)',
      backdropFilter: 'blur(12px)',
      boxShadow: 'var(--sys-shadow-soft)',
      border: 'var(--sys-card-border, 1px solid rgba(255, 255, 255, 0.05))'
    }}>
      <h4 style={{ fontSize: '1.5em', margin: '0 0 0.25em 0', color: 'var(--sys-card-text, var(--sys-text))' }}>{title}</h4>
      {subtitle && <p style={{ fontSize: '1em', margin: 0, color: 'var(--sys-card-text-muted, var(--sys-text-muted))', lineHeight: 1.5 }}>{subtitle}</p>}
    </div>
  );
}

export function ComparisonCard({ leftLabel, leftText, rightLabel, rightText }) {
  const cardStyle = {
    padding: '1.25em',
    borderRadius: 'var(--sys-radius-md)',
    background: 'var(--sys-card-bg)',
    backdropFilter: 'blur(12px)',
    boxShadow: 'var(--sys-shadow-soft)',
    border: 'var(--sys-card-border, 1px solid rgba(255, 255, 255, 0.05))',
    flex: 1
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '0.75em', width: '100%' }}>
      <div className="slide-glass-card" style={{ ...cardStyle, borderTop: '4px solid #ef4444', flex: '1 1 180px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em', marginBottom: '0.5em', color: '#ef4444', fontWeight: 'bold', textTransform: 'uppercase' }}>
          <XCircle size={20} /> {leftLabel}
        </div>
        <p style={{ margin: 0, fontSize: '1.1em', color: 'var(--sys-card-text, var(--sys-text))', lineHeight: 1.5 }}>{leftText}</p>
      </div>
      <div className="slide-glass-card" style={{ ...cardStyle, borderTop: '4px solid #22c55e', flex: '1 1 180px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em', marginBottom: '0.5em', color: '#22c55e', fontWeight: 'bold', textTransform: 'uppercase' }}>
          <CheckCircle2 size={20} /> {rightLabel}
        </div>
        <p style={{ margin: 0, fontSize: '1.1em', color: 'var(--sys-card-text, var(--sys-text))', lineHeight: 1.5 }}>{rightText}</p>
      </div>
    </div>
  );
}

export function ListBlock({ items }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em', width: '100%' }}>
      {items.map((item, i) => {
        let isStrikethrough = false;
        let cleanText = item;
        
        if (item.startsWith('~~') && item.endsWith('~~')) {
          isStrikethrough = true;
          cleanText = item.slice(2, -2);
        } else if (item.startsWith('- ')) {
          isStrikethrough = true;
          cleanText = item.slice(2);
        }

        const Icon = isStrikethrough ? XCircle : CheckCircle2;
        const iconColor = isStrikethrough ? '#f87171' : 'var(--sys-accent)';

        return (
          <div key={i} style={{ 
            display: 'flex', 
            gap: '1em', 
            alignItems: 'center', 
            background: 'var(--sys-card-bg)', 
            border: 'var(--sys-card-border, 1px solid rgba(255,255,255,0.05))', 
            padding: '0.75em 1em', 
            borderRadius: 'var(--sys-radius-md)',
            opacity: isStrikethrough ? 0.65 : 1
          }}>
            <Icon style={{ color: iconColor, flexShrink: 0 }} size={18} />
            <span style={{ 
              fontSize: '1.1em', 
              fontWeight: '500', 
              color: 'var(--sys-card-text, var(--sys-text))',
              textDecoration: isStrikethrough ? 'line-through' : 'none'
            }}>
              {cleanText}
            </span>
          </div>
        );
      })}
    </div>
  );
}

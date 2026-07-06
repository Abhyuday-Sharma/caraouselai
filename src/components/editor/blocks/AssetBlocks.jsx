import React from 'react';
import { ArrowDown, CheckSquare, Activity, BarChart3, TrendingUp } from 'lucide-react';

export function TimelineFlow({ nodes = ['Start', 'Middle', 'End'] }) {
  return (
    <div className="asset-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '0.5em', width: '100%' }}>
      {nodes.map((node, i) => (
        <React.Fragment key={i}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1em', background: 'var(--sys-surface)', padding: '1em 1.5em', borderRadius: 'var(--sys-radius-md)', borderLeft: '4px solid var(--sys-primary)' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.2em', color: 'var(--sys-primary)' }}>0{i+1}</span>
            <span style={{ fontSize: '1.1em', color: 'var(--sys-text)', fontWeight: '500' }}>{node}</span>
          </div>
          {i < nodes.length - 1 && (
            <div style={{ paddingLeft: '2.5em', color: 'var(--sys-text-muted)' }}>
              <ArrowDown size={20} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export function DataDashboard({ metrics = 'High Impact' }) {
  return (
    <div className="asset-dashboard" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em', width: '100%', background: 'rgba(0,0,0,0.02)', padding: '1.5em', borderRadius: 'var(--sys-radius-lg)', border: '1px solid rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em', background: 'var(--sys-surface)', padding: '1.5em', borderRadius: 'var(--sys-radius-md)' }}>
        <Activity color="var(--sys-primary)" />
        <span style={{ fontSize: '2em', fontWeight: 'bold', color: 'var(--sys-text)' }}>+140%</span>
        <span style={{ fontSize: '0.85em', color: 'var(--sys-text-muted)' }}>Growth Rate</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em', background: 'var(--sys-surface)', padding: '1.5em', borderRadius: 'var(--sys-radius-md)' }}>
        <BarChart3 color="var(--sys-accent)" />
        <span style={{ fontSize: '2em', fontWeight: 'bold', color: 'var(--sys-text)' }}>98.5%</span>
        <span style={{ fontSize: '0.85em', color: 'var(--sys-text-muted)' }}>Retention</span>
      </div>
      <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--sys-primary)', color: 'var(--sys-bg)', padding: '1em 1.5em', borderRadius: 'var(--sys-radius-md)' }}>
        <span style={{ fontWeight: '600' }}>{metrics} Indicator</span>
        <TrendingUp size={18} />
      </div>
    </div>
  );
}

export function ChecklistGrid({ items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'] }) {
  return (
    <div className="asset-checklist" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em', width: '100%' }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75em', padding: '1em', background: 'var(--sys-surface)', borderRadius: 'var(--sys-radius-md)' }}>
          <CheckSquare style={{ color: 'var(--sys-accent)', flexShrink: 0 }} size={20} />
          <span style={{ fontSize: '0.95em', fontWeight: '500', color: 'var(--sys-text)' }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

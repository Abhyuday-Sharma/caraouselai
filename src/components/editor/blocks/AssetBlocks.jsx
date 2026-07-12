import React from 'react';
import { ArrowDown, CheckSquare, Activity, BarChart3, TrendingUp } from 'lucide-react';

export function TimelineFlow({ nodes = ['Start', 'Middle', 'End'] }) {
  const safeNodes = Array.isArray(nodes) ? nodes : [];
  
  return (
    <div className="asset-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '0.5em', width: '100%' }}>
      {safeNodes.map((node, i) => {
        let titleText = '';
        let descText = '';

        if (typeof node === 'string') {
          titleText = node;
        } else if (node && typeof node === 'object') {
          titleText = node.year || node.title || node.label || node.header || '';
          descText = node.event || node.description || node.value || node.text || '';
          if (!titleText && !descText) {
            titleText = JSON.stringify(node);
          }
        }

        return (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1em', background: 'var(--sys-surface)', padding: '1em 1.5em', borderRadius: 'var(--sys-radius-md)', borderLeft: '4px solid var(--sys-primary)' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.2em', color: 'var(--sys-primary)' }}>0{i+1}</span>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <span style={{ fontSize: '1.1em', color: 'var(--sys-text)', fontWeight: '500' }}>{titleText}</span>
                {descText && (
                  <span style={{ fontSize: '0.85em', color: 'var(--sys-text-muted)', marginTop: '0.25em' }}>{descText}</span>
                )}
              </div>
            </div>
            {i < safeNodes.length - 1 && (
              <div style={{ paddingLeft: '2.5em', color: 'var(--sys-text-muted)' }}>
                <ArrowDown size={20} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function DataDashboard({ metrics = 'High Impact' }) {
  let m1 = { value: '+140%', label: 'Growth Rate' };
  let m2 = { value: '98.5%', label: 'Retention' };
  let indicator = 'Performance';

  if (typeof metrics === 'string') {
    indicator = metrics;
  } else if (Array.isArray(metrics)) {
    if (metrics[0]) {
      m1 = {
        value: metrics[0].value || metrics[0].number || metrics[0].title || '+140%',
        label: metrics[0].label || metrics[0].subtitle || metrics[0].description || 'Growth Rate'
      };
    }
    if (metrics[1]) {
      m2 = {
        value: metrics[1].value || metrics[1].number || metrics[1].title || '98.5%',
        label: metrics[1].label || metrics[1].subtitle || metrics[1].description || 'Retention'
      };
    }
    indicator = 'Key Metrics';
  } else if (metrics && typeof metrics === 'object') {
    m1 = {
      value: metrics.value1 || metrics.value || metrics.number || '+140%',
      label: metrics.label1 || metrics.label || metrics.title || 'Growth Rate'
    };
    m2 = {
      value: metrics.value2 || metrics.value || '98.5%',
      label: metrics.label2 || metrics.label || 'Retention'
    };
    indicator = metrics.indicator || metrics.title || 'Performance';
  }

  return (
    <div className="asset-dashboard" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em', width: '100%', background: 'rgba(0,0,0,0.02)', padding: '1.5em', borderRadius: 'var(--sys-radius-lg)', border: '1px solid rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em', background: 'var(--sys-surface)', padding: '1.5em', borderRadius: 'var(--sys-radius-md)' }}>
        <Activity color="var(--sys-primary)" />
        <span style={{ fontSize: '1.8em', fontWeight: 'bold', color: 'var(--sys-text)', wordBreak: 'break-word', lineHeight: 1.2 }}>{m1.value}</span>
        <span style={{ fontSize: '0.8em', color: 'var(--sys-text-muted)' }}>{m1.label}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em', background: 'var(--sys-surface)', padding: '1.5em', borderRadius: 'var(--sys-radius-md)' }}>
        <BarChart3 color="var(--sys-accent)" />
        <span style={{ fontSize: '1.8em', fontWeight: 'bold', color: 'var(--sys-text)', wordBreak: 'break-word', lineHeight: 1.2 }}>{m2.value}</span>
        <span style={{ fontSize: '0.8em', color: 'var(--sys-text-muted)' }}>{m2.label}</span>
      </div>
      <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--sys-primary)', color: 'var(--sys-bg)', padding: '1em 1.5em', borderRadius: 'var(--sys-radius-md)' }}>
        <span style={{ fontWeight: '600' }}>{indicator} Indicator</span>
        <TrendingUp size={18} />
      </div>
    </div>
  );
}

export function ChecklistGrid({ items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'] }) {
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className="asset-checklist" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em', width: '100%' }}>
      {safeItems.map((item, i) => {
        let itemText = '';
        if (typeof item === 'string') {
          itemText = item;
        } else if (item && typeof item === 'object') {
          itemText = item.title || item.text || item.label || item.value || JSON.stringify(item);
        }
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75em', padding: '1em', background: 'var(--sys-surface)', borderRadius: 'var(--sys-radius-md)' }}>
            <CheckSquare style={{ color: 'var(--sys-accent)', flexShrink: 0 }} size={20} />
            <span style={{ fontSize: '0.95em', fontWeight: '500', color: 'var(--sys-text)', textAlign: 'left' }}>{itemText}</span>
          </div>
        );
      })}
    </div>
  );
}

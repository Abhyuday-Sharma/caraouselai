import React from 'react';

// Safe keyword & string highlighting for Javascript/React code
function highlightLine(line) {
  if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
    return <span style={{ color: 'var(--sys-text-muted, #8a8f98)', opacity: 0.7, fontStyle: 'italic' }}>{line}</span>;
  }
  
  // Regex to split by keywords, strings, and operators
  const tokens = line.split(/(\s+|\bconst\b|\blet\b|\bvar\b|\bfunction\b|\breturn\b|\bimport\b|\bfrom\b|\bexport\b|\bdefault\b|\bclass\b|\bextends\b|"[^"]*"|'[^']*'|`[^`]*`)/g);
  
  return tokens.map((token, index) => {
    if (['const', 'let', 'var', 'function', 'return', 'import', 'from', 'export', 'default', 'class', 'extends'].includes(token)) {
      return <span key={index} style={{ color: 'var(--sys-accent, #ec4899)', fontWeight: '600' }}>{token}</span>;
    }
    if ((token.startsWith('"') && token.endsWith('"')) || 
        (token.startsWith("'") && token.endsWith("'")) || 
        (token.startsWith('`') && token.endsWith('`'))) {
      return <span key={index} style={{ color: '#10b981' }}>{token}</span>; // green strings
    }
    return <span key={index}>{token}</span>;
  });
}

export function BrowserMockup({ url = 'https://example.com', title = 'Dashboard Preview', items = [] }) {
  return (
    <div className="slide-glass-card" style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 'var(--sys-radius-md, 8px)',
      background: 'var(--sys-card-bg, rgba(255, 255, 255, 0.8))',
      backdropFilter: 'blur(12px)',
      border: 'var(--sys-card-border, 1px solid rgba(255, 255, 255, 0.1))',
      overflow: 'hidden',
      padding: 0,
      boxShadow: 'var(--sys-shadow-soft)'
    }}>
      {/* Top Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.6em 1em',
        background: 'rgba(0,0,0,0.03)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        gap: '0.5em'
      }}>
        {/* Windows Dots */}
        <div style={{ display: 'flex', gap: '4px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
        </div>
        {/* Address Bar */}
        <div style={{
          flex: 1,
          margin: '0 1em',
          background: 'var(--sys-surface, rgba(255,255,255,0.5))',
          borderRadius: '4px',
          fontSize: '0.7em',
          padding: '0.3em 1em',
          textAlign: 'center',
          color: 'var(--sys-card-text-muted, var(--sys-text-muted))',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.03)'
        }}>
          {url}
        </div>
      </div>
      
      {/* Viewport Content */}
      <div style={{ padding: '1.25em', display: 'flex', flexDirection: 'column', gap: '0.75em' }}>
        <h4 style={{ fontSize: '1.2em', fontWeight: 'bold', margin: 0, color: 'var(--sys-card-text, var(--sys-text))' }}>
          {title}
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
          {items.map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5em',
              fontSize: '0.85em',
              padding: '0.5em 0.75em',
              background: 'var(--sys-surface, rgba(0,0,0,0.02))',
              borderRadius: '4px',
              borderLeft: '3px solid var(--sys-primary)',
              color: 'var(--sys-card-text, var(--sys-text))'
            }}>
              <span style={{ fontWeight: 'bold', color: 'var(--sys-primary)' }}>{index + 1}.</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CodeTerminalMockup({ filename = 'index.js', code = '// Code here' }) {
  const lines = code.split('\n');

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 'var(--sys-radius-md, 8px)',
      background: '#1e1e24', // Sleek dark code editor background
      color: '#abb2bf',
      fontFamily: 'monospace',
      border: '1px solid rgba(255,255,255,0.05)',
      overflow: 'hidden',
      boxShadow: 'var(--sys-shadow-elevated)'
    }}>
      {/* Tab bar / header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.6em 1em',
        background: '#18181c',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
        </div>
        <div style={{
          fontSize: '0.75em',
          color: '#8a8f98',
          fontWeight: '500',
          fontFamily: 'sans-serif'
        }}>
          {filename}
        </div>
        <div style={{ width: '32px' }} /> {/* Spacer */}
      </div>

      {/* Editor view */}
      <div style={{
        padding: '1.25em',
        margin: 0,
        overflowX: 'auto',
        fontSize: '0.85em',
        lineHeight: 1.5,
        textAlign: 'left'
      }}>
        <pre style={{ margin: 0, fontFamily: 'inherit' }}>
          <code>
            {lines.map((line, index) => (
              <div key={index} style={{ display: 'flex' }}>
                <span style={{
                  width: '2em',
                  color: '#4b5263',
                  userSelect: 'none',
                  textAlign: 'right',
                  marginRight: '1.2em',
                  fontSize: '0.9em'
                }}>
                  {index + 1}
                </span>
                <span style={{ flex: 1, whiteSpace: 'pre' }}>
                  {highlightLine(line)}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

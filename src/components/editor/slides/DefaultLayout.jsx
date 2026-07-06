import React from 'react';

export default function DefaultLayout({ content }) {
  return (
    <div className="slide-inner" style={{ justifyContent: 'center' }}>
      {content.heading && (
        <h2 style={{ fontSize: '2.5em', marginBottom: '0.5em', color: 'var(--sys-primary)' }}>
          {content.heading}
        </h2>
      )}
      {content.body && (
        <p style={{ fontSize: '1.2em' }}>{content.body}</p>
      )}
      {content.highlight && (
        <div className="slide-glass-card" style={{ marginTop: '2em', borderLeft: '4px solid var(--sys-accent)' }}>
          <strong className="slide-accent-text" style={{ fontSize: '1.5em' }}>{content.highlight}</strong>
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { Bookmark, Share2, Heart, MessageCircle } from 'lucide-react';

export default function CtaLayout({ content }) {
  return (
    <div className="slide-inner" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      
      <div style={{
        display: 'flex',
        gap: '1em',
        marginBottom: '2em',
        color: 'var(--sys-primary)'
      }}>
        <Heart size={48} />
        <MessageCircle size={48} />
        <Share2 size={48} />
        <Bookmark size={48} />
      </div>

      <h2 style={{ fontSize: '3em', marginBottom: '0.5em', color: 'var(--sys-text)' }}>
        {content.heading}
      </h2>
      
      <p style={{ fontSize: '1.2em', marginBottom: '2.5em', maxWidth: '80%' }}>
        {content.body}
      </p>

      <div style={{ 
        background: 'var(--sys-primary)', 
        color: 'var(--sys-bg)', 
        padding: '1em 2em', 
        borderRadius: 'var(--sys-radius-full)',
        fontSize: '1.5em',
        fontWeight: 'bold',
        boxShadow: 'var(--sys-shadow-elevated)'
      }}>
        {content.ctaText}
      </div>
      
    </div>
  );
}

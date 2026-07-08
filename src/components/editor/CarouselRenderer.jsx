import React, { useMemo } from 'react';
import EditorialGrid from './composition/EditorialGrid';
import './CarouselRenderer.css';

export default function CarouselRenderer({ slide, designSystem }) {
  // Extract CSS variables from design system to apply dynamically to the container
  const styleVars = useMemo(() => {
    if (!designSystem) return {};
    return {
      '--sys-bg': designSystem.ColorPalette.Background,
      '--sys-surface': designSystem.ColorPalette.Surface,
      '--sys-primary': designSystem.ColorPalette.Primary,
      '--sys-secondary': designSystem.ColorPalette.Secondary,
      '--sys-accent': designSystem.ColorPalette.Accent,
      '--sys-text': designSystem.ColorPalette.Text,
      '--sys-text-muted': designSystem.ColorPalette.TextMuted,
      
      '--sys-font-heading': designSystem.TypographyPairing.HeadingFont,
      '--sys-font-body': designSystem.TypographyPairing.BodyFont,
      
      '--sys-radius-sm': designSystem.BorderRadius.Small,
      '--sys-radius-md': designSystem.BorderRadius.Medium,
      '--sys-radius-lg': designSystem.BorderRadius.Large,
      
      '--sys-shadow-soft': designSystem.ShadowStyles.Soft,
      '--sys-shadow-elevated': designSystem.ShadowStyles.Elevated,
      
      '--sys-bg-glow': designSystem.GradientSystem.BackgroundGlow,
      '--sys-card-bg': designSystem.CardStyles.Background,
      '--sys-card-border': designSystem.CardStyles.Border || '1px solid rgba(255, 255, 255, 0.1)',
      '--sys-card-text': designSystem.CardStyles.CardText || designSystem.ColorPalette.Text,
      '--sys-card-text-muted': designSystem.CardStyles.CardTextMuted || designSystem.ColorPalette.TextMuted,
    };
  }, [designSystem]);

  if (!slide || !designSystem) return null;

  return (
    <div className="carousel-renderer-container">
      {/* Dynamic SVG grain/noise filter definition */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.08 0" />
        </filter>
      </svg>

      {/* The 4:5 scaling container. CSS Container Queries or relative sizing handles responsiveness */}
      <div className={`slide-canvas density-${slide.density?.toLowerCase() || 'medium'}`} style={styleVars}>
        {/* Dynamic mesh glow blobs */}
        <div className="mesh-glow-container" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1, opacity: 0.65 }}>
          <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '70%', height: '70%', borderRadius: '50%', background: 'var(--sys-primary)', filter: 'blur(80px)', opacity: 0.35 }} />
          <div style={{ position: 'absolute', bottom: '-15%', right: '-15%', width: '80%', height: '80%', borderRadius: '50%', background: 'var(--sys-accent)', filter: 'blur(100px)', opacity: 0.25 }} />
          <div style={{ position: 'absolute', top: '35%', right: '-20%', width: '60%', height: '60%', borderRadius: '50%', background: 'var(--sys-secondary)', filter: 'blur(90px)', opacity: 0.3 }} />
        </div>

        {/* The actual slide contents wrapper */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <EditorialGrid slide={slide} />
        </div>
      </div>
    </div>
  );
}

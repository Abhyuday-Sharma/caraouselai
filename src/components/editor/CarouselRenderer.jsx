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
    };
  }, [designSystem]);

  if (!slide || !designSystem) return null;

  return (
    <div className="carousel-renderer-container">
      {/* The 4:5 scaling container. CSS Container Queries or relative sizing handles responsiveness */}
      <div className="slide-canvas" style={styleVars}>
        <EditorialGrid slide={slide} />
      </div>
    </div>
  );
}

import React, { useMemo } from 'react';
import EditorialGrid from './composition/EditorialGrid';
import './CarouselRenderer.css';

const YoriLabsLogo = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    background: '#000000',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '8px',
    padding: '5px 12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
    pointerEvents: 'none',
    width: 'fit-content'
  }}>
    <svg width="24" height="20" viewBox="0 0 45 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 5 5 L 12 17 L 12 30" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 19 5 L 12 17" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 5 5 L 2 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 5 5 L 9 2" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <text x="21" y="14" fill="#ffffff" fontFamily='"Inter", sans-serif' fontSize="10" fontWeight="900" letterSpacing="0.05em">ORI</text>
      <text x="17" y="27" fill="#ffffff" fontFamily='"Inter", sans-serif' fontSize="10" fontWeight="700" letterSpacing="0.05em">LABS</text>
    </svg>
  </div>
);

export default function CarouselRenderer({ slide, designSystem, aspectRatio = '4:5', slideIndex = 0, totalSlides = 1 }) {
  const isYoriLabs = designSystem && designSystem.id === 'yori-labs';

  // Extract CSS variables from design system to apply dynamically to the container
  const styleVars = useMemo(() => {
    if (!designSystem) return {};

    let bg = designSystem.ColorPalette.Background;
    let bgGlow = designSystem.GradientSystem.BackgroundGlow;
    let text = designSystem.ColorPalette.Text;
    let textMuted = designSystem.ColorPalette.TextMuted;
    let primary = designSystem.ColorPalette.Primary;
    let accent = designSystem.ColorPalette.Accent;

    let cardBg = designSystem.CardStyles.Background;
    let cardBorder = designSystem.CardStyles.Border || '1px solid rgba(255, 255, 255, 0.1)';
    let cardText = designSystem.CardStyles.CardText || designSystem.ColorPalette.Text;
    let cardTextMuted = designSystem.CardStyles.CardTextMuted || designSystem.ColorPalette.TextMuted;

    let gridPaddingTop = '2.5em';
    let footerTextDisplay = 'flex';

    if (isYoriLabs) {
      gridPaddingTop = '6.2em';
      footerTextDisplay = 'none';

      // Yori Labs alternating design system based on slideIndex
      // Index 0: Clean off-white
      // Index 1: Dark violet/black
      // Index 2: Vibrant purple gradient
      // Index 3: Clean off-white
      // Index 4: Dark violet/black
      // Index 5: Vibrant purple gradient
      const pattern = slideIndex % 3;
      if (pattern === 0) {
        bg = '#f6f5fa';
        bgGlow = 'radial-gradient(circle at top right, rgba(112, 0, 255, 0.05), transparent 50%)';
        text = '#09070f';
        textMuted = '#5d5a75';
        primary = '#7000ff';
        accent = '#7000ff';

        cardBg = 'rgba(112, 0, 255, 0.04)';
        cardBorder = '1px solid rgba(112, 0, 255, 0.08)';
        cardText = '#09070f';
        cardTextMuted = '#5d5a75';
      } else if (pattern === 1) {
        bg = '#09070f';
        bgGlow = 'radial-gradient(circle at center, rgba(112, 0, 255, 0.15), transparent 70%)';
        text = '#ffffff';
        textMuted = 'rgba(255, 255, 255, 0.6)';
        primary = '#ffffff';
        accent = '#a78bfa'; // Light purple for contrast highlights on dark background

        cardBg = 'rgba(255, 255, 255, 0.04)';
        cardBorder = '1px solid rgba(255, 255, 255, 0.08)';
        cardText = '#ffffff';
        cardTextMuted = 'rgba(255, 255, 255, 0.6)';
      } else {
        bg = '#7000ff';
        bgGlow = 'linear-gradient(135deg, #7000ff 0%, #4c00b0 100%)';
        text = '#ffffff';
        textMuted = 'rgba(255, 255, 255, 0.8)';
        primary = '#ffffff';
        accent = '#ffffff';

        cardBg = 'rgba(255, 255, 255, 0.12)';
        cardBorder = '1px solid rgba(255, 255, 255, 0.2)';
        cardText = '#ffffff';
        cardTextMuted = 'rgba(255, 255, 255, 0.8)';
      }
    }

    return {
      '--sys-bg': bg,
      '--sys-surface': designSystem.ColorPalette.Surface,
      '--sys-primary': primary,
      '--sys-secondary': designSystem.ColorPalette.Secondary,
      '--sys-accent': accent,
      '--sys-text': text,
      '--sys-text-muted': textMuted,
      
      '--sys-font-heading': designSystem.TypographyPairing.HeadingFont,
      '--sys-font-body': designSystem.TypographyPairing.BodyFont,
      
      '--sys-radius-sm': designSystem.BorderRadius.Small,
      '--sys-radius-md': designSystem.BorderRadius.Medium,
      '--sys-radius-lg': designSystem.BorderRadius.Large,
      
      '--sys-shadow-soft': designSystem.ShadowStyles.Soft,
      '--sys-shadow-elevated': designSystem.ShadowStyles.Elevated,
      
      '--sys-bg-glow': bgGlow,
      '--sys-card-bg': cardBg,
      '--sys-card-border': cardBorder,
      '--sys-card-text': cardText,
      '--sys-card-text-muted': cardTextMuted,

      '--sys-grid-padding-top': gridPaddingTop,
      '--sys-footer-text-display': footerTextDisplay,
    };
  }, [designSystem, slideIndex, isYoriLabs]);

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
      <div 
        className={`slide-canvas density-${slide.density?.toLowerCase() || 'medium'}`} 
        style={{
          ...styleVars,
          aspectRatio: aspectRatio === '1:1' ? '1 / 1' : '4 / 5'
        }}
      >
        {/* Dynamic mesh glow blobs */}
        <div className="mesh-glow-container" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1, opacity: 0.65 }}>
          <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '70%', height: '70%', borderRadius: '50%', background: 'var(--sys-primary)', filter: 'blur(80px)', opacity: 0.35 }} />
          <div style={{ position: 'absolute', bottom: '-15%', right: '-15%', width: '80%', height: '80%', borderRadius: '50%', background: 'var(--sys-accent)', filter: 'blur(100px)', opacity: 0.25 }} />
          <div style={{ position: 'absolute', top: '35%', right: '-20%', width: '60%', height: '60%', borderRadius: '50%', background: 'var(--sys-secondary)', filter: 'blur(90px)', opacity: 0.3 }} />
        </div>

        {/* The actual slide contents wrapper */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          {isYoriLabs && (
            <div style={{ 
              position: 'absolute', 
              top: '2.5em', 
              left: '2.5em', 
              zIndex: 100 
            }}>
              <YoriLabsLogo />
            </div>
          )}
          {isYoriLabs && (
            <div style={{ 
              position: 'absolute', 
              top: '2.2em', 
              right: '2.5em', 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '0.4em',
              zIndex: 100 
            }}>
              <div style={{ 
                background: 'rgba(0, 0, 0, 0.4)', 
                backdropFilter: 'blur(4px)',
                borderRadius: '9999px',
                padding: '4px 10px',
                color: '#ffffff',
                fontSize: '0.7em',
                fontWeight: 'bold',
                fontFamily: '"Inter", sans-serif',
                lineHeight: 1
              }}>
                {slideIndex + 1}/{totalSlides}
              </div>
              {slideIndex === 0 && (
                <div style={{ 
                  color: 'var(--sys-accent)', 
                  fontSize: '0.65em', 
                  fontWeight: '900', 
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontFamily: '"Outfit", sans-serif',
                  marginTop: '0.2em'
                }}>
                  BRAND STORY
                </div>
              )}
            </div>
          )}
          <EditorialGrid slide={slide} />
        </div>
      </div>
    </div>
  );
}

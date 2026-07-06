/**
 * AI Visual Language Engine (Phase 5)
 * Translates the Moodboard into exact, programmable design variables.
 */

export function generateVisualLanguage(moodboard) {
  // Base default (Clean/Modern)
  const lang = {
    TypographyPairing: {
      HeadingFont: 'Inter, sans-serif',
      BodyFont: 'Inter, sans-serif',
      Weight: '800'
    },
    AccentSystem: {
      Primary: '#111827',
      Secondary: '#4B5563',
      Accent: '#3B82F6', // Blue
      Background: '#F9FAFB',
      Surface: '#FFFFFF',
      Text: '#111827',
      TextMuted: '#6B7280'
    },
    ShapeLanguage: {
      BorderRadius: '12px',
      ButtonRadius: '9999px',
      CardRadius: '16px'
    },
    HighlightStyle: 'text-color', // text-color, background-pill, underline
    MotifSystem: 'none',
    FooterStyle: 'author-minimal',
    ShadowStyle: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    GridSystem: 'Bento Default'
  };

  // Derive from Moodboard
  if (moodboard.ShapeLanguage.includes('Sharp')) {
    lang.ShapeLanguage = { BorderRadius: '0px', ButtonRadius: '0px', CardRadius: '0px' };
  } else if (moodboard.ShapeLanguage.includes('Pill')) {
    lang.ShapeLanguage = { BorderRadius: '24px', ButtonRadius: '9999px', CardRadius: '24px' };
  }

  if (moodboard.DecorativeStyle.includes('Fine Lines')) {
    lang.TypographyPairing = { HeadingFont: '"Playfair Display", serif', BodyFont: 'Inter, sans-serif', Weight: '600' };
    lang.AccentSystem = { Primary: '#FDFBF7', Accent: '#D4AF37', Background: '#1A1A1A', Surface: '#242424', Text: '#FDFBF7', TextMuted: '#A3A3A3' }; // Luxury Dark
    lang.HighlightStyle = 'text-color';
    lang.MotifSystem = 'concentric-circles'; // Matches aiCarousels reference style
  } else if (moodboard.Atmosphere.includes('Tech')) {
    lang.TypographyPairing = { HeadingFont: '"Space Grotesk", monospace', BodyFont: 'Roboto, sans-serif', Weight: '700' };
    lang.AccentSystem = { Primary: '#FFFFFF', Accent: '#00FFA3', Background: '#000000', Surface: '#111111', Text: '#FFFFFF', TextMuted: '#888888' }; // Tech Dark
    lang.HighlightStyle = 'glowing-text';
    lang.MotifSystem = 'dot-grid';
  }

  return lang;
}

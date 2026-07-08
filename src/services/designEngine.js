/**
 * AI Design Engine Service (Phase 3)
 * Converts the creative strategy (extracted in Phase 2) into a complete, professional design system.
 */

// ─── Color Utility Helpers ─────────────────────────────────────

/**
 * Converts a hex color string to an rgba() CSS value.
 * Supports 3-char (#abc) and 6-char (#aabbcc) hex strings.
 */
export function hexToRgba(hex, alpha = 1) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(ch => ch + ch).join('');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Returns relative luminance of a hex color (0 = black, 1 = white).
 * Used to pick white or dark text automatically for contrast.
 */
export function getLuminance(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(ch => ch + ch).join('');
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  const toLinear = (v) => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Returns a legible text color (white or dark) for a given background hex.
 */
export function getContrastText(bgHex) {
  try {
    return getLuminance(bgHex) > 0.4 ? '#1f2937' : '#ffffff';
  } catch {
    return '#1f2937';
  }
}

/**
 * Generates smart card styles from a primary hex color.
 * Produces a tinted, semi-transparent card background with matching border.
 */
function generateSmartCardStyles(primaryHex, isDarkTheme = false) {
  if (isDarkTheme) {
    return {
      Background: hexToRgba(primaryHex, 0.12),
      BackdropFilter: 'blur(16px)',
      Border: `1px solid ${hexToRgba(primaryHex, 0.2)}`,
      CardText: '#ffffff',
      CardTextMuted: 'rgba(255, 255, 255, 0.6)'
    };
  }
  return {
    Background: hexToRgba(primaryHex, 0.08),
    BackdropFilter: 'blur(12px)',
    Border: `1px solid ${hexToRgba(primaryHex, 0.12)}`,
    CardText: '#1f2937',
    CardTextMuted: '#6b7280'
  };
}

// ─── Main Design System Generator ──────────────────────────────

// Helper to generate a complete design system based on theme keywords
export async function generateDesignSystem(strategy) {
  // Simulate network/AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const theme = (strategy.Topic || strategy.Theme || 'general').toLowerCase();
  const mood = (strategy.Mood || strategy.Tone || 'professional').toLowerCase();

  const basePrimary = strategy.Colors?.Primary || '#3b82f6';

  // Base generic design system (fallback)
  const designSystem = {
    ColorPalette: {
      Primary: basePrimary,
      Secondary: strategy.Colors?.Secondary || '#1e40af',
      Accent: strategy.Colors?.Accent || '#f59e0b',
      Background: '#ffffff',
      Surface: '#f3f4f6',
      Text: '#1f2937',
      TextMuted: '#6b7280'
    },
    GradientSystem: {
      BackgroundGlow: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent 50%)',
      CardGradient: 'linear-gradient(145deg, #ffffff, #f9fafb)'
    },
    TypographyPairing: {
      HeadingFont: '"Inter", sans-serif',
      BodyFont: '"Inter", sans-serif',
      HeadingWeight: '700',
      BodyWeight: '400'
    },
    Backgrounds: {
      Style: 'Subtle noise texture with soft radial gradients',
      Pattern: 'None'
    },
    CardStyles: generateSmartCardStyles(basePrimary, false),
    BorderRadius: {
      Small: '4px',
      Medium: '8px',
      Large: '16px',
      Pill: '9999px'
    },
    ShadowStyles: {
      Soft: '0 4px 20px rgba(0, 0, 0, 0.05)',
      Elevated: '0 10px 30px rgba(0, 0, 0, 0.1)',
      Glow: '0 0 20px rgba(59, 130, 246, 0.3)'
    },
    DecorativeElements: {
      Type: 'Minimalist geometric shapes',
      Opacity: 0.1
    },
    Icons: {
      Style: 'Line-art, minimal, matching Accent color',
      StrokeWidth: '1.5px'
    },
    IllustrationStyle: {
      Type: strategy.IllustrationStyle || 'Abstract 3D',
      Vibe: 'Clean, corporate, professional'
    },
    VisualHierarchy: {
      PrimaryFocus: 'Large typography with high contrast',
      SecondaryFocus: 'Supporting illustrations or product shots'
    },
    LayoutStyle: {
      Type: 'Asymmetrical split layout',
      Padding: '40px'
    }
  };

  // 1. Nature Theme
  if (theme.includes('nature') || theme.includes('wildlife')) {
    designSystem.ColorPalette = {
      Primary: '#166534',
      Secondary: '#14532d',
      Accent: '#eab308',
      Background: '#f0fdf4',
      Surface: '#dcfce7',
      Text: '#064e3b',
      TextMuted: '#166534'
    };
    designSystem.GradientSystem = {
      BackgroundGlow: 'radial-gradient(circle at bottom left, rgba(22, 101, 52, 0.15), transparent 60%)',
      CardGradient: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(220, 252, 231, 0.6))'
    };
    designSystem.TypographyPairing = {
      HeadingFont: '"Lora", serif',
      BodyFont: '"Inter", sans-serif',
      HeadingWeight: '600',
      BodyWeight: '400'
    };
    designSystem.CardStyles = generateSmartCardStyles('#166534', false);
    designSystem.Backgrounds.Style = 'Organic textures, subtle leaf silhouettes';
    designSystem.BorderRadius = { Small: '8px', Medium: '16px', Large: '24px', Pill: '9999px' };
    designSystem.DecorativeElements.Type = 'Organic blobs and leaf motifs';
    designSystem.IllustrationStyle.Vibe = 'Earthy, vibrant photography';
  }

  // 2. Luxury Theme
  else if (theme.includes('luxury') || theme.includes('expensive')) {
    designSystem.ColorPalette = {
      Primary: '#000000',
      Secondary: '#1a1a1a',
      Accent: '#d4af37', // Gold
      Background: '#050505',
      Surface: '#121212',
      Text: '#ffffff',
      TextMuted: '#a3a3a3'
    };
    designSystem.GradientSystem = {
      BackgroundGlow: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.08), transparent 70%)',
      CardGradient: 'linear-gradient(145deg, #1a1a1a, #0a0a0a)'
    };
    designSystem.TypographyPairing = {
      HeadingFont: '"Playfair Display", serif',
      BodyFont: '"Montserrat", sans-serif',
      HeadingWeight: '400',
      BodyWeight: '300'
    };
    designSystem.CardStyles = {
      ...generateSmartCardStyles('#d4af37', true),
      Background: 'rgba(26, 26, 26, 0.7)',
      Border: `1px solid ${hexToRgba('#d4af37', 0.2)}`
    };
    designSystem.BorderRadius = { Small: '0px', Medium: '2px', Large: '4px', Pill: '9999px' };
    designSystem.DecorativeElements.Type = 'Thin gold lines, subtle marble texture';
    designSystem.LayoutStyle.Type = 'Editorial, ample whitespace, centered alignment';
  }

  // 3. Cyberpunk Theme
  else if (theme.includes('cyberpunk') || mood.includes('neon')) {
    designSystem.ColorPalette = {
      Primary: '#0ff', // Cyan
      Secondary: '#f0f', // Magenta
      Accent: '#ff003c',
      Background: '#09090b',
      Surface: '#18181b',
      Text: '#ffffff',
      TextMuted: '#a1a1aa'
    };
    designSystem.GradientSystem = {
      BackgroundGlow: 'linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1))',
      CardGradient: 'linear-gradient(180deg, rgba(24, 24, 27, 0.9), rgba(9, 9, 11, 0.9))'
    };
    designSystem.TypographyPairing = {
      HeadingFont: '"Space Mono", monospace',
      BodyFont: '"Inter", sans-serif',
      HeadingWeight: '700',
      BodyWeight: '400'
    };
    designSystem.CardStyles = generateSmartCardStyles('#00ffff', true);
    designSystem.ShadowStyles.Glow = '0 0 15px rgba(0, 255, 255, 0.5), 0 0 30px rgba(255, 0, 255, 0.3)';
    designSystem.DecorativeElements.Type = 'Glitch effects, grid lines, glowing borders';
  }

  // 4. Technology / Apple-inspired Minimalist
  else if (theme.includes('tech') || (strategy.VisualStyle && strategy.VisualStyle.includes('Apple'))) {
    designSystem.ColorPalette = {
      Primary: '#000000',
      Secondary: '#1d1d1f',
      Accent: '#0066cc',
      Background: '#f5f5f7',
      Surface: '#ffffff',
      Text: '#1d1d1f',
      TextMuted: '#86868b'
    };
    designSystem.GradientSystem = {
      BackgroundGlow: 'none',
      CardGradient: 'none'
    };
    designSystem.TypographyPairing = {
      HeadingFont: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      BodyFont: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      HeadingWeight: '600',
      BodyWeight: '400'
    };
    designSystem.CardStyles = {
      ...generateSmartCardStyles('#0066cc', false),
      Background: 'rgba(255, 255, 255, 0.85)',
      Border: '1px solid rgba(0, 0, 0, 0.04)'
    };
    designSystem.ShadowStyles.Elevated = '0 10px 40px rgba(0, 0, 0, 0.08)';
    designSystem.BorderRadius = { Small: '8px', Medium: '18px', Large: '28px', Pill: '9999px' };
    designSystem.DecorativeElements.Type = 'Highly polished 3D hardware renders or minimal UI mockups';
    designSystem.LayoutStyle.Type = 'Bento grid, extreme precision, center focused';
  }

  // Add more dynamic generation mapping based on explicit color overrides
  if (strategy.Colors && strategy.Colors.Primary) {
    // If the strategy forced a color, blend it into the accent/primary
    // This simulates AI adapting the theme to specific color requests
    // (A real AI would adjust the hex codes smoothly)
    designSystem.ColorPalette.Accent = strategy.Colors.Primary; 
  }

  return designSystem;
}

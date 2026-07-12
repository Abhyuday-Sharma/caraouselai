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

const COLOR_NAMES_MAP = {
  black: '#000000',
  white: '#ffffff',
  gray: '#808080',
  grey: '#808080',
  'dark gray': '#1a1a1a',
  'dark grey': '#1a1a1a',
  gold: '#d4af37',
  silver: '#c0c0c0',
  red: '#ef4444',
  blue: '#3b82f6',
  green: '#10b981',
  yellow: '#f59e0b',
  purple: '#8b5cf6',
  orange: '#f97316',
  pink: '#ec4899',
  cream: '#fffdd0',
  mint: '#a7f3d0'
};

function normalizeToHex(colorStr) {
  if (!colorStr || typeof colorStr !== 'string') return '#ffffff';
  if (colorStr.startsWith('#')) return colorStr;
  const clean = colorStr.toLowerCase().trim();
  if (COLOR_NAMES_MAP[clean]) return COLOR_NAMES_MAP[clean];
  return '#ffffff';
}

function resolveIntelligentColors(strategy, theme) {
  let c1 = strategy.Colors?.Primary ? normalizeToHex(strategy.Colors.Primary) : null;
  let c2 = strategy.Colors?.Secondary ? normalizeToHex(strategy.Colors.Secondary) : null;

  if (!c1) {
    if (theme.includes('nature') || theme.includes('wildlife')) {
      c1 = '#166534';
      c2 = '#eab308';
    } else if (theme.includes('luxury') || theme.includes('expensive')) {
      c1 = '#050505';
      c2 = '#d4af37';
    } else if (theme.includes('cyber') || theme.includes('neon')) {
      c1 = '#09090b';
      c2 = '#00ffff';
    } else if (theme.includes('tech') || theme.includes('minimal')) {
      c1 = '#f5f5f7';
      c2 = '#0066cc';
    } else {
      c1 = '#ffffff';
      c2 = '#3b82f6';
    }
  }

  const l1 = getLuminance(c1);
  const l2 = c2 ? getLuminance(c2) : 0.5;

  let bg, surface, text, textMuted, primary, secondary, accent;

  if (l1 < 0.25) {
    bg = c1;
    if (getLuminance(bg) > 0.15) {
      bg = '#050505';
    }
    surface = '#121212';
    text = '#ffffff';
    textMuted = 'rgba(255, 255, 255, 0.6)';

    if (c2 && l2 > 0.3) {
      accent = c2;
    } else {
      accent = '#d4af37';
    }
    primary = '#ffffff';
    secondary = '#1a1a1a';
  } else {
    bg = c1;
    if (getLuminance(bg) < 0.85) {
      bg = '#f9fafb';
    }
    surface = '#ffffff';
    text = '#1f2937';
    textMuted = '#6b7280';

    if (c2 && l2 < 0.7) {
      accent = c2;
    } else {
      accent = '#3b82f6';
    }
    primary = '#1f2937';
    secondary = '#f3f4f6';
  }

  return { bg, surface, text, textMuted, primary, secondary, accent };
}

export async function generateDesignSystem(strategy) {
  // Simulate network/AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const theme = (strategy.Topic || strategy.Theme || 'general').toLowerCase();
  const mood = (strategy.Mood || strategy.Tone || 'professional').toLowerCase();

  const resolvedColors = resolveIntelligentColors(strategy, theme);
  const isDark = getLuminance(resolvedColors.bg) < 0.4;

  const designSystem = {
    ColorPalette: {
      Primary: resolvedColors.primary,
      Secondary: resolvedColors.secondary,
      Accent: resolvedColors.accent,
      Background: resolvedColors.bg,
      Surface: resolvedColors.surface,
      Text: resolvedColors.text,
      TextMuted: resolvedColors.textMuted
    },
    GradientSystem: {
      BackgroundGlow: `radial-gradient(circle at top right, ${hexToRgba(resolvedColors.accent, 0.1)}, transparent 50%)`,
      CardGradient: isDark 
        ? `linear-gradient(145deg, ${resolvedColors.secondary}, ${resolvedColors.bg})` 
        : `linear-gradient(145deg, #ffffff, ${resolvedColors.secondary})`
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
    CardStyles: generateSmartCardStyles(resolvedColors.accent, isDark),
    BorderRadius: {
      Small: '4px',
      Medium: '8px',
      Large: '16px',
      Pill: '9999px'
    },
    ShadowStyles: {
      Soft: '0 4px 20px rgba(0, 0, 0, 0.05)',
      Elevated: '0 10px 30px rgba(0, 0, 0, 0.1)',
      Glow: isDark ? `0 0 20px ${hexToRgba(resolvedColors.accent, 0.3)}` : '0 4px 15px rgba(0,0,0,0.05)'
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
    const goldColor = resolvedColors.accent !== '#ffffff' ? resolvedColors.accent : '#d4af37';
    designSystem.ColorPalette = {
      Primary: '#ffffff', // Keep headers white for clean premium editorial text contrast
      Secondary: '#1a1a1a',
      Accent: goldColor, // Gold accents
      Background: '#050505',
      Surface: '#121212',
      Text: '#ffffff',
      TextMuted: '#a3a3a3'
    };
    designSystem.GradientSystem = {
      BackgroundGlow: `radial-gradient(circle at center, ${hexToRgba(goldColor, 0.08)}, transparent 70%)`,
      CardGradient: 'linear-gradient(145deg, #1a1a1a, #0a0a0a)'
    };
    designSystem.TypographyPairing = {
      HeadingFont: '"Playfair Display", serif',
      BodyFont: '"Montserrat", sans-serif',
      HeadingWeight: '400',
      BodyWeight: '300'
    };
    designSystem.CardStyles = {
      ...generateSmartCardStyles(goldColor, true),
      Background: 'rgba(26, 26, 26, 0.7)',
      Border: `1px solid ${hexToRgba(goldColor, 0.2)}`
    };
    designSystem.BorderRadius = { Small: '0px', Medium: '2px', Large: '4px', Pill: '9999px' };
    designSystem.DecorativeElements.Type = 'Thin gold lines, subtle marble texture';
    designSystem.LayoutStyle.Type = 'Editorial, ample whitespace, centered alignment';
  }

  // 3. Cyberpunk Theme
  else if (theme.includes('cyberpunk') || mood.includes('neon')) {
    designSystem.ColorPalette = {
      Primary: '#0ff',
      Secondary: '#f0f',
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
  
  // 5. Sunset Theme
  else if (theme.includes('sunset') || mood.includes('sunset')) {
    designSystem.ColorPalette = {
      Primary: '#be5a2a',
      Secondary: '#1e140f',
      Accent: '#be5a2a',
      Background: '#f3eae1',
      Surface: '#faf5f0',
      Text: '#1e140f',
      TextMuted: '#685950'
    };
    designSystem.GradientSystem = {
      BackgroundGlow: 'none',
      CardGradient: 'linear-gradient(145deg, #faf5f0, #f3eae1)'
    };
    designSystem.TypographyPairing = {
      HeadingFont: '"Playfair Display", "Lora", "Georgia", serif',
      BodyFont: '"Plus Jakarta Sans", "Inter", sans-serif',
      HeadingWeight: '600',
      BodyWeight: '400'
    };
    designSystem.CardStyles = generateSmartCardStyles('#be5a2a', false);
    designSystem.Backgrounds.Style = 'Warm editorial sand paper texture';
    designSystem.BorderRadius = { Small: '6px', Medium: '12px', Large: '18px', Pill: '9999px' };
    designSystem.LayoutTemplate = 'sunset-editorial';
  }

  // Apply intelligent accent selection based on background context to guarantee contrast
  if (strategy.Colors && strategy.Colors.Primary) {
    const pColor = normalizeToHex(strategy.Colors.Primary);
    const sColor = strategy.Colors.Secondary ? normalizeToHex(strategy.Colors.Secondary) : null;
    
    const lp = getLuminance(pColor);
    const ls = sColor ? getLuminance(sColor) : 0.5;
    const isBgDark = getLuminance(designSystem.ColorPalette.Background) < 0.4;

    if (isBgDark) {
      if (lp > 0.35) {
        designSystem.ColorPalette.Accent = pColor;
      } else if (sColor && ls > 0.35) {
        designSystem.ColorPalette.Accent = sColor;
      } else {
        designSystem.ColorPalette.Accent = '#d4af37';
      }
    } else {
      if (lp < 0.7) {
        designSystem.ColorPalette.Accent = pColor;
      } else if (sColor && ls < 0.7) {
        designSystem.ColorPalette.Accent = sColor;
      } else {
        designSystem.ColorPalette.Accent = '#0066cc';
      }
    }
  }

  return designSystem;
}

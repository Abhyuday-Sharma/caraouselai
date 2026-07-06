/**
 * AI Design Engine Service (Phase 3)
 * Converts the creative strategy (extracted in Phase 2) into a complete, professional design system.
 */

// Helper to generate a complete design system based on theme keywords
export async function generateDesignSystem(strategy) {
  // Simulate network/AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const theme = (strategy.Topic || strategy.Theme || 'general').toLowerCase();
  const mood = (strategy.Mood || strategy.Tone || 'professional').toLowerCase();

  // Base generic design system (fallback)
  const designSystem = {
    ColorPalette: {
      Primary: strategy.Colors?.Primary || '#3b82f6',
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
    CardStyles: {
      Background: 'rgba(255, 255, 255, 0.8)',
      BackdropFilter: 'blur(12px)',
      Border: '1px solid rgba(0, 0, 0, 0.05)'
    },
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
      Background: 'rgba(26, 26, 26, 0.7)',
      BackdropFilter: 'blur(20px)',
      Border: '1px solid rgba(212, 175, 55, 0.2)'
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
      Background: '#ffffff',
      BackdropFilter: 'none',
      Border: 'none'
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

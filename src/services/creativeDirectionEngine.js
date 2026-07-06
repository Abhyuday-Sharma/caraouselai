/**
 * AI Creative Direction Engine (Phase 5)
 * Behaves like a Creative Director. 
 * Generates the Creative Brief and Moodboard before any design occurs.
 */

export async function generateCreativeBrief(analysis) {
  // Simulate AI delay
  await new Promise(r => setTimeout(r, 500));

  const theme = analysis.Topic?.toLowerCase() || '';
  
  const brief = {
    Topic: analysis.Topic || 'Creative Strategy',
    Audience: analysis.Audience || 'General Audience',
    Emotion: 'Confidence',
    Mood: analysis.Mood || 'Premium',
    Storytelling: 'Educational Journey',
    VisualInspiration: 'Apple + Linear + Bloomberg Editorial',
    ReadingExperience: 'Magazine',
    InformationDensity: 'Medium',
    BrandPersonality: 'Authoritative yet approachable'
  };

  if (theme.includes('tech') || theme.includes('cyber')) {
    brief.Emotion = 'Excitement';
    brief.VisualInspiration = 'Stripe + Vercel + Matrix';
    brief.InformationDensity = 'High';
  } else if (theme.includes('luxury') || theme.includes('expensive')) {
    brief.Emotion = 'Aspiration';
    brief.VisualInspiration = 'Vogue + Rolex + Kinfolk';
    brief.ReadingExperience = 'Coffee Table Book';
    brief.InformationDensity = 'Low';
  } else if (theme.includes('nature') || theme.includes('health')) {
    brief.Emotion = 'Calmness';
    brief.VisualInspiration = 'National Geographic + Headspace';
  }

  return brief;
}

export function generateMoodboard(brief) {
  const mood = brief.Mood.toLowerCase();
  
  const moodboard = {
    Atmosphere: 'Clean & Professional',
    Lighting: 'Flat UI',
    Contrast: 'High',
    Texture: 'Smooth Matte',
    ColorTemperature: 'Neutral',
    ShapeLanguage: 'Slightly Rounded',
    MotionStyle: 'Subtle Fade',
    VisualWeight: 'Balanced',
    WhiteSpace: 'Generous',
    DecorativeStyle: 'Minimal Geometric',
    IconStyle: 'Line Art'
  };

  if (brief.VisualInspiration.includes('Vogue')) {
    moodboard.Atmosphere = 'Elegant & Moody';
    moodboard.Contrast = 'Extreme';
    moodboard.Texture = 'Grainy Film';
    moodboard.ShapeLanguage = 'Sharp Corners';
    moodboard.WhiteSpace = 'Luxurious (Very High)';
    moodboard.DecorativeStyle = 'Fine Lines & Serifs';
  } else if (brief.VisualInspiration.includes('Stripe')) {
    moodboard.Atmosphere = 'High Tech & Vibrant';
    moodboard.Lighting = 'Neon Glows';
    moodboard.ColorTemperature = 'Cool';
    moodboard.ShapeLanguage = 'Pill & Highly Rounded';
    moodboard.DecorativeStyle = 'Abstract Gradients & Glassmorphism';
  }

  return moodboard;
}

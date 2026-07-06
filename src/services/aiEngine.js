/**
 * AI Intelligence Engine Service (Phase 2)
 * Simulates analyzing a natural language prompt to extract detailed creative direction.
 */

// Helper to find keywords in text
const contains = (text, keywords) => keywords.some(k => text.toLowerCase().includes(k));

export async function analyzePrompt(prompt) {
  // Simulate network/AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2500));

  // Intelligent mock extraction logic based on prompt keywords
  const isWildlife = contains(prompt, ['wildlife', 'animal', 'nature', 'forest']);
  const isLuxury = contains(prompt, ['luxury', 'expensive', 'watch', 'rich', 'gold']);
  const isSkincare = contains(prompt, ['skincare', 'beauty', 'pastel', 'glow']);
  const isTech = contains(prompt, ['apple', 'tech', 'minimalist', 'software']);

  // Base mock structure
  const analysis = {
    Topic: 'General Inspiration',
    Audience: 'Broad Audience',
    Purpose: 'Engagement',
    Tone: 'Inspiring',
    Mood: 'Uplifting',
    Colors: {
      Primary: 'Blue',
      Secondary: 'White',
      Accent: 'Yellow'
    },
    VisualStyle: 'Modern Clean',
    IllustrationStyle: 'Photography',
    TypographyStyle: 'Bold Sans-Serif',
    NumberOfSlides: 6,
    CTAPreference: 'Follow for more',
    BrandPersonality: 'Friendly',
    SpecialInstructions: 'Ensure high contrast for readability.'
  };

  // Adjust mock data based on prompt context
  if (isWildlife) {
    analysis.Topic = 'Wildlife & Nature';
    analysis.Audience = 'Nature Enthusiasts';
    analysis.Tone = 'Educational';
    analysis.Mood = 'Mysterious';
    analysis.Colors = { Primary: 'Purple', Secondary: 'White', Accent: 'Yellow' };
    analysis.VisualStyle = 'Earthy & Vibrant';
    analysis.NumberOfSlides = 8;
  } else if (isLuxury) {
    analysis.Topic = 'Luxury Lifestyle';
    analysis.Audience = 'High Net Worth Individuals';
    analysis.Tone = 'Sophisticated';
    analysis.Mood = 'Exclusive';
    analysis.Colors = { Primary: 'Black', Secondary: 'Dark Gray', Accent: 'Gold' };
    analysis.VisualStyle = 'Minimalist High-End';
    analysis.TypographyStyle = 'Elegant Serif';
    analysis.NumberOfSlides = 5;
  } else if (isSkincare) {
    analysis.Topic = 'Skincare Routine';
    analysis.Audience = 'Beauty Enthusiasts';
    analysis.Tone = 'Calming';
    analysis.Mood = 'Soft & Gentle';
    analysis.Colors = { Primary: 'Pastel Pink', Secondary: 'Cream', Accent: 'Mint Green' };
    analysis.VisualStyle = 'Soft Aesthetic';
    analysis.NumberOfSlides = 7;
  } else if (isTech) {
    analysis.Topic = 'Technology Trends';
    analysis.Audience = 'Early Adopters';
    analysis.Tone = 'Authoritative';
    analysis.Mood = 'Sleek & Future-Forward';
    analysis.Colors = { Primary: 'White', Secondary: 'Silver', Accent: 'Black' };
    analysis.VisualStyle = 'Apple-inspired Minimalist';
    analysis.TypographyStyle = 'Clean Grotesque';
    analysis.NumberOfSlides = 6;
  }

  // Override colors if explicitly mentioned in prompt
  const explicitColors = ['red', 'blue', 'green', 'purple', 'yellow', 'orange', 'black', 'white', 'pink', 'gold', 'silver', 'gray'];
  const foundColors = explicitColors.filter(c => contains(prompt, [c]));
  
  if (foundColors.length > 0) {
    analysis.Colors.Primary = foundColors[0].charAt(0).toUpperCase() + foundColors[0].slice(1);
    if (foundColors.length > 1) {
      analysis.Colors.Secondary = foundColors[1].charAt(0).toUpperCase() + foundColors[1].slice(1);
    }
    if (foundColors.length > 2) {
      analysis.Colors.Accent = foundColors[2].charAt(0).toUpperCase() + foundColors[2].slice(1);
    }
  }

  // Look for slide count in prompt
  const slideMatch = prompt.match(/(\d+)\s*slides?/i);
  if (slideMatch) {
    analysis.NumberOfSlides = parseInt(slideMatch[1], 10);
  }

  return analysis;
}

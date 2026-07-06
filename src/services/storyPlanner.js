/**
 * AI Story Planning Engine (Phase 5)
 * Generates the narrative sequence of slides based on the brief.
 */

export function generateStoryPlan(brief) {
  const numSlides = 8; // could be dynamic
  const density = brief.InformationDensity;
  
  const plan = {
    totalSlides: numSlides,
    sequence: []
  };

  // Standard Educational/Startup Sequence
  plan.sequence = [
    { id: 1, role: 'Hook', purpose: 'Grab attention and introduce topic', gridPreference: 'MagazineHero' },
    { id: 2, role: 'Problem', purpose: 'Agitate the pain point', gridPreference: 'SplitLayout' },
    { id: 3, role: 'Explanation', purpose: 'Provide context', gridPreference: 'CenteredMinimal' },
    { id: 4, role: 'Comparison', purpose: 'Myth vs Fact or Old vs New', gridPreference: 'SplitLayout' },
    { id: 5, role: 'Statistics', purpose: 'Provide proof', gridPreference: 'BentoGrid' },
    { id: 6, role: 'Process', purpose: 'Actionable steps', gridPreference: 'SwissLayout' },
    { id: 7, role: 'Summary', purpose: 'Key takeaways', gridPreference: 'BentoGrid' },
    { id: 8, role: 'CTA', purpose: 'Drive action', gridPreference: 'CenteredMinimal' }
  ];

  // Adjust rhythm based on density
  if (density === 'Low') {
    // Replace heavy slides with minimal quotes
    plan.sequence[4] = { id: 5, role: 'Quote', purpose: 'Inspirational break', gridPreference: 'CenteredMinimal' };
    plan.sequence[6] = { id: 7, role: 'Highlight', purpose: 'Single strong takeaway', gridPreference: 'MagazineHero' };
  }

  return plan;
}

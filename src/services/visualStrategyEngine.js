/**
 * AI Visual Strategy Engine
 * Evaluates the Story Plan and determines HOW information is best visualized.
 * Assigns a VisualizationMethod to every slide before content is generated.
 */

export function generateVisualStrategy(storyPlan, brief) {
  const strategy = {
    methodology: 'Dynamic Compilation',
    slideStrategies: []
  };

  const mood = brief.Mood || 'Professional';
  const isCinematic = mood.toLowerCase().includes('cinematic') || mood.toLowerCase().includes('luxury');

  storyPlan.sequence.forEach((slide) => {
    let method = 'EditorialTypography';
    let assetRequirement = null;
    let layoutInstruction = 'Balanced flow';

    switch (slide.role) {
      case 'Hook':
        if (isCinematic) {
          method = 'HeroPhotography';
          assetRequirement = {
            type: 'Photography',
            prompt: `Cinematic ${brief.Topic.toLowerCase()} composition, ${mood.toLowerCase()} atmosphere, editorial framing, high contrast, extreme negative space on the left side for clean typography overlay, 8k resolution, minimalist clutter.`
          };
          layoutInstruction = 'Text aligned left within negative space, full-bleed background asset';
        } else {
          method = 'TypographyPoster';
          layoutInstruction = 'Massive centered typography, minimal distractions';
        }
        break;
      
      case 'Problem':
        method = 'EditorialTypography';
        layoutInstruction = 'Split layout, aggressive whitespace';
        break;

      case 'Comparison':
        method = 'ComparisonTable';
        assetRequirement = { type: 'Iconography', style: 'minimalist dual-tone' };
        layoutInstruction = 'Side-by-side bento card split';
        break;

      case 'Statistics':
        method = 'DataVisualization';
        assetRequirement = { type: 'DataDashboard', metrics: 'High Impact' };
        layoutInstruction = 'Bento grid focusing on numerical emphasis';
        break;

      case 'Process':
        method = 'TimelineFlow';
        assetRequirement = { type: 'ProcessDiagram', nodes: 3 };
        layoutInstruction = 'Sequential vertical stack with connector lines';
        break;

      case 'Summary':
        method = 'Checklist';
        assetRequirement = { type: 'SVGGraphics', style: 'checkmarks' };
        layoutInstruction = 'Left aligned block flow';
        break;
        
      case 'CTA':
        method = 'HeroPhotography';
        assetRequirement = {
          type: 'Photography',
          prompt: `Minimalist texture matching ${mood.toLowerCase()}, soft gradient, heavy negative space in the center for CTA typography, premium branding aesthetic.`
        };
        layoutInstruction = 'Text perfectly centered, high contrast overlay';
        break;
      
      default:
        method = 'EditorialTypography';
    }

    strategy.slideStrategies.push({
      slideId: slide.id,
      role: slide.role,
      visualizationMethod: method,
      assetRequirement,
      layoutInstruction
    });
  });

  return strategy;
}

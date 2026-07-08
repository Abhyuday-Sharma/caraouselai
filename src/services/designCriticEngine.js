/**
 * AI Design Critic Engine (Phase 6)
 * The automated QA layer that scores and refines composed slides before rendering.
 */

export function critiqueAndRefine(slides) {
  const critiquedSlides = [];

  slides.forEach(slide => {
    let score = 100;
    const critiqueNotes = [];
    let refinedSlide = JSON.parse(JSON.stringify(slide)); // deep clone for mutation

    // 1. Evaluate Visual Weight & Information Density
    if (slide.totalWeight > 26) {
      score -= 20;
      critiqueNotes.push('-20: Critical information overload. Too many heavy blocks.');
    } else if (slide.totalWeight > 20) {
      score -= 10;
      critiqueNotes.push('-10: High information density. May feel cluttered.');
    } else if (slide.totalWeight < 5) {
      score -= 10;
      critiqueNotes.push('-10: Slide feels too empty.');
    }

    // 2. Evaluate Whitespace & Grid Balance
    const hasAsset = slide.composedBlocks.some(b => ['TimelineFlow', 'DataDashboard', 'ChecklistGrid', 'ComparisonCard'].includes(b.type));
    const hasLotsOfText = slide.composedBlocks.filter(b => b.type === 'Paragraph').length >= 2;

    if (hasAsset && hasLotsOfText) {
      score -= 15;
      critiqueNotes.push('-15: Asset clashes with heavy text blocks.');
    }

    // 3. Auto-Refinement Logic (If score < 90)
    const refinementsApplied = [];
    if (score < 90) {
      // Fix Information Overload: Strip out non-essential paragraphs if there's an asset
      if (hasAsset && hasLotsOfText) {
        let removed = false;
        refinedSlide.composedBlocks = refinedSlide.composedBlocks.filter(b => {
          if (b.type === 'Paragraph' && !removed) {
            removed = true;
            return false; // Remove one paragraph
          }
          return true;
        });
        refinementsApplied.push('Removed 1 paragraph to balance layout with visual asset.');
        score += 15; // recover score
      }

      // Fix Density: Remove decorative borders to reduce noise
      if (refinedSlide.totalWeight > 20) {
        refinedSlide.composedBlocks = refinedSlide.composedBlocks.filter(b => b.type !== 'DecorativeBorder');
        refinementsApplied.push('Removed decorative borders to reduce noise on heavy slide.');
        score += 10;
      }

      // Fix Overcrowding: If slide has a major card/asset and an IconGroup, remove the IconGroup to restore balance
      const hasMajorAsset = refinedSlide.composedBlocks.some(b => ['ComparisonCard', 'ListBlock', 'TimelineFlow', 'DataDashboard', 'ChecklistGrid', 'BrowserMockup', 'CodeTerminalMockup'].includes(b.type));
      const hasIconGroup = refinedSlide.composedBlocks.some(b => b.type === 'IconGroup');
      if (hasMajorAsset && hasIconGroup) {
        refinedSlide.composedBlocks = refinedSlide.composedBlocks.filter(b => b.type !== 'IconGroup');
        refinementsApplied.push('Removed IconGroup to prevent layout clutter alongside major data component.');
        score += 10;
      }
      
      // Inject CSS overrides into the grid template if needed
      if (refinedSlide.gridTemplate === 'DynamicBento' && refinedSlide.totalWeight > 25) {
         refinedSlide.customStyles = { padding: '2em' }; // force more padding to prevent choke
         refinementsApplied.push('Injected custom CSS padding override to prevent edge choking.');
      }
    }

    if (refinementsApplied.length === 0 && score === 100) {
      critiqueNotes.push('Excellent balance, hierarchy, and pacing. No changes needed.');
    }

    critiquedSlides.push({
      ...refinedSlide,
      criticReport: {
        originalScore: score - refinementsApplied.length * 10, // approximate original before recovery
        finalScore: Math.min(score, 100),
        notes: critiqueNotes,
        refinements: refinementsApplied
      }
    });
  });

  return critiquedSlides;
}

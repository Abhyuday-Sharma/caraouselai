/**
 * AI Design Compiler (Phase 6)
 * Assembles Semantic Blocks and Visual Assets into a fluid, custom Grid layout.
 * Discards the concept of static templates.
 */

const BLOCK_WEIGHTS = {
  HeroHeading: 10,
  SectionHeading: 8,
  StatisticCard: 9,
  ComparisonCard: 8,
  QuoteBlock: 7,
  HighlightCard: 6,
  ListBlock: 6,
  Paragraph: 4,
  Badge: 2,
  Footnote: 1,
  IconGroup: 3,
  TimelineFlow: 12,
  DataDashboard: 12,
  ChecklistGrid: 10
};

export function composeSlides(rawSlides, dna, analysis = {}) {
  const topic = analysis.topic || 'general';

  return rawSlides.map((slide, index) => {
    // 1. Calculate Visual Density
    const totalWeight = slide.blocks.reduce((acc, block) => acc + (BLOCK_WEIGHTS[block.type] || 3), 0);
    const density = totalWeight > 22 ? 'High' : (totalWeight < 12 ? 'Low' : 'Medium');

    // 2. Identify and route components to Strata (Layout Layers)
    const composedBlocks = slide.blocks.map((block) => {
      let strata = 'body';
      
      const isHeader = ['HeroHeading', 'SectionHeading', 'Badge'].includes(block.type);
      const isData = ['StatisticCard', 'ComparisonCard', 'HighlightCard', 'IconGroup', 'ChecklistGrid', 'DataDashboard', 'TimelineFlow'].includes(block.type);

      if (isHeader) strata = 'header';
      else if (isData) strata = 'data';
      else strata = 'body';

      return {
        ...block,
        strata,
        visualWeight: BLOCK_WEIGHTS[block.type] || 3
      };
    });

    // 4. Inject Design DNA Elements (Cross-Carousel Identity)
    // Graphic Injection Engine
    if (slide.role !== 'Hook' && index % 2 !== 0) {
      composedBlocks.push({
        type: 'ThematicGraphic',
        props: { topic: topic, role: slide.role },
        strata: 'absolute-overlay'
      });
    }

    // Dynamic Unified Footer System
    if (dna.showPageNumbers || dna.showBrandFooter) {
      composedBlocks.push({
        type: 'UnifiedFooter',
        props: { 
          number: index + 1, 
          total: rawSlides.length, 
          brandText: dna.showBrandFooter ? dna.brandText : '',
          style: dna.pageNumberStyle
        },
        strata: 'absolute-overlay'
      });
    }

    if (dna.decorativeBorder !== 'none') {
      composedBlocks.push({
        type: 'DecorativeBorder',
        props: { style: dna.decorativeBorder },
        strata: 'absolute-overlay'
      });
    }

    return {
      ...slide,
      density,
      totalWeight,
      composedBlocks
    };
  });
}

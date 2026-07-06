/**
 * AI Content Engine Service (Phase 6)
 * Generates RAW content blocks and injects required Visual Strategy Assets.
 */

export async function generateContent(brief, storyPlan, visualStrategy) {
  // Simulate network/AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const topic = brief.Topic || 'Creative Strategy';
  const rawSlides = [];

  storyPlan.sequence.forEach((slidePlan, index) => {
    const role = slidePlan.role;
    const blocks = [];

    if (role === 'Hook') {
      blocks.push({ type: 'Badge', props: { text: 'New Post' } });
      blocks.push({ type: 'HeroHeading', props: { text: `The Ultimate Guide to\n*${topic}*` } }); // Support highlight
      blocks.push({ type: 'Paragraph', props: { text: `Mastering ${brief.Audience} Strategies` } });
    } else if (role === 'Problem') {
      blocks.push({ type: 'SectionHeading', props: { text: `Why *${topic}* Matters Now` } });
      blocks.push({ type: 'Paragraph', props: { text: `In today's fast-paced world, understanding the core principles of this subject is more crucial than ever.` } });
    } else if (role === 'Explanation') {
      blocks.push({ type: 'SectionHeading', props: { text: 'The Core Concept' } });
      blocks.push({ type: 'Paragraph', props: { text: 'Simplicity is the ultimate sophistication. By breaking down complex ideas, we create better experiences.' } });
    } else if (role === 'Comparison') {
      blocks.push({ type: 'SectionHeading', props: { text: 'Myth vs *Fact*' } });
    } else if (role === 'Statistics') {
      blocks.push({ type: 'SectionHeading', props: { text: 'The Data Speaks' } });
    } else if (role === 'Process') {
      blocks.push({ type: 'SectionHeading', props: { text: 'The Framework' } });
    } else if (role === 'Quote') {
      blocks.push({ type: 'QuoteBlock', props: { quote: 'Good design is obvious. Great design is transparent.', author: 'Joe Sparano', role: 'Design Thinker' } });
    } else if (role === 'Summary') {
      blocks.push({ type: 'SectionHeading', props: { text: 'Key Takeaways' } });
    } else if (role === 'CTA') {
      blocks.push({ type: 'IconGroup', props: { icons: ['Heart', 'MessageCircle', 'Share2', 'Bookmark'] } });
      blocks.push({ type: 'HeroHeading', props: { text: 'Found this helpful?' } });
      blocks.push({ type: 'Paragraph', props: { text: 'Save this post for later and share it.' } });
      blocks.push({ type: 'HighlightCard', props: { title: 'Follow for more tips!', subtitle: '' } });
    }

    // Inject the specific Visual Strategy Asset
    const strategy = visualStrategy.slideStrategies.find(s => s.slideId === slidePlan.id);
    if (strategy && strategy.assetRequirement) {
      if (strategy.visualizationMethod === 'ComparisonTable') {
        blocks.push({ type: 'ComparisonCard', props: { 
          leftLabel: 'Myth', leftText: 'More features always means a better product.',
          rightLabel: 'Fact', rightText: 'Simplicity and focus drive higher retention.' 
        }});
      } else if (strategy.visualizationMethod === 'DataVisualization') {
        blocks.push({ type: 'DataDashboard', props: { metrics: 'Growth' } });
      } else if (strategy.visualizationMethod === 'TimelineFlow') {
        blocks.push({ type: 'TimelineFlow', props: { nodes: ['Define Goal', 'Build Prototype', 'Launch'] } });
      } else if (strategy.visualizationMethod === 'Checklist') {
        blocks.push({ type: 'ChecklistGrid', props: { items: ['Clear Typography', 'Strong Contrast', 'Engaging Hook', 'Actionable CTA'] } });
      } else if (strategy.visualizationMethod === 'HeroPhotography') {
        // Photography prompt metadata is stored on the slide object for the renderer
      }
    }

    rawSlides.push({
      id: `slide-${index + 1}`,
      role,
      strategy, // Pass strategy down to composition
      blocks
    });
  });

  return rawSlides;
}

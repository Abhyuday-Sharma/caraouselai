import { z } from 'zod';

/**
 * AI Validation Engine
 * Ensures Gemini's output matches the strict semantic schema required by the Design Compiler.
 */

// Define allowable semantic block types
const BlockTypeEnum = z.enum([
  'HeroHeading', 'SectionHeading', 'Paragraph', 'QuoteBlock',
  'StatisticCard', 'ComparisonCard', 'HighlightCard', 'ListBlock',
  'Badge', 'Footnote', 'IconGroup',
  'TimelineFlow', 'DataDashboard', 'ChecklistGrid',
  'BrowserMockup', 'CodeTerminalMockup'
]);

// Definition for a Semantic Content Block
const BlockSchema = z.object({
  type: BlockTypeEnum,
  props: z.record(z.any()), // flexible props (text, title, metrics, etc) based on the component
});

// Definition for a Slide
const SlideSchema = z.object({
  id: z.string(),
  role: z.string(), // e.g., 'Hook', 'Problem', 'CTA'
  strategy: z.object({
    visualizationMethod: z.string(), // The Design Hint for the Compiler (e.g. Hero Photography, Bento)
    imagePrompt: z.string().optional(),
    imageKeywords: z.array(z.string()).optional()
  }),
  blocks: z.array(BlockSchema).min(5, "Slide must contain at least 5 blocks to maintain visual density")
});

// The Master JSON Output Schema
export const MasterCarouselSchema = z.object({
  analysis: z.object({
    topic: z.string(),
    audience: z.string(),
    mood: z.string()
  }),
  creativeBrief: z.object({
    direction: z.string(),
    emotionalGoal: z.string()
  }),
  moodboard: z.object({
    primaryColors: z.array(z.string()),
    texture: z.string()
  }),
  designDNA: z.object({
    typographyPairing: z.string(),
    pageNumberPosition: z.string(),
    pageNumberStyle: z.string(),
    showPageNumbers: z.boolean().optional(),
    showBrandFooter: z.boolean(),
    brandText: z.string(),
    decorativeBorder: z.string()
  }),
  storyPlan: z.array(z.object({
    id: z.string(),
    role: z.string()
  })),
  slides: z.array(SlideSchema).min(3).max(10),
  caption: z.string(),
  hashtags: z.array(z.string())
});

export function validateCarouselJSON(rawJson) {
  try {
    const parsed = MasterCarouselSchema.parse(rawJson);
    
    // Topic Consistency Check (Heuristic)
    // We expect the AI to strictly adhere to the prompt, but we can programmatically check for empty blocks
    parsed.slides.forEach(slide => {
      slide.blocks.forEach(block => {
        if (!block.props || Object.keys(block.props).length === 0) {
          throw new Error(`Semantic Validation Failed: Empty props in block ${block.type} on slide ${slide.id}`);
        }
      });
    });

    return { valid: true, data: parsed };
  } catch (error) {
    console.error("Validation Engine Failed:", error);
    return { valid: false, error: error.message };
  }
}

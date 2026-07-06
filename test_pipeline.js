import { analyzePrompt } from './src/services/aiEngine.js';
import { generateCreativeBrief, generateMoodboard } from './src/services/creativeDirectionEngine.js';
import { generateVisualLanguage } from './src/services/visualLanguageEngine.js';
import { generateStoryPlan } from './src/services/storyPlanner.js';
import { generateDesignSystem } from './src/services/designEngine.js';
import { generateDesignDNA } from './src/services/dnaEngine.js';
import { generateContent } from './src/services/contentEngine.js';
import { composeSlides } from './src/services/compositionEngine.js';

async function testPipeline() {
  try {
    const prompt = 'luxury watches for men';
    const analysis = await analyzePrompt(prompt);
    console.log('1. Analysis OK');

    const brief = await generateCreativeBrief(analysis);
    const mood = generateMoodboard(brief);
    console.log('2. Brief & Moodboard OK');

    const language = generateVisualLanguage(mood);
    const system = await generateDesignSystem(analysis);
    console.log('3. Language & System OK');

    const plan = generateStoryPlan(brief);
    console.log('4. Plan OK');

    const dna = generateDesignDNA(brief, language);
    console.log('5. DNA OK');

    const rawSlides = await generateContent(brief, plan);
    console.log('6. Content OK');

    const composed = composeSlides(rawSlides, dna);
    console.log('7. Composition OK. Slides count:', composed.length);
    
  } catch (err) {
    console.error('PIPELINE CRASH:', err);
  }
}

testPipeline();

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader2, Image as ImageIcon, Sparkles, SlidersHorizontal, Download, Layers, ChevronRight, ChevronDown } from 'lucide-react';
import Button from '../components/ui/Button';
import { generateMasterCarousel } from '../services/llmService';
import { validateCarouselJSON } from '../services/validationEngine';
import { composeSlides } from '../services/compositionEngine';
import { critiqueAndRefine } from '../services/designCriticEngine';
import { generateDesignSystem } from '../services/designEngine';
import CarouselRenderer from '../components/editor/CarouselRenderer';
import { ErrorBoundary } from '../components/ErrorBoundary';
import './DashboardPage.css';

export default function DashboardPage() {
  const location = useLocation();
  const initialPrompt = location.state?.initialPrompt || '';
  
  const [isGenerating, setIsGenerating] = useState(!!initialPrompt);
  const [hasContent, setHasContent] = useState(false);
  const [generationError, setGenerationError] = useState(null);
  
  // Pipeline State
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [creativeBrief, setCreativeBrief] = useState(null);
  const [moodboard, setMoodboard] = useState(null);
  const [visualLanguage, setVisualLanguage] = useState(null);
  const [storyPlan, setStoryPlan] = useState(null);
  const [visualStrategy, setVisualStrategy] = useState(null);
  const [designDNA, setDesignDNA] = useState(null);
  const [criticReport, setCriticReport] = useState(null);
  
  const [designSystem, setDesignSystem] = useState(null);
  const [slides, setSlides] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Simple Accordion State
  const [openAccordions, setOpenAccordions] = useState({ brief: true, strategy: true, critic: false });
  const toggleAccordion = (key) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));

  // Run AI extraction and Design Generation if we arrived with a prompt
  useEffect(() => {
    if (initialPrompt && !hasContent) {
      let isMounted = true;
      
      const generate = async () => {
        try {
          // Step 1: Single-Shot Gemini API Call
          const rawJson = await generateMasterCarousel(initialPrompt);
          
          // Step 2: Validation Engine
          const validationResult = validateCarouselJSON(rawJson);
          
          if (!validationResult.valid) {
            throw new Error(validationResult.error);
          }
          
          const masterData = validationResult.data;
          
          if (isMounted) {
            setAiAnalysis(masterData.analysis);
            setCreativeBrief(masterData.creativeBrief);
            setMoodboard(masterData.moodboard);
            setDesignDNA(masterData.designDNA);
            setStoryPlan(masterData.storyPlan);
            
            // Generate the full CSS variable Design System expected by CarouselRenderer
            const sys = await generateDesignSystem({
               Topic: masterData.analysis.topic,
               Mood: masterData.analysis.mood,
               Colors: {
                  Primary: masterData.moodboard.primaryColors[0] || '#ffffff',
                  Secondary: masterData.moodboard.primaryColors[1] || '#4f46e5'
               }
            });
            setDesignSystem(sys);
          }

          // Step 3: Composition Engine (Design Compiler)
          const composedSlides = composeSlides(masterData.slides, masterData.designDNA, masterData.analysis);
          
          // Step 4: Design Critic Engine (Refinement)
          const finalRefinedSlides = critiqueAndRefine(composedSlides);
          
          if (isMounted) {
            setSlides(finalRefinedSlides);
            
            // Extract a summary report for the dashboard sidebar
            const summaryReport = finalRefinedSlides.map(s => ({
               slide: s.id,
               role: s.role,
               method: s.strategy?.visualizationMethod || 'Editorial',
               critic: s.criticReport
            }));
            setCriticReport(summaryReport);

            setActiveSlideIndex(0);
            setIsGenerating(false);
            setHasContent(true);
          }
        } catch (error) {
          console.error("AI Generation failed", error);
          if (isMounted) {
            setIsGenerating(false);
            setGenerationError(error.message);
          }
        }
      };

      generate();
      
      return () => {
        isMounted = false;
      };
    }
  }, [initialPrompt, hasContent]);

  return (
    <ErrorBoundary>
      <div className="dashboard-layout">
        {/* Left Sidebar - AI Strategy Pipeline */}
      <aside className="dashboard-sidebar left-sidebar glass" style={{ overflowY: 'auto' }}>
        <div className="sidebar-header">
          <h3><Sparkles size={16} /> Creative Engine</h3>
        </div>
        <div className="sidebar-content">
          {!hasContent ? (
             <div className="json-placeholder">
               <div className="pulse-line"></div>
               <div className="pulse-line"></div>
               <div className="pulse-line" style={{ width: '60%' }}></div>
             </div>
          ) : (
            <div className="json-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.5em', width: '100%', overflowX: 'hidden' }}>
              
              {/* Accordion Template */}
              {[
                { key: 'brief', title: 'Creative Brief', data: creativeBrief },
                { key: 'moodboard', title: 'Moodboard', data: moodboard },
                { key: 'plan', title: 'Story Plan', data: storyPlan },
                { key: 'dna', title: 'Design DNA', data: designDNA },
                { key: 'critic', title: 'Design Critic QA', data: criticReport }
              ].map(section => (
                <div key={section.key} style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <button 
                    onClick={() => toggleAccordion(section.key)}
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0.75em 1em', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    <span>{section.title}</span>
                    {openAccordions[section.key] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  {openAccordions[section.key] && (
                    <div style={{ padding: '0 1em 1em 1em' }}>
                      <pre className="json-display" style={{ margin: 0, fontSize: '0.75em', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                        {JSON.stringify(section.data, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))}

            </div>
          )}
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="dashboard-workspace">
        
        {/* Workspace Toolbar */}
        <div className="workspace-toolbar glass">
          <div className="toolbar-left">
            <span className="project-title">Untitled Carousel</span>
            <span className="badge badge-draft">Draft</span>
          </div>
          <div className="toolbar-right">
            <Button variant="secondary" size="sm" icon={<Layers size={14} />}>
              Layers
            </Button>
            <Button variant="primary" size="sm" icon={<Download size={14} />}>
              Export
            </Button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="editor-canvas">
          {isGenerating ? (
            <div className="state-container loading-state animate-fade-in">
              <div className="loading-icon-wrapper">
                <Loader2 className="spinner" size={48} />
                <Sparkles className="sparkle-overlay" size={20} />
              </div>
              <h2>Generating your masterpiece...</h2>
              <p>Analyzing prompt and crafting custom design elements</p>
              
              {/* Fake progress bar */}
              <div className="progress-bar-container">
                <div className="progress-bar-fill"></div>
              </div>
            </div>
          ) : generationError ? (
            <div className="state-container empty-state animate-fade-in" style={{ borderColor: 'var(--sys-accent)' }}>
              <div className="empty-icon-wrapper" style={{ color: 'var(--sys-accent)' }}>
                <ImageIcon size={48} />
              </div>
              <h2>Generation Failed</h2>
              <p style={{ color: 'var(--sys-accent)', maxWidth: '400px', whiteSpace: 'pre-wrap' }}>{generationError}</p>
              <Button onClick={() => setGenerationError(null)} icon={<Sparkles size={16} />}>
                Try Again
              </Button>
            </div>
          ) : !hasContent ? (
            <div className="state-container empty-state animate-fade-in">
              <div className="empty-icon-wrapper">
                <ImageIcon size={48} />
              </div>
              <h2>Ready to Create</h2>
              <p>Enter a prompt on the home page to generate a professional carousel instantly.</p>
              <Button onClick={() => window.history.back()} icon={<Sparkles size={16} />}>
                Go Generate
              </Button>
            </div>
          ) : (
            <div className="state-container generated-state animate-fade-in" style={{ width: '100%', height: '100%', maxWidth: '600px' }}>
               <CarouselRenderer slide={slides[activeSlideIndex]} designSystem={designSystem} />
            </div>
          )}
        </div>
      </main>

      {/* Right Sidebar - Slide Management (Placeholder) */}
      <aside className="dashboard-sidebar right-sidebar glass">
         <div className="sidebar-header">
          <h3><Layers size={16} /> Slides</h3>
        </div>
        <div className="sidebar-content">
          {slides.length > 0 ? (
            slides.map((slide, index) => (
              <div 
                key={slide.id} 
                className={`slide-thumb-placeholder ${index === activeSlideIndex ? 'active' : ''}`}
                onClick={() => setActiveSlideIndex(index)}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  padding: '1em',
                  textAlign: 'center',
                  background: index === activeSlideIndex ? 'rgba(255,255,255,0.1)' : 'var(--bg-tertiary)'
                }}
              >
                <div style={{ fontSize: '1.5em', fontWeight: 'bold', color: index === activeSlideIndex ? 'var(--brand-primary)' : 'var(--text-muted)' }}>
                  {index + 1}
                </div>
                <div style={{ fontSize: '0.75em', marginTop: '0.5em', color: 'var(--text-secondary)' }}>
                  {slide.role}
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="slide-thumb-placeholder active"></div>
              <div className="slide-thumb-placeholder"></div>
              <div className="slide-thumb-placeholder"></div>
            </>
          )}
          <button className="add-slide-btn">+ Add Slide</button>
        </div>
      </aside>
      </div>
    </ErrorBoundary>
  );
}

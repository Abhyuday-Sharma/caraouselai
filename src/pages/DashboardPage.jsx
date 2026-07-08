import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader2, Image as ImageIcon, Sparkles, Palette, SlidersHorizontal, Download, Layers, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import { generateMasterCarousel } from '../services/llmService';
import { validateCarouselJSON } from '../services/validationEngine';
import { composeSlides } from '../services/compositionEngine';
import { critiqueAndRefine } from '../services/designCriticEngine';
import { generateDesignSystem, hexToRgba, getContrastText } from '../services/designEngine';
import CarouselRenderer from '../components/editor/CarouselRenderer';
import { exportToPDF, exportToPNGs } from '../services/exportUtility';
import { ErrorBoundary } from '../components/ErrorBoundary';
import './DashboardPage.css';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
};

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
  const [direction, setDirection] = useState(0);

  const navigateToSlide = (newIndex) => {
    if (newIndex < 0 || newIndex >= slides.length) return;
    setDirection(newIndex > activeSlideIndex ? 1 : -1);
    setActiveSlideIndex(newIndex);
  };

  // Keyboard arrow controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && activeSlideIndex > 0) {
        navigateToSlide(activeSlideIndex - 1);
      } else if (e.key === 'ArrowRight' && activeSlideIndex < slides.length - 1) {
        navigateToSlide(activeSlideIndex + 1);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlideIndex, slides.length]);

  // Export state & handlers
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setShowExportDropdown(false);
    setIsExporting(true);
    try {
      const topicName = aiAnalysis?.topic || 'carousel';
      await exportToPDF(slides, designSystem, `${topicName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error("Export PDF failed", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPNGs = async () => {
    setShowExportDropdown(false);
    setIsExporting(true);
    try {
      const topicName = aiAnalysis?.topic || 'carousel';
      await exportToPNGs(slides, designSystem, topicName);
    } catch (error) {
      console.error("Export PNGs failed", error);
    } finally {
      setIsExporting(false);
    }
  };

  // Simple Accordion State
  const [openAccordions, setOpenAccordions] = useState({ brief: false, moodboard: false, plan: false, dna: false, critic: false, customizer: true });
  const toggleAccordion = (key) => setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));

  // Card Customizer State
  const [activeCardPreset, setActiveCardPreset] = useState('ai-mix');
  const [customCardHex, setCustomCardHex] = useState('#6366f1');

  const CARD_PRESETS = [
    { id: 'ai-mix', label: 'AI Smart Mix', emoji: '✨' },
    { id: 'primary-tint', label: 'Primary Tint', emoji: '🎨' },
    { id: 'secondary-tint', label: 'Secondary Tint', emoji: '🌊' },
    { id: 'accent-solid', label: 'Accent Pop', emoji: '⚡' },
    { id: 'glass-neutral', label: 'Glass Neutral', emoji: '🪟' },
    { id: 'dark-matte', label: 'Dark Matte', emoji: '🌑' },
    { id: 'custom', label: 'Custom Color', emoji: '🎯' },
  ];

  const applyCardPreset = (presetId, hex) => {
    if (!designSystem) return;
    setActiveCardPreset(presetId);
    const palette = designSystem.ColorPalette;
    let newCardStyles;

    switch (presetId) {
      case 'ai-mix':
        // Restore the original AI-generated card styles
        newCardStyles = {
          Background: designSystem._originalCardBg || designSystem.CardStyles.Background,
          Border: designSystem._originalCardBorder || designSystem.CardStyles.Border,
          CardText: designSystem._originalCardText || designSystem.CardStyles.CardText,
          CardTextMuted: designSystem._originalCardTextMuted || designSystem.CardStyles.CardTextMuted,
          BackdropFilter: 'blur(12px)'
        };
        break;
      case 'primary-tint':
        newCardStyles = {
          Background: hexToRgba(palette.Primary, 0.1),
          Border: `1px solid ${hexToRgba(palette.Primary, 0.15)}`,
          CardText: palette.Text,
          CardTextMuted: palette.TextMuted,
          BackdropFilter: 'blur(12px)'
        };
        break;
      case 'secondary-tint':
        newCardStyles = {
          Background: hexToRgba(palette.Secondary, 0.1),
          Border: `1px solid ${hexToRgba(palette.Secondary, 0.15)}`,
          CardText: palette.Text,
          CardTextMuted: palette.TextMuted,
          BackdropFilter: 'blur(12px)'
        };
        break;
      case 'accent-solid':
        newCardStyles = {
          Background: hexToRgba(palette.Accent, 0.85),
          Border: `1px solid ${hexToRgba(palette.Accent, 0.9)}`,
          CardText: getContrastText(palette.Accent),
          CardTextMuted: getContrastText(palette.Accent) === '#ffffff' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)',
          BackdropFilter: 'none'
        };
        break;
      case 'glass-neutral':
        newCardStyles = {
          Background: 'rgba(255, 255, 255, 0.12)',
          Border: '1px solid rgba(255, 255, 255, 0.15)',
          CardText: palette.Text,
          CardTextMuted: palette.TextMuted,
          BackdropFilter: 'blur(16px)'
        };
        break;
      case 'dark-matte':
        newCardStyles = {
          Background: 'rgba(15, 15, 20, 0.85)',
          Border: '1px solid rgba(255, 255, 255, 0.06)',
          CardText: '#ffffff',
          CardTextMuted: 'rgba(255, 255, 255, 0.55)',
          BackdropFilter: 'blur(8px)'
        };
        break;
      case 'custom':
        newCardStyles = {
          Background: hexToRgba(hex, 0.18),
          Border: `1px solid ${hexToRgba(hex, 0.25)}`,
          CardText: getContrastText(hex),
          CardTextMuted: getContrastText(hex) === '#ffffff' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)',
          BackdropFilter: 'blur(12px)'
        };
        break;
      default:
        return;
    }

    // Store originals on first override so AI-Mix can restore them
    const updated = { ...designSystem };
    if (!updated._originalCardBg) {
      updated._originalCardBg = designSystem.CardStyles.Background;
      updated._originalCardBorder = designSystem.CardStyles.Border;
      updated._originalCardText = designSystem.CardStyles.CardText;
      updated._originalCardTextMuted = designSystem.CardStyles.CardTextMuted;
    }
    updated.CardStyles = { ...updated.CardStyles, ...newCardStyles };
    setDesignSystem(updated);
  };

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
      <aside className="dashboard-sidebar left-sidebar glass">
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
            <div className="json-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.5em', width: '100%', overflowX: 'hidden', flexShrink: 0 }}>
              
              {/* Accordion Template */}
              {[
                { key: 'brief', title: 'Creative Brief', data: creativeBrief },
                { key: 'moodboard', title: 'Moodboard', data: moodboard },
                { key: 'plan', title: 'Story Plan', data: storyPlan },
                { key: 'dna', title: 'Design DNA', data: designDNA },
                { key: 'critic', title: 'Design Critic QA', data: criticReport }
              ].map(section => (
                <div key={section.key} style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0 }}>
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

              {/* ─── Design Customizer ─── */}
              <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginTop: '0.5em', flexShrink: 0 }}>
                <button 
                  onClick={() => toggleAccordion('customizer')}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0.75em 1em', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                    <Palette size={14} /> Card Colors
                  </span>
                  {openAccordions.customizer ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                {openAccordions.customizer && (
                  <div style={{ padding: '0 0.75em 1em 0.75em', display: 'flex', flexDirection: 'column', gap: '0.75em' }}>
                    {/* Presets Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                      {CARD_PRESETS.filter(p => p.id !== 'custom').map(preset => (
                        <button
                          key={preset.id}
                          onClick={() => applyCardPreset(preset.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4em',
                            padding: '0.55em 0.65em',
                            borderRadius: '6px',
                            border: activeCardPreset === preset.id 
                              ? '2px solid var(--brand-primary, #6366f1)' 
                              : '1px solid rgba(255,255,255,0.08)',
                            background: activeCardPreset === preset.id 
                              ? 'rgba(99, 102, 241, 0.15)' 
                              : 'rgba(255,255,255,0.03)',
                            color: 'var(--text-primary, #fff)',
                            cursor: 'pointer',
                            fontSize: '0.72em',
                            fontWeight: activeCardPreset === preset.id ? '600' : '400',
                            fontFamily: 'inherit',
                            transition: 'all 0.2s ease',
                            textAlign: 'left'
                          }}
                        >
                          <span>{preset.emoji}</span>
                          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{preset.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Custom Color Picker */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65em',
                      padding: '0.5em 0.65em',
                      borderRadius: '6px',
                      border: activeCardPreset === 'custom' 
                        ? '2px solid var(--brand-primary, #6366f1)' 
                        : '1px solid rgba(255,255,255,0.08)',
                      background: activeCardPreset === 'custom' 
                        ? 'rgba(99, 102, 241, 0.15)' 
                        : 'rgba(255,255,255,0.03)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}>
                      <span style={{ fontSize: '0.72em' }}>🎯</span>
                      <input
                        type="color"
                        value={customCardHex}
                        onChange={(e) => {
                          setCustomCardHex(e.target.value);
                          applyCardPreset('custom', e.target.value);
                        }}
                        style={{
                          width: '24px',
                          height: '24px',
                          border: 'none',
                          borderRadius: '4px',
                          padding: 0,
                          cursor: 'pointer',
                          background: 'transparent'
                        }}
                      />
                      <span style={{
                        fontSize: '0.72em',
                        color: 'var(--text-primary, #fff)',
                        fontWeight: activeCardPreset === 'custom' ? '600' : '400',
                        fontFamily: 'monospace',
                        textTransform: 'uppercase'
                      }}>
                        {customCardHex}
                      </span>
                    </div>
                  </div>
                )}
              </div>

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
          <div className="toolbar-right" style={{ display: 'flex', gap: '0.75em' }}>
            <Button variant="secondary" size="sm" icon={<Layers size={14} />}>
              Layers
            </Button>
            <div style={{ position: 'relative' }}>
              <Button 
                variant="primary" 
                size="sm" 
                icon={isExporting ? <Loader2 className="spinner animate-spin" size={14} /> : <Download size={14} />}
                onClick={() => setShowExportDropdown(!showExportDropdown)}
                disabled={isExporting}
              >
                {isExporting ? 'Exporting...' : 'Export'}
              </Button>
              
              {showExportDropdown && (
                <div className="glass" style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + 8px)',
                  background: 'var(--bg-secondary, #1e1e24)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-md, 8px)',
                  boxShadow: 'var(--sys-shadow-elevated)',
                  width: '220px',
                  zIndex: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0.4em',
                  gap: '2px',
                  pointerEvents: 'auto'
                }}>
                  <button 
                    onClick={handleExportPDF}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-primary, #ffffff)',
                      textAlign: 'left',
                      padding: '0.75em 1em',
                      borderRadius: 'var(--sys-radius-sm, 4px)',
                      cursor: 'pointer',
                      fontSize: '0.85em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75em',
                      width: '100%',
                      transition: 'background 0.2s',
                      fontFamily: 'inherit'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.08)'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    <SlidersHorizontal size={14} style={{ color: 'var(--brand-primary, #6366f1)' }} />
                    <span>Export as PDF (LinkedIn)</span>
                  </button>
                  <button 
                    onClick={handleExportPNGs}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-primary, #ffffff)',
                      textAlign: 'left',
                      padding: '0.75em 1em',
                      borderRadius: 'var(--sys-radius-sm, 4px)',
                      cursor: 'pointer',
                      fontSize: '0.85em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75em',
                      width: '100%',
                      transition: 'background 0.2s',
                      fontFamily: 'inherit'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.08)'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    <ImageIcon size={14} style={{ color: 'var(--sys-accent, #ec4899)' }} />
                    <span>Export as PNG Pack</span>
                  </button>
                </div>
              )}
            </div>
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
            <div className="state-container generated-state animate-fade-in" style={{ width: '100%', height: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div className="slider-container" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {activeSlideIndex > 0 && (
                  <button 
                    onClick={() => navigateToSlide(activeSlideIndex - 1)}
                    className="slider-nav-btn prev-btn glass"
                    style={{
                      position: 'absolute', left: '-55px', zIndex: 110,
                      width: '40px', height: '40px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.4)',
                      color: 'white', cursor: 'pointer', transition: 'all 0.2s ease',
                      boxShadow: 'var(--sys-shadow-soft)'
                    }}
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}

                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={activeSlideIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.6}
                    onDragEnd={(e, { offset }) => {
                      const swipeThreshold = 50;
                      if (offset.x < -swipeThreshold && activeSlideIndex < slides.length - 1) {
                        navigateToSlide(activeSlideIndex + 1);
                      } else if (offset.x > swipeThreshold && activeSlideIndex > 0) {
                        navigateToSlide(activeSlideIndex - 1);
                      }
                    }}
                    style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'grab' }}
                    whileTap={{ cursor: 'grabbing' }}
                  >
                    <CarouselRenderer slide={slides[activeSlideIndex]} designSystem={designSystem} />
                  </motion.div>
                </AnimatePresence>

                {activeSlideIndex < slides.length - 1 && (
                  <button 
                    onClick={() => navigateToSlide(activeSlideIndex + 1)}
                    className="slider-nav-btn next-btn glass"
                    style={{
                      position: 'absolute', right: '-55px', zIndex: 110,
                      width: '40px', height: '40px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.4)',
                      color: 'white', cursor: 'pointer', transition: 'all 0.2s ease',
                      boxShadow: 'var(--sys-shadow-soft)'
                    }}
                  >
                    <ChevronRight size={20} />
                  </button>
                )}
              </div>

              {/* Slider pagination dots */}
              <div style={{ display: 'flex', gap: '6px', marginTop: '1.25em', zIndex: 110, justifyContent: 'center', alignItems: 'center' }}>
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => navigateToSlide(index)}
                    style={{
                      width: index === activeSlideIndex ? '16px' : '6px',
                      height: '6px',
                      borderRadius: '3px',
                      background: index === activeSlideIndex ? 'var(--brand-primary, #6366f1)' : 'var(--text-muted, #9ca3af)',
                      opacity: index === activeSlideIndex ? 1 : 0.4,
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                ))}
              </div>
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
                onClick={() => navigateToSlide(index)}
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

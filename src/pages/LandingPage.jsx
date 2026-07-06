import React from 'react';
import { useNavigate } from 'react-router-dom';
import PromptInput from '../components/ui/PromptInput';
import { Sparkles, Image as ImageIcon, Zap, Layout } from 'lucide-react';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGenerate = (prompt) => {
    // In future prompts, this will trigger the AI generation
    // For now, we just navigate to the dashboard to show the empty/loading state
    navigate('/dashboard', { state: { initialPrompt: prompt } });
  };

  return (
    <div className="landing-page animate-fade-in">
      <div className="container landing-container">
        
        {/* Hero Section */}
        <section className="hero-section">
          <div className="badge glass">
            <Sparkles size={14} className="badge-icon" />
            <span>The AI Design Assistant for Creators</span>
          </div>
          
          <h1 className="hero-title">
            Generate stunning carousels from a <span className="text-gradient">single prompt.</span>
          </h1>
          
          <p className="hero-subtitle">
            CarouselAI understands your content and designs a professional, highly engaging Instagram carousel in seconds. No templates required.
          </p>

          <div className="prompt-wrapper">
            <PromptInput onSubmit={handleGenerate} />
          </div>
        </section>

        {/* Feature Highlights (placeholder for visual balance) */}
        <section className="features-section">
          <div className="feature-grid">
            <div className="feature-card glass-panel">
              <div className="feature-icon-wrapper" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' }}>
                <Zap size={24} />
              </div>
              <h3>Instant Generation</h3>
              <p>Type what you want and watch AI assemble the perfect flow of content.</p>
            </div>
            <div className="feature-card glass-panel">
              <div className="feature-icon-wrapper" style={{ background: 'rgba(236, 72, 153, 0.2)', color: '#ec4899' }}>
                <ImageIcon size={24} />
              </div>
              <h3>Premium Aesthetics</h3>
              <p>Curated color palettes, modern typography, and pixel-perfect layouts.</p>
            </div>
            <div className="feature-card glass-panel">
              <div className="feature-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' }}>
                <Layout size={24} />
              </div>
              <h3>Fully Editable</h3>
              <p>Tweak every text, image, and color until it's exactly what you envisioned.</p>
            </div>
          </div>
        </section>

      </div>
      
      {/* Background ambient glows */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>
    </div>
  );
}

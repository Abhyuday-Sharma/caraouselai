import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Button from './Button';
import './PromptInput.css';

export default function PromptInput({ onSubmit, isLoading }) {
  const [prompt, setPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      className={`prompt-container glass-panel ${isFocused ? 'focused' : ''}`}
      onSubmit={handleSubmit}
    >
      <div className="prompt-header">
        <Sparkles size={16} className="sparkle-icon" />
        <span>Describe your carousel</span>
      </div>
      
      <textarea
        className="prompt-textarea"
        placeholder="e.g. Create a luxury black and gold carousel about expensive watches..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        rows={4}
        disabled={isLoading}
      />
      
      <div className="prompt-footer">
        <div className="prompt-hint">
          Press <strong>Enter</strong> to generate
        </div>
        <Button 
          type="submit" 
          disabled={!prompt.trim() || isLoading}
          isLoading={isLoading}
          icon={<ArrowRight size={18} />}
        >
          Generate
        </Button>
      </div>
    </form>
  );
}

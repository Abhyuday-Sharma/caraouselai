import React from 'react';
import {
  Sparkles, Heart, MessageCircle, Share2, Bookmark, Award, Shield, Zap, TrendingUp, Target, Globe, Clock, 
  Settings, Gem, DollarSign, BookOpen, ThumbsUp, Star, Activity, Check, HelpCircle, Info, Lock, Unlock, 
  User, Users, Video, Phone, Mail, MapPin, Calendar, Search, Bell, Menu, X, ChevronRight, ChevronLeft, 
  ArrowRight, Play, Volume2, Briefcase, Compass, Gift, HeartHandshake, Lightbulb, LineChart, Map, 
  PieChart, Smile, Trophy
} from 'lucide-react';

const IconMap = {
  Sparkles, Heart, MessageCircle, Share2, Bookmark, Award, Shield, Zap, TrendingUp, Target, Globe, Clock,
  Settings, Gear: Settings, Gem, Diamond: Gem, DollarSign, BookOpen, ThumbsUp, Star, Activity, Check, 
  HelpCircle, Info, Lock, Unlock, User, Users, Video, Phone, Mail, MapPin, Calendar, Search, Bell, 
  Menu, X, ChevronRight, ChevronLeft, ArrowRight, Play, Volume2, Briefcase, Compass, Gift, 
  HeartHandshake, Lightbulb, LineChart, Map, PieChart, Smile, Trophy
};

export function Badge({ text }) {
  return (
    <div style={{
      display: 'inline-flex',
      background: 'var(--sys-primary)',
      color: 'var(--sys-bg)',
      padding: '0.5em 1em',
      borderRadius: 'var(--sys-radius-full)',
      fontSize: '0.8em',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '1em'
    }}>
      {text}
    </div>
  );
}

export function Footnote({ text }) {
  return (
    <div style={{ fontSize: '0.75em', color: 'var(--sys-text-muted)', marginTop: 'auto', paddingTop: '1em' }}>
      {text}
    </div>
  );
}

export function IconGroup({ icons }) {
  if (!icons || !Array.isArray(icons) || icons.length === 0) return null;

  return (
    <div style={{ 
      display: 'flex', 
      gap: '0.85em', 
      color: 'var(--sys-primary)', 
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: '0.4em',
      marginBottom: '0.4em',
      flexWrap: 'wrap'
    }}>
      {icons.map((iconName, i) => {
        const name = typeof iconName === 'string' ? iconName : '';
        const pascalName = name ? name.charAt(0).toUpperCase() + name.slice(1) : '';
        const IconComponent = IconMap[pascalName] || IconMap[name] || IconMap[name.toLowerCase()] || Sparkles;

        return (
          <div 
            key={i} 
            className="slide-glass-card"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '2.8em', 
              height: '2.8em', 
              borderRadius: '50%', 
              background: 'var(--sys-card-bg, rgba(255, 255, 255, 0.05))',
              border: 'var(--sys-card-border, 1px solid rgba(255, 255, 255, 0.1))',
              boxShadow: 'var(--sys-shadow-soft, 0 4px 12px rgba(0,0,0,0.05))',
              color: 'var(--sys-primary)',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
          >
            <IconComponent size={20} strokeWidth={2} />
          </div>
        );
      })}
    </div>
  );
}

export function UnifiedFooter({ number, total, brandText, style, isStructural }) {
  const progressPercent = (number / total) * 100;
  
  return (
    <div style={{ 
      position: isStructural ? 'relative' : 'absolute', 
      bottom: isStructural ? 'auto' : 0, 
      left: isStructural ? 'auto' : 0, 
      right: isStructural ? 'auto' : 0,
      width: '100%',
      padding: '0.75em 2.5em 1em 2.5em', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '0.5em', 
      zIndex: 50 
    }}>
       <div style={{ display: 'var(--sys-footer-text-display, flex)', justifyContent: 'space-between', alignItems: 'center', width: '100%', color: 'var(--sys-text-muted)' }}>
          <div style={{ fontWeight: '800', fontSize: '0.75em', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sys-text)' }}>{brandText}</div>
          <div style={{ fontWeight: '700', fontSize: '0.75em', letterSpacing: '0.1em' }}>{number} <span style={{opacity: 0.5}}>/ {total}</span></div>
       </div>
       <div style={{ width: '100%', height: '2px', background: 'var(--sys-border, rgba(255,255,255,0.1))', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--sys-accent)', transition: 'width 0.5s ease' }} />
       </div>
    </div>
  );
}

export function DecorativeBorder({ style }) {
  if (style === 'none') return null;
  
  const borderStyles = {
    'thin-inner': {
      position: 'absolute', inset: '10px', border: '1px solid var(--sys-primary)', opacity: 0.3, pointerEvents: 'none', zIndex: 1
    },
    'solid-bottom': {
      position: 'absolute', bottom: 0, left: 0, right: 0, height: '8px', background: 'var(--sys-accent)', zIndex: 1
    }
  };
  
  return <div style={borderStyles[style]} />;
}

// Graphic Injection Engine
export function ThematicGraphic({ topic = 'general', role }) {
  const t = topic.toLowerCase();
  let graphic = null;

  if (t.includes('nature') || t.includes('wildlife') || t.includes('lion')) {
    // Leaf / Organic pattern
    graphic = (
      <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', top: '-10%', right: '-10%', opacity: 0.03, width: '80%', height: '80%', color: 'var(--sys-primary)', pointerEvents: 'none', zIndex: 0 }}>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    );
  } else if (t.includes('tech') || t.includes('ai') || t.includes('data')) {
    // Grid / Circuit pattern
    graphic = (
      <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', bottom: '10%', left: '-5%', opacity: 0.05, width: '50%', height: '50%', color: 'var(--sys-primary)', pointerEvents: 'none', zIndex: 0 }}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <path d="M3 9h18"/><path d="M9 21V9"/>
      </svg>
    );
  } else {
    // Default Abstract Geometric (Corporate/General)
    graphic = (
      <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ position: 'absolute', top: '20%', right: '-20%', opacity: 0.02, width: '100%', height: '100%', color: 'var(--sys-primary)', pointerEvents: 'none', zIndex: 0 }}>
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    );
  }

  return graphic;
}

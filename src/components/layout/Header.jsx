import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Image as ImageIcon } from 'lucide-react';
import './Layout.css';

export default function Header() {
  return (
    <header className="app-header glass">
      <div className="container header-content">
        <Link to="/" className="brand-logo">
          <div className="logo-icon-wrapper">
            <ImageIcon size={20} className="logo-icon" />
            <Sparkles size={14} className="logo-sparkle" />
          </div>
          <span className="brand-text">CarouselAI</span>
        </Link>
        <nav className="header-nav">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <button className="login-btn">Sign In</button>
        </nav>
      </div>
    </header>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

export default function Header() {
  return (
    <header className="app-header glass">
      <div className="container header-content">
        <Link to="/" className="brand-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            src="/ylcggg.png" 
            alt="YoriLabs Logo" 
            style={{ 
              width: '32px', 
              height: '32px', 
              objectFit: 'contain',
              borderRadius: '6px'
            }} 
          />
          <span className="brand-text">YoriLabs Carousel Generator</span>
        </Link>
        <nav className="header-nav">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <button className="login-btn">Sign In</button>
        </nav>
      </div>
    </header>
  );
}

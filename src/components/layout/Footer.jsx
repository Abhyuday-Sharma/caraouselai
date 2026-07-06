import React from 'react';
import './Layout.css';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="container footer-content">
        <p>&copy; {new Date().getFullYear()} CarouselAI. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

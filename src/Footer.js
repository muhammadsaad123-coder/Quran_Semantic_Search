import React from 'react';
import './Footer.css';  // Assuming you will create a separate CSS file for the footer

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2023 Quran Semantic Search. All rights reserved.</p>
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/terms">Terms of Service</a>
          <a href="/contact">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import React, {useState} from 'react';
import { Link } from 'react-router-dom';

export default function Nav(){
  const [open, setOpen] = useState(false);
  return (
    <nav className={`site-nav ${open ? 'is-open' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img src="/images/logo/logo.png" alt="Delhi Six Couture Logo" className="logo-image" />
          <span className="brand-text">Delhi Six Couture</span>
        </Link>

        <div className="nav-links" role="navigation" aria-label="Main">
          <Link to="/" className="nav-link" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/collection" className="nav-link" onClick={() => setOpen(false)}>Rivayat Collection</Link>
          <Link to="/contact" className="nav-link nav-cta" onClick={() => setOpen(false)}>Get In Touch</Link>
        </div>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen(v => !v)}
        >
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>
      </div>
    </nav>
  )
}

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const close = () => setOpen(false);

  const navClass = [
    'site-nav',
    scrolled ? 'scrolled' : '',
    open ? 'is-open' : '',
  ].filter(Boolean).join(' ');

  return (
    <nav className={navClass} aria-label="Site navigation">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={close}>
          <img
            src="/images/logo/logo.png"
            alt="Delhi Six Couture"
            className="logo-image"
            width="140"
            height="46"
          />
          <span className="brand-text">Delhi Six Couture</span>
        </Link>

        <div className="nav-links" role="navigation">
          <Link to="/" className="nav-link" onClick={close}>Home</Link>
          <Link to="/bahaar" className="nav-link nav-link--new" onClick={close}>
            Bahaar<span className="nav-new-badge">New</span>
          </Link>
          <Link to="/collection" className="nav-link" onClick={close}>Rivayat Collection</Link>
          <Link to="/contact" className="nav-link nav-cta" onClick={close}>Get In Touch</Link>
        </div>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(v => !v)}
        >
          <span className="hamburger" aria-hidden="true" />
          <span className="hamburger" aria-hidden="true" />
          <span className="hamburger" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}

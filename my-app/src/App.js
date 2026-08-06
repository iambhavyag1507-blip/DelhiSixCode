// App.js
import React, { useState, useEffect, useCallback } from "react";
import './styles.css'
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation, useSearchParams } from "react-router-dom";
import Nav from './components/Nav'
import Footer from './components/Footer'
import { designImages, designNames, designTags, designDescriptions, designDetails, TOTAL_DESIGNS, TRENDING_IDS } from './data/designs'
import { chicDesignImages, chicDesignNames, chicDesignTags, chicDesignDescriptions, chicDesignDetails, chicDesignSwatches, TOTAL_CHIC_DESIGNS, CHIC_FEATURED_IDS } from './data/chicEditDesigns'
import { useCAPI } from './hooks/useCAPI'

function MetaPixelTracker() {
  const location = useLocation();
  useEffect(() => {
    if (window.fbq) window.fbq('track', 'PageView');
  }, [location.pathname]);
  return null;
}

/* Scroll reveal hook — re-runs on every route change so navigated-to pages animate in */
function useScrollReveal() {
  const location = useLocation();
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    // Small delay lets React finish rendering the new page's DOM before we observe
    const t = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
    }, 60);
    return () => { clearTimeout(t); obs.disconnect(); };
  }, [location.pathname]);
}

function Layout({ children }) {
  const location = useLocation();
  useScrollReveal();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <div style={{minHeight:'100vh'}}>
      <Nav />
      <main style={{paddingTop:'var(--nav-h)'}}>{children}</main>
      <Footer />
    </div>
  );
}

// Rotates between the studio edit and a real Instagram reel — each plays to
// the end, then hands off to the next, rather than one clip looping forever.
// The reel is heritage red-and-gold bridal wear, so it points to Rivayat
// rather than reusing the Bahaar caption from the first clip.
const HOME_HERO_VIDEOS = [
  {
    src: '/videos/hero.mp4', poster: '/videos/hero-poster.jpg',
    label: 'Bahaar', labelClass: 'home-hero-video-caption-title', link: '/bahaar',
  },
  {
    src: '/videos/reel-2.mp4', poster: '/videos/reel-2-poster.jpg',
    label: 'Rivayat', labelClass: 'home-hero-video-caption-title', link: '/collection',
  },
];

function HomeHeroVideo() {
  const [allowMotion, setAllowMotion] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setAllowMotion(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const current = HOME_HERO_VIDEOS[index];
  const advance = () => setIndex(i => (i + 1) % HOME_HERO_VIDEOS.length);

  return (
    <section className="home-hero-video">
      <video
        key={current.src}
        className="home-hero-video-el"
        src={current.src}
        poster={current.poster}
        autoPlay={allowMotion}
        muted
        playsInline
        preload="auto"
        onEnded={advance}
      />
      <div className="home-hero-video-caption" key={index}>
        <span className={current.labelClass}>{current.label}</span>
        <Link to={current.link} className="home-hero-video-cta">View Collection</Link>
      </div>
      <div className="home-hero-video-dots">
        {HOME_HERO_VIDEOS.map((v, i) => (
          <button
            key={v.src}
            className={`home-hero-video-dot${i === index ? ' active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Show video ${i + 1}`}
            aria-current={i === index ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  );
}

function HomePage() {
  useEffect(() => { document.title = 'Delhi Six Couture — Luxury Bridal Wear'; }, []);
  return (
    <>
      <HomeHeroVideo />

      <section className="collections-home-section">
        <div className="container">
          <div className="collections-home-header reveal">
            <div className="section-badge">OUR COLLECTIONS</div>
            <h2 className="collections-home-title">Two Worlds, One House</h2>
            <p className="collections-home-sub">Heritage bridal artistry and contemporary fashion — both crafted with the same devotion to detail.</p>
          </div>
          <div className="collections-home-grid">
            <Link to="/bahaar" className="coll-card-link">
              <div className="coll-card coll-card--chic reveal">
                <div className="coll-card-image-wrap">
                  <span className="coll-card-badge">New Collection</span>
                  <picture>
                    <source srcSet="/images/chic-edit/hero/main.webp" type="image/webp" />
                    <img src="/images/chic-edit/hero/main.jpg" alt="Bahaar Collection — contemporary festive lehengas" loading="lazy" />
                  </picture>
                  <div className="coll-card-overlay" />
                </div>
                <div className="coll-card-body">
                  <div className="coll-card-eyebrow coll-card-eyebrow--chic">Contemporary Festive</div>
                  <h3 className="coll-card-name">Bahaar</h3>
                  <p className="coll-card-desc">Fourteen contemporary lehenga designs for every moment that matters — cocktail, festive, evening, and everything in between.</p>
                  <span className="coll-card-cta coll-card-cta--chic">View Collection →</span>
                </div>
              </div>
            </Link>
            <Link to="/collection" className="coll-card-link">
              <div className="coll-card coll-card--rivayat reveal reveal-d1">
                <div className="coll-card-image-wrap">
                  <picture>
                    <source srcSet="/images/design3/main.webp" type="image/webp" />
                    <img src="/images/design3/main.jpg" alt="Rivayat Collection — heritage bridal lehenga" loading="lazy" />
                  </picture>
                  <div className="coll-card-overlay" />
                </div>
                <div className="coll-card-body">
                  <div className="coll-card-eyebrow">Heritage Bridal</div>
                  <h3 className="coll-card-name">Rivayat Collection</h3>
                  <p className="coll-card-desc">Ten handcrafted bridal ensembles, each a masterpiece of zardozi and zari work rooted in Old Delhi heritage.</p>
                  <span className="coll-card-cta">Explore Rivayat →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="journey-section">
        <div className="container">
          <div className="journey-section-header">
            <div className="section-badge">OUR PROCESS</div>
            <h2 className="section-title">Your Bespoke Journey</h2>
            <p className="section-subtitle">From intimate consultation to final fitting — we craft each ensemble with you at every step.</p>
          </div>

          <div className="journey">
            {[{
              title:'Consultation',
              desc:'We begin with a one-on-one consultation to learn your story and preferences.',
              num:'I'
            },{
              title:'Design',
              desc:'Our studio sketches concepts and refines silhouettes with you.',
              num:'II'
            },{
              title:'Fabric',
              desc:'Choose from curated fabrics selected for drape, comfort and heritage.',
              num:'III'
            },{
              title:'Embroidery',
              desc:'Artisans bring motifs to life with handwork and subtle embellishment.',
              num:'IV'
            },{
              title:'Final Fitting',
              desc:'A final fitting ensures perfect drape and comfort before collection.',
              num:'V'
            }].map((s, i) => (
              <div className={`journey-step reveal reveal-d${i}`} key={s.title}>
                <div className="step-circle">{s.num}</div>
                <div className="step-content">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-modern">
        <div className="container">
          <div className="about-modern-grid">
            <div className="about-modern-image reveal">
              <picture>
                <source srcSet="/images/handworkImage/handwork.webp" type="image/webp" />
                <img
                  src="/images/handworkImage/handwork.jpeg"
                  alt="Master artisan embroidering a bridal ensemble by hand"
                  className="about-main-image"
                  loading="lazy"
                />
              </picture>
              <div className="about-image-inset">
                <picture>
                  <source srcSet="/images/handworkImage/handwork1.webp" type="image/webp" />
                  <img
                    src="/images/handworkImage/handwork1.JPG"
                    alt="An artisan stretching silk across the embroidery frame before work begins"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
            
            <div className="about-modern-content reveal">
              <div className="about-label">OUR STORY</div>
              <h2 className="about-modern-title">Rooted in Heritage,<br />Made for You</h2>
              <p className="about-modern-para">
                Delhi Six Couture is rooted in heritage — we celebrate Old Delhi's craft through refined silhouettes and thoughtful detailing. Each ensemble is designed for lasting wear and meaningful moments.
              </p>
              <p className="about-modern-para">
                Our process blends time-honoured techniques with modern tailoring, working closely with artisans to honour lineage while creating contemporary fits.
              </p>
              
              <div className="founder-modern-card">
                <picture>
                  <source srcSet="/images/bhavyaGoel/bhavyaGoel.webp" type="image/webp" />
                  <img
                    src="/images/bhavyaGoel/bhavyaGoel.JPG"
                    alt="Bhavya Goel"
                    className="founder-modern-photo"
                    loading="lazy"
                  />
                </picture>
                <div className="founder-modern-info">
                  <div className="founder-modern-name">Bhavya Goel</div>
                  <div className="founder-modern-title">Founder & Creative Director</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}

function CollectionPage() {
  useEffect(() => { document.title = 'Rivayat Collection — Delhi Six Couture'; }, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 5;
  const totalDesigns = TOTAL_DESIGNS;
  const totalPages = Math.ceil(totalDesigns / itemsPerPage);
  const page = Math.min(Math.max(Number(searchParams.get('page')) || 1, 1), totalPages);
  const setPage = (updater) => {
    const next = typeof updater === 'function' ? updater(page) : updater;
    setSearchParams(next === 1 ? {} : { page: String(next) });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const designs = Array.from({length: totalDesigns}, (_, i) => i + 1).slice(startIdx, endIdx);
  // Only the first bestseller on each page becomes the wide spotlight card —
  // the single, exclusive "Bestseller" badge for that page.
  const spotlightId = designs.find(item => TRENDING_IDS.includes(item));
  // Spotlight sits at slot 3 — 2 regular cards fill the rest of row one, then
  // the spotlight (2 columns wide) can't fit the 1 remaining column, so it
  // deterministically opens row two. This divides evenly at both the 3-col
  // desktop grid and the 2-col tablet grid (2 singles exactly fill a 2-col
  // row before the spotlight is reached), so there's no gap at either width.
  const othersOnPage = designs.filter(item => item !== spotlightId);
  const orderedDesigns = spotlightId
    ? [...othersOnPage.slice(0, 2), spotlightId, ...othersOnPage.slice(2)]
    : designs;

  return (
    <>
      <section className="collection-hero fade-in">
        <div className="collection-hero-year" aria-hidden="true">Rivayat</div>
        <div className="collection-hero-inner">
          <div className="collection-hero-text">
            <div className="collection-badge">LEGACY • HERITAGE • CRAFTED</div>
            <h1 className="collection-hero-title">Rivayat Collection</h1>
            <p className="collection-subtitle">Timeless bridal artistry</p>
            <p className="collection-description">A curated selection of bridal ensembles, each a masterpiece of heritage and contemporary elegance. Every piece celebrates the artistry of traditional craft with modern silhouettes designed for your most cherished moment.</p>
            <Link to="/contact" className="btn btn--primary">Book Your Consultation</Link>
          </div>
        </div>
      </section>

      <section className="container collection-section fade-in">
        <div className="riv-grid">
          {orderedDesigns.map(item => {
            const isSpotlight = item === spotlightId;
            return (
              <Link
                key={item}
                to={`/collection/${item}${page > 1 ? `?fromPage=${page}` : ''}`}
                className={`riv-grid-link${isSpotlight ? ' riv-grid-link--featured' : ''}`}
              >
                <article className="riv-grid-card">
                  <div className="riv-grid-image-wrap">
                    <picture>
                      <source
                        srcSet={designImages[item] ? designImages[item][0].replace(/\.(jpg|jpeg)$/i, '.webp') : ''}
                        type="image/webp"
                      />
                      <img
                        src={designImages[item] ? designImages[item][0] : `https://via.placeholder.com/900x1200?text=Design+${item}`}
                        alt={designNames[item] || `Design ${item}`}
                        className="riv-grid-image"
                        loading="lazy"
                      />
                    </picture>
                    <div className="riv-grid-overlay">
                      <span className="overlay-text">View Full Details</span>
                      <span className="overlay-arrow">→</span>
                    </div>
                  </div>
                  <div className="riv-grid-meta">
                    {isSpotlight && <span className="riv-grid-eyebrow">Bestseller</span>}
                    <h3 className="riv-grid-title">{designNames[item]}</h3>
                    {isSpotlight && (
                      <p className="riv-grid-excerpt">{designDescriptions[item]}</p>
                    )}
                    <div className="riv-grid-tags">
                      {designTags[item].map((tag, idx) => (
                        <span key={idx} className="riv-grid-tag">{tag}</span>
                      ))}
                    </div>
                    <span className="riv-grid-cta">Explore Design →</span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        <div className="pagination-controls">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn btn--secondary"
            style={{opacity: page === 1 ? 0.5 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer'}}
          >
            ← Previous
          </button>

          <div className="pagination-nums">
            {Array.from({length: totalPages}, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`pagination-num${p === page ? ' active' : ''}`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="btn btn--secondary"
            style={{opacity: page === totalPages ? 0.5 : 1, cursor: page === totalPages ? 'not-allowed' : 'pointer'}}
          >
            Next →
          </button>
        </div>

        <div className="pagination-info">
          Page {page} of {totalPages} · Showing {startIdx + 1}–{Math.min(endIdx, totalDesigns)} of {totalDesigns} designs
        </div>
      </section>
    </>
  )
}

function ChicEditPage() {
  useEffect(() => { document.title = "Bahaar — Delhi Six Couture"; }, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 5;
  const totalDesigns = TOTAL_CHIC_DESIGNS;
  const totalPages = Math.ceil(totalDesigns / itemsPerPage);
  const page = Math.min(Math.max(Number(searchParams.get('page')) || 1, 1), totalPages);
  const setPage = (updater) => {
    const next = typeof updater === 'function' ? updater(page) : updater;
    setSearchParams(next === 1 ? {} : { page: String(next) });
  };

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const designs = Array.from({ length: totalDesigns }, (_, i) => i + 1).slice(startIdx, endIdx);

  return (
    <>
      <section className="chic-hero fade-in">
        <div className="chic-hero-year" aria-hidden="true">Bahaar</div>
        <div className="chic-hero-inner">
          <div className="chic-hero-text">
            <div className="chic-badge">CONTEMPORARY · FESTIVE · 2026</div>
            <h1 className="chic-hero-title">Bahaar</h1>
            <p className="chic-hero-tagline">Not bridal. Just you.</p>
            <p className="chic-hero-desc">Contemporary lehenga for every moment that matters — cocktail evenings, festive gatherings, and every occasion between.</p>
            <Link to="/contact" className="btn btn--chic-cta">Book a Consultation</Link>
          </div>
        </div>
      </section>

      <section className="container collection-section fade-in">
        <div className="chic-grid">
          {designs.map(item => {
            const swatch = chicDesignSwatches[item];
            const isFeatured = CHIC_FEATURED_IDS.includes(item);
            return (
              <Link
                key={item}
                to={`/bahaar/${item}${page > 1 ? `?fromPage=${page}` : ''}`}
                className={`chic-grid-link${isFeatured ? ' chic-grid-link--featured' : ''}`}
              >
                <article className="chic-grid-card" style={{ '--swatch': swatch.hex, '--swatch-text': swatch.text }}>
                  <div className="chic-grid-image-wrap">
                    <div className="chic-grid-fallback" aria-hidden="true">
                      <span className="chic-grid-fallback-name">{chicDesignTags[item][0]}</span>
                    </div>
                    <picture>
                      <source
                        srcSet={chicDesignImages[item] ? chicDesignImages[item][0].replace(/\.(jpg|jpeg)$/i, '.webp') : ''}
                        type="image/webp"
                      />
                      <img
                        src={chicDesignImages[item] ? chicDesignImages[item][0] : `https://via.placeholder.com/900x1200?text=Chic+Edit+${item}`}
                        alt={chicDesignNames[item] || `Bahaar design ${item}`}
                        className="chic-grid-image"
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </picture>
                    <div className="chic-grid-wash" />
                    <div className="chic-grid-overlay">
                      <span className="overlay-text">View Full Details</span>
                      <span className="overlay-arrow">→</span>
                    </div>
                  </div>
                  <div className="chic-grid-meta">
                    {isFeatured && <span className="chic-grid-eyebrow">Editor's Pick</span>}
                    <div className="chic-grid-swatch-row">
                      <span className="chic-grid-swatch-chip" />
                      <span className="chic-grid-colourname">{chicDesignTags[item][0]}</span>
                    </div>
                    <h3 className="chic-grid-title">{chicDesignNames[item]}</h3>
                    {isFeatured && (
                      <p className="chic-grid-excerpt">{chicDesignDescriptions[item]}</p>
                    )}
                    <div className="chic-grid-tags">
                      {chicDesignTags[item].slice(1).map((tag, idx) => (
                        <span key={idx} className="chic-grid-tag">{tag}</span>
                      ))}
                    </div>
                    <span className="chic-grid-cta">Explore Design →</span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        <div className="pagination-controls">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn btn--secondary"
            style={{ opacity: page === 1 ? 0.5 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer' }}
          >
            ← Previous
          </button>
          <div className="pagination-nums">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`pagination-num${p === page ? ' active' : ''}`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="btn btn--secondary"
            style={{ opacity: page === totalPages ? 0.5 : 1, cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
          >
            Next →
          </button>
        </div>

        <div className="pagination-info">
          Page {page} of {totalPages} · Showing {startIdx + 1}–{Math.min(endIdx, totalDesigns)} of {totalDesigns} designs
        </div>
      </section>

      <section className="chic-cta">
        <div className="container">
          <div className="chic-cta-content">
            <h2>Wear It Your Way</h2>
            <p>Every Bahaar piece is fully customisable to your colour, fit, and occasion. Book a consultation and we'll design it around you.</p>
            <Link to="/contact" className="btn btn--primary">Book a Consultation</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ChicEditDesignPage() {
  const { id } = useParams();
  const numId = Number(id);
  const [searchParams] = useSearchParams();
  const fromPage = searchParams.get('fromPage');
  const backToBahaarHref = fromPage ? `/bahaar?page=${fromPage}` : '/bahaar';
  useEffect(() => {
    const name = chicDesignNames[id] || 'Contemporary Design';
    document.title = `${name} — Bahaar — Delhi Six Couture`;
  }, [id]);
  useEffect(() => { window.scrollTo(0, 0); }, [id]);
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const thumbs = chicDesignImages[id] ? chicDesignImages[id] : chicDesignImages[1];
  const description = chicDesignDescriptions[id] || "A contemporary lehenga crafted for the modern Indian woman.";
  const design = chicDesignDetails[id] || chicDesignDetails[1];
  const swatch = chicDesignSwatches[id] || chicDesignSwatches[1];
  const colourName = chicDesignTags[id] ? chicDesignTags[id][0] : 'Bahaar';
  const catalogNo = String(numId).padStart(2, '0');
  const tagline = description.split('. ')[0].replace(/\.$/, '') + '.';
  const nextIds = Array.from({ length: 3 }, (_, i) => ((numId - 1 + i + 1) % TOTAL_CHIC_DESIGNS) + 1);

  const goPrev = useCallback(() => setActive(i => (i - 1 + thumbs.length) % thumbs.length), [thumbs.length]);
  const goNext = useCallback(() => setActive(i => (i + 1) % thumbs.length), [thumbs.length]);

  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setZoomOpen(false);
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoomOpen, goPrev, goNext]);

  return (
    <section className="chic-details-page" style={{ '--swatch': swatch.hex, '--swatch-text': swatch.text }}>
      <div className="container chic-detail-body">
        <div className="chic-gallery fade-in">
          <div className="chic-gallery-thumbs">
            {thumbs.map((src, i) => (
              <button
                key={i}
                className={`chic-thumb ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
              >
                <img src={src} alt={`thumbnail-${i}`} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </button>
            ))}
          </div>
          <div className="chic-gallery-main">
            <div className="chic-detail-fallback" aria-hidden="true">
              <span className="chic-detail-fallback-name">{colourName}</span>
            </div>
            <picture>
              <source srcSet={thumbs[active].replace(/\.(jpg|jpeg)$/i, '.webp')} type="image/webp" />
              <img
                src={thumbs[active]}
                alt={`${chicDesignNames[id]} — view ${active + 1}`}
                className="chic-gallery-image"
                onClick={() => setZoomOpen(true)}
                style={{ cursor: 'pointer' }}
                loading="eager"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </picture>
            <div className="image-counter">{active + 1} / {thumbs.length}</div>
            <div className="zoom-hint">Click to zoom</div>
          </div>
        </div>

        {zoomOpen && (
          <div className="zoom-modal" onClick={() => setZoomOpen(false)}>
            <div className="zoom-modal-content">
              <img src={thumbs[active]} alt="Zoomed view" className="zoomed-image" loading="eager" />
              <div className="zoom-nav" onClick={(e) => e.stopPropagation()}>
                <button className="zoom-nav-btn" onClick={goPrev} aria-label="Previous image">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button className="zoom-nav-btn zoom-nav-close" onClick={() => setZoomOpen(false)} aria-label="Close">✕</button>
                <button className="zoom-nav-btn" onClick={goNext} aria-label="Next image">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="chic-detail-info">
          <div className="chic-detail-eyebrow">Bahaar · No. {catalogNo}</div>
          <h1 className="chic-detail-title">{chicDesignNames[id] || "Bahaar Lehenga"}</h1>
          <p className="chic-detail-tagline">{tagline}</p>

          <div className="chic-detail-chip-row">
            <span className="chic-detail-chip" />
            <span className="chic-detail-chip-name">{colourName}</span>
            <span className="chic-detail-chip-hex">{swatch.hex.toUpperCase()}</span>
          </div>

          <div className="chic-facts">
            <div className="chic-fact">
              <span className="chic-fact-label">Occasion</span>
              <span className="chic-fact-value">{design.occasion}</span>
            </div>
            <div className="chic-fact">
              <span className="chic-fact-label">Material</span>
              <span className="chic-fact-value">{design.material}</span>
            </div>
            <div className="chic-fact">
              <span className="chic-fact-label">Embroidery</span>
              <span className="chic-fact-value">{design.embroidery}</span>
            </div>
            <div className="chic-fact">
              <span className="chic-fact-label">Included</span>
              <span className="chic-fact-value">{design.included}</span>
            </div>
            <div className="chic-fact">
              <span className="chic-fact-label">Lead Time</span>
              <span className="chic-fact-value">{design.timeToCreate}</span>
            </div>
          </div>

          <div className="chic-detail-cta">
            <Link to="/contact" className="btn chic-btn-primary chic-cta-block">Book a Consultation</Link>
            <Link to={backToBahaarHref} className="btn btn--secondary chic-cta-block">← Back to Bahaar</Link>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Take a look at the ${chicDesignNames[id] || 'Bahaar'} from Delhi Six Couture — ${window.location.href}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="chic-share-btn"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9c0 1.58.41 3.07 1.13 4.36L3 21l4.75-1.09A8.96 8.96 0 0 0 12 21Z" />
                <path d="M8.5 8.5c0-.5.5-1 1-1s1 .1 1.3.7c.3.6.9 2 1 2.2.1.2.2.5 0 .8-.2.3-.3.4-.5.7-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6 1.4 1.3 2.1 1.5 2.5 1.6.4.1.6 0 .8-.2.2-.2.9-1 1.1-1.3.2-.3.4-.3.7-.2.3.1 2 .9 2.3 1.1.3.2.5.2.6.4.1.2.1.9-.2 1.8-.3.9-1.7 1.7-2.3 1.8-.6.1-1.3.2-4.2-.9-3.5-1.4-5.7-4.9-5.9-5.1-.2-.2-1.4-1.9-1.4-3.6Z" />
              </svg>
              Share on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="chic-continue">
        <div className="container">
          <div className="chic-continue-label">Continue the Colour Story</div>
          <div className="chic-continue-strip">
            {nextIds.map(nid => {
              const nSwatch = chicDesignSwatches[nid];
              return (
                <Link
                  key={nid}
                  to={`/bahaar/${nid}`}
                  className="chic-continue-card"
                  style={{ '--swatch': nSwatch.hex, '--swatch-text': nSwatch.text }}
                >
                  <div className="chic-continue-image-wrap">
                    <div className="chic-continue-fallback" aria-hidden="true" />
                    <img
                      src={chicDesignImages[nid] ? chicDesignImages[nid][0] : ''}
                      alt={chicDesignNames[nid]}
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                  <div className="chic-continue-meta">
                    <span className="chic-continue-chip" />
                    <span className="chic-continue-name">{chicDesignNames[nid]}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function DesignDetailsPage() {
  const { id } = useParams();
  const numId = Number(id);
  const [searchParams] = useSearchParams();
  const fromPage = searchParams.get('fromPage');
  const backToCollectionHref = fromPage ? `/collection?page=${fromPage}` : '/collection';
  useEffect(() => {
    const name = designNames[id] || 'Bridal Design';
    document.title = `${name} — Delhi Six Couture`;
  }, [id]);
  useEffect(() => { window.scrollTo(0, 0); }, [id]);
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const thumbs = designImages[id] ? designImages[id] : designImages[1];
  const description = designDescriptions[id] || "A handcrafted bridal ensemble with intricate embroidery and heritage detailing.";
  const design = designDetails[id] || designDetails[1];
  const tagline = description.split('. ')[0].replace(/\.$/, '') + '.';
  const nextIds = Array.from({ length: 3 }, (_, i) => ((numId - 1 + i + 1) % TOTAL_DESIGNS) + 1);

  const goPrev = useCallback(() => setActive(i => (i - 1 + thumbs.length) % thumbs.length), [thumbs.length]);
  const goNext = useCallback(() => setActive(i => (i + 1) % thumbs.length), [thumbs.length]);

  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setZoomOpen(false);
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoomOpen, goPrev, goNext]);

  return (
    <section className="riv-details-page">
      <div className="container riv-detail-body">
        <div className="riv-gallery fade-in">
          <div className="riv-gallery-thumbs">
            {thumbs.map((src, i) => (
              <button
                key={i}
                className={`riv-thumb ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
              >
                <img src={src} alt={`thumbnail-${i}`} loading="lazy" />
              </button>
            ))}
          </div>
          <div className="riv-gallery-main">
            <picture>
              <source srcSet={thumbs[active].replace(/\.(jpg|jpeg)$/i, '.webp')} type="image/webp" />
              <img
                src={thumbs[active]}
                alt={`${designNames[id]} — view ${active + 1}`}
                className="riv-gallery-image"
                onClick={() => setZoomOpen(true)}
                style={{ cursor: 'pointer' }}
                loading="eager"
              />
            </picture>
            <div className="image-counter">{active + 1} / {thumbs.length}</div>
            <div className="zoom-hint">Click to zoom</div>
          </div>
        </div>

        {zoomOpen && (
          <div className="zoom-modal" onClick={() => setZoomOpen(false)}>
            <div className="zoom-modal-content">
              <img src={thumbs[active]} alt="Zoomed view" className="zoomed-image" loading="eager" />
              <div className="zoom-nav" onClick={(e) => e.stopPropagation()}>
                <button className="zoom-nav-btn" onClick={goPrev} aria-label="Previous image">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button className="zoom-nav-btn zoom-nav-close" onClick={() => setZoomOpen(false)} aria-label="Close">✕</button>
                <button className="zoom-nav-btn" onClick={goNext} aria-label="Next image">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="riv-detail-info">
          <h1 className="riv-detail-title">{designNames[id] || "Rivayat Heritage Lehenga"}</h1>
          <p className="riv-detail-tagline">{tagline}</p>
          <span className="stitch riv-detail-stitch" aria-hidden="true"></span>

          <div className="riv-facts">
            <div className="riv-fact">
              <span className="riv-fact-label">Occasion</span>
              <span className="riv-fact-value">{design.occasion}</span>
            </div>
            <div className="riv-fact">
              <span className="riv-fact-label">Material</span>
              <span className="riv-fact-value">{design.material}</span>
            </div>
            <div className="riv-fact">
              <span className="riv-fact-label">Embroidery</span>
              <span className="riv-fact-value">{design.embroidery}</span>
            </div>
            <div className="riv-fact">
              <span className="riv-fact-label">Included</span>
              <span className="riv-fact-value">{design.included}</span>
            </div>
            <div className="riv-fact">
              <span className="riv-fact-label">Lead Time</span>
              <span className="riv-fact-value">{design.timeToCreate}</span>
            </div>
          </div>

          <div className="riv-detail-cta">
            <Link to="/contact" className="btn btn--primary riv-cta-block">Schedule Your Consultation</Link>
            <Link to={backToCollectionHref} className="btn btn--secondary riv-cta-block">← Back to Rivayat</Link>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Take a look at the ${designNames[id] || 'Rivayat'} from Delhi Six Couture — ${window.location.href}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="riv-share-btn"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9c0 1.58.41 3.07 1.13 4.36L3 21l4.75-1.09A8.96 8.96 0 0 0 12 21Z" />
                <path d="M8.5 8.5c0-.5.5-1 1-1s1 .1 1.3.7c.3.6.9 2 1 2.2.1.2.2.5 0 .8-.2.3-.3.4-.5.7-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6 1.4 1.3 2.1 1.5 2.5 1.6.4.1.6 0 .8-.2.2-.2.9-1 1.1-1.3.2-.3.4-.3.7-.2.3.1 2 .9 2.3 1.1.3.2.5.2.6.4.1.2.1.9-.2 1.8-.3.9-1.7 1.7-2.3 1.8-.6.1-1.3.2-4.2-.9-3.5-1.4-5.7-4.9-5.9-5.1-.2-.2-1.4-1.9-1.4-3.6Z" />
              </svg>
              Share on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="riv-continue">
        <div className="container">
          <div className="riv-continue-label">Continue the Heritage</div>
          <div className="riv-continue-strip">
            {nextIds.map(nid => (
              <Link key={nid} to={`/collection/${nid}`} className="riv-continue-card">
                <div className="riv-continue-image-wrap">
                  <img src={designImages[nid] ? designImages[nid][0] : ''} alt={designNames[nid]} loading="lazy" />
                </div>
                <div className="riv-continue-meta">
                  <span className="riv-continue-name">{designNames[nid]}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  useEffect(() => { document.title = 'Book a Consultation — Delhi Six Couture'; }, []);
  const { trackEvent } = useCAPI();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [weddingMonth, setWeddingMonth] = useState('');
  const [weddingYear, setWeddingYear] = useState('');
  const [budget, setBudget] = useState('');
  const [designType, setDesignType] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function handleSubmit(e){
    e.preventDefault();
    const newErrors = {};
    
    if (!name.trim()) newErrors.name = 'Please enter your name';
    if (!email.trim()) newErrors.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email';
    if (!weddingMonth || !weddingYear) newErrors.weddingDate = 'Please select wedding month and year';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setSubmitted(true);
    if (window.gtag) {
      window.gtag('event', 'generate_lead', {
        event_category: 'contact_form',
        event_label: designType || 'general'
      });
    }
    if (window.fbq) window.fbq('track', 'Lead');
    trackEvent('Lead', { email, firstName: name.split(' ')[0], lastName: name.split(' ').slice(1).join(' ') }, { value: 0, currency: 'INR' });
    const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const text = `Hi! I'd like to schedule a consultation.\n\nName: ${name}\nEmail: ${email}\nWedding Date: ${monthNames[parseInt(weddingMonth)]} ${weddingYear}\nDesign Interest: ${designType || 'Not specified'}\nBudget: ${budget || 'Not specified'}\n\nMessage: ${message || 'No additional message'}`;
    const waLink = `https://wa.me/917011764857?text=${encodeURIComponent(text)}`;
    const win = window.open(waLink, '_blank');
    if(!win){
      window.location.href = waLink;
    }
    setTimeout(() => {
      setName('');
      setEmail('');
      setWeddingMonth('');
      setWeddingYear('');
      setBudget('');
      setDesignType('');
      setMessage('');
      setSubmitted(false);
    }, 2000);
  }

  return (
    <section className="contact-section fade-in">
      <div className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <div className="contact-badge">BESPOKE CONSULTATION</div>
            <h1 className="contact-title">Plan Your Bespoke Journey</h1>
            <p className="contact-lead">Share your vision and wedding details. Our artisans will connect within 24 hours to discuss your exclusive ensemble and create your perfect moment.</p>
          </div>
        </div>
      </div>

      <div className="contact-details">
        <div className="container">
          <div className="contact-details-inner">
            <div className="contact-detail-row">
              <span className="info-label">Location</span>
              <a href="https://maps.app.goo.gl/Hxs6L6HFjrGm614Y6" target="_blank" rel="noopener noreferrer" className="contact-detail-link">
                Old Delhi Heritage District, New Delhi
              </a>
            </div>
            <div className="contact-detail-row">
              <span className="info-label">Phone</span>
              <a href="tel:+917011764857" className="contact-detail-link">(+91) 70117 64857</a>
            </div>
            <div className="contact-detail-row">
              <span className="info-label">Studio Hours</span>
              <span className="contact-detail-value">Monday – Saturday &nbsp; 11 AM – 8:30 PM &nbsp;·&nbsp; Sunday by appointment</span>
            </div>
            <a className="contact-wa-btn" href="https://wa.me/917011764857" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="contact-form-section">
        <div className="container">
          <div className="contact-form-wrap">
            <div className="contact-form" aria-labelledby="contact-form">
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                  Full Name{errors.name && <span style={{color:'var(--crimson)',fontWeight:400,textTransform:'none',letterSpacing:0,marginLeft:8,fontSize:11}}>{errors.name}</span>}
                </label>
                <div className="input-wrapper">
                  <input id="name" value={name} onChange={e=>{setName(e.target.value); if(errors.name) setErrors({...errors, name: ''});}} placeholder="Your full name" required />
                </div>

                <label htmlFor="email">
                  Email Address{errors.email && <span style={{color:'var(--crimson)',fontWeight:400,textTransform:'none',letterSpacing:0,marginLeft:8,fontSize:11}}>{errors.email}</span>}
                </label>
                <div className="input-wrapper">
                  <input id="email" type="email" value={email} onChange={e=>{setEmail(e.target.value); if(errors.email) setErrors({...errors, email: ''});}} placeholder="you@domain.com" required />
                </div>

                <label htmlFor="weddingDate">
                  Wedding Date{errors.weddingDate && <span style={{color:'var(--crimson)',fontWeight:400,textTransform:'none',letterSpacing:0,marginLeft:8,fontSize:11}}>{errors.weddingDate}</span>}
                </label>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'8px'}}>
                  <div className="select-wrapper">
                    <select id="weddingMonth" value={weddingMonth} onChange={e=>{setWeddingMonth(e.target.value); if(errors.weddingDate) setErrors({...errors, weddingDate: ''});}} required>
                      <option value="">Month</option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </div>
                  <div className="select-wrapper">
                    <select id="weddingYear" value={weddingYear} onChange={e=>{setWeddingYear(e.target.value); if(errors.weddingDate) setErrors({...errors, weddingDate: ''});}} required>
                      <option value="">Year</option>
                      {[2026, 2027, 2028, 2029, 2030, 2031].map(year => <option key={year} value={year}>{year}</option>)}
                    </select>
                  </div>
                </div>
                <p style={{fontSize:12,color:'var(--charcoal-mid)',marginBottom:24,lineHeight:1.6}}>Lead time is typically 8–18 weeks depending on design complexity.</p>

                <label htmlFor="designType">Design Interest</label>
                <div className="select-wrapper">
                  <select id="designType" value={designType} onChange={e=>setDesignType(e.target.value)}>
                    <option value="">Browse our collection</option>
                    <optgroup label="Rivayat Collection">
                      {Object.entries(designNames).map(([id, name]) => (
                        <option key={`riv-${id}`} value={name}>{name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Bahaar">
                      {Object.entries(chicDesignNames).map(([id, name]) => (
                        <option key={`bahaar-${id}`} value={name}>{name}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <label htmlFor="budget">Budget Range</label>
                <div className="select-wrapper">
                  <select id="budget" value={budget} onChange={e=>setBudget(e.target.value)}>
                    <option value="">Select your budget</option>
                    <option value="₹1L - ₹1.5L">₹1,00,000 – ₹1,50,000</option>
                    <option value="₹1.5L - ₹2.5L">₹1,50,000 – ₹2,50,000</option>
                    <option value="₹2.5L - ₹5L">₹2,50,000 – ₹5,00,000</option>
                    <option value="₹5L+">₹5,00,000 and above</option>
                  </select>
                </div>

                <label htmlFor="message">Your Vision</label>
                <div className="textarea-wrapper">
                  <textarea id="message" value={message} onChange={e=>setMessage(e.target.value)} placeholder="Share any inspirations, colours, or ideas you have in mind…" />
                </div>

                <div className="form-ctas">
                  <button className="btn btn--primary" type="submit">Book My Consultation</button>
                  <a className="btn btn--whatsapp-form" href={`https://wa.me/917011764857?text=${encodeURIComponent('Hi, I would like to discuss my bridal ensemble for Delhi Six Couture')}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </div>

                {submitted && <div className="form-success-message">Thank you — your enquiry has been sent. Our artisans will be in touch within 24 hours.</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NotFoundPage() {
  useEffect(() => { document.title = 'Page Not Found — Delhi Six Couture'; }, []);
  return (
    <section style={{textAlign: 'center', padding: '6rem 1rem'}}>
      <h1 style={{fontFamily: "'Playfair Display', serif", color: 'var(--crimson)'}}>Page Not Found</h1>
      <p style={{marginBottom: '2rem'}}>The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn--primary">Back to Home</Link>
    </section>
  );
}

export default function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    ['utm_source','utm_medium','utm_campaign','utm_content','gclid','fbclid'].forEach(k => {
      if (params.get(k)) sessionStorage.setItem(k, params.get(k));
    });
  }, []);

  return (
    <Router>
      <MetaPixelTracker />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/collection/:id" element={<DesignDetailsPage />} />
          <Route path="/bahaar" element={<ChicEditPage />} />
          <Route path="/bahaar/:id" element={<ChicEditDesignPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

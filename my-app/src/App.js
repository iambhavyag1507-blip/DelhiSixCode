// App.js
import React, { useState, useEffect } from "react";
import './styles.css'
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from "react-router-dom";
import Nav from './components/Nav'
import Footer from './components/Footer'
import { designImages, designNames, designTags, designDescriptions, designDetails, TOTAL_DESIGNS, TRENDING_IDS } from './data/designs'
import { chicDesignImages, chicDesignNames, chicDesignTags, chicDesignDescriptions, chicDesignDetails, TOTAL_CHIC_DESIGNS, CHIC_FEATURED_IDS } from './data/chicEditDesigns'
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

function HomePage() {
  useEffect(() => { document.title = 'Delhi Six Couture — Luxury Bridal Wear'; }, []);
  return (
    <>
      <section className="hero">
        <picture>
          <source srcSet="/images/design3/main.webp" type="image/webp" />
          <img
            src="/images/design3/main.jpg"
            alt="Luxury bridal lehenga by Delhi Six Couture"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-text">
          <span className="eyebrow">Luxury Bridal &nbsp;·&nbsp; Heritage Craft &nbsp;·&nbsp; Bespoke</span>
          <h1>Your Story,<br />Our Silhouette</h1>
          <p className="hero-subheading">Heritage meets elegance in every stitch</p>
          <div className="hero-ctas">
            <Link to="/collection" className="btn btn--primary">Explore Our Designs</Link>
            <Link to="/contact" className="btn btn--consultation">Schedule Consultation</Link>
          </div>
        </div>
      </section>

      <section className="collections-home-section">
        <div className="container">
          <div className="collections-home-header reveal">
            <div className="section-badge">OUR COLLECTIONS</div>
            <h2 className="collections-home-title">Two Worlds, One House</h2>
            <p className="collections-home-sub">Heritage bridal artistry and contemporary fashion — both crafted with the same devotion to detail.</p>
          </div>
          <div className="collections-home-grid">
            <Link to="/collection" className="coll-card-link">
              <div className="coll-card coll-card--rivayat reveal">
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
            <Link to="/chic-edit-26" className="coll-card-link">
              <div className="coll-card coll-card--chic reveal reveal-d1">
                <div className="coll-card-image-wrap">
                  <div className="coll-card-placeholder">
                    <span className="coll-card-placeholder-text">CHIC EDIT '26</span>
                  </div>
                  <div className="coll-card-overlay" />
                </div>
                <div className="coll-card-body">
                  <div className="coll-card-eyebrow coll-card-eyebrow--chic">Contemporary Festive</div>
                  <h3 className="coll-card-name">Chic Edit'26</h3>
                  <p className="coll-card-desc">Ten contemporary lehenga designs for every moment that matters — cocktail, festive, evening, and everything in between.</p>
                  <span className="coll-card-cta coll-card-cta--chic">Explore the Edit →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="luxury-strip">
        <div className="container">
          <div className="luxury-grid">
            <div className="luxury-item reveal">
              <span className="luxury-icon">I</span>
              <h3>Signature Heritage</h3>
              <p>Master artisans from Old Delhi bringing techniques passed through generations</p>
            </div>
            <div className="luxury-item reveal reveal-d1">
              <span className="luxury-icon">II</span>
              <h3>Fully Bespoke</h3>
              <p>Your vision crafted into reality through intimate consultations and fittings</p>
            </div>
            <div className="luxury-item reveal reveal-d2">
              <span className="luxury-icon">III</span>
              <h3>Premium Fabrics</h3>
              <p>Curated silks, taffetas, and embellishments from the finest sources</p>
            </div>
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

      <section className="testimonials-modern">
        <div className="container">
          <div className="section-header-modern reveal">
            <div className="section-badge">Bride Stories</div>
            <h2 className="section-title-modern">Words from Our Brides</h2>
            <p className="section-subtitle-modern">Real moments, real joy — our brides share their Delhi Six Couture experience</p>
          </div>

          <div className="testimonials-modern-grid">
            {[
              {
                name: 'Ananya Malhotra',
                role: 'Wedding · December 2025',
                quote: 'The entire experience was magical. From understanding my vision to the final draping, every moment was thoughtful and personal.'
              },
              {
                name: 'Priya Singh',
                role: 'Wedding · October 2025',
                quote: 'I felt like royalty the moment I wore my ensemble. The craftsmanship is exceptional, and the fit was absolutely perfect.'
              },
              {
                name: 'Simran Kapoor',
                role: 'Wedding · November 2025',
                quote: 'Worth every moment of planning. My Delhi Six Couture ensemble made me feel confident, beautiful, and celebrated on my big day.'
              }
            ].map((t, i) => (
              <div key={i} className={`testimonial-modern-card reveal reveal-d${i}`}>
                <span className="testimonial-stars">★★★★★</span>
                <p className="testimonial-quote">{t.quote}</p>
                <div className="testimonial-divider" />
                <div className="testimonial-info">
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-meta">{t.role}</div>
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
              <div className="about-image-accent" aria-hidden="true" />
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
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const totalDesigns = TOTAL_DESIGNS;
  const totalPages = Math.ceil(totalDesigns / itemsPerPage);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  
  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const designs = Array.from({length: totalDesigns}, (_, i) => i + 1).slice(startIdx, endIdx);
  
  return (
    <>
      <section className="collection-hero fade-in">
        <div className="collection-overlay" />
        <div className="collection-hero-content">
          <div className="collection-badge">LEGACY • HERITAGE • CRAFTED</div>
          <h1>Rivayat Collection</h1>
          <p className="collection-subtitle">Timeless bridal artistry</p>
          <p className="collection-description">A curated selection of bridal ensembles, each a masterpiece of heritage and contemporary elegance. Every piece celebrates the artistry of traditional craft with modern silhouettes designed for your most cherished moment.</p>
          <div className="collection-hero-divider"></div>
          <p className="collection-cta-text">Explore our collection of handcrafted bridal heritage</p>
        </div>
      </section>

      <section className="container collection-section fade-in">
        <div className="collection-grid">
          {designs.map(item => (
            <Link key={item} to={`/collection/${item}`} className="collection-link">
              <article className="collection-card">
                <div className="card-image-wrap">
                  {TRENDING_IDS.includes(item) && <div className="trending-badge">Bestseller</div>}
                  <picture>
                    <source
                      srcSet={designImages[item] ? designImages[item][0].replace(/\.(jpg|jpeg)$/i, '.webp') : ''}
                      type="image/webp"
                    />
                    <img
                      src={designImages[item] ? designImages[item][0] : `https://via.placeholder.com/900x1200?text=Design+${item}`}
                      alt={`Design ${item}`}
                      className="collection-image"
                      loading="lazy"
                    />
                  </picture>
                  <div className="card-overlay">
                    <div className="overlay-content">
                      <span className="overlay-text">View Full Details</span>
                      <span className="overlay-arrow">→</span>
                    </div>
                  </div>
                </div>
                <div className="card-meta">
                  <div className="meta-title">{designNames[item]}</div>
                  <div className="meta-tags">
                    {designTags[item].map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="meta-cta">Explore Design →</div>
                </div>
              </article>
            </Link>
          ))}
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

      <section className="collection-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Start Your Bespoke Journey</h2>
            <p>Schedule a consultation with our artisans to create your perfect wedding ensemble</p>
            <Link to="/contact" className="btn btn--white">Book Your Consultation</Link>
          </div>
        </div>
      </section>
    </>
  )
}

function ChicEditPage() {
  useEffect(() => { document.title = "Chic Edit'26 — Delhi Six Couture"; }, []);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const totalDesigns = TOTAL_CHIC_DESIGNS;
  const totalPages = Math.ceil(totalDesigns / itemsPerPage);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const designs = Array.from({ length: totalDesigns }, (_, i) => i + 1).slice(startIdx, endIdx);

  return (
    <>
      <section className="chic-hero fade-in">
        <div className="chic-hero-year" aria-hidden="true">26</div>
        <div className="chic-hero-inner">
          <div className="chic-hero-text">
            <div className="chic-badge">CONTEMPORARY · FESTIVE · 2026</div>
            <h1 className="chic-hero-title">Chic<br />Edit'26</h1>
            <p className="chic-hero-tagline">Not bridal. Just you.</p>
            <p className="chic-hero-desc">Contemporary lehenga for every moment that matters — cocktail evenings, festive gatherings, and every occasion between.</p>
            <Link to="/contact" className="btn btn--chic-cta">Book a Consultation</Link>
          </div>
          <div className="chic-hero-image-wrap">
            <div className="chic-hero-placeholder">
              <span className="chic-hero-placeholder-label">Chic Edit'26</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container collection-section fade-in">
        <div className="collection-grid">
          {designs.map(item => (
            <Link key={item} to={`/chic-edit-26/${item}`} className="collection-link">
              <article className="collection-card chic-card">
                <div className="card-image-wrap">
                  {CHIC_FEATURED_IDS.includes(item) && <div className="chic-featured-badge">Featured</div>}
                  <picture>
                    <source
                      srcSet={chicDesignImages[item] ? chicDesignImages[item][0].replace(/\.(jpg|jpeg)$/i, '.webp') : ''}
                      type="image/webp"
                    />
                    <img
                      src={chicDesignImages[item] ? chicDesignImages[item][0] : `https://via.placeholder.com/900x1200?text=Chic+Edit+${item}`}
                      alt={chicDesignNames[item] || `Chic Edit design ${item}`}
                      className="collection-image"
                      loading="lazy"
                    />
                  </picture>
                  <div className="card-overlay chic-card-overlay">
                    <div className="overlay-content">
                      <span className="overlay-text">View Full Details</span>
                      <span className="overlay-arrow">→</span>
                    </div>
                  </div>
                </div>
                <div className="card-meta">
                  <div className="meta-title">{chicDesignNames[item]}</div>
                  <div className="meta-tags">
                    {chicDesignTags[item].map((tag, idx) => (
                      <span key={idx} className="tag chic-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="meta-cta chic-meta-cta">Explore Design →</div>
                </div>
              </article>
            </Link>
          ))}
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
            <p>Every Chic Edit'26 piece is fully customisable to your colour, fit, and occasion. Book a consultation and we'll design it around you.</p>
            <Link to="/contact" className="btn btn--primary">Book a Consultation</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ChicEditDesignPage() {
  const { id } = useParams();
  useEffect(() => {
    const name = chicDesignNames[id] || 'Contemporary Design';
    document.title = `${name} — Chic Edit'26 — Delhi Six Couture`;
  }, [id]);
  const [active, setActive] = useState(0);
  const [zoomImage, setZoomImage] = useState(null);
  const thumbs = chicDesignImages[id] ? chicDesignImages[id] : chicDesignImages[1];
  const description = chicDesignDescriptions[id] || "A contemporary lehenga crafted for the modern Indian woman.";
  const design = chicDesignDetails[id] || chicDesignDetails[1];

  return (
    <section className="design-details-page">
      <div className="container">
        <div className="details-page-header">
          <div className="design-badge chic-design-badge">CHIC EDIT '26</div>
          <h1 className="design-title">{chicDesignNames[id] || "Chic Edit'26 Lehenga"}</h1>
        </div>

        <div className="details-body">
          <div className="details-gallery-section">
            <div className="gallery-container fade-in">
              <div className="main-image-wrapper">
                <picture>
                  <source srcSet={thumbs[active].replace(/\.(jpg|jpeg)$/i, '.webp')} type="image/webp" />
                  <img
                    src={thumbs[active]}
                    alt={`${chicDesignNames[id]} — view ${active + 1}`}
                    className="main-gallery-image"
                    onClick={() => setZoomImage(thumbs[active])}
                    style={{ cursor: 'pointer' }}
                    loading="eager"
                  />
                </picture>
                <div className="image-counter">{active + 1} / {thumbs.length}</div>
                <div className="zoom-hint">Click to zoom</div>
              </div>

              <div className="thumbnails-strip">
                {thumbs.map((src, i) => (
                  <button
                    key={i}
                    className={`thumbnail-btn ${i === active ? 'active' : ''}`}
                    onClick={() => setActive(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={src} alt={`thumbnail-${i}`} loading="lazy" />
                  </button>
                ))}
              </div>
            </div>

            <div className="info-banner chic-info-banner">
              <div className="banner-content">
                <div className="banner-title">Made for Your Moment</div>
                <div className="banner-text">Each Chic Edit'26 piece is customised to your vision — colour, fit, and embroidery — through intimate consultations and dedicated fittings.</div>
              </div>
            </div>
          </div>

          {zoomImage && (
            <div className="zoom-modal" onClick={() => setZoomImage(null)}>
              <div className="zoom-modal-content">
                <button className="zoom-close" onClick={() => setZoomImage(null)}>✕</button>
                <img src={zoomImage} alt="Zoomed view" className="zoomed-image" loading="eager" />
                <div className="zoom-controls">Click anywhere to close</div>
              </div>
            </div>
          )}

          <div className="details-info-section">
            <div className="description-block">
              <p className="design-description">{description}</p>
            </div>

            <div className="details-grid">
              <div className="detail-item">
                <div className="detail-label">Occasion</div>
                <div className="detail-value">{design.occasion}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">What's Included</div>
                <div className="detail-value">{design.included}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Lead Time</div>
                <div className="detail-value">{design.timeToCreate}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Material</div>
                <div className="detail-value">{design.material}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Embroidery</div>
                <div className="detail-value">{design.embroidery}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Care Instructions</div>
                <div className="detail-value">{design.care}</div>
              </div>
            </div>

            <div className="features-block">
              <h3 className="features-title">Signature Details</h3>
              <ul className="features-list">
                <li><span className="feature-icon">—</span> Designed for contemporary occasions, not just weddings</li>
                <li><span className="feature-icon">—</span> Handcrafted by master artisans from Old Delhi</li>
                <li><span className="feature-icon">—</span> Premium fabrics curated for drape and movement</li>
                <li><span className="feature-icon">—</span> Fully customisable to your colour and fit preference</li>
                <li><span className="feature-icon">—</span> Made-to-measure with dedicated fittings</li>
              </ul>
            </div>

            <div className="cta-section">
              <div className="cta-btns">
                <Link to="/contact" className="btn btn--primary">Book a Consultation</Link>
                <Link to="/chic-edit-26" className="btn btn--secondary">← Back to Chic Edit'26</Link>
              </div>
              <p className="cta-subtext">Connect with our team to discuss this design and your customisation options</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DesignDetailsPage() {
  const { id } = useParams();
  useEffect(() => {
    const name = designNames[id] || 'Bridal Design';
    document.title = `${name} — Delhi Six Couture`;
  }, [id]);
  const [active, setActive] = useState(0);
  const [zoomImage, setZoomImage] = useState(null);
  // Get images for the specific design
  const thumbs = designImages[id] ? designImages[id] : designImages[1];
  
  const description = designDescriptions[id] || "A handcrafted bridal ensemble with intricate embroidery and heritage detailing.";
  const design = designDetails[id] || designDetails[1];

  return (
    <section className="design-details-page">
      <div className="container">
        {/* Full-width page header — above the two columns */}
        <div className="details-page-header">
          <div className="design-badge">RIVAYAT COLLECTION</div>
          <h1 className="design-title">{designNames[id] || "Rivayat Heritage Lehenga"}</h1>
        </div>

        <div className="details-body">
          {/* Gallery Section */}
          <div className="details-gallery-section">
            <div className="gallery-container fade-in">
              <div className="main-image-wrapper">
                <picture>
                  <source srcSet={thumbs[active].replace(/\.(jpg|jpeg)$/i, '.webp')} type="image/webp" />
                  <img
                    src={thumbs[active]}
                    alt={`Design ${id} - view ${active+1}`}
                    className="main-gallery-image"
                    onClick={() => setZoomImage(thumbs[active])}
                    style={{cursor: 'pointer'}}
                    loading="eager"
                  />
                </picture>
                <div className="image-counter">{active + 1} / {thumbs.length}</div>
                <div className="zoom-hint">Click to zoom</div>
              </div>

              <div className="thumbnails-strip">
                {thumbs.map((src, i) => (
                  <button
                    key={i}
                    className={`thumbnail-btn ${i === active ? 'active' : ''}`}
                    onClick={() => setActive(i)}
                    aria-label={`View image ${i+1}`}
                  >
                    <img
                      src={src}
                      alt={`thumbnail-${i}`}
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="info-banner">
              <div className="banner-content">
                <div className="banner-title">Your Perfect Bridal Moment</div>
                <div className="banner-text">Each ensemble is personally created through intimate consultations and multiple fittings, ensuring your vision comes to life with unmatched craftsmanship.</div>
              </div>
            </div>
          </div>

          {/* Zoom Modal */}
          {zoomImage && (
            <div className="zoom-modal" onClick={() => setZoomImage(null)}>
              <div className="zoom-modal-content">
                <button className="zoom-close" onClick={() => setZoomImage(null)}>✕</button>
                <img
                  src={zoomImage}
                  alt="Zoomed view"
                  className="zoomed-image"
                  loading="eager"
                />
                <div className="zoom-controls">Click anywhere to close</div>
              </div>
            </div>
          )}

          {/* Details Section */}
          <div className="details-info-section">
            <div className="description-block">
              <p className="design-description">{description}</p>
            </div>

            {/* Details Grid */}
            <div className="details-grid">
              <div className="detail-item">
                <div className="detail-label">Occasion</div>
                <div className="detail-value">{design.occasion}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">What's Included</div>
                <div className="detail-value">{design.included}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Lead Time</div>
                <div className="detail-value">{design.timeToCreate}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Material</div>
                <div className="detail-value">{design.material}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Embroidery</div>
                <div className="detail-value">{design.embroidery}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Care Instructions</div>
                <div className="detail-value">{design.care}</div>
              </div>
            </div>

            <div className="features-block">
              <h3 className="features-title">Signature Details</h3>
              <ul className="features-list">
                <li><span className="feature-icon">—</span> Handcrafted by master artisans from Old Delhi</li>
                <li><span className="feature-icon">—</span> Traditional zari and embroidery techniques</li>
                <li><span className="feature-icon">—</span> Premium imported fabrics and embellishments</li>
                <li><span className="feature-icon">—</span> Fully customisable to your preferences</li>
                <li><span className="feature-icon">—</span> Made-to-measure with multiple fittings</li>
              </ul>
            </div>

            <div className="cta-section">
              <div className="cta-btns">
                <Link to="/contact" className="btn btn--primary">Schedule Your Consultation</Link>
                <Link to="/collection" className="btn btn--secondary">← Back to Collection</Link>
              </div>
              <p className="cta-subtext">Connect with our artisans to discuss this exclusive design and customisation options</p>
            </div>
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
                    {Object.entries(designNames).map(([id, name]) => (
                      <option key={id} value={name}>{name}</option>
                    ))}
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
          <Route path="/chic-edit-26" element={<ChicEditPage />} />
          <Route path="/chic-edit-26/:id" element={<ChicEditDesignPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

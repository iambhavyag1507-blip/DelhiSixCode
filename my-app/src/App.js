// App.js
import React, { useState, useEffect } from "react";
import './styles.css'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import Nav from './components/Nav'
import Footer from './components/Footer'
import { designImages, designNames, designTags, designDescriptions, designDetails, TOTAL_DESIGNS, TRENDING_IDS } from './data/designs'

function Layout({ children }) {
  return (
    <div className="min-h-screen fade-in">
      <Nav />

      <main style={{paddingTop:96}}>{children}</main>

      <Footer />
    </div>
  );
}

function HomePage() {
  useEffect(() => { document.title = 'Delhi Six Couture — Luxury Bridal Wear'; }, []);
  return (
    <>
      <section className="hero fade-in">
        <img 
          src="/images/design3/main.jpg" 
          alt="Luxury bridal elegance" 
          className="absolute inset-0 w-full h-full object-cover" 
          style={{opacity: 0.9}}
          loading="eager"
          fetchPriority="high"
        />
        <div className="hero-overlay" />
        <div className="hero-text container">
          <div className="eyebrow">LUXURY BRIDAL • HERITAGE CRAFT • BESPOKE</div>
          <h1>Your Story, Our Silhouette</h1>
          <p className="hero-subheading">Heritage meets elegance in every stitch</p>
        </div>
        <div className="hero-ctas">
          <Link to="/collection" className="btn">Explore Our Designs</Link>
          <Link to="/contact" className="btn btn--consultation">Schedule Consultation</Link>
        </div>
        <p style={{position:'relative',zIndex:2,textAlign:'center',color:'rgba(255,255,255,0.85)',fontSize:'13px',letterSpacing:'1px',marginTop:'12px',fontWeight:500}}>
          Ensembles from ₹1,00,000 &nbsp;·&nbsp; 8–18 week lead time
        </p>
      </section>

      <section className="luxury-strip fade-in">
        <div className="container">
          <div className="luxury-grid">
            <div className="luxury-item">
              <div className="luxury-icon">✨</div>
              <h3>Signature Heritage</h3>
              <p>Master artisans from Old Delhi bringing techniques passed through generations</p>
            </div>
            <div className="luxury-item">
              <div className="luxury-icon">👗</div>
              <h3>Fully Bespoke</h3>
              <p>Your vision crafted into reality through intimate consultations & fittings</p>
            </div>
            <div className="luxury-item">
              <div className="luxury-icon">💎</div>
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
              icon:'👰'
            },{
              title:'Design',
              desc:'Our studio sketches concepts and refines silhouettes with you.',
              icon:'✏️'
            },{
              title:'Fabric',
              desc:'Choose from curated fabrics selected for drape, comfort and heritage.',
              icon:'🧵'
            },{
              title:'Embroidery',
              desc:'Artisans bring motifs to life with handwork and subtle embellishment.',
              icon:'✨'
            },{
              title:'Final Fitting',
              desc:'A final fitting ensures perfect drape and comfort before collection.',
              icon:'👗'
            }].map((s, i) => (
              <div className="journey-step" key={s.title}>
                <div className="step-circle">{s.icon}</div>
                <div className="step-content">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bride Stories - Modern Cards */}
      <section className="testimonials-modern fade-in">
        <div className="container">
          <div className="section-header-modern">
            <h2 className="section-title-modern">Bride Stories</h2>
            <p className="section-subtitle-modern">Real moments, real joy — our brides share their Delhi Six Couture experience</p>
          </div>
          
          <div className="testimonials-modern-grid">
            {[
              {
                name: 'Ananya Malhotra',
                role: 'Wedding • December 2025',
                quote: 'The entire experience was magical. From understanding my vision to the final draping, every moment was thoughtful and personal.'
              },
              {
                name: 'Priya Singh',
                role: 'Wedding • October 2025',
                quote: 'I felt like royalty the moment I wore my ensemble. The craftsmanship is exceptional, and the fit was absolutely perfect.'
              },
              {
                name: 'Simran Kapoor',
                role: 'Wedding • November 2025',
                quote: 'Worth every moment of planning. My Delhi Six Couture ensemble made me feel confident, beautiful, and celebrated on my big day.'
              }
            ].map((t, i) => (
              <div key={i} className="testimonial-modern-card">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-divider"></div>
                <div className="testimonial-info" style={{textAlign: 'left'}}>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-meta">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About/Founder Section - Modern */}
      <section className="about-modern fade-in">
        <div className="container">
          <div className="about-modern-grid">
            <div className="about-modern-image">
              <img 
                src="/images/handworkImage/handwork.jpeg" 
                alt="Handcrafted artisan work" 
                className="about-main-image"
                loading="lazy"
              />
              <div className="about-image-accent"></div>
            </div>
            
            <div className="about-modern-content">
              <div className="about-label">OUR STORY</div>
              <h2 className="about-modern-title">About Us</h2>
              <p className="about-modern-para">
                Delhi Six Couture is rooted in heritage — we celebrate Old Delhi's craft through refined silhouettes and thoughtful detailing. Each ensemble is designed for lasting wear and meaningful moments.
              </p>
              <p className="about-modern-para">
                Our process blends time-honoured techniques with modern tailoring, working closely with artisans to honour lineage while creating contemporary fits.
              </p>
              
              <div className="founder-modern-card">
                <img 
                  src="/images/bhavyaGoel/bhavyaGoel.JPG" 
                  alt="Bhavya Goel" 
                  className="founder-modern-photo"
                  loading="lazy"
                />
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
        <div className="collection-grid" style={designs.length < 6 ? {gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: '800px', margin: '0 auto'} : {}}>
          {designs.map(item => (
            <Link key={item} to={`/collection/${item}`} className="collection-link">
              <article className="collection-card">
                <div className="card-image-wrap">
                  {TRENDING_IDS.includes(item) && <div className="trending-badge">🔥 Trending</div>}
                  <img
                    src={designImages[item] ? designImages[item][0] : `https://via.placeholder.com/900x1200?text=Design+${item}`}
                    alt={`Design ${item}`}
                    className="collection-image"
                    loading="lazy"
                  />
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
        
        {/* Pagination Controls */}
        <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem', alignItems: 'center'}}>
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))} 
            disabled={page === 1}
            className="btn btn--secondary"
            style={{opacity: page === 1 ? 0.5 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer'}}
          >
            ← Previous
          </button>
          
          <div style={{display: 'flex', gap: '0.5rem'}}>
            {Array.from({length: totalPages}, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  padding: '0.5rem 0.8rem',
                  borderRadius: '6px',
                  border: p === page ? '2px solid var(--deep-red)' : '1px solid var(--golden)',
                  background: p === page ? 'var(--deep-red)' : 'transparent',
                  color: p === page ? 'white' : 'var(--deep-red)',
                  cursor: 'pointer',
                  fontWeight: p === page ? '600' : '500',
                  fontSize: '14px'
                }}
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
        
        <div style={{textAlign: 'center', marginTop: '1rem', fontSize: '14px', color: 'rgba(59,47,47,0.7)'}}>
          Page {page} of {totalPages} • Showing {startIdx + 1}-{Math.min(endIdx, totalDesigns)} of {totalDesigns} designs
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
        {/* Gallery Section */}
        <div className="details-gallery-section">
          <div className="gallery-container fade-in">
            <div className="main-image-wrapper">
              <img 
                src={thumbs[active]} 
                alt={`Design ${id} - view ${active+1}`} 
                className="main-gallery-image"
                onClick={() => setZoomImage(thumbs[active])}
                style={{cursor: 'pointer'}}
                loading="eager"
              />
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
          <div className="details-header">
            <div className="design-badge">RIVAYAT COLLECTION</div>
            <h1 className="design-title" style={{fontFamily: "'Playfair Display', serif", fontSize: '3.6rem', fontWeight: 600, letterSpacing: '0.5px', color: 'var(--deep-red)', marginBottom: '1.5rem', lineHeight: 1.2, fontStyle: 'normal', textShadow: '0 2px 8px rgba(139,106,69,0.12)', transition: 'all 0.3s ease'}}>
              {designNames[id] || "Rivayat Heritage Lehenga"}
            </h1>
          </div>

          <div className="description-block">
            <p className="design-description" style={{fontSize: '1.1rem', lineHeight: 1.8, fontWeight: 300, color: 'rgba(59,47,47,0.95)', maxWidth: '800px'}}>
              {description}
            </p>
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

          {/* Key Features */}
          <div className="features-block">
            <h3 className="features-title">Signature Details</h3>
            <ul className="features-list">
              <li><span className="feature-icon">✨</span> Handcrafted by master artisans from Old Delhi</li>
              <li><span className="feature-icon">🧵</span> Traditional zari and embroidery techniques</li>
              <li><span className="feature-icon">💎</span> Premium imported fabrics and embellishments</li>
              <li><span className="feature-icon">👗</span> Fully customizable to your preferences</li>
              <li><span className="feature-icon">📏</span> Made-to-measure with multiple fittings</li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="cta-section">
            <Link to="/contact" className="btn btn--primary">Schedule Your Consultation</Link>
            <p className="cta-subtext">Connect with our artisans to discuss this exclusive design and customization options</p>
            <Link to="/collection" className="btn btn--secondary" style={{marginTop: '1rem', display: 'inline-block', marginLeft: '1rem'}}>← Back to Collection</Link>
          </div>

          {/* Info Banner */}
          <div className="info-banner">
            <div className="banner-icon">💝</div>
            <div className="banner-content">
              <div className="banner-title">Your Perfect Bridal Moment</div>
              <div className="banner-text">Each ensemble is personally created through intimate consultations and multiple fittings, ensuring your vision comes to life with unmatched craftsmanship.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  useEffect(() => { document.title = 'Book a Consultation — Delhi Six Couture'; }, []);
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

      <div className="container contact-main">
        <div className="contact-grid">
          <div>
            <div className="contact-form" aria-labelledby="contact-form">
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name * {errors.name && <span style={{color: 'var(--deep-red)', fontSize: '12px'}}>{errors.name}</span>}</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input id="name" value={name} onChange={e=>{setName(e.target.value); if(errors.name) setErrors({...errors, name: ''});}} placeholder="Your name" required />
                </div>

                <label htmlFor="email">Email * {errors.email && <span style={{color: 'var(--deep-red)', fontSize: '12px'}}>{errors.email}</span>}</label>
                <div className="input-wrapper">
                  <span className="input-icon">✉️</span>
                  <input id="email" type="email" value={email} onChange={e=>{setEmail(e.target.value); if(errors.email) setErrors({...errors, email: ''});}} placeholder="you@domain.com" required />
                </div>

                <label htmlFor="weddingDate">Wedding Date * {errors.weddingDate && <span style={{color: 'var(--deep-red)', fontSize: '12px'}}>{errors.weddingDate}</span>}</label>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px'}}>
                  <div className="select-wrapper">
                    <span className="select-icon">📅</span>
                    <select id="weddingMonth" value={weddingMonth} onChange={e=>{setWeddingMonth(e.target.value); if(errors.weddingDate) setErrors({...errors, weddingDate: ''});}} required>
                      <option value="">Select Month</option>
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
                    <span className="select-icon">📆</span>
                    <select id="weddingYear" value={weddingYear} onChange={e=>{setWeddingYear(e.target.value); if(errors.weddingDate) setErrors({...errors, weddingDate: ''});}} required>
                      <option value="">Select Year</option>
                      {[2026, 2027, 2028, 2029, 2030, 2031].map(year => <option key={year} value={year}>{year}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{fontSize: '12px', color: 'rgba(59,47,47,0.65)', marginBottom: '24px', padding: '10px 12px', background: 'rgba(155,137,104,0.06)', borderRadius: '6px', lineHeight: '1.6'}}>💡 Typical lead time: 8-18 weeks depending on design complexity. Plan accordingly for your special day!</div>

                <label htmlFor="designType">Design Interest</label>
                <div className="select-wrapper">
                  <span className="select-icon">👗</span>
                  <select id="designType" value={designType} onChange={e=>setDesignType(e.target.value)}>
                    <option value="">Browse our collection</option>
                    {Object.entries(designNames).map(([id, name]) => (
                      <option key={id} value={name}>{name}</option>
                    ))}
                  </select>
                </div>

                <label htmlFor="budget">Budget Range</label>
                <div className="select-wrapper">
                  <span className="select-icon">💎</span>
                  <select id="budget" value={budget} onChange={e=>setBudget(e.target.value)}>
                    <option value="">Select your budget</option>
                    <option value="₹1L - ₹1.5L">₹1,00,000 - ₹1,50,000</option>
                    <option value="₹1.5L - ₹2.5L">₹1,50,000 - ₹2,50,000</option>
                    <option value="₹2.5L - ₹5L">₹2,50,000 - ₹5,00,000</option>
                    <option value="₹5L+">₹5,00,000+</option>
                  </select>
                </div>

                <label htmlFor="message">Tell us more about your vision</label>
                <div className="textarea-wrapper">
                  <span className="textarea-icon">💭</span>
                  <textarea id="message" value={message} onChange={e=>setMessage(e.target.value)} placeholder="Any specific ideas, colors, or inspirations?" />
                </div>

                <div className="form-ctas">
                  <button className="btn btn--primary" type="submit">Book My Free Consultation</button>
                  <a className="btn btn--whatsapp-form" href={`https://wa.me/917011764857?text=${encodeURIComponent('Hi, I would like to discuss my bridal ensemble for Delhi Six Couture')}`} target="_blank" rel="noopener noreferrer">💬 Quick Chat</a>
                </div>

                {submitted && <div className="form-success-message" style={{backgroundColor: '#d4edda', color: '#155724', padding: '12px 16px', borderRadius: '8px', marginTop: '1rem', border: '1px solid #c3e6cb'}}>✓ Thank you! Your enquiry has been sent to WhatsApp. Our artisans will connect within 24 hours to discuss your bespoke ensemble.</div>}
              </form>
            </div>
          </div>

          <aside className="contact-info">
            <div className="contact-info-header">
              <div className="info-icon">🏛️</div>
              <h3>Visit Our Studio</h3>
            </div>
            <p className="info-intro">Meet us in person at our Old Delhi studio for intimate consultations and exclusive fittings.</p>
            
            <div className="info-block">
              <div className="info-label">📍 Location</div>
              <a href="https://maps.app.goo.gl/Hxs6L6HFjrGm614Y6" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                <div className="info-value" style={{cursor: 'pointer', transition: 'all 0.3s ease', color: 'var(--deep-red)', fontWeight: '500'}}>Old Delhi Heritage District<br/>New Delhi, India</div>
              </a>
            </div>

            <div className="info-block">
              <div className="info-label">📞 Phone</div>
              <a href="tel:+917011764857" className="info-value" style={{textDecoration:'none',display:'block'}}>
                (+91) 70117 64857
              </a>
            </div>

            <div className="info-block">
              <div className="info-label">🕐 Hours</div>
              <div className="info-value">Monday – Saturday: 11 AM – 8:30 PM<br/>Sunday: By appointment</div>
            </div>

            <a className="whatsapp-banner" href="https://wa.me/917011764857" target="_blank" rel="noopener noreferrer">
              <div className="whatsapp-content">
                <div className="whatsapp-icon">💬</div>
                <div>
                  <div className="whatsapp-label">Quick Connection</div>
                  <div className="whatsapp-text">Message on WhatsApp</div>
                </div>
              </div>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

function NotFoundPage() {
  useEffect(() => { document.title = 'Page Not Found — Delhi Six Couture'; }, []);
  return (
    <section style={{textAlign: 'center', padding: '6rem 1rem'}}>
      <h1 style={{fontFamily: "'Playfair Display', serif", color: 'var(--deep-red)'}}>Page Not Found</h1>
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
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/collection/:id" element={<DesignDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

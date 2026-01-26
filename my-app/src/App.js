// App.js
import React, { useState } from "react";
import './styles.css'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import Nav from './components/Nav'
import Footer from './components/Footer'
import Button from './components/Button'

const designImages = {
  1: [
    '/images/design1/main.jpg',
    '/images/design1/thumbnail1.jpg',
    '/images/design1/thumbnail2.jpg',
    '/images/design1/thumbnail3.jpg',
    '/images/design1/thumbnail4.jpg'
  ],
  2: [
    '/images/design2/main.jpg',
    '/images/design2/thumbnail1.jpg',
    '/images/design2/thumbnail2.jpg',
    '/images/design2/thumbnail3.jpg',
    '/images/design2/thumbnail4.jpg'
  ],
  3: [
    '/images/design3/main.jpg',
    '/images/design3/thumbnail1.jpg',
    '/images/design3/thumbnail2.jpg',
    '/images/design3/thumbnail3.jpg',
    '/images/design3/thumbnail4.jpg'
  ],
  4: [
    '/images/design4/main.jpg',
    '/images/design4/thumbnail1.jpg',
    '/images/design4/thumbnail2.jpg',
    '/images/design4/thumbnail3.jpg',
    '/images/design4/thumbnail4.jpg'
  ],
  5: [
    '/images/design5/main.jpg',
    '/images/design5/thumbnail1.jpg',
    '/images/design5/thumbnail2.jpg',
    '/images/design5/thumbnail3.jpg',
    '/images/design5/thumbnail4.jpg'
  ],
  6: [
    '/images/design6/main.jpg',
    '/images/design6/thumbnail1.jpg',
    '/images/design6/thumbnail2.jpg',
    '/images/design6/thumbnail3.jpg',
    '/images/design6/thumbnail4.jpg'
  ],
  7: [
    '/images/design7/main.jpg',
    '/images/design7/thumbnail1.jpg',
    '/images/design7/thumbnail2.jpg',
    '/images/design7/thumbnail3.jpg',
    '/images/design7/thumbnail4.jpg'
  ],
  8: [
    '/images/design8/main.jpg',
    '/images/design8/thumbnail1.jpg',
    '/images/design8/thumbnail2.jpg',
    '/images/design8/thumbnail3.jpg',
    '/images/design8/thumbnail4.jpg'
  ],
  9: [
    '/images/design9/main.jpg',
    '/images/design9/thumbnail1.jpg',
    '/images/design9/thumbnail2.jpg',
    '/images/design9/thumbnail3.jpg',
    '/images/design9/thumbnail4.jpg'
  ],
  10: [
    '/images/design10/main.jpg',
    '/images/design10/thumbnail1.jpg',
    '/images/design10/thumbnail2.jpg',
    '/images/design10/thumbnail3.jpg',
    '/images/design10/thumbnail4.jpg'
  ]
};

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
  return (
    <>
      <section className="hero fade-in">
        <img src="/images/design3/main.jpg" alt="Luxury bridal elegance" className="absolute inset-0 w-full h-full object-cover" style={{opacity: 0.9}} />
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
              <img src="/images/handworkImage/handwork.jpeg" alt="Handcrafted artisan work" className="about-main-image" />
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
                <img src="/images/bhavyaGoel/bhavyaGoel.JPG" alt="Bhavya Goel" className="founder-modern-photo" />
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
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const totalDesigns = 10;
  const totalPages = Math.ceil(totalDesigns / itemsPerPage);
  
  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const designs = Array.from({length: totalDesigns}, (_, i) => i + 1).slice(startIdx, endIdx);
  
  const designNames = {
    1: "Royal Peacock Ensemble",
    2: "Artisan's Choice Lehenga",
    3: "Maharaja's Garden Lehenga",
    4: "Golden Palace Lehenga",
    5: "Crafted Harmony Lehenga",
    6: "Signature Queen's Collection",
    7: "Timeless Grace Lehenga",
    8: "Jewel Tone Heritage",
    9: "Crimson Tapestry Duet",
    10: "Golden Splendor Ensemble"
  };
  
  const designTags = {
    1: ["Peacock", "Red Silk", "Zardozi"],
    2: ["Tissue Silk", "Zardozi & Zari", "Dual Embroidery"],
    3: ["Red Silk", "Heavy Gold Embroidery", "Nature Motifs"],
    4: ["Golden Theme", "Castle Motifs", "Dual Design"],
    5: ["Four Motifs", "Elephant & Birds", "Mixed Designs"],
    6: ["Heritage", "Signature", "Classic"],
    7: ["Vintage", "Romantic", "Blush"],
    8: ["Elegant", "Velvet Border", "Heritage"],
    9: ["Thread Work", "Dual Design", "Heavy Borders"],
    10: ["Contemporary", "Classic", "Subtle"]
  };
  
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
                  {(item === 3 || item === 5 || item === 10) && <div className="trending-badge">🔥 Trending</div>}
                  <img
                    src={designImages[item] ? designImages[item][0] : `https://via.placeholder.com/900x1200?text=Design+${item}`}
                    alt={`Design ${item}`}
                    className="collection-image"
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
          
          {page !== totalPages && (
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
              disabled={page === totalPages}
              className="btn btn--secondary"
              style={{opacity: page === totalPages ? 0.5 : 1, cursor: page === totalPages ? 'not-allowed' : 'pointer'}}
            >
              Next →
            </button>
          )}
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
  const [active, setActive] = React.useState(0);
  const [zoomImage, setZoomImage] = React.useState(null);
  // Get images for the specific design
  const thumbs = designImages[id] ? designImages[id] : designImages[1];
  
  const designNames = {
    1: "Royal Peacock Ensemble",
    2: "Artisan's Choice Lehenga",
    3: "Maharaja's Garden Lehenga",
    4: "Golden Palace Lehenga",
    5: "Crafted Harmony Lehenga",
    6: "Signature Queen's Collection",
    7: "Timeless Grace Lehenga",
    8: "Jewel Tone Heritage",
    9: "Crimson Tapestry Duet",
    10: "Golden Splendor Ensemble"
  };
  
  const descriptions = {
    1: "A stunning design featuring red silk with intricate peacock borders and delicate floral motives. Hand-embroidered with traditional zardozi embroidery that brings the design to life. Each stitch is carefully crafted to create a regal, sophisticated piece perfect for brides seeking a timeless, culturally rich ensemble.",
    2: "Crafted on premium tissue silk with exquisite zardozi and zari embroidery, this design seamlessly combines two stunning embroidery techniques. The lehenga features delicate running motifs flowing across the sides with a heavy embroidery design concentrated on the front and back panels. This masterpiece showcases the artisan's expertise in balancing intricate detailing with wearable elegance. Hand-embroidered by master artisans using traditional techniques, it's perfect for the bride seeking a sophisticated design with maximum visual impact and refined craftsmanship.",
    3: "A regal masterpiece adorned with luxurious red silk and our heaviest hand-embroidered gold embroidery. This design features exquisite palm tree and deer motifs artfully spaced throughout, creating visual drama and sophistication. Hand-stitched with traditional zardozi and zari techniques, every motif showcases meticulous craftsmanship. The matching dupatta is our most elaborate piece yet, fully embellished with the same intricate embroidery. Perfect for the bride seeking an unforgettable, statement-making ensemble with unparalleled opulence and heritage grandeur.",
    4: "A stunning masterpiece featuring premium tissue silk in a radiant golden theme. This exquisite design showcases two complementary embroidery patterns running simultaneously, with a sophisticated castle-inspired motif that creates a majestic, royal appearance. Hand-stitched with traditional zari techniques, each pattern flows beautifully to create a harmonious yet visually dramatic ensemble. Perfect for the bride seeking an elaborate, show-stopping look with heritage grandeur and modern sophistication.",
    5: "An exceptional masterpiece featuring four distinct and complementary embroidery designs seamlessly integrated into one magnificent ensemble. Crafted on premium silk, this design showcases: Majestic elephant motifs symbolizing grace and strength, palm tree motifs representing elegance and heritage, delicate bird motifs symbolizing freedom and beauty, and running geometrical designs creating visual rhythm and contemporary appeal. Each motif is hand-stitched with traditional zari and beadwork, flowing harmoniously across the lehenga to create a balanced yet visually stunning composition. The intricate layering of all four designs demonstrates exceptional artisanal skill and modern aesthetic sensibility. Perfect for the bride seeking a unique, multi-dimensional piece that celebrates diverse heritage elements in perfect harmony.",
    6: "A stunning evolution of our heritage collection featuring a perfect blend of traditional motifs with contemporary silhouette. Hand-stitched embroidery on premium silk creates an elegant statement piece. This design combines the best of our craftsmanship legacy in a versatile, wearable style that honors tradition while embracing modern bridal aesthetics.",
    7: "Inspired by timeless elegance, this design features delicate vintage embroidery patterns on Premium Silk. Hand-stitched motifs create a romantic aesthetic with subtle sophistication. Perfect for brides seeking a graceful, nostalgic style with modern comfort and refined craftsmanship.",
    8: "A magnificent masterpiece meticulously embroidered by our finest craftsmen on premium tissue silk fabric. This design features exquisite oxidized zardozi embroidery that creates a sophisticated, jewel-tone aesthetic with luminous depth. The velvet-touch border detailing adds elegant highlighting and dimension throughout, creating a luxurious showcase of refined artisanal craftsmanship. Perfect for the bride seeking opulent, handcrafted elegance with unparalleled detail and heritage finesse.",
    9: "An exquisite thread work lehenga masterpiece showcasing two distinct embroidery designs running simultaneously across the ensemble. Crafted on premium silk fabric, this design features intricate thread embroidery with meticulous detailing that captures the essence of traditional craftsmanship. The highlight of this piece is the dupatta with its magnificent heavy borders adorned with elaborate embroidery work, creating a striking visual statement. The dual design patterns flow harmoniously, demonstrating exceptional artisanal expertise. Perfect for the bride seeking a sophisticated, multi-layered design with rich textural depth and heritage elegance.",
    10: "A timeless masterpiece celebrating vertical traditional aesthetics with exquisite golden zardozi embroidery on premium silk fabric. This design features elaborate hand-stitched embroidery flowing vertically across the lehenga, creating elegant lines that elongate the silhouette with grace and sophistication. The golden zardozi work showcases traditional motifs arranged in a vertical pattern, reflecting authentic heritage craftsmanship. The dupatta and blouse complement the ensemble with coordinated embroidery details. Perfect for the bride seeking a classic, vertically-inspired traditional look with premium quality and timeless elegance."
  };
  
  const description = descriptions[id] || "A handcrafted bridal ensemble with intricate embroidery and heritage detailing.";
  
  const details = {
    1: {
      occasion: "Wedding • Bridal",
      material: "Premium Silk",
      embroidery: "Hand-stitched Zardozi Embroidery & Floral Motives",
      care: "Dry clean only",
      included: "Lehenga, Dupatta, Blouse",
      timeToCreate: "8-10 weeks"
    },
    2: {
      occasion: "Wedding • Bridal",
      material: "Premium Tissue Silk",
      embroidery: "Hand-stitched Zardozi & Zari (Running Motifs + Heavy Embroidery)",
      care: "Dry clean only",
      included: "Lehenga, Dupatta, Blouse",
      timeToCreate: "10-14 weeks"
    },
    3: {
      occasion: "Wedding • Bridal",
      material: "Premium Red Silk, Gold Zari & Zardozi",
      embroidery: "Hand-stitched Gold Embroidery (Palm Trees & Deer Motifs)",
      care: "Dry clean only",
      included: "Lehenga, Heavy Embroidered Dupatta, Blouse",
      timeToCreate: "8-10 weeks"
    },
    4: {
      occasion: "Wedding • Bridal",
      material: "Premium Tissue Silk, Gold Zari & Zardozi",
      embroidery: "Hand-stitched Dual Design Embroidery (Castle Motifs)",
      care: "Dry clean only",
      included: "Lehenga, Dupatta, Blouse",
      timeToCreate: "10-14 weeks"
    },
    5: {
      occasion: "Wedding • Bridal",
      material: "Premium Silk, Gold Zari, Pearls, Beads",
      embroidery: "Hand-stitched Four Motif Design (Elephant, Palm Trees, Birds, Geometrical)",
      care: "Dry clean only",
      included: "Lehenga, Dupatta, Blouse",
      timeToCreate: "14-18 weeks"
    },
    6: {
      occasion: "Wedding • Bridal",
      material: "Premium Organza Silk",
      embroidery: "Hand-stitched zardozi",
      care: "Dry clean only",
      included: "Lehenga, Dupatta, Blouse",
      timeToCreate: "9-13 weeks"
    },
    7: {
      occasion: "Wedding • Bridal",
      material: "Premium Silk",
      embroidery: "Hand-stitched Vintage Motifs",
      care: "Dry clean only",
      included: "Lehenga, Dupatta, Blouse",
      timeToCreate: "8-12 weeks"
    },
    8: {
      occasion: "Wedding • Bridal",
      material: "Premium Tissue Silk",
      embroidery: "Hand-stitched Oxidized Embroidery",
      care: "Dry clean only",
      included: "Lehenga, Dupatta, Blouse",
      timeToCreate: "10-14 weeks"
    },
    9: {
      occasion: "Wedding • Bridal",
      material: "Premium Silk, Thread Work Embroidery",
      embroidery: "Hand-stitched Dual Thread Work (Two Simultaneous Designs)",
      care: "Dry clean only",
      included: "Lehenga, Dupatta, Blouse",
      timeToCreate: "10-14 weeks"
    },
    10: {
      occasion: "Wedding • Bridal",
      material: "Premium Silk",
      embroidery: "Hand-stitched Golden Zardozi (Vertical Traditional Pattern)",
      care: "Dry clean only",
      included: "Lehenga, Dupatta, Blouse",
      timeToCreate: "9-12 weeks"
    }
  };
  
  const design = details[id] || details[1];

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
                  <img src={src} alt={`thumbnail-${i}`} />
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
              <img src={zoomImage} alt="Zoomed view" className="zoomed-image" />
              <div className="zoom-controls">Click anywhere to close • Scroll to zoom</div>
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
            <Link to="/contact" style={{display:'inline-block'}}>
              <Button className="btn--primary" href="https://wa.me/917011764857">Schedule Your Consultation</Button>
            </Link>
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [weddingMonth, setWeddingMonth] = useState('');
  const [weddingYear, setWeddingYear] = useState('');
  const [budget, setBudget] = useState('');
  const [designType, setDesignType] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const designNames = {
    1: "Royal Peacock Ensemble",
    2: "Artisan's Choice Lehenga",
    3: "Maharaja's Garden Lehenga",
    4: "Modern Minimalist Bridal",
    5: "Royal Opulence Lehenga",
    6: "Signature Queen's Collection",
    7: "Timeless Grace Lehenga",
    8: "Pearl Paradise Collection",
    9: "Crimson Tapestry Duet",
    10: "Golden Splendor Ensemble"
  };

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
                  <button className="btn btn--primary" type="submit">Send Enquiry</button>
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
              <div className="info-value">(+91) 70117 64857</div>
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

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/collection/:id" element={<DesignDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

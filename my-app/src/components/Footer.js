import React from 'react';

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container">
        <div style={{marginBottom:8}}>© 2026 Delhi Six Couture. All rights reserved.</div>
        <div style={{fontSize:13,opacity:0.9}}>Handcrafted bridal & pret ensembles inspired by Old Delhi</div>
      </div>

      <a
        href="https://wa.me/917011764857"
        target="_blank"
        rel="noopener noreferrer"
        className="float-action"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" width="22" height="22">
          <path d="M16.04 2C8.29 2 2 8.29 2 16.04c0 2.83.83 5.47 2.26 7.7L2 30l6.43-2.19a13.96 13.96 0 007.61 2.22h.01c7.75 0 14.04-6.29 14.04-14.04C30.09 8.29 23.8 2 16.04 2z" />
        </svg>
      </a>
    </footer>
  )
}

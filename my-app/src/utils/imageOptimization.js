/**
 * Image Optimization Utilities
 * Provides lazy loading, responsive images, and performance enhancements
 */

import React from 'react';

// Generate responsive image variants for different screen sizes
export const getResponsiveImageSrcSet = (imagePath) => {
  // Base path without extension
  const pathWithoutExt = imagePath.replace(/\.[^.]+$/, '');
  const extension = imagePath.match(/\.[^.]+$/)?.[0] || '.jpg';
  
  return {
    srcSet: `
      ${pathWithoutExt}-small${extension} 480w,
      ${pathWithoutExt}-medium${extension} 768w,
      ${pathWithoutExt}${extension} 1200w
    `.trim(),
    sizes: '(max-width: 480px) 100vw, (max-width: 768px) 90vw, 80vw'
  };
};

// Optimized Image Component with Lazy Loading
export const OptimizedImage = ({
  src,
  alt,
  className = '',
  style = {},
  lazy = true,
  onLoad,
  sizes,
  srcSet,
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(!lazy);
  const [imageSrc, setImageSrc] = React.useState(lazy ? undefined : src);
  const imgRef = React.useRef();

  React.useEffect(() => {
    if (!lazy) return;

    const currentRef = imgRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageLoaded(true);
          setImageSrc(src);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '50px' }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [src, lazy]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={`${className} ${!imageLoaded ? 'loading' : 'loaded'}`}
      style={{
        ...style,
        opacity: imageLoaded ? 1 : 0.8,
        transition: 'opacity 0.3s ease-in-out'
      }}
      onLoad={(e) => {
        setImageLoaded(true);
        onLoad?.(e);
      }}
      loading={lazy ? 'lazy' : 'eager'}
      {...props}
    />
  );
};

// Convert image URL to modern format (WebP with fallback)
export const getModernImageFormat = (imagePath) => {
  const pathWithoutExt = imagePath.replace(/\.[^.]+$/, '');
  
  return {
    webp: `${pathWithoutExt}.webp`,
    fallback: imagePath
  };
};

// Get thumbnail size optimized for grid display
export const getThumbnailSrc = (imagePath) => {
  const pathWithoutExt = imagePath.replace(/\.[^.]+$/, '');
  const extension = imagePath.match(/\.[^.]+$/)?.[0] || '.jpg';
  return `${pathWithoutExt}-thumb${extension}`;
};

// Image placeholder (LQIP - Low Quality Image Placeholder)
export const generateBlurredPlaceholder = (color = '#d4a574') => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='${encodeURIComponent(color)}' width='100' height='100'/%3E%3C/svg%3E`;
};

// Preload critical images
export const preloadImage = (src) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
};

// Batch preload multiple images
export const preloadImages = (srcs) => {
  srcs.forEach(src => preloadImage(src));
};

export const imageOptimizationUtils = {
  getResponsiveImageSrcSet,
  OptimizedImage,
  getModernImageFormat,
  getThumbnailSrc,
  generateBlurredPlaceholder,
  preloadImage,
  preloadImages
};

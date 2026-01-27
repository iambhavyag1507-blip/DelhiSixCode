import React from 'react';

/**
 * ResponsiveImage - Production-ready image component
 * 
 * Automatically handles:
 * - WebP format with JPG fallback
 * - Responsive sizes (sm, md, lg variants)
 * - Lazy loading
 * - Proper srcset/sizes attributes
 * - Modern decoding
 * 
 * Usage:
 * <ResponsiveImage 
 *   src="/images/design1/main.jpg"
 *   alt="Design 1"
 *   sizes="(max-width: 640px) 100vw, 50vw"
 *   loading="lazy"
 * />
 */
export const ResponsiveImage = ({ 
  src, 
  alt, 
  className = '', 
  sizes = '100vw',
  loading = 'lazy',
  fetchPriority = 'auto',
  style = {},
  onLoad,
  ...props 
}) => {
  const pathWithoutExt = src.replace(/\.[^.]+$/, '');
  const extension = src.match(/\.[^.]+$/)?.[0] || '.jpg';

  return (
    <picture>
      {/* WebP sources - modern browsers use these */}
      <source
        srcSet={`
          ${pathWithoutExt}.webp 1x,
          ${pathWithoutExt}.webp 2x
        `}
        type="image/webp"
      />
      
      {/* Responsive JPEG sources with sizes */}
      <source
        srcSet={`
          ${pathWithoutExt}-sm${extension} 480w,
          ${pathWithoutExt}-md${extension} 768w,
          ${pathWithoutExt}${extension} 1200w
        `}
        sizes={sizes}
        type={`image/${extension.slice(1)}`}
      />
      
      {/* Fallback img tag for old browsers */}
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        style={style}
        onLoad={onLoad}
        {...props}
      />
    </picture>
  );
};

/**
 * HeroImage - Optimized hero section image
 * 
 * Optimized for:
 * - Eager loading (visible above fold)
 * - Highest priority fetching
 * - Full width responsive
 * 
 * Usage:
 * <HeroImage 
 *   src="/images/design3/main.jpg"
 *   alt="Hero"
 * />
 */
export const HeroImage = ({ src, alt, className = '', style = {} }) => {
  const pathWithoutExt = src.replace(/\.[^.]+$/, '');
  const extension = src.match(/\.[^.]+$/)?.[0] || '.jpg';

  return (
    <picture>
      <source
        srcSet={`
          ${pathWithoutExt}.webp 1x,
          ${pathWithoutExt}.webp 2x
        `}
        type="image/webp"
      />
      <source
        srcSet={`
          ${pathWithoutExt}-sm${extension} 480w,
          ${pathWithoutExt}-md${extension} 768w,
          ${pathWithoutExt}${extension} 1200w
        `}
        sizes="100vw"
        type={`image/${extension.slice(1)}`}
      />
      <img
        src={src}
        alt={alt}
        className={className}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        style={style}
      />
    </picture>
  );
};

/**
 * CollectionImage - Optimized for collection grid
 * 
 * Optimized for:
 * - Lazy loading (not visible initially)
 * - Grid layout (typically 1-3 columns)
 * - Thumbnail generation
 * 
 * Usage:
 * <CollectionImage 
 *   src="/images/design1/main.jpg"
 *   alt="Design 1"
 * />
 */
export const CollectionImage = ({ src, alt, className = '', style = {} }) => {
  const pathWithoutExt = src.replace(/\.[^.]+$/, '');
  const extension = src.match(/\.[^.]+$/)?.[0] || '.jpg';

  return (
    <picture>
      <source
        srcSet={`
          ${pathWithoutExt}.webp 1x,
          ${pathWithoutExt}.webp 2x
        `}
        type="image/webp"
      />
      <source
        srcSet={`
          ${pathWithoutExt}-sm${extension} 480w,
          ${pathWithoutExt}-md${extension} 768w,
          ${pathWithoutExt}${extension} 1200w
        `}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        type={`image/${extension.slice(1)}`}
      />
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
        style={style}
      />
    </picture>
  );
};

/**
 * ThumbnailImage - Optimized for thumbnail/avatar display
 * 
 * Optimized for:
 * - Small fixed sizes (64px-200px)
 * - Thumbnail variants (-thumb suffix)
 * 
 * Usage:
 * <ThumbnailImage 
 *   src="/images/design1/main.jpg"
 *   alt="Thumbnail"
 * />
 */
export const ThumbnailImage = ({ src, alt, className = '', size = 64, style = {} }) => {
  const pathWithoutExt = src.replace(/\.[^.]+$/, '');
  const extension = src.match(/\.[^.]+$/)?.[0] || '.jpg';

  return (
    <picture>
      <source
        srcSet={`
          ${pathWithoutExt}-thumb.webp 1x,
          ${pathWithoutExt}-thumb.webp 2x
        `}
        type="image/webp"
      />
      <source
        srcSet={`
          ${pathWithoutExt}-thumb${extension} 1x,
          ${pathWithoutExt}-thumb${extension} 2x
        `}
        type={`image/${extension.slice(1)}`}
      />
      <img
        src={`${pathWithoutExt}-thumb${extension}`}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
        width={size}
        height={size}
        style={{ ...style, display: 'block' }}
      />
    </picture>
  );
};

export default ResponsiveImage;

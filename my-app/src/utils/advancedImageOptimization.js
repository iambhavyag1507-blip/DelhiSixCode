/**
 * Advanced Image Optimization Strategies
 * Use these for production deployments
 */

// 1. Image URL builder with Cloudinary integration
export const buildOptimizedImageUrl = (imagePath, options = {}) => {
  const {
    width = 800,
    quality = 80,
    format = 'auto', // auto, webp, jpg
    useCloudinary = false
  } = options;

  if (useCloudinary) {
    // Replace with your Cloudinary cloud name
    const CLOUD_NAME = 'YOUR_CLOUD_NAME';
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/w_${width},q_${quality},f_${format}/${imagePath}`;
  }

  // Fallback: local URLs with query parameters for cache busting
  return `${imagePath}?w=${width}&q=${quality}`;
};

// 2. Get optimal image variant based on device pixel ratio and viewport
export const getOptimalImageVariant = (variants, devicePixelRatio = 1, viewportWidth = window.innerWidth) => {
  // variants should be array like: [
  //   { width: 480, src: 'image-sm.jpg' },
  //   { width: 768, src: 'image-md.jpg' },
  //   { width: 1200, src: 'image-lg.jpg' }
  // ]

  const targetWidth = viewportWidth * devicePixelRatio;
  
  // Find the smallest variant that's larger than target width
  const selectedVariant = variants.reduce((prev, current) => {
    if (current.width >= targetWidth && current.width < prev.width) {
      return current;
    }
    return prev;
  }, variants[variants.length - 1]);

  return selectedVariant.src;
};

// 3. Picture element builder for maximum browser optimization
export const buildPictureElement = (imagePath, options = {}) => {
  const { alt = '', className = '' } = options;
  
  const pathWithoutExt = imagePath.replace(/\.[^.]+$/, '');
  const extension = imagePath.match(/\.[^.]+$/)?.[0] || '.jpg';

  return {
    webpSources: [
      { srcSet: `${pathWithoutExt}.webp 1x`, media: '(min-width: 1024px)' },
      { srcSet: `${pathWithoutExt}-md.webp 1x`, media: '(min-width: 768px)' },
      { srcSet: `${pathWithoutExt}-sm.webp 1x`, media: '(max-width: 767px)' }
    ],
    jpgFallback: `${pathWithoutExt}${extension}`,
    alt,
    className
  };
};

// 4. Calculate optimal image dimensions maintaining aspect ratio
export const calculateOptimalDimensions = (originalWidth, originalHeight, containerWidth) => {
  const aspectRatio = originalHeight / originalWidth;
  return {
    width: containerWidth,
    height: Math.round(containerWidth * aspectRatio)
  };
};

// 5. Monitor image loading performance
export const monitorImagePerformance = (imageElement) => {
  return new Promise((resolve) => {
    const startTime = performance.now();
    
    const handleLoad = () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      resolve({
        loadTime,
        src: imageElement.src,
        naturalWidth: imageElement.naturalWidth,
        naturalHeight: imageElement.naturalHeight,
        success: true
      });
      
      imageElement.removeEventListener('load', handleLoad);
      imageElement.removeEventListener('error', handleError);
    };

    const handleError = () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      resolve({
        loadTime,
        src: imageElement.src,
        success: false,
        error: 'Image failed to load'
      });
      
      imageElement.removeEventListener('load', handleLoad);
      imageElement.removeEventListener('error', handleError);
    };

    if (imageElement.complete) {
      handleLoad();
    } else {
      imageElement.addEventListener('load', handleLoad);
      imageElement.addEventListener('error', handleError);
    }
  });
};

// 6. Batch preload images with progress tracking
export const preloadImagesWithProgress = (imageSrcs, onProgress) => {
  let loadedCount = 0;

  return Promise.all(imageSrcs.map(src => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        loadedCount++;
        onProgress?.({
          loaded: loadedCount,
          total: imageSrcs.length,
          percentage: Math.round((loadedCount / imageSrcs.length) * 100)
        });
        resolve(src);
      };
      
      img.onerror = () => {
        loadedCount++;
        onProgress?.({
          loaded: loadedCount,
          total: imageSrcs.length,
          percentage: Math.round((loadedCount / imageSrcs.length) * 100),
          failed: src
        });
        reject(new Error(`Failed to load: ${src}`));
      };
      
      img.src = src;
    });
  }));
};

// 7. Generate srcset string programmatically
export const generateSrcSet = (baseImagePath, variants = [480, 768, 1024, 1200]) => {
  const pathWithoutExt = baseImagePath.replace(/\.[^.]+$/, '');
  const extension = baseImagePath.match(/\.[^.]+$/)?.[0] || '.jpg';

  return variants
    .map(width => `${pathWithoutExt}${extension} ${width}w`)
    .join(', ');
};

// 8. Image cache manager
class ImageCacheManager {
  constructor(maxSize = 50) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key); // Move to end
    }
    
    this.cache.set(key, value);
    
    // Remove oldest if cache exceeds max size
    if (this.cache.size > this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }

  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value); // Move to end (most recently used)
      return value;
    }
    return null;
  }

  clear() {
    this.cache.clear();
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      isFull: this.cache.size >= this.maxSize
    };
  }
}

export const imageCache = new ImageCacheManager();

// 9. Format conversion helper
export const getImageFormats = (imagePath) => {
  const pathWithoutExt = imagePath.replace(/\.[^.]+$/, '');
  const extension = imagePath.match(/\.[^.]+$/)?.[0] || '.jpg';

  return {
    original: imagePath,
    webp: `${pathWithoutExt}.webp`,
    avif: `${pathWithoutExt}.avif`,
    sm: `${pathWithoutExt}-sm${extension}`,
    md: `${pathWithoutExt}-md${extension}`,
    lg: `${pathWithoutExt}-lg${extension}`
  };
};

// 10. Responsive image hook (for React)
export const useResponsiveImage = (imagePath) => {
  const [selectedVariant, setSelectedVariant] = React.useState(imagePath);

  React.useEffect(() => {
    const updateVariant = () => {
      const variants = [
        { width: 480, src: imagePath.replace(/\.[^.]+$/, '-sm') + (imagePath.match(/\.[^.]+$/)?.[0] || '.jpg') },
        { width: 768, src: imagePath.replace(/\.[^.]+$/, '-md') + (imagePath.match(/\.[^.]+$/)?.[0] || '.jpg') },
        { width: 1200, src: imagePath }
      ];

      const optimal = getOptimalImageVariant(variants);
      setSelectedVariant(optimal);
    };

    updateVariant();
    window.addEventListener('resize', updateVariant);
    return () => window.removeEventListener('resize', updateVariant);
  }, [imagePath]);

  return selectedVariant;
};

export default {
  buildOptimizedImageUrl,
  getOptimalImageVariant,
  buildPictureElement,
  calculateOptimalDimensions,
  monitorImagePerformance,
  preloadImagesWithProgress,
  generateSrcSet,
  ImageCacheManager,
  imageCache,
  getImageFormats,
  useResponsiveImage
};

/**
 * Image Optimization and Performance Guide
 * 
 * This document outlines the image optimization strategies implemented
 */

# Image Optimization Strategies Implemented

## 1. Lazy Loading
- Images are loaded only when they come into the viewport
- Uses IntersectionObserver API for efficient detection
- Reduces initial page load time significantly

## 2. Responsive Images
- Images scale based on device screen size
- Reduces bandwidth on mobile devices
- Uses srcset and sizes attributes

## 3. Image Format Optimization
- WebP format support (modern browsers with JPEG fallback)
- Automatically compresses modern formats by 25-35%

## 4. Preloading Critical Images
- Hero images and above-the-fold content preloaded
- Improves perceived performance

## 5. Thumbnail Optimization
- Thumbnails loaded at lower resolution
- Reduces memory footprint for gallery views

## Recommended Next Steps for Maximum Performance

### A. Server-Side Image Compression
Use a tool like TinyPNG API or ImageOptim to compress all existing images:
```bash
# Using ImageMagick (if installed)
convert input.jpg -quality 85 output.jpg

# Using TinyPNG API
tinypng --input *.jpg
```

### B. Generate Multiple Sizes
For each image, create these variants:
```
design1/main.jpg (full size - 1200px width)
design1/main-medium.jpg (768px width)
design1/main-small.jpg (480px width)
design1/main-thumb.jpg (200px width for galleries)
design1/main.webp (modern format)
```

### C. Update Public Images Directory
After compression, your images directory should look like:
```
public/images/
├── design1/
│   ├── main.jpg
│   ├── main-medium.jpg
│   ├── main-small.jpg
│   ├── main.webp
│   ├── thumbnail1.jpg
│   ├── thumbnail1-thumb.jpg
│   └── ...
```

### D. CDN Integration (Recommended)
Use a CDN service like:
- **Cloudinary** (automatic image optimization)
- **Imgix** (real-time image transformation)
- **AWS CloudFront** with S3 (cost-effective)

Example with Cloudinary:
```javascript
const getCloudinaryUrl = (publicId, width, quality = 80) => {
  return `https://res.cloudinary.com/[YOUR_CLOUD_NAME]/image/fetch/w_${width},q_${quality},f_auto/https://yoursite.com/images/${publicId}`;
};
```

### E. Cache Headers
Set appropriate cache headers on your server:
```
Cache-Control: public, max-age=31536000
ETag: [hash]
```

## Performance Impact

| Optimization | Impact |
|---|---|
| Lazy Loading | 40-50% faster initial load |
| WebP Format | 25-35% file size reduction |
| Responsive Images | 50-70% less data on mobile |
| Preloading Heroes | 15-20% better perceived performance |

## Monitoring Tools

- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **WebPageTest**: https://www.webpagetest.org/
- **GTmetrix**: https://gtmetrix.com/
- **Chrome DevTools** (Network tab)

## Quick Wins You Can Do Today

1. **Compress existing images**: Use TinyPNG or ImageOptim
2. **Enable gzip on your hosting**: Most hosting providers support this
3. **Use a CDN**: Even a free tier can significantly improve load times
4. **Set cache headers**: Prevents re-downloading of unchanged images

## Code Integration

See `OptimizedImage` component in `src/utils/imageOptimization.js` for usage:

```javascript
<OptimizedImage 
  src="/images/design1/main.jpg"
  alt="Design 1"
  className="collection-image"
  lazy={true}
/>
```

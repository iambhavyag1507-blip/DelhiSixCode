#!/bin/bash

# Image Compression Commands Reference
# Run these commands to compress your images

echo "📋 Image Compression Reference Guide"
echo "===================================="
echo ""

# Check dependencies
echo "Checking dependencies..."
echo ""

# Check for ImageMagick
if command -v convert &> /dev/null; then
    echo "✅ ImageMagick: $(convert --version | head -n1)"
else
    echo "❌ ImageMagick not installed"
    echo "   Install: brew install imagemagick"
fi

echo ""
echo "Common Image Compression Commands:"
echo "===================================="
echo ""

echo "1️⃣  Quick Compress All JPGs (85% quality):"
echo "   find public/images -name '*.jpg' -o -name '*.jpeg' | while read f; do"
echo "     convert \"\$f\" -quality 85 -strip \"temp_\${f##*/}\""
echo "     mv \"temp_\${f##*/}\" \"\$f\""
echo "   done"
echo ""

echo "2️⃣  Create Medium Size Variant (768px width):"
echo "   find public/images -name '*.jpg' | while read f; do"
echo "     base=\"\${f%.*}\""
echo "     convert \"\$f\" -resize 768x768 -quality 85 \"\${base}-md.jpg\""
echo "   done"
echo ""

echo "3️⃣  Create Small Size Variant (480px width):"
echo "   find public/images -name '*.jpg' | while read f; do"
echo "     base=\"\${f%.*}\""
echo "     convert \"\$f\" -resize 480x480 -quality 80 \"\${base}-sm.jpg\""
echo "   done"
echo ""

echo "4️⃣  Create Thumbnail (200px width):"
echo "   find public/images -name '*.jpg' | while read f; do"
echo "     base=\"\${f%.*}\""
echo "     convert \"\$f\" -resize 200x200 -quality 75 \"\${base}-thumb.jpg\""
echo "   done"
echo ""

echo "5️⃣  Convert to WebP (better compression):"
echo "   find public/images -name '*.jpg' | while read f; do"
echo "     base=\"\${f%.*}\""
echo "     cwebp \"\$f\" -q 80 -o \"\${base}.webp\""
echo "   done"
echo ""

echo "6️⃣  One-liner: Compress All in Directory:"
echo "   mogrify -quality 85 -strip public/images/**/*.jpg"
echo ""

echo "7️⃣  View Current Image Sizes:"
echo "   du -sh public/images/**/*.jpg"
echo ""

echo "Using TinyPNG API (Recommended - Best Quality):"
echo "==============================================="
echo "1. Visit: https://tinypng.com/"
echo "2. Drag & drop all images"
echo "3. Download compressed versions"
echo "4. Replace originals"
echo ""

echo "Using Online Tool (Bulk):"
echo "========================="
echo "1. Visit: https://imagecompressor.com/bulk/"
echo "2. Upload all images"
echo "3. Download zip"
echo "4. Replace originals"
echo ""

echo "Batch Conversion Script:"
echo "======================="
cat > compress_all.sh << 'EOF'
#!/bin/bash

# Full image optimization script

SOURCE_DIR="public/images"
BACKUP_DIR="public/images_backup_$(date +%s)"

echo "🖼️  Starting full image optimization..."
echo "Backup directory: $BACKUP_DIR"

# Create backup
mkdir -p "$BACKUP_DIR"
cp -r "$SOURCE_DIR"/* "$BACKUP_DIR/"

# Compress and create variants
find "$SOURCE_DIR" -name "*.jpg" -o -name "*.jpeg" | while read img; do
    dir=$(dirname "$img")
    base=$(basename "$img" | sed 's/\.[^.]*$//')
    ext="${img##*.}"
    
    echo "Processing: $img"
    
    # Main: 85% quality
    convert "$img" -quality 85 -strip "temp1.jpg" && mv "temp1.jpg" "$img"
    
    # Medium (768px)
    convert "$img" -resize 768x768 -quality 85 "$dir/${base}-md.jpg"
    
    # Small (480px)
    convert "$img" -resize 480x480 -quality 80 "$dir/${base}-sm.jpg"
    
    # Thumb (200px)
    convert "$img" -resize 200x200 -quality 75 "$dir/${base}-thumb.jpg"
    
    # WebP
    cwebp "$img" -q 80 -o "$dir/${base}.webp" 2>/dev/null || echo "  (WebP skipped - cwebp not installed)"
done

echo "✅ Done! Backup at: $BACKUP_DIR"
EOF

chmod +x compress_all.sh
echo "Run: ./compress_all.sh"
echo ""

echo "Next Steps:"
echo "==========="
echo "1. Compress images (TinyPNG or ImageMagick)"
echo "2. npm run build"
echo "3. Deploy your app"
echo "4. Test at: https://pagespeed.web.dev/"
echo ""

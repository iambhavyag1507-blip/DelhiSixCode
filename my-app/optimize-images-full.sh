#!/bin/bash

################################################################################
# Image Optimization Script for Delhi Six Couture
# 
# Creates responsive image variants and compresses all images
# Required: ImageMagick (brew install imagemagick)
# 
# Usage: chmod +x optimize-images-full.sh && ./optimize-images-full.sh
################################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
QUALITY_ORIGINAL=82
QUALITY_MD=82
QUALITY_SM=80
QUALITY_THUMB=75
QUALITY_WEBP=80

echo -e "${BLUE}=================================================================================${NC}"
echo -e "${BLUE}Delhi Six Couture - Image Optimization Script${NC}"
echo -e "${BLUE}=================================================================================${NC}"
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo -e "${RED}ERROR: ImageMagick not found!${NC}"
    echo "Install it with: brew install imagemagick"
    exit 1
fi

echo -e "${YELLOW}Starting image optimization...${NC}"
echo ""

# Function to process a directory
process_directory() {
    local dir=$1
    local dir_name=$(basename "$dir")
    
    if [ ! -d "$dir" ]; then
        echo -e "${YELLOW}⚠ Skipping $dir_name (directory not found)${NC}"
        return
    fi
    
    echo -e "${BLUE}Processing: $dir_name${NC}"
    local image_count=0
    local total_before=0
    local total_after=0
    
    cd "$dir"
    
    for img in *.jpg *.jpeg *.JPG *.JPEG 2>/dev/null || true; do
        [ -f "$img" ] || continue
        
        image_count=$((image_count + 1))
        base="${img%.*}"
        ext="${img##*.}"
        ext_lower=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
        
        # Get original size
        original_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        total_before=$((total_before + original_size))
        
        echo -e "${GREEN}  ✓${NC} Processing: $img"
        
        # 1. Compress original image
        convert "$img" \
            -quality $QUALITY_ORIGINAL \
            -strip \
            -interlace Plane \
            "temp_original.$ext_lower"
        mv "temp_original.$ext_lower" "$img"
        
        # 2. Create medium variant (768px)
        convert "$img" \
            -resize 768x768 \
            -quality $QUALITY_MD \
            -strip \
            -interlace Plane \
            "${base}-md.$ext_lower"
        
        # 3. Create small variant (480px)
        convert "$img" \
            -resize 480x480 \
            -quality $QUALITY_SM \
            -strip \
            -interlace Plane \
            "${base}-sm.$ext_lower"
        
        # 4. Create thumbnail (200px)
        convert "$img" \
            -resize 200x200 \
            -quality $QUALITY_THUMB \
            -strip \
            -interlace Plane \
            "${base}-thumb.$ext_lower"
        
        # 5. Create WebP versions
        convert "$img" \
            -quality $QUALITY_WEBP \
            "${base}.webp"
        
        convert "${base}-md.$ext_lower" \
            -quality $QUALITY_WEBP \
            "${base}-md.webp"
        
        convert "${base}-sm.$ext_lower" \
            -quality $QUALITY_WEBP \
            "${base}-sm.webp"
        
        convert "${base}-thumb.$ext_lower" \
            -quality $QUALITY_WEBP \
            "${base}-thumb.webp"
        
        # Calculate final size
        final_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        total_after=$((total_after + final_size))
        reduction=$((100 - (final_size * 100 / original_size)))
        
        echo -e "    Size: $(numfmt --to=iec-i --suffix=B $original_size 2>/dev/null || echo "${original_size} bytes") → $(numfmt --to=iec-i --suffix=B $final_size 2>/dev/null || echo "${final_size} bytes") (${reduction}% reduction)"
    done
    
    cd - > /dev/null
    
    if [ $image_count -gt 0 ]; then
        total_reduction=$((100 - (total_after * 100 / total_before)))
        echo -e "${GREEN}  ✓ Directory complete: $image_count images processed${NC}"
        echo -e "    Total size reduction: ${total_reduction}%"
    else
        echo -e "${YELLOW}  ⚠ No images found in $dir_name${NC}"
    fi
    echo ""
}

# Process all image directories
BASE_DIR="public/images"

if [ ! -d "$BASE_DIR" ]; then
    echo -e "${RED}ERROR: $BASE_DIR not found!${NC}"
    exit 1
fi

# Process design folders
for i in {1..10}; do
    process_directory "$BASE_DIR/design$i"
done

# Process other image directories
process_directory "$BASE_DIR/bhavyaGoel"
process_directory "$BASE_DIR/handworkImage"
process_directory "$BASE_DIR/homePage"
process_directory "$BASE_DIR/logo"

echo -e "${BLUE}=================================================================================${NC}"
echo -e "${GREEN}✓ Image optimization complete!${NC}"
echo -e "${BLUE}=================================================================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Verify the generated images look good in your browser"
echo "2. Test responsive behavior: resize browser window"
echo "3. Check Network tab in DevTools for image sizes"
echo "4. Update App.js to use ResponsiveImage component"
echo "5. Deploy to production"
echo ""
echo -e "${YELLOW}Generated variants:${NC}"
echo "  • {name}-sm.jpg (480px, for mobile)"
echo "  • {name}-md.jpg (768px, for tablets)"
echo "  • {name}.jpg (1200px, for desktop)"
echo "  • {name}-thumb.jpg (200px, for thumbnails)"
echo "  • {name}.webp (modern format)"
echo "  • {name}-md.webp, {name}-sm.webp, {name}-thumb.webp"
echo ""
echo -e "${YELLOW}Use in your React components:${NC}"
echo "  import { ResponsiveImage } from './components/OptimizedImg';"
echo "  <ResponsiveImage src=\"/images/design1/main.jpg\" alt=\"Design 1\" />"
echo ""

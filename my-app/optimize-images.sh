#!/bin/bash

# Image Optimization Script
# This script compresses all images in the public/images directory
# Requirements: ImageMagick (brew install imagemagick)

set -e

echo "🖼️ Starting Image Optimization..."
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo -e "${RED}❌ ImageMagick not found${NC}"
    echo "Install it with: brew install imagemagick"
    exit 1
fi

# Set directories
SOURCE_DIR="public/images"
BACKUP_DIR="public/images_backup_$(date +%s)"

if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${RED}❌ Images directory not found: $SOURCE_DIR${NC}"
    exit 1
fi

# Create backup
echo -e "${YELLOW}📦 Creating backup...${NC}"
cp -r "$SOURCE_DIR" "$BACKUP_DIR"
echo -e "${GREEN}✅ Backup created: $BACKUP_DIR${NC}"
echo ""

# Statistics
total_before=0
total_after=0
files_processed=0

# Process all image directories
for dir in "$SOURCE_DIR"/*/; do
    if [ ! -d "$dir" ]; then
        continue
    fi
    
    echo -e "${YELLOW}Processing: $(basename "$dir")${NC}"
    
    # Process JPG files
    for img in "$dir"*.jpg "$dir"*.JPG "$dir"*.jpeg "$dir"*.JPEG 2>/dev/null; do
        if [ -f "$img" ]; then
            # Get file size before
            size_before=$(du -k "$img" | cut -f1)
            total_before=$((total_before + size_before))
            
            # Create optimized version
            base="${img%.*}"
            ext="${img##*.}"
            
            echo -n "  • Optimizing $(basename "$img")..."
            
            # Main optimization (85% quality)
            convert "$img" -quality 85 -strip "temp_opt.${ext}"
            mv "temp_opt.${ext}" "$img"
            
            # Get file size after
            size_after=$(du -k "$img" | cut -f1)
            total_after=$((total_after + size_after))
            files_processed=$((files_processed + 1))
            
            # Calculate reduction
            if [ $size_before -gt 0 ]; then
                reduction=$(( (size_before - size_after) * 100 / size_before ))
                echo -e " ${GREEN}✅ -${reduction}%${NC}"
            else
                echo -e " ${GREEN}✅${NC}"
            fi
        fi
    done
done

echo ""
echo "================================"
echo -e "${GREEN}✅ Optimization Complete!${NC}"
echo "================================"
echo -e "Files processed: ${GREEN}$files_processed${NC}"
echo -e "Size before: ${YELLOW}${total_before}KB${NC}"
echo -e "Size after: ${GREEN}${total_after}KB${NC}"
if [ $total_before -gt 0 ]; then
    total_reduction=$(( (total_before - total_after) * 100 / total_before ))
    echo -e "Total reduction: ${GREEN}${total_reduction}%${NC}"
fi
echo ""
echo -e "${YELLOW}💾 Backup stored at: $BACKUP_DIR${NC}"
echo -e "${YELLOW}⚠️  If anything went wrong, run:${NC}"
echo -e "   ${RED}rm -rf $SOURCE_DIR && mv $BACKUP_DIR $SOURCE_DIR${NC}"
echo ""
echo -e "${GREEN}🚀 Ready to rebuild your app!${NC}"
echo "   Run: npm run build"

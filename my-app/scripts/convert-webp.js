const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (/\.(jpg|jpeg)$/i.test(entry.name)) {
      const webpPath = fullPath.replace(/\.(jpg|jpeg)$/i, '.webp');
      if (!fs.existsSync(webpPath)) {
        sharp(fullPath)
          .webp({ quality: 82 })
          .toFile(webpPath)
          .then(() => console.log(`✓ ${path.relative(IMAGES_DIR, webpPath)}`))
          .catch(err => console.error(`✗ ${entry.name}:`, err.message));
      } else {
        console.log(`skip (exists): ${path.relative(IMAGES_DIR, webpPath)}`);
      }
    }
  }
}

console.log('Converting images to WebP...');
walkDir(IMAGES_DIR);

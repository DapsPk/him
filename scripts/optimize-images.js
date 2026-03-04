const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Path to your images
const imagesDir = path.join(__dirname, '../public/images');

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...');
  
  // Find all images
  const files = fs.readdirSync(imagesDir);
  
  for (const file of files) {
    // Check if it's an image file
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputPath = path.join(imagesDir, file);
      const outputPath = path.join(imagesDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
      
      console.log(`Converting: ${file} → ${path.basename(outputPath)}`);
      
      // Convert to WebP with 80% quality
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      // Get file sizes
      const originalSize = (fs.statSync(inputPath).size / 1024 / 1024).toFixed(2);
      const newSize = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2);
      
      console.log(`✅ Done! ${originalSize}MB → ${newSize}MB (${Math.round((1 - newSize/originalSize)*100)}% smaller)`);
    }
  }
  
  console.log('🎉 All images optimized!');
}

optimizeImages();
import sharp from 'sharp';
import { readdirSync, statSync, mkdirSync } from 'fs';
import { join } from 'path';

const SRC = 'D:/github/ngn_board/aurum_reviews/아우름웰니스 행사B2B';
const DST = 'D:/github/ngn_board/aurum_site/public/images/portfolio';

// Recursively find all image files
function findImages(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findImages(full));
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      results.push(full.replace(/\\/g, '/'));
    }
  }
  return results;
}

const files = findImages(SRC).sort();
console.log(`Found ${files.length} images. Copying + resizing...`);

mkdirSync(DST, { recursive: true });

const BATCH = 30;
let done = 0;
let errors = 0;

for (let i = 0; i < files.length; i += BATCH) {
  const batch = files.slice(i, i + BATCH);
  await Promise.all(batch.map(async (src, j) => {
    const idx = i + j + 1;
    const dst = join(DST, `p${String(idx).padStart(4, '0')}.jpg`);
    try {
      await sharp(src)
        .resize(200, 150, { fit: 'cover' })
        .jpeg({ quality: 50 })
        .toFile(dst);
    } catch (e) {
      // Try with failOnError: false for corrupted images
      try {
        await sharp(src, { failOnError: false })
          .resize(200, 150, { fit: 'cover' })
          .jpeg({ quality: 50 })
          .toFile(dst);
      } catch (e2) {
        errors++;
      }
    }
    done++;
  }));
  if (done % 500 === 0 || done === files.length) {
    console.log(`  ${done}/${files.length} (${errors} errors)`);
  }
}

console.log(`Done! ${done - errors} images copied, ${errors} errors.`);

import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'fs';
import { join } from 'path';

const SRC = 'D:/github/ngn_board/aurum_reviews/아우름웰니스 행사B2B';
const DST = 'D:/github/ngn_board/aurum_site/public/images/portfolio/featured';

// Featured image indices (1-based)
const FEATURED = [900, 520, 1080, 956, 975, 1012, 1280, 82, 3540, 3270, 3320, 2892];

function findImages(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findImages(full));
    else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) results.push(full.replace(/\\/g, '/'));
  }
  return results;
}

const files = findImages(SRC).sort();
console.log(`Total source images: ${files.length}`);

mkdirSync(DST, { recursive: true });

for (const idx of FEATURED) {
  const src = files[idx - 1];
  const dst = join(DST, `p${String(idx).padStart(4, '0')}.jpg`);
  console.log(`p${String(idx).padStart(4, '0')} <- ${src.split('/').slice(-2).join('/')}`);
  try {
    await sharp(src)
      .resize(800, 600, { fit: 'cover' })
      .jpeg({ quality: 85 })
      .toFile(dst);
  } catch (e) {
    await sharp(src, { failOnError: false })
      .resize(800, 600, { fit: 'cover' })
      .jpeg({ quality: 85 })
      .toFile(dst);
  }
}
console.log('Done! 12 featured images exported at 800x600 q85');

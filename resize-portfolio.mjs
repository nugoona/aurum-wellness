import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const dir = 'public/images/portfolio';
const files = (await readdir(dir)).filter(f => f.endsWith('.jpg'));

console.log(`Resizing ${files.length} images...`);

// Process in batches of 20
const BATCH = 20;
let done = 0;

for (let i = 0; i < files.length; i += BATCH) {
  const batch = files.slice(i, i + BATCH);
  await Promise.all(batch.map(async (file) => {
    const path = join(dir, file);
    try {
      const buf = await sharp(path)
        .resize(400, 400, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 65 })
        .toBuffer();
      await sharp(buf).toFile(path);
      done++;
    } catch (e) {
      // skip problematic files
      done++;
    }
  }));
  if (done % 100 === 0 || done === files.length) {
    console.log(`  ${done}/${files.length}`);
  }
}

console.log('Done!');

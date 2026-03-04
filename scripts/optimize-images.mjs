#!/usr/bin/env node
/**
 * optimize-images.mjs
 * Resize + smart-crop selected images for therapy & class pages.
 * Usage: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, resolve } from 'path';
import { existsSync } from 'fs';

const ROOT = resolve(import.meta.dirname, '..');
const REVIEWS_ROOT = resolve(ROOT, '..', 'aurum_reviews');
const THERAPY_SRC = join(REVIEWS_ROOT, '테라피_선별');
const CLASS_SRC = join(REVIEWS_ROOT, '클래스_선별');
const THERAPY_DST = join(ROOT, 'public', 'images', 'therapy');
const CLASS_DST = join(ROOT, 'public', 'images', 'class');

const QUALITY = 80;

/**
 * Each entry: [sourceFileName, destFileName, width, height]
 * width × height defines the crop box; sharp fit:'cover' + position:'attention' handles smart crop.
 */
const THERAPY_IMAGES = [
  // Program cards (4:3 → 1200×900)
  ['programs_aroma_01.jpg', 'programs_aroma_01.jpg', 1200, 900],
  ['programs_thalgo_body_01.jpg', 'programs_thalgo_body_01.jpg', 1200, 900],
  ['programs_thalgo_body_02.jpg', 'programs_thalgo_body_02.jpg', 1200, 900],
  ['programs_thalgo_body_03.jpg', 'programs_thalgo_body_03.jpg', 1200, 900],
  ['programs_thalgo_body_04.jpg', 'programs_thalgo_body_04.jpg', 1200, 900],
  ['programs_thalgo_body_05.jpg', 'programs_thalgo_body_05.jpg', 1200, 900],
  ['programs_thalgo_face_01.jpg', 'programs_thalgo_face_01.jpg', 1200, 900],
  ['programs_thalgo_face_04.jpg', 'programs_thalgo_face_04.jpg', 1200, 900],
  ['programs_thalgo_face_05.jpg', 'programs_thalgo_face_05.jpg', 1200, 900],
  ['programs_thalgo_face_06.jpg', 'programs_thalgo_face_06.jpg', 1200, 900],
  ['programs_device_face_01.jpg', 'programs_device_face_01.jpg', 1200, 900],
  ['programs_slimming_01.jpg', 'programs_slimming_01.jpg', 1200, 900],

  // Facility / space images
  ['hero_01.jpg', 'hero_01.jpg', 800, 960],           // staff slot (1:1.2)
  ['space_01.jpg', 'space_01.jpg', 800, 600],          // store 4:3
  ['space_02.jpg', 'space_02.jpg', 800, 600],
  ['space_03.jpg', 'space_03.jpg', 800, 600],
  ['space_04.jpg', 'space_04.jpg', 800, 600],
  ['space_aroma_oils_01.jpg', 'space_aroma_oils_01.jpg', 800, 600],
  ['features_thalgo_01.jpg', 'features_thalgo_01.jpg', 1600, 600], // wide 8:3

  // Team section
  ['staff_ceo_01.jpg', 'staff_ceo.jpg', 600, 800],            // CEO portrait 3:4
  ['staff_group_01.jpg', 'staff_group.jpg', 1600, 900],       // group photo 16:9
  ['김하정.jpg', 'staff_hajung.jpg', 600, 800],               // therapist 3:4
  ['이지연.jpg', 'staff_jiyeon.jpg', 600, 800],
  ['김준경.jpg', 'staff_junkyung.jpg', 600, 800],
  ['전나영.jpg', 'staff_nayoung.jpg', 600, 800],
];

const CLASS_IMAGES = [
  // Gallery featured (4:2.5 → 1200×750)
  ['대림디움해피바스1회차-01.jpg', 'event_daelim1_01.jpg', 1200, 750],

  // Gallery grid (3:2 → 600×400)
  ['서울대어린이병원-01.jpg', 'event_snuh_01.jpg', 600, 400],
  ['카카오택시히어로즈-01.jpg', 'event_kakao_01.jpg', 600, 400],
  ['한국콘텐츠진흥원-01.jpg', 'event_kocca_01.jpg', 600, 400],
  ['그린웹서비스-01.jpg', 'event_greenweb_01.jpg', 600, 400],
  ['대림디움해피바스2회차-01.jpg', 'event_daelim2_01.jpg', 600, 400],
  ['아카데미자체교육-01.jpg', 'event_academy_01.jpg', 600, 400],

  // Program cards (16:9 → 1200×675)
  ['카카오택시히어로즈-02.jpg', 'event_kakao_02.jpg', 1200, 675],
];

async function processImage(srcDir, dstDir, [srcName, dstName, width, height]) {
  const srcPath = join(srcDir, srcName);
  const dstPath = join(dstDir, dstName);

  if (!existsSync(srcPath)) {
    console.warn(`  SKIP (not found): ${srcName}`);
    return;
  }

  await sharp(srcPath)
    .rotate()   // EXIF rotation fix
    .resize(width, height, {
      fit: 'cover',
      position: 'attention',  // smart crop
    })
    .jpeg({ quality: QUALITY, progressive: true })
    .toFile(dstPath);

  const { size } = await sharp(dstPath).metadata().then(() =>
    import('fs').then(fs => fs.statSync(dstPath))
  );
  const kb = (size / 1024).toFixed(0);
  console.log(`  OK: ${dstName} (${width}×${height}, ${kb}KB)`);
}

async function main() {
  await mkdir(THERAPY_DST, { recursive: true });
  await mkdir(CLASS_DST, { recursive: true });

  console.log('=== Therapy Images ===');
  for (const entry of THERAPY_IMAGES) {
    await processImage(THERAPY_SRC, THERAPY_DST, entry);
  }

  console.log('\n=== Class Images ===');
  for (const entry of CLASS_IMAGES) {
    await processImage(CLASS_SRC, CLASS_DST, entry);
  }

  console.log('\nDone! All images optimized.');
}

main().catch(console.error);

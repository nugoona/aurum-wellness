import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'C:/Users/oscar/Downloads';
const DEST = 'D:/github/ngn_homepage/aurum/public/images/class-lv2';
mkdirSync(DEST, { recursive: true });

const MAP = [
  ['Gemini_Generated_Image_v48cwvv48cwvv48c.png', '01_stroke_portrait.webp'],
  ['Gemini_Generated_Image_q4t9y0q4t9y0q4t9.png', '02_fascia_portrait.webp'],
  ['Gemini_Generated_Image_bod3xhbod3xhbod3.png', '03_flow_portrait.webp'],
  ['Gemini_Generated_Image_npfxtwnpfxtwnpfx.png', 'target_01_square.webp'],
  ['Gemini_Generated_Image_ub33euub33euub33.png', 'target_02_square.webp'],
  ['Gemini_Generated_Image_5qticg5qticg5qti.png', 'target_03_square.webp'],
  ['Gemini_Generated_Image_5ycisz5ycisz5yci.png', 'target_04_square.webp'],
  ['Gemini_Generated_Image_8qsmrq8qsmrq8qsm.png', 'hero_lv2.webp'],
];

for (const [src, dest] of MAP) {
  const out = join(DEST, dest);
  await sharp(join(SRC, src))
    .webp({ quality: 85, effort: 5 })
    .toFile(out);
  console.log('✓', dest);
}

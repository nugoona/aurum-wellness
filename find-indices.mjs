import { readdirSync, statSync } from 'fs';
import { join } from 'path';

// Recursively find all .jpg files
function findJpgs(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findJpgs(full));
    } else if (entry.name.toLowerCase().endsWith('.jpg')) {
      results.push(full.replace(/\\/g, '/'));
    }
  }
  return results;
}

const SRC = 'D:/github/ngn_board/aurum_reviews/아우름웰니스 포트폴리오';
const files = findJpgs(SRC).sort();

const keywords = [
  'SK텔레콤',
  '한화',
  '관광공사 본사',
  'P&G',
  '2022년/인천공항공사',
  '기업은행',
  '스마일게이트',
  '법무부',
  'BMW golf cup 2021',
  'LG에너지솔루션 가족',
  '위워크',
  '렉서스',
];

for (const kw of keywords) {
  const idx = files.findIndex(f => f.includes(kw));
  if (idx >= 0) {
    const folder = files[idx].replace(/\/[^/]+$/, '');
    const folderFiles = files.filter(f => f.startsWith(folder));
    const pick = Math.floor(folderFiles.length * 0.4);
    const pickedIdx = files.indexOf(folderFiles[pick]);
    console.log(`p${String(pickedIdx + 1).padStart(3, '0')} | ${kw} | ${folderFiles.length} files`);
  } else {
    console.log(`NOT FOUND: ${kw}`);
  }
}

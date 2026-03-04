import { readdirSync } from 'fs';
import { join } from 'path';

function findImages(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findImages(full));
    else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) results.push(full.replace(/\\/g, '/'));
  }
  return results;
}

const SRC = 'D:/github/ngn_board/aurum_reviews/아우름웰니스 행사B2B';
const files = findImages(SRC).sort();

const corp = {};
const vip = {};

for (const f of files) {
  let m;
  if (f.includes('기업 복지 케어')) {
    m = f.match(/기업 복지 케어\/(\d{4})년\/([^/]+)/);
    if (m) {
      const [, year, event] = m;
      if (!corp[year]) corp[year] = {};
      if (!corp[year][event]) corp[year][event] = { first: files.indexOf(f) + 1, count: 0 };
      corp[year][event].count++;
    }
  } else if (f.includes('vip행사')) {
    m = f.match(/vip행사\/(\d{4})년\/([^/]+)/);
    if (m) {
      const [, year, event] = m;
      if (!vip[year]) vip[year] = {};
      if (!vip[year][event]) vip[year][event] = { first: files.indexOf(f) + 1, count: 0 };
      vip[year][event].count++;
    }
  }
}

console.log('=== CORPORATE ===');
for (const y of Object.keys(corp).sort().reverse()) {
  for (const [ev, info] of Object.entries(corp[y])) {
    const mid = info.first + Math.floor(info.count * 0.4);
    console.log(`${y} | p${String(mid).padStart(4, '0')} (${info.count}) | ${ev}`);
  }
}

console.log('\n=== VIP ===');
for (const y of Object.keys(vip).sort().reverse()) {
  for (const [ev, info] of Object.entries(vip[y])) {
    const mid = info.first + Math.floor(info.count * 0.4);
    console.log(`${y} | p${String(mid).padStart(4, '0')} (${info.count}) | ${ev}`);
  }
}

let totalCorp = 0, totalVip = 0;
for (const y of Object.keys(corp)) totalCorp += Object.keys(corp[y]).length;
for (const y of Object.keys(vip)) totalVip += Object.keys(vip[y]).length;
console.log(`\nTotal: ${totalCorp} corporate + ${totalVip} VIP = ${totalCorp + totalVip} events`);

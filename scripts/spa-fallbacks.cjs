#!/usr/bin/env node

/**
 * Copy built index.html to SPA fallback locations for GitHub Pages deep links.
 */
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');
const targets = [
  path.join(distDir, '404.html'),
  path.join(distDir, 'pomodojo', 'privacy', 'index.html'),
  path.join(distDir, 'pomodojo', 'terms', 'index.html'),
];

if (!fs.existsSync(indexPath)) {
  console.error('Cannot create SPA fallbacks: dist/index.html is missing. Build first.');
  process.exit(1);
}

targets.forEach(target => {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(indexPath, target);
  console.log(`SPA fallback created: ${path.relative(distDir, target)}`);
});

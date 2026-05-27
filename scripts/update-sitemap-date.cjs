#!/usr/bin/env node

/**
 * update-sitemap-date.cjs
 *
 * Stamps today's date (YYYY-MM-DD) into every <lastmod> entry in
 * public/sitemap.xml so that Googlebot always sees a fresh modification
 * date after each deploy.
 *
 * Run automatically as part of the prebuild step.
 */

const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

if (!fs.existsSync(sitemapPath)) {
  console.error('update-sitemap-date: sitemap.xml not found at', sitemapPath);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
let content = fs.readFileSync(sitemapPath, 'utf8');

// Replace every <lastmod>...</lastmod> value with today's date
content = content.replace(/<lastmod>[^<]+<\/lastmod>/g, `<lastmod>${today}</lastmod>`);

fs.writeFileSync(sitemapPath, content, 'utf8');
console.log(`update-sitemap-date: all <lastmod> entries updated to ${today}`);

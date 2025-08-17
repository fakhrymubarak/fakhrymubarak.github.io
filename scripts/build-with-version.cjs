#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get a version from the environment variable only
const APP_VERSION = process.env.VITE_APP_VERSION || 'v2.0.0';

console.log(`Building with version: ${APP_VERSION}`);

// Read the service worker template
const swTemplatePath = path.join(__dirname, '../src/domain/valueObjects/sw.ts');
const swTemplate = fs.readFileSync(swTemplatePath, 'utf8');

// Extract only the service worker part (remove TypeScript exports and registration code)
let swContent = swTemplate
  .replace('{{APP_VERSION}}', APP_VERSION)
  .replace(/\/\/ Service Worker registration utility[\s\S]*$/m, '') // Remove registration code
  .replace(/export.*$/gm, '') // Remove export statements
  .replace(/import.*$/gm, ''); // Remove import statements

// Strip TypeScript-specific syntax so the SW runs as plain JS in browsers
swContent = swContent
  // Remove parameter type annotations like (event: any) and (cacheNames: string[])
  .replace(/:\s*any/g, '')
  .replace(/:\s*string\[\]/g, '')
  .replace(/:\s*\w+/g, '')
  // Remove TypeScript casts like (self as any)
  .replace(/\(\s*self\s+as\s+any\s*\)/g, 'self');

// Write the service worker with an injected version
fs.writeFileSync(path.join(__dirname, '../public/sw.js'), swContent);
console.log(`Service worker generated with version: ${APP_VERSION}`);

// Also create a version file for reference
const versionInfo = {
  version: APP_VERSION,
  buildTime: new Date().toISOString(),
  buildId: process.env.BUILD_ID || process.env.GITHUB_SHA || 'local',
};

fs.writeFileSync(
  path.join(__dirname, '../public/version.json'),
  JSON.stringify(versionInfo, null, 2)
);

console.log('Version info written to public/version.json');

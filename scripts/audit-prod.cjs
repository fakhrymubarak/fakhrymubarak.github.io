#!/usr/bin/env node

/**
 * Production security audit gate (mirrors CI).
 *
 * Runs `npm audit --omit=dev` and fails on any advisory at moderate severity or
 * above, EXCEPT advisories listed in the audit-ci.jsonc allowlist. `npm audit`
 * has no per-advisory ignore, so this wrapper filters the JSON report and shares
 * the same allowlist as the `audit-ci` step to keep a single source of truth.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SEVERITY_RANK = { info: 0, low: 1, moderate: 2, high: 3, critical: 4 };
const THRESHOLD = SEVERITY_RANK.moderate;

function loadAllowlist() {
  const configPath = path.join(__dirname, '..', 'audit-ci.jsonc');
  const raw = fs.readFileSync(configPath, 'utf8');
  // Strip // line comments so we can JSON.parse the .jsonc file.
  const stripped = raw.replace(/^\s*\/\/.*$/gm, '');
  return new Set(JSON.parse(stripped).allowlist || []);
}

function runAudit() {
  try {
    return execSync('npm audit --omit=dev --json', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch (err) {
    // npm audit exits non-zero when vulnerabilities exist; the JSON is on stdout.
    if (err.stdout) return err.stdout;
    throw err;
  }
}

const allowlist = loadAllowlist();
const report = JSON.parse(runAudit());
const vulnerabilities = report.vulnerabilities || {};

// Resolve the advisory GHSA ids affecting a package, following string `via`
// references (a package vulnerable only through a dependency) to their source.
function resolveAdvisoryIds(name, seen = new Set()) {
  if (seen.has(name)) return [];
  seen.add(name);
  const entry = vulnerabilities[name];
  if (!entry) return [];
  const ids = [];
  for (const via of entry.via || []) {
    if (typeof via === 'object' && via.url) {
      ids.push(via.url.split('/').pop());
    } else if (typeof via === 'string') {
      ids.push(...resolveAdvisoryIds(via, seen));
    }
  }
  return ids;
}

const offenders = [];
for (const [name, vuln] of Object.entries(vulnerabilities)) {
  if ((SEVERITY_RANK[vuln.severity] ?? 0) < THRESHOLD) continue;

  const ids = resolveAdvisoryIds(name);
  // Ignore this package's advisories only if every contributing advisory is
  // allowlisted; a new, un-allowlisted advisory still fails the gate.
  const unhandled = ids.filter(id => !allowlist.has(id));
  if (ids.length > 0 && unhandled.length === 0) continue;

  offenders.push(`${name} (${vuln.severity}): ${ids.join(', ') || 'unknown'}`);
}

if (offenders.length > 0) {
  console.error('Production security audit failed:');
  offenders.forEach(line => console.error(`  - ${line}`));
  process.exit(1);
}

console.log('Production security audit passed (allowlisted advisories ignored).');

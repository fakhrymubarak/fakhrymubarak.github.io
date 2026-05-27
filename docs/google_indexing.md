# Google Indexing Analysis — Why "fakhry mubarak" Doesn't Appear on Google

> **Created:** 2026-05-27  
> **Status:** Needs action  
> **Site:** https://fakhrymubarak.github.io

---

## Executive Summary

Searching for **"fakhry mubarak"** on Google does not surface this portfolio. This document identifies the root causes — from the most critical architectural blocker to minor SEO gaps — and provides a prioritised action plan to fix them.

---

## Root Cause Analysis

### 🔴 Critical — Fix Immediately

---

#### 1. Client-Side Rendering (CSR) — The #1 Blocker

**What's happening:**  
The site is a pure React SPA built with Vite. When Googlebot requests `https://fakhrymubarak.github.io/`, the raw HTTP response it receives is:

```html
<!doctype html>
<html lang="en">
  <head>
    <title>Fakhry Mubarak - Software Engineer</title>
    <!-- meta tags populated here are STATIC and minimal -->
  </head>
  <body>
    <div id="root"></div>  <!-- ← content is EMPTY at crawl time -->
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

All meaningful page content — the hero text, work history, projects, structured data — is injected **after** JavaScript executes via `ReactDOM.createRoot()`. While Googlebot *can* run JavaScript, it does so in a second-pass crawl that may happen **days or weeks later**, or not at all if the rendering budget is exceeded.

**Why it causes invisibility:**  
- The initial HTML Google indexes is empty or near-empty
- Dynamically injected content (via `react-helmet-async`) is not guaranteed to be indexed
- Googlebot's JS rendering queue is unpredictable and deprioritised for low-authority domains

**Evidence in code:**  
- `src/main.tsx:25` — `ReactDOM.createRoot(document.getElementById('root')!).render(...)`
- `src/presentation/components/SEO.tsx:28` — all meta tags injected at runtime via `<Helmet>`
- `index.html:98` — `<div id="root"></div>` — server delivers empty body

**Fix:**  
Implement **Static Site Generation (SSG)** or **pre-rendering**. Options ranked by effort:

| Option | Effort | Impact |
|--------|--------|--------|
| Add `vite-plugin-ssr` / `vite-ssg` | Medium | ✅ High |
| Migrate to **Next.js** (static export) | High | ✅ Highest |
| Add `react-snap` for snapshot pre-rendering | Low | ⚠️ Partial |
| Use **Cloudflare Pages** with edge rendering | Medium | ✅ High |

**Quickest win:** Install `vite-plugin-ssg` (or `react-snap`) to pre-render the HTML at build time so Googlebot receives a fully-populated page without needing to execute JavaScript.

---

#### 2. Sitemap Contains Fragment URLs — Google Ignores Them

**What's happening:**  
`public/sitemap.xml` lists these URLs:

```xml
<loc>https://fakhrymubarak.github.io/#projects</loc>
<loc>https://fakhrymubarak.github.io/#experience</loc>
<loc>https://fakhrymubarak.github.io/#contact</loc>
```

**Why it's a problem:**  
Google's crawlers **strip the `#fragment` portion** before fetching a URL. All three of these entries resolve to the same page (`/`) as the homepage URL. They contribute nothing — Google sees them as duplicates and ignores them. The `lastmod` is also frozen at `2024-12-19`, signalling stale content.

**Fix:**  
```xml
<!-- Remove fragment-only URLs, keep only real canonical pages -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://fakhrymubarak.github.io/</loc>
    <lastmod>2026-05-27</lastmod>   <!-- update on each deploy -->
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://fakhrymubarak.github.io/pomodojo/privacy</loc>
    <lastmod>2026-05-27</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://fakhrymubarak.github.io/pomodojo/terms</loc>
    <lastmod>2026-05-27</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

Then submit the sitemap via Google Search Console.

---

#### 3. Google Search Console Not Confirmed / Sitemap Not Submitted

**What's happening:**  
A `public/google-site-verification.txt` file exists with a verification token, but the corresponding **meta tag** is absent from `index.html` static HTML:

```html
<!-- This tag is MISSING from index.html <head> -->
<meta name="google-site-verification" content="Ll7GeQotHHL2Krg6VdT_C0ZgJE3dpWSM3Pwqrvc2CGw" />
```

The `<Helmet>` component in `SEO.tsx` does **not** include this verification tag either. Without verified ownership, Google Search Console cannot:
- Show crawl errors or coverage reports
- Accept sitemap submissions
- Provide manual indexing request (URL Inspect tool)

**Fix (2 steps):**
1. Add the meta tag directly to `index.html` (not via Helmet, so it's always in the static HTML):
   ```html
   <meta name="google-site-verification" content="Ll7GeQotHHL2Krg6VdT_C0ZgJE3dpWSM3Pwqrvc2CGw" />
   ```
2. Go to [Google Search Console](https://search.google.com/search-console) → verify ownership → submit `https://fakhrymubarak.github.io/sitemap.xml` → use URL Inspect to request indexing of the homepage.

---

### 🟠 High Priority

---

#### 4. Open Graph Meta Tags Contain Unresolved Vite Placeholder

**What's happening:**  
In `index.html`, the OG and Twitter image/URL tags use:

```html
<meta property="og:url" content="%VITE_SITE_URL%/" />
<meta property="og:image" content="%VITE_SITE_URL%/avatar.webp" />
```

The `%VITE_SITE_URL%` token is replaced at **build time**. If the site was deployed without a proper `.env` file setting `VITE_SITE_URL`, these tags contain the literal placeholder string — which is both invalid and harmful for crawlers that parse `index.html` before JavaScript runs.

**Fix:**  
Verify the deployed `index.html` on GitHub Pages contains the actual URL, not the placeholder. Add `VITE_SITE_URL=https://fakhrymubarak.github.io` to the repository secrets / GitHub Actions environment, and confirm the build output has proper values.

---

#### 5. Structured Data (JSON-LD) Is JavaScript-Injected

**What's happening:**  
The `Person` schema is injected by `SEO.tsx` via `react-helmet-async`:

```tsx
// src/presentation/components/SEO.tsx:97-125
<script type="application/ld+json">
  {JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', ... })}
</script>
```

This script tag is only present in the DOM **after React hydrates**. Google's initial crawl of the static HTML will miss it entirely.

**Fix:**  
Inline the JSON-LD `<script>` directly in `index.html` with hardcoded values as a baseline, and let Helmet override/enhance it at runtime. This ensures the structured data is always crawlable even without JavaScript execution.

---

#### 6. Missing Name Variations as Keywords

**What's happening:**  
The SEO keywords in `SEO.tsx` are:

```
"Software Engineer, Android Developer, Flutter Developer, Mobile Development, Kotlin, Java, React, TypeScript"
```

The name **"Fakhry Mubarak"** is missing from the keywords meta tag. While Google de-emphasises the `keywords` meta tag, more importantly the **page title and H1** should prominently include the full name. The current title `"Fakhry Mubarak - Software Engineer"` is good, but the H1 on the page renders as `"Hi, I am"` + `"Fakhry Mubarak"` split across spans — this is less ideal for indexing than a single unified H1.

**Fix:**  
```tsx
// SEO.tsx — add name to keywords
<meta name="keywords" content="Fakhry Mubarak, Software Engineer, Android Developer, ..." />
```

---

### 🟡 Medium Priority

---

#### 7. Low Domain Authority (GitHub Pages Subdomain)

**What's happening:**  
`fakhrymubarak.github.io` is a shared subdomain on `github.io`. While GitHub Pages is respected, the specific subdomain has zero inbound backlinks from authoritative sites.

**Why it matters:**  
Google ranks results by relevance **and authority**. Even with perfect SEO, a page with no external links pointing to it will rank below pages for "fakhry mubarak" that exist on LinkedIn, GitHub profile, or other platforms with higher domain authority.

**Fix:**  
- Add the portfolio URL to your **LinkedIn profile** (About section + Featured section)
- Add it to your **GitHub profile** (`README.md` or bio URL field)
- Add it to any **Medium bio** or blog posts you publish
- Add it to your **Google account** (if you have a Google profile)

Each backlink from an authoritative domain acts as a trust signal.

---

#### 8. No `lastmod` Auto-Update on Deploy

**What's happening:**  
The `sitemap.xml` has a hardcoded `lastmod` date (`2024-12-19`). Googlebot uses `lastmod` as a signal for recrawl priority. Stale dates reduce crawl frequency.

**Fix:**  
Generate the sitemap dynamically at build time using a build script or Vite plugin (`vite-plugin-sitemap`) that injects today's date automatically.

---

#### 9. `Crawl-delay` in robots.txt May Slow Googlebot

**What's happening:**  
```
# robots.txt
Crawl-delay: 1
```

Googlebot **ignores** `Crawl-delay`, but other crawlers respect it. More importantly, this directive signals caution. It's harmless for Google specifically but worth removing as it adds no value for a static portfolio.

---

#### 10. Canonical URL Mismatch Risk

**What's happening:**  
`SEO.tsx` sets the canonical to `${SITE_URL}/` (with trailing slash). `index.html` links don't specify a canonical. If GitHub Pages serves both `https://fakhrymubarak.github.io` and `https://fakhrymubarak.github.io/`, Google may see these as different URLs and split indexing signals.

**Fix:**  
Ensure a `<link rel="canonical" href="https://fakhrymubarak.github.io/" />` is present in the **static** `index.html`, not just injected by Helmet.

---

### 🟢 Minor / Nice to Have

---

#### 11. No `og:locale` Tag

Missing `<meta property="og:locale" content="en_US" />`. Minor, but helps signal language/region to search engines.

#### 12. Twitter Handle Missing

`SEO.tsx` has Twitter card tags but no `<meta name="twitter:site" content="@YourHandle" />`. If you have a Twitter/X account, this improves social media card attribution.

#### 13. No `<html lang>` in Fallback 404 Pages

If `spa-fallbacks.cjs` generates any fallback HTML files, confirm they also carry `lang="en"` and the canonical tag.

---

## Priority Action Plan

| # | Action | Effort | Expected Impact | Priority |
|---|--------|--------|----------------|----------|
| 1 | Add Google Search Console meta tag to `index.html` + submit sitemap | 15 min | 🔴 Unblocks indexing | **Do now** |
| 2 | Request manual indexing in Google Search Console (URL Inspect) | 5 min | 🔴 Forces crawl | **Do now** |
| 3 | Fix `sitemap.xml` — remove fragment URLs, update `lastmod` | 10 min | 🟠 Improves discovery | **This week** |
| 4 | Verify `%VITE_SITE_URL%` is resolved in deployed HTML | 10 min | 🟠 Fixes OG tags | **This week** |
| 5 | Inline baseline JSON-LD in `index.html` | 20 min | 🟠 Structured data visible | **This week** |
| 6 | Add portfolio URL to LinkedIn, GitHub bio, Medium bio | 15 min | 🟠 Backlinks + authority | **This week** |
| 7 | Add name to SEO keywords + ensure H1 is one unified element | 15 min | 🟡 Better keyword signals | **Next sprint** |
| 8 | Implement SSG with `vite-plugin-ssg` or migrate to Next.js | 1–3 days | 🔴 **Long-term fix** | **Next sprint** |
| 9 | Auto-generate `sitemap.xml` at build time | 2 hrs | 🟡 Fresher crawl signals | **Next sprint** |
| 10 | Add canonical tag to static `index.html` | 5 min | 🟡 Prevent duplicate indexing | **Next sprint** |

---

## Expected Timeline After Fixes

| Milestone | Expected Timeframe |
|-----------|-------------------|
| Google verifies site ownership | Within 24 hours of adding meta tag |
| Manual index request processed | 1–7 days |
| First appearance in Google results | 1–4 weeks (after crawl + indexing) |
| Consistent ranking for "fakhry mubarak" | 4–12 weeks (depends on backlinks) |
| Top 5 result for own name | 8–16 weeks (with SSG + backlinks) |

---

## References

- [Google Search Central — JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google Search Central — Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [vite-plugin-ssg](https://github.com/antfu/vite-ssg)
- [react-snap (pre-rendering)](https://github.com/stereobooster/react-snap)
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org — Person](https://schema.org/Person)
- [Google Rich Results Test](https://search.google.com/test/rich-results)

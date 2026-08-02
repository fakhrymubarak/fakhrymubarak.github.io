# Design: Indonesian/English i18n (EN/ID language switch)

**Date:** 2026-08-02
**Status:** Approved — ready for implementation planning

## Goal

Add bilingual support (Indonesian + English) to the portfolio site. Add a
language switch in the header alongside the existing dark/light theme toggle.
**Default to Indonesian** on first visit; remember the visitor's choice
thereafter. Claude drafts all Indonesian copy for existing content.

## Non-Goals

- Translating Medium article content (authored, fetched from API — untouched).
- Browser/system-language auto-detection (default is always Indonesian).
- Adding an i18n library (react-i18next etc.) — a lightweight custom context is used.
- New flag image assets — flags are rendered as emoji.

## Key Decisions (approved)

| Decision | Choice |
| --- | --- |
| Translation source | Claude drafts Indonesian for all existing content; user reviews after. |
| Approach | Lightweight custom `LanguageContext` mirroring `ThemeContext` + typed dictionaries. No new deps. |
| Portfolio content structure | `getPortfolioData(locale)` builder — shared assets/structure, text pulled from `id`/`en` maps. |
| Switch UI | Flag emoji + `EN`/`ID` label, styled to match theme toggle. |
| Default & persistence | Default `id` on first visit; persist choice to `localStorage`; honor on return. |
| Flag rendering | Emoji (🇮🇩 / 🇬🇧), no new asset files. |

## Architecture

### Locale type & context (mirrors the theme system exactly)

- `Locale = 'id' | 'en'` — new type in `src/domain/models/i18n.ts`, with
  `LanguageContextType { language: Locale; setLanguage: (l: Locale) => void; toggleLanguage: () => void }`.
- `src/application/store/LanguageContext.ts` — `createContext<LanguageContextType | undefined>(undefined)`
  (mirrors `ThemeContext.ts`).
- `src/application/store/LanguageContext.tsx` — `LanguageProvider` (mirrors `ThemeContext.tsx`):
  - Init state: `localStorage.getItem('language')` if present and valid; else `'id'`.
  - Effect on `language` change: `localStorage.setItem('language', language)` and
    `document.documentElement.lang = language`.
  - `toggleLanguage` flips `id` ↔ `en`; `setLanguage` sets explicitly.
- `src/application/index.ts` barrel adds `export * from './store/LanguageContext';`.
- `src/presentation/hooks/useLanguage.ts` — `useContext(LanguageContext)`, throws if
  used outside provider (mirrors `useTheme.ts`). Exported via the presentation barrel
  the same way `useTheme` is.
- `src/App.tsx` — wrap the app in `<LanguageProvider>` nested with `<ThemeProvider>`
  (order irrelevant; both wrap `<Layout>`).

### Translation content — two layers

**Layer A — UI chrome dictionary.** New `src/domain/services/i18n/translations.ts`:

- Nested typed object `translations: Record<Locale, UIStrings>` where `UIStrings` is an
  explicit interface (compile-time guarantee both locales define every key).
- Keys cover: nav items (Home/Projects/Experience/Articles/Contact), section headings,
  "Filter Projects" / "Filter Certificates" / "Filter Articles", "View All on Medium",
  show-more/less labels, footer labels, and the switch/toggle aria-labels.
- A couple of dynamic strings (e.g. years-of-experience) are functions
  `(years: number) => string` rather than static strings — no interpolation engine.
- Helper `t(locale: Locale): UIStrings` returns the string set for a locale.
- Consumed in components via `const t = useTranslations()` (a thin
  `src/presentation/hooks/useTranslations.ts` that reads `useLanguage()` and returns
  `translations[language]`).

**Layer B — portfolio content.** `src/domain/services/portfolio.ts`:

- Convert the exported constant `portfolioData` into a function
  `getPortfolioData(locale: Locale): PortfolioData`.
- All asset imports (images, company logos, tech-stack icons), colors, dates, tech-stack
  names, and object structure stay declared **once** in module scope, shared across locales.
- Only translatable text is locale-dependent, sourced from an in-file
  `content: Record<Locale, {...}>` map: intro `title`/`subtitle`/`description`,
  each project's `title` + `description`, experience roles/titles/descriptions,
  certificate names/descriptions. The dynamic
  `` `...over ${getYearsOfExperience()} years...` `` interpolation is preserved inside
  each locale's description string builder.
- The five consuming hooks call `useLanguage()` and pass `language` into
  `getPortfolioData(language)`; their `useMemo` dependency arrays gain `language`:
  - `useIntro.ts`, `useProjects.ts`, `useExperience.ts`, `useCertificates.ts`, `useFooter.ts`.
  - Example (`useProjects`): `const { language } = useLanguage();`
    `const uiData = useMemo(() => mapPortfolioData(getPortfolioData(language)), [language]);`
- `mapPortfolioData` (dataMapper) is unchanged — it still receives a fully-built
  `PortfolioData`.

### Header language switch

In `src/presentation/components/Header.tsx`, add a button next to the theme toggle:

- Content: flag emoji + language-code label, e.g. `🇬🇧 EN` when Indonesian is active
  (shows the language you'd switch *to*), `🇮🇩 ID` when English is active.
  **Decision for implementation:** show the target language (the one clicking switches to),
  consistent with the theme toggle's `aria-label` "Switch to X mode" convention.
- Styling: reuse the theme-toggle button classes (rounded, `bg-light-surface dark:bg-dark-surface`,
  hover/focus-ring) so the two controls read as a pair. No exit/enter icon animation needed
  (simpler than the theme toggle's animation sequence).
- `onClick`: `toggleLanguage()` + `trackButtonClick('language_toggle', 'header')` +
  `accessibilityUtils.announce(...)` with the localized "language changed" string.
- `aria-label`: localized, e.g. `id` active → "Ganti bahasa ke English"; `en` active →
  "Switch language to Indonesian".
- Present in both desktop and mobile header layouts (place beside the existing theme toggle
  in the shared right-hand control group so it appears once for both breakpoints).

### Localize hardcoded chrome strings

Replace inline English literals with `t.*` lookups in:
`Header.tsx` (nav items, aria-labels), `ProjectsSection.tsx`, `CertificatesSection.tsx`,
`MediumSection.tsx`, `ExperienceSection.tsx`, `IntroSection.tsx`, `FooterSection.tsx`.
Scope: user-visible text and aria-labels only — do not touch `className`, data keys,
analytics event names, or href anchors.

### SEO & document language

- `SEO.tsx` already derives `title`/`description` from `introduction` (now locale-aware),
  so those localize automatically. Additionally: localize the standalone
  `<meta name="language">` value (`id`→"Indonesian" / `en`→"English") and the default
  `description`/`title` props to read from the locale, and ensure `<html lang>` reflects
  the active locale (set imperatively by `LanguageProvider`; `SEO`/Helmet may also set
  `htmlAttributes={{ lang: language }}`).
- `index.html` static `<html lang="en">` → change initial to `lang="id"` (default);
  runtime JS updates it on switch.

## Data Flow

```
localStorage('language') ─┐
system default 'id' ──────┴─▶ LanguageProvider(state: language)
                                   │ useLanguage()
        ┌──────────────────────────┼───────────────────────────┐
        ▼                          ▼                            ▼
  useTranslations()        content hooks (useIntro,        Header switch
  → translations[lang]     useProjects, ...) →             (toggleLanguage)
  → UI chrome strings      getPortfolioData(lang)          + <html lang>
        │                          │                            │
        ▼                          ▼                            ▼
   Section components        mapPortfolioData → UI models   re-render in locale
```

## Testing

Follow existing Jest + Testing Library patterns.

- `useLanguage` / `LanguageProvider` test (mirror `useTheme.test.ts`): default `'id'` when
  no stored value; reads stored value; `toggleLanguage` flips and persists; updates
  `document.documentElement.lang`; `useLanguage` throws outside provider.
- Content-locale test: a content hook returns Indonesian strings under `id` and English
  under `en` (assert a representative field, e.g. intro subtitle).
- `Header.test.tsx`: renders the language switch, clicking toggles language and fires
  `trackButtonClick('language_toggle', 'header')`.
- Update existing tests that assert English literals to account for the `id` default
  (wrap render in `LanguageProvider`, or assert the Indonesian string, or explicitly set
  `en` in the test). Test utilities/providers (`src/shared/test-utils/test-providers.tsx`)
  gain `LanguageProvider` so all component tests have the context.

## Files Touched (summary)

**New:**
- `src/domain/models/i18n.ts` — `Locale`, `LanguageContextType`.
- `src/application/store/LanguageContext.ts` — context object.
- `src/application/store/LanguageContext.tsx` — provider.
- `src/domain/services/i18n/translations.ts` — UI chrome dictionary + `t()` helper.
- `src/presentation/hooks/useLanguage.ts` — context hook.
- `src/presentation/hooks/useTranslations.ts` — locale string accessor.
- Tests for the above.

**Modified:**
- `src/domain/services/portfolio.ts` — `portfolioData` → `getPortfolioData(locale)` + `content` map.
- `src/presentation/hooks/{useIntro,useProjects,useExperience,useCertificates,useFooter}.ts` — locale-aware.
- `src/presentation/components/Header.tsx` — language switch + localized nav/aria.
- `src/presentation/components/sections/*.tsx` — localized chrome strings.
- `src/presentation/components/SEO.tsx` — localized meta + `<html lang>`.
- `src/App.tsx` — wrap in `LanguageProvider`.
- `src/application/index.ts`, presentation barrel — export new context/hooks.
- `src/shared/test-utils/test-providers.tsx` — include `LanguageProvider`.
- `index.html` — initial `lang="id"`.
- Existing tests asserting English literals.

## Open Items for User Review After Implementation

- Indonesian copy quality (Claude-drafted) — especially the intro bio, project
  descriptions, and experience descriptions.

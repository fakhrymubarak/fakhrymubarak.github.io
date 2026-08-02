# Indonesian/English i18n Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an Indonesian/English language switch beside the theme toggle, defaulting to Indonesian, with all UI chrome and portfolio content localized.

**Architecture:** A `LanguageContext` mirroring the existing `ThemeContext` (localStorage-persisted, default `id`) exposes the active locale. UI chrome strings come from a typed dictionary via `useTranslations()`; portfolio prose comes from `getPortfolioData(locale)`, a builder that keeps shared assets/structure in one place and pulls text from `en`/`id` maps. The five content hooks become locale-aware; the header gains a flag-emoji + code switch.

**Tech Stack:** React 18 + TypeScript, Vite, Jest + Testing Library, framer-motion, lucide-react, react-helmet-async. No new runtime dependencies.

## Global Constraints

- **No new dependencies.** Custom context only — do not add react-i18next or i18next.
- **Locale type:** `type Locale = 'id' | 'en'`. Default is `'id'`.
- **Persistence key:** `localStorage` key is exactly `'language'`.
- **`<html lang>`** must reflect the active locale at runtime.
- **RTK:** Prefix every shell command with `rtk` (e.g. `rtk git commit ...`), per repo AGENTS.md.
- **Path aliases:** `@/domain`, `@/application`, `@/presentation`, `@domain/*`, `@application/*`, `@presentation/*` are configured — use them as the surrounding files do.
- **Barrels:** `src/domain/index.ts`, `src/application/index.ts`, `src/presentation/index.ts`, `src/presentation/models/index.ts` re-export public symbols. Add new public symbols to the matching barrel.
- **Flags are emoji** (🇮🇩 / 🇬🇧). No image asset files.
- **Scoping (kept English in BOTH locales, by decision):** product/project names, company names, job/role titles, certificate titles, tech-stack names, skill names, month abbreviations in period strings, and `calculateDuration()` output. Only the word "Present" inside period strings is localized (→ "Sekarang"). Medium article content (title/description/snippet, fetched from API) is never translated — only the chrome around it.
- **Test stability:** `LanguageProvider` takes an optional `initialLanguage?: Locale` prop (falls back to `localStorage` then `'id'`). Test providers pass `initialLanguage="en"` so existing English assertions keep passing; new i18n tests pass `initialLanguage="id"`.
- **Verification baseline:** `rtk npm run type-check`, `rtk npm run lint`, and `rtk npm run test:fast` must pass at the end of every task.

---

## File Structure

**New files:**
- `src/domain/models/i18n.ts` — `Locale`, `LanguageContextType`.
- `src/application/store/LanguageContext.ts` — the context object.
- `src/application/store/LanguageContext.tsx` — `LanguageProvider`.
- `src/presentation/hooks/useLanguage.ts` — context accessor hook.
- `src/domain/services/i18n/translations.ts` — `UIStrings` interface + `translations` (en/id) + `getUIStrings(locale)`.
- `src/presentation/hooks/useTranslations.ts` — returns the active locale's `UIStrings`.
- Tests colocated under `__tests__` following existing convention.

**Modified files:**
- `src/domain/services/portfolio.ts` — `portfolioData` → `getPortfolioData(locale)`.
- `src/domain/index.ts` — export `getPortfolioData` (and keep type exports).
- `src/application/index.ts`, `src/presentation/index.ts` — barrels.
- `src/presentation/hooks/{useIntro,useProjects,useExperience,useCertificates,useFooter}.ts` — locale-aware.
- `src/presentation/components/Header.tsx` — language switch + localized nav/aria.
- `src/presentation/components/sections/*.tsx` + `sections/{project,medium,certificate}/*.tsx` — localized chrome.
- `src/presentation/components/SEO.tsx` — localized meta + `htmlAttributes.lang`.
- `src/App.tsx` — wrap in `<LanguageProvider>`.
- `src/shared/test-utils/test-providers.tsx` — include `LanguageProvider` (initialLanguage="en").
- `index.html` — initial `lang="id"`.

---

## Task 1: Locale model + LanguageContext + provider

**Files:**
- Create: `src/domain/models/i18n.ts`
- Create: `src/application/store/LanguageContext.ts`
- Create: `src/application/store/LanguageContext.tsx`
- Modify: `src/application/index.ts`
- Modify: `src/App.tsx`
- Test: `src/application/store/__tests__/LanguageContext.test.tsx`

**Interfaces:**
- Produces: `type Locale = 'id' | 'en'`; `interface LanguageContextType { language: Locale; setLanguage: (l: Locale) => void; toggleLanguage: () => void }`; `LanguageContext` (React context, may be `undefined`); `LanguageProvider: React.FC<{ children: React.ReactNode; initialLanguage?: Locale }>`.

- [ ] **Step 1: Write the failing test**

Create `src/application/store/__tests__/LanguageContext.test.tsx`:

```tsx
import React, { useContext } from 'react';
import { render, screen, act } from '@testing-library/react';
import { LanguageProvider } from '../LanguageContext.tsx';
import { LanguageContext } from '../LanguageContext.ts';

const Probe: React.FC = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) return null;
  return (
    <div>
      <span data-testid="lang">{ctx.language}</span>
      <button onClick={ctx.toggleLanguage}>toggle</button>
      <button onClick={() => ctx.setLanguage('en')}>set-en</button>
    </div>
  );
};

describe('LanguageProvider', () => {
  beforeEach(() => localStorage.clear());

  it('defaults to Indonesian when nothing is stored', () => {
    render(<LanguageProvider><Probe /></LanguageProvider>);
    expect(screen.getByTestId('lang').textContent).toBe('id');
    expect(document.documentElement.lang).toBe('id');
  });

  it('reads a stored language', () => {
    localStorage.setItem('language', 'en');
    render(<LanguageProvider><Probe /></LanguageProvider>);
    expect(screen.getByTestId('lang').textContent).toBe('en');
  });

  it('honors initialLanguage over storage default', () => {
    render(<LanguageProvider initialLanguage="en"><Probe /></LanguageProvider>);
    expect(screen.getByTestId('lang').textContent).toBe('en');
  });

  it('toggleLanguage flips and persists', () => {
    render(<LanguageProvider><Probe /></LanguageProvider>);
    act(() => screen.getByText('toggle').click());
    expect(screen.getByTestId('lang').textContent).toBe('en');
    expect(localStorage.getItem('language')).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('setLanguage sets explicitly', () => {
    render(<LanguageProvider><Probe /></LanguageProvider>);
    act(() => screen.getByText('set-en').click());
    expect(screen.getByTestId('lang').textContent).toBe('en');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `rtk npx jest src/application/store/__tests__/LanguageContext.test.tsx --no-coverage`
Expected: FAIL — cannot resolve `../LanguageContext.tsx` / `../LanguageContext.ts`.

- [ ] **Step 3: Create the model**

Create `src/domain/models/i18n.ts`:

```ts
export type Locale = 'id' | 'en';

export interface LanguageContextType {
  language: Locale;
  setLanguage: (language: Locale) => void;
  toggleLanguage: () => void;
}
```

- [ ] **Step 4: Create the context object**

Create `src/application/store/LanguageContext.ts` (mirrors `ThemeContext.ts`):

```ts
import { createContext } from 'react';
import type { LanguageContextType } from '@domain/models/i18n.ts';

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);
```

- [ ] **Step 5: Create the provider**

Create `src/application/store/LanguageContext.tsx` (mirrors `ThemeContext.tsx`):

```tsx
import React, { useEffect, useState } from 'react';
import type { Locale } from '@domain/models/i18n.ts';
import { LanguageContext } from '@/application';

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLanguage?: Locale;
}

const isLocale = (value: string | null): value is Locale =>
  value === 'id' || value === 'en';

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  initialLanguage,
}) => {
  const [language, setLanguage] = useState<Locale>(() => {
    if (initialLanguage) {
      return initialLanguage;
    }
    const saved = localStorage.getItem('language');
    if (isLocale(saved)) {
      return saved;
    }
    return 'id';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'id' ? 'en' : 'id'));
  };

  const value = { language, setLanguage, toggleLanguage };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
```

- [ ] **Step 6: Export from the application barrel**

Modify `src/application/index.ts` — append:

```ts
export * from './store/LanguageContext';
```

Note: the barrel already has `export * from './store/ThemeContext';`. The two `./store/LanguageContext` files (`.ts` context + `.tsx` provider) resolve the same way the Theme pair does.

- [ ] **Step 7: Wrap the app**

Modify `src/App.tsx`. Add the import beside the ThemeProvider import:

```tsx
import { LanguageProvider } from './application/store/LanguageContext.tsx';
```

Wrap the existing `<ThemeProvider>…</ThemeProvider>` block:

```tsx
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Layout>
          {/* …unchanged… */}
        </Layout>
      </ThemeProvider>
    </LanguageProvider>
  );
```

- [ ] **Step 8: Run tests to verify they pass**

Run: `rtk npx jest src/application/store/__tests__/LanguageContext.test.tsx --no-coverage`
Expected: PASS (5 tests).

- [ ] **Step 9: Type-check**

Run: `rtk npm run type-check`
Expected: no errors.

- [ ] **Step 10: Commit**

```bash
rtk git add src/domain/models/i18n.ts src/application/store/LanguageContext.ts src/application/store/LanguageContext.tsx src/application/index.ts src/App.tsx src/application/store/__tests__/LanguageContext.test.tsx
rtk git commit -m "feat(i18n): add LanguageContext with id default and persistence"
```

---

## Task 2: useLanguage hook

**Files:**
- Create: `src/presentation/hooks/useLanguage.ts`
- Modify: `src/presentation/index.ts`
- Test: `src/presentation/hooks/__tests__/useLanguage.test.ts`

**Interfaces:**
- Consumes: `LanguageContext` (Task 1).
- Produces: `useLanguage(): LanguageContextType` — throws `'useLanguage must be used within a LanguageProvider'` if no provider.

- [ ] **Step 1: Write the failing test**

Create `src/presentation/hooks/__tests__/useLanguage.test.ts`:

```ts
import { renderHook } from '@testing-library/react';
import React from 'react';
import { useLanguage } from '../useLanguage';
import { LanguageProvider } from '@application/store/LanguageContext.tsx';

describe('useLanguage', () => {
  beforeEach(() => localStorage.clear());

  it('throws when used outside a LanguageProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useLanguage())).toThrow(
      'useLanguage must be used within a LanguageProvider'
    );
    spy.mockRestore();
  });

  it('returns the context inside a provider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(LanguageProvider, { initialLanguage: 'id' }, children);
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.language).toBe('id');
    expect(typeof result.current.toggleLanguage).toBe('function');
    expect(typeof result.current.setLanguage).toBe('function');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `rtk npx jest src/presentation/hooks/__tests__/useLanguage.test.ts --no-coverage`
Expected: FAIL — cannot resolve `../useLanguage`.

- [ ] **Step 3: Create the hook** (mirrors `useTheme.ts`)

Create `src/presentation/hooks/useLanguage.ts`:

```ts
import { useContext } from 'react';
import { LanguageContext } from '@/application';
import type { LanguageContextType } from '@domain/models/i18n.ts';

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};
```

- [ ] **Step 4: Export from the presentation barrel**

Modify `src/presentation/index.ts` — add beside `export * from './hooks/useTheme';`:

```ts
export * from './hooks/useLanguage';
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `rtk npx jest src/presentation/hooks/__tests__/useLanguage.test.ts --no-coverage`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
rtk git add src/presentation/hooks/useLanguage.ts src/presentation/index.ts src/presentation/hooks/__tests__/useLanguage.test.ts
rtk git commit -m "feat(i18n): add useLanguage hook"
```

---

## Task 3: UI translations dictionary + useTranslations hook

**Files:**
- Create: `src/domain/services/i18n/translations.ts`
- Create: `src/presentation/hooks/useTranslations.ts`
- Modify: `src/presentation/index.ts`
- Modify: `src/shared/test-utils/test-providers.tsx`
- Test: `src/domain/services/i18n/__tests__/translations.test.ts`
- Test: `src/presentation/hooks/__tests__/useTranslations.test.ts`

**Interfaces:**
- Consumes: `Locale` (Task 1), `useLanguage` (Task 2).
- Produces:
  - `interface UIStrings { … }` (shape below).
  - `translations: Record<Locale, UIStrings>`.
  - `getUIStrings(locale: Locale): UIStrings`.
  - `useTranslations(): UIStrings`.
  - `AllTheProviders` now wraps children in `LanguageProvider initialLanguage="en"` **inside** the existing `ThemeProvider`.

- [ ] **Step 1: Write the failing dictionary test**

Create `src/domain/services/i18n/__tests__/translations.test.ts`:

```ts
import { translations, getUIStrings } from '../translations';

describe('translations', () => {
  it('defines the same keys for id and en', () => {
    const keysOf = (o: object): string[] =>
      Object.entries(o).flatMap(([k, v]) =>
        v && typeof v === 'object' && typeof v !== 'function'
          ? Object.keys(v).map(sub => `${k}.${sub}`)
          : [k]
      );
    expect(keysOf(translations.id).sort()).toEqual(keysOf(translations.en).sort());
  });

  it('returns Indonesian nav labels', () => {
    expect(getUIStrings('id').nav.home).toBe('Beranda');
    expect(getUIStrings('en').nav.home).toBe('Home');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `rtk npx jest src/domain/services/i18n/__tests__/translations.test.ts --no-coverage`
Expected: FAIL — cannot resolve `../translations`.

- [ ] **Step 3: Create the dictionary**

Create `src/domain/services/i18n/translations.ts`:

```ts
import type { Locale } from '@domain/models/i18n.ts';

export interface UIStrings {
  nav: {
    home: string;
    projects: string;
    experience: string;
    articles: string;
    contact: string;
  };
  a11y: {
    toggleMenu: string;
    navigateTo: (section: string) => string;
    switchToLanguage: string; // aria for the language switch (target language)
    languageSwitchedTo: string; // announced after switch
  };
  intro: {
    experienceLabel: string;
    yearsUnit: string;
    shippedLabel: string;
    projectsUnit: string;
    techStack: string;
  };
  projects: {
    eyebrow: string;
    heading: string;
    body: string;
    filter: string;
    showLess: string;
    seeMore: string;
    all: string;
    viewProject: string;
    modalDescription: string;
    modalTechStack: string;
  };
  articles: {
    eyebrow: string;
    heading: string;
    body: string;
    filter: string;
    filterHeading: string;
    viewAll: string;
    showLess: string;
    seeMore: string;
    all: string;
    unableToLoad: string;
    loading: string;
    summaryUnavailable: string;
    viewOnMedium: string;
    readOnMedium: string;
    readFullArticle: string;
  };
  experience: {
    eyebrow: string;
    heading: string;
    body: string;
    keyAchievements: string;
    types: {
      'full-time': string;
      'part-time': string;
      contract: string;
      freelance: string;
    };
  };
  certificates: {
    eyebrow: string;
    heading: string;
    body: string;
    filter: string;
    showLess: string;
    seeMore: string;
    active: string;
    expired: string;
    viewCertificate: string;
    description: string;
    issueDate: string;
    credentialId: string;
    status: string;
    skills: string;
    filterByStatus: string;
    filterByType: string;
    filterBySkills: string;
    allStatus: string;
    allTypes: string;
    allSkills: string;
  };
  footer: {
    getInTouch: string;
    getInTouchBody: string;
    letsConnect: string;
    letsConnectBody: string;
    followMe: string;
  };
  language: {
    switchLabel: string; // 'ID' | 'EN' label of the TARGET language
    flag: string; // emoji flag of the TARGET language
  };
  seo: {
    languageMeta: string; // <meta name="language">
  };
}

const en: UIStrings = {
  nav: {
    home: 'Home',
    projects: 'Projects',
    experience: 'Experience',
    articles: 'Articles',
    contact: 'Contact',
  },
  a11y: {
    toggleMenu: 'Toggle mobile menu',
    navigateTo: section => `Navigate to ${section} section`,
    switchToLanguage: 'Ganti bahasa ke Indonesia',
    languageSwitchedTo: 'Bahasa diganti ke Indonesia',
  },
  intro: {
    experienceLabel: 'Experience',
    yearsUnit: 'yrs',
    shippedLabel: 'Shipped',
    projectsUnit: 'projects',
    techStack: 'Tech Stack',
  },
  projects: {
    eyebrow: 'Selected work',
    heading: 'Projects',
    body: "Here are some of the projects I've worked on, showcasing my expertise in mobile development and software engineering.",
    filter: 'Filter Projects',
    showLess: 'Show Less',
    seeMore: 'See More',
    all: 'All Projects',
    viewProject: 'View Project',
    modalDescription: 'Description',
    modalTechStack: 'Tech Stack',
  },
  articles: {
    eyebrow: 'Writing',
    heading: 'Articles',
    body: 'My latest thoughts and insights on software development, mobile engineering, and technology trends.',
    filter: 'Filter Articles',
    filterHeading: 'Filter Articles',
    viewAll: 'View All on Medium',
    showLess: 'Show Less',
    seeMore: 'See More Articles',
    all: 'All Articles',
    unableToLoad: 'Unable to load articles at the moment.',
    loading: 'Loading Medium articles',
    summaryUnavailable: 'Summary unavailable',
    viewOnMedium: 'View on Medium',
    readOnMedium: 'Read on Medium',
    readFullArticle: 'Read the full article on Medium',
  },
  experience: {
    eyebrow: 'Career',
    heading: 'Experiences',
    body: 'My professional journey in mobile development and software engineering.',
    keyAchievements: 'Key Achievements:',
    types: {
      'full-time': 'full-time',
      'part-time': 'part-time',
      contract: 'contract',
      freelance: 'freelance',
    },
  },
  certificates: {
    eyebrow: 'Credentials',
    heading: 'Certificates & Awards',
    body: 'Professional certifications and recognition for expertise and contributions in mobile development and software engineering.',
    filter: 'Filter Certificates',
    showLess: 'Show Less',
    seeMore: 'See More',
    active: 'Active',
    expired: 'Expired',
    viewCertificate: 'View Certificate',
    description: 'Description',
    issueDate: 'Issue Date',
    credentialId: 'Credential ID',
    status: 'Status',
    skills: 'Skills & Technologies',
    filterByStatus: 'Filter by Status',
    filterByType: 'Filter by Type',
    filterBySkills: 'Filter by Skills',
    allStatus: 'All Status',
    allTypes: 'All Types',
    allSkills: 'All Skills',
  },
  footer: {
    getInTouch: 'Get in Touch',
    getInTouchBody:
      "I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.",
    letsConnect: "Let's Connect",
    letsConnectBody:
      "Feel free to reach out if you'd like to discuss potential collaborations, have questions about my work, or just want to say hello!",
    followMe: 'Follow Me',
  },
  language: {
    switchLabel: 'ID',
    flag: '🇮🇩',
  },
  seo: {
    languageMeta: 'English',
  },
};

const id: UIStrings = {
  nav: {
    home: 'Beranda',
    projects: 'Proyek',
    experience: 'Pengalaman',
    articles: 'Artikel',
    contact: 'Kontak',
  },
  a11y: {
    toggleMenu: 'Buka/tutup menu',
    navigateTo: section => `Menuju bagian ${section}`,
    switchToLanguage: 'Switch language to English',
    languageSwitchedTo: 'Language switched to English',
  },
  intro: {
    experienceLabel: 'Pengalaman',
    yearsUnit: 'thn',
    shippedLabel: 'Dirilis',
    projectsUnit: 'proyek',
    techStack: 'Teknologi',
  },
  projects: {
    eyebrow: 'Karya pilihan',
    heading: 'Proyek',
    body: 'Berikut beberapa proyek yang pernah saya kerjakan, menampilkan keahlian saya di pengembangan mobile dan rekayasa perangkat lunak.',
    filter: 'Filter Proyek',
    showLess: 'Tampilkan Lebih Sedikit',
    seeMore: 'Lihat Lebih Banyak',
    all: 'Semua Proyek',
    viewProject: 'Lihat Proyek',
    modalDescription: 'Deskripsi',
    modalTechStack: 'Teknologi',
  },
  articles: {
    eyebrow: 'Tulisan',
    heading: 'Artikel',
    body: 'Pemikiran dan wawasan terbaru saya seputar pengembangan perangkat lunak, rekayasa mobile, dan tren teknologi.',
    filter: 'Filter Artikel',
    filterHeading: 'Filter Artikel',
    viewAll: 'Lihat Semua di Medium',
    showLess: 'Tampilkan Lebih Sedikit',
    seeMore: 'Lihat Artikel Lainnya',
    all: 'Semua Artikel',
    unableToLoad: 'Tidak dapat memuat artikel saat ini.',
    loading: 'Memuat artikel Medium',
    summaryUnavailable: 'Ringkasan tidak tersedia',
    viewOnMedium: 'Lihat di Medium',
    readOnMedium: 'Baca di Medium',
    readFullArticle: 'Baca artikel lengkap di Medium',
  },
  experience: {
    eyebrow: 'Karier',
    heading: 'Pengalaman',
    body: 'Perjalanan profesional saya di pengembangan mobile dan rekayasa perangkat lunak.',
    keyAchievements: 'Pencapaian Utama:',
    types: {
      'full-time': 'penuh waktu',
      'part-time': 'paruh waktu',
      contract: 'kontrak',
      freelance: 'lepas',
    },
  },
  certificates: {
    eyebrow: 'Kredensial',
    heading: 'Sertifikat & Penghargaan',
    body: 'Sertifikasi profesional dan pengakuan atas keahlian serta kontribusi di pengembangan mobile dan rekayasa perangkat lunak.',
    filter: 'Filter Sertifikat',
    showLess: 'Tampilkan Lebih Sedikit',
    seeMore: 'Lihat Lebih Banyak',
    active: 'Aktif',
    expired: 'Kedaluwarsa',
    viewCertificate: 'Lihat Sertifikat',
    description: 'Deskripsi',
    issueDate: 'Tanggal Terbit',
    credentialId: 'ID Kredensial',
    status: 'Status',
    skills: 'Keterampilan & Teknologi',
    filterByStatus: 'Filter berdasarkan Status',
    filterByType: 'Filter berdasarkan Tipe',
    filterBySkills: 'Filter berdasarkan Keterampilan',
    allStatus: 'Semua Status',
    allTypes: 'Semua Tipe',
    allSkills: 'Semua Keterampilan',
  },
  footer: {
    getInTouch: 'Hubungi Saya',
    getInTouchBody:
      'Saya selalu terbuka untuk mendiskusikan peluang baru, proyek menarik, atau sekadar berbincang tentang teknologi.',
    letsConnect: 'Mari Terhubung',
    letsConnectBody:
      'Jangan ragu untuk menghubungi saya jika ingin mendiskusikan potensi kolaborasi, memiliki pertanyaan tentang pekerjaan saya, atau sekadar menyapa!',
    followMe: 'Ikuti Saya',
  },
  language: {
    switchLabel: 'EN',
    flag: '🇬🇧',
  },
  seo: {
    languageMeta: 'Indonesian',
  },
};

export const translations: Record<Locale, UIStrings> = { id, en };

export const getUIStrings = (locale: Locale): UIStrings => translations[locale];
```

> Note on `a11y`/`language` blocks: they intentionally describe the **target** language (what a click switches to). While Indonesian is active, the switch offers English, so `id.language` shows `EN`/🇬🇧 and `id.a11y.switchToLanguage` is the English-facing "Switch language to English". While English is active, `en.language` shows `ID`/🇮🇩.

- [ ] **Step 4: Run the dictionary test to verify it passes**

Run: `rtk npx jest src/domain/services/i18n/__tests__/translations.test.ts --no-coverage`
Expected: PASS.

- [ ] **Step 5: Write the failing useTranslations test**

Create `src/presentation/hooks/__tests__/useTranslations.test.ts`:

```ts
import { renderHook } from '@testing-library/react';
import React from 'react';
import { useTranslations } from '../useTranslations';
import { LanguageProvider } from '@application/store/LanguageContext.tsx';

const wrapperFor = (lang: 'id' | 'en') =>
  ({ children }: { children: React.ReactNode }) =>
    React.createElement(LanguageProvider, { initialLanguage: lang }, children);

describe('useTranslations', () => {
  beforeEach(() => localStorage.clear());

  it('returns Indonesian strings under id', () => {
    const { result } = renderHook(() => useTranslations(), {
      wrapper: wrapperFor('id'),
    });
    expect(result.current.nav.projects).toBe('Proyek');
  });

  it('returns English strings under en', () => {
    const { result } = renderHook(() => useTranslations(), {
      wrapper: wrapperFor('en'),
    });
    expect(result.current.nav.projects).toBe('Projects');
  });
});
```

- [ ] **Step 6: Run it to verify it fails**

Run: `rtk npx jest src/presentation/hooks/__tests__/useTranslations.test.ts --no-coverage`
Expected: FAIL — cannot resolve `../useTranslations`.

- [ ] **Step 7: Create the hook**

Create `src/presentation/hooks/useTranslations.ts`:

```ts
import { useLanguage } from './useLanguage';
import { getUIStrings } from '@domain/services/i18n/translations';
import type { UIStrings } from '@domain/services/i18n/translations';

export const useTranslations = (): UIStrings => {
  const { language } = useLanguage();
  return getUIStrings(language);
};
```

- [ ] **Step 8: Export from the presentation barrel**

Modify `src/presentation/index.ts` — add beside the `useLanguage` export:

```ts
export * from './hooks/useTranslations';
```

- [ ] **Step 9: Update test providers**

Modify `src/shared/test-utils/test-providers.tsx` to:

```tsx
import React from 'react';
import { ThemeProvider } from '../../application/store/ThemeContext.tsx';
import { LanguageProvider } from '../../application/store/LanguageContext.tsx';

// Custom render function that includes providers.
// Default the language to English so existing string assertions keep passing;
// i18n-specific tests wrap with their own LanguageProvider initialLanguage.
export const AllTheProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <LanguageProvider initialLanguage="en">
      <ThemeProvider>{children}</ThemeProvider>
    </LanguageProvider>
  );
};
```

- [ ] **Step 10: Run tests to verify they pass**

Run: `rtk npx jest src/presentation/hooks/__tests__/useTranslations.test.ts src/domain/services/i18n/__tests__/translations.test.ts --no-coverage`
Expected: PASS.

- [ ] **Step 11: Commit**

```bash
rtk git add src/domain/services/i18n/translations.ts src/domain/services/i18n/__tests__/translations.test.ts src/presentation/hooks/useTranslations.ts src/presentation/hooks/__tests__/useTranslations.test.ts src/presentation/index.ts src/shared/test-utils/test-providers.tsx
rtk git commit -m "feat(i18n): add UI translations dictionary and useTranslations"
```

---

## Task 4: Localize portfolio content — getPortfolioData(locale)

**Files:**
- Modify: `src/domain/services/portfolio.ts`
- Modify: `src/domain/index.ts`
- Test: `src/domain/services/__tests__/portfolio.i18n.test.ts`

**Interfaces:**
- Consumes: `Locale` (Task 1).
- Produces: `getPortfolioData(locale: Locale): PortfolioData`. The named export `portfolioData` is **removed**; every consumer must call `getPortfolioData(locale)`. Existing tests referencing `portfolioData` are updated in Task 9.

**Implementation approach:** Keep every asset import, tech-stack entry, color, date, `link`, `stacks`, and boolean flag exactly as today, declared once in module scope. Move only translatable text into two parallel content maps keyed by stable id (`en` = the current English strings, `id` = the Indonesian below). `getPortfolioData` assembles the `PortfolioData` object from shared structure + `content[locale]`. Localize the word `Present` in period strings via `.replace('Present', localePresent)`.

- [ ] **Step 1: Write the failing test**

Create `src/domain/services/__tests__/portfolio.i18n.test.ts`:

```ts
import { getPortfolioData } from '../portfolio';

describe('getPortfolioData', () => {
  it('returns Indonesian intro copy for id', () => {
    const data = getPortfolioData('id');
    expect(data.introduction.title[0]).toBe('Hai, saya');
    expect(data.introduction.subtitle).toContain('Android');
    expect(data.introduction.description).toContain('Insinyur');
  });

  it('returns English intro copy for en', () => {
    const data = getPortfolioData('en');
    expect(data.introduction.title[0]).toBe('Hi, I am');
  });

  it('keeps shared structure identical across locales', () => {
    const enData = getPortfolioData('en');
    const idData = getPortfolioData('id');
    expect(idData.projects.length).toBe(enData.projects.length);
    expect(idData.projects[0].id).toBe(enData.projects[0].id);
    expect(idData.projects[0].image).toBe(enData.projects[0].image);
    expect(idData.projects[0].stacks).toEqual(enData.projects[0].stacks);
  });

  it('localizes the word Present in periods for id', () => {
    const idData = getPortfolioData('id');
    const obu = idData.projects.find(p => p.id === 'transjakarta-obu');
    expect(obu?.period).toContain('Sekarang');
    expect(obu?.period).not.toContain('Present');
  });

  it('translates footer contact labels for id', () => {
    const idData = getPortfolioData('id');
    const labels = idData.footer.contacts.map(c => c.label);
    expect(labels).toContain('Unduh Resume');
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `rtk npx jest src/domain/services/__tests__/portfolio.i18n.test.ts --no-coverage`
Expected: FAIL — `getPortfolioData` is not exported.

- [ ] **Step 3: Refactor `src/domain/services/portfolio.ts`**

Keep all existing imports (lines 1–48 of the current file) unchanged. Change the top type import line to also import `Locale`:

```ts
import { PortfolioData } from '@/domain';
import type { Locale } from '@domain/models/i18n.ts';
import {
  calculateDuration,
  getYearsOfExperience,
} from '../valueObjects/dateUtils';
```

Then **replace** the entire `export const portfolioData: PortfolioData = { … };` block (current lines 50–549) with the structure below. This defines: shared structural arrays (unchanged values), an `en`/`id` content map (the `en` values are the current English strings — copy them verbatim from the existing file; the `id` values are given here in full), and the `getPortfolioData` builder.

```ts
// ── Shared, locale-independent structure ──────────────────────────────

const techStack = [
  { name: 'Android', icon: { light: androidIconLight, dark: androidIconDark }, color: '#3DDC84' },
  { name: 'Kotlin', icon: { light: kotlinIconLight, dark: kotlinIconDark }, color: '#7F52FF' },
  { name: 'Java', icon: { light: javaIconLight, dark: javaIconDark }, color: '#ED8B00' },
  { name: 'Flutter', icon: { light: flutterIconLight, dark: flutterIconDark }, color: '#02569B' },
  { name: 'Go', icon: { light: goIconLight, dark: goIconDark }, color: '#00ADD8' },
  { name: 'React', icon: { light: reactIconLight, dark: reactIconDark }, color: '#61DAFB' },
];

// Structural project metadata (no translatable text except via content maps).
const projectMeta = [
  { id: 'transjakarta-obu', period: 'Feb 2026 — Present', logo: transjakartaLogo, image: transjakartaImage, link: '', stacks: ['Android', 'Kotlin'], featured: true, hasGithub: false, githubUrl: '' },
  { id: 'byu-bridging', period: 'Jul 2025 — Jan 2026', logo: byuLogo, image: byuImage, link: 'https://byu.id', stacks: ['Go', 'Fiber', 'Redis', 'Docker', 'Kubernetes'], featured: true, hasGithub: false, githubUrl: '' },
  { id: 'mytelkomsel', period: 'Jul 2023 — Jun 2025', logo: mytelkomselLogo, image: mytelkomselImage, link: 'https://play.google.com/store/apps/details?id=com.telkomsel.telkomselcm', stacks: ['Android', 'Kotlin', 'Java'], featured: true, hasGithub: false, githubUrl: '' },
  { id: 'lifelog', period: 'Jan 2022 — Present', logo: lifelogLogo, image: lifelogImage, link: 'https://play.google.com/store/apps/details?id=com.fakhry.lifelog', stacks: ['Android', 'Kotlin'], featured: false, hasGithub: true, githubUrl: 'https://github.com/fakhrymubarak/LifeLog' },
  { id: 'alkhairaat', period: 'Mar 2023 — Jun 2023', logo: alkhairaatLogo, image: alkhairaatImage, link: 'https://apkpure.com/alkhairaat-app/com.alkhairaat.membership', stacks: ['Android', 'Flutter'], featured: true, hasGithub: false, githubUrl: '' },
  { id: 'chakra-app', period: 'Jan 2022 — Jun 2023', logo: chakraLogo, image: chakraImage, link: 'https://apkpure.com/chakra-rewards/com.kalbe.cakraloyalty', stacks: ['Android', 'Kotlin'], featured: true, hasGithub: false, githubUrl: '' },
  { id: 'hress', period: 'Jan 2022 — Jun 2023', logo: hressLogo, image: hressImage, link: 'https://github.com/fakhrymubarak/shafa-25-birthday', stacks: ['Android', 'Kotlin', 'Java'], featured: false, hasGithub: false, githubUrl: '' },
  { id: 'akuisisi-loyalty', period: 'Jan 2022 — Jun 2023', logo: akuisisiLogo, image: akuisisiImage, link: 'https://play.google.com/store/apps/details?id=com.kalbe.crm.dmqi', stacks: ['Android', 'Kotlin'], featured: false, hasGithub: false, githubUrl: '' },
  { id: 'showcase-v1', period: 'Apr 2025', logo: showcaseV1Logo, image: showcaseV1Image, link: 'https://fakhrymubarak.github.io/showcase-v1/', stacks: ['Flutter', 'Web'], featured: false, hasGithub: true, githubUrl: 'https://github.com/fakhrymubarak/showcase-v1' },
  { id: 'shafa-birthday-25th', period: 'Jan 2025', logo: shafaLogo, image: shafaWebImage, link: 'https://fakhrymubarak.github.io/shafa-25-birthday/', stacks: ['Flutter', 'Web'], featured: false, hasGithub: true, githubUrl: 'https://github.com/fakhrymubarak/shafa-25-birthday' },
];

// Company/experience structural metadata. Titles stay English (see Global Constraints).
// `highlightsKey` links to the localized highlight arrays in the content maps.
const companyMeta = [
  { id: 'transjakarta', name: 'PT Transportasi Jakarta (Transjakarta)', logo: transjakartaLogo,
    experiences: [{ id: 'tj-engineer', title: 'Senior Software Engineer', period: 'Feb 2026 — Present', type: 'full-time' as const }] },
  { id: 'phincon', name: 'PHINCON', logo: phinconLogo,
    experiences: [
      { id: 'byu-exp', title: 'Software Engineer - Backend', period: 'Jul 2025 — Jan 2026', type: 'full-time' as const },
      { id: 'mytelkomsel-exp', title: 'Software Engineer - Android', period: 'Jul 2023 — Jun 2025', type: 'full-time' as const },
    ] },
  { id: 'bangkit', name: 'Bangkit Academy (Google · Tokopedia · Gojek · Traveloka)', logo: bangkitLogo,
    experiences: [{ id: 'bangkit-instructor', title: 'Mobile Development Instructor', period: 'Feb 2024 — Dec 2024', type: 'part-time' as const }] },
  { id: 'crm', name: 'PT Cakra Radha Mustika (Kalbe Group)', logo: crmLogo,
    experiences: [{ id: 'crm-engineer', title: 'Software Engineer - Mobile Apps (Android & iOS)', period: 'Jan 2022 — Jun 2023', type: 'contract' as const }] },
];

// Certificate structural metadata. Titles stay English (see Global Constraints).
const certificateMeta = [
  { type: 'award' as const, certificates: [
    { id: 'tempa-instructor-2026', title: 'Tempa led by Dicoding Instructor', certificateUrl: 'https://drive.google.com/file/d/1D7ccnZBw1xfMwnf4ROZc3u0uz24jGGKD/view?usp=drive_link', credentialId: 'Tempa26/LS/XXVI-7/TP26-MD017', issueDate: '2026-07-17', status: 'active' as const, skills: ['Mentorship', 'Technical Training', 'Mobile Development', 'Flutter', 'Student Guidance', 'Educational Leadership'] },
    { id: 'dicoding-expert-session-speaker', title: 'Dicoding Expert Session Speaker', certificateUrl: 'https://drive.google.com/file/d/14k72at1VwOkw9IQfkNleB6UzeGpuFYL-/view?usp=sharing', credentialId: 'DCD/DES/XXV-08/DCD25-GS13', issueDate: '2025-08-05', status: 'active' as const, skills: ['Public Speaking', 'Career Mentoring', 'Tech Leadership', 'Personal Branding', 'Career Development', 'Professional Networking'] },
    { id: 'bangkit-contributor-2024-batch2', title: 'Bangkit 2024 Batch 2 Instructor', certificateUrl: 'https://drive.google.com/file/d/1i5ZEnaFEtRwLx3tI3wGzKpFIckmlDO3T/view?usp=sharing', credentialId: 'BA24/CTRB/XXV-02/MD24-0267', issueDate: '2025-02-11', status: 'active' as const, skills: ['Mentorship', 'Technical Training', 'Mobile Development', 'Curriculum Development', 'Student Guidance', 'Educational Leadership'] },
    { id: 'bangkit-contributor-2024-batch1', title: 'Bangkit 2024 Batch 1 Instructor', certificateUrl: 'https://drive.google.com/file/d/19_wojNOQ-XnAj-B-QcAFoYsSYQ3Pi0w1/view?usp=sharing', credentialId: 'BA24/CTRB/XXIV-07/MD24-0267', issueDate: '2024-07-24', status: 'active' as const, skills: ['Mentorship', 'Technical Training', 'Mobile Development', 'Curriculum Development', 'Student Guidance', 'Educational Leadership'] },
  ] },
  { type: 'course' as const, certificates: [
    { id: 'dicoding-flutter-expert', title: 'Course: Flutter Expert', certificateUrl: 'https://www.dicoding.com/certificates/72ZDOWVJ9XYW', credentialId: '72ZDOWVJ9XYW', issueDate: '2022-08-30', status: 'active' as const, skills: ['Flutter', 'Dart', 'Clean Architecture', 'TDD', 'BLoC', 'CI/CD', 'Performance', 'Security'] },
    { id: 'dicoding-android-expert', title: 'Course: Android Expert', certificateUrl: 'https://www.dicoding.com/certificates/0LZ03JMENZ65', credentialId: '0LZ03JMENZ65', issueDate: '2021-11-24', status: 'expired' as const, skills: ['Android', 'Kotlin', 'Clean Architecture', 'RxJava', 'Coroutines', 'Dagger', 'Koin', 'Modularization', 'CI/CD', 'Performance', 'Security'] },
    { id: 'dicoding-solid-principles', title: 'Course: Solid Principles', certificateUrl: 'https://www.dicoding.com/certificates/1RXY44NG1PVM', credentialId: '1RXY44NG1PVM', issueDate: '2021-11-24', status: 'active' as const, skills: ['OOP', 'SOLID Principles', 'Software Design', 'Inheritance', 'Encapsulation', 'Abstraction', 'Polymorphism'] },
  ] },
];

const socialMedia = [
  { name: 'Instagram', url: 'https://www.instagram.com/fakhrymubarak', icon: 'instagram' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/fakhrymubarak', icon: 'linkedin' },
  { name: 'GitHub', url: 'https://github.com/fakhrymubarak', icon: 'github' },
  { name: 'YouTube', url: 'https://www.youtube.com/@fakhry.mubarakk', icon: 'youtube' },
];

const contactMeta = [
  { type: 'resume' as const, url: 'https://drive.google.com/file/d/1LFIuiSSoWhdtBmMSRTr3hnLYXM5MgjkX/view', icon: 'download' },
  { type: 'email' as const, url: 'mailto:fakhrymubarak@gmail.com?subject=Work%20Opportunity&body=Hi%20Fakhry,', icon: 'mail' },
  { type: 'whatsapp' as const, url: 'https://api.whatsapp.com/send/?phone=6285155305499&text=Hi%20Fakhry', icon: 'message-circle' },
];

// ── Locale-dependent text ─────────────────────────────────────────────

interface PortfolioContent {
  present: string;
  introTitle: [string, string];
  introSubtitle: string;
  introDescription: string;
  projectDescriptions: Record<string, string>; // keyed by project id
  experienceHighlights: Record<string, string[]>; // keyed by experience id
  certificateDescriptions: Record<string, string>; // keyed by certificate id
  contactLabels: Record<'resume' | 'email' | 'whatsapp', string>;
  footerSignature: string;
}

const enContent: PortfolioContent = {
  present: 'Present',
  introTitle: ['Hi, I am', 'Fakhry Mubarak'],
  introSubtitle: 'Software Engineer specializing in Android Development',
  introDescription:
    `Software Engineer with over ${getYearsOfExperience()} years of professional experience building scalable softwares. ` +
    'Currently working on Transjakarta as Senior Software Engineer, building impactful features for millions of users of Jakarta. ' +
    'Experienced in native Android and Multiplatform Development using Flutter or KMM; Web development using ReactJS; as well as Backend development with Go. ' +
    'Passionate about clean architecture, SOLID principles, and continuous learning, with strong mentoring and leadership abilities. ' +
    'Chasing impact, craftsmanship, and growth. Open for any challenges and opportunities.',
  // projectDescriptions: copy each existing English `description` verbatim from
  // the pre-refactor file, keyed by the project id.
  projectDescriptions: {
    'transjakarta-obu': 'The On-Board Unit (OBU) is an Android application deployed on Transjakarta buses. I developed features including real-time GPS tracking via MQTT to display live bus locations on the Transjakarta App and Google Maps, automated voice announcements triggered by stopping proximity to inform passengers of current and upcoming stops, and integration with the LED units to display the route on the front, back and inside of the bus.',
    'byu-bridging': 'ByU Bridging is a middleware service built with Go Fiber to facilitate API bridging for migrating millions of ByU users. I developed and maintained the application, ensuring seamless data flow between systems during the migration process. I also provided critical on-call support during post-release phases, diagnosing and resolving production incidents to maintain system uptime during user migrations.',
    mytelkomsel: "MyTelkomsel is the official self-care mobile application from Telkomsel, Indonesia's largest cellular provider, with over 100M downloads and ~300K daily active users. I planned, developed, and delivered multiple key features using Kotlin and Java within a clean architecture following SOLID principles. I also led and mentored junior developers, ensuring high code quality and team performance.",
    lifelog: 'LifeLog is a not simple notes app to write a daily note and track your daily mood. Built with MVVM architecture, Room database, and Material Design UI. Features include daily note writing, mood tracking, note tagging, date-based search, and favorite notes.',
    alkhairaat: 'Alkhairaat is a membership app for the Alkhairaat Islamic organization in Indonesia. Built with Flutter & Bloc, I implemented core features, maintained performance consistency, and delivered a user-friendly interface for both Android and iOS.',
    'chakra-app': 'Chakra App is a loyalty membership application for Kalbe Nutritionals users. I migrated 97% of the codebase from Java to Kotlin, refactored from MVP to MVVM, and built a white-label Flutter variant to streamline multi-brand deployments.',
    hress: 'HRESS is an HR management system for Kalbe Group. I developed and maintained the mobile application using Kotlin and Java, implementing features for employee management, attendance tracking, and HR processes.',
    'akuisisi-loyalty': 'Akuisisi Loyalty is a customer acquisition and loyalty management system. I developed mobile features for customer onboarding, loyalty programs, and engagement tracking.',
    'showcase-v1': "My V1 portfolio showcase is a Flutter Web chosen after KMP's alpha web support proved unreliable, with Flutter delivering stable, seamless cross-platform performance.",
    'shafa-birthday-25th': "Shafa's 25th Birthday Web is a heartfelt Flutter Web app built using Dart with Provider + Firebase with featuring interactive, responsive birthday animations and personalized greetings, crafted with 100% love as a surprise gift.",
  },
  // experienceHighlights: copy each existing English `highlights` array verbatim.
  experienceHighlights: {
    'tj-engineer': [
      'Developing features for the On-Board Unit (OBU) Android application deployed on Transjakarta buses.',
      'Implementing real-time GPS tracking via MQTT for live bus monitoring.',
      'Creating automated voice announcement systems based on geolocation stop proximity.',
      'Integrating with LED destination signs across the bus fleet.',
    ],
    'byu-exp': [
      'Maintaining Backend App that using Go Fiber to facilitate API bridging for migrating ByU users.',
      'Enhancing Software Engineering skills by learning Backend using Go Programming Language.',
    ],
    'mytelkomsel-exp': [
      'Crafting Android Application with +100M downloads and ~6M daily active users.',
      'Plan, develop, and build features with SOLID principles with a modular clean architecture using MVVM.',
      'Defined story point estimations in Agile sprint planning and collaborated with Scrum Master, PM, QA and backend teams.',
      'Conducting code reviews, mentoring juniors, and leading feature development.',
      'Collaborating with cross-functional teams in Agile environment.',
      'Proactively initiated improvements in legacy code and resolved technical debt across multiple modules.',
      'Handle SDK integrations (Firebase SDK, AyoLari SDK, etc.)',
      'Performed Unit Testing using Junit.',
    ],
    'bangkit-instructor': [
      'Led ILT sessions on Android development for the Bangkit cohort',
    ],
    'crm-engineer': [
      'Migrating Chakra android app data source from vendor server to CRM server (~80 API endpoint)',
      'Migrating app architecture pattern from MVP to MVVM.',
      'Migrating source code language from 100% Java to 97% Kotlin.',
      'Crafting Flutter variant of Chakra Rewards to be Released on Apple App Store',
      'Delivered full-stack Android features (UI to data layers) for multiple loyalty and HR apps',
      'Built and maintained robust mobile architectures supporting long-term scalability.',
      'Integrated REST APIs, sockets, push notifications, and handled multi-threading workflows.',
      'Developed Chakra Rewards and HRESS app with high uptime and responsive UI.',
      'Used design patterns (MVVM, Repository, DI) and maintained excellent code hygiene.',
    ],
  },
  // certificateDescriptions: copy each existing English `description` verbatim.
  certificateDescriptions: {
    'tempa-instructor-2026': "Awarded for outstanding dedication and commitment as an Instructor at Tempa led by Dicoding, sharing insights and expertise with program participants. Tempa is Dicoding's intensive bootcamp that strengthens fundamental tech skills for Indonesian university students across three learning paths - Artificial Intelligence, Web Development, and Mobile Development - through 900+ hours of expert-led sessions, code reviews, and capstone projects. Through the collective effort of all contributors, the program achieved a 92% graduation rate.",
    'dicoding-expert-session-speaker': 'Recognized as a speaker at Dicoding Expert Session 2025, presenting "From Learner to Leader: Navigating Your Tech Career Path" to ~200 participants from Dicoding Bootcamp Batch 8 and BEKUP Create 2025. Shared insights on tech career mapping, skill development beyond bootcamp, personal branding, and job hunting strategies.',
    'bangkit-contributor-2024-batch2': 'Awarded for outstanding dedication and commitment as a Contributor at Bangkit 2024 Batch 2, sharing expertise and skills with students. Bangkit is designed to prepare students with in-demand skills and tech certifications, offering 3 interdisciplinary learning paths - machine learning, mobile development, and cloud computing. Led by Google, GoTo, Tokopedia, and Traveloka, supported by the Ministry of Education, Culture, Research, and Technology of Indonesia.',
    'bangkit-contributor-2024-batch1': 'Awarded for outstanding dedication and commitment as a Contributor at Bangkit 2024 Batch 1, sharing expertise and skills with students. Bangkit is designed to prepare students with in-demand skills and tech certifications, offering 3 interdisciplinary learning paths - machine learning, mobile development, and cloud computing. Led by Google, GoTo, Tokopedia, and Traveloka, supported by the Ministry of Education, Culture, Research, and Technology of Indonesia.',
    'dicoding-flutter-expert': 'Advanced Flutter development course covering Clean Architecture, TDD, Advanced UI, Modularization, Reactive Programming with BLoC, CI/CD, Performance optimization, Security, and Post-Development practices. Completed 70-hour comprehensive program with final project submission.',
    'dicoding-android-expert': 'Advanced Android development course covering Clean Architecture, Reactive Programming with RxJava & Coroutines, Dependency Injection (Dagger/Koin), Modularization, CI/CD, Performance optimization, Security, and industry-standard libraries. Completed 90-hour comprehensive program with capstone project submission.',
    'dicoding-solid-principles': 'Object-Oriented Programming fundamentals course covering OOP pillars (Inheritance, Encapsulation, Abstraction, Polymorphism), object relationships, software design principles, and SOLID principles (Single Responsibility, Open Closed, Liskov Substitution, Interface Segregation, Dependency Inversion). Completed 15-hour program with final exam.',
  },
  contactLabels: { resume: 'Download Resume', email: 'Write Email', whatsapp: 'WhatsApp' },
  footerSignature: '© Crafted by Fakhry Mubarak in 2025',
};

const idContent: PortfolioContent = {
  present: 'Sekarang',
  introTitle: ['Hai, saya', 'Fakhry Mubarak'],
  introSubtitle: 'Software Engineer yang berfokus pada Pengembangan Android',
  introDescription:
    `Insinyur Perangkat Lunak dengan pengalaman profesional lebih dari ${getYearsOfExperience()} tahun membangun perangkat lunak yang skalabel. ` +
    'Saat ini bekerja di Transjakarta sebagai Senior Software Engineer, membangun fitur berdampak bagi jutaan pengguna di Jakarta. ' +
    'Berpengalaman dalam pengembangan Android native dan Multiplatform menggunakan Flutter atau KMM; pengembangan Web dengan ReactJS; serta pengembangan Backend dengan Go. ' +
    'Antusias pada clean architecture, prinsip SOLID, dan pembelajaran berkelanjutan, dengan kemampuan mentoring dan kepemimpinan yang kuat. ' +
    'Mengejar dampak, kualitas, dan pertumbuhan. Terbuka untuk setiap tantangan dan peluang.',
  projectDescriptions: {
    'transjakarta-obu': 'On-Board Unit (OBU) adalah aplikasi Android yang terpasang di bus Transjakarta. Saya mengembangkan berbagai fitur, termasuk pelacakan GPS real-time melalui MQTT untuk menampilkan lokasi bus secara langsung di Aplikasi Transjakarta dan Google Maps, pengumuman suara otomatis yang terpicu oleh kedekatan dengan halte untuk memberi tahu penumpang tentang halte saat ini dan berikutnya, serta integrasi dengan unit LED untuk menampilkan rute di bagian depan, belakang, dan dalam bus.',
    'byu-bridging': 'ByU Bridging adalah layanan middleware yang dibangun dengan Go Fiber untuk memfasilitasi bridging API dalam migrasi jutaan pengguna ByU. Saya mengembangkan dan memelihara aplikasi ini, memastikan aliran data yang mulus antar sistem selama proses migrasi. Saya juga memberikan dukungan on-call yang krusial pada fase pasca-rilis, mendiagnosis dan menyelesaikan insiden produksi untuk menjaga ketersediaan sistem selama migrasi pengguna.',
    mytelkomsel: 'MyTelkomsel adalah aplikasi self-care resmi dari Telkomsel, penyedia seluler terbesar di Indonesia, dengan lebih dari 100 juta unduhan dan ~300 ribu pengguna aktif harian. Saya merencanakan, mengembangkan, dan merilis beberapa fitur utama menggunakan Kotlin dan Java dalam clean architecture yang mengikuti prinsip SOLID. Saya juga memimpin dan membimbing developer junior, memastikan kualitas kode dan performa tim yang tinggi.',
    lifelog: 'LifeLog adalah aplikasi catatan yang tidak sederhana untuk menulis catatan harian dan melacak suasana hati harian Anda. Dibangun dengan arsitektur MVVM, database Room, dan UI Material Design. Fiturnya mencakup penulisan catatan harian, pelacakan suasana hati, pemberian tag catatan, pencarian berdasarkan tanggal, dan catatan favorit.',
    alkhairaat: 'Alkhairaat adalah aplikasi keanggotaan untuk organisasi Islam Alkhairaat di Indonesia. Dibangun dengan Flutter & Bloc, saya mengimplementasikan fitur inti, menjaga konsistensi performa, dan menghadirkan antarmuka yang ramah pengguna untuk Android maupun iOS.',
    'chakra-app': 'Chakra App adalah aplikasi keanggotaan loyalitas untuk pengguna Kalbe Nutritionals. Saya memigrasikan 97% basis kode dari Java ke Kotlin, melakukan refactor dari MVP ke MVVM, dan membangun varian white-label berbasis Flutter untuk menyederhanakan deployment multi-merek.',
    hress: 'HRESS adalah sistem manajemen SDM untuk Kalbe Group. Saya mengembangkan dan memelihara aplikasi mobile menggunakan Kotlin dan Java, mengimplementasikan fitur untuk manajemen karyawan, pelacakan kehadiran, dan proses SDM.',
    'akuisisi-loyalty': 'Akuisisi Loyalty adalah sistem akuisisi pelanggan dan manajemen loyalitas. Saya mengembangkan fitur mobile untuk onboarding pelanggan, program loyalitas, dan pelacakan keterlibatan.',
    'showcase-v1': 'Portofolio V1 saya dibangun dengan Flutter Web, dipilih setelah dukungan web alpha KMP terbukti kurang stabil, sementara Flutter memberikan performa lintas platform yang stabil dan mulus.',
    'shafa-birthday-25th': 'Web Ulang Tahun ke-25 Shafa adalah aplikasi Flutter Web yang penuh makna, dibangun dengan Dart menggunakan Provider + Firebase, menampilkan animasi ulang tahun yang interaktif dan responsif serta ucapan yang dipersonalisasi, dibuat dengan sepenuh hati sebagai hadiah kejutan.',
  },
  experienceHighlights: {
    'tj-engineer': [
      'Mengembangkan fitur untuk aplikasi Android On-Board Unit (OBU) yang terpasang di bus Transjakarta.',
      'Mengimplementasikan pelacakan GPS real-time melalui MQTT untuk pemantauan bus secara langsung.',
      'Membangun sistem pengumuman suara otomatis berdasarkan kedekatan lokasi dengan halte.',
      'Mengintegrasikan papan tujuan LED di seluruh armada bus.',
    ],
    'byu-exp': [
      'Memelihara aplikasi Backend yang menggunakan Go Fiber untuk memfasilitasi bridging API dalam migrasi pengguna ByU.',
      'Meningkatkan keterampilan Software Engineering dengan mempelajari Backend menggunakan bahasa pemrograman Go.',
    ],
    'mytelkomsel-exp': [
      'Membangun aplikasi Android dengan +100 juta unduhan dan ~6 juta pengguna aktif harian.',
      'Merencanakan, mengembangkan, dan membangun fitur dengan prinsip SOLID serta clean architecture modular menggunakan MVVM.',
      'Menentukan estimasi story point dalam perencanaan sprint Agile dan berkolaborasi dengan Scrum Master, PM, QA, dan tim backend.',
      'Melakukan code review, membimbing junior, dan memimpin pengembangan fitur.',
      'Berkolaborasi dengan tim lintas fungsi dalam lingkungan Agile.',
      'Secara proaktif menginisiasi perbaikan pada kode lama dan menyelesaikan technical debt di berbagai modul.',
      'Menangani integrasi SDK (Firebase SDK, AyoLari SDK, dll.)',
      'Melakukan Unit Testing menggunakan JUnit.',
    ],
    'bangkit-instructor': [
      'Memimpin sesi ILT tentang pengembangan Android untuk angkatan Bangkit',
    ],
    'crm-engineer': [
      'Memigrasikan sumber data aplikasi Android Chakra dari server vendor ke server CRM (~80 endpoint API)',
      'Memigrasikan pola arsitektur aplikasi dari MVP ke MVVM.',
      'Memigrasikan bahasa kode sumber dari 100% Java menjadi 97% Kotlin.',
      'Membangun varian Flutter dari Chakra Rewards untuk dirilis di Apple App Store',
      'Menghadirkan fitur Android full-stack (dari lapisan UI hingga data) untuk beberapa aplikasi loyalitas dan SDM',
      'Membangun dan memelihara arsitektur mobile yang tangguh untuk skalabilitas jangka panjang.',
      'Mengintegrasikan REST API, socket, push notification, dan menangani alur multi-threading.',
      'Mengembangkan aplikasi Chakra Rewards dan HRESS dengan ketersediaan tinggi serta UI yang responsif.',
      'Menggunakan design pattern (MVVM, Repository, DI) dan menjaga kebersihan kode dengan baik.',
    ],
  },
  certificateDescriptions: {
    'tempa-instructor-2026': 'Penghargaan atas dedikasi dan komitmen luar biasa sebagai Instruktur di Tempa yang dipimpin oleh Dicoding, berbagi wawasan dan keahlian dengan peserta program. Tempa adalah bootcamp intensif Dicoding yang memperkuat keterampilan teknologi fundamental bagi mahasiswa Indonesia melalui tiga jalur pembelajaran - Artificial Intelligence, Web Development, dan Mobile Development - lewat 900+ jam sesi bersama pakar, code review, dan proyek capstone. Berkat upaya bersama seluruh kontributor, program ini mencapai tingkat kelulusan 92%.',
    'dicoding-expert-session-speaker': 'Diakui sebagai pembicara di Dicoding Expert Session 2025, membawakan "From Learner to Leader: Navigating Your Tech Career Path" kepada ~200 peserta dari Dicoding Bootcamp Batch 8 dan BEKUP Create 2025. Berbagi wawasan tentang pemetaan karier teknologi, pengembangan keterampilan setelah bootcamp, personal branding, dan strategi mencari kerja.',
    'bangkit-contributor-2024-batch2': 'Penghargaan atas dedikasi dan komitmen luar biasa sebagai Kontributor di Bangkit 2024 Batch 2, berbagi keahlian dan keterampilan dengan para peserta. Bangkit dirancang untuk membekali peserta dengan keterampilan yang dibutuhkan industri dan sertifikasi teknologi, menawarkan 3 jalur pembelajaran lintas disiplin - machine learning, mobile development, dan cloud computing. Dipimpin oleh Google, GoTo, Tokopedia, dan Traveloka, didukung oleh Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia.',
    'bangkit-contributor-2024-batch1': 'Penghargaan atas dedikasi dan komitmen luar biasa sebagai Kontributor di Bangkit 2024 Batch 1, berbagi keahlian dan keterampilan dengan para peserta. Bangkit dirancang untuk membekali peserta dengan keterampilan yang dibutuhkan industri dan sertifikasi teknologi, menawarkan 3 jalur pembelajaran lintas disiplin - machine learning, mobile development, dan cloud computing. Dipimpin oleh Google, GoTo, Tokopedia, dan Traveloka, didukung oleh Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia.',
    'dicoding-flutter-expert': 'Kursus pengembangan Flutter tingkat lanjut yang mencakup Clean Architecture, TDD, Advanced UI, Modularisasi, Reactive Programming dengan BLoC, CI/CD, optimasi Performa, Keamanan, dan praktik Post-Development. Menyelesaikan program komprehensif 70 jam dengan pengumpulan proyek akhir.',
    'dicoding-android-expert': 'Kursus pengembangan Android tingkat lanjut yang mencakup Clean Architecture, Reactive Programming dengan RxJava & Coroutines, Dependency Injection (Dagger/Koin), Modularisasi, CI/CD, optimasi Performa, Keamanan, dan pustaka standar industri. Menyelesaikan program komprehensif 90 jam dengan pengumpulan proyek capstone.',
    'dicoding-solid-principles': 'Kursus dasar Object-Oriented Programming yang mencakup pilar OOP (Inheritance, Encapsulation, Abstraction, Polymorphism), relasi antar objek, prinsip desain perangkat lunak, dan prinsip SOLID (Single Responsibility, Open Closed, Liskov Substitution, Interface Segregation, Dependency Inversion). Menyelesaikan program 15 jam dengan ujian akhir.',
  },
  contactLabels: { resume: 'Unduh Resume', email: 'Tulis Email', whatsapp: 'WhatsApp' },
  footerSignature: '© Dibuat oleh Fakhry Mubarak pada 2025',
};

const content: Record<Locale, PortfolioContent> = { id: idContent, en: enContent };

// ── Builder ───────────────────────────────────────────────────────────

export const getPortfolioData = (locale: Locale): PortfolioData => {
  const c = content[locale];
  const localizePeriod = (period: string): string =>
    period.replace('Present', c.present);

  return {
    introduction: {
      title: c.introTitle,
      subtitle: c.introSubtitle,
      description: c.introDescription,
      imagePath: avatarImage,
      techStack,
    },
    projects: projectMeta.map(p => ({
      id: p.id,
      title: p.id, // replaced below
      period: localizePeriod(p.period),
      logo: p.logo,
      image: p.image,
      description: c.projectDescriptions[p.id],
      link: p.link,
      stacks: p.stacks,
      featured: p.featured,
      hasGithub: p.hasGithub,
      githubUrl: p.githubUrl,
    })).map(p => ({ ...p, title: PROJECT_TITLES[p.id] })),
    companies: companyMeta.map(company => ({
      id: company.id,
      name: company.name,
      logo: company.logo,
      experiences: company.experiences.map(exp => ({
        id: exp.id,
        title: exp.title,
        period: localizePeriod(exp.period),
        duration: calculateDuration(exp.period),
        type: exp.type,
        highlights: c.experienceHighlights[exp.id],
      })),
    })),
    certificateCategories: certificateMeta.map(cat => ({
      type: cat.type,
      certificates: cat.certificates.map(cert => ({
        id: cert.id,
        title: cert.title,
        description: c.certificateDescriptions[cert.id],
        certificateUrl: cert.certificateUrl,
        credentialId: cert.credentialId,
        issueDate: cert.issueDate,
        status: cert.status,
        skills: cert.skills,
      })),
    })),
    footer: {
      socialMedia,
      contacts: contactMeta.map(contact => ({
        type: contact.type,
        label: c.contactLabels[contact.type],
        url: contact.url,
        icon: contact.icon,
      })),
      signature: c.footerSignature,
      contactImage: footerAvatarImage,
    },
  };
};

// Project display titles (proper nouns — English in both locales, see Global Constraints).
const PROJECT_TITLES: Record<string, string> = {
  'transjakarta-obu': 'OBU - On-Board Unit Transjakarta',
  'byu-bridging': 'Byu Bridging',
  mytelkomsel: 'MyTelkomsel',
  lifelog: 'LifeLog',
  alkhairaat: 'Alkhairaat',
  'chakra-app': 'Chakra App',
  hress: 'HRESS',
  'akuisisi-loyalty': 'Akuisisi Loyalty',
  'showcase-v1': 'V1 of This Site',
  'shafa-birthday-25th': 'Shafa Birthday Web',
};
```

> Implementation note: `PROJECT_TITLES` is referenced in the builder; declare it at module scope (hoisting via `const` requires it to appear before first call at runtime — since `getPortfolioData` is only invoked later by consumers, placing `PROJECT_TITLES` anywhere at module top-level is fine, but to avoid TDZ confusion put the `PROJECT_TITLES` declaration ABOVE `getPortfolioData`). Simpler alternative the implementer may prefer: fold titles directly into `projectMeta` as a `title` field (English) and drop `PROJECT_TITLES` + the trailing `.map`. Either is acceptable; keep the shared-structure principle.

- [ ] **Step 4: Update the domain barrel**

Modify `src/domain/index.ts`. The line `export * from './services/portfolio';` now re-exports `getPortfolioData` instead of `portfolioData` automatically — no edit needed unless a named export elsewhere referenced `portfolioData`. Verify with:

Run: `rtk grep -rn "portfolioData" src --include=*.ts --include=*.tsx`
Expected: matches only in test files (fixed in Task 9) and the new `getPortfolioData` definition/usages. If any non-test source still imports the old `portfolioData`, it will be migrated in Task 5.

- [ ] **Step 5: Run the test to verify it passes**

Run: `rtk npx jest src/domain/services/__tests__/portfolio.i18n.test.ts --no-coverage`
Expected: PASS (5 tests).

- [ ] **Step 6: Type-check**

Run: `rtk npm run type-check`
Expected: errors ONLY in the five content hooks (Task 5) and any test importing `portfolioData` (Task 9), because `portfolioData` no longer exists. That is expected at this checkpoint; proceed to Task 5.

- [ ] **Step 7: Commit**

```bash
rtk git add src/domain/services/portfolio.ts src/domain/index.ts src/domain/services/__tests__/portfolio.i18n.test.ts
rtk git commit -m "feat(i18n): localize portfolio content via getPortfolioData(locale)"
```

---

## Task 5: Make content hooks locale-aware

**Files:**
- Modify: `src/presentation/hooks/useIntro.ts`
- Modify: `src/presentation/hooks/useProjects.ts`
- Modify: `src/presentation/hooks/useExperience.ts`
- Modify: `src/presentation/hooks/useCertificates.ts`
- Modify: `src/presentation/hooks/useFooter.ts`

**Interfaces:**
- Consumes: `getPortfolioData` (Task 4), `useLanguage` (Task 2).
- Produces: unchanged hook return shapes; content now reflects the active locale.

For EACH of the five hooks, apply the same three edits:

1. Replace `import { portfolioData } from '@domain/services/portfolio';` with `import { getPortfolioData } from '@domain/services/portfolio';`.
2. Add `import { useLanguage } from './useLanguage';` (or from `@/presentation`).
3. Read the locale and thread it into the memo:

```ts
  const { language } = useLanguage();
  const uiData = useMemo(
    () => mapPortfolioData(getPortfolioData(language)),
    [language]
  );
```

- [ ] **Step 1: Edit `useIntro.ts`**

```ts
import { useMemo } from 'react';
import { getPortfolioData } from '@domain/services/portfolio';
import { mapPortfolioData } from '@presentation/utils/dataMapper';
import { useLanguage } from './useLanguage';
import type { UIIntroState } from '@presentation/models';

export const useIntro = (): UIIntroState => {
  const { language } = useLanguage();
  const uiData = useMemo(
    () => mapPortfolioData(getPortfolioData(language)),
    [language]
  );
  const { introduction } = uiData;

  return {
    introduction,
  };
};
```

- [ ] **Step 2: Edit `useProjects.ts`**

Change the imports (add `useLanguage`, swap `portfolioData` → `getPortfolioData`) and replace line 16:

```ts
  const { language } = useLanguage();
  // Map domain data to UI data
  const uiData = useMemo(
    () => mapPortfolioData(getPortfolioData(language)),
    [language]
  );
```

Leave all other logic (filters, handlers, `MAX_PROJECTS`) untouched.

- [ ] **Step 3: Edit `useExperience.ts`, `useCertificates.ts`, `useFooter.ts`**

Apply the identical pattern: swap the import to `getPortfolioData`, add `useLanguage`, read `language`, and change the `useMemo(() => mapPortfolioData(portfolioData), [])` call to `useMemo(() => mapPortfolioData(getPortfolioData(language)), [language])`. Preserve each hook's remaining state/handlers verbatim.

- [ ] **Step 4: Type-check**

Run: `rtk npm run type-check`
Expected: no errors from `src/` except test files still importing `portfolioData` (fixed in Task 9).

- [ ] **Step 5: Run the content-hook tests**

Run: `rtk npx jest src/presentation/hooks --no-coverage`
Expected: PASS (hooks resolve; provider supplied via existing test wrappers or renderHook wrappers).

- [ ] **Step 6: Commit**

```bash
rtk git add src/presentation/hooks/useIntro.ts src/presentation/hooks/useProjects.ts src/presentation/hooks/useExperience.ts src/presentation/hooks/useCertificates.ts src/presentation/hooks/useFooter.ts
rtk git commit -m "feat(i18n): make content hooks locale-aware"
```

---

## Task 6: Header language switch + localized nav

**Files:**
- Modify: `src/presentation/components/Header.tsx`
- Test: `src/presentation/components/__tests__/Header.i18n.test.tsx`

**Interfaces:**
- Consumes: `useLanguage`, `useTranslations`, `useAnalytics`.
- Produces: a language-switch button with `data-testid="language-toggle"` that calls `toggleLanguage()` and `trackButtonClick('language_toggle', 'header')`.

- [ ] **Step 1: Write the failing test**

Create `src/presentation/components/__tests__/Header.i18n.test.tsx`:

```tsx
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Header from '../Header';
import { LanguageProvider } from '@application/store/LanguageContext.tsx';
import { ThemeProvider } from '@application/store/ThemeContext.tsx';

jest.mock('@/presentation', () => {
  const actual = jest.requireActual('@/presentation');
  return { ...actual, useAnalytics: () => ({ trackButtonClick: jest.fn() }) };
});

const renderHeader = (lang: 'id' | 'en') =>
  render(
    <LanguageProvider initialLanguage={lang}>
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    </LanguageProvider>
  );

describe('Header i18n', () => {
  beforeEach(() => localStorage.clear());

  it('shows Indonesian nav labels under id', () => {
    renderHeader('id');
    expect(screen.getAllByText('Beranda').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Proyek').length).toBeGreaterThan(0);
  });

  it('language toggle switches nav labels to English', () => {
    renderHeader('id');
    act(() => screen.getByTestId('language-toggle').click());
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `rtk npx jest src/presentation/components/__tests__/Header.i18n.test.tsx --no-coverage`
Expected: FAIL — no `language-toggle` element / labels are English.

- [ ] **Step 3: Localize nav items and add the switch**

In `src/presentation/components/Header.tsx`:

Add hooks near the top of the component:

```tsx
  const { toggleLanguage } = useLanguage();
  const t = useTranslations();
```

Add the imports (extend the existing `@/presentation` import and lucide import):

```tsx
import { useTheme, useLanguage, useTranslations } from '@/presentation';
```

Replace the hardcoded `navItems` array with localized labels (keep the same `href` anchors):

```tsx
  const navItems = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.experience, href: '#experience' },
    { name: t.nav.articles, href: '#articles' },
    { name: t.nav.contact, href: '#contact' },
  ];
```

Note: `scrollToSection` uses `navName` for analytics + announce; it will now pass a localized name. That is acceptable (announcement should be localized). Analytics `nav_${navName.toLowerCase()}` will vary by language — if stable analytics keys are required, pass a separate stable key; for this task keep it simple and use the localized name.

Add a language-switch handler beside `handleThemeToggle`:

```tsx
  const handleLanguageToggle = () => {
    trackButtonClick('language_toggle', 'header');
    toggleLanguage();
    accessibilityUtils.announce(t.a11y.languageSwitchedTo);
  };
```

Insert the switch button in the right-hand control group, immediately BEFORE the theme-toggle `<button>` (so order is: language, theme, mobile-menu):

```tsx
            {/* Language Toggle */}
            <button
              data-testid="language-toggle"
              onClick={handleLanguageToggle}
              className="flex items-center gap-1.5 px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-lg bg-light-surface dark:bg-dark-surface hover:bg-light-surface/80 dark:hover:bg-dark-surface/80 transition-all duration-200 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary-coral focus:ring-offset-2 hover:scale-105"
              aria-label={t.a11y.switchToLanguage}
            >
              <span aria-hidden="true" className="text-base leading-none">
                {t.language.flag}
              </span>
              <span className="text-xs font-semibold text-light-muted dark:text-dark-muted">
                {t.language.switchLabel}
              </span>
            </button>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `rtk npx jest src/presentation/components/__tests__/Header.i18n.test.tsx --no-coverage`
Expected: PASS.

- [ ] **Step 5: Run the existing Header test**

Run: `rtk npx jest src/presentation/components/__tests__/Header.test.tsx --no-coverage`
Expected: PASS. If it asserted English nav literals with a provider defaulting to `id`, it renders under `AllTheProviders` (English) — should still pass. If it renders `<Header/>` without providers, wrap it in `AllTheProviders` or add `LanguageProvider initialLanguage="en"`.

- [ ] **Step 6: Commit**

```bash
rtk git add src/presentation/components/Header.tsx src/presentation/components/__tests__/Header.i18n.test.tsx
rtk git commit -m "feat(i18n): add language switch and localized nav to header"
```

---

## Task 7: Localize section components

**Files:**
- Modify: `src/presentation/components/sections/IntroSection.tsx`
- Modify: `src/presentation/components/sections/ProjectsSection.tsx`
- Modify: `src/presentation/components/sections/MediumSection.tsx`
- Modify: `src/presentation/components/sections/ExperienceSection.tsx`
- Modify: `src/presentation/components/sections/CertificatesSection.tsx`
- Modify: `src/presentation/components/sections/FooterSection.tsx`

**Interfaces:**
- Consumes: `useTranslations` (Task 3).

For each file: add `const t = useTranslations();` inside the component and import it via `@/presentation`, then replace the literals per the mapping. Do not touch `className`, hrefs, analytics keys, or `id`/`role`/`aria-label` region names that are structural anchors.

- [ ] **Step 1: IntroSection** — add `useTranslations` to the existing `@/presentation` import; `const t = useTranslations();`. Replace:
  - `Experience` → `{t.intro.experienceLabel}`
  - `+{yearsOfExperience} yrs` → `+{yearsOfExperience} {t.intro.yearsUnit}`
  - `Shipped` → `{t.intro.shippedLabel}`
  - `+{projects.length} projects` → `+{projects.length} {t.intro.projectsUnit}`
  - `Tech Stack` → `{t.intro.techStack}`

- [ ] **Step 2: ProjectsSection** — replace:
  - `Selected work` → `{t.projects.eyebrow}`
  - `Projects` (h2) → `{t.projects.heading}`
  - the body paragraph → `{t.projects.body}`
  - `Filter Projects` → `{t.projects.filter}`
  - `{showAllProjects ? 'Show Less' : 'See More'}` → `{showAllProjects ? t.projects.showLess : t.projects.seeMore}`

- [ ] **Step 3: MediumSection** — replace:
  - `Writing` → `{t.articles.eyebrow}`
  - `Articles` (h2) → `{t.articles.heading}`
  - body paragraph → `{t.articles.body}`
  - `Filter Articles` → `{t.articles.filter}`
  - `View All on Medium` → `{t.articles.viewAll}`
  - `Unable to load articles at the moment.` → `{t.articles.unableToLoad}`
  - `Loading Medium articles` (sr-only) → `{t.articles.loading}`
  - `{showAllArticles ? 'Show Less' : 'See More Articles'}` → `{showAllArticles ? t.articles.showLess : t.articles.seeMore}`

- [ ] **Step 4: ExperienceSection** — replace:
  - `Career` → `{t.experience.eyebrow}`
  - `Experiences` (h2) → `{t.experience.heading}`
  - body paragraph → `{t.experience.body}`
  - `Key Achievements:` → `{t.experience.keyAchievements}`
  - the type badge `{company.experiences[0].type}` → `{t.experience.types[company.experiences[0].type]}`

- [ ] **Step 5: CertificatesSection** — replace:
  - `Credentials` → `{t.certificates.eyebrow}`
  - `Certificates & Awards` → `{t.certificates.heading}`
  - body paragraph → `{t.certificates.body}`
  - `Filter Certificates` → `{t.certificates.filter}`
  - `{showAllCertificates ? 'Show Less' : 'See More'}` → `{showAllCertificates ? t.certificates.showLess : t.certificates.seeMore}`

- [ ] **Step 6: FooterSection** — replace:
  - `Get in Touch` → `{t.footer.getInTouch}`
  - the intro paragraph → `{t.footer.getInTouchBody}`
  - `Let's Connect` → `{t.footer.letsConnect}`
  - the connect paragraph → `{t.footer.letsConnectBody}`
  - `Follow Me` → `{t.footer.followMe}`
  - (`footer.signature` is already localized via portfolio content — leave the `{footer.signature} - {year}` expression as-is.)

- [ ] **Step 7: Type-check + run section tests**

Run: `rtk npm run type-check`
Then: `rtk npx jest src/presentation/components/sections --no-coverage`
Expected: type-check clean. Section tests that assert English literals render under `AllTheProviders` (English default) — should pass. Fix any test that renders a section WITHOUT providers by wrapping it in `AllTheProviders`.

- [ ] **Step 8: Commit**

```bash
rtk git add src/presentation/components/sections/IntroSection.tsx src/presentation/components/sections/ProjectsSection.tsx src/presentation/components/sections/MediumSection.tsx src/presentation/components/sections/ExperienceSection.tsx src/presentation/components/sections/CertificatesSection.tsx src/presentation/components/sections/FooterSection.tsx
rtk git commit -m "feat(i18n): localize section chrome strings"
```

---

## Task 8: Localize sub-components (cards, modals, filters)

**Files:**
- Modify: `src/presentation/components/sections/project/ProjectCard.tsx`
- Modify: `src/presentation/components/sections/project/ProjectModal.tsx`
- Modify: `src/presentation/components/sections/project/ProjectFilter.tsx`
- Modify: `src/presentation/components/sections/medium/MediumCard.tsx`
- Modify: `src/presentation/components/sections/medium/MediumModal.tsx`
- Modify: `src/presentation/components/sections/medium/MediumFilter.tsx`
- Modify: `src/presentation/components/sections/certificate/CertificateCard.tsx`
- Modify: `src/presentation/components/sections/certificate/CertificateModal.tsx`
- Modify: `src/presentation/components/sections/certificate/CertificateFilter.tsx`

**Interfaces:**
- Consumes: `useTranslations` (Task 3).

For each file, add `const t = useTranslations();` and replace literals per mapping. Leave data-derived filter chip values (skill names, tech-stack names, raw `status`/`type` filter values echoed from data) as-is — only static labels and the fixed Active/Expired badge get localized.

- [ ] **Step 1: ProjectCard.tsx** — `View Project` → `{t.projects.viewProject}`.
- [ ] **Step 2: ProjectModal.tsx** — `Description` → `{t.projects.modalDescription}`; `Tech Stack` → `{t.projects.modalTechStack}`; `View Project` → `{t.projects.viewProject}`.
- [ ] **Step 3: ProjectFilter.tsx** — `All Projects` → `{t.projects.all}`.
- [ ] **Step 4: MediumCard.tsx** — `'Summary unavailable'` → `t.articles.summaryUnavailable`; `View on Medium` → `{t.articles.viewOnMedium}`. Also change the date formatter locale: `new Date(dateString).toLocaleDateString(...)` — replace the hardcoded `'en-US'` with a locale derived from language: add `const { language } = useLanguage();` and use `language === 'id' ? 'id-ID' : 'en-US'`.
- [ ] **Step 5: MediumModal.tsx** — `'Summary unavailable'` → `t.articles.summaryUnavailable`; `Read the full article on Medium` → `{t.articles.readFullArticle}`; `Read on Medium` → `{t.articles.readOnMedium}`. Apply the same `toLocaleDateString` locale change as Step 4.
- [ ] **Step 6: MediumFilter.tsx** — the `<h3>` `Filter Articles` → `{t.articles.filterHeading}`; `'All Articles'` → `t.articles.all` (the `filter === 'all' ? 'All Articles' : filter` expression).
- [ ] **Step 7: CertificateCard.tsx** — `{certificate.status === 'active' ? 'Active' : 'Expired'}` → `{certificate.status === 'active' ? t.certificates.active : t.certificates.expired}`; `View Certificate` → `{t.certificates.viewCertificate}`.
- [ ] **Step 8: CertificateModal.tsx** — `Description` → `{t.certificates.description}`; `Issue Date` → `{t.certificates.issueDate}`; `Credential ID` → `{t.certificates.credentialId}`; `Status` → `{t.certificates.status}`; `Skills & Technologies` → `{t.certificates.skills}`; `{... ? 'Active' : 'Expired'}` → `{... ? t.certificates.active : t.certificates.expired}`; `View Certificate` → `{t.certificates.viewCertificate}`.
- [ ] **Step 9: CertificateFilter.tsx** — `Filter by Status` → `{t.certificates.filterByStatus}`; `Filter by Type` → `{t.certificates.filterByType}`; `Filter by Skills` → `{t.certificates.filterBySkills}`; `All Status` → `{t.certificates.allStatus}`; `All Types` → `{t.certificates.allTypes}`; `All Skills` → `{t.certificates.allSkills}`.

- [ ] **Step 10: Type-check + run sub-component tests**

Run: `rtk npm run type-check`
Then: `rtk npx jest src/presentation/components/sections --no-coverage`
Expected: type-check clean; sub-component tests pass under `AllTheProviders` (English). Fix any test rendering a sub-component without providers by wrapping in `AllTheProviders`.

- [ ] **Step 11: Commit**

```bash
rtk git add src/presentation/components/sections/project src/presentation/components/sections/medium src/presentation/components/sections/certificate
rtk git commit -m "feat(i18n): localize card/modal/filter sub-components"
```

---

## Task 9: SEO localization, index.html, and existing-test fixups

**Files:**
- Modify: `src/presentation/components/SEO.tsx`
- Modify: `index.html`
- Modify: any remaining test importing `portfolioData` (from Task 4 grep)
- Test: existing suites re-run green

**Interfaces:**
- Consumes: `useLanguage`, `useTranslations`.

- [ ] **Step 1: Localize SEO**

In `src/presentation/components/SEO.tsx`:
- Add `import { useLanguage, useTranslations } from '@/presentation';` and inside the component `const { language } = useLanguage(); const t = useTranslations();`.
- Remove the default English `description`/`title` prop defaults that hardcode English prose, OR keep them but override: since `seoDescription`/`seoTitle` already fall back to `introduction` (now localized), change the fallbacks to prefer the localized intro. Concretely, keep the `title`/`description` props optional and compute:
  ```tsx
  const seoTitle = title || `${introduction.title.join(' ')} - ${introduction.subtitle}`;
  const seoDescription = description || introduction.description;
  ```
  (These lines already exist — just ensure the hardcoded default param values do not force English. Simplest: change the default parameter values to `undefined` by removing the `= '...'` defaults for `title` and `description`, so the localized `introduction` fallback wins.)
- Make the Helmet element carry the lang: change `<Helmet>` to `<Helmet htmlAttributes={{ lang: language }}>`.
- Replace `<meta name="language" content="English" />` with `<meta name="language" content={t.seo.languageMeta} />`.

- [ ] **Step 2: index.html default lang**

Modify `index.html` line 2: `<html lang="en">` → `<html lang="id">`.

- [ ] **Step 3: Fix tests importing the removed `portfolioData`**

Run: `rtk grep -rn "portfolioData" src`
For each remaining match in a test file, replace `portfolioData` with `getPortfolioData('en')` (English keeps existing English assertions valid). Example in `src/domain/services/__tests__/portfolio.test.ts`: change `import { portfolioData }` → `import { getPortfolioData }` and add `const portfolioData = getPortfolioData('en');` at the top of the describe, or inline `getPortfolioData('en')` at each use.

- [ ] **Step 4: Full type-check, lint, and test run**

Run: `rtk npm run type-check`
Run: `rtk npm run lint`
Run: `rtk npm run test:fast`
Expected: all green. Investigate and fix any suite that renders a component using `useTranslations`/`useLanguage` without a provider by wrapping it in `AllTheProviders` (which supplies both, defaulting to English).

- [ ] **Step 5: Commit**

```bash
rtk git add src/presentation/components/SEO.tsx index.html src/domain/services/__tests__/portfolio.test.ts
rtk git commit -m "feat(i18n): localize SEO meta and default document lang to id"
```

---

## Task 10: End-to-end verification in the running app

**Files:** none (verification only).

- [ ] **Step 1: Full coverage test run**

Run: `rtk npm run test`
Expected: pass at/above existing coverage thresholds. If coverage drops below threshold on new files, add any missing focused assertions (the i18n unit tests from Tasks 1–4 should cover the new logic).

- [ ] **Step 2: Build**

Run: `rtk npm run build`
Expected: succeeds (tsc + vite).

- [ ] **Step 3: Manual/driven check (use the `run` or `claude-in-chrome` skill)**

Start the dev server (`rtk npm run dev`) and verify:
- On first load (cleared `localStorage`), the page is in **Indonesian** and `<html lang>` is `id`.
- Clicking the header language switch flips all chrome + portfolio prose to English, updates `<html lang>` to `en`, and shows the 🇮🇩 ID target label.
- Reloading preserves the chosen language (localStorage).
- Theme toggle still works independently and both controls sit together in the header.

- [ ] **Step 4: Final commit (if any verification fixups were needed)**

```bash
rtk git add -A
rtk git commit -m "test(i18n): verification fixups"
```

---

## Self-Review Notes

- **Spec coverage:** LanguageContext/default-id/persistence (Tasks 1), useLanguage (2), UI dictionary + useTranslations (3), getPortfolioData builder + full id copy (4), locale-aware hooks (5), header switch with flag+label (6), section + sub-component chrome (7–8), SEO + `<html lang>` + index.html (9), testing throughout + e2e (10). Medium article content left untranslated per spec.
- **Test-churn strategy:** `LanguageProvider.initialLanguage` + `AllTheProviders` defaulting to English keeps existing English-literal assertions valid; only tests that render without providers or assert removed `portfolioData` need edits (Tasks 6–9 handle these).
- **Explicit scoping** (English in both locales): product/company/role/certificate/tech/skill names, month abbreviations, and `calculateDuration()` output. Only "Present" → "Sekarang" in periods, and `toLocaleDateString` locale for article dates, are localized in the date domain.
- **Open item for the author:** Indonesian prose in Task 4 and the dictionary in Task 3 are Claude-drafted and should be proofread after implementation.
```

# Tech Stack Icons → react-icons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 12 hand-made light/dark SVGs in `src/assets/icons/tech/` with `react-icons` components, so the "Tech Stack" pills in `IntroSection.tsx` render brand icons without custom art files.

**Architecture:** `react-icons` (already an installed but currently-unused dependency) supplies one component per tech instead of a `{ light, dark }` SVG pair. The `icon` field on `TechStack`/`UITechStack` changes from a string-pair object to a component reference (`IconType`). The component renders flat/transparent, colored via the tech's existing `color` field — no more theme-based image swapping.

**Tech Stack:** React 18, TypeScript, `react-icons` v4.12.0 (`react-icons/si` for Simple Icons, `react-icons/di` for Devicons), Jest + React Testing Library.

## Global Constraints

- No new npm dependencies — `react-icons` is already in `package.json`.
- Java has no icon in Simple Icons (confirmed absent as of the latest simple-icons release, 16.28.0 — removed for trademark reasons). Use `DiJava` from `react-icons/di` for Java; every other tech (Android, Kotlin, Flutter, Go, React) uses `react-icons/si`.
- Icons render flat and transparent (no rounded-square badge background) — the existing pill in `IntroSection.tsx` already supplies a background.
- `IntroSection.tsx` is the only consumer of `TechStack.icon` in the whole codebase — no other component needs updating.
- Verify commands: `npm run type-check`, `npm test` (or a scoped `npx jest <path>`), `npm run lint`, `npm run build`.

---

### Task 1: Change `TechStack.icon` type and swap the data source

**Files:**
- Modify: `src/domain/models/index.ts:1-8`
- Modify: `src/presentation/models/index.ts:3-10`
- Modify: `src/domain/services/portfolio.ts:36-48` (imports) and `:61-110` (techStack data)
- Modify: `src/domain/services/__tests__/portfolio.test.ts:9-18` (mock data) and `:137-143` (assertions)

**Interfaces:**
- Consumes: nothing (this is the root of the change).
- Produces: `TechStack.icon: IconType` and `UITechStack.icon: IconType`, where `IconType` is `(props: IconBaseProps) => JSX.Element` from the `react-icons` package. `portfolio.ts` exports `portfolioData.introduction.techStack` where each entry's `icon` is a component reference (e.g. `SiReact`), consumed by Task 2.

- [ ] **Step 1: Update the domain model type**

Edit `src/domain/models/index.ts`. Replace:

```typescript
export interface TechStack {
  name: string;
  icon: {
    light: string;
    dark: string;
  };
  color?: string; // Made optional since we're using icons
}
```

with:

```typescript
import type { IconType } from 'react-icons';

export interface TechStack {
  name: string;
  icon: IconType;
  color?: string; // Made optional since we're using icons
}
```

- [ ] **Step 2: Update the presentation model type**

Edit `src/presentation/models/index.ts`. Replace:

```typescript
export interface UITechStack {
  name: string;
  icon: {
    light: string;
    dark: string;
  };
  color?: string;
}
```

with:

```typescript
import type { IconType } from 'react-icons';

export interface UITechStack {
  name: string;
  icon: IconType;
  color?: string;
}
```

- [ ] **Step 3: Run type-check to confirm the two type files alone don't yet compile**

Run: `npm run type-check`
Expected: FAIL — `src/domain/services/portfolio.ts` still assigns `{ light, dark }` objects to `icon`, which no longer matches `IconType`.

- [ ] **Step 4: Swap the icon imports in `portfolio.ts`**

Edit `src/domain/services/portfolio.ts`. Replace lines 36-48:

```typescript
// Import tech stack icons
import androidIconDark from '@/assets/icons/tech/ic_android_dark.svg';
import androidIconLight from '@/assets/icons/tech/ic_android_light.svg';
import kotlinIconDark from '@/assets/icons/tech/ic_kotlin_dark.svg';
import kotlinIconLight from '@/assets/icons/tech/ic_kotlin_light.svg';
import javaIconDark from '@/assets/icons/tech/ic_java_dark.svg';
import javaIconLight from '@/assets/icons/tech/ic_java_light.svg';
import flutterIconDark from '@/assets/icons/tech/ic_flutter_dark.svg';
import flutterIconLight from '@/assets/icons/tech/ic_flutter_light.svg';
import goIconDark from '@/assets/icons/tech/ic_go_dark.svg';
import goIconLight from '@/assets/icons/tech/ic_go_light.svg';
import reactIconDark from '@/assets/icons/tech/ic_react_dark.svg';
import reactIconLight from '@/assets/icons/tech/ic_react_light.svg';
```

with:

```typescript
// Import tech stack icons
import { SiAndroid, SiKotlin, SiFlutter, SiGo, SiReact } from 'react-icons/si';
import { DiJava } from 'react-icons/di';
```

- [ ] **Step 5: Update each techStack entry's `icon` field**

In the same file, replace each of the six `icon: { light: ..., dark: ... }` blocks inside the `techStack` array (originally lines 61-110) with a single component reference. The full block becomes:

```typescript
    techStack: [
      {
        name: 'Android',
        icon: SiAndroid,
        color: '#3DDC84',
      },
      {
        name: 'Kotlin',
        icon: SiKotlin,
        color: '#7F52FF',
      },
      {
        name: 'Java',
        icon: DiJava,
        color: '#ED8B00',
      },
      {
        name: 'Flutter',
        icon: SiFlutter,
        color: '#02569B',
      },
      {
        name: 'Go',
        icon: SiGo,
        color: '#00ADD8',
      },
      {
        name: 'React',
        icon: SiReact,
        color: '#61DAFB',
      },
    ],
```

- [ ] **Step 6: Run type-check to confirm production code compiles**

Run: `npm run type-check`
Expected: PASS (test files are not type-checked against the real module shape because `jest.mock` factories are loosely typed — Task 1's remaining steps fix the one test file that references the real `icon` shape directly).

- [ ] **Step 7: Fix `portfolio.test.ts`'s mock and assertions**

This file's `jest.mock('../portfolio', ...)` fully replaces the module, so its mock data must match the new shape. Add an import at the top of `src/domain/services/__tests__/portfolio.test.ts` (before the `jest.mock` call):

```typescript
import { SiAndroid as mockSiAndroid } from 'react-icons/si';
```

(The `mock` prefix is required — Jest's module-factory hoisting only allows referencing out-of-scope variables whose name starts with `mock`.)

Replace lines 9-18:

```typescript
      techStack: [
        {
          name: 'Android',
          icon: {
            light: 'test-light.svg',
            dark: 'test-dark.svg',
          },
          color: '#3DDC84',
        },
      ],
```

with:

```typescript
      techStack: [
        {
          name: 'Android',
          icon: mockSiAndroid,
          color: '#3DDC84',
        },
      ],
```

Then replace the assertions at lines 137-143:

```typescript
  it('has valid tech stack structure', () => {
    const tech = portfolioData.introduction.techStack[0];
    expect(tech).toHaveProperty('name');
    expect(tech).toHaveProperty('icon');
    expect(tech.icon).toHaveProperty('light');
    expect(tech.icon).toHaveProperty('dark');
  });
```

with:

```typescript
  it('has valid tech stack structure', () => {
    const tech = portfolioData.introduction.techStack[0];
    expect(tech).toHaveProperty('name');
    expect(tech).toHaveProperty('icon');
    expect(typeof tech.icon).toBe('function');
  });
```

- [ ] **Step 8: Run the test file and type-check**

Run: `npx jest src/domain/services/__tests__/portfolio.test.ts && npm run type-check`
Expected: Both PASS.

- [ ] **Step 9: Commit**

```bash
git add src/domain/models/index.ts src/presentation/models/index.ts src/domain/services/portfolio.ts src/domain/services/__tests__/portfolio.test.ts
git commit -m "refactor(portfolio): source tech-stack icons from react-icons"
```

---

### Task 2: Update `IntroSection` rendering and its tests

**Files:**
- Modify: `src/presentation/components/sections/IntroSection.tsx:1-9` and `:105-124`
- Modify: `src/presentation/components/sections/__tests__/IntroSection.test.tsx:1-84,152-159`
- Modify: `src/shared/test-utils/test-utils.tsx:61-79,247-279`

**Interfaces:**
- Consumes: `TechStack.icon: IconType` / `UITechStack.icon: IconType` from Task 1 — a component that accepts `color`, `size`, and standard SVG/ARIA props (`role`, `aria-label`).
- Produces: nothing consumed by later tasks (Task 3 is unrelated cleanup).

- [ ] **Step 1: Update `IntroSection.tsx`'s render logic**

Edit `src/presentation/components/sections/IntroSection.tsx`. Replace the import line and hook destructure at the top:

```typescript
import { useIntro, useTheme, useProjects } from '@/presentation';
```

with:

```typescript
import { useIntro, useProjects } from '@/presentation';
```

Remove the now-unused hook call:

```typescript
  const { theme } = useTheme();
```

Then replace the icon rendering (originally lines 112-120):

```tsx
                    <img
                      src={tech.icon[theme]}
                      alt={`${tech.name} icon`}
                      className="w-4 h-4 object-contain"
                      loading="lazy"
                      decoding="async"
                      width={16}
                      height={16}
                    />
```

with:

```tsx
                    <tech.icon
                      color={tech.color}
                      size={16}
                      role="img"
                      aria-label={`${tech.name} icon`}
                    />
```

- [ ] **Step 2: Run the IntroSection test file to see it fail**

Run: `npx jest src/presentation/components/sections/__tests__/IntroSection.test.tsx`
Expected: FAIL — the test's mocked `techStack` still supplies `icon: { light, dark }` objects, and `<tech.icon />` can't render a plain object as a component ("Element type is invalid").

- [ ] **Step 3: Fix `IntroSection.test.tsx`'s mock data and assertions**

Add these imports at the top of `src/presentation/components/sections/__tests__/IntroSection.test.tsx`, before the `jest.mock('@domain/services/portfolio', ...)` call:

```typescript
import {
  SiAndroid as mockSiAndroid,
  SiKotlin as mockSiKotlin,
  SiFlutter as mockSiFlutter,
} from 'react-icons/si';
import { DiJava as mockDiJava } from 'react-icons/di';
```

Replace the `techStack` array (originally lines 13-46):

```typescript
      techStack: [
        {
          name: 'Android',
          icon: {
            light: 'android-light.svg',
            dark: 'android-dark.svg',
          },
          color: '#3DDC84',
        },
        {
          name: 'Kotlin',
          icon: {
            light: 'kotlin-light.svg',
            dark: 'kotlin-dark.svg',
          },
          color: '#7F52FF',
        },
        {
          name: 'Java',
          icon: {
            light: 'java-light.svg',
            dark: 'java-dark.svg',
          },
          color: '#ED8B00',
        },
        {
          name: 'Flutter',
          icon: {
            light: 'flutter-light.svg',
            dark: 'flutter-dark.svg',
          },
          color: '#02569B',
        },
      ],
```

with:

```typescript
      techStack: [
        {
          name: 'Android',
          icon: mockSiAndroid,
          color: '#3DDC84',
        },
        {
          name: 'Kotlin',
          icon: mockSiKotlin,
          color: '#7F52FF',
        },
        {
          name: 'Java',
          icon: mockDiJava,
          color: '#ED8B00',
        },
        {
          name: 'Flutter',
          icon: mockSiFlutter,
          color: '#02569B',
        },
      ],
```

Remove the now-unused `useTheme` mock (originally lines 79-84):

```typescript
// Mock useTheme hook
jest.mock('@presentation/hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
  }),
}));
```

(`IntroSection.tsx` no longer calls `useTheme`, per Step 1.)

Finally, replace the `'renders tech stack icons'` test (originally lines 152-159):

```typescript
  it('renders tech stack icons', () => {
    render(<IntroSection />);

    const androidIcon = screen.getByAltText('Android icon');
    const kotlinIcon = screen.getByAltText('Kotlin icon');
    expect(androidIcon).toBeInTheDocument();
    expect(kotlinIcon).toBeInTheDocument();
  });
```

with:

```typescript
  it('renders tech stack icons', () => {
    render(<IntroSection />);

    const androidIcon = screen.getByRole('img', { name: 'Android icon' });
    const kotlinIcon = screen.getByRole('img', { name: 'Kotlin icon' });
    expect(androidIcon).toBeInTheDocument();
    expect(kotlinIcon).toBeInTheDocument();
  });
```

- [ ] **Step 4: Run the test file to confirm it passes**

Run: `npx jest src/presentation/components/sections/__tests__/IntroSection.test.tsx`
Expected: PASS.

- [ ] **Step 5: Fix the shared `test-utils.tsx` mock**

Edit `src/shared/test-utils/test-utils.tsx`. Add an import near the top (after the existing imports, before the `jest.mock` calls):

```typescript
import { SiAndroid as mockSiAndroid } from 'react-icons/si';
```

Replace the techStack entry (originally lines 69-78):

```typescript
      techStack: [
        {
          name: 'Android',
          icon: {
            light: 'mocked-android-light-icon',
            dark: 'mocked-android-dark-icon',
          },
          color: '#3DDC84',
        },
      ],
```

with:

```typescript
      techStack: [
        {
          name: 'Android',
          icon: mockSiAndroid,
          color: '#3DDC84',
        },
      ],
```

Remove the now-unused tech-icon file mocks (originally lines 247-279):

```typescript
// Mock tech icons
jest.mock(
  '@/assets/icons/tech/ic_android_dark.svg',
  () => 'mocked-android-dark-icon'
);
jest.mock(
  '@/assets/icons/tech/ic_android_light.svg',
  () => 'mocked-android-light-icon'
);
jest.mock(
  '@/assets/icons/tech/ic_flutter_dark.svg',
  () => 'mocked-flutter-dark-icon'
);
jest.mock(
  '@/assets/icons/tech/ic_flutter_light.svg',
  () => 'mocked-flutter-light-icon'
);
jest.mock(
  '@/assets/icons/tech/ic_java_dark.svg',
  () => 'mocked-java-dark-icon'
);
jest.mock(
  '@/assets/icons/tech/ic_java_light.svg',
  () => 'mocked-java-light-icon'
);
jest.mock(
  '@/assets/icons/tech/ic_kotlin_dark.svg',
  () => 'mocked-kotlin-dark-icon'
);
jest.mock(
  '@/assets/icons/tech/ic_kotlin_light.svg',
  () => 'mocked-kotlin-light-icon'
);
```

(delete the whole block, including the `// Mock tech icons` comment — these mocked file paths are no longer imported anywhere once Task 1 landed.)

- [ ] **Step 6: Run the full test suite**

Run: `npm test`
Expected: PASS — all suites, including any that render `IntroSection` via the shared `test-utils` custom render (e.g. `HomePage.test.tsx`).

- [ ] **Step 7: Commit**

```bash
git add src/presentation/components/sections/IntroSection.tsx src/presentation/components/sections/__tests__/IntroSection.test.tsx src/shared/test-utils/test-utils.tsx
git commit -m "refactor(intro): render tech-stack icons via react-icons components"
```

---

### Task 3: Delete the unused SVG assets and their registry entry

**Files:**
- Delete: `src/assets/icons/tech/ic_android_light.svg`, `ic_android_dark.svg`, `ic_kotlin_light.svg`, `ic_kotlin_dark.svg`, `ic_java_light.svg`, `ic_java_dark.svg`, `ic_flutter_light.svg`, `ic_flutter_dark.svg`, `ic_go_light.svg`, `ic_go_dark.svg`, `ic_react_light.svg`, `ic_react_dark.svg` (all 12 files in `src/assets/icons/tech/`)
- Modify: `src/domain/valueObjects/assets.ts:130-148`
- Modify: `src/domain/valueObjects/__tests__/assets.test.ts:297-316`

**Interfaces:**
- Consumes: nothing (Tasks 1 and 2 no longer reference these files or the `ASSETS.source.icons.tech` registry entry).
- Produces: nothing.

- [ ] **Step 1: Confirm nothing still references the files or the registry entry**

Run: `grep -rn "assets/icons/tech\|icons\.tech" src --include="*.ts*"`
Expected: no matches outside `src/domain/valueObjects/assets.ts` and `src/domain/valueObjects/__tests__/assets.test.ts` (both fixed in this task).

- [ ] **Step 2: Delete the 12 SVG files**

```bash
rm src/assets/icons/tech/ic_android_light.svg \
   src/assets/icons/tech/ic_android_dark.svg \
   src/assets/icons/tech/ic_kotlin_light.svg \
   src/assets/icons/tech/ic_kotlin_dark.svg \
   src/assets/icons/tech/ic_java_light.svg \
   src/assets/icons/tech/ic_java_dark.svg \
   src/assets/icons/tech/ic_flutter_light.svg \
   src/assets/icons/tech/ic_flutter_dark.svg \
   src/assets/icons/tech/ic_go_light.svg \
   src/assets/icons/tech/ic_go_dark.svg \
   src/assets/icons/tech/ic_react_light.svg \
   src/assets/icons/tech/ic_react_dark.svg
```

- [ ] **Step 3: Remove the `tech` block from `ASSETS`**

Edit `src/domain/valueObjects/assets.ts`. Replace (originally lines 130-149):

```typescript
    icons: {
      tech: {
        android: {
          light: '/src/assets/icons/tech/ic_android_light.svg',
          dark: '/src/assets/icons/tech/ic_android_dark.svg',
        },
        kotlin: {
          light: '/src/assets/icons/tech/ic_kotlin_light.svg',
          dark: '/src/assets/icons/tech/ic_kotlin_dark.svg',
        },
        java: {
          light: '/src/assets/icons/tech/ic_java_light.svg',
          dark: '/src/assets/icons/tech/ic_java_dark.svg',
        },
        flutter: {
          light: '/src/assets/icons/tech/ic_flutter_light.svg',
          dark: '/src/assets/icons/tech/ic_flutter_dark.svg',
        },
      },
      companies: {
```

with:

```typescript
    icons: {
      companies: {
```

- [ ] **Step 4: Remove the two `assets.test.ts` cases that assert on the deleted `tech` block**

Edit `src/domain/valueObjects/__tests__/assets.test.ts`. Delete these two `it` blocks (originally lines 297-302 and 311-316):

```typescript
    it('has tech icons', () => {
      expect(ASSETS.source.icons.tech).toHaveProperty('android');
      expect(ASSETS.source.icons.tech).toHaveProperty('kotlin');
      expect(ASSETS.source.icons.tech).toHaveProperty('java');
      expect(ASSETS.source.icons.tech).toHaveProperty('flutter');
    });
```

```typescript
    it('tech icons have light and dark variants', () => {
      expect(ASSETS.source.icons.tech.android).toHaveProperty('light');
      expect(ASSETS.source.icons.tech.android).toHaveProperty('dark');
      expect(ASSETS.source.icons.tech.kotlin).toHaveProperty('light');
      expect(ASSETS.source.icons.tech.kotlin).toHaveProperty('dark');
    });
```

- [ ] **Step 5: Run full verification**

Run: `npm run type-check && npm run lint && npm test && npm run build`
Expected: all four PASS.

- [ ] **Step 6: Commit**

```bash
git add -A src/assets/icons/tech src/domain/valueObjects/assets.ts src/domain/valueObjects/__tests__/assets.test.ts
git commit -m "chore(assets): remove unused custom tech-stack icon SVGs"
```

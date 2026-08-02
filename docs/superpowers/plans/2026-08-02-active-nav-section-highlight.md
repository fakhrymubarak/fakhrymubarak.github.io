# Active Section Nav Highlighting Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the nav item matching the currently-in-view page section render in coral text, in both the desktop nav bar and the mobile menu.

**Architecture:** A new `useActiveSection(sectionIds)` hook uses one `IntersectionObserver` to watch all 5 section elements and returns the id of whichever is currently active. `Header.tsx` calls the hook and conditionally applies the existing `text-primary-coral` class (already used for hover) to whichever nav button matches.

**Tech Stack:** React 18, TypeScript, native `IntersectionObserver` (no new dependency), Jest + `@testing-library/react` for tests.

## Global Constraints

- Reuse the existing `text-primary-coral` Tailwind class for the active color — no new color token.
- Detection must use `IntersectionObserver`, not a `scroll` event listener.
- `rootMargin: '-64px 0px -60% 0px'`, `threshold: 0` (top offset accounts for the 64px fixed header; bottom offset means a section counts as active once it's within the top ~40% of the viewport).
- When multiple sections intersect simultaneously, the one that appears **latest** in the ids array (i.e. furthest down the page) wins.
- Applies to both the desktop nav bar and the mobile menu nav list.
- Add `aria-current="page"` to the active nav button (both desktop and mobile) for accessibility; omit the attribute entirely (not `aria-current="false"`) when not active.
- No URL hash rewriting on scroll, no changes to existing `whileInView` entrance animations — out of scope per spec.

Full background/rationale: `docs/superpowers/specs/2026-08-02-active-nav-section-highlight-design.md`.

---

## File Structure

- **Create** `src/presentation/hooks/useActiveSection.ts` — the scroll-spy hook. Single responsibility: given section element ids, return which one is currently active.
- **Create** `src/presentation/hooks/__tests__/useActiveSection.test.ts` — unit tests for the hook in isolation (mocked `IntersectionObserver`).
- **Modify** `src/presentation/index.ts` — barrel export for the new hook.
- **Modify** `src/presentation/components/Header.tsx` — call the hook, apply conditional class + `aria-current` to desktop and mobile nav buttons.
- **Modify** `src/presentation/components/__tests__/Header.test.tsx` — new tests asserting the active button gets the coral class and `aria-current`.

---

### Task 1: `useActiveSection` hook

**Files:**
- Create: `src/presentation/hooks/useActiveSection.ts`
- Test: `src/presentation/hooks/__tests__/useActiveSection.test.ts`

**Interfaces:**
- Produces: `useActiveSection(sectionIds: string[]): string` — a named export. Returns `sectionIds[0]` until the observer's first callback fires, then returns whichever id was passed to `setActiveSection` last (see Step 3 implementation).

- [ ] **Step 1: Write the failing tests**

Create `src/presentation/hooks/__tests__/useActiveSection.test.ts`:

```ts
import { renderHook, act } from '@testing-library/react';
import { useActiveSection } from '../useActiveSection';

describe('useActiveSection', () => {
  const sectionIds = ['home', 'projects', 'experience'];
  let observedElements: HTMLElement[];
  let observerCallback: IntersectionObserverCallback;
  const mockObserve = jest.fn();
  const mockDisconnect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
    observedElements = sectionIds.map(id => {
      const el = document.createElement('div');
      el.id = id;
      document.body.appendChild(el);
      return el;
    });

    global.IntersectionObserver = jest
      .fn()
      .mockImplementation((callback: IntersectionObserverCallback) => {
        observerCallback = callback;
        return {
          observe: mockObserve,
          disconnect: mockDisconnect,
          unobserve: jest.fn(),
          takeRecords: () => [],
          root: null,
          rootMargin: '',
          thresholds: [],
        };
      });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('defaults to the first section id before any intersection fires', () => {
    const { result } = renderHook(() => useActiveSection(sectionIds));
    expect(result.current).toBe('home');
  });

  it('observes every matching section element', () => {
    renderHook(() => useActiveSection(sectionIds));
    expect(mockObserve).toHaveBeenCalledTimes(3);
  });

  it('updates to the intersecting section', () => {
    const { result } = renderHook(() => useActiveSection(sectionIds));

    act(() => {
      observerCallback(
        [
          {
            isIntersecting: true,
            target: observedElements[1],
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });

    expect(result.current).toBe('projects');
  });

  it('picks the section furthest down the page when multiple intersect', () => {
    const { result } = renderHook(() => useActiveSection(sectionIds));

    act(() => {
      observerCallback(
        [
          {
            isIntersecting: true,
            target: observedElements[0],
          } as IntersectionObserverEntry,
          {
            isIntersecting: true,
            target: observedElements[2],
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });

    expect(result.current).toBe('experience');
  });

  it('ignores entries that are not intersecting', () => {
    const { result } = renderHook(() => useActiveSection(sectionIds));

    act(() => {
      observerCallback(
        [
          {
            isIntersecting: true,
            target: observedElements[1],
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });
    expect(result.current).toBe('projects');

    act(() => {
      observerCallback(
        [
          {
            isIntersecting: false,
            target: observedElements[2],
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });

    // No section is intersecting in this callback batch — stays on the last known active one.
    expect(result.current).toBe('projects');
  });

  it('disconnects the observer on unmount', () => {
    const { unmount } = renderHook(() => useActiveSection(sectionIds));
    unmount();
    expect(mockDisconnect).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx jest useActiveSection --silent`
Expected: FAIL — `Cannot find module '../useActiveSection'` (the hook file doesn't exist yet).

- [ ] **Step 3: Write the hook implementation**

Create `src/presentation/hooks/useActiveSection.ts`:

```ts
import { useEffect, useState } from 'react';

export const useActiveSection = (sectionIds: string[]): string => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      entries => {
        const visibleIds = new Set(
          entries
            .filter(entry => entry.isIntersecting)
            .map(entry => entry.target.id)
        );

        const lastVisibleId = sectionIds
          .filter(id => visibleIds.has(id))
          .pop();

        if (lastVisibleId) {
          setActiveSection(lastVisibleId);
        }
      },
      { rootMargin: '-64px 0px -60% 0px', threshold: 0 }
    );

    elements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
};
```

Note: `sectionIds` must be a stable array reference across renders (a module-level constant, not a literal recreated inline) or this effect will tear down and rebuild the observer on every render. Task 2 wires up the caller to satisfy this.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx jest useActiveSection --silent`
Expected: PASS, all 6 tests green.

- [ ] **Step 5: Typecheck and lint**

Run: `npx tsc --noEmit && npx eslint src/presentation/hooks/useActiveSection.ts src/presentation/hooks/__tests__/useActiveSection.test.ts`
Expected: no errors (in particular, no `react-hooks/exhaustive-deps` warning on the `[sectionIds]` dependency array).

- [ ] **Step 6: Commit**

```bash
git add src/presentation/hooks/useActiveSection.ts src/presentation/hooks/__tests__/useActiveSection.test.ts
git commit -m "feat(nav): add useActiveSection scroll-spy hook"
```

---

### Task 2: Wire the hook into `Header.tsx`

**Files:**
- Modify: `src/presentation/index.ts`
- Modify: `src/presentation/components/Header.tsx:1-52` (imports, module-scope constant, `navItems`)
- Modify: `src/presentation/components/Header.tsx:166-182` (desktop nav buttons)
- Modify: `src/presentation/components/Header.tsx:248-271` (mobile nav buttons)
- Test: `src/presentation/components/__tests__/Header.test.tsx`

**Interfaces:**
- Consumes: `useActiveSection(sectionIds: string[]): string` from Task 1, imported via the `@/presentation` barrel (matching how `useTheme`/`useLanguage`/`useTranslations` are already imported in this file).

- [ ] **Step 1: Export the hook from the barrel**

In `src/presentation/index.ts`, add this line after the existing `useLockBodyScroll` export (currently line 23):

```ts
export * from './hooks/useActiveSection';
```

- [ ] **Step 2: Write the failing Header tests**

Add this new `describe` block at the end of `src/presentation/components/__tests__/Header.test.tsx`, right before the file's final closing (after the existing `describe('Header Component', ...)` block, as a sibling top-level block):

```tsx
describe('Header active section highlighting', () => {
  const SECTION_IDS = ['home', 'projects', 'experience', 'articles', 'contact'];
  let observerCallback: IntersectionObserverCallback;
  let observedElements: HTMLElement[];

  beforeEach(() => {
    Element.prototype.scrollIntoView = jest.fn();
    observedElements = SECTION_IDS.map(id => {
      const el = document.createElement('div');
      el.id = id;
      document.body.appendChild(el);
      return el;
    });

    global.IntersectionObserver = jest
      .fn()
      .mockImplementation((callback: IntersectionObserverCallback) => {
        observerCallback = callback;
        return {
          observe: jest.fn(),
          disconnect: jest.fn(),
          unobserve: jest.fn(),
          takeRecords: () => [],
          root: null,
          rootMargin: '',
          thresholds: [],
        };
      });
  });

  afterEach(() => {
    observedElements.forEach(el => el.remove());
  });

  it('applies the active color and aria-current to the matching desktop nav button', async () => {
    render(<Header />);

    act(() => {
      observerCallback(
        [
          {
            isIntersecting: true,
            target: observedElements[2], // 'experience'
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });

    const desktopNav = screen.getByRole('navigation', {
      name: /main navigation/i,
    });
    const experienceButton = within(desktopNav).getByText('Experience');
    const projectsButton = within(desktopNav).getByText('Projects');

    expect(experienceButton).toHaveClass('text-primary-coral');
    expect(experienceButton).toHaveAttribute('aria-current', 'page');
    expect(projectsButton).not.toHaveClass('text-primary-coral');
    expect(projectsButton).not.toHaveAttribute('aria-current');
  });

  it('applies the active color to the matching mobile nav button', async () => {
    render(<Header />);

    act(() => {
      observerCallback(
        [
          {
            isIntersecting: true,
            target: observedElements[1], // 'projects'
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });

    const menuButton = screen.getByRole('button', {
      name: /toggle mobile menu/i,
    });
    fireEvent.click(menuButton);

    const mobileNav = await screen.findByRole('navigation', {
      name: /mobile navigation/i,
    });
    const projectsLink = within(mobileNav).getByText('Projects');

    expect(projectsLink).toHaveClass('text-primary-coral');
    expect(projectsLink).toHaveAttribute('aria-current', 'page');
  });
});
```

Add `act` and `within` to the existing `@testing-library/react`-derived import at the top of the file — change:

```tsx
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '../../../shared/test-utils/test-utils';
```

to:

```tsx
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  within,
} from '../../../shared/test-utils/test-utils';
```

Both `act` and `within` are already re-exported from `../../../shared/test-utils/test-utils.tsx:474-497`, so this single import line change is sufficient — no separate `@testing-library/react` import needed.

- [ ] **Step 3: Run tests to verify they fail**

Run: `npx jest Header.test --silent`
Expected: FAIL on both new tests — nav buttons don't have `text-primary-coral` or `aria-current` yet (existing tests in the file continue to pass).

- [ ] **Step 4: Implement the Header.tsx changes**

In `src/presentation/components/Header.tsx`, add the import and module-scope constant. Change the top of the file from:

```tsx
import React, { useState, useEffect, useRef } from 'react';
import { useTheme, useLanguage, useTranslations } from '@/presentation';
import { Moon, Sun, Menu, X } from 'lucide-react';
import avatarImage from '../../assets/images/avatars/img_avatar.webp';
import { useAnalytics } from '@/presentation';
import { accessibilityUtils } from '@/presentation';

const Header: React.FC = () => {
```

to:

```tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  useTheme,
  useLanguage,
  useTranslations,
  useActiveSection,
} from '@/presentation';
import { Moon, Sun, Menu, X } from 'lucide-react';
import avatarImage from '../../assets/images/avatars/img_avatar.webp';
import { useAnalytics } from '@/presentation';
import { accessibilityUtils } from '@/presentation';

const SECTION_IDS = ['home', 'projects', 'experience', 'articles', 'contact'];

const Header: React.FC = () => {
```

Then, right after the existing `navItems` declaration (`const navItems = [...]`), add:

```tsx
  const activeSection = useActiveSection(SECTION_IDS);
```

- [ ] **Step 5: Apply the active class to the desktop nav button**

Change the desktop nav button (inside the `<nav className="hidden md:flex ...">` block) from:

```tsx
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href, item.key, item.name)}
                className="text-light-muted dark:text-dark-muted hover:text-primary-coral dark:hover:text-primary-coral transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-coral focus-visible:ring-offset-2 rounded px-2 py-1"
                aria-label={t.a11y.navigateTo(item.name)}
              >
                {item.name}
              </button>
```

to:

```tsx
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href, item.key, item.name)}
                className={`${
                  activeSection === item.key
                    ? 'text-primary-coral'
                    : 'text-light-muted dark:text-dark-muted'
                } hover:text-primary-coral dark:hover:text-primary-coral transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-coral focus-visible:ring-offset-2 rounded px-2 py-1`}
                aria-label={t.a11y.navigateTo(item.name)}
                aria-current={activeSection === item.key ? 'page' : undefined}
              >
                {item.name}
              </button>
```

- [ ] **Step 6: Apply the same treatment to the mobile nav button**

Change the mobile nav button from:

```tsx
                <button
                  key={item.key}
                  onClick={() =>
                    scrollToSection(item.href, item.key, item.name)
                  }
                  className="text-left text-light-muted dark:text-dark-muted hover:text-primary-coral dark:hover:text-primary-coral transition-colors font-medium py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-coral focus-visible:ring-offset-2 rounded px-2"
                  aria-label={t.a11y.navigateTo(item.name)}
                >
                  {item.name}
                </button>
```

to:

```tsx
                <button
                  key={item.key}
                  onClick={() =>
                    scrollToSection(item.href, item.key, item.name)
                  }
                  className={`text-left ${
                    activeSection === item.key
                      ? 'text-primary-coral'
                      : 'text-light-muted dark:text-dark-muted'
                  } hover:text-primary-coral dark:hover:text-primary-coral transition-colors font-medium py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-coral focus-visible:ring-offset-2 rounded px-2`}
                  aria-label={t.a11y.navigateTo(item.name)}
                  aria-current={activeSection === item.key ? 'page' : undefined}
                >
                  {item.name}
                </button>
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `npx jest Header.test --silent`
Expected: PASS, all tests in the file green (existing tests + the 2 new ones).

- [ ] **Step 8: Typecheck and lint**

Run: `npx tsc --noEmit && npx eslint src/presentation/components/Header.tsx src/presentation/components/__tests__/Header.test.tsx src/presentation/index.ts`
Expected: no errors.

- [ ] **Step 9: Manual verification in the browser**

Run: `npm run dev` (or reuse an already-running dev server), open the site, scroll through Home → Projects → Experience → Articles → Contact, and confirm the matching nav item turns coral as each section comes into view, in both light and dark theme, and in the mobile menu (narrow viewport).

- [ ] **Step 10: Commit**

```bash
git add src/presentation/index.ts src/presentation/components/Header.tsx src/presentation/components/__tests__/Header.test.tsx
git commit -m "feat(nav): highlight active section in header nav"
```

---

## Self-Review Notes

- **Spec coverage:** hook behavior (default/intersecting/multi-intersecting/disconnect) ✓ Task 1; desktop + mobile class swap ✓ Task 2 Steps 5–6; `aria-current` ✓ Task 2 Steps 5–6; no new color token ✓ (reuses `text-primary-coral` throughout); out-of-scope items (hash rewriting, entrance animations, non-color treatments) untouched ✓.
- **Type consistency:** `useActiveSection(sectionIds: string[]): string` signature is identical between the Task 1 implementation, its test file, and the Task 2 call site (`useActiveSection(SECTION_IDS)` where `SECTION_IDS: string[]`).
- **Test-DOM caveat called out explicitly:** the hook's `useEffect` no-ops when `document.getElementById` finds nothing, so tests that don't create matching DOM elements (all pre-existing `Header.test.tsx` tests) are unaffected and keep passing.

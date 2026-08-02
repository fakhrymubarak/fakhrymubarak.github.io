# Active Section Nav Highlighting

## Context

`Header.tsx` renders 5 nav items (`home`, `projects`, `experience`, `articles`,
`contact`) as buttons that `scrollIntoView` their target section. Today every
button looks identical regardless of scroll position — only `:hover` changes
color (`hover:text-primary-coral`). There is no scroll-spy mechanism anywhere
in the codebase; the closest thing, Framer Motion's `whileInView`, only
drives per-section entrance animations and isn't reusable for this.

Goal: the nav item matching whichever section is currently in view should be
visually marked as active, in both the desktop nav bar and the mobile menu.

## Approach

`IntersectionObserver`, via a new hook, over a manual `scroll` + rAF-throttled
`getBoundingClientRect` listener. IntersectionObserver is event-driven (no
polling/throttling to hand-roll), is the standard approach for scroll-spy, and
needs no new dependency.

## New hook: `useActiveSection`

File: `src/presentation/hooks/useActiveSection.ts`

```ts
function useActiveSection(sectionIds: string[]): string
```

- Takes the ordered list of section element ids (without `#`), e.g.
  `['home', 'projects', 'experience', 'articles', 'contact']`.
- Returns the id of the currently active section (defaults to the first id,
  `'home'`, before any observer callback fires).
- Internally: one `IntersectionObserver` watching all matching section
  elements (`document.getElementById(id)` for each), created in a `useEffect`
  on mount, disconnected on unmount.
- `rootMargin: '-64px 0px -60% 0px'` — top offset accounts for the 64px fixed
  header (`h-16`); the bottom offset means a section is considered "active"
  once it's within the top ~40% of the viewport, not merely barely visible,
  which avoids flicker when two short sections are both partly on screen.
- `threshold: 0` — we only care about crossing the rootMargin boundary, not
  precise intersection ratio.
- On each observer callback, among currently-intersecting entries, pick the
  one whose target appears latest in `sectionIds` order (i.e. the furthest
  down the page that's still satisfied the rootMargin) — this matches normal
  scroll-spy behavior where scrolling down hands off active state to the next
  section as soon as it crosses the offset line.
- No dependency on section *order* changing at runtime — `sectionIds` is a
  static array literal in `Header.tsx`, so the effect's dependency array is
  `[sectionIds.join(',')]` (stable across renders without a `useMemo` at the
  call site, since `navItems` — and thus the id list — is itself redefined
  every render today; join-to-string sidesteps adding a memo just for this).

## Header changes (`src/presentation/components/Header.tsx`)

- `const activeSection = useActiveSection(navItems.map(item => item.key));`
  — nav item `key`s already equal section element ids (`home`, `projects`,
  etc.), so no separate id list needs maintaining.
- Desktop nav button className: when `item.key === activeSection`, use
  `text-primary-coral` in place of `text-light-muted dark:text-dark-muted`
  (hover classes stay as-is — hovering a non-active item still previews
  coral, same as today).
- Mobile nav button: same conditional, same class swap.
- Add `aria-current={item.key === activeSection ? 'page' : undefined}` to
  both desktop and mobile buttons for screen-reader users.

No new color token — reuses the existing `primary-coral` already used for
hover and other accents.

## Testing

- `src/presentation/hooks/__tests__/useActiveSection.test.ts` (new): mock
  `IntersectionObserver` (a fake class capturing the callback passed to
  `observe`), render the hook via `renderHook`, manually invoke the captured
  callback with fabricated `IntersectionObserverEntry`-shaped objects, assert
  the returned active id updates accordingly. Cases: default before any
  callback fires, single section intersecting, two sections intersecting
  (picks the later one in list order).
- `Header.test.tsx`: mock `useActiveSection` (or mock `IntersectionObserver`
  globally, matching the hook's own test style) to fix the active section,
  then assert the corresponding nav button has the `text-primary-coral` class
  and `aria-current="page"`, and that a non-active button doesn't.

## Out of scope

- Scroll-triggered URL hash updates (e.g. `history.replaceState`) — nav
  clicks already set the hash via `scrollIntoView`; passive scrolling won't
  rewrite it.
- Any change to the entrance animations (`whileInView` on section content).
- Desktop/mobile visual treatments beyond text color (no underline/pill —
  confirmed with user).

# Tech Stack Icons: Replace Custom SVGs with react-icons

## Context

`src/assets/icons/tech/` holds 12 hand-made SVGs — light/dark variants for 6 techs
(Android, Kotlin, Java, Flutter, Go, React). Each SVG is a rounded-square badge
(56x56, `rx=16`, white/dark-navy background baked in) with the brand-colored logo
mark centered inside. They're consumed in exactly one place: `IntroSection.tsx`'s
"Tech Stack" pill list, rendered at 16x16 next to the tech name.

Adding a new tech today means hand-crafting a light/dark SVG pair. Goal: replace
these with `react-icons`, which is already an installed (but currently unused)
dependency, so future techs are a one-line import.

## Icon source mapping

| Tech | Import | Brand color (unchanged) |
|---|---|---|
| Android | `SiAndroid` from `react-icons/si` | `#3DDC84` |
| Kotlin | `SiKotlin` from `react-icons/si` | `#7F52FF` |
| Java | `DiJava` from `react-icons/di` | `#ED8B00` |
| Flutter | `SiFlutter` from `react-icons/si` | `#02569B` |
| Go | `SiGo` from `react-icons/si` | `#00ADD8` |
| React | `SiReact` from `react-icons/si` | `#61DAFB` |

Java comes from Devicons because Simple Icons has no Java icon (removed for
trademark reasons; confirmed absent as of simple-icons 16.28.0, the latest
release). All other five are covered by Simple Icons.

## Visual change

The old badge look (rounded-square background per icon) is dropped. The only
consumer, `IntroSection.tsx`, already wraps each icon in a pill with its own
subtle background (`bg-black/[0.04] dark:bg-white/[0.06]`), so the icon itself
renders flat and transparent, colored via the tech's existing `color` field.
No more light/dark variant switching — one icon, one brand color, both themes.

## Data model changes

- `src/domain/models/index.ts`: `TechStack.icon` changes from
  `{ light: string; dark: string }` to `IconType` (react-icons' component type,
  `import type { IconType } from 'react-icons'`).
- `src/presentation/models/index.ts`: `UITechStack.icon` gets the same type change.
- `src/presentation/utils/dataMapper.ts`: `mapTechStack` needs no change — it
  already does `icon: techStack.icon` as a pass-through.
- `src/domain/services/portfolio.ts`: replace the 12 SVG imports with 6 named
  component imports (`SiAndroid`, `SiKotlin`, `DiJava`, `SiFlutter`, `SiGo`,
  `SiReact`). Each `techStack` entry's `icon: { light, dark }` collapses to
  `icon: SiReact` (etc.). `color` stays as-is.

## Rendering change

`src/presentation/components/sections/IntroSection.tsx`:

- Replace:
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
- `theme`/`useTheme` were only used for this icon lookup in this file — remove
  the now-unused import and destructure.

## Cleanup

- Delete the 12 files in `src/assets/icons/tech/`.
- Remove the `icons.tech` block from `ASSETS.source.icons` in
  `src/domain/valueObjects/assets.ts` (leave `companies` untouched — unrelated).

## Test updates

- `src/presentation/components/sections/__tests__/IntroSection.test.tsx`: the
  mocked `techStack` fixture's `icon: { light, dark }` string pairs become
  direct component references (e.g. reuse real `Si*`/`DiJava` imports, or a
  simple stub component). The two `getByAltText('... icon')` assertions in
  `renders tech stack icons` become
  `getByRole('img', { name: '... icon' })`.
- `src/shared/test-utils/test-utils.tsx`: same fixture shape change — replace
  the `icon: { light: '...svg', dark: '...svg' }` mock entries with component
  references.

## Out of scope

- The `companies` icon set in `assets.ts` (unrelated, different consumer).
- Any icon consumer beyond `IntroSection.tsx` — none currently exist.

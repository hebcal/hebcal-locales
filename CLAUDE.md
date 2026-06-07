# CLAUDE.md

Guidance for working in this repository.

## What this is

`@hebcal/locales` provides translations of Hebcal calendar event names (holidays,
parsha names, Hebrew months, candle-lighting strings, etc.) in multiple languages
and Ashkenazi transliteration dialects. It is a supplement to `@hebcal/core`, which
already has built-in `he` and `ashkenazi` locales. Consumers load it as a side-effect
import (`import '@hebcal/locales'`) which registers each locale with `@hebcal/hdate`'s
`Locale` registry.

## Source of truth: `po/*.po`

The GNU gettext `.po` files in `po/` are the **only** hand-edited, version-controlled
source. Everything in `src/` and `dist/` is generated and git-ignored — never edit
those by hand and don't expect them in `git status`.

One `.po` file per locale:

- `ashkenazi_komatz`, `ashkenazi_litvish`, `ashkenazi_poylish`, `ashkenazi_romanian`,
  `ashkenazi_standard` — Ashkenazi transliteration dialects (Latin/diacritics, ASCII-only
  for `ashkenazi_standard`).
- `de`, `es`, `fi`, `fr`, `hu`, `nl`, `pl`, `pt`, `ro`, `ru`, `uk` — European languages.
- `yi` — Yiddish (Hebrew script).
- `he` — special: contains only structural strings (`Israel`, `Diaspora`,
  `Jewish Calendar`) with nikud, **not** holiday names. The canonical Hebrew holiday
  names live in `@hebcal/core`. Do not add holiday msgids to `he.po`.

## Build pipeline

```bash
npm run build       # = po2json + build:rollup
npm run po2json      # po/*.po -> src/<locale>.po.js, src/<locale>.js, src/index.js
npm run build:rollup # src/ -> dist/ (ES modules + IIFE bundles, via rollup)
npm test             # ava (test/gettext.spec.js)
```

`po2json.js` parses each `.po` with `gettext-parser` and emits a compact JSON dict
(`{headers, contexts: {'': {msgid: msgstr}}}`). Notes that matter when editing `.po`:

- Entry **order does not matter** — the output is a dict keyed by msgid. (For clean
  diffs, still place a new entry next to a semantically related one.)
- Entries with an empty `msgstr` are **dropped** from the output.
- Each `.po` must have valid `Language` and `Plural-Forms` headers, or `po2json` throws.
- `he` gets an extra auto-generated `he-x-NoNikud` variant.

The npm package ships `dist/` and `po/` only (see `package.json` `files`). `dist` is
rebuilt at publish time (`prepublish` runs `build`).

## Adding / editing translations

When a new event type is added to Hebcal, its msgid must be added to every `.po` file
(except `he`). To stay consistent, derive new strings from how each file already renders
the **component words**, rather than inventing spellings:

- Match each locale's existing conventions for the "sh"/chet/etc. sounds — e.g. `de`
  uses `Sch`, `fr` uses `Ch`/`kh`, `nl` uses `Sj`, `pl` uses `Sz`, `ro`/`ashkenazi_romanian`
  use `ş`/`ĥ`, `hu` uses accents.
- Ashkenazi dialects apply havarah vowel rules (qamatz → "o", tav → "s"), e.g.
  `Shabbat Shirah` → `Shabbos Shiro` (komatz/litvish/poylish).
- `ru`/`uk` translate semantically meaningful day-names (e.g. Yom HaAliyah →
  `День алии` / `День алії`) but transliterate most proper-noun holiday names.
- `yi` uses Hebrew-script spellings.

After editing, always run `npm run po2json && npm test` to confirm the files still
parse and tests pass.

## Tests & CI

Tests are in `test/gettext.spec.js` (ava) and assert specific `Locale.gettext(...)`
results per locale; they import `../src/index.js`, so run `npm run po2json` first if
you've changed `.po` files. CI (`.github/workflows/node.js.yml`) runs `npm ci && npm
run build && npm test` on Node 22/24/26. Releases publish to npm via OIDC trusted
publishing when a GitHub Release is published (`release.yml`).

Sheikh Sahil — Portfolio (Ashura-Sheikh.github.io)

GitHub Pages user-page repo — served directly from the `main` branch root,
no build step of its own. This is the live deploy target, not where the
site's source is actively developed.

Current state (2026-08-17):
  Live site as of the last real commit (2024-06-10) is the original
  "Dimension" template, hand-edited directly (plain HTML/CSS/JS).
  A real framework migration to Astro is in progress in a separate
  local repo, `~/Documents/GitHub/ashura-sheikh-astro` — see that repo's
  own README for the actual source, structure, and deploy mechanics.
  Visual parity already confirmed against this repo's own live content.

  This repo's own working tree was carrying ~5 days of uncommitted edits
  (a custom.css/custom.js split, in progress) until 2026-08-17, when it
  was committed as-is to establish real git history for the first time
  in 2+ years. A tested deploy-branch commit (`deploy/astro-rebuild`,
  52d4660) now holds the built Astro output, ready to merge once go-live's
  remaining gates clear — not yet merged to main, not yet live.

Safe-change rule: no direct pushes to `main` — always a branch or local
preview first, regardless of how small the change looks. This applies to
every future update to this site, not just the migration.

Original template credits:
  Demo Images: Unsplash (unsplash.com)
  Icons: Font Awesome (fontawesome.io)

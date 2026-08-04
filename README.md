# Tweetsie & Special Guest — Show Site

Static single-page site built from the animated event poster assets. Drop this folder straight into Claude Code to keep iterating.

## Structure

```
tweetsie-show-site/
├── index.html          # single-page site markup
├── styles.css          # all styling (CSS variables at top for quick theming)
├── script.js           # scroll-reveal + hero video autoplay fallback
└── assets/
    ├── hero-loop.mp4        # seamless-looping animated poster (hero background video)
    ├── hero-poster.jpg      # static poster frame (shown before video loads)
    ├── poster-polished.png  # polished flat poster (4:5) — used in the Details section
    └── poster-9x16.png      # vertical-extended version of the poster (source for the animation)
```

## Notes for further dev in Claude Code

- All copy (venue, date, lineup, headline) lives directly in `index.html` — search for `Song Byrd`, `September 5`, or the lineup names to edit.
- Color system, type scale, and spacing all flow from the `:root` CSS variables at the top of `styles.css` — change `--red` / `--black` / `--bone` to re-theme fast.
- Fonts: Anton (display) + Oswald (body), loaded from Google Fonts in `index.html`. Swap the `<link>` and the `--display`/`--body` vars together if you change fonts.
- The `#rsvp` CTA buttons currently link to `#` — wire up a real ticket link there.
- To preview locally: `npx serve .` (or any static file server) from inside this folder.

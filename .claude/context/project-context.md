# Project context — Wizarts website

> Ground truth for every worker. Read this fully before editing. Grounded in the
> real design tokens (`site/css/base.css`), the live product (https://wizarts.be),
> and the brand design system. Match it — do not invent new tokens or conventions.

## What this is
Wizarts is a Belgian (Dutch-language) creative studio: "Gedreven door AI, gemaakt
door mensen" (driven by AI, made by humans). Static, no-build site served from
`site/`. Pages: `index.html` (home), `cases.html`, `expertise.html`, `webstart.html`,
and `wizarts-pro.html` (⚠ still a raw Claude "Bundled Page" artifact — escaped HTML
string; do NOT edit unless your unit is explicitly that page). Voice:
confident, warm, a little magical ("toveren", "magie", "krachten"), never gimmicky.
Copy is **Dutch** — keep it Dutch, keep real copy unless a brief says to change it.

Tech: plain HTML + CSS + vanilla JS. GSAP + ScrollTrigger + Lenis from CDN. No
framework, no build step.

## File structure (IMPORTANT — refactored to shared base + per-page files)
- **CSS:** `site/css/base.css` = shared chrome (tokens, reset, typography, buttons,
  header/nav, mobile menu, mega-dropdown, marquee, **contact**, footer, sticky
  badge, global responsive + reduced-motion). Loaded on EVERY page. Then ONE page
  file: `home.css` (index sections), `cases.css`, `expertise.css`. Put page-specific
  rules in the page file; only genuinely shared rules go in base.css.
- **JS:** `site/js/base.js` = shared chrome (Lenis, GSAP/ScrollTrigger, anchor links,
  mobile menu, dropdown, header hide/show, sticky badge, scroll-spy, reveals,
  marquee, contact form) on EVERY page. `site/js/home.js` (proces band + magie wand
  + team drift/drag) ONLY on index.
- Each page links: `base.css` + its page css; `base.js` (+ `home.js` on index).

## Design tokens (from `site/css/base.css` `:root` — use ONLY these, no new hex)
- `--zwart:#000033` (navy text) · `--wit:#FFFEFD` · `--beige:#FFFCF8` (page bg)
- `--paars:#6C4CDF` (primary purple) · `--licht-paars:#AAA7F4` · `--donker-paars:#302165`
- `--groen:#71FFD0` (mint) · `--roze:#DFD0F3` (lavender) · `--oranje:#FDAC6C` (warm accent)
- Radius: `--radius:40px`, `--radius-lg:clamp(60px,12vw,200px)` (big section curves)
- Easing: `--ease:cubic-bezier(.16,1,.3,1)` (signature), `--ease-soft`
- Layout: `--maxw:1240px`, `--gutter:clamp(20px,5vw,64px)`, `--header-h:96px`, `--nav-clear:120px`

### Type
- **Degular** (Adobe Typekit, kit `kth7zsh`, linked in every `<head>`), DM Sans fallback.
  `--font` body; `--font-display:"degular-display","degular",…` for display.
- `.section-title` = display, weight 500, `clamp(34px,5.4vw,72px)`, line-height 1.04,
  max-width 16ch, `text-wrap:balance`. `.eyebrow` = uppercase, weight 600,
  letter-spacing .18em, purple, small orange dot. Reuse these primitives.

### Buttons (existing classes — reuse, don't reinvent)
`.btn` pill, 2px border, hover lifts 3px. Variants: `--primary` (purple), `--ghost`,
`--mint`, `--dark`, `--ghost-dark`, `--block`. `.link-arrow` (text + → underline-wipe)
variants: `--purple`, `--orange`, `--mint`.

## Page anatomy
- **index.html** sections (ids): `#hero` (split hero + video), marquee, `#expertise`
  (two-worlds: digital vs print), `#visie` (probleem→magie timeline), proces (mint
  band, 4 numbered steps), `#cases` (full-bleed montage), clients marquee, testi,
  boost CTA, `#team` ("Wij zijn Wizarts" disc collage), `#pro`, `#contact`, footer.
- **cases.html**: `.cases-page` → asymmetric `.cases__grid` of `.case` cards → closing CTA.
- **expertise.html** (newest): `.exp-hero` (`id="hero"`) → marquee → five numbered
  discipline blocks `.exp-disc` (ids `#websites #print #branding #marketing #ai`) →
  `.exp-webstart` (`#webstart`) → `.exp-pro` (`#pro`) → shared `.contact` (`#contact`)
  → footer. Discipline cards + "Ontdek …" links currently point to `#contact`
  (dedicated sub-pages don't exist yet).

## Assets (only reference files that EXIST in `site/assets/`)
`team-eva.png`, `team-stijn.png` (+ `-dp`/`-dm`/`-c` crops), `team-nathalie/florian/aline.png`,
`testimonial-koen.jpg`, `case-pro-honda.png`, `case-juntas.jpg`, `case-normocare.jpg`,
`case-certis.jpg`, `client-*.svg`, `logo-wizarts.svg`, `logo-w-mark.svg`,
`icon-tovenaar.svg`, `icon-wizarts-words.svg`, `watermerk.svg`,
`wij-zijn-wizarts.svg`, `badge-wij-zijn-wizarts.svg`, `partner-*.png`,
`eva_stijn_bewerkt-scaled.webp`, `ALINE.png`, `wizarts-magic.mp4`. If you need an
asset NOT here, do NOT invent a path — describe it and hand it back (extras live in
`Content/Assets/`).

## Acceptance criteria (the quality bar)
- Responsive, **no horizontal overflow** at 1440 / 768 / 375 px (scrollWidth == clientWidth).
- Clears the fixed floating header (`--nav-clear` = 120px) where relevant.
- WCAG AA contrast; keyboard-operable; honor `prefers-reduced-motion` (no essential
  content hidden, animations reduced/disabled).
- On-brand: ONLY the tokens above; ONE bold idea per unit, restrained elsewhere
  (don't pile on effects — it reads as AI-generated). Keep real Dutch copy.
- No console errors. **Verify before reporting**: load your preview, check the three
  widths for overflow, and say what you verified.

## Contracts that must NOT break (other code / units depend on these)
- **`data-reveal`** on a block → base.js adds `.is-in` when it scrolls in. Keep it.
- **Section ids** used by nav/anchors: home `#hero #expertise #visie #cases #team
  #contact #pro`; expertise `#hero #websites #print #branding #marketing #ai
  #webstart #pro #contact`. Keep your section's id (the sticky badge needs `#hero`).
- **Marquee:** `.marquee-band` > `[data-marquee]` > `.marquee__track`, word list
  duplicated EXACTLY TWICE (JS loops on `scrollWidth/2`).
- **Dropdown:** `[data-dropdown]`, `#expertiseTrigger`, `#expertiseMenu`, `.mega-row`,
  `.nav-dropdown__trigger`, `is-open`, `role="menu"/"menuitem"`, aria attrs.
- **Mobile menu:** `#navBurger`, `#mobileMenu`, `is-menu-open` on body, `data-mm` links.
- **Cases parallax:** `[data-parallax-img]` must live inside a `.case`.
- **Contact form:** `.contact__form`, field ids/names `voornaam achternaam telefoon
  email bericht`, `#formNote` (aria-live). base.js handles validation + success note.
- **Home-only hooks:** `[data-magie-timeline]`, `[data-magie-wand]`, `.magie__step`,
  `.magie__node`, `.proces`, `.proces__head`, `.steps`, `.step`, `.member`.
- Globals to leave alone: `#year`, `#stickyBadge`, `.site-header` hide/show.
- **Do NOT edit shared files for a single page's change**: don't redefine `:root`
  tokens, and don't edit `base.css` or `base.js`. Need shared behavior? Add a scoped
  rule in your page file, or hand the shared-file change back to the orchestrator.

## Preview / run / deploy
Static. Each worker gets its own worktree + its own server on its own port (the
orchestrator runs them): `python3 -m http.server <port> --directory <worktree>/site`,
open `http://localhost:<port>/<page>.html`, hard-refresh to see changes. Webroot =
`site/`. Deploy = Netlify (`publish = "site"`, no build). Remote `origin` →
github.com/JIDcreations/Wizarts3, branch `main`.

# Wizarts — Claude Code Skill

## Project Overview
You are rebuilding the **Wizarts** website — a Belgian creative agency ("creatief bureau") that combines AI speed with human craftsmanship. The site is in **Dutch (NL)**. 

The agency offers: AI-driven webdesign, premium print, branding, marketing.

---

## Brand Identity

### Tagline / Positioning
- **Main tagline:** "Gedreven door AI, gemaakt door mensen."
- **Sub-tagline:** "CREATIEF BUREAU · AI & VAKMANSCHAP"
- **Value prop:** "Wat nu als je de snelheid kreeg van AI, maar de passie van mensen? Bij Wizarts bundelen we het beste van beide werelden om jouw zaak te laten groeien."

---

## Design Tokens

### Colors
```css
:root {
  /* Brand Colors */
  --zwart:        #000033;   /* Navy — primary text */
  --wit:          #FFFEFD;   /* Warm white */
  --beige:        #FFFCF8;   /* Off-white background */
  --groen:        #71FFD0;   /* Mint green — accent sections */
  --roze:         #DFD0F3;   /* Lavender — section backgrounds */
  --paars:        #6C4CDF;   /* PRIMARY brand purple */
  --licht-paars:  #AAA7F4;   /* Light purple */
  --donker-paars: #302165;   /* Dark purple */
  --oranje:       #FDAC6C;   /* Orange — secondary accent */

  /* Spacing */
  --spacing-small:  32px;
  --spacing-gap:    96px;
  --spacing-medium: 110px;
  --spacing-big:    220px;

  /* Layout */
  --max-width:         1200px;
  --small-width:       800px;
  --border-radius:     40px;
  --border-radius-big: 200px;
  --transition:        0.3s;

  /* Typography */
  --font-text:   'Degular', 'DM Sans', sans-serif;
  --font-header: 'Degular', 'DM Sans', sans-serif;
}
```

### Color Usage
| Token | Hex | Use case |
|-------|-----|----------|
| --paars | #6C4CDF | Primary CTAs, footer bg, active states, links |
| --zwart | #000033 | All body text, headings |
| --groen | #71FFD0 | "Hoe gaan we te werk" section bg |
| --roze | #DFD0F3 | Testimonial section, team section, nav hover bg |
| --oranje | #FDAC6C | "Ben jij een Wizart" section bg, Print label color |
| --licht-paars | #AAA7F4 | Scrolling banner bg, hover accents |
| --beige | #FFFCF8 | Body/page background |
| --wit | #FFFEFD | Cards, white sections |

---

## Typography

### Font
- **Primary font:** `Degular` — loaded via Adobe Typekit kit `ygi5aww`
- **Fallback stack:** `'DM Sans', 'Outfit', 'Plus Jakarta Sans', sans-serif`
- **Import (Typekit):** `<link rel="stylesheet" href="https://use.typekit.net/ygi5aww.css">`

### Type Scale
```css
body {
  font-family: var(--font-text);
  font-size: 18px;
  color: var(--zwart);
  line-height: 1.45;
}

h1 {
  font-size: clamp(32px, 44px, 44px);
  font-weight: 500;
  line-height: 1.1;
  color: var(--zwart);
  margin-bottom: 1em;
}
h1.has-large-font-size { font-size: 70px; margin-bottom: 2rem; }

h2 {
  font-size: clamp(24px, 32px, 32px);
  font-weight: 600;
  line-height: 1.1;
  color: var(--zwart);
  margin-bottom: 1em;
}
h2.has-large-font-size { font-size: 60px; }

h3 {
  font-size: clamp(18px, 26px, 26px);
  font-weight: 500;
  line-height: 1.1;
  color: var(--zwart);
  margin-bottom: 1em;
}

p { font-size: 18px; font-weight: 400; line-height: 1.45; color: var(--zwart); }
a { font-size: 20px; font-weight: 500; line-height: 1.2; color: var(--zwart); }
li { font-size: 18px; font-weight: 500; line-height: 1.4; }

/* Eyebrow / label tags above headings */
p:first-child:has(+ h2) {
  font-size: clamp(16px, 18px, 18px);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  margin-bottom: 0;
}
```

### Responsive Typography
```css
@media (max-width: 900px) {
  h1 { font-size: 32px; font-weight: bold; }
  h2 { font-size: 28px; font-weight: bold; }
  h3 { font-size: 22px; font-weight: bold; }
  p  { font-size: 16px; }
  a  { font-size: 16px; }
}
```

---

## Buttons

### Primary (Filled Purple Pill)
```css
.btn-primary {
  background-color: var(--paars);
  border: 2px solid var(--paars);
  color: #fff;
  border-radius: 9999px;
  padding: 18px 24px;
  font-size: 20px;
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  transition: var(--transition);
}
.btn-primary:hover {
  background-color: transparent;
  color: var(--paars);
}
```

### Ghost / Outline
```css
.btn-outline {
  background-color: transparent;
  border: 2px solid var(--zwart);
  color: var(--zwart);
  border-radius: 9999px;
  padding: 18px 24px;
  font-size: 20px;
  font-weight: 500;
}
.btn-outline:hover {
  border-color: var(--paars);
  color: var(--paars);
}
```

### Text Link (Underline style)
```css
.btn-link {
  background: none;
  border: none;
  border-bottom: 2px solid var(--paars);
  border-radius: 0;
  padding: 0;
  color: var(--zwart);
  font-size: 20px;
  font-weight: 500;
}
```

---

## Layout

### Container
```css
.container {
  max-width: var(--max-width); /* 1200px */
  margin: 0 auto;
  padding-left: calc(50% - var(--max-width) / 2);
  padding-right: calc(50% - var(--max-width) / 2);
}

/* Sections with background use full-width */
.section-full {
  max-width: 100%;
  padding-left: calc(50% - var(--max-width) / 2);
  padding-right: calc(50% - var(--max-width) / 2);
}
```

### Section Spacing
```css
section {
  padding-top: calc(var(--spacing-big) / 2);    /* 110px */
  padding-bottom: calc(var(--spacing-big) / 2);  /* 110px */
}
```

### Section Transitions (Rounded corners between colored sections)
The signature design detail — sections create curved transitions with pseudo-elements:
```css
/* White section before a colored section — curve in bottom-right */
.section-before-colored::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 100%;
  background-color: white;
  height: var(--spacing-medium);
  border-radius: 0 var(--border-radius-big) 0 0;
}

/* Colored section after white — curve in top-right */
.colored-section-after-white::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  background-color: white;
  height: var(--spacing-medium);
  border-radius: 0 0 0 var(--border-radius-big);
}
```

---

## Components

### Navigation / Header
```
- Floating pill-shaped navbar
- background: rgba(255,255,255,0.58) with blur/frosted glass
- margin-top: 32px (--spacing-small)
- max-width: 1200px, centered
- Logo left, nav center, CTA button right
- Nav link hover: purple underline animation (::before width 0→100%)
- Active link: 2px solid purple underline
- Mobile: hamburger → full-screen overlay with --roze background
```

### Hero Section
```
- Eyebrow tag: uppercase, letter-spacing 1px, ~14-16px
- Hero heading: ~80-100px, font-weight 700
  - Lines 1-2: color --zwart
  - Last word "mensen." — color --paars, underline with --oranje
- Subtext: centered, max-width ~600px, 18-20px
- 2 CTA buttons: filled + ghost, side by side
- Background: soft gradient (light lavender to mint, top-left to bottom-right)
- Decorative floating 3D elements (cube, sphere, X GIFs)
```

### Service Cards (Expertise Section)
```
- 2-column layout separated by thin vertical divider
- Left: DIGITAAL (green dot indicator)
- Right: PRINT (orange dot indicator)  
- H3 heading per service
- Body text 16-18px
- Arrow list items (›) with horizontal divider lines
- Colored link at bottom: --paars for digital, --oranje for print
```

### Problem → Magic List
```
- 5 pairs, alternating ✕ problem (strikethrough style) / solution
- Problem text: muted/grey
- Solution text: bold, dark
- Icon ✕ in --oranje circle
```

### Process Steps (Hoe gaan we te werk)
```
- Section background: --groen (#71FFD0)
- Horizontal timeline with numbered circles (01, 02, 03, 04)
- Circle: --licht-paars background, 50px diameter, font-weight 700, font-size 40px
- 4-column grid on desktop, 2-col tablet, 1-col mobile
- Step body text: font-weight 300
```

### Project Cards
```
- Full-bleed image with border-radius: --border-radius (40px)
- Image height: 600px desktop, 350px mobile
- Hover: image scale(1.1) with overflow hidden
- "Bekijk dit project" badge: purple pill bottom-left, appears on hover
- Grid: alternating wide (span 2) + narrow (span 1)
```

### Scrolling Banner
```
- Background: --licht-paars (#AAA7F4)
- Text: 50px, font-weight 500
- Items: "wizarts ✦ webdesign ✦ print ✦ branding ✦ marketing"
- Animation: scroll-left 20s linear infinite (duplicate content for seamless loop)
```

### Testimonial
```
- Background: --roze (#DFD0F3)
- Client photo: circular crop (border-radius 50%)
- Quote text: large, 26px
- Author name: bold, role in lighter weight
```

### Team Members (Magic section)
```
- Background: --roze / --licht-paars  
- Person photos: circular crop
- Name + fun role title (e.g. "opmaakvlinder", "magische manus")
- Hobby shown as secondary text
- Hover: reveals tooltip/card with role info
```

### Footer
```
- Background: --paars (#6C4CDF)
- Text: white
- Curved top-left corner: border-radius: var(--border-radius-big) 0 0 0
- 3-column nav grid + contact column
- Social icons: circular white bg, purple SVG icons (40×40px)
- Sub-footer: 14px links (Privacy, Cookies, Verkoopsvoorwaarden)
- Partner logos: Voka, Unizo, Flanders DC, Feweb — max-width 100px each
```

### Contact Form
```
Fields: Voornaam, Achternaam, Telefoonnummer, Email, Bericht (textarea)
Submit: "Ik wil een gesprek inplannen" — filled purple pill button
```

---

## Animations & Motion

```css
/* Scrolling banner */
@keyframes scroll-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* Rotating sticky icon */
@keyframes rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Fade in */
@keyframes fadeIn {
  to { opacity: 1; }
}

/* Image hover zoom */
.project-image { transition: 0.2s; }
.project-image:hover { transform: scale(1.1); }
```

---

## Site Structure & Navigation

```
/ (Home)
/alle-projecten/
/expertise/
  /expertise/webdesign/
  /expertise/webdesign/e-commerce/
  /expertise/print/
  /expertise/print/grootformaat/
  /expertise/print/belettering-wrapping-auto/
  /expertise/branding/
  /expertise/branding/grafische-vormgeving/
  /expertise/branding/animatie-video/
  /expertise/branding/fotografie/
  /expertise/branding/copywriting/
  /expertise/branding/illustraties/
  /expertise/marketing/
  /expertise/marketing/mailing-campagnes/
  /expertise/marketing/marketingadvies/
  /expertise/marketing/social-media/
  /expertise/marketing/seo-marketing/
  /expertise/marketing/advertising/
/over-ons/
/wizarts-pro/
/contact/
/jobs/
/case/pro-honda-oil/
/case/juntas/
/case/certis/
/case/normocare/
/case/renault/
```

---

## Homepage Sections (in order)

1. **Header** — Floating nav
2. **Hero** — "Gedreven door AI, gemaakt door mensen."
3. **Expertise** — Digitaal + Print two-column
4. **Probleem → Magie** — Pain point transformation list
5. **Hoe gaan we te werk** — 4-step process (green bg)
6. **Cases** — Project grid with CTA
7. **Scrolling banner** — "wizarts webdesign print branding marketing"
8. **Expertise list** — Services checklist (purple bg)
9. **Klanten** — Testimonial (lavender bg)
10. **Business boosten** — CTA with team photo background
11. **Team** — Meet the Wizarts (lavender bg)
12. **Ben jij een Wizart?** — Recruitment CTA (orange bg)
13. **Wizarts Pro** — Agency/white-label offer
14. **Footer form** — "Klaar om jouw omzet te verhogen?"
15. **Footer** — Nav + contact (purple bg)

---

## Full Homepage Copy (NL)

### Hero
- Eyebrow: `CREATIEF BUREAU · AI & VAKMANSCHAP`
- H1: `Gedreven door AI, gemaakt door mensen.`
- Sub: `Wat nu als je de snelheid kreeg van AI, maar de passie van mensen? Bij Wizarts bundelen we het beste van beide werelden om jouw zaak te laten groeien.`
- CTA1: `Start je project →`
- CTA2: `Bekijk ons werk`

### Expertise
- Eyebrow: `EXPERTISE`
- H2: `Twee werelden. Eén naadloze merkervaring.`
- DIGITAAL H3: `AI Digital Experts`
- DIGITAAL body: `Razendsnelle, AI-gedreven websites op een fundament van ijzersterke techniek. De tijd die AI wint, investeren wij in conversie, UX en gemoedsrust.`
- DIGITAAL list: AI-driven webdesign & e-commerce / Hosting & digitale zekerheid / SEO, advertising & digitale groei
- DIGITAAL CTA: `Ontdek digitaal →`
- PRINT H3: `Premium Print Experts`
- PRINT body: `In een scherm-vermoeide wereld is tastbaarheid het ultieme luxeproduct. Wij vertalen je merk naar drukwerk dat je voelt — van naamkaartje tot gevel.`
- PRINT list: Tactiele branding & drukwerk / Premium verpakkingen / Grootformaat & buitenreclame
- PRINT CTA: `Ontdek print →`

### Probleem → Magie
- Eyebrow: `PROBLEEM → MAGIE`
- H2: `Herkenbaar? Wij toveren je struikelblokken om tot groei.`
- Quote: `"Negen op de tien ondernemers lopen vast op net dezelfde dingen. Onze job? Ze stuk voor stuk omdraaien." — Stijn, Wizarts`
- Pain 1: De technische kennis in je bedrijf ontbreekt → Een website die je moeiteloos zelf beheert
- Pain 2: Je mist een professionele en creatieve blik → Branding die professioneel oogt én blijft hangen
- Pain 3: Je website blijft liggen door tijdsgebrek → Vlotte opvolging — wij nemen het stuur over
- Pain 4: Je weet niet wat je website eigenlijk oplevert → Slimme meting en glasheldere rapporten
- Pain 5: Er is geen helder plan of doel voor je marketing → Een heldere strategie, concrete doelen én logische structuur
- CTA label: `Klaar om je struikelblokken om te toveren?`
- CTA sub: `Eva & het team toveren mee.`
- CTA: `Onze expertise →`

### Branding Process
- Eyebrow: `BRANDING`
- H2: `Hoe gaan we te werk?`
- Link: `Lees meer over branding →`
- 01 Grondige analyse: We starten met een grondige analyse van je merk, je doelgroep en de uitdagingen die je ervaart. Zo krijgen we helder wat écht nodig is om te groeien.
- 02 Merkstrategie: Op basis van die inzichten bepalen we een duidelijke merkstrategie, afgestemd op jouw doelen. Zo bouwen we richting én herkenbaarheid in je communicatie.
- 03 Ontwerp & creatie: We vertalen de strategie naar een sterke visuele identiteit, branding en tools die je merk laten spreken — online én offline.
- 04 Evaluatie & optimalisatie: Na de lancering volgen we op, meten we de impact en sturen we bij waar nodig. Zo blijf je relevant en effectief communiceren.

### Cases CTA
- H2: `Sta jij hier binnenkort ook tussen?`
- Body: `Krijg je het helemaal warm bij het zien van onze cases? En kan je niet wachten om kennis te maken met onze magische krachten? Boek dan snel een afspraak met Stijn`
- CTA: `Show me the magic →`

### Expertise List (purple bg)
- H2: `Onze expertise`
- Items: Print en grootformaat / Webdesign en development / Marketing / Fotografie / Branding / Copywriting & social media
- CTA: `Bekijk hier onze toverkrachten →`

### Testimonial
- Eyebrow: `ONZE KLANTEN`
- H2: `Een greep uit onze klanten`
- Quote: `"Zéér professioneel agentschap met oog voor detail. Hebben kennis van zaken, geven eigen input zonder de wensen van de klant uit het oog te verliezen. Zéér vlotte samenwerking en een fantastisch eindresultaat!"`
- Author: `Koen F. — Marketing Manager Certis Benelux`

### Business Boosten CTA
- H2: `Samen jouw business boosten?`
- Body: `Geïnspireerd door onze cases? Klaar om zelf de kracht van onze aanpak te ervaren? Plan een gesprek met Stijn en ontdek wat we voor jou kunnen betekenen!`
- CTA: `Show me the magic →`

### Team
- Intro H2: `We helpen kmo's hun marketing doelen snel te bereiken, met een persoonlijke aanpak en oog voor design.`
- Members: Nathalie (opmaakvlinder) / Stijn De Pauw (magische manus) / Aline (pixelpoëet) / Florian (webalchemist) / Amber (woordenfluisteraar) / Eva (teamtoverstaff) / Stijn De Mulder (code Gandalf)

### Jobs CTA (orange bg)
- H2: `Ben jij een echte Wizart?`
- Body: `Krijg je het helemaal warm bij het zien van onze cases? En kan je niet wachten om kennis te maken met onze magische krachten? Boek dan snel een afspraak met Stijn.`
- CTA1: `Leer ons kennen →` → /over-ons/
- CTA2: `Kom in ons team →` → /jobs/

### Wizarts Pro
- Eyebrow: `TECHNISCHE ONDERSTEUNING BIJ WEB & PRINT`
- H2: `Wizarts Pro voor agencies`
- Body: `Je hebt de strategie, de klanten en ijzersterke designs, maar komt soms de technische handen of kennis tekort voor de perfecte uitvoering. Met Wizarts Pro worden we een verlengstuk voor jouw agency of studio. We schuiven mee aan tafel als jouw technische partner en zorgen ervoor dat jouw visie exact wordt gebouwd zoals jij het bedacht hebt.`
- CTA: `Ontdek Wizarts Pro →`

### Footer Form
- H2: `Klaar om jouw omzet te verhogen?`
- Sub: `Wij contacteren je zo snel mogelijk en luisteren vrijblijvend hoe we jou kunnen helpen. Boek dan snel je gesprek met Stijn via onderstaand formulier.`
- Fields: Voornaam / Achternaam / Telefoonnummer / Email / Bericht
- Submit: `Ik wil een gesprek inplannen`

---

## Assets & Images

All images are at: `https://wizarts2.netlify.app`

### Brand / Logos
| File | Path | Use |
|------|------|-----|
| Wizarts logo | /wp-content/uploads/2023/12/Group-1.svg | Header + Footer |
| Wizarts icon | /wp-content/uploads/2024/09/icon_wizarts_words.svg | Favicon / icon |
| W watermark | /wp-content/uploads/2024/01/Middel-2.svg | Footer decoration |
| Tovenaar icon | /wp-content/uploads/2024/09/tovenaar.svg | Decorative |
| Wizarts badge | /wp-content/uploads/2024/09/Wij-zijn-Wizarts-4.svg | Branding |
| Watermerk | /wp-content/uploads/2023/12/watermerk-wizarts.svg | Background watermark |

### Team
| Person | Path |
|--------|------|
| Stijn De Pauw | /wp-content/uploads/2024/08/stijn_whuuut-1.png |
| Eva | /wp-content/uploads/2024/08/eva_magic.png |
| Koen (testimonial) | /wp-content/uploads/2025/05/koen-certis.jpg |

### Client Logos
| Client | Path |
|--------|------|
| Certis | /wp-content/uploads/2024/08/certis.svg |
| Pro Honda | /wp-content/uploads/2024/08/pro-honda.svg |
| Weemaes | /wp-content/uploads/2024/08/weemaes.svg |
| Next UPS | /wp-content/uploads/2024/08/Next-UPS-15.svg |
| Ostron | /wp-content/uploads/2024/01/ostron.svg |
| Juntas | /wp-content/uploads/2024/08/juntas.svg |
| Renault | /wp-content/uploads/2024/08/renault.svg |
| Dressr | /wp-content/uploads/2024/08/dressr.svg |

### Case Images
| Project | Path |
|---------|------|
| Pro Honda folder | /wp-content/uploads/2026/03/honda-folder-mock-up-scaled.png |
| Juntas visitekaartje | /wp-content/uploads/2024/08/junts_visitekaartje_new-1-scaled.jpg |
| Certis | /wp-content/uploads/2024/01/certis_clean-1-scaled.jpg |
| Normocare | /wp-content/uploads/2024/08/visitekaartje-1-scaled.jpg |

### Animated Hero Elements
| Asset | Path |
|-------|------|
| X orange GIF | /hero-concepts/assets/elements/x-orange.gif |
| Cube GIF | /hero-concepts/assets/elements/cube.gif |
| Sphere GIF | /hero-concepts/assets/elements/sphere.gif |

### Partner Logos
| Partner | Path |
|---------|------|
| Voka | /wp-content/uploads/2025/05/voka.png |
| Unizo | /wp-content/uploads/2025/05/unizo.png |
| Flanders DC | /wp-content/uploads/2025/05/flanders-dc.png |
| Feweb | /wp-content/uploads/2025/05/feweb.png |

---

## Contact Info

```
Address:  Antwerpse Stwg 144 bus 101, 9080 Lochristi
Phone:    +32 476 70 79 43
Email:    info@wizarts.be
Facebook: https://www.facebook.com/wizarts.be/
Instagram: https://www.instagram.com/wizarts.be/
LinkedIn: https://www.linkedin.com/company/wizarts-communicatie/
Maps:     https://www.google.com/maps/place/Wizarts+webdesign+%26+branding+agency/
```

---

## Coding Guidelines

- Language: Dutch (NL) throughout all copy
- Framework: Your choice (Next.js / Astro / plain HTML recommended)
- CSS: Use the CSS custom properties above — keep variable names identical
- Images: Fetch from the original URLs above or download to /public/images/
- Font: Load Degular via Typekit kit `ygi5aww`, or substitute DM Sans for open-source
- Accessibility: All images need Dutch alt text
- Responsive breakpoints: 1350px (tablet), 900px (mobile), 600px (small mobile)
- The "rounded section transition" effect (::before/::after pseudo elements) is a key visual signature — implement it
- Buttons always have 2px solid border (same color as bg) for hover state transition
- All headings use `text-wrap: balance`

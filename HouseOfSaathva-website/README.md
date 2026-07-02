# House of Saathva — Website

Complete static website for House of Saathva (wedding films & photography, Mangalore).
Pure HTML / CSS / JavaScript — no build tools, no frameworks, no backend required.

## How to view it

Just open `index.html` in any browser. That's it — no server needed to look around.

For local development with auto-reload, you can use the free VS Code extension
"Live Server" — right click `index.html` → "Open with Live Server."

## Folder structure

```
hos-site/
├── index.html          Home page
├── about.html           About page
├── stories.html         Wedding portfolio
├── films.html            Films / videos page
├── heirlooms.html       Pre-wedding / intimate sessions
├── journal.html          Blog listing page
├── blog-1.html            Sample blog article (duplicate this for blog-2, blog-3)
├── faqs.html              FAQ accordion page
├── contact.html          Contact form page
├── css/
│   └── style.css        ALL styling lives here — one shared file
├── js/
│   └── main.js          ALL JavaScript lives here — one shared file
└── images/               All images — currently placeholder graphics
```

## Creative system (added in v2)

The site now has five intentional "luxury" touches layered on top of the base
build. None of these need extra work from you — they're already wired up
sitewide — but it helps to know how they work in case you extend the site:

1. **Filmstrip hero** (`index.html`) — instead of one static photo, the
   homepage hero has a slow-scrolling reel of frames behind the title.
   It currently reuses the story/heirloom placeholder images — once real
   photos replace those same filenames, the filmstrip updates automatically.

2. **Heirloom seal divider** (`.divider-dots` in `css/style.css`) — every
   section divider sitewide (previously plain dots) is now a stitched
   thread + wax-seal mark. One signature visual element repeated
   consistently, rather than decoration scattered everywhere.

3. **Film grain texture** (`.texture-grain` class) — a subtle noise overlay
   on all dark/maroon sections (tagline section, CTA banners), so they read
   as "aged photograph" rather than flat color blocks. Pure CSS, no image.

4. **Tagline scroll sequence** (`#time-section` on the homepage) — each line
   of the "Time changes everything..." copy starts dim and slightly blurred,
   sharpens into focus as you scroll to it, then settles into a soft dim as
   the next line takes over — the words visually perform their own meaning.
   Driven by `js/main.js`, the "Tagline scroll sequence" block.

5. **Photo developing effect** (`.develop` class) — images tagged with this
   class (story cards, portraits, heirloom shots) start slightly desaturated,
   blurred, and zoomed in — like a print surfacing in a darkroom tray — then
   resolve to full clarity once scrolled into view. Already applied to the
   relevant `<img>` tags; just keep the `class="develop"` attribute when you
   swap in real photos.

If you want to apply the `.develop` effect to any new image you add later,
just add `class="develop"` to that `<img>` tag and wrap its parent section
with `class="reveal"` (already the pattern used throughout the site).

## What's already working

- Fully responsive (mobile, tablet, desktop) — resize your browser to check
- Mobile hamburger menu
- FAQ accordion (click a question to expand/collapse)
- Story filter buttons on the Stories page (All / Hindu / Konkani / Christian / Intimate / Destination)
- Scroll-reveal animations (sections fade in as you scroll)
- Contact form (needs Formspree setup — see below)
- SEO meta tags + FAQ schema markup on every page
- Open Graph tags for social sharing

## What YOU need to do

### 1. Replace placeholder images (biggest task)
Every image in `/images` is currently a generated maroon-and-gold placeholder
with a text label telling you what should go there. Once real wedding photos
are ready (around July 15), replace these files — just keep the same filenames
and the site will update automatically. No code changes needed.

Until real photos are ready, you may use royalty-free stock photos from
unsplash.com or pexels.com (search "Indian wedding") to make the site look
more finished for demo purposes — just don't forget to swap them later.

### 2. Connect the contact form
The form currently points to a placeholder Formspree URL. To make it actually
send emails:
1. Go to https://formspree.io and create a free account
2. Create a new form, copy your form endpoint (looks like `https://formspree.io/f/xxxxxxx`)
3. Open `contact.html`, find this line near the top of the form:
   ```html
   <form id="contact-form" class="reveal" action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">
   ```
4. Replace `YOUR_FORMSPREE_ID` with your real endpoint
5. Test it — submit the form and check your email

### 3. Connect Instagram feed
The Instagram grid on the homepage currently shows placeholder squares.
Once @houseofsaathva has real posts, use a free embed tool like
https://curator.io or https://snapwidget.com to pull in live posts —
both have simple copy-paste embed codes, no coding required.

### 4. Add real wedding films
On `films.html`, the embedded videos are placeholders. Replace the
`src="https://www.youtube.com/embed/..."` URLs with real House of Saathva
films once they're uploaded to YouTube or Vimeo (just grab the embed link
from YouTube/Vimeo's "Share → Embed" option).

### 5. Write the two remaining blog articles
`blog-1.html` is a complete template with the full outline already written
in HTML comments inside the file. Duplicate it to create `blog-2.html` and
`blog-3.html`, then write the body content using the outlines below:

**Article 2 — Tulu Wedding Traditions**
H1: Tulu Wedding Traditions and Rituals
H2: The Significance of the Nischaya Tambulatam (Engagement)
H2: Mehendi, Haldi, and Pre-Wedding Rituals in Tulu Weddings
H2: The Wedding Day — Rituals, Customs, and Moments Worth Capturing
H2: Why These Traditions Deserve to Be Preserved as Visual Heirlooms

**Article 3 — Wedding Films vs Albums**
H1: Wedding Films vs Wedding Albums — Which Matters More?
H2: What a Wedding Film Captures That Photos Cannot
H2: The Emotion of Hearing Your Vows Again, 10 Years Later
H2: How House of Saathva Approaches Cinematic Wedding Films

Don't forget to update `journal.html` — the `href` on each blog card already
points to `blog-2.html` and `blog-3.html`, so just make sure those files exist.

## Before going live — checklist

- [ ] All placeholder images replaced with real photos
- [ ] Contact form connected to Formspree (or similar) and tested
- [ ] Instagram embed connected and showing real posts
- [ ] Real wedding films embedded on films.html
- [ ] blog-2.html and blog-3.html written and linked
- [ ] Test on a real phone, not just browser resize
- [ ] Run the site through https://pagespeed.web.dev and fix anything flagged red
- [ ] Buy a domain (e.g. houseofsaathva.com) and connect hosting
  (Netlify, Vercel, or GitHub Pages all offer free hosting for static sites like this)
- [ ] Submit sitemap to Google Search Console once live
- [ ] Update the email address in the footer / contact page (currently
      hello@houseofsaathva.com — change if a different inbox is used)

## Colors & Fonts reference

```css
--maroon: #7A2330;
--maroon-dark: #3D1119;
--gold: #C9A227;
--gold-light: #D4AF37;
--ivory: #FBF8F2;
--cream: #F4ECDC;
--dark: #3A2E28;
--gray: #9C8A7C;
```

Fonts: **Cormorant Garamond** (headings) + **DM Sans** (body) — both loaded
automatically from Google Fonts at the top of `style.css`. No setup needed.

## Questions?

Every section of every HTML file has an `<!-- INTERN NOTE: ... -->` comment
explaining what to do and why. Search for "INTERN NOTE" in your code editor
to find every place that needs your attention.

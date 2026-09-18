# Roberto Piran Amedi — Portfolio

Personal portfolio for Piran, AI & automation developer at Cyntora (Norrköping, Sweden).
Built with React 19, Vite 7, GSAP 3.13 (ScrollTrigger, SplitText, ScrambleText) and Lenis smooth scroll.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # preview the production build
npm run lint
```

## Where the content lives

All copy is data, not markup. Edit these files and the sections update:

| File | What it holds |
| --- | --- |
| `src/data/profile.js` | Name, role, location, email, links, hero intro, about paragraphs, stats |
| `src/data/cyntora.js` | The "Now" section: intro, six areas of work, stack, how I work |
| `src/data/projects.js` | "Selected work": systems built at Cyntora, plus earlier projects |
| `src/data/experience.json` | Work history (newest first) |
| `src/data/placements.json` | Internships |
| `src/data/education.json` | All courses (previously fetched from Firebase, now local) |
| `src/data/skills.js` | Icons for the stack marquee |

## Structure

```
src/
  App.jsx               preloader → home
  pages/Home.jsx        section order
  components/           one folder-less component + css per section
  hooks/useLenis.js     Lenis + GSAP ticker integration
  lib/gsap.js           plugin registration, shared eases
  lib/lenis.js          scrollTo helper used by nav / buttons
  styles/global.css     design tokens (colours, fonts, spacing), base styles
```

The accent colour is a single token: `--accent` in `src/styles/global.css`.
The hero canvas colours are in `src/components/HeroCanvas.jsx`.

## Motion

- Preloader counts to 100 while fonts and assets load, then wipes up.
- Hero: masked SplitText character reveal, pointer parallax, scroll fade, canvas orbs.
- About: word-by-word reading effect on scroll, counters.
- Now: pinned horizontal scroll on desktop, stacked cards on mobile.
- Work: floating preview that follows the pointer (desktop only).
- Experience: timeline line drawn on scroll.
- Education: GSAP-animated accordions per semester.
- Marquees react to scroll velocity and direction.

`prefers-reduced-motion` is respected: intro timelines jump to their end state and marquees pause.

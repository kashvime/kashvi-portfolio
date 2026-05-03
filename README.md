# Portfolio

**Live:** [kashvime.github.io/kashvi-portfolio](https://kashvime.github.io/kashvi-portfolio)

React + TypeScript. 

---

## Stack

- **React 19 + TypeScript + Vite**
- **Framer Motion** — animations and viewport detection
- **GitHub Pages** — deployed via `gh-pages`

---

## Design

Editorial-inspired. Oversized serif headlines, cream background (`#EDE8D3`), dusty pink accent (`#B83A5E`).

- **Cormorant Garamond** for display text, **Inter** for everything else
- Font sizes use `clamp()` to scale fluidly — minimal media queries needed
- All layout is CSS Grid/Flexbox with inline styles; mobile handled by a `useIsMobile` hook

---

## Structure

```
src/
├── data.ts          # all content lives here — projects, experience, skills
├── components/
│   ├── Hero.tsx
│   ├── Work.tsx
│   ├── ExperienceSection.tsx
│   ├── Skills.tsx
│   ├── Education.tsx
│   ├── Contact.tsx
│   └── useIsMobile.ts
└── index.css
```

---

## Local dev

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run deploy
```

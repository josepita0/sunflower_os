# SUNFLOWER_OS_V1.0

Retro web game built with Vite + React. The player grows a sunflower inside a fictional terminal interface by keeping a watering rhythm stable enough to push the plant through five visual stages:

- Seed
- Sprout
- Stem
- Leaves
- Full flower

## Features

- Analog terminal layout with rigid block nesting
- CRT-inspired scanlines, flicker and phosphor glow
- Pixel-art sunflower rendered on a canvas
- Hydration and growth tracked in real time
- Typing-effect system messages
- Optional 8-bit style click audio via Web Audio API
- Ready for static deployment on Vercel or Netlify

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Preview the production build

```bash
npm run preview
```

## Deploy

The app builds to `dist/` with Vite and can be deployed directly on Vercel or Netlify as a standard static site.

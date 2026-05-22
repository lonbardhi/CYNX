# CYNX

CYNX is a React, TypeScript, Vite, and Node.js implementation of the Figma Make
file "Rebrand to CYNX".

The app includes the full CYNX consultancy surface from the design:

- CYNX brand system and responsive navigation
- AI, data, software, solution design, and cyber security service catalogue
- Dedicated detail views for every service
- Case study cards and modal detail flows
- Technology stack tabs
- About page and founder section
- Contact consultation modal backed by a Node/Express API route

## Stack

- React 19
- TypeScript
- Vite
- Node.js and Express
- Lucide React icons

## Development

```bash
pnpm install
pnpm dev
```

The development server runs at `http://127.0.0.1:3000` by default.

## Build

```bash
pnpm build
pnpm start
```

`pnpm start` serves the production build through the Express server.

## Figma Source

Source design: https://www.figma.com/make/JXmpEtx8a56wjw6EXdFvyP/Rebrand-to-CYNX

The original Figma Make export contained a very large generated Tailwind/shadcn
single-page implementation and many generated assets. This repository adapts
that design into a maintainable typed React application with shared data and
reusable page components.

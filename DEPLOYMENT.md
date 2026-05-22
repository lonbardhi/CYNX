# Deployment

## Local Production Check

```bash
pnpm install
pnpm build
pnpm start
```

The Express server serves `dist/index.html` and static assets when
`NODE_ENV=production`.

## Environment

- `PORT` changes the server port. Default: `3000`.
- The contact form posts to `POST /api/contact`.

## Deploying

This project is a standard Vite build with a small Node.js server:

- Build command: `pnpm build`
- Production command: `pnpm start`
- Output directory: `dist`

If deploying as a static-only site, the UI still builds to `dist`, but the
contact form endpoint must be replaced with the hosting provider's serverless
function or form handler.

# Tola Portfolio

Bilingual Khmer/English portfolio using Next.js 16, React 19, Tailwind CSS 4, and a separate Express API.

## Local development

Use Node.js 20.9 or later. Install both sets of dependencies:

```sh
npm ci
npm --prefix server ci
```

Copy `.env.example` to `.env.local` and `server/.env.example` to `server/.env`. Set `ADMIN_TOKEN` in `server/.env` to a long random secret. Run these in separate terminals:

```sh
npm run dev:api
npm run dev
```

Open http://localhost:3000. On Windows, use `npm.cmd` if PowerShell blocks `npm.ps1`.

## Projects and contact

- `/admin` lists projects. Enter the configured admin token to add, edit, or delete. The token stays in component memory and is not saved in browser storage.
- Add project images to `public/` and enter their root-relative path (for example `/BLS.png`).
- The API writes projects to `server/data/projects.json` and contact submissions to `server/data/messages.jsonl`. Contact messages are saved locally; email delivery is not configured.
- The public project section uses bundled data from `Data/projects.ts` when the API is unavailable.
- Missing CV and video-gallery links have been removed. Add the actual assets before restoring those entries.

## Checks

```sh
npm run lint
npm run typecheck
npm run test:api
npm run build
```

The API integration test uses temporary storage and checks authorization, validation, CRUD, persistence, and contact submission. The build downloads Kantumruy Pro from Google Fonts and needs network access.

## Deployment

Run the Next.js application and the Express API. Set `API_URL` before building to the API's server-side address; browser requests use same-origin `/api` URLs through a Next.js rewrite. Use `npm run build` and `npm start` for the frontend, and `npm --prefix server start` for the API.

Set `HOST=0.0.0.0` if the API needs to accept connections from another container. Configure HTTPS for the public site, `FRONTEND_ORIGIN` for any direct browser API access, and `DATA_DIR` to persistent storage. This file-backed API is intended for one server process; multiple replicas require a shared database. Back up the data directory. Project writes are disabled when `ADMIN_TOKEN` is unset.

The repository currently tracks legacy `server/node_modules` files; ignore rules prevent new dependency directories from being added, but existing tracked files require a separate Git index cleanup.

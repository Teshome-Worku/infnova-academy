# Infnova Courses

A small React + Vite single-page app that lists courses and shows course details. This README explains the project structure, why key files are organized the way they are (useful talking points for an internship evaluation), how to run the app locally, and deployment notes.

**Quick snapshot**
- Tech: React, Vite, Tailwind CSS
- Pattern: component-driven SPA, centralized API client, lightweight custom data hook

---

## Features

- List of courses fetched from a remote API
- Course detail page
- Reusable components: `CourseCard`, `Navbar`, `Footer`, `LoadingSpinner`, `ErrorMessage`
- Dev proxy for API requests (configured in `vite.config.js`)

---

## Tech stack

- React (JSX)
- Vite (dev server + build)
- Tailwind CSS
- Browser Fetch API (wrapped in `src/lib/api.js`)

---

## Quick start

Prerequisites: Node 18+ recommended and npm (or yarn/pnpm).

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

---

## Local dev proxy and environment notes

- `vite.config.js` configures a dev `server.proxy` that forwards `/api/*` to `https://infnova-course-api.vercel.app`. This avoids CORS in development and allows frontend code to call a relative `/api` base path.
- `src/lib/api.js` uses `BASE_URL = '/api'`. In development those calls go through Vite's proxy. In production prefer using an environment variable:

```js
const BASE_URL = import.meta.env.VITE_API_BASE || '/api'
```

Then set `VITE_API_BASE` in your deployment environment (or host the API under `/api` on the same origin).

---

## Project structure (key files and rationale)

- `index.html` — App HTML root used by Vite.
- `vite.config.js` — Vite config; includes React plugin, Tailwind integration, and the dev proxy definition.
- `package.json` — scripts and dependencies.

- `src/main.jsx` — App bootstrap; mounts React into the DOM.
- `src/App.jsx` — App layout / route composition.

- `src/lib/api.js` — Centralized API client. Reasons to centralize:
  - One place for base URL and endpoint definitions
  - Easier to add auth headers or retry logic later
  - Easy to mock/stub in tests
  - Keeps components focused on rendering and state

- `src/hooks/useFetch.js` — Reusable data-fetch hook that manages `data`, `loading`, and `error`. It encapsulates common `useEffect` patterns and includes a cleanup flag to avoid setState after unmount.

- `src/pages/CoursesPage.jsx` — Page that lists courses (uses `fetchCourses()` via `useFetch`).
- `src/pages/CourseDetailPage.jsx` — Page that shows a single course (uses `fetchCourseById(id)`).

- `src/components/*` — Presentational UI components (`CourseCard`, `Navbar`, `Footer`, `LoadingSpinner`, `ErrorMessage`, `Icons`). These keep UI concerns separated from data logic.

---

## Data flow summary

1. `CoursesPage` calls `useFetch(() => fetchCourses(), [])` on mount.
2. `useFetch` invokes the passed `fetchFn`, toggles `loading`, and returns `data` or `error`.
3. `fetchCourses()` in `src/lib/api.js` performs `fetch('/api/courses')` (proxed in dev) and returns parsed JSON.
4. The page renders `CourseCard` components from the `data` array.

This separation (API client + hook + presentation) demonstrates modular architecture and makes the app easier to extend and test.

---

## Suggested improvements (good talking points)

- Use `import.meta.env.VITE_API_BASE` in `src/lib/api.js` for environment-specific URLs.
- Integrate `AbortController` in `useFetch` (or accept an abort signal in `fetch` functions) to cancel requests on unmount.
- Normalize error responses (return consistent `{ status, message }`) for simpler UI handling.
- Consider `react-query`/`SWR` for caching and background revalidation for shared resources.
- Add unit tests: mock `fetch` for `api.js` tests and test pages/components with React Testing Library.

---

## Deployment notes

- Build with `npm run build`. Serve `dist/` from a static host and ensure the production API URL is configured (either host API under `/api` on same origin or set `VITE_API_BASE`).

Example: set `VITE_API_BASE=https://api.example.com` during build or runtime and use it in `src/lib/api.js`.

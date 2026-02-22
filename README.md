# infnova-academy

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

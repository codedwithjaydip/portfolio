# Jaydip Solanki — Developer Portfolio

A full-stack portfolio built with the MERN stack. The frontend is a React + Vite
single-page app; the backend is an Express REST API backed by MongoDB, serving
project data, handling contact messages and powering a JWT-protected admin
dashboard.

Live site: _add your deployed URL here_

---

## Features

**Public site**

- Animated hero, about section with an education timeline, and a skills grid that
  distinguishes established skills from ones still being learned
- Project gallery with category filtering and animated transitions
- Dedicated detail page per project covering the problem, solution, architecture,
  challenges and takeaways
- Development journey timeline and a currently-learning roadmap
- GitHub section pulling live repository and language data from the public API,
  with a graceful fallback when rate-limited
- Working contact form with client- and server-side validation, spam honeypot,
  rate limiting and email notification
- Custom 404, loading states, skeleton loaders and empty states throughout

**Admin dashboard** (`/admin`)

- JWT-authenticated sign-in
- Dashboard counts for total/featured projects and total/unread messages
- Feature, unfeature and delete projects
- Read, mark read/unread and delete contact messages

**Engineering**

- Projects load from `GET /api/projects`, with a bundled fallback dataset so the
  site still renders fully when the API is unreachable
- Route-level code splitting for the project detail and admin pages
- Full keyboard navigation, visible focus states, semantic landmarks, ARIA labels
  and `prefers-reduced-motion` support
- Open Graph and Twitter card metadata, JSON-LD person schema, `robots.txt` and a
  sitemap

---

## Tech stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion, React Router, Lucide React |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB |
| Auth | JSON Web Tokens, bcrypt |
| Email | Nodemailer |
| Security | helmet, cors, express-rate-limit, express-validator |

---

## Screenshots

Add real screenshots to `client/public/images/projects/` and reference them from
each project's `screenshots` array in `server/utils/projects.seed.json`.

The repository currently ships generated SVG placeholder covers at 16:9.

---

## Folder structure

```
.
├── client/                     React + Vite frontend
│   ├── public/
│   │   ├── images/projects/    Project covers and screenshots
│   │   ├── favicon.svg
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── components/         Reusable UI (Button, Badge, ProjectCard, ...)
│   │   ├── sections/           Home page sections (Hero, About, Projects, ...)
│   │   ├── pages/              Routed pages (Home, ProjectDetail, Admin, 404)
│   │   ├── layouts/            Shared page shell
│   │   ├── hooks/              useProjects, useScrollSpy, useAdminAuth, ...
│   │   ├── services/           API and GitHub clients
│   │   ├── data/               Profile, skills and fallback project data
│   │   ├── utils/              Motion variants, class-name helper
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── vercel.json
│
└── server/                     Express REST API
    ├── config/db.js
    ├── controllers/            Request handlers
    ├── middleware/             auth, validation, rate limiting, errors
    ├── models/                 Project, Message, Admin
    ├── routes/                 Route definitions
    ├── services/mailer.js
    ├── utils/                  Seed data, seed and create-admin scripts
    ├── server.js
    └── .env.example
```

---

## Environment variables

### `server/.env`

| Variable | Required | Notes |
| --- | --- | --- |
| `PORT` | no | Defaults to `5000` |
| `NODE_ENV` | no | Set to `production` when deployed |
| `MONGO_URI` | yes | MongoDB Atlas connection string |
| `JWT_SECRET` | yes | Long random string — see below |
| `JWT_EXPIRES_IN` | no | Defaults to `2h` |
| `EMAIL_HOST` | for email | e.g. `smtp.gmail.com` |
| `EMAIL_PORT` | for email | `587`, or `465` for TLS |
| `EMAIL_USER` | for email | Sending address |
| `EMAIL_PASSWORD` | for email | Gmail: an App Password, never your account password |
| `EMAIL_TO` | no | Where notifications go; defaults to `EMAIL_USER` |
| `CLIENT_URL` | yes | Comma-separated allowed origins |
| `ADMIN_EMAIL` | setup only | Used once by `npm run create-admin` |
| `ADMIN_PASSWORD` | setup only | Minimum 8 characters; remove after first sign-in |

Generate a JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

### `client/.env`

Only values safe to ship in a browser bundle belong here — everything in a Vite
`VITE_` variable ends up readable in the built JavaScript.

| Variable | Notes |
| --- | --- |
| `VITE_API_URL` | e.g. `http://localhost:5000/api` |
| `VITE_GITHUB_USERNAME` | `codedwithjaydip` |
| `VITE_SITE_URL` | Canonical site URL |

Both folders ship a `.env.example`. Copy it, fill it in, and never commit `.env`.

---

## Installation

### Prerequisites

- Node.js 18 or newer
- A MongoDB instance — local, or a free MongoDB Atlas cluster

### Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Runs on `http://localhost:5173`.

### Backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Runs on `http://localhost:5000`.

### Database setup

With `MONGO_URI` set, load the project data and create your admin account:

```bash
cd server
npm run seed           # inserts/updates projects from utils/projects.seed.json
npm run create-admin   # reads ADMIN_EMAIL and ADMIN_PASSWORD from .env
```

`npm run seed` is idempotent — it upserts by slug, so re-running it updates
existing projects rather than duplicating them. To edit project copy, change
`server/utils/projects.seed.json` and seed again.

Once signed in at `/admin`, remove `ADMIN_PASSWORD` from your `.env`.

### Running locally

Two terminals:

```bash
cd client && npm run dev     # http://localhost:5173
cd server && npm run dev     # http://localhost:5000
```

The site works without the backend running — projects fall back to the bundled
dataset in `client/src/data/projects.js`, and the contact form reports that the
server is unreachable.

---

## API endpoints

### Public

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Uptime and database connection status |
| `GET` | `/api/projects` | All projects; optional `?category=` and `?featured=true` |
| `GET` | `/api/projects/:idOrSlug` | A single project by Mongo id or slug |
| `POST` | `/api/contact` | Submit a contact message (rate-limited: 5/hour) |

### Admin

`POST /api/admin/login` is public and rate-limited to 8 attempts per 15 minutes.
Every other admin endpoint requires an `Authorization: Bearer <token>` header.

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/admin/login` | Exchange credentials for a JWT |
| `GET` | `/api/admin/me` | Verify the current session |
| `GET` | `/api/admin/stats` | Dashboard counts |
| `GET` | `/api/admin/projects` | List projects |
| `POST` | `/api/admin/projects` | Create a project |
| `PUT` | `/api/admin/projects/:id` | Update a project |
| `DELETE` | `/api/admin/projects/:id` | Delete a project |
| `GET` | `/api/admin/messages` | List messages, newest first |
| `PATCH` | `/api/admin/messages/:id/read` | Toggle read state |
| `DELETE` | `/api/admin/messages/:id` | Delete a message |

Every response follows the same shape:

```json
{ "success": true, "data": {} }
{ "success": false, "message": "Something readable", "errors": {} }
```

---

## Deployment

### Database — MongoDB Atlas

1. Create a free M0 cluster.
2. Add a database user with read/write access.
3. Under Network Access, allow your backend host's IP, or `0.0.0.0/0` if the host
   has no static IP.
4. Copy the connection string into `MONGO_URI` on your backend host.

### Backend — Render or Railway

1. Create a new Web Service from this repository, root directory `server`.
2. Build command `npm install`, start command `npm start`.
3. Add every variable from `server/.env.example` in the dashboard.
4. Set `CLIENT_URL` to your deployed frontend origin — CORS rejects anything else.
5. Deploy, then run the seed and create-admin scripts once against the production
   database.

On Render's free tier the service sleeps when idle, so the first request after a
pause is slow. The frontend's fallback data covers that window.

### Frontend — Vercel

1. Import the repository, root directory `client`.
2. Framework preset Vite; build command `npm run build`; output directory `dist`.
3. Add `VITE_API_URL` pointing at your deployed API, plus `VITE_GITHUB_USERNAME`
   and `VITE_SITE_URL`.
4. `vercel.json` already rewrites all routes to `index.html`, which is what makes
   deep links like `/projects/nexacart` work.

After deploying, update the hardcoded URLs in `client/index.html` (canonical link,
Open Graph tags) and `client/public/sitemap.xml` to your real domain.

---

## Security

- Passwords hashed with bcrypt (cost factor 12) and excluded from queries by default
- JWT-protected admin routes, with tokens verified against the database on every
  request so a deleted admin's token stops working immediately
- Login returns an identical error for unknown emails and wrong passwords, so the
  endpoint does not reveal which accounts exist
- `helmet` security headers; CORS restricted to an explicit origin allow-list
- Rate limiting applied globally, and more tightly on the contact form and login
- All input validated server-side with `express-validator`; email HTML is escaped
  before being sent
- Request bodies capped at 100 kB
- Secrets live only in `.env`, which is gitignored; the frontend bundle contains
  no credentials

---

## Known gaps

Worth stating plainly rather than discovering later:

- The admin dashboard supports feature/unfeature and delete for projects, but
  creating and editing them is done through `projects.seed.json` and the seed
  script. The `POST` and `PUT` endpoints exist and are tested; the dashboard form
  for them is not built yet.
- Nodemailer is wired up but untested against a real SMTP server.
- Contact messages are stored even if the notification email fails, so nothing is
  lost — but check the dashboard, not just your inbox.

---

## Future improvements

- Project create/edit forms in the admin dashboard
- Image uploads via Cloudinary instead of committed files
- Blog or technical writing section
- Analytics
- Automated tests and a CI pipeline

---

## Author

**Jaydip Solanki** — Full-Stack Developer, M.Sc. IT student at The Maharaja
Sayajirao University of Baroda, Vadodara, Gujarat.

- GitHub: [codedwithjaydip](https://github.com/codedwithjaydip)
- LinkedIn: [jaydip-solanki-7269a7238](https://www.linkedin.com/in/jaydip-solanki-7269a7238)
#   p o r t f o l i o  
 
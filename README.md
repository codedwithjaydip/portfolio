# Jaydip Solanki — Full-Stack Developer Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-UI-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
</p>

<p align="center">
  A modern full-stack developer portfolio built with the MERN stack.
  <br />
  Showcasing my projects, skills, learning journey, and development experience.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#project-structure">Structure</a> •
  <a href="#installation">Installation</a> •
  <a href="#api-endpoints">API</a> •
  <a href="#deployment">Deployment</a>
</p>

---

## 🌐 Live Demo

**Portfolio:** Add your deployed URL here

**GitHub:** https://github.com/codedwithjaydip

**LinkedIn:** https://www.linkedin.com/in/jaydip-solanki-7269a7238/

---

## 📌 About the Project

This portfolio is a full-stack web application designed to present my development journey, technical skills, projects, education, and contact information in a clean and interactive interface.

Unlike a static portfolio, the project uses a **React frontend + Express backend + MongoDB database**, allowing project information and contact messages to be managed dynamically.

The application also includes a protected **admin dashboard** for managing projects and contact messages.

---

# ✨ Features

## 🏠 Public Portfolio

* Animated hero section
* About section
* Education timeline
* Technical skills section
* Established skills and currently-learning skills
* Project gallery
* Project category filtering
* Individual project detail pages
* Project problem/solution explanation
* Architecture and technical details
* Challenges and takeaways
* Development journey timeline
* Currently-learning roadmap
* GitHub repository and language information
* Responsive design
* Custom 404 page
* Loading and skeleton states
* Empty states
* Accessible navigation

## 📩 Contact System

* Working contact form
* Client-side validation
* Server-side validation
* Spam honeypot protection
* Rate limiting
* Email notification using Nodemailer
* Contact messages stored in MongoDB

## 🔐 Admin Dashboard

The `/admin` section provides a protected dashboard with:

* JWT-based authentication
* Admin login
* Project statistics
* Featured project management
* Project deletion
* Contact message management
* Read/unread message status
* Message deletion

## ⚡ Performance & Engineering

* React + Vite architecture
* Route-level code splitting
* API fallback dataset
* Responsive UI
* Keyboard navigation
* Visible focus states
* Semantic HTML landmarks
* ARIA labels
* Reduced-motion support
* Open Graph metadata
* Twitter card metadata
* JSON-LD person schema
* `robots.txt`
* Sitemap

---

# 🛠️ Tech Stack

| Category        | Technologies                     |
| --------------- | -------------------------------- |
| Frontend        | React 18, Vite                   |
| Styling         | Tailwind CSS                     |
| Animations      | Framer Motion                    |
| Routing         | React Router                     |
| Icons           | Lucide React                     |
| Backend         | Node.js, Express                 |
| Database        | MongoDB                          |
| ODM             | Mongoose                         |
| Authentication  | JWT, bcrypt                      |
| Email           | Nodemailer                       |
| Security        | Helmet, CORS, express-rate-limit |
| Validation      | express-validator                |
| Version Control | Git, GitHub                      |

---

# 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │      Portfolio      │
                    │    React + Vite     │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │    Express Server   │
                    │      Node.js        │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐        ┌─────────────────┐
        │    MongoDB      │        │    Nodemailer   │
        │ Projects/Admin  │        │ Contact Emails  │
        │    Messages     │        └─────────────────┘
        └─────────────────┘
```

---

# 📁 Project Structure

```text
.
├── client/
│   ├── public/
│   │   ├── images/
│   │   │   └── projects/
│   │   ├── favicon.svg
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── sections/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── data/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── vercel.json
│
└── server/
    ├── config/
    │   └── db.js
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── services/
    │   └── mailer.js
    ├── utils/
    │   ├── projects.seed.json
    │   ├── seed.js
    │   └── create-admin.js
    ├── server.js
    └── .env.example
```

---

# ⚙️ Environment Variables

## Backend

Create:

```text
server/.env
```

Example:

```env
PORT=5000
NODE_ENV=development

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=2h

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_TO=your_email@gmail.com

CLIENT_URL=http://localhost:5173

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
```

### Generate a JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

## Frontend

Create:

```text
client/.env
```

```env
VITE_API_URL=http://localhost:5000/api
VITE_GITHUB_USERNAME=codedwithjaydip
VITE_SITE_URL=http://localhost:5173
```

> ⚠️ Never commit `.env` files or passwords to GitHub.

---

# 🚀 Installation

## Prerequisites

Make sure you have:

* Node.js 18+
* npm
* MongoDB or MongoDB Atlas
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/codedwithjaydip/YOUR-REPOSITORY.git

cd YOUR-REPOSITORY
```

---

## 2. Install Frontend

```bash
cd client

npm install
```

Create `.env` from `.env.example` and configure your API URL.

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 3. Install Backend

Open another terminal:

```bash
cd server

npm install
```

Create `.env` from `.env.example`.

Start the backend:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

# 🗄️ Database Setup

After configuring `MONGO_URI`:

```bash
cd server
```

Seed project data:

```bash
npm run seed
```

Create the admin account:

```bash
npm run create-admin
```

The seed operation is idempotent, so running it again updates existing projects instead of creating duplicates.

After successfully creating the admin account, remove `ADMIN_PASSWORD` from your environment variables.

---

# 🔌 API Endpoints

## Public API

| Method | Endpoint                  | Description                  |
| ------ | ------------------------- | ---------------------------- |
| GET    | `/api/health`             | Check server/database health |
| GET    | `/api/projects`           | Get all projects             |
| GET    | `/api/projects/:idOrSlug` | Get a specific project       |
| POST   | `/api/contact`            | Submit contact message       |

### Project Filters

```text
GET /api/projects?category=Full-Stack
```

```text
GET /api/projects?featured=true
```

---

## Admin API

All admin routes except login require:

```http
Authorization: Bearer <JWT_TOKEN>
```

| Method | Endpoint                       | Description          |
| ------ | ------------------------------ | -------------------- |
| POST   | `/api/admin/login`             | Admin authentication |
| GET    | `/api/admin/me`                | Verify admin session |
| GET    | `/api/admin/stats`             | Dashboard statistics |
| GET    | `/api/admin/projects`          | List projects        |
| POST   | `/api/admin/projects`          | Create project       |
| PUT    | `/api/admin/projects/:id`      | Update project       |
| DELETE | `/api/admin/projects/:id`      | Delete project       |
| GET    | `/api/admin/messages`          | Get contact messages |
| PATCH  | `/api/admin/messages/:id/read` | Toggle read status   |
| DELETE | `/api/admin/messages/:id`      | Delete message       |

---

# 🔒 Security

The application implements several security measures:

* JWT authentication
* bcrypt password hashing
* Helmet security headers
* CORS allow-list
* API rate limiting
* Login rate limiting
* Contact form rate limiting
* Server-side input validation
* Email HTML escaping
* Request body size limits
* Environment-based secrets
* No credentials in frontend bundle
* Generic login errors to prevent account enumeration

---

# 📸 Screenshots

Add screenshots of:

1. Home / Hero
2. About & Education
3. Skills
4. Projects
5. Project Details
6. Contact Section
7. Admin Dashboard

Recommended location:

```text
client/public/images/projects/
```

Then reference them inside:

```text
server/utils/projects.seed.json
```

---

# 🌍 Deployment

## MongoDB Atlas

1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Configure Network Access.
4. Copy the MongoDB connection string.
5. Add it as `MONGO_URI` on the backend.

---

## Backend — Render / Railway

Recommended settings:

```text
Root Directory: server
Build Command: npm install
Start Command: npm start
```

Add all required backend environment variables.

Set:

```env
CLIENT_URL=https://your-frontend-domain.com
```

Then deploy the backend.

---

## Frontend — Vercel

Recommended settings:

```text
Root Directory: client
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

Add:

```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_GITHUB_USERNAME=codedwithjaydip
VITE_SITE_URL=https://your-portfolio-domain.com
```

The project already contains a `vercel.json` configuration for SPA routing.

---

# 📈 Current Limitations

The current implementation has a few known limitations:

* Admin dashboard supports project feature/unfeature and deletion.
* Project creation/editing API endpoints exist, but the dashboard UI for these operations is not currently implemented.
* Nodemailer is configured but requires testing with a real SMTP provider.
* Contact messages are stored even if email notification fails.

---

# 🔮 Future Improvements

Planned improvements include:

* [ ] Admin project create/edit interface
* [ ] Cloudinary image uploads
* [ ] Blog / technical articles section
* [ ] Website analytics
* [ ] Automated testing
* [ ] CI/CD pipeline
* [ ] Improved project search
* [ ] More GitHub statistics
* [ ] Advanced admin analytics

---

# 👨‍💻 Author

## Jaydip Solanki

**Full-Stack Developer | M.Sc. IT Student**

📍 Vadodara, Gujarat, India

### Connect With Me

* GitHub: https://github.com/codedwithjaydip
* LinkedIn: https://www.linkedin.com/in/jaydip-solanki-7269a7238/

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is created and maintained by **Jaydip Solanki**.

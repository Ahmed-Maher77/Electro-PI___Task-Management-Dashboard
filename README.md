# Electro-Pi — Enterprise Task & Project Management Dashboard

Electro-Pi is a full-stack, enterprise-grade Task and Project Management platform. Designed with clean, modern **Flat Design System** principles (no box-shadows, zero gradients, subtle `rounded-md` borders, and zero clutter), it features native **Arabic (RTL)** interface support and end-to-end data persistence powered by React 19, Redux Toolkit, Node.js Express, and MongoDB.

---

## 🚀 Features Overview

- **Native RTL & Arabic Support**: Styled for optimal Arabic user experience using Cairo typography and proper flex/grid layout directions (`dir="rtl"`).
- **Responsive & Compressible Sidebar**:
  - Sticky fixed sidebar (`sticky top-0 h-screen`).
  - Desktop compression toggle switching between expanded mode (`256px`) and compact icon-only mode (`80px`).
  - Off-screen horizontal drawer for small and medium screens (`< lg`) triggered by a top-bar burger menu.
- **Strict Validation Layer**: Form state management powered by `react-hook-form` paired with `zod` schemas.
- **End-to-End Persistence**: All user management, project creation, task management, status updates, and settings are connected to MongoDB database models via Mongoose.
- **Dockerized Architecture**: Out-of-the-box multi-container orchestrations via `docker-compose`.

---

## 📋 Pages & Routes Inventory

| Route | Page Component | Capabilities & Architecture |
| :--- | :--- | :--- |
| `/login` | `Login.tsx` | Authentication with `react-hook-form` + `zod`, HTTP-Only JWT Cookie login via `POST /api/auth/login`. |
| `/register` | `Register.tsx` | User registration with `zod` password match validation via `POST /api/auth/register`. |
| `/dashboard` | `Dashboard.tsx` | Live workspace welcome overview, active projects count, pending tasks count, recent activities log. |
| `/projects` | `Projects.tsx` | Projects table with status filters (`In Progress`, `Critical`, `Pending`, `Completed`), lead filter, search, and row deletion via `DELETE /api/projects/:id`. |
| `/projects/new` | `CreateProject.tsx` | Dedicated creation page with dynamic interactive team member tag manager (`+ Add` / `×` remove) and Mongoose persistence via `POST /api/projects`. |
| `/projects/:projectId` | `ProjectDetails.tsx` | Project metadata summary, contributor cards, task filter tabs (`All`, `Mine`, `Completed`), task modal dialog, and deletion. |
| `/tasks` | `Tasks.tsx` | Dedicated global tasks dashboard with status filters, priority filters, search, and deletion via `DELETE /api/tasks/:id`. |
| `/tasks/new` | `CreateTask.tsx` | Task creation form with rich text controls (`Bold`, `Italic`, `List`, `Code`), priority toggle buttons, assignee picker, and dropzone. |
| `/team` | `Team.tsx` | Team member search & department filters loading real registered users from MongoDB (`GET /api/auth/users`). |
| `/profile` | `Profile.tsx` | User profile update via `PUT /api/auth/profile`, password change via `PUT /api/auth/password`, 2FA toggle, and account deletion. |
| `/settings` | `Settings.tsx` | Workspace info, Slack Webhook / GitHub integration toggles, and session timeout policy settings. |
| `/support` | `Support.tsx` | Quick help documentation cards, interactive FAQ accordions, and support ticket submission form. |

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19, TypeScript, Vite 8
- **State Management**: Redux Toolkit, React Redux
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4, Lucide React Icons
- **Form & Validation**: React Hook Form, Zod

### Backend
- **Runtime**: Node.js (ES Modules, `.js`)
- **Web Framework**: Express.js 5
- **Database & ODM**: MongoDB, Mongoose 9
- **Authentication**: JSON Web Tokens (JWT), Bcrypt password hashing
- **Middleware**: Express Validator, Cookie Parser, Cors, Helmet, Morgan

### Infrastructure & DevOps
- **Containerization**: Docker, Docker Compose
- **Web Server**: Nginx (Production Static Asset Serving)

---

## 🐳 Docker Deployment

To launch the entire platform stack (MongoDB, Express API Server, and Nginx Client) with a single command:

```bash
docker-compose up --build -d
```

### Access URLs:
- **Client Application**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)
- **MongoDB Instance**: `localhost:27017`

To stop and remove containers:
```bash
docker-compose down
```

---

## 💻 Local Development Setup

### 1. Backend Setup
```bash
cd server
npm install
npm run dev
```
*Backend server runs at `http://localhost:5000`*

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
*Frontend dev server runs at `http://localhost:5173`*

---

## 📄 License
This project is licensed under the MIT License.

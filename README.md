# 📝 Full-Stack Todo Application

A modern, full-stack task management application designed to help users efficiently track and organize their daily activities.
It features a decoupled architecture with a Next.js client-side frontend and an Express RESTful API, utilizing PostgreSQL for robust data management.

<br>

## 🔗 Live Preview
  👉 [View Live (Frontend)](https://todo-app-fullstack-jade.vercel.app/)
  ⚙️ [API Endpoint (Backend)](https://todo-app-fullstack-uuaw.onrender.com)

<br>

## 🛠 Technologies Used

### Frontend (Client)
  - Next.js 16 (App Router) — Full-stack React framework
  - React 19 — UI library
  - TypeScript — Static type safety
  - Axios — Promise-based HTTP client for API requests

### UI/UX & Interactivity
  - Tailwind CSS v4 — Utility-first styling for modern design
  - shadcn/ui & @base-ui/react — Accessible, customizable, and unstyled UI components
  - Lucide React — Modern and crisp iconography

### Backend (REST API)
  - Node.js & Express.js 5 — Fast and minimalist web framework for the backend
  - TypeScript — Strongly typed backend code
  - CORS — Secure cross-origin resource sharing

### Database & ORM
  - PostgreSQL — Powerful, open-source relational database
  - Prisma ORM — Next-generation Node.js and TypeScript ORM for safe database queries
  - Supabase — Cloud database hosting

### Testing
  - Jest — Delightful JavaScript Testing Framework
  - React Testing Library — Utilities to test React components

<br>

## 🚀 Getting Started
To run the project locally, follow these steps:

### 1️⃣ Clone the repository
```bash
git clone [https://github.com/your-username/todo-app-fullstack.git](https://github.com/your-username/todo-app-fullstack.git)
cd todo-app-fullstack
```
### 2️⃣ Backend Setup (API)
```bash
cd backend
npm install
```

### 3️⃣ Configure environment variables
Create a .env file in the backend directory and add your Supabase PostgreSQL connection string:
```bash
DATABASE_URL="postgresql://postgres.[YOUR-ID]:[YOUR-PASSWORD]@aws-0-[REGION][.pooler.supabase.com:5432/postgres](https://.pooler.supabase.com:5432/postgres)"
PORT=3001
```
Push the Prisma schema to the database and start the server:
```bash
npx prisma db push
npm run dev
```

### 4️⃣ Frontend Setup (Client)
```bash
cd frontend
npm install
```
Create a .env file in the frontend directory and link it to your local backend API:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```
Start the Next.js development server:
```bash
npm run dev
```

### 5️⃣ Running Tests
To run the Jest test suite for the frontend:
```bash
cd frontend
npm run test
```

<br>

## ✨ Features
  - **Decoupled Architecture:** Clean separation of concerns between the Next.js frontend and the Express.js backend.
  - **RESTful API:** Robust Express backend handling full CRUD operations (Create, Read, Update, Delete) with a dedicated controller-service pattern.
  - **Database Integration:** Seamless PostgreSQL database operations using Prisma ORM with strict typings and data sanitization.
  - **Modern UI & Accessibility:** Beautiful, responsive interfaces built with shadcn/ui, @base-ui/react, and Tailwind CSS v4.
  - **HTTP Client:** Efficient state fetching and API communication handled via Axios.
  - **Comprehensive Testing:** Unit and component tests implemented using Jest and React Testing Library.
  - **Persistent Filters via URL:** Filter parameters are saved directly in the URL search parameters (useSearchParams), ensuring application state persists on page reload.
  - **Dynamic Client Rendering:** Utilizes Next.js dynamic imports to optimize client-side components and avoid hydration/prerendering mismatch errors.
  - **Data Sanitization:** Built-in backend protections to handle empty fields, format dates correctly (ISO-8601), and protect read-only fields.

<br>

## 📄 License
This project is a test task and available under the Automaze Company License.

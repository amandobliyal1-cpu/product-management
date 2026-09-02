# Product Store 🛒

A full-stack **product management app** built with the MERN stack. Add, view, update, and delete products through a clean, responsive UI with light/dark mode support.

## Features

- 📦 Create, read, update, and delete products
- 🌗 Light/dark mode toggle
- ⚡ Fast, responsive UI built with React + Vite
- ✅ Form validation on the client
- 🔔 Toast notifications for success/error feedback
- 📱 Mobile-friendly responsive layout

## Tech Stack

**Frontend**
- React (Vite)
- React Router DOM
- Zustand — state management
- Chakra UI — component library & theming
- Framer Motion — animations
- React Icons

**Backend**
- Node.js + Express — REST API
- MongoDB + Mongoose — database & schema modeling
- dotenv — environment configuration

## Project Structure

```
product-management/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Route handlers / business logic
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API route definitions
│   └── server.js        # App entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route-level pages
│   │   ├── store/       # Zustand store
│   │   └── App.jsx
│   └── vite.config.js
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB connection string (e.g. from [MongoDB Atlas](https://www.mongodb.com/atlas))

### Setup

1. **Clone the repo**
   ```sh
   git clone https://github.com/amandobliyal1-cpu/product-management.git
   cd product-management
   ```

2. **Create a `.env` file** in the project root:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

3. **Install dependencies** (backend + frontend)
   ```sh
   npm install
   npm install --prefix frontend
   ```

4. **Run in development mode**
   ```sh
   npm run dev
   ```
   This starts the backend on `http://localhost:5000`. Run the frontend separately from `frontend/` with `npm run dev` (Vite dev server, typically `http://localhost:5173`), which proxies API calls to the backend.

5. **Build & run in production mode**
   ```sh
   npm run build
   npm run start
   ```
   Open `http://localhost:5000` — the backend serves the built frontend directly.



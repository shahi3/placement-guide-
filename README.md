# 📦 Placement Guide

A full-stack project with a **Node.js/Express backend** and a **React frontend** for managing placement workflows including authentication, test handling, company listings, student grouping, and more.

---

## 🧭 Table of Contents

- [🚀 Features](#features)
- [🛠️ Installation](#installation)
- [📁 Project Structure](#project-structure)
- [⚙️ Environment Variables](#environment-variables)
- [📡 API Endpoints](#api-endpoints)
- [💻 React Frontend](#react-frontend)

---

## 🚀 Features

- 🔐 JWT-based authentication
- 🧪 Test creation and result submission
- 🏢 Company visit tracking
- 👥 Student grouping and analytics
- 📚 Learning material management
- 🧾 Alumni story handling
- 📊 Admin dashboard insights
- 🎨 React-based frontend with reusable components

---

---
## 🛠️ Installation
```
# Clone the repository
git clone https://github.com/your-username/placement-api.git
cd placement-api
npm run dev

```
# 1 backend setup
```
cd backend
npm install

Create a .env file inside the backend folder:
PORT=3008
JWT_SECRET=your_jwt_secret

Run the backend server:
npm run dev


```
# 2 frontend setup
```
cd ../frontend
npm install

Create a .env file inside the frontend folder:
REACT_APP_API_URL=http://localhost:3008/api

Run the React app:
npm start

```

## ⚙️ Environment Variables
```
PORT=3008
JWT_SECRETE_KEY=JWT_SECRETE_KEY
```

## 📁 Project Structure
```
placement-guide/
├── backend/              # Node.js/Express  API
│   ├── controllers/      # Route logic (auth, booking, user, etc.)
│   ├── middleware/       # Auth checks, error handling
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express route definitions
│   ├── utils/            # Helper functions
│   ├── config/           # DB and server configuration
│   ├── app.js             # Main Express app
│   └── server.js          # Entry point
│
└── frontend/             # React application
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Page-level views (Login, Dashboard, etc.)
│   ├── services/     # API calls (Axios/fetch)
│   ├── App.js         # Root React component
│   └── index.js       # Entry point
└── package.json
```

## 📡 API Endpoints

| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| POST   | `/api/auth/signup`     | Register a new user      |
| POST   | `/api/auth/login`      | Authenticate user        |
| GET    | `/api/tests`           | Fetch all tests          |
| POST   | `/api/results`         | Submit test results      |
| GET    | `/api/companies`       | List upcoming companies  |
| GET    | `/api/students/grouped`| Fetch grouped students   |
| ...    | ...                    | More endpoints available |

## 💻 React Frontend
```
Authentication pages (Login, Signup) → connect to /api/auth

Dashboard → show tests, companies, results, grouped students

Reusable components → Navbar, Sidebar, Cards, Tables

API service layer → centralize Axios/fetch calls in services/api.js

Routing → use React Router for navigation between pages
```
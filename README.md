# 📝 MERN Note Taking App

A full-stack note-taking application built with the **MERN** stack (MongoDB, Express.js, React, Node.js), with a Vite-powered frontend and deployed on Vercel.

🔗 **Live Demo:** [mern-note-taking-apps.vercel.app](https://mern-note-taking-apps.vercel.app)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## ✨ Features

- 📄 Create, read, update, and delete notes
- ⚡ Fast and responsive UI powered by React + Vite
- 🔗 RESTful API backend with Express.js
- 🗄️ Persistent data storage with MongoDB
- ☁️ Deployed on Vercel (frontend + backend as separate services)

---

## 🛠 Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 19, Vite, Tailwind          |
| Backend   | Node.js, Express.js               |
| Database  | MongoDB (via Mongoose)            |
| Rate      | Upstash Redis                     |
| Deployment| Vercel                            |

---

## 📁 Project Structure

```
MERN.NoteTakingApps/
├── backend/          # Express.js REST API
│   ├── ...
│   └── package.json
├── frontend/         # React + Vite app
│   ├── ...
│   └── package.json
├── .gitignore
├── package.json      # Root scripts for build & start
└── vercel.json       # Vercel deployment config
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Upstash](https://upstash.com/) Redis database
- [MongoDB](https://www.mongodb.com/) (local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mrkeylost/MERN.NoteTakingApps.git
   cd MERN.NoteTakingApps
   ```

2. **Install all dependencies (root, backend, and frontend):**

   ```bash
   npm run build
   ```

   > This runs `npm i` in both the `backend/` and `frontend/` directories and builds the frontend.

   Alternatively, install them individually:

   ```bash
   # Backend
   cd backend && npm install

   # Frontend
   cd ../frontend && npm install
   ```

### Environment Variables

Create a `.env` file inside the `backend/` directory and add the following:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string

UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

### Running the App

**Start the backend server:**

```bash
npm start
# or from the root:
npm run start
```

**Start the frontend dev server (in a separate terminal):**

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5001` by default.

---

## ☁️ Deployment

This project is configured for deployment on **Vercel** using `vercel.json`. The frontend (Vite) is served at `/` and the backend (Express) is routed under `/_/backend`.

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork this repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

<p align="center">Made with ❤️ by <a href="https://github.com/mrkeylost">mrkeylost</a></p>

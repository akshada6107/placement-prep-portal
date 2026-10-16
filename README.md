# Placement Prep Portal

> A full‑stack web application that lets students practice aptitude, coding, and interview questions, track their progress, and view personalized feedback. Built with **React**, **Node / Express**, and **MongoDB Atlas**.

![Demo Screenshot](https://raw.githubusercontent.com/your‑username/placement-prep-portal/main/docs/screenshot.png)

## 🎯 Purpose
- Provide a single place for students to **practice** and **review** placement‑preparation material.  
- Offer **real‑time scoring**, **explanations**, and a **dashboard** that shows progress over time.  
- Demonstrate a modern **MERN‑style** stack with clean architecture (Context API, protected routes, JWT auth, reusable components).


## 🛠️ Tech Stack

| Layer | Technology | Reason |
|-------|------------|--------|
| **Frontend** | React (Vite) + React‑Router + TailwindCSS (or vanilla CSS) | Fast dev server, component‑based UI, SPA routing |
| **State Management** | React Context API | Simple global auth & user state |
| **Backend** | Node.js + Express | Minimal, flexible HTTP server |
| **Database** | MongoDB Atlas (Mongoose) | Cloud‑hosted, schema‑based, easy to scale |
| **Auth** | JWT (stored in `localStorage`) | Stateless token‑based authentication |
| **Testing** | Jest + React Testing Library (optional) | Unit & integration tests for critical parts |
| **CI/CD** | GitHub Actions (lint → test → build) | Automated quality checks on every push |

## 📦 Project Structure
placement-prep-portal/ ├─ backend/ # Express server │ ├─ src/ │ │ ├─ routes/ │ │ ├─ models/ │ │ └─ middleware/ │ ├─ .env # <-- DO NOT COMMIT (MongoDB URI, JWT secret) │ └─ package.json │ ├─ frontend/ # React app (Vite) │ ├─ src/ │ │ ├─ components/ │ │ ├─ pages/ │ │ └─ context/ │ └─ package.json │ ├─ .gitignore ├─ .oxlintrc # lint configuration └─ README.md

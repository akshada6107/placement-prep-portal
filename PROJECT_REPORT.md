# KARMAVEER ADV. BABURAO GANPATRAO THAKARE COLLEGE OF ENGINEERING, NASHIK

## Department of Computer Engineering

### PROJECT REPORT ON Placement Preparation Portal (PrepPath)

**Bachelor of Technology in Computer Engineering**

---

## 1. Introduction & Objectives

- **1.1 Introduction:**

  The Placement Preparation Portal (PrepPath) is a full‑stack web application that assists university students in preparing for campus placements. It integrates user authentication, progress tracking, aptitude testing, and coding practice within a single responsive interface. The solution follows a classic three‑tier architecture: a React/Vite front‑end, an Express/Node.js API layer, and a MongoDB data store.

- **1.2 Problem Statement:**

  Existing preparation resources are fragmented across multiple sites, leading to inefficient study workflows, lack of unified progress monitoring, and inconsistent feedback. The portal addresses this gap by providing a centralized platform that unifies all preparation activities.

- **1.3 Objectives:**

  - Implement secure JWT‑based registration and login.
  - Deliver a dynamic aptitude test engine with per‑question explanations.
  - Provide a coding‑practice module with automated test‑case evaluation.
  - Visualize personalized progress on an animated dashboard.
  - Ensure scalability, maintainability, and cloud‑ready deployment.

- **1.4 Scope of the Project:**

  The project encompasses the design and implementation of all core modules (Auth, Dashboard, Aptitude, Coding), a RESTful API, and a MongoDB schema. Administrative interfaces, advanced analytics, and CI/CD pipelines are identified as future extensions and are **outside** the current scope.

---

## 2. Literature Survey

The portal builds upon widely adopted web technologies and architectural patterns:

- **MERN Stack** – React for the UI, Node.js/Express for the server, MongoDB for persistence.
- **RESTful APIs** – Stateless communication enabling easy integration and testing.
- **JWT Authentication** – Token‑based security suitable for single‑page applications.
- **Client‑Side Routing** – React Router provides seamless navigation without full page reloads.
- **Design Systems** – Use of CSS variables, dark‑mode theming, and micro‑animations to achieve a premium user experience.

---

## 3. System Architecture & Design

### 3.1 System Block Diagram

```mermaid
flowchart LR
    U[User / Browser] -->|HTTP(S)| FE[Frontend (React + Vite)]
    FE -->|API Calls| API[API Layer (Node.js + Express)]
    API -->|CRUD Operations| DB[Database (MongoDB Atlas)]
```

### 3.2 Module Description

| Module | Responsibility | Key Source Files |
|--------|----------------|------------------|
| **Authentication** | Register, login, JWT issuance, token validation | `backend/routes/auth.js`, `backend/models/User.js` |
| **Dashboard** | Retrieve and display progress metrics, navigation hub | `src/pages/Dashboard.jsx` |
| **Aptitude Engine** | Serve questions, grade answers, return score and explanations | `backend/routes/aptitude.js` |
| **Coding Practice** | List problems, evaluate submissions, store history | `backend/routes/coding.js`, `backend/models/CodingProblem.js` |
| **API Helper** | Centralized Axios instance with interceptor | `src/api/index.js` |

### 3.3 Tech Stack Table

| Layer | Technology | Version |
|-------|------------|---------|
| Front‑end | React, Vite, Tailwind‑CSS, Lucide‑React | 18 / 8.3 |
| Back‑end | Node.js, Express, Mongoose, jsonwebtoken, bcryptjs | 20 / 4 |
| Database | MongoDB Atlas (cloud) | 6.x |
| Authentication | JWT (access token, 7‑day expiry) | — |
| DevOps | npm, ESLint, Prettier, Git | — |

---

## 4. Hardware & Software Requirements

### 4.1 Hardware Requirements

- Processor: Intel i5 (or equivalent) minimum 2.5 GHz
- RAM: 8 GB (recommended 16 GB for development)
- Storage: 20 GB SSD free space
- Display: 1366 × 768 resolution or higher

### 4.2 Software Requirements

- Operating System: Windows 10/11, macOS 12+, or Linux distribution
- Node.js (LTS) ≥ 20.x
- npm ≥ 9.x
- MongoDB Atlas account (or local MongoDB 6.x for testing)
- Web browser: Chrome, Firefox, Edge (latest)
- Development tools: VS Code, Git

---

## 5. Database Design & Schema

### 5.1 Collections Overview

1. **User** – stores account information.
2. **Progress** – per‑user metrics for aptitude, coding, technical, interview scores.
3. **AptitudeResult** – records each test attempt with detailed grading.
4. **CodingProblem** – problem statements, starter code, test cases.
5. **Submission** – user submissions for coding problems.

### 5.2 Schema Details

#### User
```json
{
  "name": "String",
  "email": "String (unique)",
  "password": "String (bcrypt hash)",
  "role": "String (default: 'student')",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

#### Progress
```json
{
  "user": "ObjectId (ref User)",
  "aptitude": "Number (0‑100)",
  "coding": "Number (0‑100)",
  "technical": "Number (0‑100)",
  "interview": "Number (0‑100)",
  "testsCompleted": "Number",
  "updatedAt": "Date"
}
```

#### AptitudeResult
```json
{
  "user": "ObjectId (ref User)",
  "totalQuestions": "Number",
  "correctAnswers": "Number",
  "score": "Number",
  "answers": [
    {
      "questionId": "Number",
      "selectedOption": "Number",
      "isCorrect": "Boolean",
      "correctOption": "Number",
      "explanation": "String"
    }
  ],
  "attemptedAt": "Date"
}
```

#### CodingProblem
```json
{
  "title": "String",
  "category": "String",
  "difficulty": "String (Easy|Medium|Hard)",
  "description": "String",
  "starterCode": "String",
  "testCases": [
    { "input": "String", "output": "String" }
  ]
}
```

#### Submission
```json
{
  "user": "ObjectId (ref User)",
  "problem": "ObjectId (ref CodingProblem)",
  "code": "String",
  "passed": "Boolean",
  "feedback": "String",
  "submittedAt": "Date"
}
```

All collections are indexed on `user` for fast look‑ups and on timestamps for chronological queries.

---

## 6. Implementation Overview

1. **User Registration** – `POST /api/auth/register` hashes the password with bcrypt, creates a User document, and returns a signed JWT.
2. **Login** – `POST /api/auth/login` validates credentials and issues a JWT.
3. **Protected Routes** – Middleware `protect` verifies the token and attaches `req.user`.
4. **Progress Retrieval** – `GET /api/progress/me` returns the Progress document for the authenticated user.
5. **Aptitude Flow** –
   - `GET /api/aptitude/questions` supplies questions without the `correct` field.
   - Front‑end stores answers locally; on submit, `POST /api/aptitude/submit` grades each answer, stores an `AptitudeResult`, and returns `score` plus an array of graded answers (including explanations).
6. **Coding Flow** –
   - `GET /api/coding/problems` lists available problems.
   - `GET /api/coding/problem/:id` returns full problem details.
   - `POST /api/coding/submit` runs the submitted code in an isolated sandbox (Docker placeholder), evaluates against test cases, stores a `Submission`, and returns pass/fail feedback.
7. **Front‑end State Management** – React hooks (`useState`, `useEffect`) manage current module, user answers, loading states, and result data. The Axios helper injects the JWT automatically.
8. **UI Rendering** – Conditional rendering shows loading spinners, the quiz interface, result cards, and an **Answer Analysis** section that displays the question, selected answer, correct answer, and explanation.

---

## 7. Snapshots / Results (Mockups & UI)

*The following placeholders indicate where screenshots should be inserted in the final PDF/Word version.*

- **Login Modal** – screenshot of the login dialog with email/password fields.
- **Dashboard** – progress bars for Aptitude, Coding, Technical, Interview, and navigation buttons.
- **Aptitude Test** – question card view, option selection UI, and final results card with score.
- **Answer Analysis** – table/list showing each question, user answer, correct answer, and explanation.
- **Coding Practice** – problem list view, code editor area, and submission result modal.

*All UI components follow the dark‑mode theme with smooth micro‑animations and responsive layout.*

---

## 8. Advantages, Limitations & Future Scope

- **8.1 Advantages:**
  - Unified platform eliminates the need for multiple external tools.
  - Real‑time feedback and detailed explanations improve learning efficiency.
  - Responsive, premium UI enhances user engagement.
  - Stateless JWT authentication simplifies scaling.

- **8.2 Limitations:**
  - Current sandbox for code execution is a placeholder; production‑grade isolation is pending.
  - Admin interfaces for content management are not implemented.
  - Deployment scripts and CI/CD pipelines are outside the current scope.

- **8.3 Future Scope:**
  - Containerised deployment with Docker/Kubernetes.
  - Full admin dashboard for managing questions and coding problems.
  - Advanced analytics (aggregate performance, recommendation engine).
  - Integration with external assessment services (e.g., HackerRank API).
  - Automated testing and continuous integration pipelines.

---

## 9. Conclusion

The Placement Preparation Portal successfully delivers a cohesive, secure, and aesthetically polished solution for campus‑placement preparation. By unifying authentication, progress monitoring, aptitude testing, and coding practice within a MERN‑based architecture, the project meets its defined objectives and provides a solid foundation for future enhancements such as cloud deployment, advanced analytics, and administrative tooling.

---

## 10. References

1. MDN Web Docs – *JavaScript, HTTP, Web APIs*.
2. React Documentation – *React 18, Hooks, Router*.
3. Node.js Documentation – *Express, JWT, bcryptjs*.
4. MongoDB Manual – *Mongoose ODM, Atlas deployment*.
5. Lucide‑React – *Icon library*.
6. Vite – *Next‑generation front‑end tooling*.
7. Tailwind‑CSS – *Utility‑first CSS framework*.

---

*Report generated on 2026‑10‑16.*

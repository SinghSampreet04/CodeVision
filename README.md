# 🚀 CodeVision

> A full-stack online coding platform inspired by LeetCode and HackerRank, featuring secure code execution, AI-powered code review, contests, leaderboards, and role-based administration.

---

## 📖 Overview

CodeVision is a modern online coding platform where users can solve programming challenges, participate in contests, view leaderboards, and receive AI-generated feedback on their solutions.

The platform was built as a full-stack project using React, Spring Boot, PostgreSQL, Docker, and JWT Authentication.

---

## ✨ Features

### 👨‍💻 User Features

- User Registration & Login
- JWT Authentication
- Browse Coding Problems
- Search & Filter Problems
- Monaco Code Editor
- Submit Java Solutions
- Real-time Code Execution
- Hidden & Public Test Cases
- AI Code Review
- Submission History
- Detailed Submission Results
- Personal Profile
- Achievement Badges
- Problem Statistics
- Discussion System
- Problem Leaderboards
- Contest Participation
- Contest Leaderboards

---

### 🛡 Admin Features

- Admin Dashboard
- Create Problems
- Edit Problems
- Delete Problems
- Manage Test Cases
- Hidden Test Case Support
- Create Contests
- Assign Problems to Contests
- View Platform Statistics

---

## 🛠 Tech Stack

### Frontend

- React
- React Router
- Vite
- Monaco Editor
- CSS3

### Backend

- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Maven

### Database

- PostgreSQL

### Code Execution

- Docker
- Java 17

### AI

- AI-powered submission feedback

---

# 🏗 Architecture

```
                React Frontend
                       │
                       │ REST API
                       ▼
              Spring Boot Backend
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
 PostgreSQL Database          Docker Execution
        │                             │
        └──────────────┬──────────────┘
                       ▼
               AI Code Review
```

---

# 📂 Project Structure

```
CodeVision
│
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── dto
│   ├── config
│   └── security
│
├── frontend
│   ├── components
│   ├── pages
│   ├── services
│   └── assets
│
├── docs
│   └── screenshots
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/CodeVision.git
```

---

## Backend

```bash
cd backend
./mvnw spring-boot:run
```

Runs on:

```
http://localhost:8081
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

## Database

Create a PostgreSQL database:

```
codevision
```

Update your `application.properties` with your PostgreSQL credentials.

---

# 🔐 Authentication

- JWT Authentication
- Password Hashing (BCrypt)
- Role-Based Authorization
- Protected Admin Routes
- Secure API Endpoints

---


# 🚀 Future Improvements

- Support for Python and C++
- Live Contest Timer
- Real-time Notifications
- Code Autocomplete
- Email Verification
- Forgot Password
- User Avatars
- Public User Profiles
- Advanced Analytics
- Deployment on AWS

---

# 👨‍💻 Author

**Sampreet Singh**

GitHub:
https://github.com/SinghSampreet04

---

## ⭐ If you like this project, consider giving it a star!
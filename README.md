# RA2311003010202 — Notification System (Frontend OA)

## 📌 Overview

This repository contains the solution for the **Frontend Online Assessment**.
The task involves building a **Notification System** with:

* Logging Middleware
* Backend API Server
* Frontend React Application

The system demonstrates **API integration, logging, filtering, and responsive UI design**.

---

## 📁 Project Structure

```
RA2311003010202/
│
├── logging_middleware/        # Reusable logging logic
├── notification_app_be/      # Backend (Express server)
├── notification_app_fe/      # Frontend (React app)
├── notification_system_design.md
└── .gitignore
```

---

## ⚙️ Features

### 🔹 Logging Middleware

* Centralized logging function
* Supports:

  * stack → frontend / backend
  * level → debug, info, warn, error, fatal
  * package → api, component, etc.
* Sends logs to backend API

---

### 🔹 Backend (Express Server)

Runs on: `http://localhost:5000`

Endpoints:

#### ✅ POST /logs

Creates a log entry

Request:

```json
{
  "stack": "frontend",
  "level": "error",
  "package": "api",
  "message": "Failed to fetch data"
}
```

Response:

```json
{
  "logID": "unique-id",
  "message": "log created successfully"
}
```

---

#### ✅ GET /logs

Fetch all logs

Response:

```json
[
  {
    "logID": "123",
    "stack": "frontend",
    "level": "error",
    "package": "api",
    "message": "Failed to fetch",
    "timestamp": "2026-05-02T10:00:00Z"
  }
]
```

---

### 🔹 Frontend (React)

Runs on: `http://localhost:3000`

Features:

* Fetch logs from backend
* Display logs in table
* Filter by log level
* Search by message
* Loading & error handling
* Responsive UI

---

## 🚀 Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/username/RA2311003010202.git
cd RA2311003010202
```

---

### 2️⃣ Backend Setup

```bash
cd notification_app_be
npm install
node server.js
```

Server runs on: `http://localhost:5000`

---

### 3️⃣ Frontend Setup

```bash
cd notification_app_fe
npm install
npm start
```

App runs on: `http://localhost:3000`

---

## 🔄 Data Flow

1. Frontend triggers API call
2. Backend processes request
3. Logs stored in memory
4. Frontend displays filtered results

---

## 🧠 Design Decisions

* **In-memory storage** used for simplicity
* **Separation of concerns**:

  * Middleware → logging
  * Backend → API handling
  * Frontend → UI
* **Scalable structure** for future DB integration

---

## ⚠️ Challenges Faced

* CORS issues while calling external APIs
* Solved using a local backend proxy
* Ensured proper error handling and API validation

---

## 📸 Output

* Logs displayed in UI
* Filtering and searching working correctly
* Backend API tested via Postman

---

## ✅ Conclusion

This project demonstrates:

* Strong understanding of **React + API integration**
* Ability to design **modular systems**
* Handling of **real-world issues like CORS**

---

## 👤 Author



RA2311003010202

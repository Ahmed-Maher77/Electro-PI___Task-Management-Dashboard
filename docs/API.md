# 🔌 ElectroTask REST API Documentation

ElectroTask provides a comprehensive, RESTful API interface built on Node.js, Express, and MongoDB. All request payloads and response bodies are formatted as JSON.

---

## Base URL
```http
https://electro-pi-server.vercel.app/api
```

---

## 🔐 Authentication Endpoints (`/api/auth`)

### 1. Register User
- **Method:** `POST`
- **Path:** `/api/auth/register`
- **Request Body:**
  ```json
  {
    "name": "أحمد ماهر",
    "email": "ahmed.maher@electro-pi.com",
    "password": "Password123!",
    "role": "admin"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "تم إنشاء الحساب بنجاح",
    "data": {
      "user": {
        "id": "66a6a123bc4567890def1234",
        "name": "أحمد ماهر",
        "email": "ahmed.maher@electro-pi.com",
        "role": "admin"
      },
      "token": "eyJhbGciOiJIUzI1Ni..."
    }
  }
  ```

---

### 2. Login User
- **Method:** `POST`
- **Path:** `/api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "ahmed.maher@electro-pi.com",
    "password": "Password123!"
  }
  ```

---

### 3. Get Current User Profile
- **Method:** `GET`
- **Path:** `/api/auth/me`
- **Header:** `Cookie: token=<jwt_token>`

---

### 4. Get All Team Members
- **Method:** `GET`
- **Path:** `/api/auth/users`

---

### 5. Remove Team Member
- **Method:** `DELETE`
- **Path:** `/api/auth/users/:id`

---

## 📁 Project Endpoints (`/api/projects`)

### 1. Get All Projects
- **Method:** `GET`
- **Path:** `/api/projects`

### 2. Create Project
- **Method:** `POST`
- **Path:** `/api/projects`
- **Request Body:**
  ```json
  {
    "title": "تطوير لوحة التحكم",
    "subtitle": "إصدار 2.0",
    "description": "تحديث شامل لمكونات النظام وتطبيق أفضل الممارسات",
    "leadName": "أحمد ماهر",
    "status": "in-progress",
    "progress": 75,
    "dueDate": "2025-02-15"
  }
  ```

### 3. Get Single Project
- **Method:** `GET`
- **Path:** `/api/projects/:id`

### 4. Update Project
- **Method:** `PATCH`
- **Path:** `/api/projects/:id`

### 5. Delete Project
- **Method:** `DELETE`
- **Path:** `/api/projects/:id`

---

## 📋 Task Endpoints (`/api/tasks`)

### 1. Get All Tasks
- **Method:** `GET`
- **Path:** `/api/tasks`

### 2. Get Tasks by Project
- **Method:** `GET`
- **Path:** `/api/tasks/project/:projectId`

### 3. Create Task
- **Method:** `POST`
- **Path:** `/api/tasks/project/:projectId`
- **Request Body:**
  ```json
  {
    "title": "إضافة دعم بروتوكول التشفير",
    "description": "تطبيق الحماية المتقدمة على جميع المسارات",
    "status": "doing",
    "priority": "high",
    "assigneeName": "سارة محمود",
    "dueDate": "اليوم، 5:00 مساءً"
  }
  ```

### 4. Update Task Status
- **Method:** `PATCH`
- **Path:** `/api/tasks/:id`

### 5. Delete Task
- **Method:** `DELETE`
- **Path:** `/api/tasks/:id`

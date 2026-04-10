# Employee Leave Management System

##  Project Overview

This project is a web-based Employee Leave Management System designed for small organizations (approx. 50 employees). It automates the process of leave requests, approvals, and tracking, improving transparency and efficiency.

---

##  Features

### 1. User Authentication

* Secure login system
* Separate roles:

  * Employee
  * Manager

### 2. Leave Request Submission

* Employees can apply for leave
* Fields:

  * Leave type (Vacation / Sick)
  * Start date
  * End date
  * Reason

### 3. Leave Approval Workflow

* Manager can:

  * Approve leave
  * Reject leave
  * Add comments

### 4. Leave Balance Management

* Tracks:

  * Vacation balance
  * Sick leave balance
  * Automatically updates after approval/rejection

### 5. Leave Calendar

* Displays approved leaves
* Highlights employee leave schedules
* Provides visibility of availability

---

##  Tech Stack

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js (Express)
* Database: MySQL (XAMPP)

---

##  Quick Demo (No Setup Required)

You can view the frontend directly:

1. Open:

   ```
   frontend/index.html
   ```

2. Use demo credentials:

   * Employee:

     * Email: [employee@gmail.com](mailto:employee@gmail.com)
     * Password: 123
   * Manager:

     * Email: [manager@gmail.com](mailto:manager@gmail.com)
     * Password: 123

> Note: Full functionality (approval, balance update, calendar) requires backend setup.

---

##  Full Setup (Backend Required)

### Step 1: Start Services

* Start XAMPP:

  * Apache
  * MySQL

### Step 2: Import Database

* Open phpMyAdmin
* Create database: `leave_db`
* Import file:

  ```
  database/leave_db.sql
  ```

### Step 3: Run Backend

```
cd backend
npm install
node server.js
```

### Step 4: Run Frontend

Open in browser:

```
http://127.0.0.1:8080/frontend/index.html
```

---

##  Demo Flow

1. Login as Employee
2. Apply for leave
3. Login as Manager
4. Approve/Reject leave with comment
5. Check:
   * Leave balance updated
   * Calendar updated

---

##  Key Highlights

* End-to-end leave workflow
* Real-time balance updates
* Calendar visualization
* Clean and responsive UI
* Practical real-world implementation

---
##  Project demo

You can view the demo video over here:

* https://drive.google.com/file/d/1EnYBxGOD091ewZ4e3yUhZWoXdkrKq8mI/view?usp=drive_link


##  Author

**Sheetal Pawar**
B.Tech Computer Science Engineer
Aspiring Software Developer

---
This project demonstrates full-stack development skills including frontend design, backend API development, and database integration.


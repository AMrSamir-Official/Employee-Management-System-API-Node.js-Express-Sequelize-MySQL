# Employee Management System API

A Node.js + Express + Sequelize + MySQL backend application for managing employees and departments.  
This project was built as part of a **Backend Developer Technical Assessment**.

**Author:** Amr Samir

---

## Core Features (Required by Assessment)
- **Employee Management:** CRUD operations (Create, Read, Update, Delete) with validation
- **Department Management:** Each employee belongs to a department (id, name)
- **Pagination:** 10 employees per page
- **Filtering:** Filter employees by department
- **Data Export:** Export employee list to CSV and PDF (with department info, filterable by department)
- **Logging:** Logs Create/Update/Delete employee actions to console and file
- **Input Validation:** Joi validation (email format, salary as number)
- **Database Setup:** Sequelize migrations and seeders
- **Error Handling:** Centralized error handler
- **RESTful API:** Follows standard API practices

---

## Bonus Features (Optional, not required but included)
- **Authentication (JWT):** Optional user auth system
- **EJS Web Interface:** Simple employee list page at `/`
- **Health Check Endpoint:** `/health` returns API status

---

## Project Structure
```
project-root/
├── config/              # Database and logger configuration
├── models/              # Sequelize models (Employee, Department)
├── controllers/         # Business logic
├── routes/              # API routes
├── middlewares/         # Error handling & validation
├── services/            # Report export (CSV & PDF)
├── migrations/          # Database migrations
├── seeders/             # Database seed data
├── views/               # EJS templates (bonus)
├── logs/                # Log files
├── app.js               # Express configuration
├── server.js            # Server entry point
├── .env.example         # Environment variables template
└── README.md
```

---

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MySQL (v5.7+)
- npm or yarn

### Steps
```bash
# Clone repository
git clone <repository-url>
cd employee-management-api

# Install dependencies
npm install

# Copy and configure environment file
cp .env.example .env
# Edit .env with your DB credentials

# Create database in MySQL
CREATE DATABASE employee_management;

# Run migrations and seeders
npm run migrate
npm run seed

# Start server
npm run dev    # Development
npm start      # Production
```

---

## API Endpoints

### Employee
- `POST /api/employees` → Create employee  
- `GET /api/employees` → Get employees (pagination + filter)  
- `GET /api/employees/:id` → Get employee by ID  
- `PUT /api/employees/:id` → Update employee  
- `DELETE /api/employees/:id` → Delete employee  
- `GET /api/employees/export/csv` → Export to CSV  
- `GET /api/employees/export/pdf` → Export to PDF  

### Department
- `POST /api/departments` → Create department  
- `GET /api/departments` → Get all departments  
- `GET /api/departments/:id` → Get department by ID  
- `PUT /api/departments/:id` → Update department  
- `DELETE /api/departments/:id` → Delete department  

---

## Database Schema

### Departments
```sql
CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Employees
```sql
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  salary DECIMAL(10,2) NOT NULL,
  departmentId INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (departmentId) REFERENCES departments(id)
);
```

---

## Logging
- Logs employee Create, Update, Delete actions
- Outputs to console and `logs/app.log`

---

# Employee Management System API

A complete Node.js + Express + Sequelize + MySQL backend application for managing employees and departments with comprehensive features including CRUD operations, reporting, logging, and data export capabilities.

**Author:** Amr Samir

## Core Features

- **Employee Management:** Complete CRUD operations with validation
- **Department Management:** Department organization and relationships
- **Data Export:** CSV and PDF report generation
- **Pagination & Filtering:** Advanced search and sorting capabilities
- **Logging System:** Winston-based logging to console and file
- **Input Validation:** Joi middleware for data validation
- **Database Management:** Sequelize CLI migrations and seeders
- **Error Handling:** Centralized error handling middleware
- **RESTful API:** Following REST API best practices

## Complete Project Structure

\`\`\`
project-root/
├── 📁 config/                    # Configuration files
│   ├── database.js               # Sequelize database connection setup
│   ├── config.json               # Sequelize CLI configuration
│   └── logger.js                 # Winston logging configuration
├── 📁 models/                    # Sequelize data models
│   ├── employee.js               # Employee model (name, email, salary, departmentId)
│   ├── department.js             # Department model (name)
│   └── index.js                  # Model associations and relationships
├── 📁 controllers/               # Business logic controllers
│   ├── employeeController.js     # Employee CRUD operations, pagination, filtering
│   └── departmentController.js   # Department CRUD operations
├── 📁 routes/                    # API route definitions
│   ├── employeeRoutes.js         # Employee API endpoints
│   └── departmentRoutes.js       # Department API endpoints
├── 📁 middlewares/               # Custom middleware functions
│   ├── errorHandler.js           # Centralized error handling middleware
│   └── validateInput.js          # Joi input validation middleware
├── 📁 services/                  # Business services
│   └── reportService.js          # CSV & PDF export generation service
├── 📁 migrations/                # Sequelize CLI database migrations
│   ├── 20241207000001-create-departments.js # Department table creation
│   └── 20241207000002-create-employees.js   # Employee table creation
├── 📁 seeders/                   # Sequelize CLI database seeders
│   ├── 20241207000001-demo-departments.js  # Sample department data
│   └── 20241207000002-demo-employees.js    # Sample employee data
├── 📁 scripts/                   # Utility scripts (legacy support)
│   └── setup-database.js         # Automated database setup script (SQL)
├── 📁 views/                     # EJS template views (optional bonus)
│   └── index.ejs                 # Employee list web interface
├── 📁 logs/                      # Application logs
│   └── app.log                   # Winston log file output
├── 📄 .sequelizerc               # Sequelize CLI configuration
├── 📄 app.js                     # Express application setup and middleware
├── 📄 server.js                  # Server entry point and startup
├── 📄 .env.example               # Environment variables template
├── 📄 package.json               # Dependencies, scripts, and project metadata
└── 📄 README.md                  # This comprehensive documentation
\`\`\`

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm package manager

### Step 1: Clone and Install
\`\`\`bash
git clone <repository-url>
cd employee-management-api
npm install
\`\`\`

### Step 2: Environment Configuration
\`\`\`bash
# Copy environment template
cp .env.example .env

# Configure your .env file with these variables:
DB_HOST=localhost
DB_PORT=3306
DB_NAME=employee_management
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
PORT=3000
NODE_ENV=development
\`\`\`

### Step 3: Database Setup with Sequelize CLI
\`\`\`bash
# Method 1: Automated setup (recommended)
npm run db:setup

# Method 2: Step by step
npm run db:create    # Create database
npm run db:migrate   # Run migrations to create tables
npm run db:seed      # Insert sample data

# Additional Sequelize CLI commands
npm run db:migrate:undo    # Undo last migration
npm run db:seed:undo       # Undo all seeders
npm run db:reset           # Reset database (undo + migrate + seed)
\`\`\`

### Step 4: Start Application
\`\`\`bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
\`\`\`

**Application URL:** `http://localhost:3000`
**API Base URL:** `http://localhost:3000/api`

## Sequelize CLI Database Management

### Migration Files Structure
The project uses Sequelize CLI for database schema management:

**Migration: 20241207000001-create-departments.js**
\`\`\`javascript
// Creates departments table with:
// - id (Primary Key, Auto Increment)
// - name (String, Unique, Required)
// - created_at, updated_at (Timestamps)
// - Index on name field for performance
\`\`\`

**Migration: 20241207000002-create-employees.js**
\`\`\`javascript
// Creates employees table with:
// - id (Primary Key, Auto Increment)
// - name, email, salary (Required fields)
// - department_id (Foreign Key to departments)
// - created_at, updated_at (Timestamps)
// - Indexes on email, department_id, name, salary
// - Foreign key constraints with CASCADE/RESTRICT
\`\`\`

### Seeder Files Structure
Sample data is managed through Sequelize CLI seeders:

**Seeder: 20241207000001-demo-departments.js**
- Inserts 6 sample departments (HR, Engineering, Marketing, Sales, Finance, Operations)

**Seeder: 20241207000002-demo-employees.js**
- Inserts 16 sample employees across all departments
- Realistic names, emails, and salary ranges

### Database Commands Reference
\`\`\`bash
# Database Creation
npm run db:create              # Create database

# Migration Management
npm run db:migrate             # Run all pending migrations
npm run db:migrate:undo        # Undo last migration
npm run db:migrate:undo:all    # Undo all migrations

# Seeder Management
npm run db:seed                # Run all seeders
npm run db:seed:undo           # Undo all seeders
npm run db:seed:undo:all       # Undo all seeders (same as above)

# Combined Operations
npm run db:setup               # Create + Migrate + Seed
npm run db:reset               # Undo seeders + Undo migrations + Migrate + Seed
\`\`\`

## Complete API Documentation

### Employee Management Endpoints

#### 1. Create Employee
\`\`\`http
POST /api/employees
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@company.com",
  "salary": 75000.00,
  "departmentId": 1
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@company.com",
    "salary": 75000.00,
    "departmentId": 1,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
\`\`\`

#### 2. Get All Employees (with Advanced Filtering)
\`\`\`http
GET /api/employees?page=1&limit=10&departmentId=1&search=john&sortBy=name&sortOrder=ASC
\`\`\`

**Query Parameters:**
- `page` (number): Page number for pagination (default: 1)
- `limit` (number): Items per page (default: 10, max: 100)
- `departmentId` (number): Filter by department ID
- `search` (string): Search in name and email fields
- `sortBy` (string): Sort field (name, email, salary, createdAt)
- `sortOrder` (string): ASC or DESC (default: ASC)

**Response:**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@company.com",
      "salary": 75000.00,
      "departmentId": 1,
      "Department": {
        "id": 1,
        "name": "Engineering"
      }
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 45,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
\`\`\`

#### 3. Get Employee by ID
\`\`\`http
GET /api/employees/:id
\`\`\`

#### 4. Update Employee
\`\`\`http
PUT /api/employees/:id
Content-Type: application/json

{
  "name": "John Smith",
  "email": "john.smith@company.com",
  "salary": 80000.00,
  "departmentId": 2
}
\`\`\`

#### 5. Delete Employee
\`\`\`http
DELETE /api/employees/:id
\`\`\`

#### 6. Export Employee Data
\`\`\`http
# Export to CSV
GET /api/employees/export/csv?departmentId=1

# Export to PDF
GET /api/employees/export/pdf?departmentId=1
\`\`\`

### Department Management Endpoints

#### 1. Create Department
\`\`\`http
POST /api/departments
Content-Type: application/json

{
  "name": "Engineering"
}
\`\`\`

#### 2. Get All Departments
\`\`\`http
GET /api/departments?includeEmployees=true
\`\`\`

**Query Parameters:**
- `includeEmployees` (boolean): Include employee count and list

#### 3. Get Department by ID
\`\`\`http
GET /api/departments/:id
\`\`\`

#### 4. Update Department
\`\`\`http
PUT /api/departments/:id
Content-Type: application/json

{
  "name": "Software Engineering"
}
\`\`\`

#### 5. Delete Department
\`\`\`http
DELETE /api/departments/:id
\`\`\`

## Database Schema Details

### Sequelize CLI Configuration
The project uses `.sequelizerc` to configure Sequelize CLI paths:
\`\`\`javascript
{
  'config': './config/config.json',
  'models-path': './models',
  'seeders-path': './seeders',
  'migrations-path': './migrations'
}
\`\`\`

### Environment-based Configuration
Database configuration in `config/config.json`:
\`\`\`json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "employee_management_dev",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "mysql"
  }
}
\`\`\`

### Departments Table
\`\`\`sql
CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
\`\`\`

**Fields:**
- `id`: Primary key, auto-increment
- `name`: Department name (unique, required)
- `createdAt`: Record creation timestamp
- `updatedAt`: Record update timestamp

### Employees Table
\`\`\`sql
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
\`\`\`

**Fields:**
- `id`: Primary key, auto-increment
- `name`: Employee full name (required)
- `email`: Employee email address (unique, required)
- `salary`: Employee salary (decimal, required)
- `departmentId`: Foreign key to departments table (required)
- `createdAt`: Record creation timestamp
- `updatedAt`: Record update timestamp

**Relationships:**
- Each employee belongs to one department (Many-to-One)
- Each department can have multiple employees (One-to-Many)

## Validation Rules

### Employee Validation
- **Name:** Required, 2-100 characters, letters and spaces only
- **Email:** Required, valid email format, unique across system
- **Salary:** Required, positive number, maximum 999,999.99
- **Department ID:** Required, must exist in departments table

### Department Validation
- **Name:** Required, 2-100 characters, unique across system

## Logging System

The application uses Winston for comprehensive logging:

### Log Destinations
- **Console Output:** Development mode with colorized output
- **File Output:** `logs/app.log` with structured JSON format

### Logged Events
- **Employee Operations:** Created, updated, deleted with details
- **API Requests:** HTTP method, endpoint, response status
- **Database Operations:** Connection status, query errors
- **Validation Errors:** Input validation failures with details
- **System Errors:** Application errors with stack traces

### Log Format
\`\`\`json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "level": "info",
  "message": "Employee created successfully",
  "employeeId": 1,
  "employeeName": "John Doe",
  "userId": "system"
}
\`\`\`

## Error Handling

### Centralized Error Handler
All errors are processed through `middlewares/errorHandler.js`:

### Error Response Format
\`\`\`json
{
  "success": false,
  "error": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email must be a valid email address"
    }
  ],
  "statusCode": 400
}
\`\`\`

### HTTP Status Codes Used
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `404`: Not Found
- `409`: Conflict (duplicate data)
- `500`: Internal Server Error

## Available npm Scripts

\`\`\`bash
# Server Management
npm start              # Start production server
npm run dev            # Start development server with nodemon

# Sequelize CLI Database Management
npm run db:create      # Create database
npm run db:migrate     # Run database migrations
npm run db:seed        # Run database seeders
npm run db:setup       # Complete database setup (create + migrate + seed)
npm run db:reset       # Reset database (undo + migrate + seed)
npm run db:migrate:undo    # Undo last migration
npm run db:seed:undo       # Undo all seeders

# Development Tools
npm run lint          # Run ESLint code analysis
npm test              # Run test suite (if implemented)
\`\`\`

## File-by-File Breakdown

### Core Application Files

**server.js**
- Application entry point
- Server startup and port binding
- Graceful shutdown handling

**app.js**
- Express application configuration
- Middleware setup (CORS, JSON parsing, logging)
- Route registration
- Error handling middleware

### Configuration Files

**config/database.js**
- Sequelize ORM configuration
- Database connection setup
- Environment-based configuration

**config/config.json**
- Sequelize CLI configuration
- Database configuration for different environments

**config/logger.js**
- Winston logger configuration
- Console and file transport setup
- Log level and format configuration

### Model Files

**models/index.js**
- Sequelize initialization
- Model associations setup
- Database synchronization

**models/employee.js**
- Employee model definition
- Field validation rules
- Model hooks and methods

**models/department.js**
- Department model definition
- Validation constraints
- Association definitions

### Controller Files

**controllers/employeeController.js**
- Employee CRUD operations
- Pagination and filtering logic
- Input validation and error handling
- Logging integration

**controllers/departmentController.js**
- Department CRUD operations
- Employee relationship handling
- Validation and error management

### Route Files

**routes/employeeRoutes.js**
- Employee API endpoint definitions
- Route parameter validation
- Middleware integration

**routes/departmentRoutes.js**
- Department API endpoint definitions
- Route-level validation
- Controller method binding

### Middleware Files

**middlewares/errorHandler.js**
- Centralized error processing
- Error response formatting
- HTTP status code management

**middlewares/validateInput.js**
- Joi validation schemas
- Input sanitization
- Validation error formatting

### Service Files

**services/reportService.js**
- CSV export functionality
- PDF generation with formatting
- Data transformation for exports

## Testing the API

### Using cURL Examples

#### Create Department
\`\`\`bash
curl -X POST http://localhost:3000/api/departments \
  -H "Content-Type: application/json" \
  -d '{"name": "IT Department"}'
\`\`\`

#### Create Employee
\`\`\`bash
curl -X POST http://localhost:3000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@company.com",
    "salary": 85000,
    "departmentId": 1
  }'
\`\`\`

#### Get Employees with Filtering
\`\`\`bash
curl "http://localhost:3000/api/employees?page=1&limit=5&departmentId=1&search=jane"
\`\`\`

#### Export to CSV
\`\`\`bash
curl "http://localhost:3000/api/employees/export/csv?departmentId=1" \
  --output employees.csv
\`\`\`

### Using Postman
Import the following collection for comprehensive API testing:
- Base URL: `http://localhost:3000/api`
- Set Content-Type: `application/json` for POST/PUT requests
- Use query parameters for filtering and pagination

## Optional Bonus Features

### JWT Authentication (Bonus)
- User registration and login endpoints
- JWT token generation and validation
- Protected route middleware
- User session management

### EJS Web Interface (Bonus)
- Simple web interface at `http://localhost:3000/`
- Employee list view with basic styling
- Department filtering capabilities
- Export download links

## Troubleshooting

### Common Issues

**Database Connection Error**
- Verify MySQL is running
- Check .env database credentials
- Ensure database exists: `npm run db:create`

**Migration Errors**
- Check migration status: `npx sequelize-cli db:migrate:status`
- Undo problematic migration: `npm run db:migrate:undo`
- Reset database: `npm run db:reset`

**Seeder Errors**
- Undo seeders: `npm run db:seed:undo`
- Check foreign key constraints
- Verify department data exists before employee data

**Port Already in Use**
- Change PORT in .env file
- Kill existing Node.js processes

### Sequelize CLI Debugging
\`\`\`bash
# Check migration status
npx sequelize-cli db:migrate:status

# Check seeder status  
npx sequelize-cli db:seed:status

# Generate new migration
npx sequelize-cli migration:generate --name migration-name

# Generate new seeder
npx sequelize-cli seed:generate --name seeder-name
\`\`\`

### Log Analysis
Check `logs/app.log` for detailed error information and application flow tracking.

## License

MIT License - Feel free to use this project for learning and development purposes.

---

**Project Status:** Production Ready ✅  
**Last Updated:** December 2024  
**Node.js Version:** 14+  
**Database:** MySQL 5.7+  
**ORM:** Sequelize with CLI support
#   E m p l o y e e - M a n a g e m e n t - S y s t e m - A P I - N o d e . j s - E x p r e s s - S e q u e l i z e - M y S Q L -  
 
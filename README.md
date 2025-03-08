# TODO List API

This document provides detailed information about the REST API for managing users and tasks. The API is built using Express.js and follows a structured project layout.

---

## Table of Contents
1. [Project Structure](#project-structure)
2. [User Routes](#user-routes)
   - [Register User](#register-user)
   - [Get User by ID](#get-user-by-id)
   - [Update User](#update-user)
   - [Delete User](#delete-user)
3. [Task Routes](#task-routes)
   - [Create Task](#create-task)
   - [Get Tasks by User](#get-tasks-by-user)
   - [Update Task](#update-task)
   - [Delete Task](#delete-task)
4. [Validation Rules](#validation-rules)
   - [User Validation](#user-validation)
   - [Task Validation](#task-validation)
5. [Authentication](#authentication)
6. [Running the Project](#running-the-project)

---
## User Routes

### Register User

- **Endpoint**: `POST /api/register-user`
- **Description**: Registers a new user.
- **Authentication**: Not required.
- **Request Body**:
  ```json
  {
    "name": "Caba legal",
    "email": "caba@legal.com",
    "password": "senha123"
  }
  ```
- **Response**:
  - Success: `201 Created`
  - Error: `400 Bad Request` (if validation fails) or `500 Internal Server Error`

---

### Get User by ID

- **Endpoint**: `GET /api/user/:id`
- **Description**: Retrieves a user by their ID.
- **Authentication**: Not required.
- **Request Params**:
  - `id`: User ID (required)
- **Response**:
  - Success: `200 OK` with user data
  - Error: `400 Bad Request` (if validation fails) or `500 Internal Server Error`

---

### Update User

- **Endpoint**: `PUT /api/user/update/:id`
- **Description**: Updates an existing user by their ID.
- **Authentication**: Required (JWT token).
- **Request Params**:
  - `id`: User ID (required)
- **Request Body**:
  ```json
  {
    "name": "Updated Name",
    "email": "updated.email@example.com"
  }
  ```
- **Response**:
  - Success: `200 OK`
  - Error: `400 Bad Request` (if validation fails) or `500 Internal Server Error`

---

### Delete User

- **Endpoint**: `DELETE /api/user/delete/:id`
- **Description**: Deletes a user by their ID.
- **Authentication**: Required (JWT token).
- **Request Params**:
  - `id`: User ID (required)
- **Response**:
  - Success: `200 OK`
  - Error: `400 Bad Request` (if validation fails) or `500 Internal Server Error`

---

## Task Routes

### Create Task

- **Endpoint**: `POST /api/task/create`
- **Description**: Creates a new task.
- **Authentication**: Required (JWT token).
- **Request Body**:
  ```json
  {
    "title": "Complete API Documentation",
    "userId": "12345"
  }
  ```
- **Response**:
  - Success: `201 Created`
  - Error: `400 Bad Request` (if validation fails) or `500 Internal Server Error`

---

### Get Tasks by User

- **Endpoint**: `GET /api/tasks/:userId`
- **Description**: Retrieves all tasks for a specific user.
- **Authentication**: Required (JWT token).
- **Request Params**:
  - `userId`: User ID (required)
- **Response**:
  - Success: `200 OK` with list of tasks
  - Error: `400 Bad Request` (if validation fails) or `500 Internal Server Error`

---

### Update Task

- **Endpoint**: `PUT /api/task/update/:id`
- **Description**: Updates an existing task by its ID.
- **Authentication**: Required (JWT token).
- **Request Params**:
  - `id`: Task ID (required)
- **Request Body**:
  ```json
  {
    "title": "Updated Task Title",
    "completed": true
  }
  ```
- **Response**:
  - Success: `200 OK`
  - Error: `400 Bad Request` (if validation fails) or `500 Internal Server Error`

---

### Delete Task

- **Endpoint**: `DELETE /api/task/delete/:id`
- **Description**: Deletes a task by its ID.
- **Authentication**: Required (JWT token).
- **Request Params**:
  - `id`: Task ID (required)
- **Response**:
  - Success: `200 OK`
  - Error: `400 Bad Request` (if validation fails) or `500 Internal Server Error`

---

## Validation Rules

### User Validation

- **Create User**:
  - Fields: `name`, `email`, `password` (all required).
  - Errors: Missing fields will return `400 Bad Request` with a list of errors.
- **Get User**:
  - Fields: `id` (required).
  - Errors: Missing `id` will return `400 Bad Request`.
- **Update User**:
  - Fields: `id` (required), `updateData` (cannot be empty).
  - Errors: Missing `id` or empty `updateData` will return `400 Bad Request`.
- **Delete User**:
  - Fields: `id` (required).
  - Errors: Missing `id` will return `400 Bad Request`.

### Task Validation

- **Create Task**:
  - Fields: `title`, `userId` (all required).
  - Errors: Missing fields will return `400 Bad Request`.
- **Get Tasks**:
  - Fields: `userId` (required).
  - Errors: Missing `userId` will return `400 Bad Request`.
- **Update Task**:
  - Fields: `id` (required), `updateData` (cannot be empty).
  - Errors: Missing `id` or empty `updateData` will return `400 Bad Request`.
- **Delete Task**:
  - Fields: `id` (required).
  - Errors: Missing `id` will return `400 Bad Request`.

---

## Authentication

- **JWT Token**: Required for all task routes and user update/delete routes.
- **Middleware**: `verifyJWT` is used to validate the token.

---

## Running the Project

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Run tests:
   ```bash
   npm test
   ```
4. Run tests in watch mode:
   ```bash
   npm run test:watch
   ```
---

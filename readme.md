# Bus Ticket Management System

This project is a backend system for managing bus tickets. It allows users to purchase tickets for specific buses at specified times and provides role-based management for admins and users. The system is built using **Node.js**, **Express.js**, and **MongoDB** with a modular design pattern.

---

## Features

### 1. User Authentication
- User registration, login, and logout.
- Password hashing using bcrypt.
- JWT-based authentication and role-based authorization.

### 2. Admin Functionalities
- Add, update, and delete bus information.


### 3. User Functionalities
- View available buses.

### 4. Additional Requirements
- Proper validation and error handling for all endpoints.
- Modular design for scalability and maintainability.

---

## Technology Stack

- **Backend**: Node.js, Express.js, TypeScript.
- **Database**: MongoDB with Mongoose.
- **Authentication**: JWT-based.
- **Language**: JavaScript (TypeScript preferred).

---

## View Live

You can view the live version of the project at:

[**View Live**](https://ticket-management-system-tau.vercel.app/)

## Project Setup

### Prerequisites
- Node.js installed (v16+ recommended).
- MongoDB instance running locally or remotely.
- Postman for API testing (optional).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Ubaidullah-Hasan/ticket-management-system.git
   cd ticket-management-system
2. Set environment variables:
   ```bash
    PORT=3000
    NODE_ENV=development
    DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>
    JWT_SECRET=your_jwt_secret
    SALT_ROUND=12
    JWT_ACCESS_SECRET="1888cc385ec74b79e53432e770c938bf7f04a045888ac991091237d8566a89aa8af67cc64d99db95af1b02a2229edbecdb921f302d2cc8ff5dbe1e6b642f3330" 
    JWT_REFRESH_SECRET="9063557f7b6e0480156c0dd183484e12deae66664645b556e35e5d4403b1860d6358d45a89ea5c0baea7ab215bac3c64405a87e5f428e102c3fdf2969f4d8047"
    JWT_ACCESS_EXPIRES_IN=1d
    JWT_REFRESH_EXPIRES_IN=365d
    ```
3. Set environment variables:
   ```bash
    npm install
    ```
4. Set environment variables:
   ```bash
    npm run start:dev
    ````


## API Endpoints

### 1. Authentication APIs

| **Method** | **Endpoint**     | **Description**   |
| ---------- | ---------------- | ----------------- |
| POST       | `api/auth/register` | User registration |
| POST       | `api/auth/login`    | User login        |
| POST       | `api/auth/logout`   | User logout       |


### 2. Admin APIs

| **Method** | **Endpoint**        | **Description**           |
| ---------- | ------------------- | ------------------------- |
| POST       | `api/admin/bus`        | Add a new bus             |
| PUT        | `api/admin/bus/:id`    | Update bus information    |
| DELETE     | `api/admin/bus/:id`    | Delete a bus              |

### 3. User APIs

| **Method** | **Endpoint**        | **Description**                               |
| ---------- | ------------------- | --------------------------------------------- |
| GET        | `/buses`            | View all available buses                      |


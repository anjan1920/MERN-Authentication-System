

# MERN Authentication System

A full-stack authentication system built using the MERN stack that implements secure, stateless JWT-based authentication, protected routes, and hashed password storage.

This project focuses on understanding how authentication works internally — including password hashing, token creation, middleware verification, and access control.

---

## 📌 Core Concept

This system uses **stateless authentication**.

* The server does not store sessions.
* A JWT is generated after login.
* The client sends the token with every protected request.
* The backend verifies the token on each request.

Access is granted only if the token is valid and unexpired.

---

## 🔐 Authentication Flow

### 1️⃣ Registration

* User submits email and password.
* Password is hashed using **bcryptjs** before storing.
* User record is saved in MongoDB.
* Plain text passwords are never stored.

---

### 2️⃣ Login

* Credentials are verified against stored user data.
* If valid:

  * A JWT is generated using **jsonwebtoken**.
  * Token is signed using a secret key.
  * Token is returned to the client.

---

### 3️⃣ Protected Route Access

For protected routes:

1. Client sends:

   ```
   Authorization: Bearer <token>
   ```
2. Middleware:

   * Extracts the token
   * Verifies signature and expiration
   * Decodes user ID
   * Attaches user info to `req.user`
3. Request proceeds only if token is valid.

---

### 4️⃣ Profile Endpoint (`/me`)

* Accessible only to authenticated users.
* Returns user-specific data.
* Blocks unauthorized access.

---

## 🏗 Backend Architecture

```
backend/
│
├── config/
│   └── db.js          → MongoDB connection logic
│
├── middleware/
│   └── auth.js        → JWT verification middleware
│
├── models/
│   └── User.js        → User schema (hashed passwords)
│
├── routes/
│   └── auth.js        → Register, Login, Profile routes
│
└── server.js          → Express app configuration
```

---

## ⚙️ Tech Stack

### Backend

**Node.js**
JavaScript runtime environment used to build the server.

**Express (v5)**
Web framework for handling routing, middleware, and HTTP requests.

**MongoDB**
NoSQL database used to store user records.

**Mongoose**
ODM (Object Data Modeling) library for MongoDB, used to define schemas and interact with the database.


---

### Frontend

The frontend is built using:

* React
* React Router
* Axios

It handles:

* Login & registration forms
* Token storage in localStorage
* Attaching JWT to protected API requests
* Conditional routing based on authentication state

The primary authentication logic remains on the backend.

---

## ▶️ Project Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/anjan1920/MERN-Authentication-System
cd MERN-Authentication-System
```

---

### 2️⃣ Install Backend Dependencies

```
npm install
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```
PORT=5400
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 4️⃣ Run Backend (Development Mode)

```
npm run dev
```

---

## 🖥️ Frontend Setup

If the frontend is inside a separate folder (e.g., `frontend/`):

```
cd frontend
npm install
npm start
```

This installs all frontend dependencies and starts the React development server.




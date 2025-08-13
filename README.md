This is the **React + Vite** frontend for the **JWT Auth Demo App**.  
It connects to the Node/Express backend to handle **user registration, login, logout, and protected routes** using **JWT access & refresh tokens**.

---

## 📦 Tech Stack

- **React 18** (Vite)
- **React Router DOM v6**
- **Axios** (with interceptors)
- **Context API** (Auth state management)
- **JavaScript (ESM)**

---

## ⚙️ Setup & Installation

1. **Clone the full project**
   ```bash
   git clone <your-repo-url>
   cd jwt-auth-demo/frontend
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the `frontend` folder:

   ```env
   VITE_API_BASE=http://localhost:5000/api
   ```

   > In production, set this to your backend API URL on Render or any host.

4. **Run in development**

   ```bash
   npm run dev
   ```

   The app will be available at:

   ```
   http://localhost:5173
   ```

---

## 🗂 Project Structure

```
src/
├── api/axios.js              # Axios instance (baseURL + credentials)
├── context/AuthContext.jsx   # Global auth state (login, register, logout, refresh)
├── components/
│   └── ProtectedRoute.jsx    # Restricts access to logged-in users
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Dashboard.jsx
├── App.jsx                   # Main routes + navigation
└── main.jsx                  # App entry point
```

---

## 🔑 Authentication Flow

1. **Register/Login**

   * Sends credentials to backend (`/auth/register` or `/auth/login`).
   * Backend sets **refresh token** in an `httpOnly` cookie.
   * Backend returns **access token** in JSON.

2. **Protected Routes**

   * `accessToken` stored in localStorage + state.
   * `ProtectedRoute` checks for token before rendering.

3. **Token Refresh**

   * If a request fails with `401`, Axios interceptor calls `/auth/refresh`.
   * New access token is saved and the request is retried.

4. **Logout**

   * Clears access token from localStorage.
   * Backend clears refresh token cookie.

---

## 🚀 Deployment

* **Frontend:** Vercel, Netlify, etc.
* **Backend:** Render, Railway, or VPS.
* Make sure you update `VITE_API_BASE` in `.env` to the deployed backend URL.

---

## 📌 API Endpoints (Expected from Backend)

* `POST /auth/register` → Create account
* `POST /auth/login` → Login
* `POST /auth/refresh` → Get new access token
* `GET /auth/me` → Get current user (requires `Authorization: Bearer <token>`)
* `POST /auth/logout` → Logout

---

## ✅ Features

* User registration & login
* Persistent authentication
* Auto token refresh
* Protected routes with redirects
* Logout functionality
* Minimal, clean UI ready for extension

--

Do you want me to prepare the backend README as well?
```

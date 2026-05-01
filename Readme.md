# 🚀 Team Task Manager

A full-stack task management application built using the MERN stack. This app allows users to register, log in, and manage their daily tasks efficiently.

---

## 🌐 Live Demo

* 🔗 Frontend: https://your-frontend-url.vercel.app
* 🔗 Backend API: https://team-task-manager-2-d7ov.onrender.com

---

## 📌 Features

* 🔐 User Authentication (Signup/Login with JWT)
* 📝 Create, Update, Delete Tasks
* 📅 Task Due Dates
* 📊 Task Status Management (Pending / In Progress / Done)
* 🔒 Protected Routes using Middleware
* 🌍 Fully deployed (Frontend + Backend)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios
* Tailwind CSS
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt (Password Hashing)

---

## 📂 Project Structure

```
team-task-manager/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── api/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/team-task-manager.git
cd team-task-manager
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

Run backend:

```
npm start
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
```

Create `.env` file:

```
REACT_APP_API_URL=https://team-task-manager-2-d7ov.onrender.com/api
```

Run frontend:

```
npm start
```

---

## 🚀 Deployment

* Backend deployed on **Render**
* Frontend deployed on **Vercel**

---

## 🔐 API Endpoints

### Auth

* `POST /api/auth/signup`
* `POST /api/auth/login`

### Tasks

* `GET /api/tasks`
* `POST /api/tasks`
* `PUT /api/tasks/:id`
* `DELETE /api/tasks/:id`

---

## 🧪 Future Improvements

* 👥 Team collaboration (multi-user projects)
* 📊 Dashboard analytics
* 🔔 Notifications
* 📱 Mobile responsiveness improvements

---

## 👨‍💻 Author

**Lav Raj**

* GitHub: https://github.com/Lavraj15

---

## ⭐ Show Your Support

If you like this project, please ⭐ the repo and share it!

---

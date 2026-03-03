# 🎬 YouTube Clone (MERN Stack)

A full-featured YouTube Clone built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

This project includes authentication, video uploads, likes, comments, subscriptions, dark mode, and responsive UI — similar to real YouTube.

---

## 🚀 Features

### 🔐 Authentication
- User Signup
- User Login (JWT based)
- Protected Routes

### 📺 Videos
- Upload videos
- View video player page
- View count formatting (K / M)
- Related videos section
- Search functionality
- Category filtering

### 👍 Engagement
- Like / Unlike videos
- Add comments
- Delete own comments
- Subscribe / Unsubscribe channels
- Subscriber count

### 👤 Channel
- Channel page
- View channel videos
- Subscribe button

### 📚 User Features
- Subscriptions page
- Library page
- Watch History page

### 🎨 UI Improvements
- Dark / Light mode toggle
- Responsive layout
- Hover card animations
- Clean modern design

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Inline Styling (Custom CSS)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

---

## 📂 Project Structure


youtube-clone/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ ├── main.jsx
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository


git clone https://github.com/your-username/youtube-clone.git

cd youtube-clone


---

### 2️⃣ Backend Setup


cd backend
npm install
npm run dev


Create a `.env` file inside `backend`:


PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


---

### 3️⃣ Frontend Setup

Open new terminal:


cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173


Backend runs on:

http://localhost:8080


---

## 🔐 Environment Variables

Inside backend `.env` file:


PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


---

## 🌙 Dark Mode

The application supports full dark/light mode toggle.

Global CSS reset is applied via:


index.css


---

## 📦 API Endpoints Overview

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`

### Videos
- `POST /api/videos`
- `GET /api/videos`
- `GET /api/videos/:id`
- `GET /api/videos/search`

### Likes
- `POST /api/likes`
- `GET /api/likes/video/:id`

### Comments
- `POST /api/comments`
- `GET /api/comments/video/:videoId`
- `DELETE /api/comments/:id`

### Subscriptions
- `POST /api/subscriptions`
- `GET /api/subscriptions/:userId`

---

## 🧠 Learning Outcomes

This project helped practice:

- Full MERN stack integration
- JWT authentication
- REST API design
- MongoDB relationships
- React state management
- UI/UX improvement
- Clean component structure
- Protected routing

---

## 📸 Screenshots

(Add your screenshots here before pushing to GitHub)

---

## 🚀 Future Improvements

- Video file upload using Cloudinary
- User profile page
- Playlist feature
- Notifications system
- Pagination
- Infinite scroll
- Deployment (Render / Vercel)

---

## 👨‍💻 Author

Built by Lohith Kumar



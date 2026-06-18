# 📝 Notes Management System

A full-stack Notes Management System built using **React, Node.js, Express, and MongoDB** that allows users to create, manage, search, update, and delete notes efficiently.

---

## 🚀 Live Demo

### Frontend
🌐 https://popaya-fullstack-assessment-1.onrender.com

### Backend API
🌐 https://popaya-fullstack-assessment.onrender.com

### Github URL
🌐 https://github.com/sahiltopale/popaya-fullstack-assessment

---

# 📌 Project Overview

This application provides a complete notes management workflow where users can:

- Create multiple notes
- View all notes
- Edit existing notes
- Delete notes
- Search notes
- View complete note details
- Store data permanently in MongoDB

The project follows full-stack architecture with:

- React Frontend
- Express Backend
- MongoDB Database
- REST APIs

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- Axios
- CSS

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

## Deployment
- Render (Frontend)
- Render (Backend)
- MongoDB Atlas

---

# ✨ Features

## Notes Listing
- Display all notes
- Show title and content preview
- Display created date
- Display updated date
- Sorted based on latest updates

---

## Create Notes
Users can:

- Add multiple notes
- Enter:
  - Title
  - Content

Automatic:
- createdAt
- updatedAt

---

## Edit Notes
Users can:

- Modify title
- Modify content

Automatic:
- updatedAt updates on every edit

---

## Delete Notes
Users can:

- Delete notes
- Confirmation dialog before deletion

---

## View Full Note
Users can:

- Expand note
- View complete content
- Collapse back to preview

---

## Search Notes
Users can:

- Search using:
  - Title
  - Content

Dynamic filtering updates UI instantly.

---

## Validation

Implemented validations:

Frontend:
- Empty title not allowed
- Required field checks

Backend:
- Validation before saving
- Proper error responses

---

# 🏗 Project Structure

```plaintext
fullstacktask
│
├── backend
│   └── notes-api
│       ├── controllers
│       ├── models
│       ├── routes
│       ├── server.js
│       ├── .env
│       └── package.json
│
├── frontend
│   └── notes-ui
│       ├── src
│       │   ├── components
│       │   ├── pages
│       │   ├── services
│       │   ├── App.jsx
│       │   └── main.jsx
│       │
│       └── package.json
│
└── README.md
```

---

# ⚙ Backend API Endpoints

## Get All Notes

```http
GET /notes
```

Response:

```json
[
 {
   "_id":"123",
   "title":"First Note"
 }
]
```

---

## Create Note

```http
POST /notes
```

Request:

```json
{
 "title":"New Note",
 "content":"Content"
}
```

---

## Update Note

```http
PUT /notes/:id
```

---

## Delete Note

```http
DELETE /notes/:id
```

---

## Search Notes

```http
GET /notes/search?q=text
```

---

# 💾 Database Schema

```js
{
 title: String,
 content: String,
 createdAt: Date,
 updatedAt: Date
}
```

---

# 🧪 Local Setup

## Clone Repository

```bash
git clone https://github.com/sahiltopale/popaya-fullstack-assessment.git
```

---

## Backend Setup

```bash
cd backend/notes-api
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run:

```bash
npm start
```

---

## Frontend Setup

```bash
cd frontend/notes-ui
npm install
npm run dev
```

Open:

```plaintext
http://localhost:5173
```

---

# 🚀 Deployment

## Backend
- Render

## Database
- MongoDB Atlas

## Frontend
- Render Static Site

---

# 📷 Application Flow

Create Note  
↓  
Store in MongoDB  
↓  
Display Notes  
↓  
Edit / Delete  
↓  
Search Notes

---

# 📋 Evaluation Criteria Covered

✅ Functionality  
✅ Code Quality  
✅ API Design  
✅ Database Integration  
✅ Validation  
✅ UI/UX  
✅ Search  
✅ Responsiveness  
✅ Documentation

---

# 🔮 Bonus Enhancements

Implemented:
- Modern UI
- Note Preview
- View Full Note
- Loading States
- Empty States
- Responsive Design

Future Improvements:
- Categories
- Tags
- Auto Save
- Authentication
- Pin Notes

---

# 👨‍💻 Developer

**Sahil Topale**

BE Information Technology  
Full Stack Developer (MERN)

GitHub:
https://github.com/sahiltopale

---

## Thank You
This project was developed as part of the Full-Stack Developer Assignment.

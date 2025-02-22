# 📝 Task To Do: Task Management Application

## 🌟 Description

**Task Management Application is a real-time, drag-and-drop task organizer that allows users to manage tasks efficiently across three categories: To-Do, In Progress, and Done. Users can add, edit, delete, and reorder tasks seamlessly while ensuring persistence through MongoDB. The application is built with React (Vite.js) for the frontend, Express.js & MongoDB for the backend, and Firebase Authentication for user login.**

---

## 🔗 Key Links:

- [**Live Website Link**](https://task-to-do-dnd.netlify.app/)
- [**Github Client Repository**](https://github.com/sheikh-saiyam/Task-To-Do/tree/main/client)
- [**Gtihub Server Repository**](https://github.com/sheikh-saiyam/Task-To-Do/tree/main/server)

---

## 🚀️ Key Features

- 🔐 Authentication: Google Sign-in with Firebase.

- 📌 Task Management: Add, edit, delete, and reorder tasks.

- 🏗️ Drag and Drop: Move tasks across categories and reorder them within categories.

- ⚡ Real-Time Sync: Instantly updates in the database using optimistic UI updates.

- 🎨 Modern UI: Clean, minimalistic, and responsive design with a mobile-friendly drag-and-drop experience.

- 🌙 Dark Mode: Toggle between light and dark mode.

---

## 🌐 Tech Stack

### Frontend:

- **React.js (Vite)** – Fast and efficient frontend framework.

- **Tailwind CSS & DaisyUI** – Styling for a clean UI.

- **@hello-pangea/dnd** – Drag-and-drop functionality.

- **Firebase Authentication** – Secure user authentication.

### Backend:

- **Express.js** – Server-side handling.

- **MongoDB** – Database for storing tasks.

---

## ⚙️ JSON Data Structure

### Task Data

```json
{
"_id": "67b726f87d1fec95fdb74656",
"title": "Research Project",
"description": "Gather requirements and create initial documentation....",
"category": "done",
"timestamp": "2/21/2025, 8:35:47 PM",
"email": "yourname@gmail.com",
"username": "Your Name"
},
```

---

## 📦 NPM Packages

### Client

```json
  "dependencies": {
    "@hello-pangea/dnd": "^18.0.1",
    "@tanstack/react-query": "^5.66.8",
    "axios": "^1.7.9",
    "firebase": "^11.3.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "6.28.0",
    "sweetalert2": "^11.17.2"
  }
```

### Server

```json
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "mongodb": "^6.13.0"
  }
```

---
## 🔌 API Endpoints

<div style="width:100%">

| Method | Endpoint                    | Description              |
| ------ | --------------------------- | ------------------------ |
| POST   | `/add-task`                 | Add a new task           |
| GET    | `/my-tasks/email@gmail.com` | Get all tasks for a user |
| PATCH  | `/update-task-category/:id` | Update task category     |
| PUT    | `/update-task/:id`          | Update task details      |
| DELETE | `/delete-task/:id`          | Delete a task            |

</div>


---

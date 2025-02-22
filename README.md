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

| Method | Endpoint                    | Description              |
| ------ | --------------------------- | ------------------------ |
| POST   | `/add-task`                 | Add a new task           |
| GET    | `/my-tasks/email@gmail.com` | Get all tasks for a user |
| PATCH  | `/update-task-category/:id` | Update task category     |
| PUT    | `/update-task/:id`          | Update task details      |
| DELETE | `/delete-task/:id`          | Delete a task            |

---

## ⚙️ Installation & Setup

#### 1. Clone the repository:

```sh
git clone https://github.com/sheikh-saiyam/Task-To-Do
cd Task-To-Do
```

#### 2. Install Dependencies:

- Frontend

```sh
cd client
pnpm install  # Or use npm install
```

- Backend

```sh
cd server
pnpm install  # Or use npm install
```

#### 3. Configure Environment Variables

- Create a `.env.local` file in the **front-end** directory and add:

```env
   VITE_apiKey=your_firebase_apiKey
   VITE_authDomain=your_firebase_authDomain
   VITE_projectId=your_firebase_projectId
   VITE_storageBucket=your_firebase_storageBucket
   VITE_messagingSenderId=your_firebase_messagingSenderId
   VITE_appId=your_firebase_appId
   VITE_API_URL=your_server_api_link
```

- Create a `.env` file in the **back-end** directory and add:

```env
   DB_USER=your_db_user_name
   DB_PASS=your_db_user_password
```

#### 4. Run the Application

#### Start the Frontend

```sh
cd client
pnpm dev  # Or use npm run dev
```

#### Start the Backend

```sh
cd server
pnpm start  # Or use npm start
```

---

## 📷 Project Home Page Image

![Home Page](https://i.ibb.co.com/TqFNnBDQ/Screenshot-2025-02-22-115405.png)

## 🤝 Contributing

- Contributions are welcome! Feel free to open an issue or submit a pull request.

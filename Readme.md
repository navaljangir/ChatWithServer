# Chat with Server

A real-time chat application built using **Next.js 15** for the frontend and **Strapi** as the backend. The app utilizes **PostgreSQL** as the database and **Socket.io** for real-time messaging. The application features theme toggling, chat session handling using local storage, and the ability to switch between different chats seamlessly.

## 🚀 Live Demo

[Chat with Server - Live](https://chat-with-server.vercel.app/)

## 🛠 Tech Stack

### Frontend:
- **Next.js 15** (React-based framework)
- **Zustand** (State management)
- **React Query** (Data fetching and caching)
- **Redux** (State management for specific use cases)
- **Local Storage** (Chat and session handling)
- **Theme Toggler** (Dark/Light mode support)

### Backend:
- **Strapi** (Headless CMS)
- **PostgreSQL** (Relational database)
- **WebSockets (Socket.io)** (Real-time chat functionality)

### Deployment:
- **Frontend:** Vercel
- **Backend:** Hosted separately (e.g., VPS, Cloud provider)

## 🔥 Features
- **Real-time Chat**: Uses WebSockets (Socket.io) for instant messaging.
- **Chat Persistence**: Messages are stored in local storage for quick retrieval.
- **Session Handling**: Maintains session state using local storage.
- **Chat Switching**: Seamlessly switch between different chats.
- **Theme Toggle**: Switch between dark and light modes.
- **Scalable Backend**: Powered by Strapi and PostgreSQL for flexible content management.

## 🏗 Installation & Setup

### Prerequisites:
- **Node.js** (Latest LTS recommended)
- **PostgreSQL** (Installed and running)

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/chat-with-server.git
cd chat-with-server
```

### 2️⃣ Install Dependencies
```sh
npm install  # Or use yarn install
```

### 3️⃣ Set Up Environment Variables
Create a `.env.local` file in the root directory and add the following:
```env
NEXT_PUBLIC_API_URL=https://your-strapi-backend.com
NEXT_PUBLIC_SOCKET_URL=https://your-socket-server.com
```

### 4️⃣ Run the Application
#### Start the Frontend (Next.js)
```sh
cd frontend
npm run dev  # Runs on http://localhost:3000
```

#### Start the Backend (Strapi)
```sh
cd backend
npm run develop  # Runs on http://localhost:1337
```

### 5️⃣ Build for Production
```sh
npm run build && npm start
```

## 📌 Directory Structure
```
/chat-with-server
│── /frontend        # Next.js 15 Application
│── /backend         # Strapi Backend
│── /public          # Static assets
│── .env.local       # Environment variables
│── package.json     # Dependencies and scripts
│── README.md        # Documentation
```

## 🛠 My Technical Skills
### Languages:
- JavaScript, TypeScript, C++, SQL

### Frontend Skills:
- React.js, Next.js, React Query, Zustand, Redux

### Backend Skills:
- Node.js, Express.js, GraphQL, REST API, FastAPI, Server Actions

### Tools:
- Redis, Prisma ORM, Drizzle ORM, SQL, CI/CD, Docker

## 🤝 Contributing
Contributions are welcome! If you'd like to improve this project, fork the repository, create a new branch, and submit a pull request.

## 📬 Contact
For questions or collaboration, reach out to me via GitHub: [github.com/navaljangir](https://github.com/navaljangir)


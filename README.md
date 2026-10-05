# Claude Clone

A full-stack AI chat app inspired by Claude, built with the MERN stack. Users sign up, chat with an AI assistant that remembers the conversation, and come back to their past chats from the sidebar.

**Live demo:** https://claudeclone-tcv2.onrender.com/

## Features

- **Accounts:** register and log in with email and password. Passwords are hashed with bcrypt and sessions use JWT tokens, valid for 7 days.
- **Private chat history:** each user only sees their own threads. The backend checks ownership on every request.
- **Conversation memory:** the last 20 messages of a thread are sent with every request, so the assistant understands follow-up questions.
- **Markdown and code highlighting:** replies render headings, lists and tables, and code blocks are syntax highlighted.
- **Typing effect:** new replies appear word by word.
- **Thread management:** open any past chat from the sidebar, or delete it from the `...` menu.
- **Responsive:** on mobile, the sidebar slides in from a ☰ button.

## Tech stack

| Part | Tech |
|---|---|
| Frontend | React 19, Vite, React Context, react-markdown, rehype-highlight |
| Backend | Node.js, Express 5 |
| Database | MongoDB with Mongoose |
| Auth | JWT (`jsonwebtoken`), `bcryptjs` |
| AI | OpenAI Chat Completions API (`gpt-4o-mini`) |

## Project structure

```
gptClone/
├── backend/
│   ├── controllers/   # chat, threads, user (register/login) logic
│   ├── middleware/    # auth.js: verifies the JWT and sets req.userId
│   ├── models/        # User, Thread, Message schemas
│   ├── routes/        # chat, threads, user routes
│   ├── utils/         # openai.js: calls the OpenAI API
│   └── server.js
└── frontend/
    └── src/
        ├── App.jsx        # app state (context), shows Login or the chat
        ├── Login.jsx      # login / sign-up page
        ├── Sidebar.jsx    # new chat, chat history, user menu
        ├── ChatWindow.jsx # input box, sends messages
        ├── Chat.jsx       # message list, markdown, typing effect
        └── api.js         # fetch helper that attaches the JWT
```

## Running it locally

### Prerequisites

- Node.js 18 or newer
- A MongoDB database, either local or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- An [OpenAI API key](https://platform.openai.com/api-keys)

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd gptClone
```

### 2. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```
PORT=8080
MONGODB_URL=your-mongodb-connection-string
OPENAI_API_KEY=your-openai-api-key
JWT_SECRET=any-long-random-string
```

Start the server:

```bash
npm start
```

You should see `Server is listening on port : 8080` and `MONGODB connected.`

### 3. Frontend

In a second terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env`. It should contain the backend URL only, **without** `/api` and **without** a trailing slash:

```
VITE_BACKEND_URL=http://localhost:8080
```

Start the dev server:

```bash
npm run dev
```

Open http://localhost:5173, create an account, and start chatting.

## API

All routes are prefixed with `/api`. Routes marked 🔒 need an `Authorization: Bearer <token>` header.

| Method | Route | Body | Description |
|---|---|---|---|
| POST | `/api/auth/register` | `{ username, email, password }` | Create an account and return `{ token, user }` |
| POST | `/api/auth/login` | `{ email, password }` | Log in and return `{ token, user }` |
| POST | `/api/chat` 🔒 | `{ threadId, message }` | Send a message and return `{ reply }`. Creates the thread if it's new |
| GET | `/api/allThreads` 🔒 | none | List the user's threads, newest first |
| GET | `/api/thread/:id` 🔒 | none | Get the messages of one thread |
| DELETE | `/api/thread/:id` 🔒 | none | Delete a thread |

## Deployment

The app is deployed on [Render](https://render.com) as two services:

- **Backend:** a Web Service with root directory `backend` and start command `npm start`. Set `MONGODB_URL`, `OPENAI_API_KEY` and `JWT_SECRET` in its environment settings.
- **Frontend:** a Static Site with root directory `frontend`, build command `npm install && npm run build` and publish directory `dist`. Set `VITE_BACKEND_URL` to the backend's URL, with no `/api` and no trailing slash.

Vite bakes `VITE_BACKEND_URL` into the build. After changing it, redeploy the frontend with **Clear build cache & deploy**.

If you use MongoDB Atlas, allow connections from Render's IPs under **Network Access**. `0.0.0.0/0` allows all IPs.

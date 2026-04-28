![Build](https://img.shields.io/github/actions/workflow/status/Sumitgiriyoeki/chat-app/ci.yml?branch=main&label=build&logo=github)
![Version](https://img.shields.io/github/package-json/v/Sumitgiriyoeki/chat-app?color=blue&label=version)
![License](https://img.shields.io/github/license/Sumitgiriyoeki/chat-app?color=green)

# 💬 Real-Time Chat Application (Next.js + .NET Core + SignalR)

A modern real-time chat application that supports instant messaging, typing indicators, and image sharing between users. Built with **Next.js** for the frontend and **ASP.NET Core with SignalR** for the backend.

---

## 🚀 Features

* ⚡ Real-time messaging (no refresh required)
* ✍️ Typing indicator ("User is typing...")
* 🖼️ Image upload and sharing
* 🔄 Automatic reconnection
* 👥 Two-user communication (1-to-1 chat)
* 💾 Optional message persistence (database ready)

---

## 🧠 Tech Stack

### Frontend

* Next.js
* React
* SignalR Client (`@microsoft/signalr`)

### Backend

* ASP.NET Core Web API
* SignalR (WebSockets)

### Optional

* SQL Server / MongoDB (for storing messages)
* Cloudinary / AWS S3 (for image storage)

---

## 📁 Project Structure

```
chat-app/
│
├── backend/              # .NET Core API + SignalR
│   ├── Hubs/
│   ├── Controllers/
│   └── Program.cs
│
├── frontend/             # Next.js App
│   ├── components/
│   ├── pages/
│   └── services/
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Sumitgiriyoeki/chat-app.git
cd chat-app
```

---

### 2️⃣ Run Backend (.NET Core)

```bash
cd backend
dotnet restore
dotnet run
```

Backend will run on:

```
http://localhost:5000
```

---

### 3️⃣ Run Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:3000
```

---

## 🔌 SignalR Endpoint

```
/chatHub
```

---

## 🧪 How It Works

* Users connect to SignalR Hub
* Messages are sent via WebSocket
* Server broadcasts messages instantly
* Typing events notify other users
* Images are uploaded and shared via URL

---

## 📸 Screenshots (Optional)

*Add screenshots of your UI here*

---

## 🔐 Future Improvements

* 🔑 Authentication (JWT / OAuth)
* 💬 Chat rooms / group chat
* 🟢 Online / offline status
* 📩 Message read receipts
* 📱 Mobile responsive UI
* 🔔 Push notifications

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork this repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Your Name
GitHub: https://github.com/Sumitgiriyoeki

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---

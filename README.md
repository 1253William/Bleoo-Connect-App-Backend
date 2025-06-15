# Bleoo-Connect-App-Backend
The official backend for the **Bleoo Connect App**, a platform that unites Accra Academy alumni for mentorship, networking, events, and professional opportunities.


Built with:
- Node.js + Express.js
- MongoDB (Mongoose)
- Socket.IO (Realtime Messaging)
- Authentication & Notifications

---

## 🚀 Features

- 🔐 User Authentication (Email, Google, Apple via Firebase)
- 📢 News Feed for updates, posts, and announcements
- 👥 Alumni Groups by year, interest, profession
- 💬 Real-time Chat (1-on-1 and Group Messaging)
- 📅 Event Management & Notifications
- 🧑‍🎓 Mentorship matchmaking
- 🎯 Business & Career Networking
- 🔔 Firebase Cloud Messaging (FCM) Push Notifications

---

## 🧱 Project Structure

src/
├── config # Database & Firebase setup
├── controllers # Route logic
├── middlewares # Auth, error, validation
├── models # Mongoose schemas
├── routes # Express routers
├── services # Business logic
├── sockets # Socket.IO events
├── utils # Helpers (tokens, FCM, etc)
└── app.js # Express instance

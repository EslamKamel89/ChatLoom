# 💬 ChatLoom – Real-Time Chat App Built with the VILT Stack

ChatLoom is a full-featured, real-time chat application built with the **VILT stack**:  
**Vue 3 + Inertia.js + Laravel 12 + Tailwind CSS**, using the official **Laravel VILT starter kit** and **Shadcn UI**.

It supports multiple chat rooms, online presence tracking, infinite scrolling, and real-time message updates powered by **Laravel Reverb**.

## 📖 LinkedIn Article

Want to learn more about how this project was built and the technologies behind it?

👉 **Read the full article on LinkedIn:**  
[🔗 ChatLoom – Real-Time Chat Application](https://www.linkedin.com/pulse/chatloom-real-time-chat-application-eslam-kamel-joqye/?trackingId=xN%2BtOa4AQhK9S0qII4saXA%3D%3D)

---

## 🚀 Tech Stack

| Technology | Usage |
|------------|--------|
| **Laravel 12** | Backend API and broadcasting |
| **Vue 3** | Frontend UI with Composition API & TypeScript |
| **Inertia.js** | Seamless frontend/backend integration |
| **Tailwind CSS** | Utility-first styling |
| **Shadcn UI** | Prebuilt component styling |
| **Laravel Reverb** | WebSocket-based real-time communication |
| **Pinia** | Global state management |
| **TypeScript** | Frontend type safety |

---

## ✨ Features

- 🔐 **Authentication** – Powered by Laravel Breeze & Shadcn UI
- 💬 **Multi-room Chat** – Join different chat rooms instantly
- ⚡ **Real-Time Messaging** – Updates messages across clients with Laravel Reverb
- 👥 **Presence Channels** – See who is online in each room
- 📜 **Infinite Scrolling** – Load older messages smoothly as you scroll
- ↵ **Multiline Input** – Use `Shift + Enter` to create multiline messages
- 🧠 **State Management** – Global state handled with Pinia
- 🧱 **Modern Stack** – Vue 3 + Composition API + TypeScript for maintainability

---


## 🔧 Setup Instructions

```bash
# Clone the repository
git clone https://github.com/EslamKamel89/ChatLoom.git
cd ChatLoom

# Install backend dependencies
composer install

# Install frontend dependencies
npm install

# Setup .env and DB
cp .env.example .env
php artisan key:generate
php artisan migrate

# Run Laravel server
php artisan serve

# Start Vite dev server
npm run dev

# Start Reverb server
php artisan reverb:start 



# 🚗 ParkFinder - Smart Parking Booking System

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-v20+-green)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)

A **Progressive Web App (PWA)** for finding and booking parking spots instantly. Built as a **Software Engineering Lab Project**.

---

## ✨ Features

* **User Authentication** (Register & Login)
* **Admin Dashboard** - Add & Manage Parking Locations
* **Smart Search** - Search parking by name, address or city
* **Real-time Slot Availability**
* **Instant Booking System** with validation
* **Responsive + Mobile-First Design**
* **Installable PWA** (Add to Home Screen on Phone)
* **Clean & Modern UI** with Tailwind CSS

---

## 🖼️ Screenshots

*(Add screenshots here after deployment)*

![Home Page](https://via.placeholder.com/800x400?text=Home+Page)
![Search Page](https://via.placeholder.com/800x400?text=Search+Parking)
![Booking Page](https://via.placeholder.com/800x400?text=Booking+Page)

---

## 🛠️ Tech Stack

| Layer          | Technology                      |
| -------------- | ------------------------------- |
| Frontend       | HTML5, Tailwind CSS, Vanilla JS |
| Backend        | Node.js + Express               |
| Database       | SQLite                          |
| Authentication | JWT + bcryptjs                  |
| PWA Support    | Service Worker + Web Manifest   |
| Deployment     | Vercel                          |

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Utsavraj26/parking-finder.git
cd parking-finder
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Locally

```bash
npm run dev
```

Open your browser and go to:

```text
http://localhost:3000
```

---

## 🔑 Default Credentials

### Admin Login

```text
Email: admin@parkfinder.com
Password: admin123
```

### Normal User

Register a new account.

---

## 📁 Project Structure

```bash
parking-finder/
├── public/                 # All frontend files (HTML, CSS, JS)
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── search.html
│   ├── booking.html
│   ├── admin/dashboard.html
│   ├── manifest.json
│   └── sw.js
├── database/               # SQLite Database
├── public/js/              # JavaScript files
├── server.js               # Backend Server
├── vercel.json
├── package.json
└── README.md
```

---

## 🎯 Main Pages

| Route                   | Description           |
| ----------------------- | --------------------- |
| `/`                     | Home / Landing Page   |
| `/login.html`           | Login                 |
| `/register.html`        | Register              |
| `/search.html`          | Search & Book Parking |
| `/booking.html`         | Complete Booking      |
| `/admin/dashboard.html` | Admin Panel           |

---

## 📋 Future Scope

* Integration with Google Maps API
* Real-time slot updates using WebSockets
* Payment Gateway (Razorpay / Stripe)
* Booking History & QR Code
* Email/SMS Notifications

---

## 📌 Deployment

**Live Demo:** ParkFinder on Vercel *(Update after deployment)*

Deployed using Vercel with PWA support.

---

## ❤️ Author

Made with ❤️ by **Utsav Raj**

**Software Engineering Lab Project | May 2026**

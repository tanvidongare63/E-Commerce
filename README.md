# 🛒 ShopX – Full-Stack E-Commerce Web Application

ShopX is a full-stack online store that replicates real-world e-commerce functionality including authentication, product management, cart system, and admin dashboard.

---

## ✨ Features

### 👤 User Features

* 🔐 JWT Authentication (Register / Login)
* 🛍️ Product listing with search & filters
* 📄 Product details page
* 🛒 Cart with localStorage persistence
* 💳 Checkout system
* 📦 Order history tracking

### 🛠️ Admin Features

* 📊 Admin dashboard
* ➕ Add / ✏️ Edit / ❌ Delete products
* 📦 Manage all orders
* 🔐 Role-based access control (USER / ADMIN)

---

## 🏗️ Tech Stack

### 🌐 Frontend

* React (Vite)
* React Router
* Framer Motion

### 🖥️ Backend

* Node.js
* Express.js
* Prisma ORM

### 🗄️ Database

* MySQL

---

## ⚙️ Project Setup

### 1️⃣ Backend Setup

```bash
cd server
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
```

### 🔑 Default Admin Credentials

* Email: [admin@store.com](mailto:admin@store.com)
* Password: Admin123!

---

### 2️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🌐 Local Development URLs

* Frontend → http://localhost:5173
* Backend → http://localhost:5000

---

## 📡 API Overview

### 🔐 Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`
* GET `/api/auth/me`

### 🛍️ Products

* GET `/api/products`
* GET `/api/products/:id`
* Admin CRUD → `/api/products`

### 📦 Orders

* POST `/api/orders/checkout`
* GET `/api/orders/my`
* Admin → GET `/api/orders`

---

## 💳 Payment Integration (Optional)

You can integrate:

* Stripe
* Razorpay

👉 Add payment step before calling:

```
POST /api/orders/checkout
```

---


---

## 🎯 Learning Outcomes

* Full-stack development (Frontend + Backend)
* REST API design and integration
* Authentication & Authorization (JWT)
* Database management using Prisma ORM
* Real-world application architecture

---

## 🚀 Future Enhancements

* 💳 Complete payment gateway integration
* 📱 Fully responsive UI
* 🔔 Notifications system
* ❤️ Wishlist feature

---

## 👩‍💻 Author

**Tanvi Dongare**
GitHub: https://github.com/tanvidongare63

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

# 🛍️ Xonexa - Modern Hybrid E-commerce Platform

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://xonexa-client.vercel.app/)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%20&%20MongoDB-blue.svg)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### 📑 Project Documentation
Detailed technical analysis and system design are available in the full report.

[👉 View Full Project Report (PDF)](./Xonexa_Report.pdf)
**Xonexa** is a robust full-stack e-commerce solution featuring a **Hybrid Data Architecture**. It utilizes MongoDB for flexible product catalogs and PostgreSQL (via Supabase) for mission-critical transactional data like user profiles, orders, and shopping carts.

---

## 📍 Quick Navigation
| [Live Demo](#-live-demo-links) | [Features](#-key-features) | [Tech Stack](#-tech-stack) | [DB Setup (SQL)](#-database-schema-setup-postgresql) | [Env Config](#-environment-variables-setup) | [Installation](#-installation--setup-guide) |
| :--- | :--- | :--- | :--- | :--- | :--- |

---

## 🌐 Live Demo Links
Access the application instantly:
- **Application Live:** [https://xonexa-client.vercel.app/](https://xonexa-client.vercel.app/)

---

## 🚀 Key Features

### 👤 User Experience
- **Hybrid Database:** MongoDB for Product Schema & PostgreSQL for User/Order management.
- **Media Management:** Automatic image optimization and hosting via **Cloudinary** & **Multer**.
- **Product Architecture:** Support for inventory tracking, multi-size stock (S, M, L, XL), and discount logic.
- **Auth:** Secure JWT-based Login and Google One-Tap Sign-In.
- **UI/UX:** Seamless animations and transitions powered by **Framer Motion**.

### 🛠️ Admin Features
- **Analytics:** Real-time dashboard for Total Sales, Orders, and Products with growth percentage.
- **Inventory:** Full CRUD for products with Cloudinary image hosting.
- **User Control:** Monitor registered users and manage order delivery statuses.

---

## 🛠️ Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Framer Motion.
- **Backend:** Node.js, Express.js.
- **Databases:** PostgreSQL (Supabase) & MongoDB (Mongoose).
- **Cloud Services:** Cloudinary (Image Hosting).

---

## 🗄️ Database Schema Setup (PostgreSQL)

Run this script in your **Supabase SQL Editor** to create the relational structure:

```sql
-- 1. Create Users Table
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    email VARCHAR UNIQUE NOT NULL,
    password_hash VARCHAR,
    authprovider VARCHAR,
    full_name VARCHAR NOT NULL,
    role VARCHAR DEFAULT 'user'
);

-- 2. Create Orders Table
CREATE TABLE orders (
    order_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id BIGINT REFERENCES users(user_id),
    total FLOAT8 NOT NULL,
    email VARCHAR,
    address TEXT,
    city VARCHAR,
    zip VARCHAR,
    card_number VARCHAR,
    cvv VARCHAR,
    exp_date VARCHAR,
    status VARCHAR DEFAULT 'pending'
);

-- 3. Create Order Items Table
CREATE TABLE order_items (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id BIGINT REFERENCES users(user_id),
    quantity BIGINT DEFAULT 1,
    size VARCHAR,
    price FLOAT8,
    product_id VARCHAR NOT NULL
);

-- 4. Create Shopping Cart Table
CREATE TABLE shopping_cart (
    cart_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    user_id BIGINT REFERENCES users(user_id),
    product_id VARCHAR NOT NULL,
    name VARCHAR,
    price FLOAT8,
    quantity BIGINT DEFAULT 1,
    size VARCHAR,
    image VARCHAR,
    discount FLOAT8,
    stock BIGINT
);

-- 5. Create Wishlist Table
CREATE TABLE wishlist (
    wishlist_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id BIGINT REFERENCES users(user_id),
    product_id VARCHAR NOT NULL,
    product_name VARCHAR,
    image VARCHAR,
    price FLOAT8
);
```
# 🔐 Environment Variables Setup

## 📂 Server (.env)

Create a `.env` file in the server root directory:

```env
PORT=5000

# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string

# Supabase / PostgreSQL Configuration
SUPABASE_DATABASE_URL_DIRECT=your_supabase_postgresql_direct_url

# Security
JWT_SECRET=your_secret_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 📂 Client (.env)

Create a `.env` file in the client root directory:

```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_auth_id
```

---

# 💻 Installation & Setup Guide

## 1️⃣ Clone the Repositories

```bash
# Create a folder for the project
mkdir xonexa-project
cd xonexa-project

# Clone Frontend Repository
git clone  https://github.com/MehadiWirtesCode/xonexa-client

# Clone Backend Repository
git clone  https://github.com/MehadiWirtesCode/xonexa-server
```

---

## 2️⃣ Backend Initialization

```bash
cd server
npm install

# Configure your .env file before running the server
npm start
```

---

## 3️⃣ Frontend Initialization

```bash
cd ../client
npm install
npm run dev
```

---

# 📊 System Architecture

```txt
The system architecture is designed for scalability and performance.

• MongoDB
  - Handles the Product Catalog
  - Supports flexible schema (sizes, image arrays, metadata)

• PostgreSQL (Supabase)
  - Used for Users, Orders, and Carts
  - Ensures strong relational data integrity

• Cloudinary
  - Handles image storage
  - Improves performance using CDN
  - Reduces server load
```

---

# 📑 Project Report & Documentation

```txt
• Full Project Report (PDF)
  - https://github.com/MehadiWritesCode/xonexa-client/blob/main/Xonexa_Report.pdf
```

---
---

## 📄 License
This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for more details.
# ❤️ Credits

```txt
Made with ❤️ by Md.Mehadi Hasan
```

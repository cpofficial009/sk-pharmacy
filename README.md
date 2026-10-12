# 💊 SK Pharmacy - Modern Online Medicine Shop (MERN Stack)

A complete, professional, modern **Online Medicine & Healthcare E-Commerce Application** built as a full-stack college project using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).

Designed with a clean, clinical medical UI theme (teal/cyan `#0d9488`, ocean blue `#0284c7`, and crisp white), featuring comprehensive customer shopping and order tracking workflows along with a dedicated, protected **Admin Management Dashboard**.

---

## 🌟 Key Features

### 👤 Customer / User Side
- **Home Page**: Hero section with quick medicine search, emergency 24/7 hotline banner, healthcare category highlights, doctor-recommended featured medicines, and customer trust badges.
- **Medicines & Catalog**:
  - Live keyword search across medicine name, brand, indication, and description.
  - Interactive category filtering with real-time product counts.
  - Custom price range filtering (`Min` & `Max`).
  - In-stock availability filter.
  - Multi-criteria sorting (Newest, Price: Low to High, Price: High to Low, Highest Rated, A-Z).
  - Clean pagination.
- **Medicine Details**:
  - High-resolution formulation preview with discount badges.
  - Dosage format, manufacturer details, and expiry date.
  - Indications, directions for use, and medical safety disclaimers.
  - Prescription requirement tag (`Rx Required`).
  - Interactive quantity stepper bounded by inventory stock limits.
  - Instant *Add to Cart* and *Buy Now* functionality.
- **Shopping Cart**:
  - Persistent cart state saved in `localStorage`.
  - Item addition, removal, and quantity increments/decrements with real-time stock protection.
  - Free delivery threshold tracker (Free shipping above ₹500).
  - Automatic 5% healthcare GST and total calculation.
- **Checkout & Order Placement**:
  - Full delivery address form (Recipient name, contact phone, street, city, state, PIN code).
  - Payment method selection: Cash on Delivery (COD), UPI / Instant Online Transfer, Credit/Debit card.
  - Instant stock deduction and order generation.
- **My Orders & Order Tracking**:
  - Order history with status tags and thumbnail previews.
  - Interactive **Visual Progress Tracker** (`Pending` ➔ `Confirmed` ➔ `Processing` ➔ `Shipped` ➔ `Delivered`).
  - Itemized pricing breakdown and delivery invoice summary.
- **Profile & Account**:
  - Update full name, phone number, and default delivery address.
  - Secure password change functionality.
- **About & Contact**:
  - Company overview, licensing details, and operational metrics.
  - Working inquiry form, 24/7 helpline cards, and FAQ accordion.

### 🛡️ Admin Management Panel
- **Admin Dashboard**:
  - Key operational metrics: Total Revenue (₹), Total Orders, Medicines in Catalog, Registered Users.
  - Order status distribution cards (Pending, Confirmed, Processing, Shipped, Delivered, Cancelled).
  - Real-time **Low Stock Inventory Alerts** (highlighting products with $\le$ 10 units).
  - Recent orders quick-view table.
- **Medicine Inventory Management**:
  - Comprehensive listing with search and status tags.
  - **Add Medicine**: Form with validation for name, brand, category, description, price, discount, stock, image URL, manufacturer, dosage, usage, and expiry date.
  - **Edit Medicine**: Pre-filled update screen for rapid catalog updates.
  - **Delete Medicine**: With safety confirmation modal.
- **Order Management**:
  - View all customer orders with customer details.
  - Filter by status (`Pending`, `Confirmed`, `Processing`, `Shipped`, `Delivered`, `Cancelled`).
  - Instant fulfillment status updates.
  - Stock auto-rollback if an order is cancelled!
- **Category Management**:
  - View categories with associated product counts.
  - Create new medical categories.
  - Delete categories with confirmation dialog.
- **User Account Management**:
  - List of registered users with role badges.
  - Promote users to Admin or demote to Customer.
  - Safe user removal (prevents self-deletion).

---

## 🏗️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 18, React Router v6, Axios, Lucide React (Medical Icons), CSS3 Variables |
| **Tooling & Build** | Vite (Fast HMR & Optimized Production Bundler) |
| **Backend API** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Security & Auth** | JSON Web Tokens (JWT), bcryptjs password hashing, Role-based Route Protection |
| **Architecture** | RESTful API, MVC Architecture (Models, Controllers, Routes, Middleware) |

---

## 📁 Project Architecture & Folder Structure

```
sk pharmacy/
├── package.json               # Root scripts runner
├── README.md                  # Complete documentation & college viva guide
│
├── server/                    # Backend API (Node.js + Express + MongoDB)
│   ├── config/
│   │   └── db.js              # MongoDB Mongoose connection
│   ├── controllers/
│   │   ├── authController.js       # Register, Login, Profile update
│   │   ├── productController.js    # CRUD, Search, Filter, Sort, Pagination
│   │   ├── categoryController.js   # Category management & medicine counts
│   │   ├── orderController.js      # Order placement, inventory sync, statuses
│   │   └── userController.js       # User management & Admin dashboard stats
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT verification & admin guard
│   │   └── errorMiddleware.js      # 404 & Centralized Error Handler
│   ├── models/
│   │   ├── User.js            # User Schema with bcrypt hooks
│   │   ├── Product.js         # Medicine Schema with virtuals & stock validation
│   │   ├── Category.js        # Category Schema
│   │   └── Order.js           # Order Schema with delivery address & items
│   ├── routes/
│   │   ├── authRoutes.js      # /api/auth
│   │   ├── productRoutes.js   # /api/products
│   │   ├── categoryRoutes.js  # /api/categories
│   │   ├── orderRoutes.js     # /api/orders
│   │   └── userRoutes.js      # /api/users
│   ├── seeder/
│   │   └── seeder.js          # Database Seeder (Admin, User, 16+ Medicines, Orders)
│   ├── .env                   # Environment Variables
│   ├── .env.example           # Example Environment Template
│   ├── package.json           # Server Dependencies
│   └── server.js              # Express Entry Point
│
└── client/                    # Frontend SPA (React.js + Vite)
    ├── public/                # Static public assets
    ├── src/
    │   ├── components/        # Reusable UI Components
    │   │   ├── CustomerLayout.jsx  # Main storefront layout wrapper
    │   │   ├── TopHeader.jsx       # Header bar with search, quick actions & cart
    │   │   ├── Sidebar.jsx         # Navigation drawer for storefront
    │   │   ├── AdminLayout.jsx     # Administrative dashboard wrapper
    │   │   ├── AdminHeader.jsx     # Admin top bar with user profile & alerts
    │   │   ├── AdminSidebar.jsx    # Admin navigation drawer
    │   │   ├── Footer.jsx          # Clinical footer with assurance badges
    │   │   ├── ProductCard.jsx     # Medicine card with stock, dosage & add-to-cart
    │   │   ├── ProtectedRoute.jsx  # Customer authentication guard
    │   │   ├── AdminRoute.jsx      # Administrator route guard
    │   │   ├── Loader.jsx          # Medical spinner
    │   │   ├── Message.jsx         # Status banner alerts
    │   │   ├── Toast.jsx           # Animated floating notifications
    │   │   ├── Rating.jsx          # Star rating display
    │   │   └── ConfirmModal.jsx    # Deletion safety confirmation
    │   ├── context/
    │   │   ├── AuthContext.jsx     # Global JWT authentication state
    │   │   └── CartContext.jsx     # Persistent cart state & calculations
    │   ├── pages/             # Application Pages
    │   │   ├── HomePage.jsx        # Landing page with hero & featured items
    │   │   ├── LoginPage.jsx       # Login / authentication
    │   │   ├── RegisterPage.jsx    # Registration with Customer/Admin roles
    │   │   ├── ProductsPage.jsx    # Catalog with filters, search & sort
    │   │   ├── ProductDetailPage.jsx# Single medicine view & dosage specs
    │   │   ├── CartPage.jsx        # Cart management & free delivery meter
    │   │   ├── CheckoutPage.jsx    # Shipping address & payment options
    │   │   ├── MyOrdersPage.jsx    # Customer order history
    │   │   ├── OrderDetailPage.jsx # Visual timeline progress tracker
    │   │   ├── AccountPage.jsx     # Customer account update & password reset
    │   │   ├── AboutPage.jsx       # Pharmacy overview & project details
    │   │   ├── ContactPage.jsx     # Helpline, inquiry form, FAQs
    │   │   ├── NotFoundPage.jsx    # 404 handler
    │   │   └── admin/              # Admin Module Pages
    │   │       ├── AdminDashboardPage.jsx    # Analytics & low stock alerts
    │   │       ├── AdminProductsPage.jsx     # Medicine inventory table
    │   │       ├── AdminProductAddPage.jsx   # Create medicine
    │   │       ├── AdminProductEditPage.jsx  # Modify medicine
    │   │       ├── AdminOrdersPage.jsx       # Customer orders manager
    │   │       ├── AdminOrderDetailPage.jsx  # Order dispatch & payment update
    │   │       ├── AdminCategoriesPage.jsx   # Category manager
    │   │       └── AdminUsersPage.jsx        # User account manager
    │   ├── services/
    │   │   └── api.js              # Axios with JWT interceptor
    │   ├── App.jsx            # Router switch configuration
    │   ├── index.css          # Global styling & medical theme variables
    │   └── main.jsx           # React DOM bootstrap
    ├── index.html             # HTML5 template with Google fonts
    ├── package.json           # Client Dependencies
    └── vite.config.js         # Vite configuration with API proxy
```

---

## ⚡ Quick Start & Setup Guide

### 1. Prerequisites
- **Node.js**: v18 or higher (tested on Node v24)
- **MongoDB**: Local MongoDB Server running on port `27017` or MongoDB Atlas URI

### 2. Environment Configuration
The backend configuration is located in `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/sk_pharmacy
JWT_SECRET=sk_pharmacy_jwt_secret_key_2026_super_secure
NODE_ENV=development
```

### 3. Seed the Database
To populate the database with categories, medicines (Paracetamol, Amoxicillin, Cetirizine, Metformin, etc.), admin and user credentials:
```bash
# From the project root:
npm run seed

# OR directly inside the server directory:
cd server
npm run seed
```

### 4. Running the Project

#### Terminal 1 — Start Backend Server:
```bash
cd server
npm run dev
# Server will run on: http://localhost:5000
```

#### Terminal 2 — Start Frontend Client:
```bash
cd client
npm run dev
# Frontend will run on: http://localhost:3000
```

---

## 🌐 API Route Specifications

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new account
- `POST /api/auth/login` — Login & receive JWT token
- `GET /api/auth/profile` — (Private) Get authenticated user profile
- `PUT /api/auth/profile` — (Private) Update profile and password

### Medicines (`/api/products`)
- `GET /api/products` — Get products (supports `search`, `category`, `minPrice`, `maxPrice`, `inStock`, `sort`, `page`, `limit`)
- `GET /api/products/featured` — Get top doctor-recommended medicines
- `GET /api/products/:id` — Get single medicine details
- `POST /api/products` — (Admin) Create a new medicine
- `PUT /api/products/:id` — (Admin) Update medicine information
- `DELETE /api/products/:id` — (Admin) Delete a medicine

### Categories (`/api/categories`)
- `GET /api/categories` — Get all categories with medicine counts
- `POST /api/categories` — (Admin) Create category
- `DELETE /api/categories/:id` — (Admin) Delete category

### Orders (`/api/orders`)
- `POST /api/orders` — (Private) Place a new order with stock deduction
- `GET /api/orders/myorders` — (Private) Get customer's order history
- `GET /api/orders/:id` — (Private) Get order by ID
- `GET /api/orders` — (Admin) Get all customer orders
- `PUT /api/orders/:id/status` — (Admin) Update order fulfillment & payment status

### Users & Dashboard (`/api/users`)
- `GET /api/users/dashboard/stats` — (Admin) Analytics, sales, low stock alerts
- `GET /api/users` — (Admin) List all registered users
- `PUT /api/users/:id/role` — (Admin) Update user role (Admin / Customer)
- `DELETE /api/users/:id` — (Admin) Delete a user

---

## 🎓 College Viva & Presentation Highlights

When demonstrating this project to professors and external examiners:
1. **Explain the Separation of Concerns**: Explain how the MVC pattern in Express (`models/`, `controllers/`, `routes/`, `middleware/`) cleanly decouples database queries from route handlers.
2. **Demonstrate Role-Based Security**: Show how unauthorized access to `/admin` is intercepted both on the client side via `<AdminRoute>` and on the backend via the `protect` and `admin` middlewares.
3. **Showcase Stock Inventory Management**: Add 5 units of a medicine to cart, place the order, and show how the inventory updates in real time on the Admin Products table.
4. **Highlight Order Tracking UX**: Show the visual order tracker changing dynamically as the Admin updates the status from `Pending` to `Delivered`.
5. **Demonstrate Responsive Design**: Open DevTools in tablet and mobile view to show the hamburger navigation, filter drawer, and mobile card layouts.

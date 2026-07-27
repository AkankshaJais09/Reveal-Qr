# RevealQR — Privacy-First Logistics Platform

> Secure shipping labels powered by dynamic QR codes that reveal customer information only to authorized personnel at the correct delivery stage.

![RevealQR Banner](./public/logo.png)

---

## 🔐 What is RevealQR?

Traditional shipping labels print customer names, phone numbers, and addresses for everyone to see. RevealQR replaces them with dynamic QR codes that:

- **Hide** customer data from warehouse staff and sorting hubs
- **Reveal** only routing info to hub operators
- **Unlock** full address and contact details only for the assigned delivery partner
- **Expire** the QR permanently after delivery is confirmed

---

## 🚀 Live Demo

- **Frontend:** [revealqr.vercel.app](https://revealqr.vercel.app)
- **Backend API:** [revealqr-api.render.com](https://revealqr-api.render.com)

---

## 🧠 Core Features

| Feature | Description |
|---|---|
| 🔒 Dynamic QR Labels | Each shipment gets a unique QR token |
| 👥 Role-Based Access | Admin, Warehouse, Hub, Delivery roles |
| 📍 Progressive Reveal | City → Area → Full Address as rider approaches |
| 🧾 Audit Logs | Every QR scan is logged with role and timestamp |
| ⏱️ Auto Expiry | QR becomes invalid after delivery is confirmed |
| 🛡️ JWT Auth | Secure login with role-based route protection |

---

## 🏗️ Tech Stack

### Frontend
- React.js + Vite
- Tailwind CSS v4
- React Router DOM
- Axios
- Lucide React
- react-qr-code
- html5-qrcode

### Backend
- Node.js + Express.js
- MongoDB Atlas + Mongoose
- JWT Authentication
- bcryptjs
- Role-Based Access Control (RBAC)

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## 📁 Project Structure

RevealQR/
├── frontend/
│ └── src/
│ ├── components/ # Navbar, Hero, Problem, Workflow, CTA
│ ├── context/ # AuthContext
│ ├── pages/
│ │ ├── admin/ # AdminDashboard, ManageShipments, ManageUsers, AuditLogs
│ │ ├── warehouse/ # WarehouseDashboard
│ │ ├── hub/ # HubDashboard
│ │ ├── delivery/ # DeliveryDashboard
│ │ └── scan/ # Scan, ScanResult
│ ├── routes/ # AppRoutes, ProtectedRoute
│ └── services/ # api.js
│
└── backend/
└── src/
├── controllers/ # auth, shipment, qr
├── middleware/ # auth, role
├── models/ # User, Shipment, AuditLog
└── routes/ # auth, shipment, qr, audit


---

## 🔄 How It Works
Admin creates shipment → QR token generated
Package moves: Warehouse → Hub → Delivery
Each role scans QR → sees only allowed data
Delivery partner gets progressive reveal:
City → Area → Full Address
Delivery confirmed → QR expires permanently

---

## 👤 Role-Based Access

| Role | Can See |
|---|---|
| **Admin** | Everything |
| **Warehouse** | Package ID, Order ID, Weight |
| **Hub Operator** | Package ID, Route, Weight |
| **Delivery Partner** | Customer Name, Phone, Full Address |
| **After Delivery** | QR Expired — all data wiped |

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- npm

### Backend
```bash
cd backend
npm install
# Create .env file:
# PORT=5000
# MONGO_URI=your_mongodb_uri
# JWT_SECRET=your_secret_key
# FRONTEND_URL=http://localhost:5173
npm run dev
```

### Frontend
```bash
cd frontend
npm install
# Create .env file:
# VITE_API_URL=http://localhost:5000/api
npm run dev
```

### Create Admin User
```bash
POST http://localhost:5000/api/auth/register
{
  "name": "Admin",
  "email": "admin@revealqr.com",
  "password": "admin123",
  "role": "admin"
}
```

---

## 🌐 API Endpoints

### Auth

POST /api/auth/register — Create user
POST /api/auth/login — Login + get JWT
GET /api/auth/me — Get current user
GET /api/auth/users — Get all users (admin only)


### Shipments

GET /api/shipments — Get all (role-filtered)
GET /api/shipments/:id — Get one (role-filtered)
POST /api/shipments — Create (admin only)
PATCH /api/shipments/:id/stage — Update stage


### QR

GET /api/qr/validate/:token — Validate QR + return role-filtered data
PATCH /api/qr/substage/:id — Update progressive reveal stage
GET /api/qr/track/:trackingNumber — Lookup by tracking number


### Audit

GET /api/audit — All scan logs (admin only)


---

## 📸 Screenshots

| Page | Description |
|---|---|
| Home | Landing page with hero, problem, workflow sections |
| Login | Role-based login with 4 role options |
| Admin Dashboard | Full shipment management |
| Warehouse Dashboard | Package IDs only — customer data hidden |
| Delivery Dashboard | Customer info visible for assigned packages |
| Scan Result | Progressive reveal — city → area → door |

---

## 🎓 About

Built as a **capstone project** at **Lovely Professional University**, Punjab, India.

**Developer:** Akanksha Jaiswal  
**GitHub:** [@AkankshaJais09](https://github.com/AkankshaJais09)  
**Email:** anjyo0922@gmail.com

---

## 📄 License

MIT License — open source, free to use.

---

⭐ If you found this useful, please star the repo!
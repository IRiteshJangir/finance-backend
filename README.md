Finance Backend API

#🚀 Features:
User Authentication (JWT)
Role-based Access Control (Admin, Analyst, Viewer)
Financial Records CRUD
Dashboard Analytics (summary, category, monthly)
Filtering & Pagination
🛠️ Tech Stack:
Node.js
Express.js
MongoDB
JWT Authentication
#⚙️ Setup Instructions
git clone <repo>
cd finance-backend
npm install
npm run dev
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
📡 API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login
Records
GET /api/records
POST /api/records
PATCH /api/records/:id
DELETE /api/records/:id
Dashboard
GET /api/dashboard/summary
GET /api/dashboard/categories
GET /api/dashboard/monthly

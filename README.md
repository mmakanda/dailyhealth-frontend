# Daily Health Pharmacy — Next.js Frontend

A full Next.js 16 frontend connected to your FastAPI backend.

## Project Structure

```
app/
├── lib/
│   └── api.ts          ← All backend calls (products, chat, auth, orders)
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── WhatsAppFloat.tsx
├── page.tsx            ← Home (/)
├── products/
│   └── page.tsx        ← Products (/products) — fetches from GET /products/
├── chat/
│   └── page.tsx        ← AI Chat (/chat) — calls POST /chat/
├── contact/
│   └── page.tsx        ← Contact (/contact)
├── layout.tsx
└── globals.css
.env.local              ← Set NEXT_PUBLIC_API_URL here
```

## Setup

```bash
cd pharmacy-frontend

# Install dependencies (already in package.json)
npm install

# Configure backend URL
# Edit .env.local:
NEXT_PUBLIC_API_URL=http://localhost:8000

# Run dev server
npm run dev
```

Then visit http://localhost:3000

## Backend must be running

Start your FastAPI backend first:
```bash
cd pharmacy-backend
uvicorn app.main:app --reload
```

## Key API connections

| Page      | Backend endpoint    | Method |
|-----------|---------------------|--------|
| Products  | `/products/`        | GET    |
| Chat      | `/chat/`            | POST   |
| Auth      | `/auth/login`       | POST   |
| Auth      | `/auth/register`    | POST   |

## Deploying

Set `NEXT_PUBLIC_API_URL` to your Railway/Render backend URL in your
hosting platform's environment variables.

Example for Railway:
```
NEXT_PUBLIC_API_URL=https://pharmacy-backend-production.up.railway.app
```
# dailyhealth-frontend

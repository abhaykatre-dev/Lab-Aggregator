# Lab Aggregator

A full-stack web app to search for lab tests by name and pincode, and compare prices across providers — sorted by the true lowest price (offer price + home collection fee).

## Live Links

- **Frontend**: https://lab-aggregator-bice.vercel.app/
- **Backend API**: https://lab-aggregator-backend.onrender.com/


## Tech Stack

- **Frontend** — React, Vite, CSS Modules
- **Backend** — Node.js, Express, Nodemon
- **Icons** — React Icons
- **Data** — JSON mock database


## Project Structure

```
Lab Aggregator/
├── backend/
│   ├── data/db.json          # mock database
│   ├── routes/search.js      # search API logic
│   ├── server.js             # express server
│   ├── .env.example
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar/
    │   │   ├── SearchBar/
    │   │   ├── ResultCard/
    │   │   ├── EmptyState/
    │   │   └── Footer/
    │   ├── pages/
    │   │   └── Home/
    │   ├── App.jsx
    │   └── index.css
    ├── .env.example
    └── .env
```

---

## Environment Variables

### Backend (`backend/.env.example`)
```env
PORT=5000
```

### Frontend (`frontend/.env.example`)
```env
VITE_API_BASE_URL=http://localhost:5000
```

---

## How to Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

Runs on `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`


## API

GET /api/search?search_query=Lipid Profile&pincode=110001

**Logic:**
1. Filters by pincode
2. Matches test name OR included_tests inside packages
3. Sorts by offer_price + home_collection_fee (lowest first)


## Search Examples

| Test | Pincode | Results |
|------|---------|---------|
| Lipid Profile | 110001 | 4 (2 tests + 2 packages) |
| MRI Brain | 560034 | 1 |
| HbA1c | 110001 | 2 packages |
| Lipid Profile | 999999 | 0 (pincode not served) |


## Anti-Scraping Architecture

To scrape competitor prices without getting blocked, I'd use a pool of headless browsers (Playwright) running inside cloud containers, each routed through rotating residential proxies so no single IP sends too many requests. Each scraper job would mimic real user behavior — randomized delays, realistic mouse paths, and browser fingerprints patched via stealth plugins to bypass Cloudflare or similar bot protection. Jobs would be queued through a task queue (BullMQ + Redis) with exponential backoff on 429/403 errors and automatic proxy rotation on failure. Results get cached with a TTL so the scraper doesn't need to hit every URL on every request — reducing overall scraping frequency and detection risk.



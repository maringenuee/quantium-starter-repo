# Quantium starter repo
This repo contains everything you need to get started on the program! Good luck!

## Verbario — Spanish/French verb drills

A comparative language-learning app: side-by-side Spanish/French present-tense
verb conjugation drills.

- `backend/` — Flask API serving verb data and drill questions/answers
- `frontend/` — React (Vite) app with a Drill view and a Compare view

### Run it

```bash
# backend (http://localhost:5001)
cd backend
pip install -r requirements.txt
python3 app.py

# frontend (http://localhost:5173, proxies /api to the backend)
cd frontend
npm install
npm run dev
```

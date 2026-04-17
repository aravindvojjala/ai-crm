# 🚀 AI-First CRM System

An intelligent CRM system powered by AI agents that helps pharma/sales teams log interactions, get insights, and automate follow-ups.

---

## 📌 Features

* 🤖 AI-powered interaction logging
* 🧠 Automatic extraction of structured data (Doctor, Product, Notes, Sentiment, Date)
* ⚡ Auto-fill form using natural language input
* 📊 View recent interactions
* 📈 AI-based follow-up suggestions
* 📝 Professional visit summaries
* 🔄 Edit interaction (extendable)
* 🌐 FastAPI backend + React frontend

---

## 🛠️ Tech Stack

**Backend**

* FastAPI
* LangGraph (AI Agent Flow)
* Groq LLM API
* SQLite

**Frontend**

* React.js
* HTML + CSS

---

## 📂 Project Structure

```
AI-First CRM/
│
├── backend/
│   ├── main.py
│   ├── agent.py
│   └── crm.db
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   └── public/
│       └── index.html
│
├── requirements.txt
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```
git clone <your-repo-link>
cd AI-First-CRM
```

---

### 2️⃣ Backend Setup

```
cd backend
pip install -r ../requirements.txt
```

Create `.env` file:

```
GROQ_API_KEY=your_api_key_here
```

Run backend:

```
uvicorn main:app --reload
```

👉 Backend runs at:
http://127.0.0.1:8000

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm start
```

👉 Frontend runs at:
http://localhost:3000

---

## ▶️ How to Use

### 🔹 Log Interaction (AI Mode)

Type in assistant:

```
Met Dr Sharma, discussed insulin, positive response
```

✅ Automatically:

* Extracts structured data
* Stores in database
* Auto-fills form

---

### 🔹 Get History

```
Show my last interactions
```

---

### 🔹 Get Follow-up Suggestion

```
What should I do next?
```

---

### 🔹 Generate Summary

```
Summarize my last visit professionally
```

---

## 🧠 How It Works

* LangGraph routes user input to the correct tool
* LLM decides:

  * log_interaction
  * get_history
  * suggest_followup
  * summarize
* Structured data is extracted using AI
* Stored in SQLite DB
* Returned to frontend for UI auto-fill

---

## 📡 API Endpoints

### POST `/chat`

Main AI endpoint

Request:

```
{
  "message": "Met Dr Sharma, discussed insulin, positive response"
}
```

Response:

```
{
  "output": "Logged interaction for Dr Sharma",
  "data": {
    "doctor_name": "Dr Sharma",
    "product": "Insulin",
    "notes": "Discussed insulin",
    "sentiment": "positive",
    "date": "2026-04-17"
  }
}
```

---

### GET `/interactions`

Fetch all interactions

---

### POST `/log-interaction`

Manual logging

---

### PUT `/edit-interaction/{id}`

Edit existing interaction

---

## 🧪 Testing

* Use FastAPI Swagger:
  http://127.0.0.1:8000/docs

* Test chat with:

  * Logging
  * History
  * Follow-up
  * Summary

---

## ⚠️ Notes

* Ensure backend is running before frontend
* API key must be valid
* CORS is enabled for localhost:3000

---

## 🎯 Future Improvements

* UI enhancement (dashboard view)
* Authentication system
* Deployment (Render / Railway)
* Real-time notifications
* Advanced analytics

---

## 👨‍💻 Author

Built as part of AI Agent + Full Stack project.

---
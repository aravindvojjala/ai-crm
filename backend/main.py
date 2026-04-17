from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import sqlite3
from backend.agent import run_agent
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000",
                   "http://127.0.0.1:3000"],  # important
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# DB setup
conn = sqlite3.connect("crm.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS interactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctor_name TEXT,
    product TEXT,
    notes TEXT,
    sentiment TEXT,
    date TEXT
)
""")
conn.commit()


# Request schemas
class Interaction(BaseModel):
    doctor_name: str
    product: str
    notes: str
    sentiment: str
    date: str


class ChatInput(BaseModel):
    message: str


# APIs

@app.post("/log-interaction")
def log_interaction(data: Interaction):
    cursor.execute("""
        INSERT INTO interactions (doctor_name, product, notes, sentiment, date)
        VALUES (?, ?, ?, ?, ?)
    """, (data.doctor_name, data.product, data.notes, data.sentiment, data.date))
    conn.commit()
    return {"message": "Interaction logged successfully"}


@app.get("/interactions")
def get_interactions():
    cursor.execute("SELECT * FROM interactions")
    rows = cursor.fetchall()
    return {"data": rows}


@app.put("/edit-interaction/{id}")
def edit_interaction(id: int, data: Interaction):
    cursor.execute("""
        UPDATE interactions
        SET doctor_name=?, product=?, notes=?, sentiment=?, date=?
        WHERE id=?
    """, (data.doctor_name, data.product, data.notes, data.sentiment, data.date, id))
    conn.commit()
    return {"message": "Updated successfully"}

@app.post("/chat")
def chat(input: ChatInput):
    result = run_agent(input.message)
    return result
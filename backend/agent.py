# from langgraph.graph import StateGraph
# from typing import TypedDict
# from groq import Groq
# import sqlite3
# import json
# from dotenv import load_dotenv
# load_dotenv()
#
# client = Groq(api_key="YOUR_GROQ_API_KEY")
#
# conn = sqlite3.connect("crm.db", check_same_thread=False)
# cursor = conn.cursor()
#
#
# # State
# class AgentState(TypedDict):
#     user_input: str
#     output: str
#
#
# # 🔧 TOOL 1: Log Interaction
# def log_interaction_tool(state: AgentState):
#     prompt = f"""
#     Extract structured data from:
#     {state['user_input']}
#
#     Return JSON:
#     doctor_name, product, notes, sentiment, date
#     """
#
#     res = client.chat.completions.create(
#         model="gemma2-9b-it",
#         messages=[{"role": "user", "content": prompt}]
#     )
#
#     data = res.choices[0].message.content
#
#     try:
#         parsed = json.loads(data)
#     except:
#         return {"output": "Error parsing data"}
#
#     cursor.execute("""
#         INSERT INTO interactions (doctor_name, product, notes, sentiment, date)
#         VALUES (?, ?, ?, ?, ?)
#     """, (
#         parsed.get("doctor_name"),
#         parsed.get("product"),
#         parsed.get("notes"),
#         parsed.get("sentiment"),
#         parsed.get("date")
#     ))
#     conn.commit()
#
#     return {"output": "Interaction logged via AI"}
#
#
# # 🔧 TOOL 2: Get History
# def get_history_tool(state: AgentState):
#     cursor.execute("SELECT * FROM interactions")
#     data = cursor.fetchall()
#     return {"output": str(data)}
#
#
# # 🔧 TOOL 3: Suggest Follow-up
# def followup_tool(state: AgentState):
#     prompt = f"Suggest follow-up action: {state['user_input']}"
#     res = client.chat.completions.create(
#         model="gemma2-9b-it",
#         messages=[{"role": "user", "content": prompt}]
#     )
#     return {"output": res.choices[0].message.content}
#
#
# # 🔧 TOOL 4: Summarize
# def summarize_tool(state: AgentState):
#     prompt = f"Summarize: {state['user_input']}"
#     res = client.chat.completions.create(
#         model="gemma2-9b-it",
#         messages=[{"role": "user", "content": prompt}]
#     )
#     return {"output": res.choices[0].message.content}
#
#
# # 🔧 TOOL 5: Edit (dummy for demo)
# def edit_tool(state: AgentState):
#     return {"output": "Edit functionality triggered (demo)"}
#
#
# # Router
# def router(state: AgentState):
#     text = state["user_input"].lower()
#
#     if "log" in text or "met" in text:
#         return "log"
#     elif "history" in text:
#         return "history"
#     elif "follow" in text:
#         return "follow"
#     elif "summary" in text:
#         return "summary"
#     elif "edit" in text:
#         return "edit"
#     else:
#         return "summary"
#
#
# # Build Graph
# builder = StateGraph(AgentState)
#
# builder.add_node("log", log_interaction_tool)
# builder.add_node("history", get_history_tool)
# builder.add_node("follow", followup_tool)
# builder.add_node("summary", summarize_tool)
# builder.add_node("edit", edit_tool)
#
# builder.set_entry_point("summary")
#
# builder.add_conditional_edges(
#     "summary",
#     router,
#     {
#         "log": "log",
#         "history": "history",
#         "follow": "follow",
#         "summary": "summary",
#         "edit": "edit"
#     }
# )
#
# graph = builder.compile()
#
#
# def run_agent(input_text: str):
#     result = graph.invoke({"user_input": input_text})
#     return result["output"]


from langgraph.graph import StateGraph
from typing import TypedDict
from groq import Groq
import sqlite3
import json
import re
from dotenv import load_dotenv
import os
load_dotenv()

# client = Groq(api_key=os.getenv("GROQ_API_KEY"))
client = Groq(api_key="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")

conn = sqlite3.connect("crm.db", check_same_thread=False)
cursor = conn.cursor()


class AgentState(TypedDict):
    user_input: str
    tool: str
    output: str


# 🧠 LLM decides WHICH TOOL to use
def decide_tool(state: AgentState):
   prompt = f"""
   You are an AI CRM assistant.

    Choose ONLY one tool from:
    log_interaction
    get_history
    suggest_followup
    summarize
    edit_interaction

    Rules:
    - No explanation
    - No thinking
    - Output ONLY the tool name

    User Input:
    {state['user_input']}
    """
#     prompt = f"""
# You are an AI CRM assistant.
#
# Choose ONLY ONE tool from:
# log_interaction, get_history, suggest_followup, summarize, edit_interaction
#
# Rules:
# - Return ONLY the tool name
# - No explanation
# - No thinking
# - No extra text
#
# User Input:
# {state['user_input']}
# """

   res = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0  # important
   )

   # tool = res.choices[0].message.content.strip().lower()
   tool = res.choices[0].message.content.strip().lower()

   # 🧠 SAFETY CLEANUP (VERY IMPORTANT)
   # 🧹 Clean garbage output (LLM sometimes adds thinking text)
   tool = tool.replace("<think>", "").replace("</think>", "").strip()

   # ✅ Only allow valid tools
   valid_tools = [
       "log_interaction",
       "get_history",
       "suggest_followup",
       "summarize",
       "edit_interaction"
   ]

   for t in valid_tools:
       if t in tool:
           return {"tool": t}

   # ⚠️ fallback (prevents crash)
   return {"tool": "get_history"}
   # tool = tool.split("\n")[-1].strip()  # remove <think> etc
   #
   # return {"tool": tool}

# def decide_tool(state: AgentState):
#     prompt = f"""
#     You are an AI CRM assistant.
#
#     Decide the tool:
#     - log_interaction
#     - get_history
#     - suggest_followup
#     - summarize
#     - edit_interaction
#
#     User Input:
#     {state['user_input']}
#
#     Return ONLY tool name.
#     """
#
#     res = client.chat.completions.create(
#         #model="gemma2-9b-it",
#         #model="llama-3.1-8b-instant",
#         model="qwen/qwen3-32b",
#         messages=[{"role": "user", "content": prompt}]
#     )
#
#     tool = res.choices[0].message.content.strip().lower()
#
#     return {"tool": tool}


# 🔧 TOOL: Log Interaction
def log_tool(state: AgentState):
    prompt = f"""
    Extract structured JSON with fields:
    doctor_name, product, notes, sentiment, date

    Rules:
    - Return ONLY valid JSON
    - No explanation
    - No text before or after JSON

    Example:
    {{
      "doctor_name": "Dr Sharma",
      "product": "Insulin",
      "notes": "Discussed insulin",
      "sentiment": "positive",
      "date": "2026-04-17"
    }}

    Input:
    {state['user_input']}
    """
    # prompt = f"""
    # Extract structured JSON:
    # doctor_name, product, notes, sentiment, date
    #
    # Input:
    # {state['user_input']}
    # """
    res = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )

    # res = client.chat.completions.create(
    #     model="gemma2-9b-it",
    #     messages=[{"role": "user", "content": prompt}]
    # )

    response_text = res.choices[0].message.content.strip()

    try:
        json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
        if json_match:
            data = json.loads(json_match.group())
        else:
            raise ValueError("No JSON found")
    except Exception as e:
        return {"output": f"Parsing failed. Raw output: {response_text}"}

    # 🔥 STEP 3: Auto-fill missing fields
    data.setdefault("doctor_name", "Unknown")
    data.setdefault("product", "Unknown")
    data.setdefault("notes", state["user_input"])
    data.setdefault("sentiment", "neutral")
    data.setdefault("date", "2026-04-17")


    # try:
    #     data = json.loads(res.choices[0].message.content)
    # except:
    #     return {"output": "Failed to parse interaction"}

    cursor.execute("""
        INSERT INTO interactions (doctor_name, product, notes, sentiment, date)
        VALUES (?, ?, ?, ?, ?)
    """, (
        data.get("doctor_name"),
        data.get("product"),
        data.get("notes"),
        data.get("sentiment"),
        data.get("date")
    ))
    conn.commit()

    return {
        "output": f"Logged interaction for {data.get('doctor_name')}",
        "data": data  # 🔥 IMPORTANT
    }

# 🔧 TOOL: History
def history_tool(state: AgentState):
    cursor.execute("SELECT * FROM interactions ORDER BY id DESC LIMIT 5")
    data = cursor.fetchall()
    return {"output": str(data)}


# 🔧 TOOL: Follow-up
def followup_tool(state: AgentState):
    cursor.execute("SELECT * FROM interactions ORDER BY id DESC LIMIT 1")
    last = cursor.fetchone()

    if not last:
        return {"output": "No interaction history found."}

    prompt = f"""
    You are a pharma CRM assistant.

    Last interaction:
    Doctor: {last[1]}
    Product: {last[2]}
    Notes: {last[3]}
    Sentiment: {last[4]}
    Date: {last[5]}

    Suggest the NEXT BEST ACTION (specific, practical).
    """
    # prompt = f"Suggest next action: {state['user_input']}"
    res = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )
    return {"output": res.choices[0].message.content}


# 🔧 TOOL: Summarize
def summarize_tool(state: AgentState):
    cursor.execute("SELECT * FROM interactions ORDER BY id DESC LIMIT 1")
    last = cursor.fetchone()

    if not last:
        return {"output": "No interaction to summarize."}

    prompt = f"""
    Create a professional CRM visit summary.

    Doctor: {last[1]}
    Product: {last[2]}
    Notes: {last[3]}
    Sentiment: {last[4]}
    Date: {last[5]}

    Format:
    - Objective
    - Discussion
    - Outcome
    - Next Steps
    """

    res = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )

    return {"output": res.choices[0].message.content}
# def summarize_tool(state: AgentState):
#     prompt = f"Summarize professionally: {state['user_input']}"
#     res = client.chat.completions.create(
#         model="llama-3.1-8b-instant",
#         messages=[{"role": "user", "content": prompt}]
#     )
#     return {"output": res.choices[0].message.content}


# 🔧 TOOL: Edit (REALISTIC)
def edit_tool(state: AgentState):
    return {"output": "Editing flow triggered (can extend with ID parsing)"}


# 🔀 Router (based on LLM decision)
def route(state: AgentState):
    tool = state["tool"]

    valid_tools = [
        "log_interaction",
        "get_history",
        "suggest_followup",
        "summarize",
        "edit_interaction"
    ]

    if tool not in valid_tools:
        return "summarize"  # fallback

    return tool
# def route(state: AgentState):
#     return state["tool"]


builder = StateGraph(AgentState)

builder.add_node("decide", decide_tool)
builder.add_node("log_interaction", log_tool)
builder.add_node("get_history", history_tool)
builder.add_node("suggest_followup", followup_tool)
builder.add_node("summarize", summarize_tool)
builder.add_node("edit_interaction", edit_tool)

builder.set_entry_point("decide")

builder.add_conditional_edges(
    "decide",
    route,
    {
        "log_interaction": "log_interaction",
        "get_history": "get_history",
        "suggest_followup": "suggest_followup",
        "summarize": "summarize",
        "edit_interaction": "edit_interaction"
    }
)

graph = builder.compile()


def run_agent(user_input: str):
    result = graph.invoke({"user_input": user_input})
    return result   # 🔥 return full result
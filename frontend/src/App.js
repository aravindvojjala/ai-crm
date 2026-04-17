//import React, { useState } from "react";
//import axios from "axios";
//
//function App() {
//  const [message, setMessage] = useState("");
//  const [response, setResponse] = useState("");
//
//  const sendMessage = async () => {
//    const res = await axios.post("http://localhost:8000/chat", {
//      message: message
//    });
//    setResponse(res.data.response);
//  };
//
//  return (
//    <div style={{ padding: 20 }}>
//      <h2>AI CRM - HCP Interaction</h2>
//
//      <textarea
//        rows="4"
//        cols="50"
//        placeholder="Type interaction..."
//        onChange={(e) => setMessage(e.target.value)}
//      />
//
//      <br /><br />
//
//      <button onClick={sendMessage}>Send</button>
//
//      <h3>Response:</h3>
//      <p>{response}</p>
//    </div>
//  );
//}
//
//export default App;

//---------------------------------------------------------------

//import React, { useState } from "react";
//import axios from "axios";
//
//function App() {
//  const [messages, setMessages] = useState([]);
//  const [input, setInput] = useState("");
//  const [loading, setLoading] = useState(false);
//
//  const sendMessage = async () => {
//    if (!input) return;
//
//    const newMessages = [...messages, { text: input, user: true }];
//    setMessages(newMessages);
//    setLoading(true);
//
//    try {
//        const res = await axios.post("http://127.0.0.1:8000/chat", {
//        message: input
//        });
//
//        setMessages([
//        ...newMessages,
//        { text: res.data.response, user: false }
//        ]);
//    } catch (error) {
//      console.error(error);
//      setMessages([
//        ...newMessages,
//        { text: "Error connecting to backend", user: false }
//      ]);
//    }
//
//    setInput("");
//    setLoading(false);
//  };
//
////  const sendMessage = async () => {
////    if (!input) return;
////
////    const newMessages = [...messages, { text: input, user: true }];
////    setMessages(newMessages);
////    setLoading(true);
////
////    const res = await axios.post("http://127.0.0.1:8000/chat", {
////    message: input
////    });
////
////    setMessages([
////      ...newMessages,
////      { text: res.data.response, user: false }
////    ]);
////
////    setInput("");
////    setLoading(false);
////  };
//
//  return (
//    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
//      <h2>AI CRM Assistant</h2>
//
//      <div style={{
//        border: "1px solid #ddd",
//        borderRadius: 10,
//        padding: 10,
//        height: 400,
//        overflowY: "scroll"
//      }}>
//        {messages.map((msg, i) => (
//          <div key={i} style={{
//            textAlign: msg.user ? "right" : "left",
//            margin: 10
//          }}>
//            <span style={{
//              background: msg.user ? "#007bff" : "#eee",
//              color: msg.user ? "white" : "black",
//              padding: 10,
//              borderRadius: 10,
//              display: "inline-block"
//            }}>
//              {msg.text}
//            </span>
//          </div>
//        ))}
//
//        {loading && <p>Thinking...</p>}
//      </div>
//
//      <div style={{ display: "flex", marginTop: 10 }}>
//        <input
//          style={{ flex: 1, padding: 10 }}
//          value={input}
//          onChange={(e) => setInput(e.target.value)}
//          placeholder="Type interaction..."
//        />
//        <button onClick={sendMessage}>Send</button>
//      </div>
//    </div>
//  );
//}
//
//export default App;

//2 -------------------------------------------------------------

//import { useState } from "react";
//
//function App() {
//  const [chat, setChat] = useState([]);
//  const [input, setInput] = useState("");
//
//  const [form, setForm] = useState({
//    doctor: "",
//    product: "",
//    notes: "",
//    sentiment: "positive",
//  });
//
//  const send = async () => {
//    const res = await fetch("http://127.0.0.1:8000/chat", {
//      method: "POST",
//      headers: {"Content-Type": "application/json"},
//      body: JSON.stringify({ message: input }),
//    });
//
//    const data = await res.json();
//
//    setChat([...chat, { user: input, ai: data.response }]);
//    setInput("");
//  };
//
//  const logInteraction = async () => {
//    const msg = `Met ${form.doctor}, discussed ${form.product}, ${form.sentiment} response`;
//
//    const res = await fetch("http://127.0.0.1:8000/chat", {
//      method: "POST",
//      headers: {"Content-Type": "application/json"},
//      body: JSON.stringify({ message: msg }),
//    });
//
//    const data = await res.json();
//
//    setChat([...chat, { user: msg, ai: data.response }]);
//  };
//
//  return (
//    <div style={{ display: "flex", padding: 20, gap: 20 }}>
//
//      {/* LEFT FORM */}
//      <div style={{ flex: 2, background: "#fff", padding: 20, borderRadius: 10 }}>
//        <h3>Log HCP Interaction</h3>
//
//        <input placeholder="Doctor Name"
//          onChange={(e) => setForm({...form, doctor: e.target.value})} />
//
//        <input placeholder="Product"
//          onChange={(e) => setForm({...form, product: e.target.value})} />
//
//        <textarea placeholder="Notes"
//          onChange={(e) => setForm({...form, notes: e.target.value})} />
//
//        <select onChange={(e) => setForm({...form, sentiment: e.target.value})}>
//          <option>positive</option>
//          <option>neutral</option>
//          <option>negative</option>
//        </select>
//
//        <button onClick={logInteraction}>Save</button>
//      </div>
//
//      {/* RIGHT CHAT */}
//      <div style={{ flex: 1, background: "#fff", padding: 20, borderRadius: 10 }}>
//        <h3>AI Assistant</h3>
//
//        <div style={{ height: 300, overflowY: "auto" }}>
//          {chat.map((c, i) => (
//            <div key={i}>
//              <p><b>You:</b> {c.user}</p>
//              <p><b>AI:</b> {c.ai}</p>
//            </div>
//          ))}
//        </div>
//
//        <input value={input} onChange={(e) => setInput(e.target.value)} />
//        <button onClick={send}>Send</button>
//      </div>
//
//    </div>
//  );
//}
//
//export default App;

//3 --------------------------------------------------------------------------------
// important because it was came with out any error and the only has the ui was not clean that it


//import { useState } from "react";
//
//function App() {
//  const [chat, setChat] = useState([]);
//  const [input, setInput] = useState("");
//
//  const [form, setForm] = useState({
//    doctor: "",
//    date: "",
//    time: "",
//    notes: "",
//    sentiment: "neutral",
//    outcomes: "",
//    followup: ""
//  });
//
//  const send = async () => {
//    const res = await fetch("http://127.0.0.1:8000/chat", {
//      method: "POST",
//      headers: { "Content-Type": "application/json" },
//      body: JSON.stringify({ message: input }),
//    });
//
//    const data = await res.json();
//    setChat([...chat, { user: input, ai: data.response }]);
//    setInput("");
//  };
//
//  const logInteraction = async () => {
//    const msg = `Met ${form.doctor}, discussed ${form.notes}, ${form.sentiment} response`;
//
//    const res = await fetch("http://127.0.0.1:8000/chat", {
//      method: "POST",
//      headers: { "Content-Type": "application/json" },
//      body: JSON.stringify({ message: msg }),
//    });
//
//    const data = await res.json();
//    setChat([...chat, { user: msg, ai: data.response }]);
//  };
//
//  return (
//    <div style={{ background: "#f5f7fb", minHeight: "100vh", padding: 20 }}>
//
//      <h2>Log HCP Interaction</h2>
//
//      <div style={{ display: "flex", gap: 20 }}>
//
//        {/* LEFT PANEL */}
//        <div style={{
//          flex: 3,
//          background: "#fff",
//          padding: 20,
//          borderRadius: 10,
//          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
//        }}>
//
//          <h3>Interaction Details</h3>
//
//          <input placeholder="HCP Name"
//            onChange={(e) => setForm({ ...form, doctor: e.target.value })} />
//
//          <div style={{ display: "flex", gap: 10 }}>
//            <input type="date"
//              onChange={(e) => setForm({ ...form, date: e.target.value })} />
//            <input type="time"
//              onChange={(e) => setForm({ ...form, time: e.target.value })} />
//          </div>
//
//          <input placeholder="Attendees" />
//
//          <textarea placeholder="Topics Discussed"
//            onChange={(e) => setForm({ ...form, notes: e.target.value })} />
//
//          <h4>Materials / Samples</h4>
//          <button>+ Add Sample</button>
//
//          <h4>Sentiment</h4>
//          <div>
//            <label><input type="radio" name="sentiment" value="positive"
//              onChange={(e) => setForm({ ...form, sentiment: e.target.value })} /> Positive</label>
//
//            <label><input type="radio" name="sentiment" value="neutral"
//              defaultChecked
//              onChange={(e) => setForm({ ...form, sentiment: e.target.value })} /> Neutral</label>
//
//            <label><input type="radio" name="sentiment" value="negative"
//              onChange={(e) => setForm({ ...form, sentiment: e.target.value })} /> Negative</label>
//          </div>
//
//          <textarea placeholder="Outcomes"
//            onChange={(e) => setForm({ ...form, outcomes: e.target.value })} />
//
//          <textarea placeholder="Follow-up Actions"
//            onChange={(e) => setForm({ ...form, followup: e.target.value })} />
//
//          <button onClick={logInteraction} style={{ marginTop: 10 }}>
//            Save Interaction
//          </button>
//        </div>
//
//        {/* RIGHT PANEL */}
//        <div style={{
//          flex: 1,
//          background: "#fff",
//          padding: 20,
//          borderRadius: 10,
//          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
//        }}>
//
//          <h3>AI Assistant</h3>
//
//          <div style={{
//            height: 350,
//            overflowY: "auto",
//            background: "#f0f2f5",
//            padding: 10,
//            borderRadius: 8
//          }}>
//            {chat.map((c, i) => (
//              <div key={i}>
//                <p><b>You:</b> {c.user}</p>
//                <p><b>AI:</b> {c.ai}</p>
//              </div>
//            ))}
//          </div>
//
//          <input
//            placeholder="Describe interaction..."
//            value={input}
//            onChange={(e) => setInput(e.target.value)}
//          />
//
//          <button onClick={send}>Ask AI</button>
//        </div>
//
//      </div>
//    </div>
//  );
//}
//
//export default App;

//4 ---------------------------------------------------------------------
import { useState } from "react";
import "./App.css";

function App() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  const [form, setForm] = useState({
    doctor: "",
    product: "",
    notes: "",
    sentiment: "neutral",
    date: "",
  });

  const send = async () => {
  const res = await fetch("http://127.0.0.1:8000/chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ message: input }),
  });

  const data = await res.json();

  console.log("API:", data);

  const aiResponse =
    data.output ||
    data.response?.output ||
    data.response ||
    "No response";

  // 🧠 Add to chat
  setChat([...chat, { user: input, ai: aiResponse }]);
  // 🚀 AUTO-FILL FORM (MAIN FEATURE)
  if (data.data) {
    setForm({
        doctor: data.data.doctor_name || "",
        product: data.data.product || "",
        notes: data.data.notes || "",
        sentiment: data.data.sentiment || "neutral",
        date: data.data.date || "",
    });
  }

  setInput("");
  };

//  const send = async () => {
//    const res = await fetch("http://127.0.0.1:8000/chat", {
//      method: "POST",
//      headers: {"Content-Type": "application/json"},
//      body: JSON.stringify({ message: input }),
//    });
//
//    const data = await res.json();
//    setChat([...chat, { user: input, ai: data.response }]);
//    setInput("");
//  };

  const logInteraction = async () => {
    const msg = `Met ${form.doctor}, discussed ${form.product}, ${form.notes}, ${form.sentiment} response`;

        const send = async () => {
            const res = await fetch("http://127.0.0.1:8000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const data = await res.json();

            const aiResponse =
                data.output ||
                data.response?.output ||
                data.response ||
                "Saved";

            console.log("FULL API RESPONSE:", data); // 👈 VERY IMPORTANT

            setChat([...chat, { user: input, ai: aiResponse }]);

            setInput("");
        };
  };

  return (
    <div className="container">

      {/* LEFT PANEL */}
      <div className="left">

        <div className="card">
          <h2>Log HCP Interaction</h2>

          <div className="section">
            <label>HCP Name</label>
            <input
                placeholder="Doctor Name"
                value={form.doctor}
                onChange={(e) => setForm({...form, doctor: e.target.value})}
            />
          </div>

          <div className="row">
            <div>
              <label>Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({...form, date: e.target.value})}
              />
            </div>

            <div>
              <label>Interaction Type</label>
              <select>
                <option>Meeting</option>
                <option>Call</option>
              </select>
            </div>
          </div>

          <div className="section">
            <label>Topics Discussed</label>
            <textarea
                placeholder="Notes"
                value={form.notes}
                onChange={(e) => setForm({...form, notes: e.target.value})}
            />
          </div>

          <div className="section">
            <label>Product</label>
            <input
                placeholder="Product"
                value={form.product}
                onChange={(e) => setForm({...form, product: e.target.value})}
            />
          </div>

          <div className="section">
            <label>Observed Sentiment</label>
            <div className="radio-group">
              <label><input type="radio" name="sentiment" onChange={() => setForm({...form, sentiment: "positive"})}/> Positive</label>
              <label><input type="radio" name="sentiment" onChange={() => setForm({...form, sentiment: "neutral"})}/> Neutral</label>
              <label><input type="radio" name="sentiment" onChange={() => setForm({...form, sentiment: "negative"})}/> Negative</label>
            </div>
          </div>

          <div className="section">
            <label>Outcomes</label>
            <textarea placeholder="Key outcomes or agreements..." />
          </div>

          <div className="section">
            <label>Follow-up Actions</label>
            <textarea placeholder="Enter next steps..." />
          </div>

          <button className="primary-btn" onClick={logInteraction}>
            Save Interaction
          </button>
        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="right">
        <div className="card assistant">

          <h3>🤖 AI Assistant</h3>

          <div className="assistant-box">
            {chat.map((c, i) => (
              <div key={i}>
                <p className="user">{c.user}</p>
                <p className="ai">{c.ai}</p>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              value={input}
              placeholder="Describe interaction..."
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={send}>Log</button>
          </div>

        </div>
      </div>

    </div>
  );
}

export default App;
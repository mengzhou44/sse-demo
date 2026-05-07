import { useState, useRef } from "react";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [streaming, setStreaming] = useState(false);
  const eventSourceRef = useRef(null);

  function startStream() {
    // Close any existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    setMessages([]);
    setStreaming(true);

    // EventSource opens a persistent HTTP connection and listens for SSE events
    const es = new EventSource("http://localhost:8090/stream");
    eventSourceRef.current = es;

    es.addEventListener("message", (event) => {
      setMessages((prev) => [...prev, event.data]);
    });

    es.addEventListener("done", () => {
      es.close();
      setStreaming(false);
    });

    es.addEventListener("error", () => {
      es.close();
      setStreaming(false);
    });
  }

  function stopStream() {
    eventSourceRef.current?.close();
    setStreaming(false);
  }

  return (
    <div style={{ fontFamily: "monospace", padding: "2rem", maxWidth: 600 }}>
      <h1>SSE Demo</h1>

      <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
        <button onClick={startStream} disabled={streaming}>
          Start Stream
        </button>
        <button onClick={stopStream} disabled={!streaming}>
          Stop
        </button>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: 4,
          padding: "1rem",
          minHeight: 200,
          maxHeight: 400,
          overflowY: "auto",
          background: "#f9f9f9",
        }}
      >
        {messages.length === 0 && (
          <span style={{ color: "#aaa" }}>No messages yet…</span>
        )}
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>

      <div style={{ marginTop: "0.5rem", color: "#888", fontSize: "0.85rem" }}>
        {streaming ? `Streaming… (${messages.length}/50)` : `Done — ${messages.length} messages received`}
      </div>
    </div>
  );
}

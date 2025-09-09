"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useWebSocket } from "./useWebSocket";

interface Message {
  id?: number;
  userId: number;
  content: string;
  createdAt: string;
  client_id: string;
}

export default function ChatWindow({ userId }: { userId: number }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);


  // Fetch initial messages
  useEffect(() => {
    fetch("/api/messages")
      .then(res => res.json())
      .then(setMessages);
  }, []);

  // WebSocket for real-time updates
  const handleWsMessage = useCallback((msg: Message) => {
    setMessages(prev => {
      // Deduplicate by client_id
      if (prev.some(m => m.client_id === msg.client_id)) return prev;
      return [...prev, msg];
    });
    // Notification (in-app)
    if (msg.userId !== userId && window.Notification && Notification.permission === "granted") {
      new Notification("New message", { body: msg.content });
    }
  }, [userId]);

  const { send } = useWebSocket("ws://localhost:3001", handleWsMessage);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;
    const msg: Message = {
      userId,
      content: input,
      createdAt: new Date().toISOString(),
      client_id: Math.random().toString(36).slice(2),
    };
    setMessages(prev => [...prev, msg]); // Optimistic UI
    setInput("");
    setTyping(false);
    // Send to backend (persist)
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg),
    });
    // Send to WebSocket (real-time)
    send(msg);
  }

  // Request notification permission on mount
  useEffect(() => {
    if (window.Notification && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div ref={listRef} className="flex-1 overflow-y-auto bg-gray-100 p-4">
        {messages.map((m, i) => (
          <div key={m.client_id || i} className="mb-2">
            <span className="font-bold">User {m.userId}:</span> {m.content}
            <span className="text-xs text-gray-400 ml-2">{new Date(m.createdAt).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="p-2 bg-white flex items-center gap-2" role="form" aria-label="Chat input form">
        <label htmlFor="chat-input" className="sr-only">Type a message</label>
        <input
          id="chat-input"
          className="flex-1 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={e => {
            setInput(e.target.value);
            setTyping(true);
          }}
          onKeyDown={e => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Type a message..."
          aria-label="Type a message"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={sendMessage}
          aria-label="Send message"
        >
          Send
        </button>
        {typing && <span className="text-xs text-gray-400 ml-2" aria-live="polite">Typing...</span>}
      </div>
    </div>
  );
}

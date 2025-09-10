
import { useState, useRef } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export function useAiChat() {
  const [messages, setMessages] = useState<string[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);

  function sendMessage(message: string) {
    if (eventSourceRef.current) eventSourceRef.current.close();
    eventSourceRef.current = new EventSource(`${API_URL}/api/ai/chat`);
    eventSourceRef.current.onmessage = (e) => {
      setMessages(prev => [...prev, e.data]);
    };
    fetch(`${API_URL}/api/ai/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
  }

  return { messages, sendMessage };
}

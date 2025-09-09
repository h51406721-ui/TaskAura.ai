import { useState, useRef } from "react";

export function useAiChat() {
  const [messages, setMessages] = useState<string[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);

  function sendMessage(message: string) {
    if (eventSourceRef.current) eventSourceRef.current.close();
    eventSourceRef.current = new EventSource("/api/ai/chat");
    eventSourceRef.current.onmessage = (e) => {
      setMessages(prev => [...prev, e.data]);
    };
    fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
  }

  return { messages, sendMessage };
}

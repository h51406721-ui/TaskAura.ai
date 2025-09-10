
import { useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export function useTaskGeneration() {
  const [tasks, setTasks] = useState<string[]>([]);

  async function generateTasks(message: string) {
    const res = await fetch(`${API_URL}/api/ai/tasks/from-message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    setTasks(data.tasks || []);
  }

  return { tasks, generateTasks };
}

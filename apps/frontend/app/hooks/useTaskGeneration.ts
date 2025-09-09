import { useState } from "react";

export function useTaskGeneration() {
  const [tasks, setTasks] = useState<string[]>([]);

  async function generateTasks(message: string) {
    const res = await fetch("/api/ai/tasks/from-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    setTasks(data.tasks || []);
  }

  return { tasks, generateTasks };
}

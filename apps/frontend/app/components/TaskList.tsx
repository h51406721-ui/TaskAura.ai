"use client";
import { useState } from "react";

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  userId: number;
}

export default function TaskList({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks);

  // Drag-n-drop and CRUD logic would go here

  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <div key={task.id} className={`p-4 rounded shadow flex items-center justify-between ${task.completed ? 'bg-green-100' : 'bg-white'}`} draggable>
          <div>
            <div className="font-bold">{task.title}</div>
            <div className="text-sm text-gray-500">{task.description}</div>
          </div>
          <div>
            {task.completed ? <span className="text-green-600 font-bold">Done</span> : <span className="text-yellow-600">In Progress</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

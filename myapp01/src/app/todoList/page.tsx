"use client";

import { useState } from "react";

export default function TodoPage() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState("");

  function handleAddTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input) return;
    setTasks([...tasks, input]);
    setInput("");
  }

  function handleDeleteTask(index: number) {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">📝 To-Do List</h1>

        <form onSubmit={handleAddTask} className="flex mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="เพิ่มงาน..."
            className="flex-1 border border-gray-300 rounded px-3 py-2 mr-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            เพิ่ม
          </button>
        </form>

        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b py-2"
            >
              <span>{task}</span>
              <button
                onClick={() => handleDeleteTask(index)}
                className="text-red-500 hover:text-red-700"
              >
                ลบ
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

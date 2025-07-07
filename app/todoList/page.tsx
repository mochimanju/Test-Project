"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Navbar from '@/components/ui/navbar'
import { Button } from "@/components/ui/button"

interface Todo {
    id: number
    text: string
    completed: boolean
    priority: 'low' | 'medium' | 'high'
}

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [hasMounted, setHasMounted] = useState(false)
    const [inputValue, setInputValue] = useState<string>("")
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
    const [editingId, setEditingId] = useState<number | null>(null)
    const [editText, setEditText] = useState<string>("")


    // Load todos from localStorage only on client
    useEffect(() => {
        const saved = localStorage.getItem('todos')
        if (saved) {
            setTodos(JSON.parse(saved))
        }
        setHasMounted(true)
    }, [])

    useEffect(() => {
        if (hasMounted) {
            localStorage.setItem('todos', JSON.stringify(todos))
        }
    }, [todos, hasMounted])

    if (!hasMounted) return null // Prevent hydration mismatch

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    // Handle priority change
    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriority(e.target.value as 'low' | 'medium' | 'high')
    }

    // Handle form submission to add new todo
    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault()
        if (inputValue.trim() === "") return

        const newTodo: Todo = {
            id: Date.now(),
            text: inputValue,
            completed: false,
            priority,
        }

        setTodos([...todos, newTodo])
        setInputValue("")
        setPriority('medium')
    }

    // Handle toggling todo completion
    const handleToggleComplete = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        )
    }

    // Handle deleting a todo
    const handleDeleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    // Handle editing a todo
    const handleEditTodo = (id: number, text: string) => {
        setEditingId(id)
        setEditText(text)
    }

    // Handle saving edited todo
    const handleSaveEdit = (id: number) => {
        if (editText.trim() === "") return
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, text: editText } : todo
            )
        )
        setEditingId(null)
        setEditText("")
    }

    // Handle clearing completed todos
    const handleClearCompleted = () => {
        setTodos(todos.filter((todo) => !todo.completed))
    }

    // Filter todos based on selected filter
    const filteredTodos = todos
        .filter((todo) => {
            if (filter === 'active') return !todo.completed
            if (filter === 'completed') return todo.completed
            return true
        })
        .sort((a, b) => {
            const priorityOrder = { high: 1, medium: 2, low: 3 }
            return priorityOrder[a.priority] - priorityOrder[b.priority]
        })

    // Count active todos
    const activeTodoCount = todos.filter((todo) => !todo.completed).length

    return (
        <div className="min-h-screen overflow-hidden">
            {/* Fixed Navbar */}
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
                <Navbar />
            </div>

            {/* Content */}
            <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-16">
                <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-xl">
                    <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>


                    {/* Form to add new todo */}
                    <div className="mb-4 space-y-2">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="Add a new todo"
                                className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <select
                                value={priority}
                                onChange={handlePriorityChange}
                                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <Button
                            onClick={handleAddTodo}
                            className="mt-2 p-5 w-full text-white rounded-full cursor-pointer font-bold">Add Todo</Button>
                    </div>

                    {/* Filter buttons */}
                    <div className="flex justify-between mb-4">
                        <div className="space-x-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter('active')}
                                className={`px-3 py-1 rounded ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Active
                            </button>
                            <button
                                onClick={() => setFilter('completed')}
                                className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Completed
                            </button>
                        </div>
                        <button
                            onClick={handleClearCompleted}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Clear Completed
                        </button>
                    </div>

                    {/* Todo count */}
                    <div className="mb-4 text-sm text-gray-600">
                        {activeTodoCount} {activeTodoCount === 1 ? 'item' : 'items'} left
                    </div>

                    {/* Todo list */}
                    <ul className="space-y-2">
                        {filteredTodos.map((todo) => (
                            <li
                                key={todo.id}
                                className="flex items-center justify-between p-2 bg-gray-50 rounded"
                            >
                                {editingId === todo.id ? (
                                    <div className="flex-grow flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            className="flex-grow p-1 border rounded"
                                        />
                                        <button
                                            onClick={() => handleSaveEdit(todo.id)}
                                            className="text-green-500 hover:text-green-700"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={todo.completed}
                                                onChange={() => handleToggleComplete(todo.id)}
                                                className="h-5 w-5"
                                            />
                                            <span
                                                onClick={() => handleEditTodo(todo.id, todo.text)}
                                                className={`cursor-pointer flex-grow ${todo.completed ? "line-through text-gray-500" : ""
                                                    } ${todo.priority === 'high' ? 'text-red-500' : todo.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}
                                            >
                                                {todo.text}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteTodo(todo.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface AddTodoProps {
  setTodos: React.Dispatch<React.SetStateAction<any[]>>
  userId: string
}

export default function AddTodo({ setTodos, userId }: AddTodoProps) {
  const [title, setTitle] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const response = await fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, user_id: userId }),
    })

    if (response.ok) {
      const newTodo = await response.json()
      setTodos((prevTodos) => [newTodo, ...prevTodos])
      setTitle('')
    } else {
      console.error('Failed to add todo')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo"
          className="flex-grow border rounded-l p-2 mr-0"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r"
        >
          Add Todo
        </button>
      </div>
    </form>
  )
}
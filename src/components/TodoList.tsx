import { supabase } from '@/lib/supabase'

interface TodoListProps {
  todos: any[]
  setTodos: React.Dispatch<React.SetStateAction<any[]>>
}

export default function TodoList({ todos, setTodos }: TodoListProps) {
  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('todos').delete().eq('id', id)
    if (error) {
      console.error('Error deleting todo:', error)
    } else {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    }
  }

  const handleToggleComplete = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('todos')
      .update({ is_complete: !currentStatus })
      .eq('id', id)
    if (error) {
      console.error('Error updating todo:', error)
    } else {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, is_complete: !currentStatus } : todo
        )
      )
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {todos.map((todo) => (
        <div key={todo.id} className="bg-white p-4 rounded shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.is_complete}
                onChange={() => handleToggleComplete(todo.id, todo.is_complete)}
                className="mr-2"
              />
              <span className={todo.is_complete ? 'line-through' : ''}>
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ❌
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
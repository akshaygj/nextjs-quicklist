'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import TodoList from '@/components/TodoList'
import AddTodo from '@/components/AddTodo'
import Login from '@/components/Login'
import Header from '@/components/Header'

export default function Home() {
  const [todos, setTodos] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    fetchUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      if (event === 'SIGNED_IN') {
        fetchTodos()
      } else if (event === 'SIGNED_OUT') {
        setTodos([])
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const fetchTodos = async () => {
    if (!user) return
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    if (error) console.error('Error fetching todos:', error)
    else setTodos(data || [])
  }

  useEffect(() => {
    if (user) fetchTodos()
  }, [user])

  if (loading) {
    // loader shown while fetching state
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
          </div>
        </div>
      </div>
    )
  }
  

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      <main className="flex-grow flex flex-col items-center p-8">
        {/* loggeg out state */}
        {!user && <Login user={user} />}

        {/* logged in state */}
        {user && user.id && (
          <>
            <div className="w-full max-w-md mb-8">
              <AddTodo setTodos={setTodos} userId={user.id} />
            </div>
            <div className="w-full max-w-4xl">
              <TodoList todos={todos} setTodos={setTodos} />
            </div>
          </>
        )}
      </main>
    </div>
  )
}
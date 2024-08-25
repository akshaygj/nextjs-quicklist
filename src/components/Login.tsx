import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface LoginProps {
  user: any
}

export default function Login({ user }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) alert(error.message)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) alert(error.message)
    else alert('Welcome to QuickList !')
  }

  if (user) return null

  return (
    <div className="w-full max-w-md">
      <form onSubmit={isRegistering ? handleRegister : handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isRegistering ? 'Register' : 'Login'}
          </button>
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  )
}
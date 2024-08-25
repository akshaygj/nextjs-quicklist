import { supabase } from '@/lib/supabase'

interface HeaderProps {
  user: any
}

export default function Header({ user }: HeaderProps) {
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">QuickList - A Todo App</h1>
      {user && (
        <div className="flex items-center">
          <span className="mr-4">{user.email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  )
}
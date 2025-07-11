import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: any) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else router.push('/dashboard')
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white px-4">
      <form onSubmit={handleLogin} className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Unlock Your Mind™</h1>
        <p className="text-center text-sm text-gray-400">Welcome back, log in below</p>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full p-3 rounded bg-gray-700 placeholder:text-gray-300" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full p-3 rounded bg-gray-700 placeholder:text-gray-300" />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button type="submit" disabled={loading} className="bg-indigo-600 w-full py-3 rounded hover:bg-indigo-500 transition">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

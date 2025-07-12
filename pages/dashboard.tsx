import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/router'
import JournalEntryForm from '../components/JournalEntryForm'
import GPTChat from '../components/GPTChat'
import DreamVault from '../components/DreamVault'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push('/')
      else setUser(data.session.user)
    })
  }, [router])

  if (!user) {
    return (
      <div className="h-screen flex justify-center items-center text-white bg-black">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.email}</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">📝 Your Journal</h2>
          <JournalEntryForm userId={user.id} />
        </div>
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">🤖 Chat with ShivrajGPT</h2>
          <GPTChat />
        </div>
      </div>
      <DreamVault userId={user.id} />
    </div>
  )
}

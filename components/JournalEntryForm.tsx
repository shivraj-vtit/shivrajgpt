import { useState } from 'react'
import { supabase } from '../lib/supabase' // ✅ simplified path
import { useRouter } from 'next/router'

export default function JournalEntryForm({ userId }: { userId: string }) {
  const [entry, setEntry] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.from('journal_entries').insert([
      { content: entry, user_id: userId },
    ])

    if (error) {
      setMessage('Something went wrong. Please try again.')
    } else {
      setMessage('Entry saved successfully!')
      setEntry('')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-xl shadow-md text-white">
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write your journal entry here..."
        className="w-full h-32 p-3 rounded bg-gray-700 placeholder:text-gray-300"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 py-2 rounded hover:bg-indigo-500 transition"
      >
        {loading ? 'Saving...' : 'Save Entry'}
      </button>
      {message && <p className="text-sm text-center text-green-400">{message}</p>}
    </form>
  )
}

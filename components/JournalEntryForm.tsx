// components/JournalEntryForm.tsx
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function JournalEntryForm({ userId }: { userId: string }) {
  const [entry, setEntry] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.from('journal_entries').insert([
      { user_id: userId, content: entry },
    ])

    if (error) {
      setMessage('❌ Failed to save entry. Try again.')
    } else {
      setMessage('✅ Saved! Every word brings you closer.')
      setEntry('')
    }

    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-gray-800 text-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Today’s Reflection</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write what you feel, what you did, or where you’re headed..."
          className="w-full p-3 rounded bg-gray-700 placeholder:text-gray-400"
          rows={5}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 w-full py-2 rounded hover:bg-indigo-500 transition"
        >
          {loading ? 'Saving...' : 'Save Reflection'}
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-green-400">{message}</p>}
    </div>
  )
}

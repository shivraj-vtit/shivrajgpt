// components/JournalEntryForm.tsx
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function JournalEntryForm({ userId }: { userId: string }) {
  const [entry, setEntry] = useState('')
  const [status, setStatus] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!entry.trim()) return

    const { error } = await supabase.from('journal_entries').insert([
      {
        user_id: userId,
        content: entry
      }
    ])

    if (error) {
      setStatus('❌ Failed to save entry.')
      console.error(error)
    } else {
      setStatus('✅ Entry saved successfully!')
      setEntry('')
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">New Journal Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write something reflective..."
          className="w-full p-3 rounded bg-gray-800 placeholder:text-gray-400"
          rows={5}
        />
        <button
          type="submit"
          className="bg-green-600 w-full py-2 rounded hover:bg-green-500 transition"
        >
          Save Entry
        </button>
        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </div>
  )
}

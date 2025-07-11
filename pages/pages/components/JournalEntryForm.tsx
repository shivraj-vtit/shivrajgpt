import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function JournalEntryForm({ userId }: { userId: string }) {
  const [entry, setEntry] = useState('')
  const [mood, setMood] = useState('🙂')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: any) {
    e.preventDefault()
    const { error } = await supabase.from('journal_entries').insert([{ user_id: userId, content: entry, mood }])
    if (!error) {
      setEntry('')
      setMood('🙂')
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm font-medium">Mood</label>
      <select value={mood} onChange={(e) => setMood(e.target.value)} className="w-full p-2 rounded bg-gray-800 text-white">
        <option>😃</option><option>🙂</option><option>😐</option><option>😔</option><option>😢</option>
      </select>
      <label className="block text-sm font-medium mt-4">Today’s Reflection</label>
      <textarea value={entry} onChange={(e) => setEntry(e.target.value)} rows={5} className="w-full p-3 rounded bg-gray-800 text-white" required placeholder="Write your thoughts..." />
      <button type="submit" className="bg-indigo-600 py-2 px-4 rounded hover:bg-indigo-500 transition">Save Entry</button>
      {submitted && <p className="text-green-400">Entry saved successfully!</p>}
    </form>
  )
}

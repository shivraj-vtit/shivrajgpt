import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function DreamVault({ userId }: { userId: string }) {
  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('journal_entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setEntries(data || [])
        setLoading(false)
      })
  }, [userId])

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg mt-8">
      <h2 className="text-xl font-semibold mb-4">🧠 DreamVault</h2>
      {loading ? <p className="text-gray-400">Loading...</p> : entries.length === 0 ? (
        <p className="text-gray-400">No entries yet. Start journaling!</p>
      ) : (
        <div className="space-y-4 max-h-[300px] overflow-y-auto">
          {entries.map(entry => (
            <div key={entry.id} className="bg-gray-800 p-4 rounded">
              <p className="text-sm text-gray-400">{new Date(entry.created_at).toLocaleString()}</p>
              <p className="mt-2">{entry.content}</p>
              <p className="text-sm mt-1 italic text-indigo-400">Mood: {entry.mood}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

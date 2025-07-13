import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function DreamVault({ userId }: { userId: string }) {
  const [entries, setEntries] = useState<any[]>([])

  useEffect(() => {
    async function fetchEntries() {
      const { data, error } = await supabase
        .from('dream_entries')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setEntries(data)
      }
    }

    fetchEntries()
  }, [userId])

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Your Dream Vault</h2>
      {entries.length === 0 ? (
        <p className="text-gray-400">No entries yet.</p>
      ) : (
        <ul className="space-y-2">
          {entries.map((entry, index) => (
            <li key={index} className="p-3 bg-gray-800 rounded-lg">
              <p>{entry.text}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(entry.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

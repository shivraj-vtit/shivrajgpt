import { useEffect, useState } from 'react'
// ✅ Correct import path based on current deep folder structure
import { supabase } from '../../../../../../lib/supabase'

export default function DreamVault({ userId }: { userId: string }) {
  const [entries, setEntries] = useState<any[]>([])

  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from('dream_entries')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching dreams:', error)
      } else {
        setEntries(data || [])
      }
    }

    fetchEntries()
  }, [userId])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Dream Vault</h2>
      {entries.length === 0 ? (
        <p className="text-gray-400">No entries yet.</p>
      ) : (
        <ul className="space-y-3">
          {entries.map((entry, index) => (
            <li key={index} className="bg-gray-800 p-4 rounded-xl shadow">
              <p>{entry.content}</p>
              <p className="text-sm text-gray-500 mt-2">{new Date(entry.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

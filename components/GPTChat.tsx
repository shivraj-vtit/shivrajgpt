// components/GPTChat.tsx
import { useState } from 'react'
import { askShivrajGPT } from '../lib/openai'

export default function GPTChat() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    setLoading(true)
    const result = await askShivrajGPT(input)
    setResponse(result)
    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-gray-800 text-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">ShivrajGPT – Reflect with Me</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your inner coach anything..."
          className="w-full p-3 rounded bg-gray-700 placeholder:text-gray-400"
          rows={4}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 w-full py-2 rounded hover:bg-indigo-500 transition"
        >
          {loading ? 'Thinking...' : 'Ask ShivrajGPT'}
        </button>
      </form>
      {response && (
        <div className="mt-6 p-4 bg-gray-700 rounded text-sm text-indigo-100 whitespace-pre-line">
          <strong>Response:</strong><br />
          {response}
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'

export default function GPTChat() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input }),
    })
    const data = await res.json()
    setResponse(data.result)
    setLoading(false)
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Ask ShivrajGPT</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="What’s on your mind?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500"
          disabled={loading}
        >
          {loading ? 'Thinking...' : 'Ask ShivrajGPT'}
        </button>
      </form>
      {response && (
        <div className="mt-4 bg-gray-700 p-3 rounded text-white">
          <p>{response}</p>
        </div>
      )}
    </div>
  )
}

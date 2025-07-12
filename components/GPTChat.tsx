import { useState } from 'react'
import { askShivrajGPT } from '../lib/openai'

export default function GPTChat() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleAsk(e: any) {
    e.preventDefault()
    setLoading(true)
    const result = await askShivrajGPT(input)
    setResponse(result)
    setLoading(false)
  }

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl shadow-xl space-y-4">
      <form onSubmit={handleAsk} className="space-y-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          className="w-full p-3 rounded bg-gray-700 placeholder:text-gray-400"
        />
        <button type="submit" className="bg-indigo-600 w-full py-2 rounded hover:bg-indigo-500 transition">
          {loading ? 'Thinking...' : 'Ask ShivrajGPT'}
        </button>
      </form>
      {response && (
        <div className="bg-gray-800 p-4 rounded text-green-300 whitespace-pre-wrap">{response}</div>
      )}
    </div>
  )
}

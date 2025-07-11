import { useState } from 'react'
import { askShivrajGPT } from '../lib/openai'

export default function GPTChat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([])
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: any) {
    e.preventDefault()
    if (!input.trim()) return
    setMessages([...messages, { from: 'user', text: input }])
    setInput('')
    setLoading(true)
    const reply = await askShivrajGPT(input)
    setMessages([...messages, { from: 'user', text: input }, { from: 'bot', text: reply }])
    setLoading(false)
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="bg-gray-800 p-4 rounded max-h-72 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`p-2 rounded-md ${msg.from === 'user' ? 'bg-indigo-600 text-white text-right ml-auto' : 'bg-gray-700 text-left'}`}>
            {msg.text}
          </div>
        ))}
        {loading && <p className="text-sm text-gray-400 italic">ShivrajGPT is thinking...</p>}
      </div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Reflect with ShivrajGPT..." className="flex-1 p-2 rounded bg-gray-700 text-white" />
        <button type="submit" className="bg-indigo-500 px-4 py-2 rounded hover:bg-indigo-400">Send</button>
      </form>
    </div>
  )
}

import { useState } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessages([...messages, input])
    setInput('')
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        {messages.map((message, index) => (
          <div key={index} className="border p-2 mb-2">
            {message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border p-2"
        />
        <button type="submit" className="ml-2 p-2 border">
          Submit
        </button>
      </form>
    </div>
  )
}

export default App

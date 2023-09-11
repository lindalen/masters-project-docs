import { useState } from 'react'
import DarkModeToggle from './components/DarkModeToggle'
import MessageList from './components/MessageList'
import MessageInput from './components/MessageInput'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    setMessages((prevMessages) => [...prevMessages, input]);
    setInput('');
  
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input_text: input })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, data.response]);
    } catch (error) {
      console.error('Fetch Error:', error);
      setMessages((prevMessages) => [...prevMessages, 'Network error. Try again.']);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col h-4/5 w-1/2 p-4 rounded-lg shadow-lg dark:bg-gray-800 border border-gray-300 dark:border-gray-500">
        <div className="flex items-center justify-between text-gray-800 dark:text-gray-100 mb-4">
          <div className="text-xl font-bold">MediBot</div>
          <DarkModeToggle/>
        </div>
        <MessageList messages={messages} />
        <MessageInput input={input} setInput={setInput} handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default App

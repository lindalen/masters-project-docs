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
      const response = await fetch('/api/chat', {
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

  const handleReset = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input_text: input })
      });
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      setMessages([])
      setInput("")
    } catch (error) {
      console.error('Reset Error:', error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col h-4/5 w-1/2 p-4 rounded-lg shadow-lg dark:bg-gray-800 border border-gray-300 dark:border-gray-500">
        <div className="flex items-center justify-between text-gray-800 dark:text-gray-100 mb-4">
          <div className="text-xl font-bold">MediBot</div>
          <div className="flex flex-row gap-x-4">
          <button 
          className="bg-blue-500 dark:bg-transparent border-1 border-blue-500 hover:bg-blue-500 hover:border-white text-white py-2 px-4 rounded-full text-sm font-medium"
          onClick={handleReset}>
            Reset
          </button>
            <DarkModeToggle/>
          </div>
          
        </div>
        <MessageList messages={messages} />
        <MessageInput input={input} setInput={setInput} handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default App

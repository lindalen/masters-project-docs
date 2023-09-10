import React from 'react';

const MessageInput = ({ input, setInput, handleSubmit }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow p-2 border-2 border-gray-300 dark:border-gray-500 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 resize-y focus:outline-none focus:border-blue-400 dark:focus:border-blue-600"
        placeholder="Type your message here..."
      />
      <button type="submit" className="ml-2 p-2 bg-blue-400 dark:bg-blue-600 text-white self-end rounded-md hover:bg-blue-500 dark:hover:bg-blue-700">
        Send
      </button>
    </form>
  );
};

export default MessageInput;
import React, { useEffect, useRef } from 'react';

const MessageList = ({ messages }) => {
  const messageListRef = useRef(null);

  useEffect(() => {
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages]);

  return (
    <div ref={messageListRef} className="flex flex-col overflow-auto mb-4 flex-grow text-gray-800 dark:text-gray-100">
      {messages.map((message, index) => (
        <div className={`flex  ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`} key={index}>
          <fieldset className={`flex max-w-[50%] p-2 m-2 rounded ${index % 2 === 0 ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white dark:bg-gray-700'} `}>
            <legend className={index % 2 === 0 ? 'font-bold text-blue-500' : 'font-bold text-gray-400'}>{index % 2 === 0 ? 'You' : 'MediBot'}</legend>
            <div className="chat-bubble">{message}</div>
          </fieldset>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
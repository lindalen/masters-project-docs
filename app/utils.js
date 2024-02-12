export const proxyUrl = "https://backend-7cml.onrender.com"//http://192.168.0.124:8000

export async function postChatMessage(messages, model) {
  try {
    const response = await fetch(`${proxyUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, model }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
}

export async function streamChatMessages(messages, model, onChunkReceived) {
  fetch(`${proxyUrl}/api/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, model }),
    reactNative: { textStreaming: true },
  })
  .then(response => response.body)
  .then(stream => {
    if (!stream) return;
    
    const reader = stream.getReader();
    const processChunk = ({ done, value }) => {
      if (done) {
        console.log('Stream complete');
        return;
      }
      // Process the chunk
      const textChunk = new TextDecoder().decode(value);
      console.log(textChunk); // Update Zustand store or component state here
      
      // Read the next chunk
      reader.read().then(processChunk);
    };

    // Start reading the stream
    reader.read().then(processChunk);
  })
  .catch(error => {
    console.error('Error while streaming messages:', error);
  });
}

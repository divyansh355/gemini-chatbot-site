import React, { useState } from 'react';
import axios from 'axios';
import Markdown from 'markdown-to-jsx';
import CodeBlock from './components/CodeBlock'; 
import TypingEffect from './components/TypingEffect'; 

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [isTyping, setIsTyping] = useState(false); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsTyping(true); 
    try {
      const response = await axios.post(`${apiUrl}/chat`, { query });
      setResult(response.data.result);
      setIsTyping(false); 
    } catch (error) {
      console.error('Error fetching command:', error);
      setResult('Error fetching command');
      setIsTyping(false);
    }
  };

  return (
    <div className="App min-h-screen w-full flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-6 animate-bounce">Chatbot</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md">
        <label htmlFor="query" className="block text-gray-300 text-sm font-bold mb-2">Enter your query:</label>
        <input
          type="text"
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">Send</button>
      </form>
      <div
        id="result"
        className="mt-6 w-full max-w-md bg-gray-800 text-white p-4 rounded-lg shadow-md transition-opacity duration-500 ease-in-out"
        style={{ maxHeight: '80vh', overflowY: 'auto', minHeight: '100px', height: 'auto' }}
      >
        {isTyping ? (
          <TypingEffect text={result} />
        ) : (
          <Markdown
            options={{
              overrides: {
                code: {
                  component: CodeBlock,
                },
              },
            }}
          >
            {result}
          </Markdown>
        )}
      </div>
    </div>
  );
}

export default App;

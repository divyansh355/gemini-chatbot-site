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

      {/* Github Button */}
      <a href="https://github.com/divyansh355/gemini-chatbot-site">
        <div className='z-10 absolute top-6 right-3'>
          <section class="flex justify-center items-center">
            <button
              class="group flex justify-center p-2 rounded-md drop-shadow-xl bg-gradient-to-r from-gray-800 to-black text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
              href="/"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 15 15"
                class="w-5"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  fill="currentColor"
                  d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
                ></path>
              </svg>
              <span
                class="absolute opacity-0 group-hover:opacity-100 group-hover:text-white group-hover:text-sm group-hover:-translate-y-10 duration-700"
              >
                GitHub
              </span>
            </button>
          </section>
        </div>
      </a>


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

import React, { useState } from 'react';
import { FaRegClipboard } from 'react-icons/fa';

const CodeBlock = ({ children }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code', err);
    }
  };

  return (
    <div className="relative">
      <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto whitespace-pre-wrap max-w-full" style={{ wordWrap: 'break-word' }}>
        <code className="whitespace-pre-wrap">{children}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 text-white bg-gray-700 hover:bg-gray-600 rounded px-2 py-1 text-sm"
      >
        {copied ? 'Copied!' : <FaRegClipboard />}
      </button>
    </div>
  );
};

export default CodeBlock;
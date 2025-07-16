import React, { useState } from 'react';

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! I’m GemGem, your jewelry assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMsg = { role: 'assistant', text: data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Something went wrong. Please try again.' }]);
    }

    setInput('');
  };

  return (
    <div>
      <div className="h-80 overflow-y-auto border p-4 mb-4 rounded-lg bg-gray-50 space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`text-sm ${msg.role === 'user' ? 'text-right text-rose-800' : 'text-left text-gray-700'}`}>
            <span className="block px-3 py-2  rounded-lg inline-block bg-white shadow">{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
  className="flex-1 border border-black text-black rounded-lg px-4 py-2 text-sm"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') sendMessage();
  }}
  placeholder="Ask about diamonds, rings, or gold..."
/>


        <button onClick={sendMessage} className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 text-sm">
          Send
        </button>
      </div>
    </div>
  );
}

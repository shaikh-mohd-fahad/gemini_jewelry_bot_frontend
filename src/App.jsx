import React from 'react';
import ChatBox from './components/ChatBox';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-rose-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-rose-600 mb-4 text-center">💎 GemGem - Jewelry Assistant</h1>
        <ChatBox />
      </div>
    </div>
  );
}

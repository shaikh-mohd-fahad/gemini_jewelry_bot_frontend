import React from 'react';
import ChatBox from './components/ChatBox';

export default function App() {
  return (
    <div className="min-h-screen min-w-screen h-screen bg-gradient-to-br from-white to-rose-100 flex items-center justify-center p-4">
      <div className="w-full h-full bg-white shadow-2xl rounded-none p-6">
        <h1 className="text-3xl font-bold text-rose-600 mb-4 text-center">💎 GemGem - Jewelry Assistant</h1>
        <h2 className="text-2xl font-bold text-black mb-4 text-center">Created by DigTize</h2>
        <ChatBox />
      </div>
    </div>
  );
}

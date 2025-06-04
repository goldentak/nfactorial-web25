// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';
import ChatList from './components/ChatList';
import { useChats } from './utils/useChats';

function HomeWelcome() {
    return (
        <div className="flex-1 flex items-center justify-center text-gray-600">
            Выберите чат слева
        </div>
    );
}

function Layout() {
    const { chats, addChat } = useChats();
    const [newChatName, setNewChatName] = useState('');
    const navigate = useNavigate();

    const createChat = () => {
        const name = newChatName.trim();
        if (name) {
            const chatId = addChat(name);
            setNewChatName('');
            navigate(`/chat/${chatId}`);
        }
    };

    return (
        <div className="flex h-screen bg-[#2F55B7] p-6">
            <aside className="w-80 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">Чаты</h2>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Название чата"
                            value={newChatName}
                            onChange={e => setNewChatName(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && createChat()}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 outline-none"
                        />
                        <button
                            onClick={createChat}
                            className="w-10 h-10 flex items-center justify-center bg-[#E273A9] text-white rounded-xl hover:bg-[#d96194] transition"
                        >
                            +
                        </button>
                    </div>
                </div>
                <ChatList chats={chats} />
            </aside>

            {/* Основная область чата "островок" */}
            <div className="flex-1 ml-6 flex flex-col bg-[#F4F7FE] rounded-2xl shadow-2xl overflow-hidden">
                <Routes>
                    <Route path="/" element={<HomeWelcome />} />
                    <Route path="/chat/:chatId" element={<Chat />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}

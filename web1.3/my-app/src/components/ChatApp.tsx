import { Routes, Route } from 'react-router-dom';
import './ChatApp.css';
import Sidebar from './Sidebar';
import ChatView from './ChatView';
import { useEffect, useState } from 'react';

const LOCAL_CHATS_KEY = 'chat';

const ChatApp: React.FC = () => {
    const [allChats, setAllChats] = useState<string[]>(() => {
        const saved = localStorage.getItem(LOCAL_CHATS_KEY);
        return saved ? JSON.parse(saved) : ['zhibek', 'askar', 'team-project'];
    });

    const [search, setSearch] = useState('');
    const filteredChats = allChats.filter(c =>
        c.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        localStorage.setItem(LOCAL_CHATS_KEY, JSON.stringify(allChats));
    }, [allChats]);

    const handleCreate = (name: string) => {
        if (!name.trim()) return;
        const updated = [name, ...allChats.filter(c => c !== name)];
        setAllChats(updated);
    };

    const handleSearch = (query: string) => {
        setSearch(query);
    };

    return (
        <div className="container">
            <Sidebar
                chats={filteredChats}
                onCreate={handleCreate}
                onSearch={handleSearch}
            />
            <div className="chat">
                <Routes>
                    <Route path="/" element={<div>Select a chat</div>} />
                    <Route path="/chat/:chatId" element={<ChatView />} />
                </Routes>
            </div>
        </div>
    );
};

export default ChatApp;

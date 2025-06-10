import { Routes, Route } from 'react-router-dom';
import './ChatApp.css';
import Sidebar from './Sidebar';
import ChatView from './ChatView';
import { useEffect } from 'react';
import chatStore from '../stores/ChatStore';
import { useStore } from '@tanstack/react-store';

const LOCAL_CHATS_KEY = 'chat';

const ChatApp: React.FC = () => {
    const chats = useStore(chatStore, s => s.chats);
    const search = useStore(chatStore, s => s.search);

    const filteredChats = chats.filter((c: string) =>
        c.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_CHATS_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                chatStore.setState(prev => ({
                    ...prev,
                    chats: parsed,
                }));
            } catch (e) {
                console.error('Failed to parse localStorage chats:', e);
            }
        }
    }, []);

    const handleCreate = (name: string) => {
        if (!name.trim()) return;
        const updated = [name, ...chats.filter((c: string) => c !== name)];
        chatStore.setState(prev => ({
            ...prev,
            chats: updated,
        }));
    };

    const handleSearch = (query: string) => {
        chatStore.setState(prev => ({
            ...prev,
            search: query,
        }));
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

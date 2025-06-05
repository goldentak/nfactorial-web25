// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
    chats: string[];
    onCreate: (name: string) => void;
    onSearch: (query: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chats, onCreate, onSearch }) => {
    const [newChat, setNewChat] = React.useState('');
    const [search, setSearch] = React.useState('');

    return (
        <div className="sidebar">
            <input
                value={newChat}
                onChange={e => setNewChat(e.target.value)}
                placeholder="New chat name"
            />
            <button onClick={() => {
                onCreate(newChat);
                setNewChat('');
            }}>
                Create
            </button>

            <input
                value={search}
                onChange={e => {
                    setSearch(e.target.value);
                    onSearch(e.target.value);
                }}
                placeholder="Search..."
            />
            <div className="chats">
                {chats.map(name => (
                    <Link key={name} to={`/chat/${name}`} className="chatItem">
                        {name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;

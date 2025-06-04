import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Chat } from '../types';

interface ChatListProps {
    chats: Chat[];
}

export default function ChatList({ chats }: ChatListProps) {
    const [search, setSearch] = useState('');
    const filtered = search
        ? chats.filter((chat) => chat.name.toLowerCase().includes(search.toLowerCase()))
        : chats;

    return (
        <div className="flex flex-col h-full">
            <div className="p-2 border-b">
                <input
                    type="text"
                    placeholder="Поиск чатов..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none"
                />
            </div>

            <ul className="flex-1 overflow-y-auto bg-white">
                {filtered.map((chat) => (
                    <li key={chat.id}>
                        <Link
                            to={`/chat/${chat.id}`}
                            className="flex items-center px-4 py-3 hover:bg-gray-100 border-b"
                        >
                            <div className="flex-grow">
                            <p className="font-medium">
  {chat.name.length > 30 ? chat.name.slice(0, 30) + '…' : chat.name}
</p>

                                {chat.messages.length > 0 && (
                                    <p className="text-sm text-gray-500 truncate max-h-[3rem] overflow-hidden">
                                    {chat.messages[chat.messages.length - 1].text.length > 40
                                      ? chat.messages[chat.messages.length - 1].text.slice(0, 40) + '…'
                                      : chat.messages[chat.messages.length - 1].text}
                                  </p>

                                )}
                            </div>
                        </Link>
                    </li>
                ))}
                {filtered.length === 0 && (
                    <li className="p-4 text-center text-gray-500">
                        Нет чатов по запросу
                    </li>
                )}
            </ul>
        </div>
    );
}

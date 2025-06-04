import { useState, useEffect } from 'react';
import { Chat, Message } from '../types';
import { v4 as uuid } from 'uuid';

export function useChats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      const data = localStorage.getItem('chats');
      setChats(data ? JSON.parse(data) : [{ id: uuid(), name: 'AI Bot', messages: [] }]);
      setInitialized(true);
    }
  }, [initialized]);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('chats', JSON.stringify(chats));
    }
  }, [chats, initialized]);

  const getChatById = (id: string) => chats.find(chat => chat.id === id);

  const addChat = (name: string) => {
    const newChat = { id: uuid(), name, messages: [] };
    setChats(prev => [newChat, ...prev]);
    return newChat.id;
  };

  const addMessage = (chatId: string, message: Message) => {
    setChats(prev =>
        prev.map(chat =>
            chat.id === chatId
                ? { ...chat, messages: [...chat.messages, message] }
                : chat
        )
    );
  };

  return { chats, getChatById, addChat, addMessage };
}

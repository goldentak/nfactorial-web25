import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { sendToOpenAI } from '../utils/sendToOpenAi';
import messageStore from '../stores/MessageStore';
import { useStore } from '@tanstack/react-store';


interface Message {
    text: string;
    fromUser: boolean;
}

const LOCAL_MSG_PREFIX = 'chat/';

export default function ChatView() {
    const { chatId } = useParams<{ chatId: string }>();
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const messages = useStore(messageStore, s => s.messagesByChat[chatId ?? ''] || []);


    useEffect(() => {
        if (!chatId) return;
        try {
            const saved = localStorage.getItem(`${LOCAL_MSG_PREFIX}${chatId}`);
            const parsed = saved ? JSON.parse(saved) : [];
            messageStore.setState(prev => ({
                messagesByChat: {
                    ...prev.messagesByChat,
                    [chatId]: parsed,
                }
            }));
        } catch {
            console.log("Error loading localStorage for chat:", chatId);
        }
        setInput('');
    }, [chatId]);

    useEffect(() => {
        if (!chatId) return;
        try {
            localStorage.setItem(`${LOCAL_MSG_PREFIX}${chatId}`, JSON.stringify(messages));
        } catch {}
    }, [messages, chatId]);

    const handleSend = async () => {
        if (!input.trim() || !chatId) return;
        const userMsg: Message = { text: input, fromUser: true };

        messageStore.setState(prev => ({
            messagesByChat: {
                ...prev.messagesByChat,
                [chatId]: [...(prev.messagesByChat[chatId] || []), userMsg]
            }
        }));

        setInput('');
        setLoading(true);

        try {
            const response = await sendToOpenAI(input);
            const botMsg: Message = { text: response, fromUser: false };

            messageStore.setState(prev => ({
                messagesByChat: {
                    ...prev.messagesByChat,
                    [chatId]: [...(prev.messagesByChat[chatId] || []), botMsg]
                }
            }));
        } catch {
            const errorMsg: Message = {
                text: '❌ API Bad Request. Please try again.',
                fromUser: false,
            };
            messageStore.setState(prev => ({
                messagesByChat: {
                    ...prev.messagesByChat,
                    [chatId]: [...(prev.messagesByChat[chatId] || []), errorMsg]
                }
            }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chatView">
            <div className="messages">
                {messages.map((msg, i) => (
                    <div key={i} className={`messageBubble ${msg.fromUser ? 'user' : 'other'}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="inputArea">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type a message..."
                    disabled={loading}
                />
                <button onClick={handleSend} disabled={loading}>
                    {loading ? '...' : 'Send'}
                </button>
            </div>
        </div>
    );
}

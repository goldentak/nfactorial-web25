import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { sendToOpenAI } from '../utils/sendToOpenAi';

interface Message {
    text: string;
    fromUser: boolean;
}

const LOCAL_MSG_PREFIX = 'chat/';

export default function ChatView() {
    const { chatId } = useParams<{ chatId: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (!chatId) return;
        console.log(`${LOCAL_MSG_PREFIX}${chatId}`);
        try {
            const saved = localStorage.getItem(`${LOCAL_MSG_PREFIX}${chatId}`);
            setMessages(saved ? JSON.parse(saved) : []);
        } catch {
            console.log(chatId + " nweionrioginoerginogr");
            // setMessages([]);
        }
        setInput('');
    }, []);

    useEffect(() => {
        if (!chatId) return;
        try {
            console.log(messages)
            localStorage.setItem(`${LOCAL_MSG_PREFIX}${chatId}`, JSON.stringify(messages));
            console.log(messages)
        } catch {}
    }, [messages, chatId]);

    const handleSend = async () => {
        if (!input.trim() || !chatId) return;
        const userMsg: Message = { text: input, fromUser: true };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await sendToOpenAI(input);
            setMessages(prev => [...prev, { text: response, fromUser: false }]);
        } catch (err) {
            setMessages(prev => [
                ...prev,
                { text: '❌ API Bad Request. Please try again.', fromUser: false }
            ]);
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

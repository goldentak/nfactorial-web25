import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChats } from '../utils/useChats';
import MessageBubble from '../components/MessageBubble';
import { sendToGemini } from '../utils/api';

export default function Chat() {
    const { chatId } = useParams();
    const navigate = useNavigate();
    const { getChatById, addMessage } = useChats();
    const currentChat = chatId ? getChatById(chatId) : null;
    const [input, setInput] = useState('');
    const messagesEnd = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentChat?.messages]);

    if (!currentChat) {
        return (
            <div className="flex-1 flex items-center justify-center font-sans text-white text-2xl">
                Чат не найден
            </div>
        );
    }

    const handleSend = async () => {
        const text = input.trim();
        if (!text) return;
        setInput('');

        const userMessage = { id: Date.now().toString(), from: 'user' as const, text, timestamp: Date.now() };
        addMessage(currentChat.id, userMessage);

        try {
            const reply = await sendToGemini(text);
            const botMessage = { id: (Date.now() + 1).toString(), from: 'bot' as const, text: reply, timestamp: Date.now() };
            addMessage(currentChat.id, botMessage);
        } catch {
            addMessage(currentChat.id, { id: (Date.now() + 2).toString(), from: 'bot', text: 'Ошибка API', timestamp: Date.now() });
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#F4F7FE] rounded-3xl shadow-inner font-sans overflow-hidden">
            <div className="bg-white px-8 py-6 flex justify-between items-center rounded-t-3xl shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800">{currentChat.name}</h2>
                <button
                    onClick={() => navigate('/')}
                    className="text-[#2F55B7] font-medium text-lg hover:underline"
                >
                    Назад
                </button>
            </div>
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
                {currentChat.messages.map(msg => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}
                <div ref={messagesEnd} />
            </div>
            <div className="bg-white px-8 py-6 flex items-center rounded-b-3xl shadow-lg">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Введите сообщение..."
                    className="flex-1 border border-gray-300 rounded-3xl px-6 py-3 text-lg focus:ring-2 focus:ring-blue-200 outline-none"
                />
                <button
                    onClick={handleSend}
                    className="ml-6 bg-[#E273A9] text-white text-lg px-6 py-3 rounded-3xl hover:bg-[#d96194] transition"
                >
                    Отправить
                </button>
            </div>
        </div>
    );
}

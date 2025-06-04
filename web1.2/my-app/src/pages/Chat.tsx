import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useChats } from "../utils/useChats";
import MessageBubble from "../components/MessageBubble";
import { sendToGemini } from "../utils/api";

export default function Chat() {
    const { chatId } = useParams();
    const navigate = useNavigate();
    const { getChatById, addMessage } = useChats();
    const currentChat = chatId ? getChatById(chatId) : null;
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [currentChat?.messages]);

    const handleSend = async () => {
        const text = input.trim();
        if (!text) return;
        setInput("");

        const userMessage = {
            id: Date.now().toString(),
            from: "user" as const,
            text,
            timestamp: Date.now(),
        };
        addMessage(currentChat!.id, userMessage);

        try {
            const reply = await sendToGemini(text);
            const botMessage = {
                id: (Date.now() + 1).toString(),
                from: "bot" as const,
                text: reply,
                timestamp: Date.now(),
            };
            addMessage(currentChat!.id, botMessage);
        } catch {
            addMessage(currentChat!.id, {
                id: (Date.now() + 2).toString(),
                from: "bot",
                text: "Ошибка API",
                timestamp: Date.now(),
            });
        }
    };

    if (!currentChat) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 font-sans">
                <div className="text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg
                            className="w-10 h-10 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Чат не найден</h2>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl transition"
                    >
                        Вернуться к списку
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-blue-50 font-sans">
            <div className="flex items-center justify-between px-6 py-4 bg-white rounded-xl shadow-md border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-lg">
              {currentChat.name.charAt(0).toUpperCase()}
            </span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">{currentChat.name}</h2>
                        <p className="text-sm text-green-500 flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            Онлайн
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => navigate("/")}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                    <svg
                        className="w-6 h-6 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="max-w-3xl mx-auto space-y-6">
                    {currentChat.messages.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-blue-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">Начните беседу</h3>
                            <p className="text-gray-500">Отправьте сообщение, чтобы начать</p>
                        </div>
                    ) : (
                        currentChat.messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="px-6 py-4 bg-white rounded-b-xl shadow-inner border-t border-gray-200">
                <div className="max-w-3xl mx-auto flex items-center space-x-4">
          <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())
              }
              placeholder="Введите сообщение..."
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={1}
          />
                    <button
                        onClick={handleSend}
                        className="bg-[#E273A9] hover:bg-[#d96194] text-white px-6 py-3 text-lg rounded-2xl transition"
                    >
                        Отправить
                    </button>
                </div>
            </div>
        </div>
    );
}

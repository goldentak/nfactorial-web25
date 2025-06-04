import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
    message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.from === 'user';
    const baseClass = 'px-4 py-3 rounded-2xl max-w-xs break-words shadow-sm';
    const styleClass = isUser
        ? 'bg-[#E273A9] text-white self-end rounded-br-none'
        : 'bg-white text-gray-900 self-start rounded-bl-none';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
            <div className={`${baseClass} ${styleClass}`}>{message.text}</div>
        </div>
    );
}

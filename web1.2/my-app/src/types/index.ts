export interface Message {
    id: string;
    from: 'user' | 'bot';
    text: string;
    timestamp: number;
}

export interface Chat {
    id: string;
    name: string;
    messages: Message[];
}
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function sendToGemini(prompt: string): Promise<string> {
    const res = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        { text: prompt }
                    ]
                }
            ]
        }),
    });

    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Нет ответа от ИИ.';
}
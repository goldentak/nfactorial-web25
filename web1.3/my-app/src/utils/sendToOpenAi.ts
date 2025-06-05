const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const MODEL = 'gpt-3.5-turbo';

export async function sendToOpenAI(prompt: string): Promise<string> {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: MODEL,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
        }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`OpenAI API error: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    return data?.choices?.[0]?.message?.content || 'No response from OpenAI.';
}

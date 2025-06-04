# AI Chat Frontend

Deploy: https://nfactorial-web25-eku6.vercel.app/

## Features
React + TypeScript + Vite

TailwindCSS for UI

Gemini 2.0 Flash model for AI responses

localStorage chat persistence

Chat list with search

## Installation
Clone the repo:
``` bash
git clone https://github.com/your-username/gemini-chat-app.git
cd my-app
````

Install dependencies:
```bash
npm install
````

write your own api key in a .env file:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

Run the app:
``` bash
npm run dev
````

## Example Gemini API Usage
Internally, the app sends prompts using:
``` ts
fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
 contents: [
  {
   parts: [
    { text: "Your prompt here" }
   ]
  }
 ]
})
})
```

🗂 Project Structure
src/pages/Chat.tsx — main chat screen

src/components/ChatList.tsx — chat list sidebar

src/utils/api.ts — handles Gemini API requests

src/utils/useChats.ts — localStorage + chat logic

src/types.ts — type definitions


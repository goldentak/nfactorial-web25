# Web 1.5 (RealTime db Game)
A simple real-time multiplayer pixel game built with React, TypeScript, and Firebase Realtime Database.

## How it works
Players control a small square using W/A/S/D keys.

Each player gets a random color and unique ID.

Player positions sync in real time using Firebase.

On exit, the player's data is automatically removed.

## Features
Real-time multiplayer

Live player list with colors and names

Simple UI with keyboard movement

## Stack
React + Vite

TypeScript

Firebase Realtime Database

## Getting started
```bash
npm install
npm run dev
`````

Open http://localhost:5173 in your browser.

### Project structure
```plaintext
my-app/
├─ public/
├─ src/
│ ├─ components/  GameField, PlayerList, LoginForm
│ ├─ hooks/  usePlayerMovement, useRealtimePlayers
│ ├─ services/  firebase.ts
│ └─ App.tsx
├─ index.html
├─ package.json
├─ vite.config.ts
└─ tsconfig.json
````
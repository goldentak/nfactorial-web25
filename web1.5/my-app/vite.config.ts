import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { getDatabase, ref, child, get, update } from 'firebase/database';

export default defineConfig({
    plugins: [react()]
});

import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_DATABASE_URL,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export const playersRef = ref(db, 'players');

export function updatePlayerPosition(playerId: string, newX: number, newY: number) {
    const playerRef = child(playersRef, playerId);
    update(playerRef, { x: newX, y: newY })
        .then(() => console.log('Position updated successfully'))
        .catch((error) => console.error('Error updating position: ', error));
}

export function getPlayer(playerId: string) {
    const playerRef = child(playersRef, playerId);
    return get(playerRef)
        .then((snapshot) => snapshot.val())
        .catch((error) => {
            console.error('Error getting player: ', error);
            return null;
        });
}
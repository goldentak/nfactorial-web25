import { useEffect } from 'react';
import { playersRef } from '../services/firebase';
import { child, get, update } from 'firebase/database';

export default function usePlayerMovement(playerId: string) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const refp = child(playersRef, playerId);
            get(refp).then(snap => {
                const p = snap.val();
                if (!p) return;
                let { x, y } = p;
                switch (e.key.toLowerCase()) {
                    case 'w': y = Math.max(0, y - 1); break;
                    case 's': y = Math.min(600 - 16, y + 1); break;
                    case 'a': x = Math.max(0, x - 1); break;
                    case 'd': x = Math.min(800 - 16, x + 1); break;
                }
                update(refp, { x, y });
            });
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [playerId]);
}

import { useState, useEffect } from 'react';
import type { DataSnapshot } from 'firebase/database';
import { playersRef } from '../services/firebase';
import { onValue, off } from 'firebase/database';

interface Player { id: string; name: string; color: string; x: number; y: number; }

export default function useRealtimePlayers(): Record<string, Player> {
    const [players, setPlayers] = useState<Record<string, Player>>({});

    useEffect(() => {
        const unsubscribe = onValue(playersRef, (snapshot: DataSnapshot) => {
            setPlayers(snapshot.val() || {});
        });
        return () => off(playersRef);
    }, []);

    return players;
}

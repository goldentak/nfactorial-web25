import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LoginForm from './components/LoginForm';
import GameField from './components/GameField';
import PlayerList from './components/PlayerList';
import { playersRef } from './services/firebase';
import { set, onDisconnect, child } from 'firebase/database';

export default function App() {
  const [playerId, setPlayerId] = useState<string | null>(null);

  const handleLogin = (name: string) => {
    const id = uuidv4();
    setPlayerId(id);
    const color = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
    const x = 400;
    const y = 300;
    const playerNode = child(playersRef, id);
    set(playerNode, { id, name, color, x, y });
    onDisconnect(playerNode).remove();
  };

  return (
      <>
        {!playerId ? (
            <LoginForm onLogin={handleLogin} />
        ) : (
            <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  padding: '32px',
                  gap: '32px',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  backgroundColor: '#121212',
                  minHeight: '100vh',
                }}
            >
              <div style={{ transform: 'translateX(-40px)' }}>
                <GameField playerId={playerId} />
              </div>
              <div style={{ padding: '16px', backgroundColor: '#1e1e1e', borderRadius: '12px', minWidth: '200px', color: 'white' }}>
                <h2 style={{ marginBottom: '12px', fontSize: '18px', borderBottom: '1px solid #444', paddingBottom: '6px' }}>Players</h2>
                <PlayerList />
              </div>
            </div>
        )}
      </>
  );
}
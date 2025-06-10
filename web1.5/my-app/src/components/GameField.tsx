import usePlayerMovement from '../hooks/usePlayerMovement';
import useRealtimePlayers from '../hooks/useRealtimePlayers';

export default function GameField({ playerId }: { playerId: string }) {
    usePlayerMovement(playerId);
    const players = useRealtimePlayers();

    return (
        <div className="game-field">
            {Object.values(players).map(p => (
                <div key={p.id} style={{ position: 'absolute', left: p.x, top: p.y }}>
                    <div style={{ width: 16, height: 16, backgroundColor: p.color, borderRadius: 4 }} />
                    <div style={{ color: '#fff', fontSize: 12, marginTop: 2 }}>{p.name}</div>
                </div>
            ))}
        </div>
    );
}
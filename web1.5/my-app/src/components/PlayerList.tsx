import type { FC } from 'react';
import useRealtimePlayers from '../hooks/useRealtimePlayers';

const PlayerList: FC = () => {
    const players = useRealtimePlayers();

    return (
        <div style={{ width: 200, marginLeft: 16, color: '#fff' }}>
            <h3>Players</h3>
            <table style={{ width: '100%', fontSize: 14 }}>
                <thead>
                <tr>
                    <th style={{ textAlign: 'left' }}>Color</th>
                    <th style={{ textAlign: 'left' }}>Name</th>
                </tr>
                </thead>
                <tbody>
                {Object.values(players).map((p) => (
                    <tr key={p.id}>
                        <td>
                            <span style={{ color: p.color }}>■</span>
                        </td>
                        <td>{p.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlayerList;
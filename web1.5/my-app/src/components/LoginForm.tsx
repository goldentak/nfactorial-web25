import { useState, FormEvent } from 'react';

interface Props { onLogin: (name: string) => void; }

export default function LoginForm({ onLogin }: Props) {
    const [name, setName] = useState('');
    const submit = (e: FormEvent) => {
        e.preventDefault();
        name.trim() && onLogin(name.trim());
    };

    return (
        <div
            className="login-container"
            style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#121212',
                color: '#fff',
            }}
        >
            <form
                onSubmit={submit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    backgroundColor: '#1e1e1e',
                    padding: '32px',
                    borderRadius: '12px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                }}
            >
                <h2 style={{ margin: 0 }}>Enter your nickname</h2>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    style={{
                        padding: '8px',
                        borderRadius: '6px',
                        border: '1px solid #555',
                        background: '#222',
                        color: 'white',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '8px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: '#3f51b5',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }}
                >
                    Play
                </button>
            </form>
        </div>
    );
}

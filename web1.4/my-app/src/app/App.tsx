import * as React from 'react'
import { useState, useEffect } from 'react'
import { ModeSwitch } from './ModeSwitch'
import { IdeaForm } from './IdeaForm'
import { IdeaGrid } from './IdeaGrid'
import './App.css'

const App: React.FC = () => {
    const [mode, setMode] = useState(false)
    const [filter, setFilter] = useState<'date' | 'likes'>('date') // фильтр

    useEffect(() => {
        const saved = localStorage.getItem('theme-mode')
        if (saved === 'dark') setMode(true)
    }, [])

    useEffect(() => {
        localStorage.setItem('theme-mode', mode ? 'dark' : 'light')
    }, [mode])

    return (
        <div className={mode ? 'dark' : 'light'}>
            <ModeSwitch mode={mode} setMode={setMode} />
            <h2 className="app-heading">🚀 Product Feedback Board</h2>

            <div className="filter-buttons">
                <button
                    className={filter === 'date' ? 'active' : ''}
                    onClick={() => setFilter('date')}
                >
                    Sort by data
                </button>
                <button
                    className={filter === 'likes' ? 'active' : ''}
                    onClick={() => setFilter('likes')}
                >
                    Sort by likes
                </button>
            </div>

            <IdeaForm />
            <IdeaGrid mode={mode} filter={filter} />
        </div>
    )
}

export default App

import * as React from 'react'

interface ModeSwitchProps {
    mode: boolean
    setMode: (v: boolean) => void
}

export const ModeSwitch: React.FC<ModeSwitchProps> = ({ mode, setMode }) => {
    return (
        <button className="mode-switch" onClick={() => setMode(!mode)}>
            {mode ? ' Dark Mode' : ' Light Mode'}
        </button>
    )
}
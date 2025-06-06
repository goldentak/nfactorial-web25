import * as React from 'react'
import { useState } from 'react'
import { useFeedbackStore } from './store'

export const IdeaForm: React.FC = () => {
    const [text, setText] = useState('')
    const addIdea = useFeedbackStore((state) => state.addIdea)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (text.trim().length === 0) return
        addIdea(text.trim())
        setText('')
    }

    return (
        <form className="idea-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Input a new idea..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="idea-input"
            />
            <button type="submit" className="idea-submit">
                Add
            </button>
        </form>
    )
}
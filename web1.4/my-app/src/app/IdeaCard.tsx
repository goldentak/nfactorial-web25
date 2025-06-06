import * as React from 'react'
import { useState } from 'react'
import { useFeedbackStore, Idea } from './store'

interface IdeaCardProps {
    idea: Idea
    mode: boolean
}

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea, mode }) => {
    const { likeIdea, dislikeIdea, updateIdea } = useFeedbackStore()
    const voted = localStorage.getItem(`vote-${idea.id}`)

    // Состояние для модалки редактирования
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(idea.text)

    const handleSave = () => {
        if (editText.trim().length > 0) {
            updateIdea(idea.id, editText.trim())
        }
        setIsEditing(false)
    }

    return (
        <div className={`card ${mode ? 'dark-card' : 'light-card'}`}>
            <p className="card-text">{idea.text}</p>
            <div className="card-buttons">
                <button onClick={() => likeIdea(idea.id)} disabled={!!voted}>
                    like {idea.likes}
                </button>
                <button onClick={() => dislikeIdea(idea.id)} disabled={!!voted}>
                    dislike {idea.dislikes}
                </button>
                <button onClick={() => setIsEditing(true)}>
                    edit
                </button>
            </div>

            {isEditing && (
                <div className="modal-overlay">
                    <div className={`modal ${mode ? 'dark-modal' : 'light-modal'}`}>
                        <h3>edit idea</h3>
                        <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="edit-textarea"
                        />
                        <div className="modal-buttons">
                            <button onClick={handleSave}>save</button>
                            <button onClick={() => setIsEditing(false)}>exit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

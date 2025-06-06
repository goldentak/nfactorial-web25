import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

export interface Idea {
    id: string
    text: string
    likes: number
    dislikes: number
    createdAt: number
}

export interface FeedbackStore {
    ideas: Idea[]
    likeIdea: (id: string) => void
    dislikeIdea: (id: string) => void
    addIdea: (text: string) => void
    updateIdea: (id: string, newText: string) => void
}

const loadIdeas = (): Idea[] => {
    try {
        const raw = localStorage.getItem('ideas')
        if (!raw) return []
        return JSON.parse(raw) as Idea[]
    } catch {
        return []
    }
}

export const useFeedbackStore = create<FeedbackStore>((set) => ({
    ideas:
        loadIdeas().length > 0
            ? loadIdeas()
            : [
                {
                    id: '1',
                    text: 'Add dark mode',
                    likes: 0,
                    dislikes: 0,
                    createdAt: Date.now() - 1000000,
                },
                {
                    id: '2',
                    text: 'Make mobile version',
                    likes: 0,
                    dislikes: 0,
                    createdAt: Date.now() - 500000,
                },
            ],

    likeIdea: (id) => {
        if (localStorage.getItem(`vote-${id}`)) return
        localStorage.setItem(`vote-${id}`, 'like')

        set((state) => {
            const newIdeas = state.ideas.map((idea) =>
                idea.id === id ? { ...idea, likes: idea.likes + 1 } : idea
            )
            localStorage.setItem('ideas', JSON.stringify(newIdeas))
            return { ideas: newIdeas }
        })
    },

    dislikeIdea: (id) => {
        if (localStorage.getItem(`vote-${id}`)) return
        localStorage.setItem(`vote-${id}`, 'dislike')

        set((state) => {
            const newIdeas = state.ideas.map((idea) =>
                idea.id === id ? { ...idea, dislikes: idea.dislikes + 1 } : idea
            )
            localStorage.setItem('ideas', JSON.stringify(newIdeas))
            return { ideas: newIdeas }
        })
    },

    addIdea: (text) => {
        const newIdea: Idea = {
            id: uuidv4(),
            text,
            likes: 0,
            dislikes: 0,
            createdAt: Date.now(),
        }
        set((state) => {
            const newIdeas = [...state.ideas, newIdea]
            localStorage.setItem('ideas', JSON.stringify(newIdeas))
            return { ideas: newIdeas }
        })
    },

    updateIdea: (id, newText) => {
        set((state) => {
            const newIdeas = state.ideas.map((idea) =>
                idea.id === id ? { ...idea, text: newText } : idea
            )
            localStorage.setItem('ideas', JSON.stringify(newIdeas))
            return { ideas: newIdeas }
        })
    },
}))

import * as React from 'react'
import { useFeedbackStore, Idea } from './store'
import { IdeaCard } from './IdeaCard'
import { AnimatePresence, motion } from 'framer-motion'

interface IdeaGridProps {
    mode: boolean
    filter: 'date' | 'likes'
}

export const IdeaGrid: React.FC<IdeaGridProps> = ({ mode, filter }) => {
    const ideas = useFeedbackStore((state) => state.ideas)

    const sorted = React.useMemo(() => {
        const copy = [...ideas]
        if (filter === 'date') {
            return copy.sort((a, b) => b.createdAt - a.createdAt)
        } else {
            return copy.sort((a, b) => b.likes - a.likes)
        }
    }, [ideas, filter])

    return (
        <div className="grid-container">
            <AnimatePresence>
                {sorted.map((idea) => (
                    <motion.div
                        key={idea.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        layout
                    >
                        <IdeaCard idea={idea} mode={mode} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

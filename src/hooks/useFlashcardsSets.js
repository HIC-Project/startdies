import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from './useAuth';

export default function useFlashcardsSets() {
    const { user } = useAuth();
    const storageKey = `FlashcardsSets_${user?.username || 'guest'}`;
    const [flashcardSets, setFlashcardSets] = useState(() => {
        const raw = localStorage.getItem(storageKey);
        return raw ? JSON.parse(raw) : [];
    });

    function persist(newSets) {
        setFlashcardSets(newSets);
        localStorage.setItem(storageKey, JSON.stringify(newSets));
    }

    function addFlashcardSet({ title, description, pairs }) {
        const newSet = {
            id: uuidv4(),
            title,
            description,
            pairs,
            dateCreated: new Date().toISOString(),
        };
        persist([...flashcardSets, newSet]);
    }

    function removeFlashcardSet(id) {
        persist(flashcardSets.filter(s => s.id !== id));
    }

    function editFlashcardSet(id, updatedTitle, updatedDescription, updatedPairs) {
        const updatedSets = flashcardSets.map(set => 
            set.id === id
                ? { ...set, title: updatedTitle, description: updatedDescription, pairs: updatedPairs }
                : set
        );
        persist(updatedSets);
    }

    return { flashcardSets, addFlashcardSet, removeFlashcardSet, editFlashcardSet };
}

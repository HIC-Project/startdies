import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from './useAuth';

export default function useStudySets() {
    const { user } = useAuth();
    const storageKey = `studySets_${user?.username || 'guest'}`;
    const [sets, setSets] = useState(() => {
        const raw = localStorage.getItem(storageKey);
        return raw ? JSON.parse(raw) : [];
    });

    function persist(newSets) {
        setSets(newSets);
        localStorage.setItem(storageKey, JSON.stringify(newSets));
    }

    function addSet({ title, pairs }) {
        const newSet = {
            id: uuidv4(),
            title,
            pairs,
            dateCreated: new Date().toISOString(),
        };
        persist([...sets, newSet]);
    }

    function removeSet(id) {
        persist(sets.filter(s => s.id !== id));
    }

    return { sets, addSet, removeSet };
}

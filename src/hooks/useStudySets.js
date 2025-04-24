import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

export default function useStudySets()
{
    const [sets, setSets] = useState(() =>
    {
        const raw = localStorage.getItem('studySets');
        return raw ? JSON.parse(raw) : [];
    });

    const persist = newSets =>
    {
        setSets(newSets);
        localStorage.setItem('studySets', JSON.stringify(newSets));
    };

    const addSet = ({title, pairs}) =>
    {
        const newSet = {
            id: uuidv4(),
            title,
            pairs,
            dateCreated: new Date().toLocaleDateString(),
        };
        persist([...sets, newSet]);
    };

    const removeSet = id =>
    {
        persist(sets.filter(s => s.id !== id));
    };

    return {sets, addSet, removeSet};
}

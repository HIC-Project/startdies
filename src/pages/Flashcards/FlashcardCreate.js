// src/pages/MatchCreate.js
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {COLORS} from '../../themes';
import useFlashcardsSets from '../../hooks/useFlashcardsSets';

export default function FlashcardsCreate()
{
    const {addSet} = useFlashcardsSets();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pairs, setPairs] = useState([{term: '', def: ''}]);

    const updatePair = (idx, field, value) =>
    {
        const copy = [...pairs];
        copy[idx][field] = value;
        setPairs(copy);
    };

    const addPair = () => setPairs([...pairs, {term: '', def: ''}]);
    const removePair = idx =>
    {
        setPairs(pairs.filter((_, i) => i !== idx));
    };

    const handleSubmit = e =>
    {
        e.preventDefault();
        addSet({title, description,pairs});
        navigate('/flashcards');
    };

    const autoPopulate = () => {
        // Example data for auto-population
        setTitle("Sample Flashcards Set");
        setDescription("This is an example description for the flashcard set.");
        setPairs([
            {term: 'Term 1', def: 'Definition 1'},
            {term: 'Term 2', def: 'Definition 2'},
            {term: 'Term 3', def: 'Definition 3'}
        ]);
    };

    return (
        <div style={styles.container}>
            
            <div style={styles.header}>
                <button onClick={() => navigate(-1)} style={styles.backButton}>
                    ←
                </button>
                <h1 style={styles.header}>Create Flashcards Set</h1>
            </div>

            <button onClick={autoPopulate} style={styles.autoPopulateBtn}>
                Auto Populate
            </button>


            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>
                    Set Title
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        style={styles.input}
                        placeholder="Enter a title for your flashcard set"
                        required
                    />
                </label>

                <label style={styles.label}>
                    Set Description
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        style={styles.input}
                        placeholder="Enter a description for your flashcard set"
                        rows="3"
                    />
                </label>

                {pairs.map((p, i) => (
                    <div key={i} style={styles.pairRow}>
                        <input
                            type="text"
                            placeholder="Term"
                            value={p.term}
                            onChange={e => updatePair(i, 'term', e.target.value)}
                            style={styles.input}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Definition"
                            value={p.def}
                            onChange={e => updatePair(i, 'def', e.target.value)}
                            style={styles.input}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => removePair(i)}
                            style={styles.removePairBtn}
                        >
                            ✕
                        </button>
                    </div>
                ))}

                <button type="button" onClick={addPair} style={styles.addPairBtn}>
                    + Add Pair
                </button>

                <button type="submit" style={styles.submitBtn}>
                    Save Set
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative'
    },
    header: {fontSize: '2.5rem', color: COLORS.teal, textAlign: 'center'},
    form: {maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem'},
    label: {display: 'flex', flexDirection: 'column', fontSize: '1rem'},
    input: {
        padding: '0.5rem',
        fontSize: '1rem',
        border: `1px solid ${COLORS.lightMint}`,
        borderRadius: '4px',
        marginTop: '0.25rem',
        flex: 1
    },
    textarea: {
        padding: '0.5rem',
        fontSize: '1rem',
        border: `1px solid ${COLORS.lightMint}`,
        borderRadius: '4px',
        marginTop: '0.25rem',
        flex: 1
    },
    pairRow: {display: 'flex', gap: '0.5rem'},
    removePairBtn: {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.2rem',
        color: COLORS.teal
    },
    addPairBtn: {
        backgroundColor: COLORS.lightMint,
        border: 'none',
        padding: '0.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
        alignSelf: 'flex-start'
    },
    submitBtn: {
        backgroundColor: COLORS.darkBlue,
        color: '#fff',
        padding: '0.75rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    backButton: {
        position: 'absolute',   
        top: '1rem',          
        left: '1rem',           
        backgroundColor: COLORS.darkBlue,
        color: '#fff',
        padding: '0.4rem 0.6rem',
        fontSize: '0.9rem',  
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        zIndex: 1000           
    }
};

// src/pages/MatchCreate.js
import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import useStudySets from '../../hooks/useStudySets';
import {COLORS} from '../../themes';
import {FiArrowLeft} from 'react-icons/fi';

export default function MatchCreate()
{
    const {addSet} = useStudySets();
    const nav = useNavigate();

    const [title, setTitle] = useState('');
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
        addSet({title, pairs});
        nav('/match');
    };

    return (
        <div style={styles.container}>
            <div style={styles.titleContainer}>
                <Link to="/match" style={styles.backButton}>
                    <FiArrowLeft size={18} />
                    <span>Back</span>
                </Link>
                <h1 style={styles.header}>Create Match Set</h1>
            </div>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>
                    Set Title
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        style={styles.input}
                        required
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
    container: {padding: '2rem'},
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        marginBottom: '1.5rem'
    },
    header: { 
        fontSize: '2.5rem', 
        color: COLORS.teal, 
        textAlign: 'center',
        flex: 1 
    },
    backButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: 'transparent',
        border: 'none',
        color: COLORS.darkBlue,
        padding: '0.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
        textDecoration: 'none'
    },
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
};
// src/pages/MatchExample.js
import React, {useState, useRef} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import useStudySets from '../../hooks/useStudySets';
import {COLORS} from '../../themes';

function shuffle(array)
{
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export default function MatchExample()
{
    const {id} = useParams();
    const navigate = useNavigate();
    const {sets} = useStudySets();
    const theSet = sets.find(s => s.id === id) || {title: '', pairs: []};
    const count = theSet.pairs.length;

    const [termOrder] = useState(() =>
        shuffle(Array.from({length: count}, (_, i) => i))
    );
    const [defOrder] = useState(() =>
        shuffle(Array.from({length: count}, (_, i) => i))
    );

    const containerRef = useRef(null);
    const termRefs = useRef({});
    const defRefs = useRef({});

    const [selectedTerm, setSelectedTerm] = useState(null);
    const [matches, setMatches] = useState({});

    const handleTermClick = origIdx =>
    {
        setSelectedTerm(origIdx);
    };

    const handleDefClick = origDefIdx =>
    {
        if (selectedTerm === null) return;

        const correct = selectedTerm === origDefIdx;
        const cRect = containerRef.current.getBoundingClientRect();
        const tRect = termRefs.current[selectedTerm].getBoundingClientRect();
        const dRect = defRefs.current[origDefIdx].getBoundingClientRect();

        const x1 = tRect.right - cRect.left;
        const y1 = tRect.top + tRect.height / 2 - cRect.top;
        const x2 = dRect.left - cRect.left;
        const y2 = dRect.top + dRect.height / 2 - cRect.top;

        setMatches(prev => ({
            ...prev,
            [selectedTerm]: {defIdx: origDefIdx, correct, x1, y1, x2, y2}
        }));

        setSelectedTerm(null);
    };

    const allCorrect =
        Object.keys(matches).length === count &&
        Object.values(matches).every(m => m.correct);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                padding: '2rem',
                minHeight: '400px'
            }}
        >
            <h1 style={styles.header}>{theSet.title}</h1>

            <svg
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none'
                }}
            >
                <defs>
                    <marker id="arrow-green" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L6,3 Z" fill={COLORS.mint}/>
                    </marker>
                    <marker id="arrow-red" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L6,3 Z" fill="#e74c3c"/>
                    </marker>
                </defs>

                {Object.entries(matches).map(([termIdx, m]) => (
                    <line
                        key={termIdx}
                        x1={m.x1} y1={m.y1}
                        x2={m.x2} y2={m.y2}
                        stroke={m.correct ? COLORS.mint : '#e74c3c'}
                        strokeWidth={2}
                        markerEnd={m.correct ? 'url(#arrow-green)' : 'url(#arrow-red)'}
                    />
                ))}
            </svg>

            <div style={styles.grid}>
                <div>
                    <h2 style={styles.colHeader}>Term</h2>
                    {termOrder.map(origIdx =>
                    {
                        const {term} = theSet.pairs[origIdx];
                        const match = matches[origIdx];
                        return (
                            <div key={origIdx} style={styles.row}>
                                <button
                                    ref={el => (termRefs.current[origIdx] = el)}
                                    onClick={() => handleTermClick(origIdx)}
                                    style={{
                                        ...styles.circle,
                                        borderColor:
                                            selectedTerm === origIdx ? COLORS.teal : COLORS.lightMint,
                                        backgroundColor: match
                                            ? (match.correct ? COLORS.mint : '#e74c3c')
                                            : 'transparent'
                                    }}
                                />
                                <span style={styles.text}>{term}</span>
                            </div>
                        );
                    })}
                </div>

                <div>
                    <h2 style={styles.colHeader}>Definition</h2>
                    {defOrder.map(origIdx =>
                    {
                        const {def} = theSet.pairs[origIdx];
                        const matched = Object.values(matches).find(m => m.defIdx === origIdx);
                        return (
                            <div key={origIdx} style={styles.row}>
                                <button
                                    ref={el => (defRefs.current[origIdx] = el)}
                                    onClick={() => handleDefClick(origIdx)}
                                    style={{
                                        ...styles.circle,
                                        borderColor: COLORS.lightMint,
                                        backgroundColor: matched
                                            ? (matched.correct ? COLORS.mint : '#e74c3c')
                                            : 'transparent'
                                    }}
                                />
                                <span style={styles.text}>{def}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {allCorrect && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h2>You Win!</h2>
                        <p>All pairs are correctly matched.</p>
                        <button
                            style={styles.modalButton}
                            onClick={() => navigate('/match')}
                        >
                            Back to Sets
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    header: {
        fontSize: '2.5rem',
        color: COLORS.teal,
        textAlign: 'center',
        marginBottom: '1.5rem'
    },
    grid: {
        display: 'flex',
        justifyContent: 'space-around',
        gap: '2rem'
    },
    colHeader: {
        fontSize: '1.5rem',
        color: COLORS.darkBlue,
        marginBottom: '1rem',
        textAlign: 'center'
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '0.75rem'
    },
    circle: {
        width: '20px',
        height: '20px',
        border: `2px solid ${COLORS.lightMint}`,
        borderRadius: '50%',
        cursor: 'pointer'
    },
    text: {
        fontSize: '1rem',
        color: COLORS.darkBlue
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    },
    modalButton: {
        marginTop: '1rem',
        backgroundColor: COLORS.darkBlue,
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '0.5rem 1rem',
        cursor: 'pointer'
    }
};

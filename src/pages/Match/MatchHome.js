// src/pages/MatchHome.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStudySets from '../../hooks/useStudySets';
import { COLORS } from '../../themes';

export default function MatchHome() {
    const { sets, removeSet } = useStudySets();
    const navigate = useNavigate();

    const formatDate = isoString => {
        const dt = new Date(isoString);
        return dt.toLocaleString(undefined, {
            year:   'numeric',
            month:  'long',
            day:    'numeric',
            hour:   '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerContainer}>
                <h1 style={styles.header}>Match Sets</h1>
                <Link to="/match/create" style={styles.createBtn}>
                    + Create New Set
                </Link>
            </div>
            
            {sets.length > 0 ? (
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.th}>Title</th>
                        <th style={styles.th}>Date Created</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sets.map(s => (
                        <tr key={s.id}>
                            <td style={styles.td}>
                                <button
                                    style={styles.playBtn}
                                    onClick={() => navigate(`/match/${s.id}`)}
                                >
                                    Play
                                </button>{' '}
                                {s.title}
                            </td>
                            <td style={styles.td}>
                                {formatDate(s.dateCreated)}
                            </td>
                            <td style={styles.td}>
                                <button
                                    style={styles.editBtn}
                                    onClick={() => navigate(`/match/edit/${s.id}`)}
                                >
                                    ✏️
                                </button>{' '}
                                <button
                                    style={styles.deleteBtn}
                                    onClick={() => removeSet(s.id)}
                                >
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <div style={styles.emptyState}>
                    <p>No match sets found. Create your first match set to get started!</p>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '2rem'
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
    },
    header: {
        fontSize: '2.5rem',
        color: COLORS.teal,
        margin: 0
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '1.5rem'
    },
    th: {
        textAlign: 'left',
        borderBottom: `2px solid ${COLORS.lightMint}`,
        padding: '0.5rem',
        fontSize: '1rem',
        color: COLORS.darkBlue
    },
    td: {
        padding: '0.5rem',
        borderBottom: `1px solid ${COLORS.lightMint}`,
        fontSize: '0.95rem',
        color: COLORS.darkBlue
    },
    playBtn: {
        marginRight: '0.5rem',
        background: COLORS.darkBlue,
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '0.25rem 0.5rem',
        cursor: 'pointer'
    },
    editBtn: {
        marginRight: '0.5rem',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.2rem'
    },
    deleteBtn: {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.2rem'
    },
    createBtn: {
        display: 'inline-block',
        backgroundColor: COLORS.darkBlue,
        color: '#fff',
        padding: '0.75rem 1.5rem',
        borderRadius: '4px',
        textDecoration: 'none',
        cursor: 'pointer',
        fontWeight: '500'
    },
    emptyState: {
        textAlign: 'center',
        padding: '3rem 1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        color: COLORS.darkBlue
    }
};
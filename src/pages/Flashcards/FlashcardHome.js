// src/pages/FlashcardsHome.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COLORS } from '../../themes';
import useFlashcardsSets from '../../hooks/useFlashcardsSets';

export default function FlashcardsHome() {
  const { flashcardSets, removeFlashcardSet } = useFlashcardsSets();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const formatDate = isoString => {
    const dt = new Date(isoString);
    return dt.toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredSets = flashcardSets.filter(set =>
    set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    set.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      removeFlashcardSet(id);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.headerSection}>
          <h1 style={styles.header}>Your Flashcards</h1>
          <p style={styles.subtitle}>Manage and study your flashcard collection</p>
        </div>

        <div style={styles.actionsBar}>
          <div style={styles.searchBar}>
            <svg style={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search your flashcards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={styles.clearSearchBtn}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <Link to="/flashcards/create" style={styles.createBtn}>
            <span style={styles.plusIcon}>+</span> Create New Set
          </Link>
        </div>

        {filteredSets.length > 0 ? (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Study</th>
                  <th style={styles.th}>Title</th>
                  <th style={styles.th}>Description</th>
                  <th style={styles.th}>Date Created</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSets.map(set => (
                  <tr key={set.id} style={styles.tableRow}>
                    <td style={styles.td}>
                      <button
                        style={styles.studyBtn}
                        onClick={() => navigate(`/flashcards/example/${set.id}`)}
                        aria-label={`Study ${set.title}`}
                      >
                        Study
                      </button>
                    </td>
                    <td style={styles.titleTd}>
                      {set.title}
                    </td>
                    <td style={styles.descriptionTd}>
                      {set.description}
                    </td>
                    <td style={styles.dateTd}>
                      {formatDate(set.dateCreated)}
                    </td>
                    <td style={styles.actionsTd}>
                      <div style={styles.actionsContainer}>
                        <button 
                          style={styles.editButton}
                          onClick={() => navigate(`/flashcards/edit/${set.id}`)}
                          aria-label={`Edit ${set.title}`}
                        >
                          ✏️
                        </button>
                        <button
                          style={styles.deleteButton}
                          onClick={() => removeFlashcardSet(setSearchTerm.id, set.title)}
                          aria-label={`Delete ${set.title}`}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={styles.emptyState}>
            {searchTerm ? (
              <div style={styles.noSearchResults}>
                <svg style={styles.emptyStateIcon} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
                <h3 style={styles.emptyStateTitle}>No results found</h3>
                <p style={styles.emptyStateText}>
                  No flashcard sets found matching "{searchTerm}"
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  style={styles.clearSearchBtnLarge}
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div style={styles.noSets}>
                <svg style={styles.emptyStateIcon} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="3" x2="9" y2="21"></line>
                </svg>
                <h3 style={styles.emptyStateTitle}>No flashcard sets yet</h3>
                <p style={styles.emptyStateText}>
                  Create your first flashcard set to get started
                </p>
                <Link to="/flashcards/create" style={styles.createBtnLarge}>
                  <span style={styles.plusIcon}>+</span> Create New Set
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    color: '#333',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  headerSection: {
    marginBottom: '0.5rem',
  },
  header: {
    fontSize: '2.5rem',
    color: COLORS.teal,
    margin: '0 0 0.5rem 0',
    fontWeight: '600',
  },
  subtitle: {
    color: '#666',
    fontSize: '1.1rem',
    margin: '0',
  },
  actionsBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  searchBar: {
    position: 'relative',
    maxWidth: '400px',
    width: '100%',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#666',
  },
  searchInput: {
    width: '100%',
    padding: '12px 36px 12px 40px',
    fontSize: '1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: 'white',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
  },
  clearSearchBtn: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
    color: '#888',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.darkBlue,
    color: '#fff',
    padding: '12px 20px',
    borderRadius: '8px',
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  plusIcon: {
    marginRight: '8px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableRow: {
    transition: 'background-color 0.2s ease',
  },
  th: {
    textAlign: 'left',
    padding: '16px',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#555',
    borderBottom: `2px solid ${COLORS.lightMint}`,
    backgroundColor: '#f8f9fa',
  },
  td: {
    padding: '16px',
    borderBottom: `1px solid #eee`,
    fontSize: '0.95rem',
    color: '#333',
    verticalAlign: 'middle',
  },
  titleTd: {
    padding: '16px',
    borderBottom: `1px solid #eee`,
    fontSize: '1rem',
    fontWeight: '500',
    color: '#333',
    verticalAlign: 'middle',
  },
  descriptionTd: {
    padding: '16px',
    borderBottom: `1px solid #eee`,
    fontSize: '0.95rem',
    color: '#666',
    maxWidth: '300px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
  },
  dateTd: {
    padding: '16px',
    borderBottom: `1px solid #eee`,
    fontSize: '0.9rem',
    color: '#777',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
  },
  actionsTd: {
    padding: '16px',
    borderBottom: `1px solid #eee`,
    verticalAlign: 'middle',
  },
  actionBtnsContainer: {
    display: 'flex',
    gap: '8px',
  },
  studyBtn: {
    backgroundColor: COLORS.teal,
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.5rem',
  },
  editButton: {
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '6px',
    padding: '0.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  deleteButton: {
    backgroundColor: '#fff0f0',
    border: 'none',
    borderRadius: '6px',
    padding: '0.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  actionIcon: {
    width: '18px',
    height: '18px',
    color: '#555',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '4rem 2rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
  },
  emptyStateIcon: {
    color: COLORS.teal,
    marginBottom: '1.5rem',
  },
  emptyStateTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#333',
    margin: '0 0 1rem 0',
  },
  emptyStateText: {
    fontSize: '1.1rem',
    color: '#666',
    margin: '0 0 2rem 0',
    maxWidth: '400px',
  },
  clearSearchBtnLarge: {
    backgroundColor: '#f0f0f0',
    color: '#555',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  createBtnLarge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.darkBlue,
    color: '#fff',
    padding: '14px 28px',
    borderRadius: '8px',
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1.1rem',
    transition: 'all 0.2s ease',
  },
  noSearchResults: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  noSets: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

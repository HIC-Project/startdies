import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../themes';
import useFlashcardsSets from '../hooks/useFlashcardsSets';
import useStudySets from '../hooks/useStudySets';

export default function LibraryPage() {
  const { flashcardSets, removeFlashcardSet } = useFlashcardsSets();
  const { sets, removeSet } = useStudySets();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
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

  // Filter flashcard sets based on search term
  const filteredFlashcardSets = flashcardSets.filter(set => 
    set.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (set.description && set.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Filter match sets based on search term
  const filteredMatchSets = sets.filter(set => 
    set.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteFlashcardSet = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      removeFlashcardSet(id);
    }
  };

  const handleDeleteMatchSet = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      removeSet(id);
    }
  };


  
  return (
    <div style={styles.container}>     
      <div style={styles.headerSection}>
        <h1 style={styles.pageTitle}>Your Library</h1>
        <p style={styles.subtitle}>Explore and manage all your study materials</p>
        
        {/* Search Bar */}
        <div style={styles.searchBarContainer}>
          <div style={styles.searchBar}>
            <input
              type="text"
              placeholder="Search your library..."
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
        </div>
      </div>

      <div className="accordion accordion-flush" id="libraryAccordion" style={styles.accordionContainer}>
        
        <div className="accordion-item" style={styles.accordionItem}>
          <h2 className="accordion-header" id="flashcards-heading">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                    data-bs-target="#flashcards-collapse" aria-expanded="false" aria-controls="flashcards-collapse"
                    style={styles.accordionButton}>
              <div style={styles.accordionHeaderContent}>
                <span style={styles.accordionTitle}>Flashcards</span>
                {filteredFlashcardSets.length > 0 && (
                  <span style={styles.accordionBadge}>{filteredFlashcardSets.length}</span>
                )}
              </div>
            </button>
          </h2>
          <div id="flashcards-collapse" className="accordion-collapse collapse" aria-labelledby="flashcards-heading" data-bs-parent="#libraryAccordion">
            <div className="accordion-body" style={styles.accordionBody}>
              <div style={styles.accordionHeader}>
                <div style={styles.accordionTitleContainer} onClick={() => navigate('/flashcards')}>
                  <h2 style={styles.accordionSectionTitle}>Flashcard Sets</h2>
                  <button style={styles.viewAllButton}>View All</button>
                </div>
                <button 
                  style={styles.createNewButton}
                  onClick={() => navigate('/flashcards/create')}
                >
                  <span style={styles.plusIcon}>+</span> Create New Set
                </button>
              </div>

              {filteredFlashcardSets.length > 0 ? (
                <div style={styles.tableContainer}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Title</th>
                        <th style={styles.th}>Description</th>
                        <th style={styles.th}>Date Created</th>
                        <th style={styles.th}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFlashcardSets.map(set => (
                        <tr key={set.id} style={styles.tableRow}>
                          <td style={styles.titleTd}>
                            <div style={styles.titleContainer}>
                              <button
                                style={styles.studyButton}
                                onClick={() => navigate(`/flashcards/example/${set.id}`)}
                              >
                                Study
                              </button>
                              <span style={styles.setTitle}>{set.title}</span>
                            </div>
                          </td>
                          <td style={styles.descriptionTd}>
                            {set.description || '—'}
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
                                onClick={() => handleDeleteFlashcardSet(set.id, set.title)}
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
                <div style={styles.noResultsState}>
                  {searchTerm ? (
                    <p style={styles.noResultsText}>
                      No flashcard sets found matching "{searchTerm}"
                    </p>
                  ) : (
                    <div style={styles.emptyState}>
                      <p style={styles.emptyStateText}>
                        You haven't created any flashcard sets yet
                      </p>
                      <button 
                        style={styles.createEmptyButton}
                        onClick={() => navigate('/flashcards/create')}
                      >
                        Create Your First Set
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="accordion-item" style={styles.accordionItem}>
          <h2 className="accordion-header" id="match-heading">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                    data-bs-target="#match-collapse" aria-expanded="false" aria-controls="match-collapse"
                    style={styles.accordionButton}>
              <div style={styles.accordionHeaderContent}>
                <span style={styles.accordionTitle}>Match</span>
                {filteredMatchSets.length > 0 && (
                  <span style={styles.accordionBadge}>{filteredMatchSets.length}</span>
                )}
              </div>
            </button>
          </h2>
          <div id="match-collapse" className="accordion-collapse collapse" aria-labelledby="match-heading" data-bs-parent="#libraryAccordion">
            <div className="accordion-body" style={styles.accordionBody}>
              <div style={styles.accordionHeader}>
                <div style={styles.accordionTitleContainer} onClick={() => navigate('/match')}>
                  <h2 style={styles.accordionSectionTitle}>Match Sets</h2>
                  <button style={styles.viewAllButton}>View All</button>
                </div>
                <button 
                  style={styles.createNewButton}
                  onClick={() => navigate('/match/create')}
                >
                  <span style={styles.plusIcon}>+</span> Create New Set
                </button>
              </div>

              {filteredMatchSets.length > 0 ? (
                <div style={styles.tableContainer}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Title</th>
                        <th style={styles.th}>Description</th>
                        <th style={styles.th}>Date Created</th>
                        <th style={styles.th}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMatchSets.map(set => (
                        <tr key={set.id} style={styles.tableRow}>
                          <td style={styles.titleTd}>
                            <div style={styles.titleContainer}>
                              <button
                                style={styles.studyButton}
                                onClick={() => navigate(`/match/${set.id}`)}
                              >
                                Play
                              </button>
                              <span style={styles.setTitle}>{set.title}</span>
                            </div>
                          </td>
                          <td style={styles.descriptionTd}>
                            {set.description || '—'}
                          </td>
                          <td style={styles.dateTd}>
                            {formatDate(set.dateCreated)}
                          </td>
                          <td style={styles.actionsTd}>
                            <div style={styles.actionsContainer}>
                              <button 
                                style={styles.editButton}
                                onClick={() => navigate(`/match/edit/${set.id}`)}
                                aria-label={`Edit ${set.title}`}
                              >
                                ✏️
                              </button>
                              <button
                                style={styles.deleteButton}
                                onClick={() => handleDeleteMatchSet(set.id, set.title)}
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
                <div style={styles.noResultsState}>
                  {searchTerm ? (
                    <p style={styles.noResultsText}>
                      No match sets found matching "{searchTerm}"
                    </p>
                  ) : (
                    <div style={styles.emptyState}>
                      <p style={styles.emptyStateText}>
                        You haven't created any match sets yet
                      </p>
                      <button 
                        style={styles.createEmptyButton}
                        onClick={() => navigate('/match/create')}
                      >
                        Create Your First Set
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

      
      </div>
    </div>       
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    color: '#333',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  headerSection: {
    marginBottom: '2rem',
    textAlign: 'center',
  },
  pageTitle: {
    fontSize: '2.5rem',
    color: COLORS.teal,
    margin: '0 0 0.5rem 0',
    fontWeight: '600',
  },
  subtitle: {
    color: '#666',
    fontSize: '1.1rem',
    margin: '0 0 1.5rem 0',
  },
  searchBarContainer: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '600px',
    margin: '0 auto',
  },
  searchBar: {
    position: 'relative',
    width: '100%',
  },
  searchInput: {
    width: '100%',
    padding: '14px 40px 14px 42px',
    fontSize: '1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    outline: 'none',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.2s ease',
  },
  clearSearchBtn: {
    position: 'absolute',
    right: '16px',
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
  accordionContainer: {
    backgroundColor: 'transparent',
    border: 'none',
  },
  accordionItem: {
    backgroundColor: 'white',
    borderRadius: '12px',
    marginBottom: '1rem',
    overflow: 'hidden',
    border: '1px solid #e0e0e0',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  accordionButton: {
    backgroundColor: 'white',
    padding: '1.25rem 1.5rem',
    boxShadow: 'none',
  },
  accordionHeaderContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  accordionTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#333',
  },
  accordionBadge: {
    backgroundColor: COLORS.lightMint,
    color: COLORS.teal,
    borderRadius: '9999px',
    padding: '0.15rem 0.6rem',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  accordionBody: {
    padding: '0',
  },
  accordionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #eee',
  },
  accordionTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    cursor: 'pointer',
  },
  accordionSectionTitle: {
    margin: '0',
    fontSize: '1.3rem',
    fontWeight: '600',
    color: COLORS.darkBlue,
  },
  viewAllButton: {
    backgroundColor: 'transparent',
    color: COLORS.teal,
    border: 'none',
    padding: '0.25rem 0.5rem',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    textDecoration: 'underline',
  },
  createNewButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: COLORS.darkBlue,
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '0.6rem 1rem',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  plusIcon: {
    marginRight: '0.5rem',
    fontSize: '1.1rem',
  },
  tableContainer: {
    padding: '0 1.5rem 1.5rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableRow: {
    borderBottom: '1px solid #eee',
    transition: 'background-color 0.2s ease',
  },
  th: {
    textAlign: 'left',
    padding: '1rem 0.5rem',
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#555',
    borderBottom: '1px solid #ddd',
  },
  titleTd: {
    padding: '1rem 0.5rem',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#333',
  },
  descriptionTd: {
    padding: '1rem 0.5rem',
    fontSize: '0.9rem',
    color: '#666',
    maxWidth: '300px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  dateTd: {
    padding: '1rem 0.5rem',
    fontSize: '0.9rem',
    color: '#777',
    whiteSpace: 'nowrap',
  },
  actionsTd: {
    padding: '1rem 0.5rem',
    textAlign: 'right',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  setTitle: {
    fontWeight: '500',
  },
  studyButton: {
    backgroundColor: COLORS.darkBlue,
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '0.35rem 0.7rem',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '500',
    whiteSpace: 'nowrap',
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
  noResultsState: {
    padding: '2rem 1.5rem',
    textAlign: 'center',
  },
  noResultsText: {
    color: '#666',
    fontStyle: 'italic',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem 1.5rem',
    textAlign: 'center',
  },
  emptyStateText: {
    color: '#666',
    fontSize: '1.1rem',
    margin: '0 0 1.5rem 0',
  },
  createEmptyButton: {
    backgroundColor: COLORS.darkBlue,
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
};

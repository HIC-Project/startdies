// src/pages/FlashcardEdit.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { COLORS } from '../../themes';
import useFlashcardsSets from '../../hooks/useFlashcardsSets';

export default function FlashcardEdit() {
  const { id } = useParams();
  const { flashcardSets, editFlashcardSet } = useFlashcardsSets();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pairs, setPairs] = useState([{ term: '', def: '' }]);

  useEffect(() => {
    const currentSet = flashcardSets.find(set => set.id === id);
    if (currentSet) {
      setTitle(currentSet.title);
      setDescription(currentSet.description);
      setPairs(currentSet.pairs);
    } else {
      navigate('/flashcards');
    }
  }, [id, flashcardSets, navigate]);

  const updatePair = (idx, field, value) => {
    const copy = [...pairs];
    copy[idx][field] = value;
    setPairs(copy);
  };

  const addPair = () => setPairs([...pairs, { term: '', def: '' }]);
  const removePair = idx => {
    setPairs(pairs.filter((_, i) => i !== idx));
  };

  const handleSubmit = e => {
    e.preventDefault();
    editFlashcardSet(id, title, description, pairs);
    navigate('/flashcards');
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          <span style={styles.backArrow}>←</span> Back
        </button>
      </div>

      <div style={styles.header}>
        <h1 style={styles.headerText}>Edit Flashcards Set</h1>
        <p style={styles.subtitle}>Update your flashcard set details below</p>
      </div>

      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
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
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Set Description
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                style={styles.textarea}
                placeholder="Enter a description for your flashcard set"
                rows="3"
              />
            </label>
          </div>

          <div style={styles.cardsSection}>
            <h2 style={styles.cardsSectionTitle}>Flashcards</h2>
            <div style={styles.cardsList}>
              {pairs.map((p, i) => (
                <div key={i} style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={styles.cardNumber}>Card {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => removePair(i)}
                      style={styles.removePairBtn}
                      aria-label="Remove card"
                      disabled={pairs.length === 1}
                    >
                      ✕
                    </button>
                  </div>
                  <div style={styles.cardInputs}>
                    <input
                      type="text"
                      placeholder="Term"
                      value={p.term}
                      onChange={e => updatePair(i, 'term', e.target.value)}
                      style={styles.cardInput}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Definition"
                      value={p.def}
                      onChange={e => updatePair(i, 'def', e.target.value)}
                      style={styles.cardInput}
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <button type="button" onClick={addPair} style={styles.addPairBtn}>
              <span style={styles.addIcon}>+</span> Add New Card
            </button>
          </div>

          <div style={styles.formActions}>
            <button type="button" onClick={() => navigate('/flashcards')} style={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    color: '#333',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  backButton: {
    backgroundColor: 'transparent',
    color: COLORS.darkBlue,
    padding: '0.5rem',
    fontSize: '0.9rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease',
    fontWeight: '500',
  },
  backArrow: {
    fontSize: '1.2rem',
    marginRight: '0.25rem',
  },
  header: {
    marginBottom: '2rem',
    textAlign: 'center',
  },
  headerText: {
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
  formContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputGroup: {
    marginBottom: '0.5rem',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#444',
    marginBottom: '0.25rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    marginTop: '0.5rem',
    transition: 'border 0.2s ease',
    width: '100%',
    boxSizing: 'border-box',
  },
  textarea: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    marginTop: '0.5rem',
    transition: 'border 0.2s ease',
    width: '100%',
    boxSizing: 'border-box',
    resize: 'vertical',
    minHeight: '100px',
  },
  cardsSection: {
    marginTop: '1rem',
  },
  cardsSectionTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: COLORS.teal,
    marginBottom: '1rem',
  },
  cardsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '1rem',
    backgroundColor: '#fcfcfc',
    transition: 'all 0.2s ease',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
  },
  cardNumber: {
    fontWeight: '500',
    color: COLORS.darkBlue,
    fontSize: '0.9rem',
  },
  cardInputs: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  cardInput: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    transition: 'border 0.2s ease',
    width: '100%',
    boxSizing: 'border-box',
  },
  removePairBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    color: '#888',
    transition: 'color 0.2s ease',
    padding: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: '26px',
    height: '26px',
  },
  addPairBtn: {
    backgroundColor: 'transparent',
    color: COLORS.teal,
    border: '2px dashed #e0e0e0',
    padding: '0.75rem',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    width: '100%',
    marginTop: '0.5rem',
  },
  addIcon: {
    marginRight: '0.5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  formActions: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    marginTop: '1rem',
  },
  cancelBtn: {
    backgroundColor: '#f0f0f0',
    color: '#555',
    padding: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    flex: 1,
  },
  submitBtn: {
    backgroundColor: COLORS.darkBlue,
    color: '#fff',
    padding: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    flex: 2,
  },
 };
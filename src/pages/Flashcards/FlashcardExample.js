// src/pages/FlashcardExample.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFlashcardsSets from '../../hooks/useFlashcardsSets';
import { COLORS } from '../../themes';

export default function FlashcardExample() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { flashcardSets } = useFlashcardsSets();
  const theSet = flashcardSets.find(s => s.id === id) || { title: '', pairs: [] };
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [cards, setCards] = useState(theSet.pairs);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState([]);

  const resetCards = () => {
    setCards(theSet.pairs);
    setShuffled(false);
    setCurrentIndex(0);
    setFlipped(false);
    setProgress([]);
  };

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...theSet.pairs];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    setCards(shuffledCards);
    setShuffled(true);
    setCurrentIndex(0);
    setFlipped(false);
    setProgress([]);
  };

  // Card flip
  const handleFlip = () => {
    setFlipped(!flipped);
  };

  // Move to next card
  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    }
  };

  // Move to previous card
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          <span style={styles.backArrow}>←</span> Back
        </button>
      </div>

      <div style={styles.header}>
        <h1 style={styles.headerText}>{theSet.title}</h1>
        {theSet.description && (
          <p style={styles.description}>{theSet.description}</p>
        )}
      </div>

      {cards.length > 0 ? (
        <div style={styles.contentContainer}>
          <div style={styles.progressContainer}>
            <div style={styles.progressBar}>
              <div 
                style={{
                  ...styles.progressFill,
                  width: `${((currentIndex + 1) / cards.length) * 100}%`
                }}
              ></div>
            </div>
            <div style={styles.cardCounter}>
              <span style={styles.currentCard}>{currentIndex + 1}</span>
              <span style={styles.totalCards}>/ {cards.length}</span>
            </div>
          </div>

          <div style={styles.cardContainer}>
            <div className="flip-card" style={styles.flipCard}>
              <div 
                className="flip-card-inner" 
                style={{
                  ...styles.flipCardInner,
                  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
                onClick={handleFlip}
              >
                <div className="flip-card-front" style={styles.flipCardFront}>
                  <div style={styles.cardContent}>
                    <div style={styles.cardType}>Term</div>
                    <div style={styles.cardText}>{cards[currentIndex].term}</div>
                    <div style={styles.flipPrompt}>
                      <svg style={styles.flipIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 1l4 4-4 4"></path>
                        <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                        <path d="M7 23l-4-4 4-4"></path>
                        <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                      </svg>
                      Tap to flip
                    </div>
                  </div>
                </div>
                <div className="flip-card-back" style={styles.flipCardBack}>
                  <div style={styles.cardContent}>
                    <div style={styles.cardType}>Definition</div>
                    <div style={styles.cardText}>{cards[currentIndex].def}</div>
                    <div style={styles.flipPrompt}>
                      <svg style={styles.flipIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 1l4 4-4 4"></path>
                        <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                        <path d="M7 23l-4-4 4-4"></path>
                        <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                      </svg>
                      Tap to flip back
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.controls}>
            <button 
              style={{
                ...styles.controlButton, 
                ...(currentIndex === 0 ? styles.disabledButton : {})
              }} 
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <svg style={styles.controlIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Previous
            </button>
            
            <button 
              style={{
                ...styles.controlButton, 
                backgroundColor: COLORS.teal,
                ...(currentIndex === cards.length - 1 && progress.includes(currentIndex) ? styles.disabledButton : {})
              }} 
              onClick={handleNext}
              disabled={currentIndex === cards.length - 1 && progress.includes(currentIndex)}
            >
              Next
              <svg style={styles.controlIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          <div style={styles.shuffleControls}>
            <button 
              style={{
                ...styles.shuffleButton,
                ...(shuffled ? styles.activeShuffleButton : {})
              }} 
              onClick={shuffleCards}
            >
              <svg style={styles.shuffleIcon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 3 21 3 21 8"></polyline>
                <line x1="4" y1="20" x2="21" y2="3"></line>
                <polyline points="21 16 21 21 16 21"></polyline>
                <line x1="15" y1="15" x2="21" y2="21"></line>
                <line x1="4" y1="4" x2="9" y2="9"></line>
              </svg>
              {shuffled ? "Reshuffle" : "Shuffle Cards"}
            </button>

            <button 
              style={styles.shuffleButton} 
              onClick={resetCards}
            >
              <svg style={styles.shuffleIcon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 2v6h6"></path>
                <path d="M3 13a9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 8"></path>
              </svg>
              Reset Order
            </button>
          </div>
          
          <div style={styles.allCardsSection}>
            <div style={styles.allCardsSectionHeader}>
              <h2 style={styles.allCardsSectionTitle}>All Cards</h2>
              <p style={styles.allCardsSectionSubtitle}>View all flashcards in this set</p>
            </div>
            
            <div style={styles.cardsList}>
              {cards.map((card, index) => (
                <div 
                  key={index} 
                  style={{
                    ...styles.cardItem,
                    ...(index === currentIndex ? styles.activeCardItem : {})
                  }}
                  onClick={() => {
                    setCurrentIndex(index);
                    setFlipped(false);
                    window.scrollTo({top: 0, behavior: 'smooth'});
                  }}
                >
                  <div style={styles.cardItemNumber}>{index + 1}</div>
                  <div style={styles.cardItemContent}>
                    <div style={styles.cardItemTerm}>{card.term}</div>
                    <div style={styles.cardItemDivider}></div>
                    <div style={styles.cardItemDefinition}>{card.def}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={styles.emptyState}>
          <svg style={styles.emptyIcon} xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="3" x2="9" y2="21"></line>
          </svg>
          <h2 style={styles.emptyTitle}>No Flashcards Available</h2>
          <p style={styles.emptyText}>This set doesn't contain any flashcards yet.</p>
          <button 
            style={styles.emptyButton}
            onClick={() => navigate('/flashcards')}
          >
            Back to Sets
          </button>
        </div>
      )}

      {completed && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <svg style={styles.successIcon} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <h2 style={styles.modalTitle}>Great Job!</h2>
            </div>
            <p style={styles.modalText}>You've completed all flashcards in this set.</p>
            <div style={styles.modalButtons}>
              <button
                style={styles.modalButtonSecondary}
                onClick={() => {
                  setCompleted(false);
                }}
              >
                Start Over
              </button>
              <button
                style={styles.modalButtonPrimary}
                onClick={() => navigate('/flashcards')}
              >
                Back to Sets
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '1rem 2rem 3rem',
    maxWidth: '1000px',
    margin: '0 auto',
    position: 'relative',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    color: '#333',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  allCardsSection: {
    marginTop: '3rem',
    paddingTop: '2rem',
    borderTop: '1px solid #e0e0e0',
  },
  allCardsSectionHeader: {
    marginBottom: '1.5rem',
  },
  allCardsSectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: COLORS.teal,
    margin: '0 0 0.5rem 0',
  },
  allCardsSectionSubtitle: {
    fontSize: '0.95rem',
    color: '#666',
    margin: '0',
  },
  cardsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  cardItem: {
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '1rem',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    border: '1px solid #e0e0e0',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  activeCardItem: {
    borderColor: COLORS.teal,
    boxShadow: `0 0 0 2px ${COLORS.lightMint}`,
    backgroundColor: '#f9feff',
  },
  cardItemNumber: {
    minWidth: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: COLORS.lightMint,
    color: COLORS.teal,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    marginRight: '1rem',
    fontSize: '0.9rem',
  },
  cardItemContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  cardItemTerm: {
    fontWeight: '500',
    color: '#444',
  },
  cardItemDivider: {
    height: '1px',
    backgroundColor: '#eee',
    width: '100%',
  },
  cardItemDefinition: {
    color: '#666',
    fontSize: '0.95rem',
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
    textAlign: 'center',
    marginBottom: '2rem',
  },
  headerText: {
    fontSize: '2.5rem',
    color: COLORS.teal,
    margin: '0 0 0.5rem 0',
    fontWeight: '600',
  },
  description: {
    fontSize: '1.1rem',
    color: '#666',
    margin: '0',
    maxWidth: '600px',
    margin: '0 auto',
  },
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  progressBar: {
    flex: 1,
    height: '8px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.teal,
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },
  cardCounter: {
    display: 'flex',
    alignItems: 'baseline',
    whiteSpace: 'nowrap',
  },
  currentCard: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: COLORS.teal,
  },
  totalCards: {
    fontSize: '1rem',
    color: '#666',
    marginLeft: '4px',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem 0',
  },
  flipCard: {
    backgroundColor: 'transparent',
    width: '100%',
    maxWidth: '600px',
    height: '350px',
    perspective: '1000px',
    cursor: 'pointer',
  },
  flipCardInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    borderRadius: '16px',
  },
  flipCardFront: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundColor: '#fdfdfd',
    color: COLORS.darkBlue,
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${COLORS.lightMint}`,
  },
  flipCardBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundColor: COLORS.teal,
    color: 'white',
    transform: 'rotateY(180deg)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    padding: '2rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
  },
  cardType: {
    fontSize: '0.9rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    opacity: 0.7,
    marginBottom: '1rem',
  },
  cardText: {
    fontSize: '1.8rem',
    fontWeight: '500',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipPrompt: {
    fontSize: '0.9rem',
    opacity: 0.7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  flipIcon: {
    width: '1rem',
    height: '1rem',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
  },
  controlButton: {
    backgroundColor: COLORS.darkBlue,
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.8rem 1.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  controlIcon: {
    width: '1.2rem',
    height: '1.2rem',
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
    color: '#888',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  shuffleControls: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    padding: '0.5rem 0',
  },
  shuffleButton: {
    backgroundColor: '#f5f5f5',
    color: '#555',
    border: 'none',
    borderRadius: '6px',
    padding: '0.6rem 1.2rem',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  activeShuffleButton: {
    backgroundColor: '#e6f7f5',
    color: COLORS.teal,
  },
  shuffleIcon: {
    width: '1rem',
    height: '1rem',
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
  emptyIcon: {
    color: COLORS.teal,
    marginBottom: '1.5rem',
    opacity: 0.6,
  },
  emptyTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#333',
    margin: '0 0 1rem 0',
  },
  emptyText: {
    fontSize: '1.1rem',
    color: '#666',
    margin: '0 0 2rem 0',
    maxWidth: '400px',
  },
  emptyButton: {
    backgroundColor: COLORS.darkBlue,
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.8rem 1.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
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
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2.5rem',
    borderRadius: '16px',
    textAlign: 'center',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    maxWidth: '450px',
    width: '90%',
  },
  modalHeader: {
    marginBottom: '1.5rem',
  },
  successIcon: {
    color: COLORS.teal,
    marginBottom: '1rem',
  },
  modalTitle: {
    fontSize: '1.8rem',
    fontWeight: '600',
    color: '#333',
    margin: '0',
  },
  modalText: {
    fontSize: '1.1rem',
    color: '#666',
    margin: '0 0 2rem 0',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  modalButtonPrimary: {
    backgroundColor: COLORS.darkBlue,
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.8rem 1.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    flex: 1,
    maxWidth: '180px',
  },
  modalButtonSecondary: {
    backgroundColor: '#f0f0f0',
    color: '#333',
    border: 'none',
    borderRadius: '8px',
    padding: '0.8rem 1.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    flex: 1,
    maxWidth: '180px',
  },
};
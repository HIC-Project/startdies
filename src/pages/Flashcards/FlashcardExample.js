// src/pages/FlashcardExample.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFlashcardsSets from '../../hooks/useFlashcardsSets';
import { COLORS } from '../../themes';

export default function FlashcardExample() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { flashcardSets, } = useFlashcardsSets();
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

            <div style={styles.header}>
                <button onClick={() => navigate(-1)} style={styles.backButton}>
                    ←
                </button>
                <h1 style={styles.header}>{theSet.title}</h1>
            </div>

            {cards.length > 0 ? (
                <>
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
                                        <h2>{cards[currentIndex].term}</h2>
                                        <p style={styles.flipPrompt}>Click to flip</p>
                                    </div>
                                </div>
                                <div className="flip-card-back" style={styles.flipCardBack}>
                                    <div style={styles.cardContent}>
                                        <h2>{cards[currentIndex].def}</h2>
                                        <p style={styles.flipPrompt}>Click to flip back</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.cardCounter}>
                        Card {currentIndex + 1} of {cards.length}
                    </div>

                    <div style={styles.controls}>
                        <button 
                            style={styles.controlButton} 
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                        >
                            Previous
                        </button>
                        
                        <button 
                            style={styles.controlButton} 
                            onClick={handleNext}
                            disabled={currentIndex === cards.length - 1 && progress.includes(currentIndex)}
                        >
                            Next
                        </button>
                    </div>

                    <div style={styles.shuffleControls}>
                        <button 
                            style={{
                                ...styles.shuffleButton,
                                
                            }} 
                            onClick={shuffleCards}
                        >
                            {shuffled ? "Reshuffle" : "Shuffle Cards"}
                        </button>

                        <button 
                                style={styles.shuffleButton} 
                                onClick={resetCards}
                            >
                                Reset Order
                        </button>
                        
                    </div>
                </>
            ) : (
                <div style={styles.emptyState}>
                    <p>No flashcards in this set</p>
                </div>
            )}

            {completed && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h2>Great Job!</h2>
                        <p>You've completed all flashcards in this set.</p>
                        <div style={styles.modalButtons}>
                            <button
                                style={styles.modalButton}
                                onClick={() => {
                                    setCompleted(false);
                                }}
                            >
                                Start Over
                            </button>
                            <button
                                style={{...styles.modalButton, backgroundColor: COLORS.darkBlue}}
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
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative'
    },
    header: {
        fontSize: '2.5rem',
        color: COLORS.teal,
        textAlign: 'center',
        marginBottom: '1.5rem'
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '2rem'
    },
    flipCard: {
        backgroundColor: 'transparent',
        width: '500px',
        height: '300px',
        perspective: '1000px',
        cursor: 'pointer'
    },
    flipCardInner: {
        position: 'relative',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        transition: 'transform 0.6s',
        transformStyle: 'preserve-3d',
        boxShadow: '0 4px 12px 0 rgba(0,0,0,0.2)'
    },
    flipCardFront: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        backgroundColor: COLORS.lightMint,
        color: COLORS.darkBlue,
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    flipCardBack: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        backgroundColor: COLORS.teal,
        color: 'white',
        transform: 'rotateY(180deg)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardContent: {
        padding: '1rem',
        width: '100%'
    },
    flipPrompt: {
        fontSize: '0.8rem',
        opacity: 0.7,
        position: 'absolute',
        bottom: '10px',
        width: '100%',
        textAlign: 'center',
        left: 0
    },
    controls: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '1.5rem'
    },
    controlButton: {
        backgroundColor: COLORS.darkBlue,
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '0.7rem 1.2rem',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'background-color 0.3s',
        ':hover': {
            backgroundColor: '#1a5276'
        },
        ':disabled': {
            backgroundColor: '#cccccc',
            cursor: 'not-allowed'
        }
    },
    shuffleControls: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '1rem'
    },
    shuffleButton: {
        backgroundColor: COLORS.teal,
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        fontSize: '0.8rem',
        transition: 'background-color 0.3s'
    },
    cardCounter: {
        textAlign: 'center',
        color: COLORS.darkBlue,
        fontSize: '0.9rem'
    },
    emptyState: {
        textAlign: 'center',
        padding: '3rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
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
        zIndex: 1000
    },
    modal: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        maxWidth: '400px',
        width: '90%'
    },
    modalButtons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginTop: '1.5rem'
    },
    modalButton: {
        backgroundColor: COLORS.teal,
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '0.7rem 1.2rem',
        cursor: 'pointer',
        fontSize: '0.9rem'
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

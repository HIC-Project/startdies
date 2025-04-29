// src/pages/MatchExample.js
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStudySets from '../../hooks/useStudySets';
import { COLORS } from '../../themes';
import { FiCheck, FiX, FiRefreshCw, FiClock, FiHelpCircle, FiArrowLeft } from 'react-icons/fi';
import Confetti from 'react-confetti';

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const GAME_STATES = {
  READY: 'ready',
  PLAYING: 'playing',
  PAUSED: 'paused',
  COMPLETED: 'completed'
};

export default function MatchExample() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sets, loading } = useStudySets();
  const [gameState, setGameState] = useState(GAME_STATES.READY);
  const [showRules, setShowRules] = useState(false);
  
  // Get study set data
  const theSet = sets.find(s => s.id === id) || { title: 'Loading...', pairs: [] };
  const count = theSet.pairs.length;
  
  // Game state
  const [termOrder, setTermOrder] = useState([]);
  const [defOrder, setDefOrder] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [matches, setMatches] = useState({});
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [errors, setErrors] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);

  // DOM references
  const containerRef = useRef(null);
  const termRefs = useRef({});
  const defRefs = useRef({});
  const timerRef = useRef(null);
  
  // Initialize game
  useEffect(() => {
    if (!loading && theSet.pairs.length > 0) {
      initializeGame();
    }
  }, [loading, theSet.pairs.length]);
  
  // Timer logic
  useEffect(() => {
    if (gameState === GAME_STATES.PLAYING) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    
    return () => clearInterval(timerRef.current);
  }, [gameState]);
  
  const initializeGame = () => {
    const newTermOrder = shuffle(Array.from({ length: count }, (_, i) => i));
    const newDefOrder = shuffle(Array.from({ length: count }, (_, i) => i));
    
    setTermOrder(newTermOrder);
    setDefOrder(newDefOrder);
    setSelectedTerm(null);
    setMatches({});
    setScore(0);
    setTimer(0);
    setErrors(0);
    setHintUsed(false);
    setGameState(GAME_STATES.READY);
  };
  
  const startGame = () => {
    setGameState(GAME_STATES.PLAYING);
  };
  
  const pauseGame = () => {
    setGameState(prev => prev === GAME_STATES.PLAYING ? GAME_STATES.PAUSED : GAME_STATES.PLAYING);
  };
  
  const restartGame = () => {
    initializeGame();
    startGame();
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Handle term selection
  const handleTermClick = (origIdx) => {
    if (gameState !== GAME_STATES.PLAYING) return;
    
    // If this term is already matched, do nothing
    if (matches[origIdx]) return;
    
    // Toggle selection if clicking the same term
    if (selectedTerm === origIdx) {
      setSelectedTerm(null);
      return;
    }
    
    setSelectedTerm(origIdx);
  };
  
  // Handle definition selection
  const handleDefClick = (origDefIdx) => {
    if (gameState !== GAME_STATES.PLAYING || selectedTerm === null) return;
    
    // Check if this definition is already matched
    const isDefMatched = Object.values(matches).some(m => m.defIdx === origDefIdx);
    if (isDefMatched) return;
    
    const correct = selectedTerm === origDefIdx;
    
    // Calculate line positions
    const cRect = containerRef.current.getBoundingClientRect();
    const tRect = termRefs.current[selectedTerm].getBoundingClientRect();
    const dRect = defRefs.current[origDefIdx].getBoundingClientRect();
    
    const x1 = tRect.right - cRect.left;
    const y1 = tRect.top + tRect.height / 2 - cRect.top;
    const x2 = dRect.left - cRect.left;
    const y2 = dRect.top + dRect.height / 2 - cRect.top;

    // Calculate unique curve height based on match index
    const matchIndex = Object.keys(matches).length;
    const baseOffset = 30; // minimum curve height
    const indexOffset = matchIndex * 15; // each match gets a different height

    // Store curve data for drawing
    const curveData = {
        offset: baseOffset + indexOffset,
        color: correct ? COLORS.mint : '#e74c3c'
    };

    
    // Update matches and score
    setMatches(prev => ({
      ...prev,
       [selectedTerm]: { 
        defIdx: origDefIdx, 
        correct, 
        x1, y1, x2, y2,
        curve: curveData
        }
    }));
    
    if (correct) {
      setScore(prev => prev + 10);
    } else {
      setErrors(prev => prev + 1);
      setScore(prev => Math.max(0, prev - 5));
      
      // Auto-remove incorrect match after a delay
      setTimeout(() => {
        setMatches(prev => {
          const newMatches = { ...prev };
          delete newMatches[selectedTerm];
          return newMatches;
        });
      }, 1500);
    }
    
    setSelectedTerm(null);
    
    // Check if game is completed
    const correctMatches = Object.values(matches).filter(m => m.correct).length + (correct ? 1 : 0);
    if (correctMatches === count) {
      setGameState(GAME_STATES.COMPLETED);
    }
  };
  
  // Use hint to show one correct match
  const useHint = () => {
    if (hintUsed || gameState !== GAME_STATES.PLAYING) return;
    
    // Find an unmatched term
    const unmatchedTerms = termOrder.filter(idx => !matches[idx]);
    if (unmatchedTerms.length === 0) return;
    
    const randomTermIdx = unmatchedTerms[Math.floor(Math.random() * unmatchedTerms.length)];
    
    // Create a temporary flash effect
    setSelectedTerm(randomTermIdx);
    
    setTimeout(() => {
      // Calculate line positions
      const cRect = containerRef.current.getBoundingClientRect();
      const tRect = termRefs.current[randomTermIdx].getBoundingClientRect();
      const dRect = defRefs.current[randomTermIdx].getBoundingClientRect();
      
      const x1 = tRect.right - cRect.left;
      const y1 = tRect.top + tRect.height / 2 - cRect.top;
      const x2 = dRect.left - cRect.left;
      const y2 = dRect.top + dRect.height / 2 - cRect.top;
      
      // Create the match
      setMatches(prev => ({
        ...prev,
        [randomTermIdx]: { defIdx: randomTermIdx, correct: true, x1, y1, x2, y2 }
      }));
      
      setScore(prev => prev + 5); // Half points for hint
      setHintUsed(true);
      setSelectedTerm(null);
      
      // Check if game is completed
      if (Object.keys(matches).length + 1 === count) {
        setGameState(GAME_STATES.COMPLETED);
      }
    }, 500);
  };
  
  // Calculate game status
  const correctMatches = Object.values(matches).filter(m => m.correct).length;
  const allCorrect = correctMatches === count;
  const accuracy = errors + correctMatches > 0 
    ? Math.round((correctMatches / (errors + correctMatches)) * 100) 
    : 0;
  
  // Calculate final score with time bonus
  const finalScore = score + (allCorrect ? Math.max(0, 100 - timer) : 0);
  
  // Loading state
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loader}></div>
        <p>Loading study set...</p>
      </div>
    );
  }
  
  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        padding: '2rem',
        minHeight: '400px'
      }}
    >
      {/* Game header */}
      
      <div style={styles.header}>
        <button 
            onClick={() => navigate('/match')} 
            style={styles.backButton}
            aria-label="Back to match sets"
        >
            <FiArrowLeft size={18} />
            <span>Back</span>
        </button>
        
        <h1 style={styles.title}>{theSet.title}</h1>
        
        <div style={styles.gameControls}>
            {/* Remove Start Matching button from here */}
            
            {(gameState === GAME_STATES.PLAYING || gameState === GAME_STATES.PAUSED) && (
            <>
                <button 
                onClick={pauseGame} 
                style={styles.controlButton}
                aria-label={gameState === GAME_STATES.PAUSED ? "Resume game" : "Pause game"}
                >
                {gameState === GAME_STATES.PAUSED ? "Resume" : "Pause"}
                </button>
                
                <button 
                onClick={restartGame}
                style={styles.controlButton} 
                aria-label="Restart game"
                >
                <FiRefreshCw size={16} />
                </button>
                
                <button
                onClick={() => setShowRules(true)}
                style={styles.controlButton}
                aria-label="Show rules"
                >
                <FiHelpCircle size={16} />
                </button>
            </>
            )}
        </div>
    </div>

      {/* Game stats */}
      {gameState !== GAME_STATES.READY && (
        <div style={styles.stats}>
          <div style={styles.stat}>
            <FiClock size={16} style={styles.statIcon} />
            <span>{formatTime(timer)}</span>
          </div>
          
          <div style={styles.stat}>
            <span>Score: {score}</span>
          </div>
          
          <div style={styles.stat}>
            <span>Matched: {correctMatches}/{count}</span>
          </div>
          
          <div style={styles.stat}>
            <span>Errors: {errors}</span>
          </div>
          
          {!hintUsed && gameState === GAME_STATES.PLAYING && (
            <button 
              onClick={useHint}
              style={styles.hintButton}
              disabled={hintUsed}
            >
              Use Hint
            </button>
          )}
        </div>
      )}

      {/* Game board - only visible when playing or completed */}
      {gameState !== GAME_STATES.READY && (
        <>
          {/* SVG lines connecting matches */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            <defs>
              <marker id="arrow-green" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 Z" fill={COLORS.mint} />
              </marker>
              <marker id="arrow-red" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 Z" fill="#e74c3c" />
              </marker>
            </defs>

            {Object.entries(matches).map(([termIdx, m]) => {
                // Calculate control points for bezier curve
                const midX = (m.x1 + m.x2) / 2;
                const isTopToBottom = m.y1 < m.y2;
                const offset = m.curve?.offset || 40; // Use stored offset or default
                
                // Determine the bezier curve direction based on relative positions
                const controlY = isTopToBottom 
                ? Math.min(m.y1, m.y2) - offset // curve goes up
                : Math.max(m.y1, m.y2) + offset; // curve goes down
                
                return (
                <path
                    key={termIdx}
                    d={`M ${m.x1} ${m.y1} Q ${midX} ${controlY} ${m.x2} ${m.y2}`}
                    fill="none"
                    stroke={m.correct ? COLORS.mint : '#e74c3c'}
                    strokeWidth={3}
                    markerEnd={m.correct ? 'url(#arrow-green)' : 'url(#arrow-red)'}
                    strokeDasharray={m.correct ? "none" : "5,5"}
                    style={{
                    transition: 'all 0.3s ease-in-out',
                    animation: m.correct ? 'none' : 'dash 1s linear infinite'
                    }}
                />
                );
            })}
          </svg>

          {/* Main game grid */}
          <div style={{
            ...styles.grid,
            opacity: gameState === GAME_STATES.PAUSED ? 0.5 : 1,
            filter: gameState === GAME_STATES.PAUSED ? 'blur(2px)' : 'none',
            transition: 'opacity 0.3s, filter 0.3s'
          }}>
            {/* Terms column */}
            <div style={styles.column}>
              <h2 style={styles.colHeader}>Terms</h2>
              <div style={styles.cardContainer}>
                {termOrder.map(origIdx => {
                  const { term } = theSet.pairs[origIdx];
                  const match = matches[origIdx];
                  const isSelected = selectedTerm === origIdx;
                  const isMatched = match !== undefined;
                  
                  return (
                    <div 
                      key={origIdx} 
                      style={{
                        ...styles.card,
                        borderColor: isSelected 
                          ? COLORS.teal 
                          : isMatched 
                            ? (match.correct ? COLORS.mint : '#e74c3c') 
                            : COLORS.lightMint,
                        backgroundColor: isMatched 
                          ? (match.correct ? `${COLORS.mint}30` : '#e74c3c20')
                          : isSelected ? `${COLORS.teal}10` : '#fff',
                        transform: isSelected ? 'translateX(10px)' : 'none'
                      }}
                      onClick={() => handleTermClick(origIdx)}
                    >
                      <div style={styles.cardInner}>
                        <button
                          ref={el => (termRefs.current[origIdx] = el)}
                          style={{
                            ...styles.circle,
                            borderColor: isSelected 
                              ? COLORS.teal 
                              : isMatched 
                                ? (match.correct ? COLORS.mint : '#e74c3c') 
                                : COLORS.lightMint,
                            backgroundColor: isMatched
                              ? (match.correct ? COLORS.mint : '#e74c3c')
                              : isSelected ? COLORS.teal : 'transparent'
                          }}
                        >
                          {isMatched && match.correct && <FiCheck color="white" size={12} />}
                          {isMatched && !match.correct && <FiX color="white" size={12} />}
                        </button>
                        <span style={styles.cardText}>{term}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Definitions column */}
            <div style={styles.column}>
              <h2 style={styles.colHeader}>Definitions</h2>
              <div style={styles.cardContainer}>
                {defOrder.map(origIdx => {
                  const { def } = theSet.pairs[origIdx];
                  const matched = Object.values(matches).find(m => m.defIdx === origIdx);
                  const isMatched = matched !== undefined;
                  
                  return (
                    <div 
                      key={origIdx} 
                      style={{
                        ...styles.card,
                        borderColor: isMatched 
                          ? (matched.correct ? COLORS.mint : '#e74c3c') 
                          : COLORS.lightMint,
                        backgroundColor: isMatched 
                          ? (matched.correct ? `${COLORS.mint}30` : '#e74c3c20')
                          : '#fff',
                        transform: selectedTerm !== null && !isMatched ? 'translateX(-10px)' : 'none'
                      }}
                      onClick={() => handleDefClick(origIdx)}
                    >
                      <div style={styles.cardInner}>
                        <button
                          ref={el => (defRefs.current[origIdx] = el)}
                          style={{
                            ...styles.circle,
                            borderColor: isMatched 
                              ? (matched.correct ? COLORS.mint : '#e74c3c') 
                              : COLORS.lightMint,
                            backgroundColor: isMatched
                              ? (matched.correct ? COLORS.mint : '#e74c3c')
                              : 'transparent'
                          }}
                        >
                          {isMatched && matched.correct && <FiCheck color="white" size={12} />}
                          {isMatched && !matched.correct && <FiX color="white" size={12} />}
                        </button>
                        <span style={styles.cardText}>{def}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Game intro screen */}
      {gameState === GAME_STATES.READY && (
        <div style={styles.introScreen}>
          <h2 style={styles.introTitle}>Match Game</h2>
          <p style={styles.introParagraph}>
            Connect each term with its correct definition. Click a term, then click the matching definition.
          </p>
          <div style={styles.introRules}>
            <h3>Rules:</h3>
            <ul>
              <li>Correct matches: +10 points</li>
              <li>Incorrect matches: -5 points</li>
              <li>Time bonus: Up to 100 points if completed quickly</li>
              <li>You can use one hint during the game (half points)</li>
            </ul>
          </div>
          <button 
            style={styles.startButton} 
            onClick={startGame}
          >
            Start Matching
          </button>
        </div>
      )}

      {/* Game paused screen */}
      {gameState === GAME_STATES.PAUSED && (
        <div style={styles.pauseOverlay}>
          <div style={styles.pauseModal}>
            <h2>Game Paused</h2>
            <button 
              style={styles.resumeButton}
              onClick={() => setGameState(GAME_STATES.PLAYING)}
            >
              Resume Game
            </button>
          </div>
        </div>
      )}

      {/* Rules modal */}
      {showRules && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>How to Play</h2>
            <ul style={styles.rulesList}>
              <li>Click on a term, then click on its matching definition</li>
              <li>Correct matches stay connected with a green line</li>
              <li>Incorrect matches will be shown briefly, then removed</li>
              <li>Match all terms to complete the game</li>
              <li>You earn 10 points for each correct match</li>
              <li>You lose 5 points for each incorrect match</li>
              <li>Complete the game quickly for bonus points!</li>
            </ul>
            <button
              style={styles.modalButton}
              onClick={() => setShowRules(false)}
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Game completed screen */}
      {gameState === GAME_STATES.COMPLETED && (
        <>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={500}
            gravity={0.15}
          />
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h2 style={styles.winTitle}>You Win!</h2>
              <div style={styles.resultContainer}>
                <div style={styles.statItem}>
                  <p className="label">Time:</p>
                  <p className="value">{formatTime(timer)}</p>
                </div>
                <div style={styles.statItem}>
                  <p className="label">Matches:</p>
                  <p className="value">{correctMatches}/{count}</p>
                </div>
                <div style={styles.statItem}>
                  <p className="label">Accuracy:</p>
                  <p className="value">{accuracy}%</p>
                </div>
                <div style={styles.statItem}>
                  <p className="label">Score:</p>
                  <p className="value">{score}</p>
                </div>
                <div style={styles.statItem}>
                  <p className="label">Time Bonus:</p>
                  <p className="value">+{Math.max(0, 100 - timer)}</p>
                </div>
                <div style={styles.finalScore}>
                  <p className="label">Final Score:</p>
                  <p className="value">{finalScore}</p>
                </div>
              </div>
              <div style={styles.buttonGroup}>
                <button
                  style={styles.modalButton}
                  onClick={restartGame}
                >
                  Play Again
                </button>
                <button
                  style={{...styles.modalButton, backgroundColor: COLORS.darkBlue}}
                  onClick={() => navigate('/match')}
                >
                  Back to Sets
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  // Layout
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    position: 'relative',
  },
  title: {
    fontSize: '2rem',
    color: COLORS.teal,
    textAlign: 'center',
    margin: 0,
    flex: 1,
  },
  grid: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2rem',
    position: 'relative',
    zIndex: 2,
  },
  column: {
    flex: 1,
    maxWidth: '45%',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  
  // Stats bar
  stats: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '0.75rem 1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.95rem',
    fontWeight: 500,
    color: COLORS.darkBlue,
  },
  statIcon: {
    color: COLORS.teal,
  },
  
  // Cards
  card: {
    borderRadius: '8px',
    border: '2px solid',
    padding: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    ':hover': {
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
  },
  cardInner: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  cardText: {
    fontSize: '1rem',
    color: COLORS.darkBlue,
    lineHeight: 1.4,
    flex: 1,
  },
  circle: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: '2px solid',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.2s ease',
    padding: 0,
    backgroundColor: 'transparent',
  },
  
  // Headers
  colHeader: {
    fontSize: '1.25rem',
    color: COLORS.darkBlue,
    marginBottom: '1rem',
    textAlign: 'center',
    fontWeight: 600,
  },
  
  // Buttons
  backButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: COLORS.darkBlue,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem',
    cursor: 'pointer',
    borderRadius: '4px',
    ':hover': {
      backgroundColor: 'rgba(0,0,0,0.05)',
    },
  },
  gameControls: {
    display: 'flex',
    gap: '0.5rem',
  },
  controlButton: {
    backgroundColor: '#fff',
    border: `1px solid ${COLORS.lightMint}`,
    color: COLORS.darkBlue,
    padding: '0.5rem 0.75rem',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: COLORS.lightMint,
    },
  },
  startButton: {
    backgroundColor: COLORS.teal,
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 500,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#00897b',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    },
  },
  hintButton: {
    backgroundColor: '#9c27b0',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 0.75rem',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#7b1fa2',
    },
    ':disabled': {
      backgroundColor: '#e0e0e0',
      cursor: 'not-allowed',
    },
  },
  modalButton: {
    backgroundColor: COLORS.teal,
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#00897b',
    },
  },
  resumeButton: {
    backgroundColor: COLORS.teal,
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.75rem 2rem',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#00897b',
    },
  },
  
  // Modals
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
    zIndex: 100,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    minWidth: '400px',
    maxWidth: '90%',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  },
  pauseOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
    backdropFilter: 'blur(4px)',
  },
  pauseModal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    animation: 'fadeIn 0.3s ease-out',
  },
  
  // Loading
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
  },
  loader: {
    width: '40px',
    height: '40px',
    border: `4px solid ${COLORS.lightMint}`,
    borderRadius: '50%',
    borderTopColor: COLORS.teal,
    animation: 'spin 1s infinite linear',
    marginBottom: '1rem',
  },
  
  // Game complete results
  resultContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    margin: '1.5rem 0',
    textAlign: 'left',
  },
  statItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    borderBottom: '1px solid #f0f0f0',
  },
  finalScore: {
    gridColumn: '1 / span 2',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.75rem 0',
    marginTop: '0.5rem',
    borderTop: '2px solid #f0f0f0',
    borderBottom: '2px solid #f0f0f0',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: COLORS.teal,
  },
  winTitle: {
    color: COLORS.teal,
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginTop: '1.5rem',
  },
  
  // Rules list
  rulesList: {
    textAlign: 'left',
    padding: '0 1rem',
    margin: '1.5rem 0',
    lineHeight: 1.6,
  },
  
  // Intro screen
  introScreen: {
    maxWidth: '600px',
    margin: '3rem auto',
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  introTitle: {
    fontSize: '2rem',
    color: COLORS.teal,
    marginBottom: '1rem',
  },
  introParagraph: {
    fontSize: '1.1rem',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
    color: COLORS.darkBlue,
  },
  introRules: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    textAlign: 'left',
  },
};

// Add global keyframes for animations
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes dash {
    to {
      stroke-dashoffset: 10;
    }
  }
@keyframes lineAppear {
  from {
    stroke-dasharray: 0, 1000;
    stroke-dashoffset: 0;
  }
  to {
    stroke-dasharray: 1000, 1000;
    stroke-dashoffset: 0;
  }
}
`;
document.head.appendChild(styleSheet);
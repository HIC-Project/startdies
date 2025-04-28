import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import defaultProfile from '../assets/default-profile.png';
import './HomePage.css';

const HomePage = () => {
  const { user } = useAuth();
  const [stats] = useState({
    plan: 'Basic',
    flashcards: 24,
    tests: 13
  });
  const [recentSets, setRecentSets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch user stats and recent sets from API
    const fetchUserData = async () => {
      try {
        // Mock data for demonstration
        const mockRecentSets = [
          { id: 1, title: 'Cell Organelli', type: 'flashcard' },
          { id: 2, title: 'Limits and Continuity', type: 'test' },
          { id: 3, title: 'Trigonometric Identities', type: 'flashcard' },
          { id: 4, title: 'Programming Principles', type: 'test' },
          { id: 5, title: 'Top 50 Japanese Words', type: 'flashcard' },
          { id: 6, title: 'Conditional Probability', type: 'test' },
        ];
        
        setRecentSets(mockRecentSets);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // Get username from sessionStorage if available
  const getUsername = () => {
    if (user && user.username) {
      return user.username;
    }
    
    // Try to get from sessionStorage as fallback
    try {
      const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      if (currentUser && currentUser.username) {
        return currentUser.username;
      }
    } catch (error) {
      console.error('Error getting username from session:', error);
    }
    
    return 'Student';
  };

  return (
    <div className="home-container">
      {loading ? (
        <div className="home-loading">Loading...</div>
      ) : (
        <>
          <div className="welcome-card">
            <div className="welcome-content">
              <div className="welcome-icon">👋</div>
              <div className="welcome-text">
                <h1 className="welcome-heading">
                  Welcome, {getUsername()}!
                </h1>
                <p className="welcome-subheading">
                  You're on a roll! Jump back in, or start something new
                </p>
              </div>
            </div>
            <div className="profile-pic-container">
                <img 
                    src={defaultProfile} 
                    alt="Profile" 
                    className="profile-pic-image"
                />
            </div>
          </div>

          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-icon" aria-label="Plan">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-title">Plan</span>
                <span className="stat-value">{stats.plan}</span>
              </div>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-card">
              <div className="stat-icon" aria-label="Flashcards">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3ZM20 19H4V5H20V19Z" fill="currentColor"/>
                  <path d="M7 7H17V9H7V7Z" fill="currentColor"/>
                  <path d="M7 11H17V13H7V11Z" fill="currentColor"/>
                  <path d="M7 15H14V17H7V15Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-value">{stats.flashcards}</span>
                <span className="stat-subtitle">total created / saved</span>
              </div>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-card">
              <div className="stat-icon" aria-label="Tests">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="currentColor"/>
                  <path d="M9 13H15V15H9V13Z" fill="currentColor"/>
                  <path d="M9 17H15V19H9V17Z" fill="currentColor"/>
                  <path d="M8 9.01L9.41 10.42L11 8.83V12H13V8.83L14.59 10.42L16 9.01L12 5L8 9.01Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-value">{stats.tests}</span>
                <span className="stat-subtitle">total created / saved</span>
              </div>
            </div>
          </div>

          <div className="recent-section">
            <h2 className="section-title">Jump back in</h2>
            <div className="divider"></div>

            <div className="recent-grid">
              {recentSets.map(set => (
                <Link 
                  key={set.id} 
                  to={set.type === 'flashcard' ? '/flashcards/example' : '/test/run'} 
                  className="recent-card"
                >
                  <div className="recent-icon">
                    {set.type === 'flashcard' ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3ZM20 19H4V5H20V19Z" fill="currentColor"/>
                        <path d="M7 7H17V9H7V7Z" fill="currentColor"/>
                        <path d="M7 11H17V13H7V11Z" fill="currentColor"/>
                        <path d="M7 15H14V17H7V15Z" fill="currentColor"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="currentColor"/>
                        <path d="M9 13H15V15H9V13Z" fill="currentColor"/>
                        <path d="M9 17H15V19H9V17Z" fill="currentColor"/>
                        <path d="M8 9.01L9.41 10.42L11 8.83V12H13V8.83L14.59 10.42L16 9.01L12 5L8 9.01Z" fill="currentColor"/>
                      </svg>
                    )}
                  </div>
                  <span className="recent-title">{set.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="create-section">
            <h2 className="section-title">Start something new</h2>
            <div className="divider"></div>

            <div className="create-grid">
              <Link to="/flashcards/create" className="create-card">
                <div className="create-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3ZM20 19H4V5H20V19Z" fill="currentColor"/>
                    <path d="M11 7H13V11H17V13H13V17H11V13H7V11H11V7Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="create-title">Create Flashcards</h3>
                <p className="create-text">
                  Make a new set of flashcards to practice and memorize
                </p>
              </Link>

              <Link to="/test/create" className="create-card">
                <div className="create-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="currentColor"/>
                    <path d="M11 12H13V14H11V12Z" fill="currentColor"/>
                    <path d="M11 8H13V10H11V8Z" fill="currentColor"/>
                    <path d="M11 16H13V18H11V16Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="create-title">Create Test</h3>
                <p className="create-text">
                  Build a test from your flashcards to assess your knowledge
                </p>
              </Link>

              <Link to="/match/create" className="create-card">
                <div className="create-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 2H8C6.9 2 6 2.9 6 4V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V4C18 2.9 17.1 2 16 2ZM16 20H8V4H16V20Z" fill="currentColor"/>
                    <path d="M9.5 11.5H11.5V13.5H9.5V11.5Z" fill="currentColor"/>
                    <path d="M9.5 7.5H11.5V9.5H9.5V7.5Z" fill="currentColor"/>
                    <path d="M12.5 11.5H14.5V13.5H12.5V11.5Z" fill="currentColor"/>
                    <path d="M12.5 7.5H14.5V9.5H12.5V7.5Z" fill="currentColor"/>
                    <path d="M9.5 15.5H11.5V17.5H9.5V15.5Z" fill="currentColor"/>
                    <path d="M12.5 15.5H14.5V17.5H12.5V15.5Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="create-title">Create Match Game</h3>
                <p className="create-text">
                  Design a matching game to practice associations
                </p>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
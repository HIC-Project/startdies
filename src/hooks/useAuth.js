import { useState, useEffect, createContext, useContext } from 'react';

// Create auth context
const AuthContext = createContext(null);

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Check for existing user session on mount
  useEffect(() => {
    try {
      const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Error loading user session:', error);
      sessionStorage.removeItem('currentUser');
    }
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('currentUser', JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('currentUser');
  };

  // Delete account function
  const deleteAccount = () => {
    if (!user) return;

    try {
      // Get users from localStorage
      const storedData = localStorage.getItem('users');
      if (!storedData) return;

      const users = JSON.parse(storedData);
      if (!Array.isArray(users)) return;

      // Find and remove the current user
      const updatedUsers = users.filter(u => u.username !== user.username);
      
      // Update localStorage
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Clear the session
      setUser(null);
      sessionStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  // Provide auth context
  return (
    <AuthContext.Provider value={{ user, login, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
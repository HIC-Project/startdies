import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../hooks/useAuth';
import { COLORS } from '../themes';
import defaultProfile from '../assets/default-profile.png'; // 🧩 import profile image

export default function Layout() {
  const { user, logout, deleteAccount } = useAuth();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={styles.header}>
          {user && (
            <div style={styles.userProfile}>
              <img 
                src={defaultProfile} 
                alt="Profile" 
                style={styles.profileImage} 
              />
              <span style={styles.userText}>
                {`Hello, ${user.username}`}
              </span>
            </div>
          )}

          {user && (
            <>
              <button style={styles.logoutBtn} onClick={logout}>
                Logout
              </button>
              <button style={styles.deleteBtn} onClick={deleteAccount}>
                Delete Account
              </button>
            </>
          )}
        </header>

        <main style={{ flex: 1, padding: '2rem' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '1rem 2rem',
    borderBottom: `1px solid ${COLORS.lightMint}`,
    backgroundColor: '#fff',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '1rem',
  },
  profileImage: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '0.5rem',
  },
  userText: {
    fontSize: '1rem',
    color: COLORS.teal,
  },
  logoutBtn: {
    fontSize: '1rem',
    background: 'transparent',
    border: 'none',
    color: COLORS.teal,
    cursor: 'pointer',
    marginRight: '1rem',
  },
  deleteBtn: {
    fontSize: '1rem',
    background: 'transparent',
    border: 'none',
    color: '#e74c3c',
    cursor: 'pointer',
  },
};

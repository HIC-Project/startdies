import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../hooks/useAuth';
import { COLORS } from '../themes';
import defaultProfile from '../assets/default-profile.png';

export default function Layout() {
  const { user, logout, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteRequest = () => {
    setShowConfirmDelete(true);
    setShowProfileDropdown(false);
  };

  const handleConfirmDelete = () => {
    deleteAccount();
    setShowConfirmDelete(false);
    navigate('/login');
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };
  
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(prev => !prev);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            {/* This space intentionally left empty or can be used for page title/breadcrumbs */}
          </div>

          <div style={styles.headerRight}>
            {user && (
              <div style={styles.profileCorner}>
                <div 
                  style={styles.profileButton}
                  onClick={toggleProfileDropdown}
                >
                  <img 
                    src={defaultProfile} 
                    alt="Profile" 
                    style={styles.cornerProfileImage} 
                  />
                  <span style={styles.cornerUsername}>{user.username || 'User'}</span>
                  <span style={styles.dropdownArrow}>▼</span>
                </div>
                
                {showProfileDropdown && (
                  <div style={styles.profileDropdown}>
                    <button style={styles.dropdownBtn} onClick={handleLogout}>
                      Logout
                    </button>
                    <button style={styles.dropdownDeleteBtn} onClick={handleDeleteRequest}>
                      Delete Account
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        <main style={{ flex: 1, padding: '2rem' }}>
          <Outlet />
        </main>

        {/* Delete Account Confirmation Modal */}
        {showConfirmDelete && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h3 style={styles.modalTitle}>Confirm Account Deletion</h3>
              <p style={styles.modalText}>
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div style={styles.modalButtons}>
                <button 
                  style={styles.cancelBtn}
                  onClick={handleCancelDelete}
                >
                  Cancel
                </button>
                <button 
                  style={styles.confirmDeleteBtn}
                  onClick={handleConfirmDelete}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    borderBottom: `1px solid ${COLORS.lightMint}`,
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
  },
  profileCorner: {
    position: 'relative',
  },
  profileButton: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#f8f9fa',
    },
  },
  cornerProfileImage: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '0.5rem',
    border: `1px solid ${COLORS.lightMint}`,
  },
  cornerUsername: {
    fontSize: '0.9rem',
    color: COLORS.darkBlue,
    fontWeight: 500,
    marginRight: '0.5rem',
  },
  dropdownArrow: {
    fontSize: '0.7rem',
    color: COLORS.darkBlue,
  },
  profileDropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    minWidth: '150px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    border: `1px solid ${COLORS.lightMint}`,
    padding: '0.5rem',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  dropdownBtn: {
    fontSize: '0.9rem',
    background: 'transparent',
    border: 'none',
    borderRadius: '4px',
    color: COLORS.darkBlue,
    cursor: 'pointer',
    padding: '0.5rem',
    textAlign: 'left',
    ':hover': {
      backgroundColor: '#f8f9fa',
    },
  },
  dropdownDeleteBtn: {
    fontSize: '0.9rem',
    background: 'transparent',
    border: 'none',
    borderRadius: '4px',
    color: '#e74c3c',
    cursor: 'pointer',
    padding: '0.5rem',
    textAlign: 'left',
    ':hover': {
      backgroundColor: '#ffebee',
    },
  },
  // Modal styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '1.5rem',
    width: '400px',
    maxWidth: '90%',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  },
  modalTitle: {
    color: COLORS.teal,
    marginTop: 0,
    marginBottom: '1rem',
    fontSize: '1.25rem',
  },
  modalText: {
    color: COLORS.darkBlue,
    marginBottom: '1.5rem',
    lineHeight: 1.5,
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
  },
  cancelBtn: {
    backgroundColor: '#f8f9fa',
    border: `1px solid ${COLORS.lightMint}`,
    color: COLORS.darkBlue,
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  confirmDeleteBtn: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
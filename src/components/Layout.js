// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../hooks/useAuth';
import { COLORS } from '../themes';

export default function Layout() {
    const { user, logout, deleteAccount } = useAuth();

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <header style={styles.header}>
          <span style={styles.userText}>
            {user ? `Hello, ${user.username}` : 'No User'}
          </span>

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
        display:        'flex',
        justifyContent: 'flex-end',
        alignItems:     'center',
        padding:        '1rem 2rem',
        borderBottom:   `1px solid ${COLORS.lightMint}`,
        backgroundColor:'#fff',
    },
    userText: {
        fontSize:     '1rem',        // match the button fontSize
        color:        COLORS.teal,
        marginRight:  '1rem',        // same gap as logoutBtn
    },
    logoutBtn: {
        fontSize:     '1rem',        // same size as userText
        background:   'transparent',
        border:       'none',
        color:        COLORS.teal,
        cursor:       'pointer',
        marginRight:  '1rem',        // maintain spacing before Delete Account
    },
    deleteBtn: {
        fontSize:     '1rem',        // keep consistent sizing
        background:   'transparent',
        border:       'none',
        color:        '#e74c3c',
        cursor:       'pointer',
    },
};

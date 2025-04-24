import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import mainLogo from '../assets/mainLogo.svg';
import { COLORS } from '../themes';

export default function SubscriptionPage() {
    const { user, subscribe } = useAuth();
    const [error, setError]   = useState('');
    const [msg, setMsg]       = useState('');

    if (!user) {
        return (
            <div style={styles.container}>
                <img
                    src={mainLogo}
                    alt="StartDies Logo"
                    style={styles.headerLogo}
                />

                <h1 style={styles.title}>Subscription</h1>

                <p style={styles.text}>
                    Please{' '}
                    <Link to="/login" style={styles.link}>
                        Sign In
                    </Link>{' '}
                    to manage your subscription.
                </p>
            </div>
        );
    }

    const handleSubscribe = () => {
        try {
            subscribe();
            setMsg('You are now a Premium member!');
            setError('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={styles.container}>
            <img
                src={mainLogo}
                alt="StartDies Logo"
                style={styles.headerLogo}
            />

            <h1 style={styles.title}>Subscription</h1>

            <p style={styles.text}>
                Current membership:{' '}
                <strong>
                    {user.membership === 'premium' ? 'Premium' : 'Basic'}
                </strong>
            </p>

            {user.membership === 'basic' && (
                <>
                    <p style={styles.text}>
                        Upgrade to <strong>Premium</strong> for{' '}
                        <strong>$9.99/month</strong>
                    </p>
                    <button style={styles.button} onClick={handleSubscribe}>
                        Subscribe
                    </button>
                </>
            )}

            {msg && <p style={styles.success}>{msg}</p>}
            {error && <p style={styles.error}>{error}</p>}
        </div>
    );
}

const styles = {
    container: {
        position:      'relative',
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        padding:       '4rem 1rem 2rem',
        color:         COLORS.darkBlue,
    },
    headerLogo: {
        position:   'absolute',
        top:        '-1rem',
        left:       '50%',
        transform:  'translateX(-50%)',
        width:      '140px',
    },
    title: {
        fontSize:     '3rem',
        marginTop:    0,
        marginBottom: '2rem',
        color:        COLORS.teal,
        textAlign:    'center',
    },
    text: {
        fontSize:     '1rem',
        marginBottom: '1rem',
        textAlign:    'center',
    },
    link: {
        color:           COLORS.teal,
        textDecoration:  'underline',
    },
    button: {
        backgroundColor: COLORS.darkBlue,
        color:           '#fff',
        border:          'none',
        borderRadius:    '4px',
        padding:         '0.75rem 2rem',
        cursor:          'pointer',
        fontSize:        '1rem',
    },
    success: {
        marginTop: '1rem',
        color:     COLORS.mint,
    },
    error: {
        marginTop: '1rem',
        color:     '#e74c3c',
    },
};

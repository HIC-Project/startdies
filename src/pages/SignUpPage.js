import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import mainLogo from '../assets/mainLogo.svg';
import { COLORS } from '../themes';

export default function SignUpPage() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm]   = useState('');
    const [error, setError]       = useState('');

    const handleSignUp = e => {
        e.preventDefault();
        if (password !== confirm) {
            setError("Passwords don't match");
            return;
        }
        try {
            register({ username, password });
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={styles.container}>
            <img src={mainLogo} alt="StartDies Logo" style={styles.heroLogo} />
            <h1 style={styles.title}>Sign Up</h1>
            {error && <p style={styles.error}>{error}</p>}

            <form style={styles.form} onSubmit={handleSignUp}>
                <label style={styles.label}>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        style={styles.input}
                        required
                    />
                </label>

                <label style={styles.label}>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                </label>

                <label style={styles.label}>
                    Confirm Password
                    <input
                        type="password"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        style={styles.input}
                        required
                    />
                </label>

                <button type="submit" style={styles.submit}>
                    Sign Up
                </button>
            </form>

            <p style={styles.footer}>
                Already have an account?{' '}
                <Link to="/login" style={styles.link}>
                    Log in
                </Link>
            </p>
        </div>
    );
}

const styles = {
    container: {
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        padding:       '2rem 1rem',
    },
    heroLogo: {
        width:        '300px',
        marginBottom: '1.5rem',
    },
    title: {
        fontSize:     '2.5rem',
        color:        COLORS.teal,
        marginBottom: '1rem',
    },
    error: {
        color:        '#e74c3c',
        marginBottom: '1rem',
    },
    form: {
        width:        '100%',
        maxWidth:     '400px',
        display:      'flex',
        flexDirection:'column',
        gap:          '1rem',
    },
    label: {
        display:       'flex',
        flexDirection: 'column',
        fontSize:      '1rem',
        color:         COLORS.darkBlue,
    },
    input: {
        marginTop:    '0.5rem',
        padding:      '0.5rem',
        fontSize:     '1rem',
        border:       `1px solid ${COLORS.lightMint}`,
        borderRadius: '4px',
    },
    submit: {
        marginTop:       '1rem',
        backgroundColor: COLORS.darkBlue,
        color:           '#fff',
        fontSize:        '1.1rem',
        padding:         '0.75rem',
        border:          'none',
        borderRadius:    '4px',
        cursor:          'pointer',
    },
    footer: {
        marginTop: '1rem',
        fontSize:  '0.9rem',
        color:     COLORS.darkBlue,
    },
    link: {
        color:           COLORS.teal,
        textDecoration:  'underline',
    },
};

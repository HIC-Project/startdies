// src/pages/SignUpPage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mainLogo from '../assets/mainLogo.svg';
import { COLORS } from '../themes';

function SignUpPage() {
    const navigate = useNavigate();

    const handleSignUp = e => {
        e.preventDefault();
        // TODO: signup backend
        navigate('/login');
    };

    return (
        <div style={styles.container}>
            <img src={mainLogo} alt="StartDies Main Logo" style={styles.heroLogo} />
            <h1 style={styles.title}>Sign Up</h1>

            <form style={styles.form} onSubmit={handleSignUp}>
                <label style={styles.label}>
                    Login
                    <input
                        type="text"
                        placeholder="Enter Your Username or Email"
                        style={styles.input}
                        required
                    />
                </label>

                <label style={styles.label}>
                    Password
                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        style={styles.input}
                        required
                    />
                </label>

                <label style={styles.label}>
                    Confirm Password
                    <input
                        type="password"
                        placeholder="Confirm Your Password"
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
                <Link to="/login" style={styles.link}>Sign in</Link>.{' '}
                <Link to="/contact-us" style={styles.link}>Contact Us</Link>
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
        fontSize:   '2.5rem',
        color:      COLORS.teal,
        marginBottom: '2rem',
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
        marginTop:     '1rem',
        backgroundColor: COLORS.darkBlue,
        color:           '#fff',
        fontSize:        '1.1rem',
        padding:         '0.75rem',
        border:          'none',
        borderRadius:    '4px',
        cursor:          'pointer',
    },
    footer: {
        marginTop: '1.5rem',
        fontSize:  '0.9rem',
        color:     COLORS.darkBlue,
    },
    link: {
        color:           COLORS.teal,
        textDecoration:  'underline',
    },
};

export default SignUpPage;

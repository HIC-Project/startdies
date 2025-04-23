import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';           // site-wide nav logo
import mainLogo from '../assets/mainLogo.svg';
import { COLORS } from '../themes';

function LandingPage() {
    const navigate = useNavigate();
    const handleStart = () => navigate('/sign-up');

    return (
        <div style={styles.container}>
            <Link to="/" style={styles.navLink}>
                <img src={logo} alt="Home" style={styles.navLogo} />
            </Link>

            <div style={styles.content}>
                <img src={mainLogo} alt="StartDies Main Logo" style={styles.mainLogo} />
                <button style={styles.button} onClick={handleStart}>
                    Start our journey!
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: '0 1rem',
    },
    navLink: {
        position: 'absolute',
        top: '1rem',
        left: '1rem',
    },
    navLogo: {
        width: '40px',
        height: 'auto',
        cursor: 'pointer',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    mainLogo: {
        width: '300px',
        marginBottom: '2rem',
    },
    button: {
        fontSize: '1rem',
        backgroundColor: COLORS.darkBlue,
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '0.75rem 2rem',
        cursor: 'pointer',
    },
};

export default LandingPage;

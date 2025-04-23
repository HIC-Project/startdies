import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';           // sidebar nav logo
import mainLogo from '../assets/mainLogo.svg';   // hero logo
import { COLORS } from '../themes';

function SignUpPage() {
    const navigate = useNavigate();
    const handleSignUp = e => {
        e.preventDefault();
        // TODO: signup databse implementation
        navigate('/login');
    };

    return (
        <div style={styles.wrapper}>
            <aside style={styles.sidebar}>
                <Link to="/" style={styles.sidebarLogo}>
                    <img src={logo} alt="Home" style={styles.logoImg} />
                </Link>
                <nav style={styles.nav}>
                    <Link to="/login"       style={styles.navItem}>Sign In</Link>
                    <Link to="/home"        style={styles.navItem}>Home</Link>
                    <Link to="/subscription" style={styles.navItem}>Subscription</Link>
                    <Link to="/library"     style={styles.navItem}>Library</Link>
                    <Link to="/flashcards"  style={styles.navItem}>Flashcards</Link>
                    <Link to="/test"        style={styles.navItem}>Test</Link>
                    <Link to="/about-us"    style={styles.navItem}>About Us</Link>
                    <Link to="/faqs"        style={styles.navItem}>FAQs</Link>
                </nav>
            </aside>

            <main style={styles.main}>
                <img src={mainLogo} alt="StartDies" style={styles.heroLogo} />
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
                    <Link to="/login" style={styles.link}>Log in</Link>.
                    {' '}<Link to="/contact-us" style={styles.link}>Contact Us</Link>
                </p>
            </main>
        </div>
    );
}

const styles = {
    wrapper: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#fff',
    },
    sidebar: {
        width: '200px',
        padding: '1rem',
        borderRight: `1px solid ${COLORS.lightMint}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    sidebarLogo: {
        marginBottom: '2rem',
    },
    logoImg: {
        width: '40px',
    },
    nav: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    navItem: {
        textDecoration: 'none',
        color: COLORS.darkBlue,
        fontSize: '1rem',
    },
    main: {
        flex: 1,
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    heroLogo: {
        width: '300px',
        marginBottom: '1.5rem',
    },
    title: {
        fontSize: '2.5rem',
        color: COLORS.teal,
        marginBottom: '2rem',
    },
    form: {
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '1rem',
        color: COLORS.darkBlue,
    },
    input: {
        marginTop: '0.5rem',
        padding: '0.5rem',
        fontSize: '1rem',
        border: `1px solid ${COLORS.lightMint}`,
        borderRadius: '4px',
    },
    submit: {
        marginTop: '1rem',
        backgroundColor: COLORS.darkBlue,
        color: '#fff',
        fontSize: '1.1rem',
        padding: '0.75rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    footer: {
        marginTop: '1.5rem',
        fontSize: '0.9rem',
        color: COLORS.darkBlue,
    },
    link: {
        color: COLORS.teal,
        textDecoration: 'underline',
    },
};

export default SignUpPage;

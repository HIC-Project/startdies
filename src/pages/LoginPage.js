import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { COLORS } from '../themes';

function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const con_password = formData.get('confirmpassword');

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Find user by username or email and password
        const foundUser = users.find(u => (u.username === username || u.email === email) && u.password === password);

        if (foundUser) {
            navigate('/home');  // Navigate to home if login is successful
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Login</h1>
            <form style={styles.form} onSubmit={handleLogin}>
                <label style={styles.label}>
                    Username or Email
                    <input name="username" type="text" required style={styles.input} />
                </label>
                <label style={styles.label}>
                    Password
                    <input name="password" type="password" required style={styles.input} />
                </label>
                <button type="submit" style={styles.submit}>Login</button>
            </form>
            <div style={styles.footer}>
                <Link to="/forgot-password" style={styles.forgot}>
                    Forgot your password?
                </Link>
                <br />
                <Link to="/Sign-Up" style={styles.signup}>
                    Don't have an account? Sign up
                </Link>
            </div>
        </div>
    );
}

const styles = {
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '4rem 1rem 2rem',
        color: COLORS.darkBlue,
    },
    title: {
        fontSize: '2.5rem',
        color: COLORS.teal,
        marginBottom: '2rem',
    },
    form: {
        maxWidth: '400px',
        width: '100%',
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
        borderRadius: '4px',
        border: `1px solid ${COLORS.lightMint}`,
    },
    submit: {
        backgroundColor: COLORS.darkBlue,
        color: '#fff',
        padding: '0.75rem',
        border: 'none',
        fontSize: '1.1rem',
    },
    footer: {
        marginTop: '1.5rem',
        fontSize: '0.9rem',
        color: COLORS.darkBlue,
    },
    forgot: {
        color: COLORS.teal,
        textDecoration: 'underline',
        fontSize: '0.95rem',
        cursor: 'pointer',
    },
    signup: {
        color: COLORS.teal,
        textDecoration: 'underline',
        fontSize: '0.95rem',
        cursor: 'pointer',
    },
};

export default LoginPage;

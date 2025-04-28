import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { COLORS } from '../themes';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleLogin = e => {
        e.preventDefault();
        setError('');
        
        try {
            const formData = new FormData(e.target);
            const username = formData.get('username');
            const password = formData.get('password');

            // Get users from localStorage
            const storedData = localStorage.getItem('users');
            if (!storedData) {
                setError('No registered users found');
                return;
            }
            
            let users;
            try {
                users = JSON.parse(storedData);
                // Check if users is an array
                if (!Array.isArray(users)) {
                    setError('Invalid user data format');
                    return;
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
                setError('Error retrieving user data');
                return;
            }
            
            // Find user by username or email and password
            const foundUser = users.find(u => 
                (u.username === username || u.email === username) && 
                u.password === password
            );

            if (foundUser) {
                // Store current user in session storage and context
                const userData = {
                    username: foundUser.username,
                    email: foundUser.email
                };
                
                // Use auth context to login
                login(userData);
                
                navigate('/home');  // Navigate to home if login is successful
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred during login');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Login</h1>
            
            {error && <div style={styles.error}>{error}</div>}
            
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
                <Link to="/sign-up" style={styles.signup}>
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
        padding: '0.75rem',
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
        borderRadius: '4px',
        cursor: 'pointer',
    },
    footer: {
        marginTop: '1.5rem',
        fontSize: '0.9rem',
        color: COLORS.darkBlue,
        textAlign: 'center',
    },
    forgot: {
        color: COLORS.teal,
        textDecoration: 'underline',
        fontSize: '0.95rem',
        cursor: 'pointer',
        display: 'inline-block',
        marginBottom: '0.5rem',
    },
    signup: {
        color: COLORS.teal,
        textDecoration: 'underline',
        fontSize: '0.95rem',
        cursor: 'pointer',
    },
    error: {
        backgroundColor: '#ffebee',
        color: '#c62828',
        padding: '0.75rem',
        borderRadius: '4px',
        marginBottom: '1rem',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
    },
};

export default LoginPage;
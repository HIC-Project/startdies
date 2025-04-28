import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COLORS } from '../themes';
import { FiArrowLeft } from 'react-icons/fi';

function SignUpPage() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSignUp = e => {
        e.preventDefault();
        setError('');

        try {
            const formData = new FormData(e.target);
            const username = formData.get('username');
            const email = formData.get('email');
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');
            const securityQuestion = formData.get('securityQuestion');
            const securityAnswer = formData.get('securityAnswer');

            // Basic validation
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            // Get existing users or initialize empty array
            let users = [];
            const storedData = localStorage.getItem('users');
            
            if (storedData) {
                try {
                    const parsedData = JSON.parse(storedData);
                    if (Array.isArray(parsedData)) {
                        users = parsedData;
                    } else {
                        // Initialize users as an array if it's not
                        localStorage.setItem('users', JSON.stringify([]));
                    }
                } catch (parseError) {
                    console.error('Error parsing user data:', parseError);
                    // Reset corrupted data
                    localStorage.setItem('users', JSON.stringify([]));
                }
            } else {
                // Initialize users array in localStorage if it doesn't exist
                localStorage.setItem('users', JSON.stringify([]));
            }

            // Check if the username or email already exists
            if (users.some(u => u.username === username)) {
                setError('Username already exists');
                return;
            }

            if (email && users.some(u => u.email === email)) {
                setError('Email already in use');
                return;
            }

            // Add new user to localStorage
            const newUser = { 
                username, 
                email, 
                password, 
                securityQuestion, 
                securityAnswer,
                dateCreated: new Date().toISOString()
            };
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // Redirect to login page after signup
            alert('Account created successfully! Please log in.');
            navigate('/login');
        } catch (error) {
            console.error('SignUp error:', error);
            setError('An error occurred during sign up');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.titleContainer}>
                <Link to="/login" style={styles.backButton}>
                    <FiArrowLeft size={18} />
                    <span>Back to Login</span>
                </Link>
                <h1 style={styles.title}>Sign Up</h1>
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <form style={styles.form} onSubmit={handleSignUp}>
                <label style={styles.label}>
                    Username
                    <input name="username" type="text" required style={styles.input} />
                </label>
                
                <label style={styles.label}>
                    Email (optional)
                    <input name="email" type="email" style={styles.input} />
                </label>
                
                <label style={styles.label}>
                    Password
                    <input name="password" type="password" required style={styles.input} />
                </label>
                
                <label style={styles.label}>
                    Confirm Password
                    <input name="confirmPassword" type="password" required style={styles.input} />
                </label>
                
                <label style={styles.label}>
                    Security Question
                    <input
                        name="securityQuestion"
                        type="text"
                        required
                        style={styles.input}
                        placeholder="e.g. What's your favorite color?"
                    />
                </label>
                
                <label style={styles.label}>
                    Security Answer
                    <input
                        name="securityAnswer"
                        type="text"
                        required
                        style={styles.input}
                    />
                </label>
                
                <button type="submit" style={styles.submit}>Sign Up</button>
            </form>
            
            <div style={styles.footer}>
                <Link to="/login" style={styles.loginLink}>
                    Already have an account? Log in
                </Link>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem 1rem',
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        maxWidth: '400px',
        marginBottom: '1.5rem'
    },
    backButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: 'transparent',
        border: 'none',
        color: COLORS.darkBlue,
        padding: '0.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
        textDecoration: 'none',
        position: 'absolute',
        left: 0
    },
    title: {
        fontSize: '2rem',
        color: COLORS.teal,
        margin: '0 auto'
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
        padding: '0.75rem',
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
        textAlign: 'center'
    },
    loginLink: {
        color: COLORS.teal,
        textDecoration: 'underline',
        fontSize: '0.95rem',
    },
};

export default SignUpPage;
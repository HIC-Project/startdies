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
            <div style={styles.backSection}>
                <Link to="/login" style={styles.backButton}>
                    <FiArrowLeft size={18} />
                    <span>Back to Login</span>
                </Link>
            </div>
            
            <div style={styles.contentSection}>
                <h1 style={styles.title}>Sign Up</h1>

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
        </div>
    );
}

const styles = {
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
        color: COLORS.darkBlue,
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto'
    },
    backSection: {
        width: '100%',
        marginBottom: '1.5rem',
        paddingLeft: '0.5rem'
    },
    backButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: 'transparent',
        border: 'none',
        color: COLORS.darkBlue,
        padding: '0.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
        textDecoration: 'none',
        fontSize: '0.9rem'
    },
    contentSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    title: {
        fontSize: '2rem',
        color: COLORS.teal,
        marginTop: 0,
        marginBottom: '1.5rem',
        textAlign: 'center'
    },
    error: {
        backgroundColor: '#ffebee',
        color: '#c62828',
        padding: '0.75rem',
        borderRadius: '4px',
        marginBottom: '1rem',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
    },
    form: {
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        fontSize: '1rem',
        color: COLORS.darkBlue
    },
    input: {
        marginTop: '0.5rem',
        padding: '0.75rem',
        fontSize: '1rem',
        border: `1px solid ${COLORS.lightMint}`,
        borderRadius: '4px',
        width: '100%'
    },
    submit: {
        backgroundColor: COLORS.darkBlue,
        color: '#fff',
        padding: '0.75rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        marginTop: '0.5rem',
        width: '100%'
    },
    footer: {
        marginTop: '1.5rem',
        fontSize: '0.9rem',
        color: COLORS.darkBlue,
        textAlign: 'center',
        width: '100%'
    },
    loginLink: {
        color: COLORS.teal,
        textDecoration: 'underline',
        fontSize: '0.95rem'
    }
};

export default SignUpPage;
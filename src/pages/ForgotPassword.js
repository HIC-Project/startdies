import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { COLORS } from '../themes';
import { FiArrowLeft } from 'react-icons/fi';

function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [user, setUser] = useState(null);
    const [answer, setAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleUsernameSubmit = e => {
        e.preventDefault();
        setError('');
        const formData = new FormData(e.target);
        const username = formData.get('username');

        try {
            // Make sure users is always an array
            const storedData = localStorage.getItem('users');
            if (!storedData) {
                setError('User not found');
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
                setError('Error retrieving user data');
                return;
            }

            const foundUser = users.find(u => u.username === username);

            if (foundUser) {
                setUser(foundUser);
                setStep(2);
            } else {
                setError('User not found');
            }
        } catch (error) {
            console.error('Error in handleUsernameSubmit:', error);
            setError('An error occurred while processing your request');
        }
    };

    const handleAnswerSubmit = e => {
        e.preventDefault();
        setError('');
        
        try {
            if (answer.toLowerCase() === user.securityAnswer.toLowerCase()) {
                setStep(3);
            } else {
                setError('Incorrect answer');
            }
        } catch (error) {
            console.error('Error in handleAnswerSubmit:', error);
            setError('An error occurred while verifying your answer');
        }
    };

    const handlePasswordReset = e => {
        e.preventDefault();
        setError('');
        
        try {
            const storedData = localStorage.getItem('users');
            if (!storedData) {
                setError('User data not found');
                return;
            }
            
            let users;
            try {
                users = JSON.parse(storedData);
                if (!Array.isArray(users)) {
                    setError('Invalid user data format');
                    return;
                }
            } catch (error) {
                setError('Error retrieving user data');
                return;
            }

            const index = users.findIndex(u => u.username === user.username);
            if (index !== -1) {
                users[index].password = newPassword;
                localStorage.setItem('users', JSON.stringify(users));
                alert('Password updated! You can now log in.');
                navigate('/login');
            } else {
                setError('User no longer exists');
            }
        } catch (error) {
            console.error('Error in handlePasswordReset:', error);
            setError('An error occurred while resetting your password');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.titleContainer}>
                <Link to="/login" style={styles.backButton}>
                    <FiArrowLeft size={18} />
                    <span>Back to Login</span>
                </Link>
                <h1 style={styles.title}>Forgot Password</h1>
            </div>

            {error && <div style={styles.error}>{error}</div>}

            {step === 1 && (
                <form style={styles.form} onSubmit={handleUsernameSubmit}>
                    <label style={styles.label}>
                        Username
                        <input name="username" type="text" required style={styles.input} />
                    </label>
                    <button type="submit" style={styles.submit}>Next</button>
                </form>
            )}

            {step === 2 && user && (
                <form style={styles.form} onSubmit={handleAnswerSubmit}>
                    <label style={styles.label}>
                        {user.securityQuestion}
                        <input
                            type="text"
                            value={answer}
                            onChange={e => setAnswer(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </label>
                    <button type="submit" style={styles.submit}>Verify</button>
                </form>
            )}

            {step === 3 && (
                <form style={styles.form} onSubmit={handlePasswordReset}>
                    <label style={styles.label}>
                        New Password
                        <input
                            type="password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </label>
                    <button type="submit" style={styles.submit}>Reset Password</button>
                </form>
            )}
        </div>
    );
}

const styles = {
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem 1rem',
        color: COLORS.darkBlue
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
    form: {
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    label: {
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        marginTop: '0.5rem',
        padding: '0.75rem',
        fontSize: '1rem',
        border: `1px solid ${COLORS.lightMint}`,
        borderRadius: '4px'
    },
    submit: {
        backgroundColor: COLORS.darkBlue,
        color: '#fff',
        padding: '0.75rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        marginTop: '0.5rem'
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
    }
};

export default ForgotPassword;
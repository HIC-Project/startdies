import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../themes';

function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [user, setUser] = useState(null);
    const [answer, setAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(u => u.username === username);

        if (foundUser) {
            setUser(foundUser);
            setStep(2);
        } else {
            alert('User not found');
        }
    };

    const handleAnswerSubmit = e => {
        e.preventDefault();
        if (answer.toLowerCase() === user.securityAnswer.toLowerCase()) {
            setStep(3);
        } else {
            alert('Incorrect answer');
        }
    };

    const handlePasswordReset = e => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const index = users.findIndex(u => u.username === user.username);
        if (index !== -1) {
            users[index].password = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            alert('Password updated! You can now log in.');
            navigate('/login');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Forgot Password</h1>

            {step === 1 && (
                <form style={styles.form} onSubmit={handleUsernameSubmit}>
                    <label style={styles.label}>
                        Username
                        <input name="username" type="text" required style={styles.input} />
                    </label>
                    <button type="submit" style={styles.submit}>Next</button>
                </form>
            )}

            {step === 2 && (
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
        padding: '4rem 1rem 2rem',
        color: COLORS.darkBlue
    },
    title: {
        fontSize: '2.5rem',
        color: COLORS.teal,
        marginBottom: '1rem'
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
        padding: '0.5rem',
        fontSize: '1rem'
    },
    submit: {
        backgroundColor: COLORS.darkBlue,
        color: '#fff',
        padding: '0.75rem',
        border: 'none'
    }
};

export default ForgotPassword;

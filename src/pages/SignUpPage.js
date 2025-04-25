import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COLORS } from '../themes';

function SignUpPage() {
    const navigate = useNavigate();

    const handleSignUp = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');
        const securityQuestion = formData.get('securityQuestion');
        const securityAnswer = formData.get('securityAnswer');

        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if the user already exists (based on username)
        if (users.find(u => u.username === username)) {
            alert('User already exists');
            return;
        }

        // Add new user to localStorage
        users.push({ username, password, securityQuestion, securityAnswer });
        localStorage.setItem('users', JSON.stringify(users));

        // Redirect to login page after signup
        navigate('/login');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Sign Up</h1>
            <form style={styles.form} onSubmit={handleSignUp}>
                <label style={styles.label}>
                    Username
                    <input name="username" type="text" required style={styles.input} />
                </label>
                <label style={styles.label}>
                    Password
                    <input name="password" type="password" required style={styles.input} />
                </label>
                <label style={styles.label}>
                    Security Question
                    <input
                        name="securityQuestion"
                        type="text"
                        required
                        style={styles.input}
                        placeholder="e.g. What’s your favorite color?"
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

export default SignUpPage;

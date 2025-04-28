import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import mainLogo from '../assets/mainLogo.svg';
import { COLORS } from '../themes';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]       = useState('');

    const handleLogin = e => {
        e.preventDefault();
        try {
            login({ username, password });
            navigate('/home');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={styles.container}>
            <img src={mainLogo} alt="StartDies Logo" style={styles.heroLogo} />
            <h1 style={styles.title}>Log In</h1>
            {error && <p style={styles.error}>{error}</p>}

            <form style={styles.form} onSubmit={handleLogin}>
                <label style={styles.label}>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        style={styles.input}
                        required
                    />
                </label>

                <label style={styles.label}>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                </label>

                <button type="submit" style={styles.submit}>
                    Log In
                </button>
            </form>
            {/* Forgot Password link */}
<p style={styles.forgotPassword}>
    <Link to="/forgot-password" style={styles.link}>
        Forgot Password?
    </Link>
</p>

            <p style={styles.footer}>
                Don’t have an account?{' '}
                <Link to="/sign-up" style={styles.link}>
                    Sign Up
                </Link>.
            </p>
        </div>
    );
}

const styles = {
    container:       { display:'flex', flexDirection:'column', alignItems:'center', padding:'2rem 1rem' },
    heroLogo:        { width:'300px', marginBottom:'1.5rem' },
    title:           { fontSize:'2.5rem', color:COLORS.teal, marginBottom:'1rem' },
    error:           { color:'#e74c3c', marginBottom:'1rem' },
    form:            { width:'100%', maxWidth:'400px', display:'flex', flexDirection:'column', gap:'1rem' },
    label:           { display:'flex', flexDirection:'column', fontSize:'1rem', color:COLORS.darkBlue },
    input:           { marginTop:'0.5rem', padding:'0.5rem', fontSize:'1rem', border:`1px solid ${COLORS.lightMint}`, borderRadius:'4px' },
    submit:          { marginTop:'1rem', backgroundColor:COLORS.darkBlue, color:'#fff', fontSize:'1.1rem', padding:'0.75rem', border:'none', borderRadius:'4px', cursor:'pointer' },
    footer:          { marginTop:'1rem', fontSize:'0.9rem', color:COLORS.darkBlue },
    link:            { color:COLORS.teal, textDecoration:'underline' },
    forgotPassword: { marginTop:'0.5rem', fontSize:'0.9rem', color:COLORS.darkBlue },
};

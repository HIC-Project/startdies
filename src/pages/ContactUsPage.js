import React, { useState } from 'react';
import { COLORS } from '../themes';

function ContactUsPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        
        // Retrieve the current contact messages from localStorage
        const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');

        // Add the new form data to the messages array
        contactMessages.push(formData);

        // Save the updated contact messages back to localStorage
        localStorage.setItem('contactMessages', JSON.stringify(contactMessages));

        // Clear form data after submission 
        setFormData({
            name: '',
            email: '',
            message: ''
        });

        alert('Thank you for contacting us! Your message has been submitted.');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Contact Us</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>
                    Name
                    <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </label>
                <label style={styles.label}>
                    Email
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </label>
                <label style={styles.label}>
                    Message
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        style={styles.textarea}
                    />
                </label>
                <button type="submit" style={styles.submit}>Submit</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '4rem 1rem',
        color: COLORS.darkBlue,
    },
    title: {
        fontSize: '2.5rem',
        color: COLORS.teal,
        marginBottom: '1.5rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        maxWidth: '500px',
        width: '100%',
    },
    label: {
        fontSize: '1rem',
        color: COLORS.darkBlue,
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '0.75rem',
        fontSize: '1rem',
        borderRadius: '4px',
        border: `1px solid ${COLORS.lightMint}`,
        marginTop: '0.5rem',
    },
    textarea: {
        padding: '0.75rem',
        fontSize: '1rem',
        borderRadius: '4px',
        border: `1px solid ${COLORS.lightMint}`,
        marginTop: '0.5rem',
        height: '150px',
    },
    submit: {
        backgroundColor: COLORS.darkBlue,
        color: '#fff',
        padding: '0.75rem',
        border: 'none',
        fontSize: '1.1rem',
        cursor: 'pointer',
    },
    footer: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '1rem',
        backgroundColor: COLORS.lightMint,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        fontSize: '0.9rem',
      },
      
      footerLink: {
        color: COLORS.darkBlue,
        textDecoration: 'underline',
      },
      
      divider: {
        color: COLORS.darkBlue,
      },
};

export default ContactUsPage;
import React from 'react';
import { Link } from 'react-router-dom';
import mainLogo from '../assets/mainLogo.svg';
import { COLORS } from '../themes';

const faqs = [
    {
        question: 'How do I reset my password?',
        answer: 'Click on "Forgot Password" at the login page and follow the instructions to reset your password via your security question.',
    },
    {
        question: 'Can I cancel my subscription at any time?',
        answer: 'Yes! You can cancel your subscription at any time from your account settings without any additional charges.',
    },
    {
        question: 'How do I contact support?',
        answer: 'You can reach out to our support team by clicking the "Contact Us" link at the bottom of any page or emailing support@startdies.com.',
    },
];

export default function FAQPage() {
    return (
        <div style={styles.container}>
            <img src={mainLogo} alt="StartDies Logo" style={styles.headerLogo} />

            <h1 style={styles.header}>Frequently Asked Questions</h1>

            <div style={styles.list}>
                {faqs.map(({ question, answer }, idx) => (
                    <div key={idx} style={styles.item}>
                        <p style={styles.question}>
                            <strong>Q:</strong> {question}
                        </p>
                        <p style={styles.answer}>
                            <strong>A:</strong> {answer}
                        </p>
                    </div>
                ))}
            </div>

            <footer style={styles.footer}>
                <Link to="/contact-us" style={styles.link}>Contact Us</Link>
            </footer>
        </div>
    );
}

const styles = {
    container: {
        position:       'relative',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        padding:        '4rem 1rem 2rem',
        color:          COLORS.darkBlue,
    },
    headerLogo: {
        position:   'absolute',
        top:        '-1rem',
        left:       '50%',
        transform:  'translateX(-50%)',
        width:      '140px',
    },
    header: {
        margin:       '0 0 2rem',
        fontSize:     '3rem',
        textAlign:    'center',
        color:        COLORS.teal,
    },
    list: {
        width:        '100%',
        maxWidth:     '800px',
        display:      'flex',
        flexDirection:'column',
        gap:          '1.5rem',
        marginBottom: '2rem',
    },
    item: {
        backgroundColor: '#fff',
        padding:         '1rem',
        borderRadius:    '8px',
        border:          `1px solid ${COLORS.lightMint}`,
        boxShadow:       '0 2px 4px rgba(0,0,0,0.1)',
    },
    question: {
        margin:       '0 0 0.5rem',
        color:        COLORS.darkBlue,
        fontWeight:   'bold',
        fontSize:     '1rem',
    },
    answer: {
        margin:       0,
        color:        COLORS.darkBlue,
        fontSize:     '1rem',
        lineHeight:   '1.6',
    },
    footer: {
        marginTop:   'auto',
        paddingTop:  '1rem',
        borderTop:   `1px solid ${COLORS.lightMint}`,
    },
    link: {
        color:          COLORS.teal,
        textDecoration: 'underline',
        fontSize:       '1rem',
    },
};

import React from 'react';
import { Link } from 'react-router-dom';
import mainLogo from '../assets/mainLogo.svg';
import { COLORS } from '../themes';

export default function AboutUsPage() {
    return (
        <div style={styles.container}>
            <img
                src={mainLogo}
                alt="StartDies Logo"
                style={styles.headerLogo}
            />

            <h1 style={styles.header}>About Us</h1>

            <div style={styles.panels}>
                <section style={styles.panel}>
                    <h2 style={styles.panelTitle}>Our Mission</h2>
                    <p style={styles.panelText}>
                        Our Mission stuff will go here
                    </p>
                </section>

                <section style={styles.panel}>
                    <h2 style={styles.panelTitle}>Our Journey</h2>
                    <p style={styles.panelText}>
                        Our Journey stuff will go right here
                    </p>
                </section>
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
        fontSize:      '3rem',
        marginTop:     '0',
        marginBottom:  '2rem',
        color:         COLORS.teal,
        textAlign:     'center',
    },
    panels: {
        display:        'flex',
        gap:            '2rem',
        flexWrap:       'wrap',
        justifyContent: 'center',
        marginBottom:   '2rem',
        width:          '100%',
        maxWidth:       '1200px',
    },
    panel: {
        flex:            '1 1 300px',
        border:          `1px solid ${COLORS.lightMint}`,
        borderRadius:    '8px',
        padding:         '1.5rem',
        backgroundColor: '#fff',
        boxShadow:       '0 2px 4px rgba(0,0,0,0.1)',
    },
    panelTitle: {
        fontSize:      '1.5rem',
        marginBottom:  '1rem',
        color:         COLORS.darkBlue,
    },
    panelSubtitle: {
        fontSize:      '1.25rem',
        margin:        '0 0 1rem',
        color:         COLORS.darkBlue,
    },
    panelText: {
        fontSize:   '1rem',
        lineHeight: '1.6',
        color:      COLORS.darkBlue,
    },
    footer: {
        marginTop:  'auto',
        paddingTop: '1rem',
        borderTop:  `1px solid ${COLORS.lightMint}`,
    },
    link: {
        color:          COLORS.teal,
        textDecoration: 'underline',
        fontSize:       '1rem',
    },
};

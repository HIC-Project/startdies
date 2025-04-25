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
                    As a group of college students, we care about studying and staying organized academically. Our goal is to make studying easier, more efficient, and more interactive for students everywhere. We are here to create a platform that helps students learn through digital tools, and study aids.
We aim to provide customizable flashcards, study games, and resources that allow students to personalize their learning experience. Our goal is to bridge the gap between traditional studying and modern, tech-driven approaches to education. We believe that learning should be accessible, fun, and effective, no matter where you are in your academic journey.


                    </p>
                </section>

                <section style={styles.panel}>
                    <h2 style={styles.panelTitle}>Our Journey</h2>
                    <p style={styles.panelText}>
                        We came to gether as a team of college students to complege this project and make a fun and fuctional tool. We all worked together to make this project possible. Our member are Chotanansub Sophaken, Annika Hall, Abdulaziz Almusaiteer, Kent Ogasawara, and Andrew Leonard. The project was made in collaboration for CS 32301 Human Interface Computing, Spring 2025.

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

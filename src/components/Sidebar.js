import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/logo.svg';
import {COLORS} from '../themes';

export default function Sidebar()
{
    return (
        <aside style={styles.sidebar}>
            <Link to="/" style={styles.sidebarLogo}>
                <img src={logo} alt="Home" style={styles.logoImg}/>
            </Link>
            <nav style={styles.nav}>
                {[
                    ['Home', '/home'],
                    ['Subscription', '/subscription'],
                    ['Library', '/library'],
                    ['Flashcards', '/flashcards'],
                    ['Test', '/test'],
                    ['Match', '/match'],
                    ['About Us', '/about-us'],
                    ['FAQs', '/faqs'],
                    ['Sign In', '/login'],
                ].map(([label, to]) => (
                    <Link key={to} to={to} style={styles.navItem}>
                        {label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}

const styles = {
    sidebar: {
        width: '200px',
        padding: '1rem',
        borderRight: `1px solid ${COLORS.lightMint}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    sidebarLogo: {marginBottom: '2rem'},
    logoImg: {width: '26px'},
    nav: {display: 'flex', flexDirection: 'column', gap: '0.75rem'},
    navItem: {textDecoration: 'none', color: COLORS.darkBlue, fontSize: '1rem'},
};

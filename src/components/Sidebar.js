import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { COLORS } from '../themes';
// Import React Icons
import { 
  FaHome, 
  FaCreditCard, 
  FaBook, 
  FaStickyNote, 
  FaPencilAlt, 
  FaSearch,
  FaInfoCircle,
  FaQuestionCircle,
  FaSignInAlt
} from 'react-icons/fa';

// Navigation items
const NAVIGATION_ITEMS = [
  { label: 'Home', path: '/home', icon: <FaHome size={18} /> },
  { label: 'Subscription', path: '/subscription', icon: <FaCreditCard size={18} /> },
  { label: 'Library', path: '/library', icon: <FaBook size={18} /> },
  { label: 'Flashcards', path: '/flashcards', icon: <FaStickyNote size={18} /> },
  { label: 'Test', path: '/test', icon: <FaPencilAlt size={18} /> },
  { label: 'Match', path: '/match', icon: <FaSearch size={18} /> }
];

// Footer items
const FOOTER_ITEMS = [
  { label: 'About Us', path: '/about-us', icon: <FaInfoCircle size={18} /> },
  { label: 'FAQs', path: '/faqs', icon: <FaQuestionCircle size={18} /> },
  { label: 'Sign In', path: '/login', icon: <FaSignInAlt size={18} /> }
];

export default function Sidebar() {
  const location = useLocation();
  
  // Check if a navigation item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside style={styles.sidebar}>
      <Link to="/" style={styles.sidebarLogo}>
        <img src={logo} alt="Home" style={styles.logoImg} />
      </Link>
      
      <nav style={styles.nav}>
        {NAVIGATION_ITEMS.map(({ label, path, icon }) => (
          <Link 
            key={path} 
            to={path} 
            style={
              isActive(path) 
                ? {...styles.navItem, ...styles.activeNavItem} 
                : styles.navItem
            }
          >
            <span style={styles.navIcon}>{icon}</span>
            <span style={styles.navLabel}>{label}</span>
          </Link>
        ))}
      </nav>
      
      <div style={styles.spacer} />
      
      <footer style={styles.footer}>
        {FOOTER_ITEMS.map(({ label, path, icon }) => (
          <Link 
            key={path} 
            to={path} 
            style={
              isActive(path) 
                ? {...styles.navItem, ...styles.activeNavItem} 
                : styles.navItem
            }
          >
            <span style={styles.navIcon}>{icon}</span>
            <span style={styles.navLabel}>{label}</span>
          </Link>
        ))}
      </footer>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: '220px',
    padding: '1.5rem 1rem',
    borderRight: '1px solid rgba(0, 150, 136, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  },
  sidebarLogo: {
    marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  logoImg: {
    width: '32px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%',
  },
  navItem: {
    textDecoration: 'none',
    color: '#444',
    fontSize: '0.95rem',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 12px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    fontWeight: '500',
  },
  activeNavItem: {
    backgroundColor: 'rgba(0, 150, 136, 0.1)',
    color: '#009688',
    fontWeight: '600',
  },
  navIcon: {
    marginRight: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#009688',
  },
  navLabel: {
    whiteSpace: 'nowrap',
  },
  spacer: {
    flexGrow: 1,
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%',
    marginTop: '1rem',
    borderTop: '1px solid rgba(0, 150, 136, 0.1)',
    paddingTop: '1rem',
  },
};
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth() || { user: null, logout: () => {} };
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const styles = {
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      transition: 'box-shadow 0.3s ease',
      boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
      borderBottom: scrolled ? '1px solid #E5E7EB' : '1px solid transparent',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '4rem'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      textDecoration: 'none',
      color: 'var(--text-dark, #1F2937)'
    },
    logoText: {
      fontSize: '1.25rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, var(--primary, #7C3AED), var(--primary-light, #A78BFA))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    navLinks: {
      display: 'none',
      alignItems: 'center',
      gap: '2rem'
    },
    link: {
      textDecoration: 'none',
      color: 'var(--text-muted, #6B7280)',
      fontWeight: '500',
      fontSize: '0.95rem',
      transition: 'color 0.2s'
    },
    actions: {
      display: 'none',
      alignItems: 'center',
      gap: '1rem'
    },
    btnGhost: {
      textDecoration: 'none',
      color: 'var(--text-dark, #1F2937)',
      fontWeight: '600',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      transition: 'background-color 0.2s',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer'
    },
    btnPrimary: {
      textDecoration: 'none',
      color: 'white',
      fontWeight: '600',
      padding: '0.5rem 1.25rem',
      borderRadius: '0.375rem',
      background: 'linear-gradient(135deg, var(--primary, #7C3AED), var(--primary-light, #A78BFA))',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(124, 58, 237, 0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    avatar: {
      width: '2rem',
      height: '2rem',
      borderRadius: '50%',
      background: 'var(--primary-light, #A78BFA)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      fontSize: '0.875rem'
    },
    mobileBtn: {
      display: 'block',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-dark, #1F2937)',
      padding: '0.5rem'
    },
    mobileMenu: {
      position: 'absolute',
      top: '4rem',
      left: 0,
      right: 0,
      background: 'white',
      borderBottom: '1px solid #E5E7EB',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      padding: '1rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    mobileLink: {
      textDecoration: 'none',
      color: 'var(--text-dark, #1F2937)',
      fontWeight: '500',
      padding: '0.5rem 0',
      borderBottom: '1px solid #F3F4F6'
    }
  };

  const getUserInitials = () => {
    if (!user) return '';
    return user.name ? user.name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <>
      <style>
        {\`
          .nav-desktop-links, .nav-desktop-actions { display: none !important; }
          .nav-mobile-btn { display: block !important; }
          @media (min-width: 768px) {
            .nav-desktop-links, .nav-desktop-actions { display: flex !important; }
            .nav-mobile-btn { display: none !important; }
          }
          .nav-link:hover, .btn-ghost:hover { color: var(--primary, #7C3AED); }
          .btn-ghost:hover { background-color: #F3F4F6; }
        \`}
      </style>
      <header style={styles.navbar}>
        <div style={styles.container}>
          <Link to="/" style={styles.logoContainer}>
            <Activity color="var(--primary, #7C3AED)" size={24} />
            <span style={styles.logoText}>SpeechMirror</span>
          </Link>

          {/* Desktop Links */}
          <nav style={styles.navLinks} className="nav-desktop-links">
            <a href="#features" style={styles.link} className="nav-link">Features</a>
            <a href="#how-it-works" style={styles.link} className="nav-link">How It Works</a>
            <a href="#about" style={styles.link} className="nav-link">About</a>
          </nav>

          {/* Desktop Actions */}
          <div style={styles.actions} className="nav-desktop-actions">
            {user ? (
              <>
                <div style={styles.avatar}>{getUserInitials()}</div>
                <Link to="/dashboard" style={styles.btnPrimary}>
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
                <button onClick={logout} style={styles.btnGhost} className="btn-ghost" title="Logout">
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={styles.btnGhost} className="btn-ghost">Login</Link>
                <Link to="/register" style={styles.btnPrimary}>Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            style={styles.mobileBtn} 
            className="nav-mobile-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={styles.mobileMenu}
              className="nav-mobile-menu"
            >
              <a href="#features" style={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#how-it-works" style={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>How It Works</a>
              <a href="#about" style={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>About</a>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                {user ? (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingBottom: '0.5rem' }}>
                      <div style={styles.avatar}>{getUserInitials()}</div>
                      <span style={{ fontWeight: '500' }}>{user.name || 'User'}</span>
                    </div>
                    <Link to="/dashboard" style={{ ...styles.btnPrimary, justifyContent: 'center' }} onClick={() => setMobileMenuOpen(false)}>
                      Dashboard
                    </Link>
                    <button 
                      onClick={() => { logout(); setMobileMenuOpen(false); }} 
                      style={{ ...styles.btnGhost, width: '100%', textAlign: 'center', border: '1px solid #E5E7EB' }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" style={{ ...styles.btnGhost, textAlign: 'center', border: '1px solid #E5E7EB' }} onClick={() => setMobileMenuOpen(false)}>Login</Link>
                    <Link to="/register" style={{ ...styles.btnPrimary, justifyContent: 'center' }} onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;

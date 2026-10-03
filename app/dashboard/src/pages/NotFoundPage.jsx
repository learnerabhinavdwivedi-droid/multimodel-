import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, LayoutDashboard } from 'lucide-react';

const NotFoundPage = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9fafb',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      overflow: 'hidden'
    },
    orb1: {
      position: 'absolute',
      top: '20%',
      left: '15%',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(167, 139, 250, 0) 70%)',
      filter: 'blur(40px)',
      animation: 'float 8s ease-in-out infinite'
    },
    orb2: {
      position: 'absolute',
      bottom: '10%',
      right: '20%',
      width: '400px',
      height: '400px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, rgba(124, 58, 237, 0) 70%)',
      filter: 'blur(50px)',
      animation: 'float 12s ease-in-out infinite reverse'
    },
    content: {
      position: 'relative',
      zIndex: 1,
      textAlign: 'center',
      padding: '2rem',
      maxWidth: '600px'
    },
    title: {
      fontSize: '8rem',
      fontWeight: '800',
      lineHeight: '1',
      margin: '0',
      background: 'linear-gradient(135deg, var(--primary, #7C3AED), var(--primary-light, #A78BFA))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      color: 'transparent'
    },
    heading: {
      fontSize: '2rem',
      fontWeight: '700',
      color: 'var(--text-dark, #1F2937)',
      marginTop: '1rem',
      marginBottom: '0.5rem'
    },
    subtitle: {
      fontSize: '1.125rem',
      color: 'var(--text-muted, #6B7280)',
      marginBottom: '2.5rem'
    },
    buttonContainer: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    btnHome: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      background: 'linear-gradient(135deg, var(--primary, #7C3AED), var(--primary-light, #A78BFA))',
      color: 'white',
      fontWeight: '600',
      textDecoration: 'none',
      transition: 'opacity 0.2s',
      boxShadow: '0 4px 6px -1px rgba(124, 58, 237, 0.2), 0 2px 4px -1px rgba(124, 58, 237, 0.1)'
    },
    btnDashboard: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      background: 'transparent',
      color: 'var(--text-dark, #1F2937)',
      fontWeight: '600',
      textDecoration: 'none',
      border: '2px solid #E5E7EB',
      transition: 'all 0.2s'
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-20px) scale(1.05); }
            100% { transform: translateY(0px) scale(1); }
          }
          .btn-home:hover { opacity: 0.9; }
          .btn-dashboard:hover { border-color: var(--primary, #7C3AED); color: var(--primary, #7C3AED); }
        `}
      </style>
      <div style={styles.container}>
        <div style={styles.background}>
          <div style={styles.orb1}></div>
          <div style={styles.orb2}></div>
        </div>
        
        <motion.div 
          style={styles.content}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            style={styles.title}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            404
          </motion.h1>
          <motion.h2 
            style={styles.heading}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Page not found
          </motion.h2>
          <motion.p 
            style={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>
          
          <motion.div 
            style={styles.buttonContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/" style={styles.btnHome} className="btn-home">
              <Home size={20} />
              Go Home
            </Link>
            <Link to="/dashboard" style={styles.btnDashboard} className="btn-dashboard">
              <LayoutDashboard size={20} />
              Go to Dashboard
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFoundPage;

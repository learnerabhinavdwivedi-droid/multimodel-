import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Mic, 
  Activity, 
  AlignLeft, 
  AlertTriangle, 
  Search, 
  BarChart2, 
  FileText, 
  ShieldAlert,
  Upload,
  Cpu,
  CheckCircle,
  TrendingUp,
  Zap
} from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  
  // Navigation background opacity based on scroll
  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.9)']
  );

  const navBackdropBlur = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(8px)']
  );

  const navBorder = useTransform(
    scrollY,
    [0, 50],
    ['1px solid rgba(229, 231, 235, 0)', '1px solid rgba(229, 231, 235, 1)']
  );

  const navShadow = useTransform(
    scrollY,
    [0, 50],
    ['0 0px 0px rgba(0,0,0,0)', '0 4px 6px -1px rgba(0,0,0,0.05)']
  );

  // Animations
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Styles object using CSS variables
  const styles = {
    container: {
      fontFamily: 'Inter, system-ui, sans-serif',
      color: 'var(--text-dark, #1F2937)',
      backgroundColor: 'var(--off-white, #FAFAFA)',
      minHeight: '100vh',
      overflowX: 'hidden'
    },
    nav: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 5%',
      transition: 'all 0.3s ease'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: 'bold',
      fontSize: '1.25rem',
      color: 'var(--primary-dark, #4C1D95)',
      textDecoration: 'none'
    },
    navLinks: {
      display: 'flex',
      gap: '2rem',
      alignItems: 'center'
    },
    navLink: {
      color: 'var(--text-muted, #6B7280)',
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: '0.95rem',
      transition: 'color 0.2s'
    },
    authButtons: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    },
    btnGhost: {
      background: 'transparent',
      border: 'none',
      color: 'var(--text-dark, #1F2937)',
      fontWeight: 500,
      cursor: 'pointer',
      padding: '0.5rem 1rem',
      fontSize: '0.95rem'
    },
    btnPrimary: {
      background: 'linear-gradient(135deg, var(--primary, #7C3AED), var(--primary-light, #A78BFA))',
      color: 'var(--white, #FFFFFF)',
      border: 'none',
      borderRadius: '9999px',
      padding: '0.6rem 1.5rem',
      fontWeight: 600,
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(124, 58, 237, 0.25)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      fontSize: '0.95rem'
    },
    btnOutline: {
      background: 'transparent',
      color: 'var(--primary, #7C3AED)',
      border: '2px solid var(--primary, #7C3AED)',
      borderRadius: '9999px',
      padding: '0.6rem 1.5rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '0.95rem'
    },
    hero: {
      padding: '10rem 5% 6rem',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      overflow: 'hidden'
    },
    blob1: {
      position: 'absolute',
      top: '10%',
      left: '15%',
      width: '400px',
      height: '400px',
      background: 'radial-gradient(circle, var(--primary-lighter, #DDD6FE) 0%, rgba(255,255,255,0) 70%)',
      borderRadius: '50%',
      filter: 'blur(40px)',
      zIndex: 0,
      opacity: 0.6
    },
    blob2: {
      position: 'absolute',
      bottom: '20%',
      right: '10%',
      width: '500px',
      height: '500px',
      background: 'radial-gradient(circle, var(--primary-bg, #EDE9FE) 0%, rgba(255,255,255,0) 70%)',
      borderRadius: '50%',
      filter: 'blur(50px)',
      zIndex: 0,
      opacity: 0.7
    },
    heroContent: {
      position: 'relative',
      zIndex: 10,
      maxWidth: '800px'
    },
    heroTitle: {
      fontSize: '4rem',
      fontWeight: 800,
      lineHeight: 1.1,
      marginBottom: '1.5rem',
      color: 'var(--text-dark, #1F2937)'
    },
    textGradient: {
      background: 'linear-gradient(to right, var(--primary-dark, #4C1D95), var(--primary, #7C3AED))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      color: 'transparent'
    },
    heroSubtitle: {
      fontSize: '1.25rem',
      color: 'var(--text-muted, #6B7280)',
      lineHeight: 1.6,
      marginBottom: '2.5rem'
    },
    heroButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      marginBottom: '4rem'
    },
    statsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '3rem',
      flexWrap: 'wrap',
      paddingTop: '2rem',
      borderTop: '1px solid var(--border, #E5E7EB)'
    },
    statItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem'
    },
    statValue: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: 'var(--primary, #7C3AED)'
    },
    statLabel: {
      fontSize: '0.875rem',
      color: 'var(--text-muted, #6B7280)',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    section: {
      padding: '6rem 5%',
      position: 'relative'
    },
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: 700,
      textAlign: 'center',
      marginBottom: '4rem',
      color: 'var(--text-dark, #1F2937)'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    featureCard: {
      background: 'var(--white, #FFFFFF)',
      borderRadius: '1rem',
      padding: '2rem',
      border: '1px solid var(--border, #E5E7EB)',
      transition: 'all 0.3s ease',
      cursor: 'default'
    },
    featureIconWrap: {
      width: '3rem',
      height: '3rem',
      borderRadius: '0.75rem',
      background: 'var(--primary-bg, #EDE9FE)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--primary, #7C3AED)',
      marginBottom: '1.5rem'
    },
    featureTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      marginBottom: '1rem',
      color: 'var(--text-dark, #1F2937)'
    },
    featureDesc: {
      color: 'var(--text-muted, #6B7280)',
      lineHeight: 1.6
    },
    howItWorksGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4rem',
      maxWidth: '800px',
      margin: '0 auto',
      position: 'relative'
    },
    connectingLine: {
      position: 'absolute',
      left: '1.8rem',
      top: '2rem',
      bottom: '2rem',
      width: '4px',
      background: 'linear-gradient(to bottom, var(--primary-light, #A78BFA), var(--primary-lighter, #DDD6FE))',
      zIndex: 0
    },
    stepItem: {
      display: 'flex',
      gap: '2rem',
      position: 'relative',
      zIndex: 10
    },
    stepNumber: {
      width: '4rem',
      height: '4rem',
      minWidth: '4rem',
      borderRadius: '50%',
      background: 'var(--white, #FFFFFF)',
      border: '4px solid var(--primary, #7C3AED)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      fontWeight: 700,
      color: 'var(--primary, #7C3AED)',
      boxShadow: '0 4px 10px rgba(124, 58, 237, 0.2)'
    },
    stepContent: {
      paddingTop: '0.5rem'
    },
    stepTitle: {
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBottom: '0.5rem',
      color: 'var(--text-dark, #1F2937)'
    },
    stepDesc: {
      color: 'var(--text-muted, #6B7280)',
      lineHeight: 1.6,
      fontSize: '1.1rem'
    },
    pricingGrid: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      maxWidth: '900px',
      margin: '0 auto',
      flexWrap: 'wrap'
    },
    pricingCard: {
      flex: '1',
      minWidth: '300px',
      background: 'var(--white, #FFFFFF)',
      borderRadius: '1.5rem',
      padding: '3rem 2rem',
      border: '1px solid var(--border, #E5E7EB)',
      display: 'flex',
      flexDirection: 'column'
    },
    pricingCardPro: {
      border: '2px solid var(--primary, #7C3AED)',
      boxShadow: '0 20px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(124, 58, 237, 0.04)',
      transform: 'translateY(-10px)'
    },
    pricingHeader: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    pricingTitle: {
      fontSize: '1.5rem',
      fontWeight: 700,
      marginBottom: '0.5rem',
      color: 'var(--text-dark, #1F2937)'
    },
    pricingCredits: {
      fontSize: '3rem',
      fontWeight: 800,
      color: 'var(--primary-dark, #4C1D95)',
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    pricingLabel: {
      fontSize: '1rem',
      fontWeight: 500,
      color: 'var(--text-muted, #6B7280)'
    },
    pricingFeatures: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 2rem 0',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      flexGrow: 1
    },
    pricingFeatureItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      color: 'var(--text-dark, #1F2937)'
    },
    aboutSection: {
      background: 'var(--primary-dark, #4C1D95)',
      color: 'var(--white, #FFFFFF)',
      padding: '5rem 5%',
      textAlign: 'center'
    },
    aboutText: {
      maxWidth: '800px',
      margin: '0 auto 3rem',
      fontSize: '1.25rem',
      lineHeight: 1.8,
      color: 'var(--primary-lighter, #DDD6FE)'
    },
    metricsRow: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      flexWrap: 'wrap',
      maxWidth: '1000px',
      margin: '0 auto'
    },
    metricCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      padding: '1.5rem',
      borderRadius: '1rem',
      flex: '1',
      minWidth: '150px'
    },
    metricValue: {
      fontSize: '2rem',
      fontWeight: 800,
      color: 'var(--white, #FFFFFF)',
      marginBottom: '0.5rem'
    },
    metricLabel: {
      fontSize: '0.875rem',
      color: 'var(--primary-lighter, #DDD6FE)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontWeight: 600
    },
    footer: {
      background: 'var(--white, #FFFFFF)',
      borderTop: '1px solid var(--border, #E5E7EB)',
      padding: '4rem 5% 2rem',
    },
    footerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      marginBottom: '3rem'
    },
    footerCol: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    footerTitle: {
      fontWeight: 600,
      color: 'var(--text-dark, #1F2937)',
      fontSize: '1.1rem',
      marginBottom: '0.5rem'
    },
    footerLink: {
      color: 'var(--text-muted, #6B7280)',
      textDecoration: 'none',
      transition: 'color 0.2s'
    },
    footerBottom: {
      paddingTop: '2rem',
      borderTop: '1px solid var(--border, #E5E7EB)',
      textAlign: 'center',
      color: 'var(--text-muted, #6B7280)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      alignItems: 'center'
    }
  };

  const features = [
    {
      icon: <AlignLeft size={24} />,
      title: 'Word-Aligned Comparison',
      desc: 'Compare speech word-by-word, not raw time. Our intelligent alignment handles pace differences seamlessly.'
    },
    {
      icon: <AlertTriangle size={24} />,
      title: 'Flaw Detection',
      desc: 'Automatically detect rushed pace, dead pauses, flat pitch, and mumbled clarity in any recording.'
    },
    {
      icon: <Search size={24} />,
      title: 'Causal Explanations',
      desc: 'Every flag shows exactly which features moved and by how much, providing transparent feedback.'
    },
    {
      icon: <Activity size={24} />,
      title: 'Interactive Waveform',
      desc: 'Dual waveform overlay with click-to-play regions for precise pinpointing of speech flaws.'
    },
    {
      icon: <BarChart2 size={24} />,
      title: 'Rubric Scoring',
      desc: 'Automatic and objective scoring across pace, pause, pitch, energy, and clarity dimensions.'
    },
    {
      icon: <ShieldAlert size={24} />,
      title: 'Honest Limitations',
      desc: 'Transparent about system constraints and edge cases to ensure reliable and trustworthy analysis.'
    }
  ];

  const steps = [
    {
      icon: <Upload size={24} />,
      title: 'Upload',
      desc: 'Upload an ideal reference recording and a participant recording to begin the comparison process.'
    },
    {
      icon: <AlignLeft size={24} />,
      title: 'Align',
      desc: 'We perform word-level forced alignment using WhisperX to map timestamps accurately.'
    },
    {
      icon: <Cpu size={24} />,
      title: 'Analyze',
      desc: 'Our engine extracts acoustic features and detects flaw regions based on contrastive differences.'
    },
    {
      icon: <FileText size={24} />,
      title: 'Report',
      desc: 'Receive a comprehensively scored rubric with causal explanations and interactive visualization.'
    }
  ];

  const metrics = [
    { label: 'Data Engineering', value: '30%' },
    { label: 'Explainability', value: '25%' },
    { label: 'Features', value: '20%' },
    { label: 'Dashboard', value: '15%' },
    { label: 'Code Quality', value: '10%' }
  ];

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <motion.nav 
        style={{
          ...styles.nav,
          backgroundColor: navBackground,
          backdropFilter: navBackdropBlur,
          borderBottom: navBorder,
          boxShadow: navShadow
        }}
      >
        <Link to="/" style={styles.logo}>
          <div style={{ background: 'var(--primary, #7C3AED)', color: 'white', padding: '0.4rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <Mic size={20} />
          </div>
          SpeechMirror
        </Link>
        
        <div style={styles.navLinks}>
          <a href="#features" style={styles.navLink}>Features</a>
          <a href="#how-it-works" style={styles.navLink}>How It Works</a>
          <a href="#about" style={styles.navLink}>About</a>
          <a href="#pricing" style={styles.navLink}>Credits</a>
        </div>

        <div style={styles.authButtons}>
          <button style={styles.btnGhost} onClick={() => navigate('/login')}>Login</button>
          <button 
            style={styles.btnPrimary} 
            onClick={() => navigate('/dashboard')}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(124, 58, 237, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(124, 58, 237, 0.25)';
            }}
          >
            Get Started
          </button>
        </div>
      </motion.nav>

      {/* Hero */}
      <section style={styles.hero}>
        <motion.div 
          style={styles.blob1}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          style={styles.blob2}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.9, 0.7] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <motion.div 
          style={styles.heroContent}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 style={styles.heroTitle} variants={fadeIn}>
            Contrastive Speech <span style={styles.textGradient}>Analytics</span>
          </motion.h1>
          
          <motion.p style={styles.heroSubtitle} variants={fadeIn}>
            Compare, analyze, and improve speech delivery with AI-powered acoustic analysis. 
            Word-aligned comparison, measured causes, and real-time visual feedback.
          </motion.p>
          
          <motion.div style={styles.heroButtons} variants={fadeIn}>
            <button 
              style={styles.btnPrimary}
              onClick={() => navigate('/dashboard')}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
            >
              Start Analyzing
            </button>
            <button 
              style={styles.btnOutline}
              onClick={() => navigate('/demo')}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--primary-bg, #EDE9FE)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Try Demo
            </button>
          </motion.div>

          <motion.div style={styles.statsContainer} variants={fadeIn}>
            <div style={styles.statItem}>
              <span style={styles.statValue}>4</span>
              <span style={styles.statLabel}>Flaw Types</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statValue}>95%+</span>
              <span style={styles.statLabel}>Accuracy</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statValue}>&lt;300ms</span>
              <span style={styles.statLabel}>Latency</span>
            </div>
            <div style={styles.statItem}>
              <span style={{...styles.statValue, color: '#10B981'}}>Live</span>
              <span style={styles.statLabel}>Real-time</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" style={{...styles.section, background: 'var(--white, #FFFFFF)'}}>
        <motion.h2 
          style={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Powerful Speech Analysis
        </motion.h2>
        
        <div style={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              style={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(124, 58, 237, 0.15)';
                e.currentTarget.style.borderColor = 'var(--primary-light, #A78BFA)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border, #E5E7EB)';
              }}
            >
              <div style={styles.featureIconWrap}>{feature.icon}</div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDesc}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={styles.section}>
        <motion.h2 
          style={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>
        
        <div style={styles.howItWorksGrid}>
          <div style={styles.connectingLine}></div>
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              style={{
                ...styles.stepItem, 
                marginLeft: idx % 2 === 0 ? '0' : '10%',
                marginRight: idx % 2 === 0 ? '10%' : '0'
              }}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
            >
              <div style={styles.stepNumber}>{idx + 1}</div>
              <div style={styles.stepContent}>
                <h3 style={styles.stepTitle}>{step.title}</h3>
                <p style={styles.stepDesc}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing / Credits */}
      <section id="pricing" style={{...styles.section, background: 'var(--white, #FFFFFF)'}}>
        <motion.h2 
          style={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Flexible Credit System
        </motion.h2>
        
        <div style={styles.pricingGrid}>
          <motion.div 
            style={styles.pricingCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div style={styles.pricingHeader}>
              <h3 style={styles.pricingTitle}>Free</h3>
              <div style={styles.pricingCredits}>
                50 <span style={styles.pricingLabel}>credits</span>
              </div>
            </div>
            
            <ul style={styles.pricingFeatures}>
              <li style={styles.pricingFeatureItem}>
                <CheckCircle size={20} color="var(--primary, #7C3AED)" />
                Basic contrastive analysis
              </li>
              <li style={styles.pricingFeatureItem}>
                <CheckCircle size={20} color="var(--primary, #7C3AED)" />
                3 exports per day
              </li>
              <li style={styles.pricingFeatureItem}>
                <CheckCircle size={20} color="var(--primary, #7C3AED)" />
                Email support
              </li>
            </ul>
            
            <button style={{...styles.btnOutline, width: '100%'}}>Current Plan</button>
          </motion.div>

          <motion.div 
            style={{...styles.pricingCard, ...styles.pricingCardPro}}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div style={{
              position: 'absolute',
              top: '-15px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--primary, #7C3AED)',
              color: 'white',
              padding: '0.25rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: 600
            }}>
              RECOMMENDED
            </div>
            
            <div style={styles.pricingHeader}>
              <h3 style={styles.pricingTitle}>Pro</h3>
              <div style={styles.pricingCredits}>
                500 <span style={styles.pricingLabel}>credits</span>
              </div>
            </div>
            
            <ul style={styles.pricingFeatures}>
              <li style={styles.pricingFeatureItem}>
                <CheckCircle size={20} color="var(--primary, #7C3AED)" />
                Advanced flaw detection
              </li>
              <li style={styles.pricingFeatureItem}>
                <CheckCircle size={20} color="var(--primary, #7C3AED)" />
                Unlimited exports
              </li>
              <li style={styles.pricingFeatureItem}>
                <CheckCircle size={20} color="var(--primary, #7C3AED)" />
                Batch processing
              </li>
              <li style={styles.pricingFeatureItem}>
                <CheckCircle size={20} color="var(--primary, #7C3AED)" />
                Priority 24/7 support
              </li>
            </ul>
            
            <button style={{...styles.btnPrimary, width: '100%'}}>Upgrade Now</button>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={styles.aboutSection}>
        <motion.h2 
          style={{...styles.sectionTitle, color: 'var(--white, #FFFFFF)', marginBottom: '2rem'}}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Built for Excellence
        </motion.h2>
        
        <motion.p 
          style={styles.aboutText}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          SpeechMirror is built for the IIT Mandi Multimodal AI Hackathon 2026, Track C. 
          Focused on data-driven speech analysis with contrastive evaluation.
        </motion.p>
        
        <div style={styles.metricsRow}>
          {metrics.map((metric, idx) => (
            <motion.div 
              key={idx} 
              style={styles.metricCard}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (idx * 0.1) }}
            >
              <div style={styles.metricValue}>{metric.value}</div>
              <div style={styles.metricLabel}>{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={{...styles.footerCol, maxWidth: '300px'}}>
            <Link to="/" style={styles.logo}>
              <div style={{ background: 'var(--primary, #7C3AED)', color: 'white', padding: '0.4rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <Mic size={20} />
              </div>
              SpeechMirror
            </Link>
            <p style={{color: 'var(--text-muted, #6B7280)', marginTop: '1rem', lineHeight: 1.6}}>
              AI-powered acoustic analysis for comprehensive speech delivery evaluation.
            </p>
          </div>
          
          <div style={styles.footerCol}>
            <h4 style={styles.footerTitle}>Product</h4>
            <Link to="/dashboard" style={styles.footerLink}>Dashboard</Link>
            <a href="#features" style={styles.footerLink}>Features</a>
            <a href="#pricing" style={styles.footerLink}>Pricing</a>
          </div>

          <div style={styles.footerCol}>
            <h4 style={styles.footerTitle}>Resources</h4>
            <Link to="/docs" style={styles.footerLink}>Documentation</Link>
            <Link to="/api" style={styles.footerLink}>API Reference</Link>
            <a href="#about" style={styles.footerLink}>About Hackathon</a>
          </div>

          <div style={styles.footerCol}>
            <h4 style={styles.footerTitle}>Legal</h4>
            <Link to="/privacy" style={styles.footerLink}>Privacy Policy</Link>
            <Link to="/terms" style={styles.footerLink}>Terms of Service</Link>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <p>IIT Mandi Multimodal AI Hackathon 2026, Track C</p>
          <p>&copy; {new Date().getFullYear()} SpeechMirror. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

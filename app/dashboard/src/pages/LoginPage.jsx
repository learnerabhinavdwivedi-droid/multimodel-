import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      if (login) {
        await login(email, password, rememberMe);
      }
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: 'var(--white, #FFFFFF)',
  };

  const leftPanelStyle = {
    flex: 1,
    background: 'linear-gradient(135deg, var(--primary, #7C3AED) 0%, var(--primary-dark, #4C1D95) 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '3rem',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
  };

  const rightPanelStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '3rem',
    maxWidth: '600px',
    margin: '0 auto',
    width: '100%',
  };

  const waveformStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    height: '100px',
    margin: '2rem 0',
  };

  const getBarHeight = (i) => {
    const heights = [20, 40, 60, 30, 80, 40, 100, 50, 70, 30, 90, 40, 60, 20];
    return heights[i] || 50;
  };

  return (
    <div style={containerStyle}>
      {/* Left Panel */}
      <div style={leftPanelStyle} className="hidden md:flex">
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ backgroundColor: 'var(--white, #FFFFFF)', color: 'var(--primary, #7C3AED)', padding: '0.25rem 0.75rem', borderRadius: '0.5rem' }}>S</span>
            SpeechMirror
          </h1>
          <p style={{ marginTop: '1rem', fontSize: '1.25rem', opacity: 0.9 }}>
            Perfect your communication skills with AI-powered feedback.
          </p>
        </div>

        <div style={waveformStyle}>
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${getBarHeight(i)}%` }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              style={{
                width: '8px',
                backgroundColor: 'var(--white, #FFFFFF)',
                borderRadius: '999px',
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        <div>
          <Quote size={32} style={{ opacity: 0.5, marginBottom: '1rem' }} />
          <p style={{ fontSize: '1.125rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.5rem' }}>
            "SpeechMirror completely transformed how I prepare for my presentations. The real-time feedback is invaluable."
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-light, #A78BFA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              JD
            </div>
            <div>
              <div style={{ fontWeight: 'bold' }}>Jane Doe</div>
              <div style={{ opacity: 0.8, fontSize: '0.875rem' }}>Product Manager</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={rightPanelStyle}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-dark, #1F2937)', marginBottom: '0.5rem' }}>
            Welcome back
          </h2>
          <p style={{ color: 'var(--text-muted, #6B7280)', marginBottom: '2rem' }}>
            Please enter your details to sign in.
          </p>

          {error && (
            <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-dark, #1F2937)', marginBottom: '0.5rem' }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted, #6B7280)' }}>
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border, #E5E7EB)',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary, #7C3AED)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border, #E5E7EB)'}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-dark, #1F2937)', marginBottom: '0.5rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted, #6B7280)' }}>
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '0.75rem 2.5rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border, #E5E7EB)',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary, #7C3AED)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border, #E5E7EB)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted, #6B7280)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-dark, #1F2937)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: 'var(--primary, #7C3AED)', width: '16px', height: '16px' }}
                />
                Remember me
              </label>
              <Link to="/forgot-password" style={{ fontSize: '0.875rem', color: 'var(--primary, #7C3AED)', textDecoration: 'none', fontWeight: 500 }}>
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.875rem',
                borderRadius: '0.5rem',
                border: 'none',
                background: 'linear-gradient(to right, var(--primary, #7C3AED), var(--primary-light, #A78BFA))',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '0.5rem',
                transition: 'opacity 0.2s',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : (
                <>
                  Sign In
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted, #6B7280)' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: 'var(--primary, #7C3AED)', textDecoration: 'none', fontWeight: 600 }}>
                Sign Up
              </Link>
            </p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', width: '100%', height: '1px', backgroundColor: 'var(--border, #E5E7EB)' }}></div>
              <span style={{ position: 'relative', backgroundColor: 'var(--white, #FFFFFF)', padding: '0 1rem', fontSize: '0.875rem', color: 'var(--text-muted, #6B7280)' }}>
                Or continue with
              </span>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button
                disabled
                title="Coming Soon"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border, #E5E7EB)',
                  backgroundColor: 'transparent',
                  color: 'var(--text-dark, #1F2937)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'not-allowed',
                  opacity: 0.6,
                }}
              >
                Google
              </button>
              <button
                disabled
                title="Coming Soon"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border, #E5E7EB)',
                  backgroundColor: 'transparent',
                  color: 'var(--text-dark, #1F2937)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'not-allowed',
                  opacity: 0.6,
                }}
              >
                GitHub
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

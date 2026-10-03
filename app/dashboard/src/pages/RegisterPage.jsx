import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Loader2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const getPasswordStrength = (pass) => {
    if (!pass) return 0;
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) strength += 1;
    return strength; // 0-3
  };

  const strength = getPasswordStrength(password);
  const strengthColors = ['var(--border, #E5E7EB)', '#EF4444', '#F59E0B', '#10B981'];
  const strengthLabels = ['', 'Weak', 'Medium', 'Strong'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!agreeTerms) {
      setError('You must agree to the Terms of Service');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      if (register) {
        await register(name, email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create an account');
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
            Join us today and unlock your true speaking potential.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {[
            { icon: <ShieldCheck size={24} />, title: 'Secure & Private', desc: 'Your speech data is encrypted and kept private.' },
            { icon: <Loader2 size={24} />, title: 'Real-time AI Analysis', desc: 'Get instant feedback on pacing, tone, and filler words.' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
            >
              <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}>
                {feature.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: '0 0 0.25rem 0' }}>{feature.title}</h3>
                <p style={{ opacity: 0.8, margin: 0 }}>{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div>
          <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>
            © {new Date().getFullYear()} SpeechMirror. All rights reserved.
          </p>
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
            Create an account
          </h2>
          <p style={{ color: 'var(--text-muted, #6B7280)', marginBottom: '2rem' }}>
            Get started with your free SpeechMirror account.
          </p>

          {error && (
            <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label htmlFor="name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-dark, #1F2937)', marginBottom: '0.5rem' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted, #6B7280)' }}>
                  <User size={18} />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
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
                  placeholder="john@example.com"
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
                  placeholder="Min 8 characters"
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
              
              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.25rem', height: '4px', borderRadius: '2px', overflow: 'hidden' }}>
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        style={{
                          flex: 1,
                          backgroundColor: level <= strength ? strengthColors[strength] : 'var(--border, #E5E7EB)',
                          transition: 'background-color 0.3s'
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: strengthColors[strength], marginTop: '0.25rem', textAlign: 'right' }}>
                    {strengthLabels[strength]}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-dark, #1F2937)', marginBottom: '0.5rem' }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted, #6B7280)' }}>
                  <Lock size={18} />
                </div>
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
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
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-dark, #1F2937)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                style={{ accentColor: 'var(--primary, #7C3AED)', width: '16px', height: '16px', marginTop: '0.125rem' }}
              />
              <span>
                I agree to the <a href="#" style={{ color: 'var(--primary, #7C3AED)', textDecoration: 'none' }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--primary, #7C3AED)', textDecoration: 'none' }}>Privacy Policy</a>
              </span>
            </label>

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
              {loading ? <Loader2 size={20} className="animate-spin" /> : 'Create Account'}
            </button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted, #6B7280)' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--primary, #7C3AED)', textDecoration: 'none', fontWeight: 600 }}>
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

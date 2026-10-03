import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, KeyRound, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      if (forgotPassword) {
        await forgotPassword(email);
      }
      setSuccess(true);
    } catch (err) {
      setError('Failed to process your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#F3F4F6', // light gray background
  };

  const cardStyle = {
    backgroundColor: 'var(--white, #FFFFFF)',
    padding: '2.5rem',
    borderRadius: '1rem',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '450px',
  };

  return (
    <div style={containerStyle}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={cardStyle}
      >
        {!success ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{ backgroundColor: 'var(--primary-light, #A78BFA)', padding: '1rem', borderRadius: '50%', color: 'var(--white, #FFFFFF)' }}>
                <KeyRound size={32} />
              </div>
            </div>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-dark, #1F2937)', textAlign: 'center', marginBottom: '0.5rem' }}>
              Reset your password
            </h2>
            <p style={{ color: 'var(--text-muted, #6B7280)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.9375rem', lineHeight: 1.5 }}>
              Enter the email address associated with your account and we'll send you a link to reset your password.
            </p>

            {error && (
              <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem', textAlign: 'center' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-dark, #1F2937)', marginBottom: '0.5rem' }}>
                  Email Address
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

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  backgroundColor: 'var(--primary, #7C3AED)',
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
                {loading ? <Loader2 size={20} className="animate-spin" /> : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{ color: '#10B981' }}>
                <CheckCircle2 size={64} />
              </div>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-dark, #1F2937)', marginBottom: '1rem' }}>
              Check your email
            </h2>
            <p style={{ color: 'var(--text-muted, #6B7280)', marginBottom: '2rem', fontSize: '0.9375rem', lineHeight: 1.5 }}>
              We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and spam folder.
            </p>
          </motion.div>
        )}

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link 
            to="/login" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              color: 'var(--text-muted, #6B7280)', 
              textDecoration: 'none', 
              fontWeight: 500,
              fontSize: '0.875rem',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-dark, #1F2937)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted, #6B7280)'}
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

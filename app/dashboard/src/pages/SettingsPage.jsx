import React, { useState } from 'react';
import { Settings, Edit2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const initials = user?.name ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : 'U';
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    timezone: 'UTC',
    alignment: 'WhisperX',
    rushedSensitivity: 50,
    pauseSensitivity: 50,
    flatSensitivity: 50,
    mumbledSensitivity: 50,
    autoPlay: true,
    showConfidence: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const styles = {
    container: { padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', color: 'var(--text-dark, #1F2937)' },
    header: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' },
    title: { margin: 0, fontSize: '1.875rem', fontWeight: 'bold' },
    profileSection: { display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' },
    avatar: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--primary, #7C3AED)', color: 'var(--white, #FFFFFF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' },
    profileInfo: { flex: 1 },
    profileName: { margin: '0 0 0.25rem 0', fontSize: '1.5rem', fontWeight: '600' },
    profileEmail: { margin: 0, color: 'var(--text-muted, #6B7280)' },
    editBtn: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', border: '1px solid var(--border, #E5E7EB)', backgroundColor: 'var(--white, #FFFFFF)', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: '500' },
    card: { backgroundColor: 'var(--white, #FFFFFF)', border: '1px solid var(--border, #E5E7EB)', borderRadius: '0.5rem', padding: '1.5rem', marginBottom: '2rem' },
    dangerCard: { backgroundColor: 'var(--white, #FFFFFF)', border: '1px solid #EF4444', borderRadius: '0.5rem', padding: '1.5rem', marginBottom: '2rem' },
    cardTitle: { fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', marginTop: 0 },
    dangerTitle: { fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', marginTop: 0, color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.5rem' },
    formGroup: { marginBottom: '1.25rem' },
    label: { display: 'block', marginBottom: '0.5rem', fontWeight: '500' },
    input: { width: '100%', padding: '0.75rem', border: '1px solid var(--border, #E5E7EB)', borderRadius: '0.375rem', boxSizing: 'border-box' },
    select: { width: '100%', padding: '0.75rem', border: '1px solid var(--border, #E5E7EB)', borderRadius: '0.375rem', boxSizing: 'border-box', backgroundColor: 'var(--white, #FFFFFF)' },
    saveBtn: { backgroundColor: 'var(--primary, #7C3AED)', color: 'var(--white, #FFFFFF)', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', fontWeight: '600', cursor: 'pointer', marginTop: '1rem' },
    radioGroup: { display: 'flex', gap: '1.5rem' },
    radioLabel: { display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' },
    sliderGroup: { display: 'flex', alignItems: 'center', gap: '1rem' },
    slider: { flex: 1, accentColor: 'var(--primary, #7C3AED)' },
    toggleGroup: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border, #E5E7EB)' },
    toggleSwitch: (checked) => ({ position: 'relative', width: '44px', height: '24px', backgroundColor: checked ? 'var(--primary, #7C3AED)' : 'var(--border, #E5E7EB)', borderRadius: '9999px', cursor: 'pointer', transition: 'background-color 0.2s' }),
    toggleThumb: (checked) => ({ position: 'absolute', top: '2px', left: checked ? '22px' : '2px', width: '20px', height: '20px', backgroundColor: 'var(--white, #FFFFFF)', borderRadius: '50%', transition: 'left 0.2s' }),
    dangerBtn: { backgroundColor: 'var(--white, #FFFFFF)', color: '#EF4444', border: '1px solid #EF4444', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', fontWeight: '600', cursor: 'pointer', marginRight: '1rem' },
    dangerBtnSolid: { backgroundColor: '#EF4444', color: 'var(--white, #FFFFFF)', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', fontWeight: '600', cursor: 'pointer' }
  };

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={styles.container}>
      <header style={styles.header}>
        <Settings size={32} color="var(--primary, #7C3AED)" />
        <h1 style={styles.title}>Settings</h1>
      </header>

      <div style={styles.profileSection}>
        <div style={styles.avatar}>{initials}</div>
        <div style={styles.profileInfo}>
          <h2 style={styles.profileName}>{user.name}</h2>
          <p style={styles.profileEmail}>{user.email}</p>
        </div>
        <button style={styles.editBtn}><Edit2 size={16} /> Edit Profile</button>
      </div>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Account Settings</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>Display Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Timezone</label>
          <select name="timezone" value={formData.timezone} onChange={handleChange} style={styles.select}>
            <option value="UTC">UTC (Universal Coordinated Time)</option>
            <option value="EST">EST (Eastern Standard Time)</option>
            <option value="PST">PST (Pacific Standard Time)</option>
          </select>
        </div>
        <button style={styles.saveBtn}>Save Changes</button>
      </div>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Analysis Preferences</h2>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Default Alignment Method</label>
          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input type="radio" name="alignment" value="WhisperX" checked={formData.alignment === 'WhisperX'} onChange={handleChange} />
              WhisperX (Recommended)
            </label>
            <label style={styles.radioLabel}>
              <input type="radio" name="alignment" value="MFA" checked={formData.alignment === 'MFA'} onChange={handleChange} />
              Montreal Forced Aligner (MFA)
            </label>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Flaw Sensitivity</label>
          {['rushed', 'pause', 'flat', 'mumbled'].map(flaw => (
            <div key={flaw} style={{marginBottom: '1rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem', textTransform: 'capitalize'}}>
                <span>{flaw}</span>
                <span>{formData[`${flaw}Sensitivity`]}%</span>
              </div>
              <div style={styles.sliderGroup}>
                <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Low</span>
                <input 
                  type="range" 
                  name={`${flaw}Sensitivity`} 
                  min="0" max="100" 
                  value={formData[`${flaw}Sensitivity`]} 
                  onChange={handleChange} 
                  style={styles.slider} 
                />
                <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>High</span>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.toggleGroup}>
          <div>
            <div style={{fontWeight: '500'}}>Auto-play Audio</div>
            <div style={{fontSize: '0.875rem', color: 'var(--text-muted)'}}>Automatically play audio when opening analysis</div>
          </div>
          <div 
            style={styles.toggleSwitch(formData.autoPlay)} 
            onClick={() => setFormData(prev => ({...prev, autoPlay: !prev.autoPlay}))}
          >
            <div style={styles.toggleThumb(formData.autoPlay)}></div>
          </div>
        </div>

        <div style={{...styles.toggleGroup, borderBottom: 'none'}}>
          <div>
            <div style={{fontWeight: '500'}}>Show Confidence Scores</div>
            <div style={{fontSize: '0.875rem', color: 'var(--text-muted)'}}>Display AI confidence metrics on transcripts</div>
          </div>
          <div 
            style={styles.toggleSwitch(formData.showConfidence)} 
            onClick={() => setFormData(prev => ({...prev, showConfidence: !prev.showConfidence}))}
          >
            <div style={styles.toggleThumb(formData.showConfidence)}></div>
          </div>
        </div>
      </div>

      <div style={styles.dangerCard}>
        <h2 style={styles.dangerTitle}><AlertTriangle size={20} /> Danger Zone</h2>
        <p style={{marginBottom: '1.5rem', color: 'var(--text-muted)'}}>Irreversible and destructive actions.</p>
        <button style={styles.dangerBtn}>Clear Analysis History</button>
        <button style={styles.dangerBtnSolid}>Delete Account</button>
      </div>
    </motion.div>
  );
}

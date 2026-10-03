import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Coins, Target, Calendar, ArrowUp, ChevronRight, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCredits } from '../contexts/CreditContext';

// Mock Data
const MOCK_ANALYSES = [
  { id: 1, date: '2026-10-02', transcript: 'I wanted to talk about the quarterly results...', flawType: 'Filler Words', severity: 'Low', score: 3.5, status: 'completed' },
  { id: 2, date: '2026-10-01', transcript: 'So, basically, the new feature is, uh, deployed...', flawType: 'Rushed Pace', severity: 'High', score: 1.8, status: 'completed' },
  { id: 3, date: '2026-09-30', transcript: 'Let me just share my screen really quick...', flawType: 'Monotone', severity: 'Medium', score: 2.5, status: 'processing' },
  { id: 4, date: '2026-09-28', transcript: 'If we look at the metrics from last year...', flawType: 'Clear', severity: 'None', score: 4.0, status: 'completed' },
  { id: 5, date: '2026-09-25', transcript: 'The API is failing because, um...', flawType: 'Audio Quality', severity: 'High', score: 0, status: 'failed' },
];

const STYLES = {
  page: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', color: 'var(--text-dark, #1F2937)' },
  banner: { background: 'linear-gradient(135deg, var(--primary, #7C3AED) 0%, var(--primary-light, #A78BFA) 100%)', borderRadius: '1rem', padding: '2rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '2rem' },
  bannerContent: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  bannerTitle: { fontSize: '1.875rem', fontWeight: 'bold', margin: 0 },
  bannerSubtitle: { fontSize: '1.125rem', opacity: 0.9, margin: 0 },
  bannerButton: { backgroundColor: 'white', color: 'var(--primary, #7C3AED)', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' },
  statCard: { backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--primary, #7C3AED)' },
  statIconContainer: { padding: '0.75rem', backgroundColor: 'var(--off-white, #FAFAFA)', borderRadius: '0.5rem', color: 'var(--primary, #7C3AED)' },
  statContent: { display: 'flex', flexDirection: 'column' },
  statLabel: { fontSize: '0.875rem', color: 'var(--text-muted, #6B7280)', fontWeight: '500' },
  statValue: { fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-dark, #1F2937)' },
  mainContentGrid: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' },
  panel: { backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  panelHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
  panelTitle: { fontSize: '1.25rem', fontWeight: '600', margin: 0 },
  viewAllLink: { color: 'var(--primary, #7C3AED)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500', display: 'flex', alignItems: 'center' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  th: { padding: '0.75rem 1rem', borderBottom: '1px solid var(--border, #E5E7EB)', color: 'var(--text-muted, #6B7280)', fontWeight: '500', fontSize: '0.875rem' },
  td: { padding: '1rem', borderBottom: '1px solid var(--border, #E5E7EB)', fontSize: '0.875rem' },
  transcriptCell: { maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  badge: (status) => {
    const colors = {
      completed: { bg: '#D1FAE5', text: '#065F46' },
      processing: { bg: '#FEF3C7', text: '#92400E' },
      failed: { bg: '#FEE2E2', text: '#991B1B' }
    };
    return { padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: colors[status]?.bg, color: colors[status]?.text, textTransform: 'capitalize' };
  },
  insightItem: { marginBottom: '1.5rem' },
  insightLabel: { fontSize: '0.875rem', color: 'var(--text-muted, #6B7280)', marginBottom: '0.5rem', display: 'block' },
  insightValue: { fontSize: '1rem', fontWeight: '600', color: 'var(--text-dark, #1F2937)', display: 'flex', alignItems: 'center', gap: '0.5rem' },
  progressBarBg: { width: '100%', height: '8px', backgroundColor: 'var(--border, #E5E7EB)', borderRadius: '4px', marginTop: '0.5rem', overflow: 'hidden' },
  progressBarFill: (percent, color = 'var(--primary, #7C3AED)') => ({ height: '100%', width: `${percent}%`, backgroundColor: color, borderRadius: '4px' }),
};

export default function DashboardPage() {
  const { user = { name: 'Alex' } } = useAuth() || {};
  const { credits = 50, totalCredits = 100 } = useCredits() || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div style={STYLES.page}>
      <motion.div initial="hidden" animate="show" variants={containerVariants}>
        {/* Welcome Banner */}
        <motion.div variants={itemVariants} style={STYLES.banner}>
          <div style={STYLES.bannerContent}>
            <h1 style={STYLES.bannerTitle}>Welcome back, {user?.name}! 👋</h1>
            <p style={STYLES.bannerSubtitle}>Here's your speech analysis overview</p>
          </div>
          <button 
            style={STYLES.bannerButton} 
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onClick={() => window.location.href = '/dashboard/analyze'}
          >
            + New Analysis
          </button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={containerVariants} style={STYLES.statsGrid}>
          <motion.div variants={itemVariants} style={STYLES.statCard}>
            <div style={STYLES.statIconContainer}><BarChart3 size={24} /></div>
            <div style={STYLES.statContent}>
              <span style={STYLES.statLabel}>Total Analyses</span>
              <span style={STYLES.statValue}>12</span>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} style={STYLES.statCard}>
            <div style={STYLES.statIconContainer}><Coins size={24} /></div>
            <div style={STYLES.statContent}>
              <span style={STYLES.statLabel}>Credits Remaining</span>
              <span style={STYLES.statValue}>{credits}</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} style={STYLES.statCard}>
            <div style={STYLES.statIconContainer}><Target size={24} /></div>
            <div style={STYLES.statContent}>
              <span style={STYLES.statLabel}>Average Score</span>
              <span style={STYLES.statValue}>2.1/4.0</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} style={STYLES.statCard}>
            <div style={STYLES.statIconContainer}><Calendar size={24} /></div>
            <div style={STYLES.statContent}>
              <span style={STYLES.statLabel}>This Month</span>
              <span style={STYLES.statValue}>5 analyses</span>
            </div>
          </motion.div>
        </motion.div>

        <div style={STYLES.mainContentGrid}>
          {/* Recent Analyses Table */}
          <motion.div variants={itemVariants} style={STYLES.panel}>
            <div style={STYLES.panelHeader}>
              <h2 style={STYLES.panelTitle}>Recent Analyses</h2>
              <a href="/dashboard/history" style={STYLES.viewAllLink}>
                View All <ChevronRight size={16} />
              </a>
            </div>
            <table style={STYLES.table}>
              <thead>
                <tr>
                  <th style={STYLES.th}>Date</th>
                  <th style={STYLES.th}>Transcript</th>
                  <th style={STYLES.th}>Flaw Type</th>
                  <th style={STYLES.th}>Score</th>
                  <th style={STYLES.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_ANALYSES.map((row, i) => (
                  <motion.tr 
                    key={row.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{ transition: 'background-color 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.05)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={STYLES.td}>{row.date}</td>
                    <td style={{ ...STYLES.td, ...STYLES.transcriptCell }}>{row.transcript}</td>
                    <td style={STYLES.td}>{row.flawType}</td>
                    <td style={STYLES.td}>{row.score > 0 ? row.score.toFixed(1) : '-'}</td>
                    <td style={STYLES.td}>
                      <span style={STYLES.badge(row.status)}>{row.status}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Quick Insights Panel */}
          <motion.div variants={itemVariants} style={STYLES.panel}>
            <div style={STYLES.panelHeader}>
              <h2 style={STYLES.panelTitle}>Quick Insights</h2>
            </div>
            
            <div style={STYLES.insightItem}>
              <span style={STYLES.insightLabel}>Most Common Flaw</span>
              <span style={STYLES.insightValue}><Activity size={18} style={{ color: 'var(--primary, #7C3AED)' }}/> Rushed Pace</span>
              <div style={STYLES.progressBarBg}>
                <div style={STYLES.progressBarFill(65)}></div>
              </div>
            </div>

            <div style={STYLES.insightItem}>
              <span style={STYLES.insightLabel}>Improvement Trend</span>
              <span style={STYLES.insightValue} style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                <ArrowUp size={18} /> 15% better this week
              </span>
            </div>

            <div style={STYLES.insightItem}>
              <span style={STYLES.insightLabel}>Credit Usage</span>
              <span style={STYLES.insightValue}>{totalCredits - credits} / {totalCredits} used</span>
              <div style={STYLES.progressBarBg}>
                <div style={STYLES.progressBarFill(((totalCredits - credits) / totalCredits) * 100, '#A78BFA')}></div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

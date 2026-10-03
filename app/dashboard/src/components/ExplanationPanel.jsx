import React from 'react';
import { Clock, Activity, Signal, Mic, AlertCircle } from 'lucide-react';
import { getSeverityColor, getSeverityLabel, SeverityChip } from './SeverityChips';

const FLAW_TYPES = {
  rushed_pace: { icon: Clock, color: '#EF4444', label: 'Rushed Pace' },
  dead_pause: { icon: Activity, color: '#F59E0B', label: 'Dead Pause' },
  flat_pitch: { icon: Signal, color: '#10B981', label: 'Flat Pitch' },
  mumbled_clarity: { icon: Mic, color: '#7C3AED', label: 'Mumbled Clarity' }
};

const ExplanationPanel = ({ regions }) => {
  if (!regions || regions.length === 0) return null;

  const styles = {
    container: {
      backgroundColor: '#FFFFFF',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
      border: '1px solid #E5E7EB',
      fontFamily: "'Inter', sans-serif"
    },
    title: {
      fontSize: '1.15rem',
      fontWeight: '600',
      color: '#1F2937',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '16px'
    },
    card: (color) => ({
      backgroundColor: '#FFFFFF',
      border: '1px solid #E5E7EB',
      borderLeft: `4px solid ${color}`,
      borderRadius: '8px',
      padding: '16px',
      transition: 'all 0.2s ease',
      cursor: 'default'
    }),
    cardHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(124, 58, 237, 0.15)'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '12px'
    },
    typeInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    typeLabel: {
      fontWeight: '600',
      color: '#1F2937',
      fontSize: '1rem'
    },
    reason: {
      color: '#4B5563',
      fontSize: '0.9rem',
      marginBottom: '16px',
      lineHeight: '1.5'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '0.875rem'
    },
    th: {
      textAlign: 'left',
      padding: '8px',
      backgroundColor: '#F5F3FF',
      color: '#6D28D9',
      fontWeight: '600',
      borderBottom: '1px solid #DDD6FE'
    },
    td: {
      padding: '8px',
      color: '#374151',
      borderBottom: '1px solid #E5E7EB'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        <span style={{ width: 4, height: 20, background: 'linear-gradient(180deg, #7C3AED, #A78BFA)', borderRadius: 2, display: 'inline-block' }} />
        Detailed Explanations
      </h2>
      <div style={styles.grid}>
        {regions.map((exp, index) => {
          const typeInfo = FLAW_TYPES[exp.type] || { icon: AlertCircle, color: '#6B7280', label: exp.type };
          const Icon = typeInfo.icon;
          
          return (
            <div 
              key={index} 
              style={styles.card(typeInfo.color)}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, styles.cardHover);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={styles.header}>
                <div style={styles.typeInfo}>
                  <Icon size={20} color={typeInfo.color} />
                  <span style={styles.typeLabel}>{typeInfo.label}</span>
                </div>
                <SeverityChip severity={exp.severity} />
              </div>
              <p style={styles.reason}>{exp.explanation || exp.reason}</p>
              
              {exp.evidence && exp.evidence.length > 0 && (
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Metric</th>
                      <th style={styles.th}>Participant</th>
                      <th style={styles.th}>Ideal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exp.evidence.map((ev, i) => (
                      <tr key={i}>
                        <td style={styles.td}>{ev.feature || ev.metric}</td>
                        <td style={styles.td}>{ev.obs ?? ev.value}</td>
                        <td style={styles.td}>{ev.ref ?? ev.expected}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExplanationPanel;

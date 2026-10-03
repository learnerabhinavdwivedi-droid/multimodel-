import React from 'react';

const RubricScores = ({ scores }) => {
  if (!scores) return null;

  // The scores are provided on a 0-4 scale where 0 is Ideal (Best) and 4 is Severely Botched (Worst).
  // We'll extract overall and the specific dimensions.
  const { overall = 0, ...dimensions } = scores;
  
  // Calculate a "Health" percentage (0 is 100% healthy, 4 is 0% healthy)
  const healthPercentage = Math.max(0, 100 - (overall / 4) * 100);

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
    overallContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '32px'
    },
    circleWrap: {
      position: 'relative',
      width: '140px',
      height: '140px'
    },
    circleText: {
      position: 'absolute',
      top: '45%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#1F2937'
    },
    circleSub: {
      position: 'absolute',
      bottom: '35px',
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: '0.75rem',
      color: '#6B7280',
      fontWeight: '500'
    },
    dimensionsGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    dimensionItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    },
    dimensionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    dimensionName: {
      color: '#4B5563',
      fontWeight: '500',
      fontSize: '0.85rem',
      textTransform: 'capitalize'
    },
    dimensionScore: {
      color: '#1F2937',
      fontWeight: '600',
      fontSize: '0.85rem'
    },
    barBg: {
      height: '8px',
      backgroundColor: '#F3F4F6',
      borderRadius: '4px',
      overflow: 'hidden'
    },
    barFill: (score) => {
      // Invert score for width (0 = 100% full, 4 = 0% full, etc.)
      const width = Math.max(0, 100 - (score / 4) * 100);
      return {
        height: '100%',
        width: `${width}%`,
        background: 'linear-gradient(90deg, #7C3AED, #A78BFA)',
        borderRadius: '4px',
        transition: 'width 1s ease-out'
      };
    }
  };

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (healthPercentage / 100) * circumference;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        <span style={{ width: 4, height: 20, background: 'linear-gradient(180deg, #7C3AED, #A78BFA)', borderRadius: 2, display: 'inline-block' }} />
        Rubric Scores
      </h2>
      
      <div style={styles.overallContainer}>
        <div style={styles.circleWrap}>
          <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
            <defs>
              <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>
            </defs>
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#F3F4F6"
              strokeWidth="10"
            />
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="url(#purpleGradient)"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s ease-out' }}
            />
          </svg>
          <div style={styles.circleText}>{overall.toFixed(1)}</div>
          <div style={styles.circleSub}>Severity (0-4)</div>
        </div>
      </div>

      <div style={styles.dimensionsGrid}>
        {Object.entries(dimensions).map(([key, score]) => (
          <div key={key} style={styles.dimensionItem}>
            <div style={styles.dimensionHeader}>
              <span style={styles.dimensionName}>{key}</span>
              <span style={styles.dimensionScore}>{Number(score).toFixed(1)} / 4.0</span>
            </div>
            <div style={styles.barBg}>
              <div style={styles.barFill(score)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RubricScores;

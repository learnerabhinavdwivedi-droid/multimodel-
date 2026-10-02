import React from 'react';
import { getSeverityColor } from './SeverityChips';

const RubricScores = ({ scores }) => {
  if (!scores) return null;

  const dimensions = [
    { key: 'pace', label: 'Pace' },
    { key: 'pause', label: 'Pause' },
    { key: 'pitch', label: 'Pitch' },
    { key: 'energy', label: 'Energy' },
    { key: 'clarity', label: 'Clarity' }
  ];

  return (
    <div className="panel">
      <h2>Overall Performance</h2>

      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: getSeverityColor(scores.overall || 0) }}>
          {(scores.overall != null ? scores.overall : 0).toFixed(1)}
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Aggregate Score (0 = Ideal, 4 = Botched)
        </div>
      </div>

      <div>
        {dimensions.map(dim => {
          const score = scores[dim.key] != null ? scores[dim.key] : 0;
          const percentage = (score / 4) * 100;
          const color = getSeverityColor(score);

          return (
            <div className="score-row" key={dim.key}>
              <div className="score-label">{dim.label}</div>
              <div className="score-bar-bg">
                <div
                  className="score-bar-fill"
                  style={{
                    width: `${Math.max(5, percentage)}%`,
                    backgroundColor: color,
                    transition: 'width 0.5s ease-out'
                  }}
                />
              </div>
              <div style={{ width: '30px', textAlign: 'right', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {score.toFixed(1)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RubricScores;

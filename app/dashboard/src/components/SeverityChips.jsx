import React from 'react';

export const getSeverityColor = (severity) => {
  switch (severity) {
    case 0: return '#10B981'; // green
    case 1: return '#84CC16'; // lime
    case 2: return '#F59E0B'; // amber
    case 3: return '#F97316'; // orange
    case 4: return '#EF4444'; // red
    default: return '#6B7280'; // gray
  }
};

export const getSeverityLabel = (severity) => {
  switch (severity) {
    case 0: return 'Perfect';
    case 1: return 'Slight';
    case 2: return 'Moderate';
    case 3: return 'Severe';
    case 4: return 'Critical';
    default: return 'Unknown';
  }
};

export const SeverityChip = ({ severity }) => {
  const color = getSeverityColor(severity);
  const label = getSeverityLabel(severity);

  const style = {
    backgroundColor: color,
    color: '#FFFFFF',
    padding: '4px 12px',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    display: 'inline-block',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  return (
    <span style={style}>
      {label}
    </span>
  );
};

import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

const LimitationsPanel = ({ limitations }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!limitations || limitations.length === 0) return null;

  const styles = {
    container: {
      backgroundColor: '#FFFFFF',
      border: '1px solid #FEF3C7',
      borderLeft: '4px solid #F59E0B',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
      fontFamily: 'sans-serif',
      marginBottom: '24px',
      overflow: 'hidden'
    },
    header: {
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      backgroundColor: '#FFFBEB'
    },
    titleInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    title: {
      color: '#92400E',
      fontWeight: '600',
      fontSize: '1rem',
      margin: 0
    },
    icon: {
      color: '#F59E0B'
    },
    content: {
      padding: isOpen ? '16px' : '0',
      maxHeight: isOpen ? '500px' : '0',
      opacity: isOpen ? 1 : 0,
      transition: 'all 0.3s ease-in-out',
      overflow: 'hidden'
    },
    list: {
      margin: 0,
      paddingLeft: '24px',
      color: '#4B5563',
      fontSize: '0.9rem',
      lineHeight: '1.5'
    },
    listItem: {
      marginBottom: '8px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <div style={styles.titleInfo}>
          <AlertTriangle size={20} style={styles.icon} />
          <h3 style={styles.title}>System Limitations</h3>
        </div>
        {isOpen ? <ChevronUp size={20} style={styles.icon} /> : <ChevronDown size={20} style={styles.icon} />}
      </div>
      <div style={styles.content}>
        <ul style={styles.list}>
          {limitations.map((limitation, index) => (
            <li key={index} style={styles.listItem}>{limitation}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LimitationsPanel;

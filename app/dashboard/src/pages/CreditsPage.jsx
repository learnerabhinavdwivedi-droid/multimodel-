import React, { useState } from 'react';
import { Coins, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCredits } from '../contexts/CreditContext';

export default function CreditsPage() {
  const { credits, totalUsed, history, addCredits } = useCredits();
  const total = credits + totalUsed;
  const used = totalUsed;
  const balance = credits;
  const percentage = total > 0 ? (used / total) * 100 : 0;
  const plan = 'Free';

  const [hoveredPackage, setHoveredPackage] = useState(null);

  const styles = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', color: 'var(--text-dark, #1F2937)' },
    header: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' },
    title: { margin: 0, fontSize: '1.875rem', fontWeight: 'bold' },
    topGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
    card: { backgroundColor: 'var(--white, #FFFFFF)', border: '1px solid var(--border, #E5E7EB)', borderRadius: '0.5rem', padding: '1.5rem', display: 'flex', flexDirection: 'column' },
    cardTitle: { fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-dark, #1F2937)' },
    progressContainer: { display: 'flex', alignItems: 'center', gap: '2rem' },
    balanceText: { fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary, #7C3AED)', lineHeight: 1 },
    subText: { color: 'var(--text-muted, #6B7280)', fontSize: '0.875rem', marginTop: '0.5rem' },
    svgRing: { transform: 'rotate(-90deg)', width: '100px', height: '100px' },
    circleBg: { fill: 'none', stroke: 'var(--border, #E5E7EB)', strokeWidth: '8' },
    circleProgress: { fill: 'none', stroke: 'var(--primary, #7C3AED)', strokeWidth: '8', strokeDasharray: '251.2', strokeDashoffset: 251.2 - (251.2 * percentage) / 100, transition: 'stroke-dashoffset 0.5s ease' },
    planName: { fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' },
    upgradeBtn: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--primary, #7C3AED)', color: 'var(--white, #FFFFFF)', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', border: 'none', fontWeight: '600', cursor: 'pointer', marginTop: 'auto' },
    costTable: { width: '100%', borderCollapse: 'collapse' },
    costRow: { borderBottom: '1px solid var(--border, #E5E7EB)' },
    costCell: { padding: '0.75rem 0' },
    packagesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
    packageCard: (isHovered, isPopular) => ({
      backgroundColor: 'var(--white, #FFFFFF)',
      border: `2px solid ${isPopular ? 'var(--primary, #7C3AED)' : 'var(--border, #E5E7EB)'}`,
      borderRadius: '0.5rem',
      padding: '2rem',
      textAlign: 'center',
      position: 'relative',
      transform: isHovered ? 'translateY(-5px)' : 'none',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      boxShadow: isHovered ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none',
    }),
    popularBadge: { position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--primary, #7C3AED)', color: 'var(--white, #FFFFFF)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold' },
    packageCredits: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' },
    packagePrice: { fontSize: '1.25rem', color: 'var(--text-muted, #6B7280)', marginBottom: '1.5rem' },
    buyBtn: (isPopular) => ({ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: isPopular ? 'none' : '1px solid var(--primary, #7C3AED)', backgroundColor: isPopular ? 'var(--primary, #7C3AED)' : 'transparent', color: isPopular ? 'var(--white, #FFFFFF)' : 'var(--primary, #7C3AED)', fontWeight: '600', cursor: 'pointer' }),
    historyTable: { width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--white, #FFFFFF)', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid var(--border, #E5E7EB)' },
    th: { padding: '1rem', textAlign: 'left', backgroundColor: 'var(--off-white, #FAFAFA)', borderBottom: '1px solid var(--border, #E5E7EB)', color: 'var(--text-muted, #6B7280)' },
    td: { padding: '1rem', borderBottom: '1px solid var(--border, #E5E7EB)' },
    creditAmount: (amount) => ({ color: amount > 0 ? '#10B981' : '#EF4444', fontWeight: '600' })
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={styles.container}>
      <header style={styles.header}>
        <Coins size={32} color="var(--primary, #7C3AED)" />
        <h1 style={styles.title}>Credits & Billing</h1>
      </header>

      <div style={styles.topGrid}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Current Balance</h2>
          <div style={styles.progressContainer}>
            <div>
              <div style={styles.balanceText}>{balance}</div>
              <div style={styles.subText}>{used} used / {total} total</div>
            </div>
            <svg style={styles.svgRing} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" style={styles.circleBg} />
              <circle cx="50" cy="50" r="40" style={styles.circleProgress} />
            </svg>
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Current Plan</h2>
          <div style={styles.planName}>{plan} Plan</div>
          <button style={styles.upgradeBtn}>
            <Sparkles size={18} />
            Upgrade to Pro
          </button>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Credit Costs</h2>
          <table style={styles.costTable}>
            <tbody>
              <tr style={styles.costRow}><td style={styles.costCell}>Speech Analysis</td><td style={{...styles.costCell, textAlign: 'right', fontWeight: 'bold'}}>5</td></tr>
              <tr style={styles.costRow}><td style={styles.costCell}>PDF Export</td><td style={{...styles.costCell, textAlign: 'right', fontWeight: 'bold'}}>2</td></tr>
              <tr style={styles.costRow}><td style={styles.costCell}>Batch Analysis (5 files)</td><td style={{...styles.costCell, textAlign: 'right', fontWeight: 'bold'}}>20</td></tr>
              <tr><td style={styles.costCell}>API Call</td><td style={{...styles.costCell, textAlign: 'right', fontWeight: 'bold'}}>1</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <h2 style={{...styles.title, fontSize: '1.5rem', marginBottom: '1.5rem'}}>Purchase Credits</h2>
      <div style={styles.packagesGrid}>
        {[
          { name: 'Starter', credits: 100, price: '$4.99' },
          { name: 'Standard', credits: 500, price: '$19.99', popular: true },
          { name: 'Enterprise', credits: 2000, price: '$59.99' }
        ].map((pkg, i) => (
          <div 
            key={i} 
            style={styles.packageCard(hoveredPackage === i, pkg.popular)}
            onMouseEnter={() => setHoveredPackage(i)}
            onMouseLeave={() => setHoveredPackage(null)}
          >
            {pkg.popular && <div style={styles.popularBadge}>POPULAR</div>}
            <h3 style={{marginTop: 0}}>{pkg.name}</h3>
            <div style={styles.packageCredits}>{pkg.credits} <span style={{fontSize:'1rem', color:'var(--text-muted, #6B7280)'}}>credits</span></div>
            <div style={styles.packagePrice}>{pkg.price}</div>
            <button style={styles.buyBtn(pkg.popular)}>Buy Now</button>
          </div>
        ))}
      </div>

      <h2 style={{...styles.title, fontSize: '1.5rem', marginBottom: '1.5rem'}}>Transaction History</h2>
      <table style={styles.historyTable}>
        <thead>
          <tr>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Action</th>
            <th style={styles.th}>Credits</th>
            <th style={styles.th}>Balance</th>
          </tr>
        </thead>
        <tbody>
          {history.map(item => (
            <tr key={item.id}>
              <td style={styles.td}>{new Date(item.timestamp).toLocaleDateString()}</td>
              <td style={styles.td}>{item.description}</td>
              <td style={{...styles.td, ...styles.creditAmount(item.action === 'add' ? 1 : -1)}}>
                {item.action === 'add' ? '+' : '-'}{item.amount}
              </td>
              <td style={styles.td}>—</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

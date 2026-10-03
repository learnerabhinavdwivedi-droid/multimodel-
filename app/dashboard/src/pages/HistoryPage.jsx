import React, { useState } from 'react';
import { Clock, Search, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';

const mockHistory = [
  { id: 1, date: '2026-10-01', snippet: "Hello everyone, today I want to discuss our quarterly goals...", flaws: ['rushed', 'flat'], severity: 'High', score: 65, duration: '2:15' },
  { id: 2, date: '2026-10-02', snippet: "The new feature deployment will take place next Tuesday...", flaws: ['pause'], severity: 'Medium', score: 82, duration: '1:45' },
  { id: 3, date: '2026-10-03', snippet: "If we look at the metrics from last month, you'll notice...", flaws: [], severity: 'Low', score: 95, duration: '3:30' },
  { id: 4, date: '2026-10-03', snippet: "Um, I think we should, uh, reconsider the current approach.", flaws: ['pause', 'mumbled'], severity: 'High', score: 58, duration: '0:45' },
  { id: 5, date: '2026-10-04', snippet: "Moving on to the next item on our agenda, which is...", flaws: ['flat'], severity: 'Medium', score: 78, duration: '1:20' },
  { id: 6, date: '2026-10-05', snippet: "Excellent work on the recent campaign, the numbers are up.", flaws: [], severity: 'Low', score: 92, duration: '0:55' },
  { id: 7, date: '2026-10-06', snippet: "So we need to fast-track this immediately otherwise...", flaws: ['rushed'], severity: 'High', score: 60, duration: '1:10' },
  { id: 8, date: '2026-10-07', snippet: "Let me explain how the new architecture works in detail.", flaws: ['pause'], severity: 'Low', score: 88, duration: '4:00' },
  { id: 9, date: '2026-10-08', snippet: "Basically, the thing is that we have to wait for the...", flaws: ['mumbled'], severity: 'Medium', score: 72, duration: '1:30' },
  { id: 10, date: '2026-10-09', snippet: "Thank you all for joining this presentation today.", flaws: [], severity: 'Low', score: 98, duration: '0:30' }
];

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [flawFilter, setFlawFilter] = useState('all');
  
  const filteredHistory = mockHistory.filter(item => {
    const matchesSearch = item.snippet.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFlaw = flawFilter === 'all' || item.flaws.includes(flawFilter);
    return matchesSearch && matchesFlaw;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const styles = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', color: 'var(--text-dark, #1F2937)' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    titleArea: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
    title: { margin: 0, fontSize: '1.875rem', fontWeight: 'bold' },
    exportBtn: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: 'var(--primary, #7C3AED)', color: 'var(--white, #FFFFFF)', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: '500' },
    filterBar: { display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' },
    inputWrapper: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: 'var(--white, #FFFFFF)', border: '1px solid var(--border, #E5E7EB)', borderRadius: '0.375rem', flex: '1', minWidth: '200px' },
    input: { border: 'none', outline: 'none', width: '100%' },
    select: { padding: '0.5rem 1rem', border: '1px solid var(--border, #E5E7EB)', borderRadius: '0.375rem', backgroundColor: 'var(--white, #FFFFFF)' },
    tableContainer: { backgroundColor: 'var(--white, #FFFFFF)', border: '1px solid var(--border, #E5E7EB)', borderRadius: '0.5rem', overflow: 'hidden' },
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
    th: { padding: '1rem', borderBottom: '1px solid var(--border, #E5E7EB)', backgroundColor: 'var(--off-white, #FAFAFA)', fontWeight: '600', color: 'var(--text-muted, #6B7280)' },
    td: { padding: '1rem', borderBottom: '1px solid var(--border, #E5E7EB)' },
    row: (index) => ({ backgroundColor: index % 2 === 0 ? 'var(--white, #FFFFFF)' : 'var(--off-white, #FAFAFA)', cursor: 'pointer' }),
    chip: (type) => ({ padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500', marginRight: '0.25rem', backgroundColor: type === 'rushed' ? '#FEE2E2' : type === 'pause' ? '#FEF3C7' : type === 'flat' ? '#E0E7FF' : '#F3F4F6', color: type === 'rushed' ? '#991B1B' : type === 'pause' ? '#92400E' : type === 'flat' ? '#3730A3' : '#1F2937' }),
    severityBadge: (severity) => ({ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: getSeverityColor(severity), fontWeight: '500' }),
    severityDot: (severity) => ({ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getSeverityColor(severity) }),
    pagination: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderTop: '1px solid var(--border, #E5E7EB)' },
    pageBtns: { display: 'flex', gap: '0.5rem' },
    iconBtn: { padding: '0.25rem', border: '1px solid var(--border, #E5E7EB)', borderRadius: '0.25rem', backgroundColor: 'var(--white, #FFFFFF)', cursor: 'pointer' },
    empty: { padding: '3rem', textAlign: 'center', color: 'var(--text-muted, #6B7280)' }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.titleArea}>
          <Clock size={32} color="var(--primary, #7C3AED)" />
          <h1 style={styles.title}>Analysis History</h1>
        </div>
        <button style={styles.exportBtn}>
          <Download size={18} />
          Export All
        </button>
      </header>

      <div style={styles.filterBar}>
        <div style={styles.inputWrapper}>
          <Search size={18} color="var(--text-muted, #6B7280)" />
          <input 
            type="text" 
            placeholder="Search transcripts..." 
            style={styles.input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select style={styles.select}>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>All Time</option>
        </select>
        <select style={styles.select} value={flawFilter} onChange={(e) => setFlawFilter(e.target.value)}>
          <option value="all">All Flaws</option>
          <option value="rushed">Rushed</option>
          <option value="pause">Pauses</option>
          <option value="flat">Flat</option>
          <option value="mumbled">Mumbled</option>
        </select>
        <select style={styles.select}>
          <option value="all">All Severities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div style={styles.tableContainer}>
        {filteredHistory.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Transcript Snippet</th>
                <th style={styles.th}>Detected Flaws</th>
                <th style={styles.th}>Severity</th>
                <th style={styles.th}>Score</th>
                <th style={styles.th}>Duration</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item, idx) => (
                <tr key={item.id} style={styles.row(idx)}>
                  <td style={styles.td}>{item.date}</td>
                  <td style={styles.td}>"{item.snippet}"</td>
                  <td style={styles.td}>
                    {item.flaws.length > 0 ? item.flaws.map(f => (
                      <span key={f} style={styles.chip(f)}>{f}</span>
                    )) : <span style={{color: 'var(--text-muted, #6B7280)'}}>None</span>}
                  </td>
                  <td style={styles.td}>
                    <span style={styles.severityBadge(item.severity)}>
                      <span style={styles.severityDot(item.severity)}></span>
                      {item.severity}
                    </span>
                  </td>
                  <td style={styles.td}>{item.score}/100</td>
                  <td style={styles.td}>{item.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={styles.empty}>
            <Filter size={48} color="var(--border, #E5E7EB)" style={{marginBottom: '1rem'}} />
            <h3>No results found</h3>
            <p>Try adjusting your filters or search term.</p>
          </div>
        )}
        <div style={styles.pagination}>
          <span style={{color: 'var(--text-muted, #6B7280)'}}>Showing 1-{filteredHistory.length} of 24</span>
          <div style={styles.pageBtns}>
            <button style={styles.iconBtn}><ChevronLeft size={18} /></button>
            <button style={styles.iconBtn}><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

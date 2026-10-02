import React from 'react';
import { Activity, Clock, MicOff, VolumeX } from 'lucide-react';
import { SeverityChip } from './SeverityChips';

const FLAW_LABELS = {
  rushed_pace: 'Rushed Pace',
  dead_pause: 'Dead Pause',
  flat_pitch: 'Flat Pitch',
  mumbled_clarity: 'Mumbled Clarity'
};

const getFlawIcon = (type) => {
  switch (type) {
    case 'rushed_pace': return <Activity size={16} color="var(--flaw-rushed)" />;
    case 'dead_pause': return <Clock size={16} color="var(--flaw-pause)" />;
    case 'flat_pitch': return <MicOff size={16} color="var(--flaw-pitch)" />;
    case 'mumbled_clarity': return <VolumeX size={16} color="var(--flaw-mumbled)" />;
    default: return <Activity size={16} />;
  }
};

const ExplanationPanel = ({ regions, onRegionClick }) => {
  if (!regions || regions.length === 0) {
    return (
      <div className="panel">
        <h2>Detected Flaws</h2>
        <p style={{ color: 'var(--text-muted)' }}>No notable deviations detected. The participant closely matches the ideal reference.</p>
      </div>
    );
  }

  return (
    <div className="panel">
      <h2>Detected Flaws ({regions.length})</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {regions.map((region, idx) => (
          <div
            key={region.id || idx}
            className="explanation-card"
            onClick={() => onRegionClick && onRegionClick(region.start, region.end)}
          >
            <div className="explanation-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                {getFlawIcon(region.type)}
                {FLAW_LABELS[region.type] || region.type}
              </div>
              <SeverityChip score={region.severity} />
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              {region.start.toFixed(2)}s – {region.end.toFixed(2)}s
              {region.confidence != null && ` · Confidence: ${(region.confidence * 100).toFixed(0)}%`}
            </div>

            <p style={{ margin: '8px 0', fontSize: '0.95rem' }}>
              {region.explanation}
            </p>

            {region.evidence && region.evidence.length > 0 && (
              <table className="explanation-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Reference</th>
                    <th>Observed</th>
                    <th>Δ %</th>
                    <th>Z-Score</th>
                  </tr>
                </thead>
                <tbody>
                  {region.evidence.map((ev, i) => (
                    <tr key={i}>
                      <td>{ev.feature}</td>
                      <td>{typeof ev.ref === 'number' ? ev.ref.toFixed(2) : ev.ref}</td>
                      <td>{typeof ev.obs === 'number' ? ev.obs.toFixed(2) : ev.obs}</td>
                      <td style={{ color: ev.delta > 0 ? 'var(--flaw-rushed)' : 'var(--flaw-pitch)' }}>
                        {ev.delta > 0 ? '+' : ''}{typeof ev.delta === 'number' ? ev.delta.toFixed(1) : ev.delta}%
                      </td>
                      <td>{typeof ev.z_score === 'number' ? ev.z_score.toFixed(2) : ev.z_score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplanationPanel;

import React from 'react';
import Plot from 'react-plotly.js';

const FLAW_COLORS = {
  rushed_pace: 'rgba(239, 68, 68, 0.1)',
  dead_pause: 'rgba(245, 158, 11, 0.1)',
  flat_pitch: 'rgba(16, 185, 129, 0.1)',
  mumbled_clarity: 'rgba(124, 58, 237, 0.1)',
};

const FeatureTimelines = ({ timelines, regions }) => {
  if (!timelines || !timelines.time) return null;

  const time = timelines.time;

  const createShapes = () => {
    if (!regions) return [];
    return regions.map(r => ({
      type: 'rect',
      xref: 'x',
      yref: 'paper',
      x0: r.start,
      x1: r.end,
      y0: 0,
      y1: 1,
      fillcolor: FLAW_COLORS[r.type] || 'rgba(124, 58, 237, 0.08)',
      line: { width: 1, color: FLAW_COLORS[r.type]?.replace('0.1', '0.3') || 'rgba(124, 58, 237, 0.2)', dash: 'dot' }
    }));
  };

  const layoutBase = {
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: { color: '#374151', size: 11, family: "'Inter', sans-serif" },
    margin: { t: 30, r: 20, l: 50, b: 30 },
    height: 200,
    xaxis: {
      color: '#6B7280',
      gridcolor: '#F3F4F6',
      zerolinecolor: '#E5E7EB',
      title: { text: 'Time (s)', font: { size: 10, color: '#9CA3AF' } }
    },
    yaxis: {
      color: '#6B7280',
      gridcolor: '#F3F4F6',
      zerolinecolor: '#E5E7EB'
    },
    shapes: createShapes(),
    showlegend: true,
    legend: { orientation: 'h', y: 1.15, font: { size: 11 } }
  };

  const features = [
    { key: 'rate', title: 'Speech Rate', yLabel: 'syllables/s' },
    { key: 'pitch', title: 'Pitch / F0', yLabel: 'Hz' },
    { key: 'energy', title: 'RMS Energy', yLabel: 'RMS' }
  ];

  return (
    <div style={{
      background: '#FFFFFF', borderRadius: 14, padding: '20px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid #E5E7EB',
    }}>
      <h2 style={{
        margin: '0 0 20px 0', fontSize: '1.15rem', fontWeight: 600, color: '#1F2937',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ width: 4, height: 20, background: 'linear-gradient(180deg, #7C3AED, #A78BFA)', borderRadius: 2, display: 'inline-block' }} />
        Acoustic Feature Timelines
      </h2>

      {features.map(feat => {
        if (!timelines.ideal || !timelines.ideal[feat.key]) return null;

        return (
          <div key={feat.key} style={{ marginBottom: 16 }}>
            <h3 style={{
              fontSize: '0.85rem', marginBottom: 0, color: '#6B7280', fontWeight: 500,
            }}>{feat.title}</h3>
            <Plot
              data={[
                {
                  x: time,
                  y: timelines.ideal[feat.key],
                  type: 'scatter',
                  mode: 'lines',
                  name: 'Ideal',
                  line: { color: '#7C3AED', width: 2 }
                },
                {
                  x: time,
                  y: timelines.participant[feat.key],
                  type: 'scatter',
                  mode: 'lines',
                  name: 'Participant',
                  line: { color: '#EF4444', width: 2 }
                }
              ]}
              layout={{
                ...layoutBase,
                yaxis: { ...layoutBase.yaxis, title: { text: feat.yLabel, font: { size: 10, color: '#9CA3AF' } } }
              }}
              useResizeHandler={true}
              style={{ width: '100%', height: '200px' }}
              config={{ displayModeBar: false, responsive: true }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FeatureTimelines;

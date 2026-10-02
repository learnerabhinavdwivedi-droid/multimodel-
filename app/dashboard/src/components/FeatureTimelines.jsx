import React from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js/lib/core';
import Scatter from 'plotly.js/lib/scatter';

// Only register what we need to reduce bundle size
Plotly.register([Scatter]);
const Plot = createPlotlyComponent(Plotly);

const FLAW_COLORS = {
  rushed_pace: 'rgba(255, 107, 107, 0.15)',
  dead_pause: 'rgba(255, 217, 61, 0.15)',
  flat_pitch: 'rgba(107, 203, 119, 0.15)',
  mumbled_clarity: 'rgba(77, 150, 255, 0.15)',
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
      fillcolor: FLAW_COLORS[r.type] || 'rgba(255, 255, 255, 0.1)',
      line: { width: 0 }
    }));
  };

  const layoutBase = {
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: { color: '#c9d1d9', size: 11 },
    margin: { t: 30, r: 20, l: 50, b: 30 },
    height: 200,
    xaxis: {
      color: '#8b949e',
      gridcolor: '#21262d',
      zerolinecolor: '#30363d',
      title: { text: 'Time (s)', font: { size: 10 } }
    },
    yaxis: {
      color: '#8b949e',
      gridcolor: '#21262d',
      zerolinecolor: '#30363d'
    },
    shapes: createShapes(),
    showlegend: true,
    legend: { orientation: 'h', y: 1.15 }
  };

  const features = [
    { key: 'rate', title: 'Speech Rate (syllables/sec)', yLabel: 'syl/s' },
    { key: 'pitch', title: 'Pitch / F0 (Hz)', yLabel: 'Hz' },
    { key: 'energy', title: 'RMS Energy', yLabel: 'RMS' }
  ];

  return (
    <div className="panel">
      <h2>Acoustic Feature Timelines</h2>

      {features.map(feat => {
        if (!timelines.ideal || !timelines.ideal[feat.key]) return null;

        return (
          <div key={feat.key} style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '0.95rem', marginBottom: 0, color: 'var(--text-muted)' }}>{feat.title}</h3>
            <Plot
              data={[
                {
                  x: time,
                  y: timelines.ideal[feat.key],
                  type: 'scatter',
                  mode: 'lines',
                  name: 'Ideal',
                  line: { color: '#4d96ff', width: 2 }
                },
                {
                  x: time,
                  y: timelines.participant[feat.key],
                  type: 'scatter',
                  mode: 'lines',
                  name: 'Participant',
                  line: { color: '#ff6b6b', width: 2 }
                }
              ]}
              layout={{
                ...layoutBase,
                yaxis: { ...layoutBase.yaxis, title: { text: feat.yLabel, font: { size: 10 } } }
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

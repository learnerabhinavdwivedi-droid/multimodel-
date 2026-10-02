import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.esm.js';
import { Play, Pause, Square } from 'lucide-react';

const FLAW_COLORS = {
  rushed_pace: 'rgba(255, 107, 107, 0.4)',
  dead_pause: 'rgba(255, 217, 61, 0.4)',
  flat_pitch: 'rgba(107, 203, 119, 0.4)',
  mumbled_clarity: 'rgba(77, 150, 255, 0.4)'
};

// Generate a short silent WAV as a data URL for demo mode (no real audio files)
function generateSilentWav(durationSec = 15, sampleRate = 16000) {
  const numSamples = sampleRate * durationSec;
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  const writeString = (offset, str) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  // Generate a very quiet sine wave so the waveform isn't completely flat
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    // Mix of low-amplitude sine waves to simulate speech-like waveform
    const sample = Math.sin(2 * Math.PI * 200 * t) * 0.02 +
                   Math.sin(2 * Math.PI * 440 * t) * 0.01 * Math.sin(2 * Math.PI * 0.5 * t);
    view.setInt16(44 + i * 2, Math.max(-32768, Math.min(32767, sample * 32767)), true);
  }

  const blob = new Blob([buffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
}

const DualWaveform = ({ idealUrl, participantUrl, regions, jumpTime }) => {
  const idealContainerRef = useRef(null);
  const partContainerRef = useRef(null);

  const idealWs = useRef(null);
  const partWs = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!idealContainerRef.current || !partContainerRef.current) return;

    const demoAudioUrl = generateSilentWav(15);

    // Initialize Ideal WaveSurfer
    idealWs.current = WaveSurfer.create({
      container: idealContainerRef.current,
      waveColor: '#4d96ff',
      progressColor: '#1e5fba',
      height: 100,
      normalize: true,
      plugins: [
        TimelinePlugin.create()
      ]
    });

    // Initialize Participant WaveSurfer
    partWs.current = WaveSurfer.create({
      container: partContainerRef.current,
      waveColor: '#ff6b6b',
      progressColor: '#ba2a2a',
      height: 100,
      normalize: true,
      plugins: [
        TimelinePlugin.create()
      ]
    });

    const wsRegions = partWs.current.registerPlugin(RegionsPlugin.create());

    // Load audio
    idealWs.current.load(idealUrl || demoAudioUrl);
    partWs.current.load(participantUrl || demoAudioUrl);

    // Sync play/pause
    idealWs.current.on('play', () => { if (partWs.current) partWs.current.play(); setIsPlaying(true); });
    idealWs.current.on('pause', () => { if (partWs.current) partWs.current.pause(); setIsPlaying(false); });

    // Sync seeking
    let syncing = false;
    idealWs.current.on('seeking', (currentTime) => {
      if (syncing) return;
      syncing = true;
      const duration = partWs.current.getDuration();
      if (duration > 0) partWs.current.seekTo(currentTime / duration);
      syncing = false;
    });
    partWs.current.on('seeking', (currentTime) => {
      if (syncing) return;
      syncing = true;
      const duration = idealWs.current.getDuration();
      if (duration > 0) idealWs.current.seekTo(currentTime / duration);
      syncing = false;
    });

    Promise.all([
      new Promise(res => idealWs.current.on('ready', res)),
      new Promise(res => partWs.current.on('ready', res))
    ]).then(() => {
      setIsReady(true);

      // Draw flaw regions
      if (regions) {
        regions.forEach(r => {
          wsRegions.addRegion({
            start: r.start,
            end: r.end,
            color: FLAW_COLORS[r.type] || 'rgba(255, 255, 255, 0.2)',
            drag: false,
            resize: false,
          });
        });
      }
    });

    return () => {
      idealWs.current?.destroy();
      partWs.current?.destroy();
      URL.revokeObjectURL(demoAudioUrl);
    };
  }, [idealUrl, participantUrl, regions]);

  // Handle external jumpTime prop
  useEffect(() => {
    if (jumpTime !== null && idealWs.current && isReady) {
      const duration = idealWs.current.getDuration();
      if (duration > 0) {
        idealWs.current.seekTo(jumpTime / duration);
      }
    }
  }, [jumpTime, isReady]);

  const togglePlay = () => {
    if (idealWs.current) {
      idealWs.current.playPause();
    }
  };

  const stopPlay = () => {
    if (idealWs.current) {
      idealWs.current.stop();
    }
    if (partWs.current) {
      partWs.current.stop();
    }
    setIsPlaying(false);
  };

  return (
    <div className="panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ margin: 0 }}>Waveform Analysis</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="demo-btn" onClick={togglePlay} disabled={!isReady} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            {isPlaying ? 'Pause' : 'Play Both'}
          </button>
          <button className="demo-btn" onClick={stopPlay} disabled={!isReady}>
            <Square size={18} />
          </button>
        </div>
      </div>

      <div className="wave-container">
        <div className="wave-label">Ideal Reference</div>
        <div ref={idealContainerRef}></div>
      </div>

      <div className="wave-container">
        <div className="wave-label">Participant Recording</div>
        <div ref={partContainerRef}></div>
      </div>
    </div>
  );
};

export default DualWaveform;

import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.esm.js';
import { Play, Pause, Square } from 'lucide-react';

const DualWaveform = ({ idealUrl, participantUrl, flaws }) => {
  const idealContainerRef = useRef(null);
  const participantContainerRef = useRef(null);
  const timelineRef = useRef(null);
  
  const [idealWs, setIdealWs] = useState(null);
  const [participantWs, setParticipantWs] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const generateSilentWav = () => {
    const sampleRate = 44100;
    const duration = 1; // 1 sec
    const numSamples = sampleRate * duration;
    const buffer = new ArrayBuffer(44 + numSamples * 2);
    const view = new DataView(buffer);
    
    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
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
    
    const blob = new Blob([buffer], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  };

  useEffect(() => {
    if (!idealContainerRef.current || !participantContainerRef.current) return;

    const wsIdeal = WaveSurfer.create({
      container: idealContainerRef.current,
      waveColor: '#7C3AED',
      progressColor: '#5B21B6',
      height: 80,
      normalize: true,
      plugins: [
        TimelinePlugin.create({
          container: timelineRef.current,
          height: 20,
          timeInterval: 1,
          primaryLabelInterval: 5,
          style: {
            fontSize: '12px',
            color: '#6B7280',
          }
        }),
        RegionsPlugin.create()
      ]
    });

    const wsParticipant = WaveSurfer.create({
      container: participantContainerRef.current,
      waveColor: '#EF4444',
      progressColor: '#B91C1C',
      height: 80,
      normalize: true,
      plugins: [
        RegionsPlugin.create()
      ]
    });

    setIdealWs(wsIdeal);
    setParticipantWs(wsParticipant);

    wsIdeal.load(idealUrl || generateSilentWav());
    wsParticipant.load(participantUrl || generateSilentWav());

    wsIdeal.on('play', () => { wsParticipant.play(); setIsPlaying(true); });
    wsIdeal.on('pause', () => { wsParticipant.pause(); setIsPlaying(false); });
    wsIdeal.on('seeking', (time) => wsParticipant.setTime(time));

    return () => {
      wsIdeal.destroy();
      wsParticipant.destroy();
    };
  }, [idealUrl, participantUrl]);

  useEffect(() => {
    if (!idealWs || !participantWs || !flaws) return;

    const idealRegions = idealWs.registerPlugin(RegionsPlugin.create());
    const participantRegions = participantWs.registerPlugin(RegionsPlugin.create());

    flaws.forEach((flaw, index) => {
      const color = 'rgba(124, 58, 237, 0.2)'; 
      
      participantRegions.addRegion({
        start: flaw.start_time,
        end: flaw.end_time,
        color: color,
        drag: false,
        resize: false,
        content: flaw.type.replace('_', ' ')
      });
    });

  }, [idealWs, participantWs, flaws]);

  const handlePlayPause = () => {
    if (idealWs) {
      idealWs.playPause();
    }
  };

  const handleStop = () => {
    if (idealWs && participantWs) {
      idealWs.stop();
      participantWs.stop();
      idealWs.seekTo(0);
      setIsPlaying(false);
    }
  };

  const styles = {
    container: {
      backgroundColor: '#FFFFFF',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      fontFamily: 'sans-serif',
      marginBottom: '24px'
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1F2937',
      marginBottom: '16px'
    },
    controls: {
      display: 'flex',
      gap: '12px',
      marginBottom: '24px',
      alignItems: 'center'
    },
    btn: {
      background: '#F3F4F6',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      padding: '8px 16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#4B5563',
      fontWeight: '500',
      transition: 'all 0.2s'
    },
    btnPrimary: {
      background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: '500'
    },
    tracks: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    trackWrap: {
      position: 'relative',
      backgroundColor: '#F9FAFB',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      padding: '8px'
    },
    trackLabel: (color) => ({
      position: 'absolute',
      top: '8px',
      left: '8px',
      zIndex: 10,
      backgroundColor: '#FFFFFF',
      color: '#374151',
      fontSize: '0.75rem',
      fontWeight: '600',
      padding: '4px 8px',
      borderRadius: '4px',
      borderLeft: `3px solid ${color}`,
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    }),
    timeline: {
      marginTop: '8px',
      opacity: 0.8
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Audio Waveforms</h2>
      
      <div style={styles.controls}>
        <button style={styles.btnPrimary} onClick={handlePlayPause}>
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button style={styles.btn} onClick={handleStop}>
          <Square size={18} /> Stop
        </button>
      </div>

      <div style={styles.tracks}>
        <div style={styles.trackWrap}>
          <div style={styles.trackLabel('#7C3AED')}>Ideal Reference</div>
          <div ref={idealContainerRef} />
        </div>
        
        <div style={styles.trackWrap}>
          <div style={styles.trackLabel('#EF4444')}>Participant</div>
          <div ref={participantContainerRef} />
        </div>

        <div ref={timelineRef} style={styles.timeline} />
      </div>
    </div>
  );
};

export default DualWaveform;

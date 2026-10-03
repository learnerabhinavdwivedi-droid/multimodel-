import React from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Play, Check, FileAudio } from 'lucide-react';

const AudioUploader = ({ onUpload, onDemoData }) => {
  const [idealAudio, setIdealAudio] = React.useState(null);
  const [participantAudio, setParticipantAudio] = React.useState(null);
  const [transcript, setTranscript] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const onDropIdeal = (acceptedFiles) => setIdealAudio(acceptedFiles[0]);
  const onDropParticipant = (acceptedFiles) => setParticipantAudio(acceptedFiles[0]);

  const { getRootProps: getIdealProps, getInputProps: getIdealInputProps, isDragActive: idealDragActive } = useDropzone({
    onDrop: onDropIdeal,
    accept: { 'audio/*': [] },
    maxFiles: 1
  });

  const { getRootProps: getParticipantProps, getInputProps: getParticipantInputProps, isDragActive: participantDragActive } = useDropzone({
    onDrop: onDropParticipant,
    accept: { 'audio/*': [] },
    maxFiles: 1
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idealAudio || !participantAudio) return;
    setIsLoading(true);
    await onUpload({ idealAudio, participantAudio, transcript });
    setIsLoading(false);
  };

  const handleDemo = async () => {
    setIsLoading(true);
    await onDemoData();
    setIsLoading(false);
  };

  const styles = {
    container: {
      backgroundColor: '#FFFFFF',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      marginBottom: '24px',
      fontFamily: 'sans-serif'
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1F2937',
      marginBottom: '16px'
    },
    dropzones: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
      marginBottom: '24px'
    },
    dropzone: (isActive) => ({
      border: `2px dashed ${isActive ? '#7C3AED' : '#DDD6FE'}`,
      backgroundColor: isActive ? '#F3F4F6' : '#FFFFFF',
      borderRadius: '8px',
      padding: '32px 16px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px'
    }),
    dropzoneText: {
      color: '#4B5563',
      fontSize: '0.875rem'
    },
    icon: {
      color: '#7C3AED'
    },
    fileSelected: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#7C3AED',
      fontWeight: '500',
      fontSize: '0.875rem'
    },
    transcriptArea: {
      width: '100%',
      minHeight: '100px',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #E5E7EB',
      backgroundColor: '#FFFFFF',
      color: '#1F2937',
      marginBottom: '24px',
      resize: 'vertical',
      outline: 'none',
      fontSize: '0.875rem',
      boxSizing: 'border-box'
    },
    transcriptLabel: {
      display: 'block',
      color: '#374151',
      marginBottom: '8px',
      fontWeight: '500',
      fontSize: '0.875rem'
    },
    actions: {
      display: 'flex',
      gap: '16px',
      alignItems: 'center'
    },
    submitBtn: {
      background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
      color: 'white',
      border: 'none',
      padding: '10px 24px',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'opacity 0.2s',
      opacity: (!idealAudio || !participantAudio || isLoading) ? 0.6 : 1
    },
    demoBtn: {
      background: '#FFFFFF',
      color: '#7C3AED',
      border: '1px solid #7C3AED',
      padding: '10px 24px',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    spinner: {
      animation: 'spin 1s linear infinite',
      color: '#FFFFFF'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Upload Audio</h2>
      <div style={styles.dropzones}>
        <div {...getIdealProps()} style={styles.dropzone(idealDragActive)}>
          <input {...getIdealInputProps()} />
          {idealAudio ? (
            <div style={styles.fileSelected}>
              <Check size={20} />
              <span>{idealAudio.name}</span>
            </div>
          ) : (
            <>
              <UploadCloud size={32} style={styles.icon} />
              <p style={styles.dropzoneText}>Drag & drop Ideal Audio, or click to select</p>
            </>
          )}
        </div>
        <div {...getParticipantProps()} style={styles.dropzone(participantDragActive)}>
          <input {...getParticipantInputProps()} />
          {participantAudio ? (
            <div style={styles.fileSelected}>
              <Check size={20} />
              <span>{participantAudio.name}</span>
            </div>
          ) : (
            <>
              <FileAudio size={32} style={styles.icon} />
              <p style={styles.dropzoneText}>Drag & drop Participant Audio, or click to select</p>
            </>
          )}
        </div>
      </div>
      <div>
        <label style={styles.transcriptLabel}>Target Transcript (Optional)</label>
        <textarea
          style={styles.transcriptArea}
          placeholder="Enter the expected transcript to improve alignment accuracy..."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          onFocus={(e) => e.target.style.borderColor = '#7C3AED'}
          onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
        />
      </div>
      <div style={styles.actions}>
        <button 
          style={styles.submitBtn} 
          onClick={handleSubmit} 
          disabled={!idealAudio || !participantAudio || isLoading}
        >
          {isLoading ? (
            <UploadCloud size={20} style={styles.spinner} />
          ) : (
            <Play size={20} />
          )}
          Analyze Speech
        </button>
        <button style={styles.demoBtn} onClick={handleDemo} disabled={isLoading}>
          Try Demo Data
        </button>
      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AudioUploader;

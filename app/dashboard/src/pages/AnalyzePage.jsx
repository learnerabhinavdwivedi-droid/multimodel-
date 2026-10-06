import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Loader, AlertCircle, Download, Mic2 } from 'lucide-react';
import { useCredits } from '../contexts/CreditContext';
import AudioUploader from '../components/AudioUploader';
import DualWaveform from '../components/DualWaveform';
import FeatureTimelines from '../components/FeatureTimelines';
import ExplanationPanel from '../components/ExplanationPanel';
import RubricScores from '../components/RubricScores';
import LimitationsPanel from '../components/LimitationsPanel';
import { uploadAudio, analyzeAudio, getDemoData } from '../api/client';

const STYLES = {
  page: { maxWidth: '1400px', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif", color: '#1F2937' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' },
  titleRow: { display: 'flex', flexDirection: 'column', gap: '4px' },
  title: { fontSize: '1.75rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' },
  breadcrumb: { color: '#6B7280', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' },
  creditBadge: {
    background: 'linear-gradient(135deg, #EDE9FE, #DDD6FE)', border: '1px solid #C4B5FD',
    padding: '8px 16px', borderRadius: 20, fontSize: '0.85rem', fontWeight: 500,
    display: 'flex', alignItems: 'center', gap: '6px', color: '#4C1D95',
  },
  stepper: { display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem', gap: '0' },
  step: (active, completed) => ({
    display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px',
    color: active ? '#7C3AED' : completed ? '#10B981' : '#9CA3AF',
    fontWeight: active ? 600 : 400, fontSize: '0.9rem',
  }),
  stepCircle: (active, completed) => ({
    width: 28, height: 28, borderRadius: '50%',
    background: active ? 'linear-gradient(135deg, #7C3AED, #A78BFA)' : completed ? '#10B981' : '#E5E7EB',
    color: active || completed ? '#FFF' : '#9CA3AF',
    display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.75rem', fontWeight: 700,
    transition: 'all 0.3s',
  }),
  stepLine: (completed) => ({
    width: 48, height: 2, background: completed ? '#10B981' : '#E5E7EB', transition: 'background 0.3s',
  }),
  loadingCard: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: '5rem', gap: '1rem', background: '#FFF', borderRadius: 16,
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #E5E7EB',
  },
  errorCard: {
    padding: '1.5rem', background: '#FEF2F2', borderRadius: 12, color: '#991B1B',
    display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem',
    border: '1px solid #FECACA',
  },
  retryBtn: {
    background: '#991B1B', color: '#FFF', border: 'none', padding: '8px 16px',
    borderRadius: 8, cursor: 'pointer', fontWeight: 500, marginLeft: 'auto',
  },
  resultsGrid: { display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem', marginTop: '1.5rem' },
  column: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  exportBtn: {
    marginTop: '1.5rem', background: 'linear-gradient(135deg, #7C3AED, #A78BFA)', color: '#FFF',
    border: 'none', padding: '12px 24px', borderRadius: 10, display: 'flex', alignItems: 'center',
    gap: '8px', cursor: 'pointer', fontWeight: 600, marginLeft: 'auto',
    boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)', transition: 'transform 0.2s',
  },
  newBtn: {
    background: '#FFF', color: '#7C3AED', border: '1px solid #C4B5FD',
    padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 500,
    display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem',
  },
};

const STEPS = ['Upload', 'Align', 'Analyze', 'Results'];

export default function AnalyzePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);

  const { useCredit, credits } = useCredits();

  const handleUpload = async (idealFile, participantFile, transcript) => {
    if (credits < 5) {
      setError('Insufficient credits. You need at least 5 credits to run an analysis.');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      setCurrentStep(1);

      // Step 1: Upload audio files
      const uploadId = await uploadAudio(idealFile, participantFile);
      setCurrentStep(2);

      // Step 2: Run analysis
      const data = await analyzeAudio(uploadId, transcript || '');
      
      setAnalysisData(data);
      setCurrentStep(3);
      setLoading(false);
      useCredit(5, 'Speech Analysis');
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to analyze audio. Please try again.');
      setLoading(false);
      setCurrentStep(0);
    }
  };

  const handleDemo = async () => {
    if (credits < 5) {
      setError('Insufficient credits. You need at least 5 credits.');
      return;
    }
    setLoading(true);
    setError(null);
    setCurrentStep(1);
    await new Promise(r => setTimeout(r, 800));
    setCurrentStep(2);
    await new Promise(r => setTimeout(r, 1000));
    try {
      const data = await getDemoData();
      setAnalysisData(data);
      setCurrentStep(3);
      useCredit(5, 'Demo Analysis');
    } catch (err) {
      setError('Failed to load demo data.');
      setCurrentStep(0);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setAnalysisData(null);
    setCurrentStep(0);
    setError(null);
  };

  return (
    <div style={STYLES.page}>
      {/* Header */}
      <div style={STYLES.header}>
        <div style={STYLES.titleRow}>
          <div style={STYLES.breadcrumb}>
            Dashboard <ChevronRight size={14} /> Analyze
          </div>
          <h1 style={STYLES.title}>
            <Mic2 size={28} color="#7C3AED" />
            Speech Analysis
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {analysisData && (
            <button style={STYLES.newBtn} onClick={handleReset}>
              ← New Analysis
            </button>
          )}
          <div style={STYLES.creditBadge}>
            Cost: <strong>5 credits</strong> · Balance: <strong>{credits}</strong>
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div style={STYLES.stepper}>
        {STEPS.map((step, idx) => (
          <React.Fragment key={step}>
            <div style={STYLES.step(currentStep === idx, currentStep > idx)}>
              <div style={STYLES.stepCircle(currentStep === idx, currentStep > idx)}>
                {currentStep > idx ? '✓' : idx + 1}
              </div>
              {step}
            </div>
            {idx < STEPS.length - 1 && <div style={STYLES.stepLine(currentStep > idx)} />}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Error */}
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={STYLES.errorCard}>
            <AlertCircle size={22} />
            <span style={{ flex: 1 }}>{error}</span>
            <button style={STYLES.retryBtn} onClick={() => { setError(null); setCurrentStep(0); }}>Retry</button>
          </motion.div>
        )}

        {/* Step 0: Upload */}
        {currentStep === 0 && !loading && !error && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <AudioUploader onUpload={handleUpload} onDemo={handleDemo} />
          </motion.div>
        )}

        {/* Loading */}
        {loading && (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }} style={STYLES.loadingCard}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
              <Loader size={44} color="#7C3AED" />
            </motion.div>
            <h2 style={{ margin: 0, color: '#1F2937', fontSize: '1.3rem' }}>
              {currentStep === 1 ? 'Aligning Audio…' : 'Analyzing Features…'}
            </h2>
            <p style={{ color: '#6B7280', margin: 0, fontSize: '0.9rem' }}>
              {currentStep === 1
                ? 'Running word-level forced alignment with WhisperX'
                : 'Extracting acoustic features and detecting flaw regions'}
            </p>
            <div style={{
              width: 200, height: 4, background: '#E5E7EB', borderRadius: 2, overflow: 'hidden', marginTop: 8,
            }}>
              <motion.div
                style={{ height: '100%', background: 'linear-gradient(90deg, #7C3AED, #A78BFA)', borderRadius: 2 }}
                animate={{ width: ['0%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}

        {/* Step 3: Results */}
        {currentStep === 3 && analysisData && !loading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Waveform */}
            <DualWaveform
              regions={analysisData.regions}
              idealUrl={analysisData.idealAudioUrl}
              participantUrl={analysisData.participantAudioUrl}
              jumpTime={null}
            />

            {/* Results Grid */}
            <div style={STYLES.resultsGrid}>
              <div style={STYLES.column}>
                <FeatureTimelines timelines={analysisData.timelines} regions={analysisData.regions} />
                <LimitationsPanel />
              </div>
              <div style={STYLES.column}>
                <RubricScores scores={analysisData.scores} />
                <ExplanationPanel regions={analysisData.regions} onRegionClick={() => {}} />
              </div>
            </div>

            {/* Export */}
            <button
              style={STYLES.exportBtn}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              <Download size={18} /> Export Results (PDF)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

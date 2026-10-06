import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const client = axios.create({
  baseURL: API_BASE,
});

export const uploadAudio = async (idealFile, participantFile) => {
  const formData = new FormData();
  formData.append('ideal', idealFile);
  formData.append('participant', participantFile);
  
  const response = await client.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data.upload_id;
};

export const analyzeAudio = async (uploadId, transcript) => {
  const response = await client.post(`/analyze`, { upload_id: uploadId, transcript });
  return response.data;
};

export const getResult = async (resultId) => {
  const response = await client.get(`/results/${resultId}`);
  return response.data;
};

// Demo mode - calls real backend /api/demo endpoint
export const getDemoData = async () => {
  try {
    const response = await client.get('/demo');
    const demo = response.data;
    // Return the first demo sample's result
    if (demo.demo_samples && demo.demo_samples.length > 0) {
      return demo.demo_samples[0].result;
    }
    return demo;
  } catch (err) {
    // Fallback: return minimal mock data if backend demo endpoint fails
    console.warn('Demo endpoint unavailable, using fallback data:', err.message);
    return {
      sample_id: "demo-fallback",
      alignment: { method: "fallback", wer: 0, mean_conf: 0 },
      regions: [],
      scores: { pace: 0, pause: 0, pitch: 0, energy: 0, clarity: 0, overall: 0 },
      run: { commit: "local", config_hash: "local", seed: 42 },
      timelines: null
    };
  }
};

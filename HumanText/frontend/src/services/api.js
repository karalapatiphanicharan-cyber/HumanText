const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const humanizeText = async (text, mode = 'humanize', strength = 'medium', tone = 'professional') => {
  try {
    const response = await fetch(`${API_URL}/humanize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        mode,
        strength,
        tone
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to process request');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const analyzeText = async (text) => {
  try {
    const response = await fetch(`${API_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to analyze text');
    }

    return await response.json();
  } catch (error) {
    console.error('Analysis API Error:', error);
    throw error;
  }
};

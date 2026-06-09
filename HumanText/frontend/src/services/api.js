const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const humanizeText = async (text, strength = 'medium', tone = 'professional') => {
  try {
    const response = await fetch(`${API_URL}/humanize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, strength, tone }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to humanize text');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

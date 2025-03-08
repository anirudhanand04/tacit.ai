const GROK_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const API_KEY = import.meta.env.VITE_GROK_API_KEY;

export const sendMessage = async (message) => {
  try {
    const response = await fetch(GROK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: message }],
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        temperature: 0.7,
        system: "You are an intelligent AI assistant, powered by Claude 3.5 Sonnet. You help users with their questions and tasks."
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.error?.message || 'API request failed');
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Error in sendMessage:', error);
    throw error;
  }
}; 
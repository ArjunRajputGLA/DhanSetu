export const getGroqResponse = async (messageHistory) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: messageHistory.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Server response:', errorData);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      if (!data.content) {
        throw new Error('No content in response');
      }
      return data.content;
    } catch (error) {
      console.error('Error in getGroqResponse:', error);
      throw error;
    }
};
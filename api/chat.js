export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `
You are GemGem, a professional jewelry assistant working for a luxury brand. Your job is to help customers with:

- Jewelry types (rings, gold, silver, diamond, etc.)
- Purity and certifications
- Product suggestions
- Greetings and small talk (hello, how are you, who are you, etc.)

You must avoid answering any questions not related to jewelry.

Examples:
Q: Hello  
A: Hello! Welcome to GemGem — your personal jewelry assistant. How may I help you today?

Q: How are you?  
A: I'm sparkling as always! How can I assist you with your jewelry needs today?

Q: Tell me about gold purity  
A: Certainly! 24K gold is the purest form, but 22K is more durable for everyday wear. Would you like to explore some gold jewelry options?

Q: What’s the share price of Reliance?  
A: I'm here to assist only with jewelry-related questions. Please feel free to ask about diamonds, gold, or collections.

Now respond to:
User: ${message}
                  `.trim(),
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here to assist with jewelry-related questions only.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

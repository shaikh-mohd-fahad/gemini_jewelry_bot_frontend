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
You are **GemGem**, a professional, friendly, luxury jewelry assistant.

✅ You MUST:
- Greet users warmly and professionally.
- Answer only jewelry-related questions (rings, gold, silver, diamonds, purity, trends).
- Respond to greetings and small talk like "hello", "how are you", "tell me about yourself".

⛔ You MUST NOT:
- Answer anything unrelated (e.g., stock market, news, politics).
- Say "I'm not sure" — respond courteously and redirect to jewelry topics.

If someone asks something unrelated, reply with:
"I'm here to assist exclusively with jewelry-related queries. Please feel free to ask anything about diamonds, rings, gold, or our collections."

👤 User: ${message}
                  `.trim(),
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here to assist you with jewelry-related inquiries only.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

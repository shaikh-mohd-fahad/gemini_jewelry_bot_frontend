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
You are GemGem, a luxury jewelry assistant trained to handle the following types of queries:

✅ You MUST respond to:
- Greetings and small talk: "hi", "hello", "how are you", "who are you"
- Gold-related questions: "gold price", "gold in India", "22K vs 24K", "is gold good for gifts?"
- Diamonds and gemstones: "what is solitaire?", "types of diamonds"
- Jewelry suggestions: "best engagement ring", "jewelry for men", "silver vs platinum"
- Care tips: "how to clean gold", "how to store diamonds"

❌ You MUST NOT respond to:
- Stock market, politics, technology, AI, unrelated topics
- If user asks about news, stocks, companies — politely decline

🔁 If unsure, redirect the user back to jewelry-related topics.

---

Examples:

User: Hello  
Assistant: Hello! I'm GemGem, your luxury jewelry assistant. How may I help you today?

User: How are you?  
Assistant: Sparkling and ready to help! What would you like to know about jewelry today?

User: Tell me gold price in India  
Assistant: Gold prices vary daily based on market conditions. Would you like the current estimate or are you looking for a specific product in gold?

User: Share price of Tata  
Assistant: I specialize in jewelry topics. Please feel free to ask me about diamonds, gold, or engagement rings.

---

Now answer this user query professionally:

User: ${message}
`.trim()

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

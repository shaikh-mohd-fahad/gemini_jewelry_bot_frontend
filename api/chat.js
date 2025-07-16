import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { message } = req.body;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: `
You are GemGem, a luxury jewelry assistant. You can answer:
- Jewelry questions: gold, diamonds, purity, price trends
- Greetings: hello, hi, how are you
- Buying suggestions: gift ideas, wedding rings
Do NOT respond to finance, politics, or unrelated topics.
If unsure, respond with: "I'm here to assist with jewelry-related queries only."

Now begin your chat session.
`,
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 300,
    },
  });

  try {
    const result = await chat.sendMessage(message);
    const reply = await result.response.text();
    res.status(200).json({ reply });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

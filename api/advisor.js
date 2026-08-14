export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' });

    const { mode, payload } = req.body;

    let prompt = '';
    if (mode === 'seller') {
        prompt = `You are a marketing advisor for sellers on khoj, a Pakistani local-brand marketplace. Here are this seller's current product listings (JSON): ${JSON.stringify(payload.products)}. Give 3-4 short, concrete, actionable suggestions on pricing, what to list next, and how to market better. Keep it under 120 words, no preamble, just the tips.`;
    } else if (mode === 'buyer') {
        prompt = `You are a shopping assistant for khoj, a Pakistani local-brand marketplace. The buyer's budget is Rs. ${payload.budget}. Here is the available product catalog (JSON): ${JSON.stringify(payload.products)}. Recommend the best 3-5 products within budget, listing product name and price, with a one-line reason each. Keep it under 120 words, no preamble.`;
    } else {
        return res.status(400).json({ error: 'invalid mode' });
    }

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            }
        );

        const data = await response.json();
        const suggestion = data.candidates?.[0]?.content?.parts?.[0]?.text || 'no suggestion available right now.';
        res.status(200).json({ suggestion });
    } catch (err) {
        res.status(500).json({ error: 'AI request failed' });
    }
}
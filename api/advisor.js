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
        const response = await fetch('https://ai-gateway.vercel.sh/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GATEWAY_KEY}`
            },
            body: JSON.stringify({
                model: 'google/gemini-2.0-flash',
                messages: [{ role: 'user', content: prompt }]
            })
        });

        const data = await response.json();
        res.status(200).json({ debug: data });
    } catch (err) {
        res.status(500).json({ error: 'AI request failed' });
    }
}
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const r = await fetch(`${process.env.KV_REST_API_URL}/incr/waitlist_count`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` }
    });
    const data = await r.json();
    const submitted = parseInt(data.result) || 0;
    const taken = 8 + submitted;
    res.json({ remaining: Math.max(0, 25 - taken), taken, total: 25 });
  } catch {
    res.status(500).json({ error: 'Failed to increment count' });
  }
}

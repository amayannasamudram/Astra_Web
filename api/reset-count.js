export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    await fetch(`${process.env.KV_REST_API_URL}/set/waitlist_count/0`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` }
    });
    res.json({ ok: true, message: 'waitlist_count reset to 0' });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}

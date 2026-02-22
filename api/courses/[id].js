export default async function handler(req, res) {
    const { id } = req.query || {};
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!id) return res.status(400).json({ error: 'Missing id' });

    const REMOTE = process.env.REMOTE_API_BASE || 'https://infnova-course-api.vercel.app';
    const target = `${REMOTE}/courses/${encodeURIComponent(id)}`;

    try {
        const r = await fetch(target, { method: 'GET' });
        const text = await r.text();
        const contentType = r.headers.get('content-type') || 'application/json';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(r.status).send(text);
    } catch (err) {
        console.error('proxy /courses/:id error', err);
        return res.status(502).json({ error: 'Bad gateway' });
    }
}
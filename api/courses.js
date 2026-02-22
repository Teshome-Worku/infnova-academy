export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const REMOTE = process.env.REMOTE_API_BASE || 'https://infnova-course-api.vercel.app';
    const target = `${REMOTE}/courses`;

    try {
        const r = await fetch(target, { method: 'GET' });
        const text = await r.text();

        // forward status and content-type
        const contentType = r.headers.get('content-type') || 'application/json';
        res.setHeader('Content-Type', contentType);
        // optional: allow cross-origin if needed (we proxy to same origin so not strictly necessary)
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(r.status).send(text);
    } catch (err) {
        console.error('proxy /courses error', err);
        return res.status(502).json({ error: 'Bad gateway' });
    }
}
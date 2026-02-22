export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const REMOTE = process.env.REMOTE_API_BASE || 'https://infnova-course-api.vercel.app';
        const search = req.url && req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
        const target = `${REMOTE}/courses/${encodeURIComponent(id)}${search}`;
        console.log('proxy /api/courses/:id ->', target);

    try {
        const r = await fetch(target, { method: 'GET', headers: { Accept: 'application/json' } });
        const contentType = r.headers.get('content-type') || '';
        const text = await r.text();

        // Log non-OK responses for easier debugging
        if (!r.ok) console.error('proxy /courses non-ok', r.status, text.slice(0, 200));

        // If response is JSON, forward as JSON so client res.json() works
        if (contentType.includes('application/json')) {
            try {
                const data = JSON.parse(text);
                res.setHeader('Content-Type', 'application/json');
                return res.status(r.status).json(data);
            } catch (err) {
                console.error('proxy /courses invalid-json', err, text.slice(0, 200));
                // fallthrough to return raw text
            }
        }

        // Fallback: return raw text with original content-type
        res.setHeader('Content-Type', contentType || 'text/plain');
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(r.status).send(text);
    } catch (err) {
        console.error('proxy /courses error', err);
        return res.status(502).json({ error: 'Bad gateway' });
    }
}
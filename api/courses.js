export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const REMOTE = process.env.REMOTE_API_BASE || 'https://infnova-course-api.vercel.app';
    const search = req.url && req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';

    const candidates = [
        `${REMOTE}/courses${search}`,
        `${REMOTE}/api/courses${search}`,
    ];

    for (const target of candidates) {
        console.log('proxy /api/courses ->', target);
        try {
            const r = await fetch(target, { method: 'GET', headers: { Accept: 'application/json' } });
            const contentType = r.headers.get('content-type') || '';
            const text = await r.text();

            if (!r.ok) {
                console.error('proxy /courses non-ok', target, r.status);
                // try next candidate
                continue;
            }

            if (contentType.includes('application/json')) {
                try {
                    const data = JSON.parse(text);
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    return res.status(r.status).json(data);
                } catch (err) {
                    console.error('proxy /courses invalid-json', target, err);
                    // fall through to return wrapped JSON
                }
            }

            // Upstream returned non-JSON (likely HTML). Wrap into JSON to avoid client parse errors.
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            return res.status(r.status).json({
                error: 'non-json-response',
                upstream: target,
                status: r.status,
                contentType,
                bodyPreview: text ? text.slice(0, 2000) : null,
            });
        } catch (err) {
            console.error('proxy /courses error', target, err);
            // try next candidate
        }
    }

    return res.status(502).json({ error: 'Bad gateway' });
}
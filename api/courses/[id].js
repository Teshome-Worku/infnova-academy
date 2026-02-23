export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const REMOTE = process.env.REMOTE_API_BASE || 'https://infnova-course-api.vercel.app';

    // preserve query string from incoming request
    const search = req.url && req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
    const q = search || '';
    const qsSuffix = q ? `&${q.slice(1)}` : '';

    // obtain id from req.query (serverless frameworks) or from the URL path
    let id = (req.query && req.query.id) || null;
    if (!id) {
        const m = req.url && req.url.match(/\/api\/courses\/([^/?]+)/);
        if (m) id = decodeURIComponent(m[1]);
    }

    if (!id) {
        return res.status(400).json({ error: 'Missing course id' });
    }
    const requestedId = String(id);

    function isObject(value) {
        return value && typeof value === 'object' && !Array.isArray(value);
    }

    function matchesRequestedId(item) {
        if (!isObject(item)) return false;
        const itemId = item.id ?? item._id;
        return String(itemId) === requestedId;
    }

    function normalizeCoursePayload(payload) {
        if (Array.isArray(payload)) {
            return payload.find(matchesRequestedId) || null;
        }

        if (!isObject(payload)) {
            return null;
        }

        if (matchesRequestedId(payload)) {
            return payload;
        }

        if (matchesRequestedId(payload.course)) {
            return payload.course;
        }

        if (matchesRequestedId(payload.data)) {
            return payload.data;
        }

        if (Array.isArray(payload.data)) {
            return payload.data.find(matchesRequestedId) || null;
        }

        return null;
    }

    const candidates = [
        `${REMOTE}/courses/${encodeURIComponent(requestedId)}${q}`,
        `${REMOTE}/api/courses/${encodeURIComponent(requestedId)}${q}`,
        `${REMOTE}/course/${encodeURIComponent(requestedId)}${q}`,
        `${REMOTE}/api/course/${encodeURIComponent(requestedId)}${q}`,
        `${REMOTE}/v1/courses/${encodeURIComponent(requestedId)}${q}`,
        `${REMOTE}/courses?id=${encodeURIComponent(requestedId)}${qsSuffix}`,
        `${REMOTE}/api/courses?id=${encodeURIComponent(requestedId)}${qsSuffix}`,
    ];

    let hadUpstreamResponse = false;

    for (const target of candidates) {
        console.log('proxy /api/courses/:id ->', target);
        try {
            const r = await fetch(target, { method: 'GET', headers: { Accept: 'application/json' } });
            const contentType = r.headers.get('content-type') || '';
            const text = await r.text();
            hadUpstreamResponse = true;

            if (!r.ok) {
                console.error('proxy /courses/:id non-ok', target, r.status, text ? text.slice(0, 200) : '');
                continue; // try next candidate
            }

            if (contentType.includes('application/json')) {
                try {
                    const payload = JSON.parse(text);
                    const data = normalizeCoursePayload(payload);
                    if (!data) {
                        console.warn('proxy /courses/:id mismatch payload for id', requestedId, 'from', target);
                        continue;
                    }

                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('x-upstream-target', target);
                    console.log('proxy /courses/:id OK ->', target);
                    return res.status(200).json(data);
                } catch (err) {
                    console.error('proxy /courses/:id invalid-json', target, err, text ? text.slice(0, 200) : '');
                    continue;
                }
            }

            // Upstream returned non-JSON (likely HTML). Try next candidate.
            console.error('proxy /courses/:id non-json', target, contentType, text ? text.slice(0, 200) : '');
        } catch (err) {
            console.error('proxy /courses/:id error', target, err);
            // try next candidate
        }
    }

    if (hadUpstreamResponse) {
        return res.status(404).json({ error: 'Course not found', id: requestedId });
    }

    return res.status(502).json({ error: 'Bad gateway' });
}

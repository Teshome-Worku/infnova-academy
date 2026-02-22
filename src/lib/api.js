const BASE_URL =
    import.meta.env.VITE_API_BASE || '/api';

async function parseJsonSafe(res) {
    const text = await res.text();
    const contentType = res.headers.get('content-type') || '';

    if (!contentType.includes('application/json')) {
        throw new Error(`Non-JSON response from server (${res.status} - ${contentType}): ${text.slice(0,200)}`);
    }

    try {
        const data = JSON.parse(text);
        // If our proxy wrapped a non-json upstream response, surface a clearer error
        if (data && data.error === 'non-json-response') {
            const up = data.upstream || 'unknown';
            const st = data.status || res.status;
            throw new Error(`Upstream returned non-JSON (${st}) from ${up}`);
        }
        return data;
    } catch (err) {
        throw new Error(`Invalid JSON from server (${res.status}): ${err.message}`);
    }
}

export async function fetchCourses(options) {
    const res = await fetch(`${BASE_URL}/courses`, options);
    if (!res.ok) throw new Error(`Failed to fetch courses (${res.status})`);
    return parseJsonSafe(res);
}

export async function fetchCourseById(id, options) {
    const res = await fetch(`${BASE_URL}/courses/${id}`, options);
    if (!res.ok) throw new Error(`Failed to fetch course (${res.status})`);
    return parseJsonSafe(res);
}
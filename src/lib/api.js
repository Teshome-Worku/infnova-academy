const BASE_URL =
    import.meta.env.VITE_API_BASE || '/api';

function isObject(value) {
    return value && typeof value === 'object' && !Array.isArray(value);
}

function idMatches(item, id) {
    if (!isObject(item)) return false;
    return String(item.id ?? item._id ?? '') === String(id);
}

function normalizeCoursePayload(payload, id) {
    if (Array.isArray(payload)) {
        return payload.find((item) => idMatches(item, id)) || null;
    }

    if (!isObject(payload)) {
        return null;
    }

    if (idMatches(payload, id)) {
        return payload;
    }

    if (idMatches(payload.course, id)) {
        return payload.course;
    }

    if (idMatches(payload.data, id)) {
        return payload.data;
    }

    if (Array.isArray(payload.data)) {
        return payload.data.find((item) => idMatches(item, id)) || null;
    }

    return null;
}

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
    let rootError = null;

    try {
        const res = await fetch(`${BASE_URL}/courses/${id}`, options);
        if (!res.ok) throw new Error(`Failed to fetch course (${res.status})`);
        const payload = await parseJsonSafe(res);
        const normalized = normalizeCoursePayload(payload, id);
        if (normalized) return normalized;

        rootError = new Error('Course not found (404)');
        throw rootError;
    } catch (err) {
        rootError = err;
        // Fallback: try fetching the courses list and find the item locally.
        try {
            const list = await fetchCourses(options);
            const found = list && Array.isArray(list) ? list.find((c) => idMatches(c, id)) : null;
            if (found) return found;
        } catch (e) {
            // ignore and rethrow original error below
        }

        const message = String(rootError?.message || '').toLowerCase();
        if (
            message.includes('404') ||
            message.includes('not found') ||
            message.includes('non-json') ||
            message.includes('invalid json')
        ) {
            throw new Error('Course not found (404)');
        }

        throw rootError;
    }
}

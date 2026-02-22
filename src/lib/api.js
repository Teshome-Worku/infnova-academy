const BASE_URL =
    import.meta.env.VITE_API_BASE || '/api';

export async function fetchCourses(options) {
    const res = await fetch(`${BASE_URL}/courses`, options);
    if (!res.ok) throw new Error(`Failed to fetch courses (${res.status})`);
    return res.json();
}

export async function fetchCourseById(id, options) {
    const res = await fetch(`${BASE_URL}/courses/${id}`, options);
    if (!res.ok) throw new Error(`Failed to fetch course (${res.status})`);
    return res.json();
}
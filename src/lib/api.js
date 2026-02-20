const BASE_URL = '/api';

export async function fetchCourses() {
  const res = await fetch(`${BASE_URL}/courses`);
  if (!res.ok) throw new Error(`Failed to fetch courses (${res.status})`);
  return res.json();
}

export async function fetchCourseById(id) {
  const res = await fetch(`${BASE_URL}/courses/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch course (${res.status})`);
  return res.json();
}

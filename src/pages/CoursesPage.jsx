import { useState, useMemo } from 'react';
import { fetchCourses } from '../lib/api';
import { useFetch } from '../hooks/useFetch';
import CourseCard from '../components/CourseCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function CoursesPage() {
  const { data: courses, loading, error } = useFetch(fetchCourses);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    if (!courses) return [];
    if (!searchQuery) return courses;
    return courses.filter((c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [courses, searchQuery]);

  const totalCount = courses?.length || 0;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-3">
            Explore Our Courses
          </h1>
          <p className="text-white/80 max-w-2xl text-sm sm:text-base leading-relaxed italic">
            Master new skills with expert-led courses designed for the modern learner.
            Start your learning journey today with INFNOVA Academy.
          </p>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                placeholder="Search courses, instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm text-dark placeholder:text-gray-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
              />
            </div>
            <div className="flex gap-3">
              <div className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-400 min-w-[120px]" />
              <div className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-400 min-w-[120px] hidden sm:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Course Count + Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!loading && !error && (
          <p className="text-sm text-gray-500 mb-6">
            Showing <span className="font-bold text-dark">{filtered.length}</span> of{' '}
            <span className="font-bold text-dark">{totalCount}</span> courses
          </p>
        )}

        {loading && <LoadingSpinner message="Fetching courses..." />}
        {error && <ErrorMessage message={error} onRetry={() => window.location.reload()} />}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-center text-gray-500 py-16">No courses found matching your search.</p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

import { useParams, Link } from 'react-router-dom';
import { fetchCourseById } from '../lib/api';
import { useFetch } from '../hooks/useFetch';
import { ArrowLeftIcon, StarIcon, ClockIcon, UsersIcon, CheckCircleIcon, BookOpenIcon } from '../components/Icons';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const SKILL_COLORS = [
  'bg-blue-50 text-blue-700 border-blue-200',
  'bg-green-50 text-green-700 border-green-200',
  'bg-purple-50 text-purple-700 border-purple-200',
  'bg-amber-50 text-amber-700 border-amber-200',
  'bg-pink-50 text-pink-700 border-pink-200',
  'bg-sky-50 text-sky-700 border-sky-200',
];

const COURSE_INCLUDES = [
  'weeks of content',
  'Lifetime access to materials',
  'Certificate of completion',
  'Access on mobile & desktop',
  'Downloadable resources',
];

export default function CourseDetailPage() {
  const { id } = useParams();
  const { data: course, loading, error } = useFetch(() => fetchCourseById(id), [id]);

  if (loading) return <LoadingSpinner message="Loading course details..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  if (!course) return null;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Courses
          </Link>

          <span className="inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            {course.category}
          </span>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-4 max-w-3xl">
            {course.title}
          </h1>

          <p className="text-white/80 max-w-2xl text-sm sm:text-base leading-relaxed mb-6">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/90">
            <span className="flex items-center gap-1.5">
              Instructor: <strong>{course.instructor}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <ClockIcon className="w-4 h-4" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <UsersIcon className="w-4 h-4" />
              {course.enrolled.toLocaleString()} enrolled
            </span>
            <span className="flex items-center gap-1.5">
              <StarIcon className="w-4 h-4 text-amber-300" />
              {course.rating} rating
            </span>
          </div>

          <span className="inline-block mt-5 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            {course.level} Level
          </span>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left column */}
          <div className="flex-1 min-w-0">
            {/* Skills */}
            {course.skills && course.skills.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-bold text-dark mb-5 flex items-center gap-2">
                  <BookOpenIcon className="w-5 h-5 text-primary" />
                  What You'll Learn
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {course.skills.map((skill, i) => (
                    <span
                      key={skill}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border ${SKILL_COLORS[i % SKILL_COLORS.length]}`}
                    >
                      <CheckCircleIcon className="w-4 h-4" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-dark mb-4">Course Description</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {course.description}
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base mt-4">
                This comprehensive course is designed to provide you with practical, hands-on experience and real-world skills. You'll work on projects that simulate actual industry scenarios, giving you the confidence to apply your knowledge immediately.
              </p>
            </div>

            {/* Instructor */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-lg font-bold text-dark mb-4">Your Instructor</h2>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl font-bold shrink-0">
                  {course.instructor.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-dark">{course.instructor}</p>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    Expert {course.category} professional with over 10 years of industry experience. Passionate about teaching and helping students achieve their career goals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="lg:w-80 shrink-0">
            <div className="sticky top-24 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Join {course.enrolled.toLocaleString()} students</p>

              <button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors mt-3 text-sm">
                Enroll Now
              </button>

              <button className="w-full border border-primary text-primary hover:bg-primary/5 font-semibold py-3 rounded-lg transition-colors mt-3 text-sm">
                Add to Wishlist
              </button>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="font-semibold text-dark text-sm mb-4">This course includes:</h4>
                <ul className="space-y-3">
                  {COURSE_INCLUDES.map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 shrink-0" />
                      {i === 0 ? `${course.duration} of content` : item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

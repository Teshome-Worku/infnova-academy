import { Link } from 'react-router-dom';
import { StarIcon, ClockIcon, UsersIcon } from './Icons';

const CATEGORY_COLORS = {
  'Web Development': 'text-orange-500',
  'Data Science': 'text-teal-600',
  'Design': 'text-pink-500',
  'Cloud Computing': 'text-blue-600',
  'Mobile Development': 'text-green-600',
  'Security': 'text-emerald-600',
  'Blockchain': 'text-amber-600',
};

const LEVEL_COLORS = {
  'Intermediate': 'bg-emerald-500',
  'Advanced': 'bg-orange-500',
  'Beginner': 'bg-blue-500',
};

export default function CourseCard({ course }) {
  const categoryColor = CATEGORY_COLORS[course.category] || 'text-gray-600';
  const levelColor = LEVEL_COLORS[course.level] || 'bg-gray-500';

  return (
    <Link
      to={`/courses/${course.id}`}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className={`absolute top-3 right-3 text-white text-[11px] font-semibold px-3 py-1 rounded-full ${levelColor}`}>
          {course.level}
        </span>
      </div>

      <div className="p-4 pt-3">
        <p className={`text-[11px] font-bold uppercase tracking-wider mb-1.5 ${categoryColor}`}>
          {course.category}
        </p>

        <h3 className="font-semibold text-dark text-[15px] leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-gray-500 mb-3">
          Instructor: {course.instructor.split(' ').slice(0, 2).join(' ')}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
          <span className="flex items-center gap-1">
            <ClockIcon className="w-3.5 h-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <UsersIcon className="w-3.5 h-3.5" />
            {course.enrolled.toLocaleString()}
          </span>
          <span className="flex items-center gap-1 font-medium text-amber-500">
            <StarIcon className="w-3.5 h-3.5" />
            {course.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}

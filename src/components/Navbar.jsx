import { Link, useLocation } from 'react-router-dom';

function LogoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2L6 10v20l14 8 14-8V10L20 2z" fill="#1E293B" opacity="0.05" />
      <path d="M20 4L8 11v18l12 7 12-7V11L20 4z" stroke="#1E293B" strokeWidth="1.5" fill="none" />
      <circle cx="14" cy="16" r="2.5" fill="#F97316" />
      <circle cx="20" cy="12" r="2.5" fill="#FBBF24" />
      <circle cx="26" cy="16" r="2.5" fill="#34D399" />
      <circle cx="20" cy="22" r="2.5" fill="#60A5FA" />
      <line x1="14" y1="16" x2="20" y2="12" stroke="#F97316" strokeWidth="1.2" />
      <line x1="20" y1="12" x2="26" y2="16" stroke="#FBBF24" strokeWidth="1.2" />
      <line x1="14" y1="16" x2="20" y2="22" stroke="#60A5FA" strokeWidth="1.2" />
      <line x1="26" y1="16" x2="20" y2="22" stroke="#34D399" strokeWidth="1.2" />
    </svg>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-dark">
          <LogoIcon />
          <span>INFNOVA</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              pathname === '/' ? 'text-dark' : 'text-gray-500 hover:text-dark'
            }`}
          >
            Courses
          </Link>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-dark transition-colors">
            About
          </a>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-dark transition-colors">
            Contact
          </a>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <a href="#" className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
            Sign In
          </a>
          <Link
            to="/"
            className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            Enroll Now
          </Link>
        </div>

        <button className="sm:hidden text-gray-600" aria-label="Menu">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

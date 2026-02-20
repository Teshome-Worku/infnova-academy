import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/image.png';

export default function Navbar() {
  const { pathname } = useLocation();
  const isDetailPage = pathname.startsWith('/courses/');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`sticky top-0 z-50 bg-white border-b border-gray-100 ${isDetailPage ? 'shadow-sm' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="INFNOVA" className="h-14" />
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

        <div className="flex items-center gap-2 sm:gap-4">
          <a href="#" className="text-xs sm:text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
            Sign In
          </a>
          <Link
            to="/"
            className="bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-semibold px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg transition-colors"
          >
            Enroll Now
          </Link>

          <button
            className="md:hidden text-gray-600 p-1 ml-1"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
          </button>
        </div>
      </div>

      {/* Mobile menu — nav links only */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={`block text-sm font-medium py-2 ${
                pathname === '/' ? 'text-primary' : 'text-gray-600'
              }`}
            >
              Courses
            </Link>
            <a href="#" className="block text-sm font-medium text-gray-600 py-2">
              About
            </a>
            <a href="#" className="block text-sm font-medium text-gray-600 py-2">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

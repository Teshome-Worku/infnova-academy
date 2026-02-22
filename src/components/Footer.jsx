import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 " >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-white text-lg font-bold mb-3 text-center md:text-left">
              <span className="text-primary">INF</span>NOVA Academy
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
             Empowering learners worldwide with cutting-edge technology courses. Start your journey to success with expert-led training.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-white text-sm font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-center md:text-left">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Courses</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Instructors</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-white text-sm font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-center md:text-left">
              <li><Link to="/coming-soon" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/coming-soon" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/coming-soon" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/coming-soon" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} INFNOVA Technologies. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

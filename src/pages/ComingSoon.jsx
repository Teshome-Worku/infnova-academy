import { Link } from 'react-router-dom';

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl w-full text-center bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-4">Coming Soon</h1>
        <p className="text-gray-600 mb-6">
          This page is under development. We&apos;re working to add helpful content here — please check back soon.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          If you need immediate assistance, contact us at{' '}
          <a href="mailto:careers@infnova.tech" className="text-primary underline">careers@infnova.tech</a>.
        </p>
        <div className="flex justify-center">
          <Link to="/" className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark">
            Back to Courses
          </Link>
        </div>
      </div>
    </div>
  );
}

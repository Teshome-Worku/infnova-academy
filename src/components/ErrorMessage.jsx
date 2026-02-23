export default function ErrorMessage({ message, onRetry }) {
  // Shorten and user-friendly message for common upstream/parse errors
  const raw = message || '';
  const lower = raw.toLowerCase();
  let display = raw;

  if (
    lower.includes('non-json') ||
    lower.includes('upstream returned non-json') ||
    lower.includes('<!doctype') ||
    lower.includes('invalid json') ||
    lower.includes('course not found') ||
    lower.includes('not found') ||
    lower.includes('failed to fetch course (404)') ||
    lower.includes('failed to fetch course (400)') ||
    lower.includes('failed to fetch course (500)')
  ) {
    display = 'Course not found or unavailable.';
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center px-4">
      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
        <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-dark">Something went wrong</h3>
      <p className="text-gray-500 text-sm max-w-md">{display}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

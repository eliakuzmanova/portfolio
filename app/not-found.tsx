import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
        <p className="text-gray-300 text-xl mb-8">Page not found</p>
        <Link
          href="/en"
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}


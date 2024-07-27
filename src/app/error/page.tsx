'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function ErrorPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically sign out the user after 5 seconds
    const timer = setTimeout(() => {
      signOut({ callbackUrl: '/login' });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! Page not found.</p>
        <p className="text-md text-gray-500 mb-4">
          You will be signed out and redirected to the home page in 5 seconds.
        </p>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

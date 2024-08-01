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
    <div className="min-h-screen flex items-center justify-center bg-background-alt">
      <div className="text-center bg-background shadow-lg rounded-lg p-8">
        <h1 className="text-6xl font-bold text-text mb-4">404</h1>
        <p className="text-xl text-text-light mb-8">Oops! Page not found.</p>
        <p className="text-md text-text-light mb-4">
          You will be signed out and redirected to the home page in 5 seconds.
        </p>
        <button
          onClick={handleLogout}
          className="btn-primary hover:bg-primary-dark transition-default"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold text-brand-700">
          Imobiliare Market
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <Link href="/properties" className="text-gray-700 hover:text-brand-700">
            Anunturi
          </Link>
          {user ? (
            <>
              <Link href="/properties/create" className="rounded-md bg-brand-600 px-3 py-2 text-white">
                Adauga anunt
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-brand-700">
                Dashboard
              </Link>
              <button onClick={logout} className="text-gray-700 hover:text-brand-700">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-700 hover:text-brand-700">
                Login
              </Link>
              <Link href="/register" className="rounded-md bg-brand-600 px-3 py-2 text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

'use client';

import Link from 'next/link';
import RequireAuth from '@/components/RequireAuth';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <RequireAuth>
      <div className="space-y-6">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-2 text-gray-600">Bine ai venit, {user?.name}.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/properties/create" className="rounded-lg bg-white p-6 shadow-sm hover:shadow-md">
            <h2 className="font-semibold">Adauga anunt</h2>
            <p className="mt-2 text-sm text-gray-600">Publica o proprietate noua pentru moderare.</p>
          </Link>
          <Link href="/properties" className="rounded-lg bg-white p-6 shadow-sm hover:shadow-md">
            <h2 className="font-semibold">Vezi anunturi</h2>
            <p className="mt-2 text-sm text-gray-600">Navigheaza marketplace-ul public.</p>
          </Link>
        </div>
      </div>
    </RequireAuth>
  );
}

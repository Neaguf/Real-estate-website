'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import PropertyCard from '@/components/PropertyCard';

export default function HomePage() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    api.get('/properties').then((response) => {
      setProperties(response.data.data || []);
    });
  }, []);

  return (
    <div className="space-y-10">
      <section className="rounded-lg bg-white p-8 shadow-sm">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950">
            Gaseste rapid locuinta potrivita
          </h1>
          <p className="text-gray-600">
            Cauta apartamente, case, terenuri si spatii comerciale publicate de utilizatori.
          </p>
          <div className="flex gap-3">
            <Link href="/properties" className="rounded-md bg-brand-600 px-4 py-2 text-white">
              Vezi anunturi
            </Link>
            <Link href="/properties/create" className="rounded-md border px-4 py-2">
              Publica anunt
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Anunturi recente</h2>
          <Link href="/properties" className="text-sm font-medium text-brand-700">
            Toate anunturile
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {properties.slice(0, 6).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </div>
  );
}

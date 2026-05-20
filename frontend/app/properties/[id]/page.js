'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    api.get(`/properties/${params.id}`).then((response) => setProperty(response.data));
  }, [params.id]);

  if (!property) {
    return <p className="text-sm text-gray-600">Se incarca...</p>;
  }

  const images = property.images || [];

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <section className="space-y-5">
        <div className="overflow-hidden rounded-lg bg-gray-200">
          {images[0] ? (
            <img src={images[0].url} alt={property.title} className="h-[420px] w-full object-cover" />
          ) : (
            <div className="flex h-[420px] items-center justify-center text-gray-500">Fara imagine</div>
          )}
        </div>

        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {images.slice(1).map((image) => (
              <img key={image.id} src={image.url} alt="" className="h-24 rounded-md object-cover" />
            ))}
          </div>
        )}

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold">{property.title}</h1>
          <p className="mt-4 whitespace-pre-line text-gray-700">{property.description}</p>
        </div>
      </section>

      <aside className="h-fit rounded-lg bg-white p-6 shadow-sm">
        <p className="text-3xl font-bold text-brand-700">
          {Number(property.price).toLocaleString('ro-RO')} {property.currency}
        </p>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between"><dt>Oras</dt><dd>{property.city?.name}</dd></div>
          <div className="flex justify-between"><dt>Categorie</dt><dd>{property.category?.name}</dd></div>
          <div className="flex justify-between"><dt>Camere</dt><dd>{property.rooms || '-'}</dd></div>
          <div className="flex justify-between"><dt>Suprafata</dt><dd>{property.surface || '-'} mp</dd></div>
          <div className="flex justify-between"><dt>Vanzator</dt><dd>{property.user?.name}</dd></div>
          <div className="flex justify-between"><dt>Status</dt><dd>{property.status}</dd></div>
        </dl>
      </aside>
    </div>
  );
}

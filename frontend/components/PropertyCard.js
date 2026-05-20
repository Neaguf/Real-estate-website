import Link from 'next/link';

export default function PropertyCard({ property }) {
  const image = property.images?.[0]?.url;

  return (
    <Link href={`/properties/${property.id}`} className="overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-md">
      <div className="h-44 bg-gray-200">
        {image ? (
          <img src={image} alt={property.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            Fara imagine
          </div>
        )}
      </div>
      <div className="space-y-2 p-4">
        <h3 className="line-clamp-2 font-semibold">{property.title}</h3>
        <p className="text-sm text-gray-600">
          {property.city?.name} · {property.category?.name}
        </p>
        <div className="flex items-center justify-between">
          <strong className="text-brand-700">
            {Number(property.price).toLocaleString('ro-RO')} {property.currency || 'EUR'}
          </strong>
          {property.rooms && <span className="text-sm text-gray-600">{property.rooms} camere</span>}
        </div>
      </div>
    </Link>
  );
}

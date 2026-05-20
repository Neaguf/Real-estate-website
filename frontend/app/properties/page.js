'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import PropertyCard from '@/components/PropertyCard';

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    category: '',
    min_price: '',
    max_price: '',
    rooms: '',
  });

  useEffect(() => {
    api.get('/cities').then((response) => setCities(response.data));
    api.get('/categories').then((response) => setCategories(response.data));
  }, []);

  useEffect(() => {
    api.get('/properties', { params: filters }).then((response) => {
      setProperties(response.data.data || []);
    });
  }, [filters]);

  function updateFilter(event) {
    setFilters((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Anunturi imobiliare</h1>

      <div className="grid gap-3 rounded-lg bg-white p-4 shadow-sm md:grid-cols-5">
        <select name="city" value={filters.city} onChange={updateFilter}>
          <option value="">Oras</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
        <select name="category" value={filters.category} onChange={updateFilter}>
          <option value="">Categorie</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <input name="min_price" value={filters.min_price} onChange={updateFilter} placeholder="Pret minim" />
        <input name="max_price" value={filters.max_price} onChange={updateFilter} placeholder="Pret maxim" />
        <input name="rooms" value={filters.rooms} onChange={updateFilter} placeholder="Camere" />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}

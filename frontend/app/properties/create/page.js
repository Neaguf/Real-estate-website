'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import RequireAuth from '@/components/RequireAuth';
import api from '@/lib/api';

export default function CreatePropertyPage() {
  const router = useRouter();
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category_id: '',
    city_id: '',
    price: '',
    currency: 'EUR',
    address: '',
    rooms: '',
    surface: '',
    status: 'pending',
  });

  useEffect(() => {
    api.get('/cities').then((response) => setCities(response.data));
    api.get('/categories').then((response) => setCategories(response.data));
  }, []);

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();

    const propertyResponse = await api.post('/properties', form);
    const property = propertyResponse.data;

    if (images.length) {
      const data = new FormData();
      Array.from(images).forEach((image) => data.append('images[]', image));
      await api.post(`/properties/${property.id}/images`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }

    router.push(`/properties/${property.id}`);
  }

  return (
    <RequireAuth>
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Adauga anunt</h1>
        <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label>Titlu</label>
            <input name="title" value={form.title} onChange={update} required />
          </div>
          <div>
            <label>Categorie</label>
            <select name="category_id" value={form.category_id} onChange={update} required>
              <option value="">Alege categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Oras</label>
            <select name="city_id" value={form.city_id} onChange={update} required>
              <option value="">Alege orasul</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Pret</label>
            <input name="price" type="number" value={form.price} onChange={update} required />
          </div>
          <div>
            <label>Moneda</label>
            <input name="currency" value={form.currency} onChange={update} required />
          </div>
          <div>
            <label>Camere</label>
            <input name="rooms" type="number" value={form.rooms} onChange={update} />
          </div>
          <div>
            <label>Suprafata mp</label>
            <input name="surface" type="number" value={form.surface} onChange={update} />
          </div>
          <div className="md:col-span-2">
            <label>Adresa</label>
            <input name="address" value={form.address} onChange={update} />
          </div>
          <div className="md:col-span-2">
            <label>Descriere</label>
            <textarea name="description" rows="6" value={form.description} onChange={update} required />
          </div>
          <div className="md:col-span-2">
            <label>Imagini</label>
            <input type="file" multiple accept="image/*" onChange={(event) => setImages(event.target.files)} />
          </div>
          <button className="rounded-md bg-brand-600 px-4 py-2 text-white md:col-span-2">
            Publica anunt
          </button>
        </form>
      </div>
    </RequireAuth>
  );
}

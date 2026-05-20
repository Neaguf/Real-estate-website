'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    setError('');

    try {
      await register(form);
    } catch {
      setError('Verifica datele introduse.');
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">Register</h1>
      <form onSubmit={submit} className="mt-6 space-y-4">
        {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <div>
          <label>Nume</label>
          <input name="name" value={form.name} onChange={update} required />
        </div>
        <div>
          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={update} required />
        </div>
        <div>
          <label>Telefon</label>
          <input name="phone" value={form.phone} onChange={update} />
        </div>
        <div>
          <label>Parola</label>
          <input name="password" type="password" value={form.password} onChange={update} required />
        </div>
        <div>
          <label>Confirma parola</label>
          <input name="password_confirmation" type="password" value={form.password_confirmation} onChange={update} required />
        </div>
        <button className="w-full rounded-md bg-brand-600 px-4 py-2 text-white">
          Creeaza cont
        </button>
      </form>
    </div>
  );
}

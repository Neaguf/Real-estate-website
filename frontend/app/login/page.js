'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    setError('');

    try {
      await login(form);
    } catch {
      setError('Email sau parola incorecta.');
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={submit} className="mt-6 space-y-4">
        {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <div>
          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={update} required />
        </div>
        <div>
          <label>Parola</label>
          <input name="password" type="password" value={form.password} onChange={update} required />
        </div>
        <button className="w-full rounded-md bg-brand-600 px-4 py-2 text-white">
          Autentificare
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Nu ai cont? <Link href="/register" className="text-brand-700">Creeaza cont</Link>
      </p>
    </div>
  );
}

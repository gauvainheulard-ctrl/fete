'use client';

import { useState } from 'react';

interface RegistrationFormProps {
  onSuccess: () => void;
}

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    accompagnants: 0,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          accompagnants: 0,
        });
        onSuccess();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="prenom" className="block text-sm font-medium mb-1">
          Prénom *
        </label>
        <input
          type="text"
          id="prenom"
          required
          value={formData.prenom}
          onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
          className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-zinc-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="nom" className="block text-sm font-medium mb-1">
          Nom *
        </label>
        <input
          type="text"
          id="nom"
          required
          value={formData.nom}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-zinc-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-zinc-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="telephone" className="block text-sm font-medium mb-1">
          Téléphone *
        </label>
        <input
          type="tel"
          id="telephone"
          required
          value={formData.telephone}
          onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
          className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-zinc-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="accompagnants" className="block text-sm font-medium mb-1">
          Nombre d'accompagnants
        </label>
        <input
          type="number"
          id="accompagnants"
          min="0"
          max="10"
          value={formData.accompagnants}
          onChange={(e) => setFormData({ ...formData, accompagnants: parseInt(e.target.value) || 0 })}
          className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-zinc-500 transition-colors"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-950 border border-red-800 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-900 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
      >
        {loading ? 'Inscription en cours...' : 'S\'inscrire'}
      </button>
    </form>
  );
}

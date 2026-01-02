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
        <label htmlFor="prenom" className="block text-sm font-medium mb-1 text-zinc-200">
          Prénom *
        </label>
        <input
          type="text"
          id="prenom"
          required
          value={formData.prenom}
          onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
          className="w-full px-4 py-2 glass-input rounded-lg text-white placeholder-zinc-400"
          placeholder="Votre prénom"
        />
      </div>

      <div>
        <label htmlFor="nom" className="block text-sm font-medium mb-1 text-zinc-200">
          Nom *
        </label>
        <input
          type="text"
          id="nom"
          required
          value={formData.nom}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          className="w-full px-4 py-2 glass-input rounded-lg text-white placeholder-zinc-400"
          placeholder="Votre nom"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1 text-zinc-200">
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 glass-input rounded-lg text-white placeholder-zinc-400"
          placeholder="votre@email.com"
        />
      </div>

      <div>
        <label htmlFor="telephone" className="block text-sm font-medium mb-1 text-zinc-200">
          Téléphone *
        </label>
        <input
          type="tel"
          id="telephone"
          required
          value={formData.telephone}
          onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
          className="w-full px-4 py-2 glass-input rounded-lg text-white placeholder-zinc-400"
          placeholder="06 XX XX XX XX"
        />
      </div>

      <div>
        <label htmlFor="accompagnants" className="block text-sm font-medium mb-1 text-zinc-200">
          Nombre d'accompagnants
        </label>
        <input
          type="number"
          id="accompagnants"
          min="0"
          max="10"
          value={formData.accompagnants}
          onChange={(e) => setFormData({ ...formData, accompagnants: parseInt(e.target.value) || 0 })}
          className="w-full px-4 py-2 glass-input rounded-lg text-white placeholder-zinc-400"
          placeholder="0"
        />
      </div>

      {error && (
        <div className="p-3 glass rounded-lg text-red-300 text-sm border border-red-500/30 bg-red-500/10">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 glass-button rounded-lg font-medium text-white"
      >
        {loading ? 'Inscription en cours...' : 'S\'inscrire'}
      </button>
    </form>
  );
}

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
    <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-md">
      <div>
        <label htmlFor="prenom" className="block text-lg font-bold mb-2 text-cyan-300" style={{fontFamily: 'Bebas Neue, cursive', letterSpacing: '1px'}}>
          👤 TON PRÉNOM *
        </label>
        <input
          type="text"
          id="prenom"
          required
          value={formData.prenom}
          onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
          className="w-full px-4 py-3 hiphop-input rounded-xl text-white placeholder-gray-400 text-lg"
          placeholder="Ton petit nom..."
        />
      </div>

      <div>
        <label htmlFor="nom" className="block text-lg font-bold mb-2 text-pink-300" style={{fontFamily: 'Bebas Neue, cursive', letterSpacing: '1px'}}>
          📛 TON NOM *
        </label>
        <input
          type="text"
          id="nom"
          required
          value={formData.nom}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          className="w-full px-4 py-3 hiphop-input rounded-xl text-white placeholder-gray-400 text-lg"
          placeholder="Ton blaze..."
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-lg font-bold mb-2 text-yellow-300" style={{fontFamily: 'Bebas Neue, cursive', letterSpacing: '1px'}}>
          📧 TON EMAIL *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 hiphop-input rounded-xl text-white placeholder-gray-400 text-lg"
          placeholder="ton@email.com"
        />
      </div>

      <div>
        <label htmlFor="telephone" className="block text-lg font-bold mb-2 text-purple-300" style={{fontFamily: 'Bebas Neue, cursive', letterSpacing: '1px'}}>
          📱 TON TÉL *
        </label>
        <input
          type="tel"
          id="telephone"
          required
          value={formData.telephone}
          onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
          className="w-full px-4 py-3 hiphop-input rounded-xl text-white placeholder-gray-400 text-lg"
          placeholder="06 XX XX XX XX"
        />
      </div>

      <div>
        <label htmlFor="accompagnants" className="block text-lg font-bold mb-2 text-orange-300" style={{fontFamily: 'Bebas Neue, cursive', letterSpacing: '1px'}}>
          👥 TES POTES (+)
        </label>
        <input
          type="number"
          id="accompagnants"
          min="0"
          max="10"
          value={formData.accompagnants}
          onChange={(e) => setFormData({ ...formData, accompagnants: parseInt(e.target.value) || 0 })}
          className="w-full px-4 py-3 hiphop-input rounded-xl text-white placeholder-gray-400 text-lg"
          placeholder="Combien de potes?"
        />
      </div>

      {error && (
        <div className="p-4 rounded-xl text-red-300 text-base border-2 border-red-500 bg-red-900/50 font-bold">
          ⚠️ {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 funky-button rounded-xl font-bold text-white text-xl shadow-2xl"
      >
        {loading ? '⏳ EN COURS...' : '🎉 REJOINDRE LA FÊTE!'}
      </button>
    </form>
  );
}

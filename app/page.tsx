'use client';

import { useState } from 'react';
import RegistrationForm from '@/components/RegistrationForm';
import ParticipantsList from '@/components/ParticipantsList';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRegistrationSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <main className="min-h-screen text-zinc-100 relative">
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent">
              Fête de la Dépression
            </h1>
            <div className="text-zinc-300 text-lg md:text-xl space-y-2">
              <p className="font-medium text-white">25 Février 2025 • 10h00</p>
              <p className="text-base text-zinc-400">Inscription obligatoire</p>
            </div>
          </div>

          <div className="mb-16 flex justify-center">
            <div className="w-full max-w-md p-8 glass rounded-2xl">
              <h2 className="text-2xl font-light mb-6 text-center text-white">S'inscrire</h2>
              <RegistrationForm onSuccess={handleRegistrationSuccess} />
            </div>
          </div>

          <div className="glass rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-light mb-8 text-center text-white">Participants</h2>
            <div className="flex justify-center">
              <ParticipantsList refresh={refreshKey} />
            </div>
          </div>
        </div>
      </div>

      <footer className="glass-hover mt-20 relative z-10">
        <div className="container mx-auto px-4 py-8 text-center text-zinc-400 text-sm">
          <p>Une soirée inoubliable vous attend</p>
        </div>
      </footer>
    </main>
  );
}

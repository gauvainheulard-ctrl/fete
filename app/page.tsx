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
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight">
              Fête de la Dépression
            </h1>
            <div className="text-zinc-400 text-lg md:text-xl space-y-2">
              <p className="font-medium text-zinc-300">25 Février 2025 • 10h00</p>
              <p className="text-base">Inscription obligatoire</p>
            </div>
          </div>

          <div className="mb-16 flex justify-center">
            <div className="w-full max-w-md p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
              <h2 className="text-2xl font-light mb-6 text-center">S'inscrire</h2>
              <RegistrationForm onSuccess={handleRegistrationSuccess} />
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-12">
            <h2 className="text-3xl font-light mb-8 text-center">Participants</h2>
            <div className="flex justify-center">
              <ParticipantsList refresh={refreshKey} />
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-zinc-900 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-zinc-600 text-sm">
          <p>Une soirée inoubliable vous attend</p>
        </div>
      </footer>
    </main>
  );
}

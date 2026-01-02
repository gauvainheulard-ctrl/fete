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
    <main className="min-h-screen text-white relative">
      {/* Floating emojis */}
      <div className="fixed top-20 left-10 text-6xl emoji-float z-0">🎧</div>
      <div className="fixed top-40 right-20 text-5xl emoji-float z-0" style={{animationDelay: '1s'}}>🎤</div>
      <div className="fixed bottom-40 left-20 text-7xl emoji-float z-0" style={{animationDelay: '2s'}}>🔥</div>
      <div className="fixed bottom-20 right-10 text-6xl emoji-float z-0" style={{animationDelay: '0.5s'}}>💎</div>
      <div className="fixed top-1/2 left-1/4 text-5xl emoji-float z-0" style={{animationDelay: '1.5s'}}>🎵</div>
      <div className="fixed top-1/3 right-1/3 text-6xl emoji-float z-0" style={{animationDelay: '2.5s'}}>⚡</div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header avec style graffiti */}
          <div className="text-center mb-16 space-y-6">
            <div className="inline-block">
              <h1 className="text-5xl md:text-8xl font-bold neon-text" style={{fontFamily: 'Permanent Marker, cursive'}}>
                🎉 FÊTE DE LA DÉPRESSION 🎉
              </h1>
            </div>
            <div className="text-2xl md:text-3xl space-y-3">
              <p className="font-bold text-yellow-300" style={{fontFamily: 'Bebas Neue, cursive', letterSpacing: '3px'}}>
                📅 25 FÉVRIER 2025 • ⏰ 10H00
              </p>
              <p className="text-xl text-cyan-300 animate-pulse">
                ✨ INSCRIPTION OBLIGATOIRE ✨
              </p>
            </div>
            <div className="flex justify-center gap-4 text-4xl mt-6">
              <span className="animate-bounce">🎊</span>
              <span className="animate-bounce" style={{animationDelay: '0.1s'}}>🎭</span>
              <span className="animate-bounce" style={{animationDelay: '0.2s'}}>🎪</span>
              <span className="animate-bounce" style={{animationDelay: '0.3s'}}>🎨</span>
            </div>
          </div>

          {/* Formulaire d'inscription style hip hop */}
          <div className="mb-20 flex justify-center">
            <div className="w-full max-w-md p-8 graffiti-box rounded-3xl">
              <h2 className="text-3xl font-bold mb-2 text-center text-yellow-300" style={{fontFamily: 'Permanent Marker, cursive'}}>
                📝 INSCRIS-TOI ICI
              </h2>
              <p className="text-center text-cyan-300 mb-6">Rejoins la crew! 🤘</p>
              <RegistrationForm onSuccess={handleRegistrationSuccess} />
            </div>
          </div>

          {/* Section participants */}
          <div className="graffiti-box graffiti-box-hover rounded-3xl p-8 md:p-12">
            <h2 className="text-4xl font-bold mb-4 text-center neon-text" style={{fontFamily: 'Permanent Marker, cursive'}}>
              👥 LA CREW
            </h2>
            <p className="text-center text-pink-300 text-xl mb-8">Qui est dans la place? 🎤</p>
            <div className="flex justify-center">
              <ParticipantsList refresh={refreshKey} />
            </div>
          </div>
        </div>
      </div>

      <footer className="graffiti-box-hover mt-20 relative z-10 border-t-4 border-yellow-400">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-2xl font-bold text-pink-400 mb-2" style={{fontFamily: 'Permanent Marker, cursive'}}>
            🔥 UNE SOIRÉE INOUBLIABLE VOUS ATTEND! 🔥
          </p>
          <p className="text-cyan-300">Peace, Love & Good Vibes ✌️💜</p>
        </div>
      </footer>
    </main>
  );
}

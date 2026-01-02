'use client';

import { useEffect, useState } from 'react';

interface Participant {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  accompagnants: number;
  created_at: string;
}

interface ParticipantsListProps {
  refresh: number;
}

export default function ParticipantsList({ refresh }: ParticipantsListProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchParticipants = async () => {
    try {
      const response = await fetch('/api/registrations');
      const data = await response.json();
      if (data.success) {
        setParticipants(data.participants);
        setTotal(data.total);
      }
    } catch (error) {
      console.error('Error fetching participants:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [refresh]);

  if (loading) {
    return (
      <div className="w-full max-w-2xl text-center">
        <div className="graffiti-box p-8 rounded-2xl">
          <p className="text-2xl font-bold text-cyan-300">⏳ Chargement de la crew...</p>
        </div>
      </div>
    );
  }

  if (participants.length === 0) {
    return (
      <div className="w-full max-w-2xl text-center">
        <div className="graffiti-box p-8 rounded-2xl">
          <p className="text-2xl font-bold text-pink-300">😢 Personne encore...</p>
          <p className="text-lg text-cyan-300 mt-2">Sois le premier à rejoindre la party! 🎉</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl space-y-5">
      <div className="text-center mb-8">
        <p className="text-3xl font-bold" style={{fontFamily: 'Bebas Neue, cursive'}}>
          <span className="text-6xl font-bold neon-text">{total}</span>
          <span className="text-yellow-300 ml-3">{total > 1 ? 'MEMBRES DANS LA CREW!' : 'MEMBRE DANS LA CREW!'}</span>
        </p>
      </div>

      <div className="space-y-4">
        {participants.map((participant, index) => (
          <div
            key={participant.id}
            className="p-5 participant-card rounded-2xl"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <span className="text-3xl">
                  {['🎤', '🎧', '🎸', '🎹', '🥁', '🎺', '🎻', '🎷'][index % 8]}
                </span>
                <div>
                  <p className="font-bold text-xl text-yellow-300" style={{fontFamily: 'Permanent Marker, cursive'}}>
                    {participant.prenom} {participant.nom}
                  </p>
                  <p className="text-base text-cyan-300 mt-1">📧 {participant.email}</p>
                  <p className="text-base text-pink-300">📱 {participant.telephone}</p>
                </div>
              </div>
              {participant.accompagnants > 0 && (
                <div className="text-right">
                  <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-yellow-300">
                    <p className="text-base text-white font-bold">
                      +{participant.accompagnants} {participant.accompagnants > 1 ? '👥 POTES' : '👤 POTE'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

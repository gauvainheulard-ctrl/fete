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
      <div className="w-full max-w-2xl text-center text-zinc-400">
        <div className="glass p-6 rounded-xl">
          Chargement...
        </div>
      </div>
    );
  }

  if (participants.length === 0) {
    return (
      <div className="w-full max-w-2xl text-center text-zinc-400">
        <div className="glass p-6 rounded-xl">
          Aucune inscription pour le moment
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="text-center mb-6">
        <p className="text-2xl font-light text-white">
          <span className="text-4xl font-medium bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">{total}</span> {total > 1 ? 'personnes inscrites' : 'personne inscrite'}
        </p>
      </div>

      <div className="space-y-3">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="p-4 glass glass-hover rounded-xl"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-lg text-white">
                  {participant.prenom} {participant.nom}
                </p>
                <p className="text-sm text-zinc-300 mt-1">{participant.email}</p>
                <p className="text-sm text-zinc-300">{participant.telephone}</p>
              </div>
              {participant.accompagnants > 0 && (
                <div className="text-right">
                  <div className="px-3 py-1 glass rounded-full">
                    <p className="text-sm text-purple-300 font-medium">
                      +{participant.accompagnants} {participant.accompagnants > 1 ? 'accompagnants' : 'accompagnant'}
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

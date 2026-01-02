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
      <div className="w-full max-w-2xl text-center text-zinc-500">
        Chargement...
      </div>
    );
  }

  if (participants.length === 0) {
    return (
      <div className="w-full max-w-2xl text-center text-zinc-500">
        Aucune inscription pour le moment
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="text-center mb-6">
        <p className="text-2xl font-light">
          <span className="text-4xl font-medium">{total}</span> {total > 1 ? 'personnes inscrites' : 'personne inscrite'}
        </p>
      </div>

      <div className="space-y-3">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-lg">
                  {participant.prenom} {participant.nom}
                </p>
                <p className="text-sm text-zinc-400 mt-1">{participant.email}</p>
                <p className="text-sm text-zinc-400">{participant.telephone}</p>
              </div>
              {participant.accompagnants > 0 && (
                <div className="text-right">
                  <p className="text-sm text-zinc-500">
                    +{participant.accompagnants} {participant.accompagnants > 1 ? 'accompagnants' : 'accompagnant'}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

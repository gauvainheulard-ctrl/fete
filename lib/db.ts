import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set');
}

export const sql = neon(process.env.DATABASE_URL);

export interface Participant {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  accompagnants: number;
  created_at: Date;
}

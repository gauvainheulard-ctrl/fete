import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { z } from 'zod';

const RegistrationSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  prenom: z.string().min(1, 'Le prénom est requis'),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(10, 'Numéro de téléphone invalide'),
  accompagnants: z.number().min(0).max(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = RegistrationSchema.parse(body);

    const result = await sql`
      INSERT INTO participants (nom, prenom, email, telephone, accompagnants)
      VALUES (${data.nom}, ${data.prenom}, ${data.email}, ${data.telephone}, ${data.accompagnants})
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      participant: result[0]
    }, { status: 201 });

  } catch (error: any) {
    if (error.code === '23505') {
      return NextResponse.json({
        success: false,
        error: 'Cet email est déjà inscrit'
      }, { status: 400 });
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: error.errors[0].message
      }, { status: 400 });
    }

    console.error('Registration error:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de l\'inscription'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const participants = await sql`
      SELECT id, nom, prenom, email, telephone, accompagnants, created_at
      FROM participants
      ORDER BY created_at DESC
    `;

    const total = participants.reduce((sum, p: any) => sum + 1 + (p.accompagnants || 0), 0);

    return NextResponse.json({
      success: true,
      participants,
      total
    });

  } catch (error) {
    console.error('Get participants error:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la récupération des participants'
    }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Nota from '@/models/Nota';

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { note_id } = await params;

    // Buscar la nota por note_id
    const nota = await Nota.findOne({ note_id });

    if (!nota) {
      return NextResponse.json(
        { error: 'Nota no encontrada' },
        { status: 404 }
      );
    }

    // Retornar la nota encontrada
    return NextResponse.json(
      {
        success: true,
        data: {
          note_id: nota.note_id,
          nombre: nota.nombre,
          email: nota.email,
          nota: nota.nota,
          createdAt: nota.createdAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al obtener la nota:', error);
    return NextResponse.json(
      { error: 'Error al obtener la nota', details: error.message },
      { status: 500 }
    );
  }
}

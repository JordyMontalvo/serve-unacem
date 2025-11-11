import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Nota from '@/models/Nota';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { nombre, email, nota } = body;

    // Validar que todos los campos estén presentes
    if (!nombre || !email || !nota) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos: nombre, email, nota' },
        { status: 400 }
      );
    }

    // Generar un ID único para la nota
    const note_id = uuidv4();

    // Crear la nota en la base de datos
    const nuevaNota = await Nota.create({
      note_id,
      nombre,
      email,
      nota,
    });

    // Retornar éxito con el ID para construir la URL
    return NextResponse.json(
      {
        success: true,
        message: 'Subido correctamente',
        note_id: nuevaNota.note_id,
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/nota/${nuevaNota.note_id}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al crear la nota:', error);
    return NextResponse.json(
      { error: 'Error al crear la nota', details: error.message },
      { status: 500 }
    );
  }
}

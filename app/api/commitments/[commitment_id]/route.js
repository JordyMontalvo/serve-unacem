import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Commitment from '@/models/Commitment';
import { getCorsHeaders } from '@/lib/cors';

// Forzar que esta ruta sea dinámica para evitar ejecución durante el build
export const dynamic = 'force-dynamic';

// Manejar preflight OPTIONS request
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: getCorsHeaders(),
  });
}

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { commitment_id } = await params;

    // Buscar el compromiso por commitment_id
    const commitment = await Commitment.findOne({ commitment_id });

    if (!commitment) {
      const notFoundResponse = NextResponse.json(
        { error: 'Compromiso no encontrado' },
        { status: 404 }
      );
      
      // Agregar headers CORS
      Object.entries(getCorsHeaders()).forEach(([key, value]) => {
        notFoundResponse.headers.set(key, value);
      });
      
      return notFoundResponse;
    }

    // Retornar el compromiso encontrado
    const response = NextResponse.json(
      {
        success: true,
        data: {
          commitment_id: commitment.commitment_id,
          userName: commitment.userName,
          commitment: commitment.commitment,
          signature: commitment.signature,
          timestamp: commitment.timestamp,
          createdAt: commitment.createdAt,
        },
      },
      { status: 200 }
    );
    
    // Agregar headers CORS
    Object.entries(getCorsHeaders()).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    
    return response;
  } catch (error) {
    console.error('Error al obtener el compromiso:', error);
    const errorResponse = NextResponse.json(
      { error: 'Error al obtener el compromiso', details: error.message },
      { status: 500 }
    );
    
    // Agregar headers CORS incluso en errores
    Object.entries(getCorsHeaders()).forEach(([key, value]) => {
      errorResponse.headers.set(key, value);
    });
    
    return errorResponse;
  }
}


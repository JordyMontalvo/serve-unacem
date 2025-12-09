import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Commitment from '@/models/Commitment';
import { v4 as uuidv4 } from 'uuid';
import { getBaseUrl } from '@/lib/utils';
import { getCorsHeaders } from '@/lib/cors';

// Manejar preflight OPTIONS request
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: getCorsHeaders(),
  });
}

// POST - Crear un nuevo compromiso
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { userName, commitment, signature } = body;

    // Validar que todos los campos estén presentes
    if (!userName || !commitment || !signature) {
      const badRequestResponse = NextResponse.json(
        { error: 'Todos los campos son requeridos: userName, commitment, signature' },
        { status: 400 }
      );
      
      // Agregar headers CORS
      Object.entries(getCorsHeaders()).forEach(([key, value]) => {
        badRequestResponse.headers.set(key, value);
      });
      
      return badRequestResponse;
    }

    // Validar longitud mínima del compromiso
    if (commitment.trim().length < 10) {
      const validationResponse = NextResponse.json(
        { error: 'El compromiso debe tener al menos 10 caracteres' },
        { status: 400 }
      );
      
      // Agregar headers CORS
      Object.entries(getCorsHeaders()).forEach(([key, value]) => {
        validationResponse.headers.set(key, value);
      });
      
      return validationResponse;
    }

    // Validar longitud máxima del compromiso
    if (commitment.trim().length > 500) {
      const validationResponse = NextResponse.json(
        { error: 'El compromiso no puede exceder 500 caracteres' },
        { status: 400 }
      );
      
      // Agregar headers CORS
      Object.entries(getCorsHeaders()).forEach(([key, value]) => {
        validationResponse.headers.set(key, value);
      });
      
      return validationResponse;
    }

    // Generar un ID único para el compromiso
    const commitment_id = uuidv4();

    // Crear el compromiso en la base de datos
    const nuevoCommitment = new Commitment({
      commitment_id,
      userName: userName.trim(),
      commitment: commitment.trim(),
      signature: signature.trim(),
      timestamp: new Date(),
    });
    
    // Guardar en la base de datos
    await nuevoCommitment.save();
    
    // Verificar que se guardó correctamente recargando desde la DB
    const savedCommitment = await Commitment.findById(nuevoCommitment._id);
    
    // Usar el commitment_id guardado o el generado como fallback
    let finalCommitmentId = savedCommitment?.commitment_id || nuevoCommitment.commitment_id || commitment_id;
    
    // Si aún no está guardado, actualizar explícitamente
    if (!savedCommitment?.commitment_id) {
      await Commitment.findByIdAndUpdate(nuevoCommitment._id, { commitment_id }, { new: true });
      const updatedCommitment = await Commitment.findById(nuevoCommitment._id);
      finalCommitmentId = updatedCommitment?.commitment_id || commitment_id;
    }
    
    console.log('✅ Compromiso guardado en DB con commitment_id:', finalCommitmentId);

    // Retornar éxito con URL única
    const response = NextResponse.json(
      {
        success: true,
        message: 'Compromiso guardado correctamente',
        commitment_id: finalCommitmentId,
        url: `${getBaseUrl()}/compromiso/${finalCommitmentId}`,
        data: {
          id: nuevoCommitment._id,
          commitment_id: finalCommitmentId,
          userName: nuevoCommitment.userName,
          commitment: nuevoCommitment.commitment,
          signature: nuevoCommitment.signature,
          timestamp: nuevoCommitment.timestamp,
        },
      },
      { status: 201 }
    );
    
    // Agregar headers CORS
    Object.entries(getCorsHeaders()).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    
    return response;
  } catch (error) {
    console.error('Error al crear el compromiso:', error);
    const errorResponse = NextResponse.json(
      { error: 'Error al crear el compromiso', details: error.message },
      { status: 500 }
    );
    
    // Agregar headers CORS incluso en errores
    Object.entries(getCorsHeaders()).forEach(([key, value]) => {
      errorResponse.headers.set(key, value);
    });
    
    return errorResponse;
  }
}

// GET - Obtener todos los compromisos (opcional, para administración)
export async function GET(request) {
  try {
    await connectDB();

    const commitments = await Commitment.find({})
      .sort({ timestamp: -1 })
      .limit(100); // Limitar a 100 para no sobrecargar

    const response = NextResponse.json(
      {
        success: true,
        count: commitments.length,
        data: commitments.map((c) => ({
          id: c._id,
          commitment_id: c.commitment_id,
          userName: c.userName,
          commitment: c.commitment,
          signature: c.signature,
          timestamp: c.timestamp,
          createdAt: c.createdAt,
          url: `${getBaseUrl()}/compromiso/${c.commitment_id}`,
        })),
      },
      { status: 200 }
    );
    
    // Agregar headers CORS
    Object.entries(getCorsHeaders()).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    
    return response;
  } catch (error) {
    console.error('Error al obtener los compromisos:', error);
    const errorResponse = NextResponse.json(
      { error: 'Error al obtener los compromisos', details: error.message },
      { status: 500 }
    );
    
    // Agregar headers CORS incluso en errores
    Object.entries(getCorsHeaders()).forEach(([key, value]) => {
      errorResponse.headers.set(key, value);
    });
    
    return errorResponse;
  }
}


'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';

export default function CompromisoPage() {
  const params = useParams();
  const commitment_id = params?.commitment_id;
  const [commitment, setCommitment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCommitment = useCallback(async () => {
    if (!commitment_id) return;
    
    try {
      setLoading(true);
      const response = await fetch(`/api/commitments/${commitment_id}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setCommitment(data.data);
      } else {
        setError(data.error || 'Error al cargar el compromiso');
      }
    } catch (err) {
      setError('Error de conexión. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [commitment_id]);

  useEffect(() => {
    fetchCommitment();
  }, [fetchCommitment]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <p className="text-gray-600">Cargando compromiso...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-semibold">Error</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
            <a
              href="/"
              className="mt-4 inline-block text-red-600 hover:text-red-800 underline"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (!commitment) {
    return null;
  }

  const fechaCreacion = new Date(commitment.createdAt).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
          <div className="mb-6">
            <a
              href="/"
              className="text-red-600 hover:text-red-800 underline text-sm"
            >
              ← Volver al inicio
            </a>
          </div>

          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-black uppercase mb-2" style={{ fontFamily: 'Chaney, serif' }}>
              COMPROMISO 2026
            </h1>
          </div>

          {/* Compromiso */}
          <div className="mb-8">
            <div className="p-6 md:p-8 bg-gray-50 rounded-lg border-2 border-red-200">
              <p className="text-lg md:text-xl text-black leading-relaxed whitespace-pre-wrap" style={{ fontFamily: 'Silka, sans-serif' }}>
                {commitment.commitment}
              </p>
            </div>
          </div>

          {/* Información adicional */}
          <div className="space-y-4 border-t pt-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Comprometido por
              </label>
              <p className="text-lg text-black font-semibold" style={{ fontFamily: 'Silka, sans-serif' }}>
                {commitment.userName}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Fecha de creación
              </label>
              <p className="text-sm text-gray-600">{fechaCreacion}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                ID del compromiso
              </label>
              <p className="text-xs text-gray-500 font-mono break-all">{commitment.commitment_id}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


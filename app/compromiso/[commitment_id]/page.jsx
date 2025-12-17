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
      <div className="py-8 text-center" style={{ fontFamily: 'Silka, sans-serif' }}>
        Cargando compromiso...
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-8 text-center" style={{ fontFamily: 'Silka, sans-serif' }}>
        <p className="text-black">Error: {error}</p>
        <a href="/" className="mt-2 inline-block text-red-600 underline">
          Volver al inicio
        </a>
      </div>
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
    <main className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <a href="/" className="text-red-600 hover:text-red-800 underline text-sm">
            ← Volver al inicio
          </a>
        </div>

        <div className="relative overflow-hidden">
          <img
            src="/assets/lienzo-certificado-semilla.webp"
            alt="Marco certificado"
            className="w-full h-auto"
          />

          <div className="absolute inset-0 flex flex-col p-8 md:p-12 pt-16 md:pt-20 lg:pt-28 min-h-0">
            <div className="text-center mb-3 md:mb-6 px-4 md:px-8">
              <h1
                className="p-[5px] text-[clamp(16px,4.8vw,26px)] md:text-3xl lg:text-4xl font-bold text-black uppercase leading-tight"
                style={{ fontFamily: 'Chaney, serif' }}
              >
                COMPROMISO 2026
              </h1>
            </div>

            <div className="text-center mb-2 md:mb-4 px-4 md:px-8 md:mt-4 lg:mt-6">
              <p
                className="text-[clamp(11px,3.5vw,16px)] md:text-2xl lg:text-3xl text-black leading-tight max-w-[92%] mx-auto"
                style={{ fontFamily: 'Silka, sans-serif' }}
              >
                YO,{' '}
                <strong className="break-words inline-block max-w-full align-baseline">
                  {String(commitment.userName ?? '').toUpperCase()}
                </strong>
                , me
                <br />
                comprometo a:
              </p>
            </div>


            <div
              className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-0 md:px-8 pb-16 md:pb-8"
              style={{ overscrollBehavior: 'contain' }}
            >
              <div className="box-border w-full p-[25px] md:p-0">
                <p
                  className="text-[clamp(14px,4.2vw,20px)] md:text-2xl lg:text-3xl text-black text-center leading-snug md:leading-relaxed whitespace-pre-wrap break-words"
                  style={{ fontFamily: 'Silka, sans-serif', wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                >
                  {commitment.commitment}
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          <span>ID: {commitment.commitment_id}</span>
          <span className="mx-2">•</span>
          <span>{fechaCreacion}</span>
        </div>
      </div>
    </main>
  );
}

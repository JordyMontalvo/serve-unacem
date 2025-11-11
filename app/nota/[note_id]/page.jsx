'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function NotaPage() {
  const params = useParams();
  const note_id = params?.note_id;
  const [nota, setNota] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (note_id) {
      fetchNota();
    }
  }, [note_id]);

  const fetchNota = as ync () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/notas/${note_id}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setNota(data.data);
      } else {
        setError(data.error || 'Error al cargar la nota');
      }
    } catch (err) {
      setError('Error de conexión. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <p className="text-gray-600">Cargando nota...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-semibold">Error</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
            <a
              href="/"
              className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 underline"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (!nota) {
    return null;
  }

  const fechaCreacion = new Date(nota.createdAt).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="mb-6">
            <a
              href="/"
              className="text-indigo-600 hover:text-indigo-800 underline text-sm"
            >
              ← Volver al inicio
            </a>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Nota de {nota.nombre}
          </h1>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Autor
              </label>
              <p className="text-lg text-gray-900">{nota.nombre}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Email
              </label>
              <p className="text-lg text-gray-900">{nota.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Nota
              </label>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-900 whitespace-pre-wrap">{nota.nota}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Fecha de creación
              </label>
              <p className="text-sm text-gray-600">{fechaCreacion}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                ID de la nota
              </label>
              <p className="text-xs text-gray-500 font-mono">{nota.note_id}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

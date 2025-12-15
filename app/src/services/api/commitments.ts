import type { CommitmentData } from '@/types/index';

/**
 * Envía un compromiso al backend (mismo proyecto Next.js)
 */
export const submitCommitment = async (data: CommitmentData): Promise<{ success: boolean; error?: string; url?: string; commitment_id?: string }> => {
  const maxRetries = 3;
  const baseDelayMs = 400;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch('/api/commitments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: data.userName,
          commitment: data.commitment,
          signature: data.signature,
          timestamp: data.timestamp,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Reintentar solo en 429/500-599
        if (attempt < maxRetries && (response.status === 429 || (response.status >= 500 && response.status <= 599))) {
          const delay = baseDelayMs * Math.pow(2, attempt);
          await new Promise((r) => setTimeout(r, delay));
          continue;
        }
        return {
          success: false,
          error: result.error || 'Error al guardar el compromiso',
        };
      }

      return {
        success: true,
        url: result.url,
        commitment_id: result.commitment_id,
      };
    } catch (error) {
      // Errores de red: reintentar con backoff
      if (attempt < maxRetries) {
        const delay = baseDelayMs * Math.pow(2, attempt);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      console.error('Error submitting commitment:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error de conexión con el servidor',
      };
    }
  }

  return { success: false, error: 'No se pudo enviar el compromiso tras varios intentos' };
};

/**
 * Obtiene todos los compromisos del backend
 */
export const getCommitments = async (): Promise<CommitmentData[]> => {
  try {
    const response = await fetch('/api/commitments', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Error al obtener compromisos:', response.statusText);
      return [];
    }

    const result = await response.json();
    
    if (result.success && result.data) {
      return result.data.map((item: {
        userName: string;
        commitment: string;
        signature: string;
        timestamp: string | Date;
      }) => ({
        userName: item.userName,
        commitment: item.commitment,
        signature: item.signature,
        timestamp: new Date(item.timestamp),
      }));
    }

    return [];
  } catch (error) {
    console.error('Error getting commitments:', error);
    return [];
  }
};

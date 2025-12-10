import type { CommitmentData } from '@/types/index';

/**
 * Envía un compromiso al backend (mismo proyecto Next.js)
 */
export const submitCommitment = async (data: CommitmentData): Promise<{ success: boolean; error?: string; url?: string; commitment_id?: string }> => {
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
    console.error('Error submitting commitment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error de conexión con el servidor',
    };
  }
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

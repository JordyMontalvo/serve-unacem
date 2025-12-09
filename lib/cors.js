/**
 * Headers CORS para permitir peticiones desde el frontend
 */
export function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': process.env.FRONTEND_URL || 'http://localhost:5173',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400', // 24 horas
  };
}

/**
 * Crear respuesta con headers CORS
 */
export function corsResponse(response, status = 200) {
  const headers = getCorsHeaders();
  Object.keys(headers).forEach(key => {
    response.headers.set(key, headers[key]);
  });
  return response;
}


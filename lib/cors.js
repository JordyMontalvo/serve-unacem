/**
 * Headers CORS para permitir peticiones
 * Como frontend y backend están en el mismo proyecto, no se necesitan headers CORS especiales
 * pero los mantenemos por si acaso hay peticiones externas
 */
export function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*', // Permitir desde cualquier origen (mismo proyecto)
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


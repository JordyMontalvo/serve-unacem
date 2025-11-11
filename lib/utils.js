/**
 * Obtiene la URL base de la aplicación
 * Prioridad: NEXT_PUBLIC_BASE_URL > VERCEL_URL > localhost
 */
export function getBaseUrl() {
  // Si está definida explícitamente, usar esa
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  
  // Si está en Vercel, usar VERCEL_URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Por defecto, localhost para desarrollo
  return 'http://localhost:3000';
}

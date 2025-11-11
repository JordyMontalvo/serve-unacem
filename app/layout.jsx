import './globals.css';

export const metadata = {
  title: 'Landings 3D - Sistema de Notas',
  description: 'Sistema para crear y compartir notas únicas',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

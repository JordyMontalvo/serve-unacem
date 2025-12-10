import './globals.css';

export const metadata = {
  title: 'Semilla de Compromisos - UNACEM',
  description: 'Experiencia interactiva Semilla de Compromisos para el evento THM de UNACEM',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir a /es por defecto
    router.replace('/es');
  }, [router]);

  return null;
}

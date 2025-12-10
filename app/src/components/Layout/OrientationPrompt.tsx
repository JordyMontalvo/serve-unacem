import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const OrientationPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Solo mostrar en móvil
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (!isMobile || isDismissed) {
      setShowPrompt(false);
      return;
    }

    const checkOrientation = () => {
      // Verificar si está en orientación vertical
      const isPortrait = window.innerHeight > window.innerWidth;
      setShowPrompt(isPortrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, [isDismissed]);

  if (!showPrompt) return null;

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-5"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 md:p-8 max-w-md text-center"
          >
            <div className="mb-4">
              <motion.div
                animate={{ rotate: 90 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                className="text-4xl mb-4"
              >
                📱
              </motion.div>
              <h3
                className="font-chaney text-xl md:text-2xl text-black mb-2 uppercase"
                style={{ fontFamily: 'Chaney, serif' }}
              >
                Rota tu dispositivo
              </h3>
              <p
                className="text-gray-700 mb-6"
                style={{ fontFamily: 'Silka, sans-serif' }}
              >
                Para mejor experiencia, rota tu dispositivo a orientación horizontal.
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setIsDismissed(true)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-silka text-sm"
                style={{ fontFamily: 'Silka, sans-serif' }}
              >
                Continuar de todos modos
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


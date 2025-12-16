import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/contexts/AppContext';
import { NarrativeBox } from './NarrativeBox';
import { CommitmentBox } from './CommitmentBox';

type SemillaState = 'presentation' | 'animating' | 'exposed';

export const SemillaExperience = () => {
  const { currentStep } = useAppContext();
  const [state, setState] = useState<SemillaState>('presentation');
  const [showCommitmentBox, setShowCommitmentBox] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const presentationVideoRef = useRef<HTMLVideoElement>(null);

  // Solo renderizar si estamos en los pasos correctos
  if (currentStep !== 'seed' && currentStep !== 'commitment') {
    return null;
  }

  const startAnimation = () => {
    setState('animating');
  };

  const handleVideoEnd = () => {
    setState('exposed');
    setTimeout(() => {
      setShowCommitmentBox(true);
    }, 500);
  };

  const handlePresentationVideoEnd = () => {
    // Mantener el video en el último frame para que se quede ahí
    // El NarrativeBox seguirá visible y el usuario podrá continuar cuando termine de leer
    if (presentationVideoRef.current) {
      const video = presentationVideoRef.current;
      // Ir al último frame y pausar para que se quede ahí
      if (video.duration && !isNaN(video.duration)) {
        video.currentTime = video.duration;
      }
      video.pause();
    }
    // No avanzamos automáticamente, esperamos a que el usuario termine con el NarrativeBox
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Estado: Presentación */}
        {state === 'presentation' && (
          <motion.div
            key="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            // NarrativeBox es `fixed` y no ocupa espacio en el layout.
            // Reservamos espacio abajo para que el video quede "al ras" del borde superior del NarrativeBox
            // tanto en móvil como en desktop.
            className="flex flex-col items-center justify-end w-full h-screen pb-28 md:pb-32"
          >
            <video
              ref={presentationVideoRef}
              src="/assets/semillaluna.mp4"
              autoPlay
              muted
              playsInline
              onEnded={handlePresentationVideoEnd}
              className="max-w-[500px] md:max-w-[620px] lg:max-w-[700px] w-full h-auto object-contain px-5"
            >
              <source src="/assets/semillaluna.mp4" type="video/mp4" />
            </video>
            <NarrativeBox onComplete={startAnimation} />
          </motion.div>
        )}

        {/* Estado: Animación */}
        {state === 'animating' && (
          <div className="relative w-full min-h-screen flex flex-col items-center justify-center">
            <div className="flex-1 flex items-center justify-center w-full pb-64 md:pb-72">
              <motion.div
                key="animating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center w-full"
              >
                <video
                  ref={videoRef}
                  src="/assets/semillaopen.mp4"
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnd}
                  className="max-w-[500px] w-full h-auto object-contain px-5"
                >
                  <source src="/assets/semillaopen.mp4" type="video/mp4" />
                </video>
              </motion.div>
            </div>
          </div>
        )}

        {/* Estado: Expuesta */}
        {state === 'exposed' && (
          <div className="relative w-full min-h-screen flex flex-col items-center justify-center">
            {/* Contenedor de la semilla - siempre centrada y visible */}
            <div className="flex-1 flex items-center justify-center w-full pb-64 md:pb-72">
              {/* Contenedor relativo para la imagen y el glow - se ajusta al tamaño de la imagen */}
              <div className="relative inline-block max-w-[500px] w-full">
                <motion.img
                  key="exposed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src="/assets/semillaoptimizada.png"
                  alt="Semilla expuesta con núcleo rojo"
                  className="w-full h-auto object-contain px-5 z-10 block"
                />
                {/* Efecto de glow en el núcleo rojo - posicionado relativo al contenedor de la imagen */}
                <div className="absolute top-[25%] left-1/2 transform -translate-x-1/2 w-64 h-64 bg-red-500 opacity-20 rounded-full blur-3xl pointer-events-none animate-pulse z-0" />
              </div>
            </div>
            
            {/* Caja de compromiso en la parte inferior */}
            {showCommitmentBox && <CommitmentBox />}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

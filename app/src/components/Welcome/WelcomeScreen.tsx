import { motion } from 'framer-motion';
import { useAppContext } from '@/contexts/AppContext';

export const WelcomeScreen = () => {
  const { setCurrentStep } = useAppContext();

  const handleStart = () => {
    setCurrentStep('name');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-5 py-10">
      {/* Logo GRUPO UNACEM */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <img
          src="/assets/images/LOGO_Grupo Unacem.png"
          alt="GRUPO UNACEM"
          className="max-w-[200px] h-auto mx-auto"
        />
      </motion.div>

      {/* Título Principal */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-chaney text-[40px] md:text-[48px] text-black text-center uppercase leading-tight max-w-[900px] mb-10 px-5"
        style={{ fontFamily: 'Chaney, serif' }}
      >
        TU COMPROMISO ES LA SEMILLA DE NUESTRO FUTURO
      </motion.h1>

      {/* Texto Narrativo */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-lg md:text-xl text-black text-center max-w-[650px] mb-12 leading-relaxed px-5"
        style={{ fontFamily: 'Silka, sans-serif' }}
      >
        Cada compromiso que plantamos hoy transformará nuestro mañana.{' '}
        <br className="hidden md:block" />
        Acompaña a Luna para crear una semilla única con tu compromiso hacia el 2026.
      </motion.p>

      {/* Botón COMENZAR */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleStart}
        className="bg-[#FF0000] hover:bg-[#E60000] text-white font-silka font-bold text-lg uppercase px-12 py-4 rounded-md transition-colors duration-200 min-h-[48px]"
        style={{ fontFamily: 'Silka, sans-serif' }}
      >
        COMENZAR
      </motion.button>

      {/* Instrucción sutil */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-sm text-[#999999] text-center mt-4"
        style={{ fontFamily: 'Silka, sans-serif' }}
      >
        Presiona comenzar
      </motion.p>
    </div>
  );
};


import { motion } from 'framer-motion';
import { useAppContext } from '@/contexts/AppContext';
import { submitCommitment } from '@/services/api/commitments';

export const CertificateScreen = () => {
  const { userName, commitment, setCurrentStep, setIsLoading, setCommitmentUrl } = useAppContext();

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      // Actualizar compromiso con el nombre como firma
      const result = await submitCommitment({
        userName,
        commitment,
        signature: userName, // Usar el nombre como firma
        timestamp: new Date(),
      });
      
      if (result.success && result.url) {
        setCommitmentUrl(result.url);
      }
      
      setIsLoading(false);
      setCurrentStep('thankyou');
    } catch (error) {
      console.error('Error al guardar certificado:', error);
      setIsLoading(false);
      // Continuar de todos modos
      setCurrentStep('thankyou');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white flex items-center justify-center p-5"
    >
      <div className="max-w-4xl w-full">
        {/* Certificado con marco */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Marco decorativo de fondo */}
          <img
            src="/assets/images/marco cuadrado final.png"
            alt="Marco certificado"
            className="w-full h-auto"
          />

          {/* Contenido del certificado superpuesto */}
          <div className="absolute inset-0 flex flex-col p-8 md:p-12 pt-16 md:pt-20">
            {/* Título COMPROMISO 2026 - bajado un poco */}
            <div className="text-center mb-6">
              <h1
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-black uppercase mt-25"
                style={{ fontFamily: 'Chaney, serif' }}
              >
                COMPROMISO 2026
              </h1>
            </div>

            {/* Texto de compromiso personalizado */}
            <div className="text-center mb-4">
              <p
                className="text-base md:text-lg lg:text-xl text-black"
                style={{ fontFamily: 'Silka, sans-serif' }}
              >
                YO, <strong>{userName}</strong>, ME COMPROMETO A:
              </p>
            </div>

            {/* Compromiso - texto más grande y centrado */}
            <div className="flex-1 flex items-center justify-center my-6 md:my-8">
              <p
                className="text-xl md:text-2xl lg:text-3xl mb-25 text-black text-center leading-relaxed max-h-[400px] overflow-y-auto px-4 md:px-8"
                style={{ fontFamily: 'Silka, sans-serif' }}
              >
                {commitment}
              </p>
            </div>

            {/* Nombre abajo - sin input */}
            <div className="mt-auto text-center pt-4">
              <p
                className="text-base md:text-lg lg:text-xl text-black"
                style={{ fontFamily: 'Silka, sans-serif' }}
              >
                {userName}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Botón Continuar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <button
            onClick={handleContinue}
            className="px-12 py-4 rounded-md font-silka font-bold text-lg uppercase transition-all duration-200 min-h-[48px] bg-[#FF0000] hover:bg-[#E60000] text-white cursor-pointer"
            style={{ fontFamily: 'Silka, sans-serif' }}
          >
            Continuar
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

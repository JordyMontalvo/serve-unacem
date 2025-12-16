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
          className="relative overflow-hidden"
        >
          {/* Marco decorativo de fondo */}
          <img
            src="/assets/semilla1.png"
            alt="Marco certificado"
            className="w-full h-auto"
          />

          {/* Contenido del certificado superpuesto */}
          <div className="absolute inset-0 flex flex-col px-3 pt-10 pb-4 md:p-12 md:pt-20 lg:pt-28 min-h-0">
            {/* Div contenedor que envuelve todo el contenido del certificado */}
            <div className="relative w-[85%] max-w-[85%] h-auto max-h-[92%] flex flex-col mx-auto my-auto">
              {/* Contenido del certificado */}
              <div className="relative z-10 flex flex-col h-auto min-h-[380px] md:min-h-[480px] lg:min-h-[520px] md:-mt-16 lg:-mt-30">
                {/* Título COMPROMISO 2026 - bajado un poco */}
                <div className="text-center mb-3 md:mb-6 px-4 md:px-8">
                  <h1
                    className="text-sm md:text-3xl lg:text-4xl font-bold text-black uppercase mt-1 md:mt-0"
                    style={{ fontFamily: 'Chaney, serif' }}
                  >
                    COMPROMISO 2026
                  </h1>
                </div>

                {/* Texto de compromiso personalizado */}
                <div className="text-center mb-2 md:mb-4 px-4 md:px-8 md:mt-4 lg:mt-6">
                  <p
                    className="text-xs md:text-2xl lg:text-3xl text-black"
                    style={{ fontFamily: 'Silka, sans-serif' }}
                  >
                    Yo, <strong>{userName.toUpperCase()}</strong>, me comprometo a:
                  </p>
                </div>

                {/* Compromiso - área con scroll dentro del marco en móvil */}
                <div
                  className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 md:px-8 pb-16 md:pb-8"
                  style={{ overscrollBehavior: 'contain' }}
                >
                  <div className="box-border w-full p-[15px] md:p-0 md:mt-4 lg:mt-6">
                    <div className="max-w-[85%] mx-auto">
                      <p
                        className="text-xs md:text-2xl lg:text-3xl mb-2 text-black text-center break-words"
                        style={{ 
                          fontFamily: 'Silka, sans-serif', 
                          wordBreak: 'break-word', 
                          overflowWrap: 'anywhere',
                          lineHeight: '1.6',
                          letterSpacing: '0.01em',
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        {commitment}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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

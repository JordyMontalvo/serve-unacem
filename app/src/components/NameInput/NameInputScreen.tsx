import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/contexts/AppContext';
import { validateName } from '@/utils/validation';

export const NameInputScreen = () => {
  const { userName, setUserName, setCurrentStep } = useAppContext();
  const [inputValue, setInputValue] = useState(userName);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim().length === 0) {
      setError(null);
      setIsValid(false);
      return;
    }

    const validation = validateName(value);
    if (validation.isValid) {
      setError(null);
      setIsValid(true);
    } else {
      setError(validation.error || null);
      setIsValid(false);
    }
  };

  const handleContinue = () => {
    if (isValid && inputValue.trim()) {
      setUserName(inputValue.trim());
      setCurrentStep('seed');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white flex flex-col items-center justify-center px-5 py-10"
    >
      <div className="max-w-md w-full">
        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-chaney text-3xl md:text-4xl text-black text-center mb-8 uppercase"
          style={{ fontFamily: 'Chaney, serif' }}
        >
          ¿Cuál es tu nombre?
        </motion.h2>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Escribe tu nombre aquí"
            className={`w-full px-4 py-3 text-lg border-2 rounded-md transition-colors duration-200 font-silka ${
              error
                ? 'border-red-500 focus:border-red-600'
                : isValid
                ? 'border-green-500 focus:border-green-600'
                : 'border-gray-400 focus:border-[#FF0000]'
            } focus:outline-none bg-white text-black`}
            style={{ fontFamily: 'Silka, sans-serif' }}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && isValid) {
                handleContinue();
              }
            }}
          />

          {/* Indicador de validación */}
          {inputValue && (
            <div className="mt-2 flex items-center justify-end">
              {isValid && (
                <span className="text-green-500 text-sm">✓</span>
              )}
              {error && (
                <span className="text-red-500 text-sm font-silka">{error}</span>
              )}
            </div>
          )}
        </motion.div>

        {/* Botón Continuar */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={isValid ? { scale: 1.05 } : {}}
          whileTap={isValid ? { scale: 0.98 } : {}}
          onClick={handleContinue}
          disabled={!isValid}
          className={`w-full py-4 px-8 rounded-md font-silka font-bold text-lg uppercase transition-colors duration-200 min-h-[48px] ${
            isValid
              ? 'bg-[#FF0000] hover:bg-[#E60000] text-white cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          style={{ fontFamily: 'Silka, sans-serif' }}
        >
          Continuar
        </motion.button>
      </div>
    </motion.div>
  );
};


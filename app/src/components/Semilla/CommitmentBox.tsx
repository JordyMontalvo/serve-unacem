import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { validateCommitment } from '@/utils/validation';
import { VALIDATION } from '@/utils/constants';
import { submitCommitment } from '@/services/api/commitments';

export const CommitmentBox = () => {
  const { userName, commitment, setCommitment, setIsLoading, setCurrentStep } = useAppContext();
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState(commitment);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim().length === 0) {
      setError(null);
      setIsValid(false);
      return;
    }

    const validation = validateCommitment(value, t);
    if (validation.isValid) {
      setError(null);
      setIsValid(true);
    } else {
      setError(validation.error || null);
      setIsValid(false);
    }
  };

  const handleSubmit = async () => {
    if (isValid && inputValue.trim()) {
      setIsLoading(true);
      const trimmedCommitment = inputValue.trim();
      setCommitment(trimmedCommitment);

      // Enviar compromiso (guardará nombre y compromiso, firma se agregará después)
      try {
        await submitCommitment({
          userName: userName,
          commitment: trimmedCommitment,
          signature: '', // Se agregará en el certificado
          timestamp: new Date(),
        });
        setIsLoading(false);
        
        // Ir directamente al certificado, sin animación de elevación
        setCurrentStep('certificate');
      } catch (error) {
        console.error('Error al enviar compromiso:', error);
        setIsLoading(false);
        // Continuar de todos modos para no bloquear al usuario
        setCurrentStep('certificate');
      }
    }
  };

  const characterCount = inputValue.length;
  const isOverLimit = characterCount > VALIDATION.commitmentMaxLength;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-[#FF0000] p-4 md:p-6 shadow-2xl"
    >
      <div className="max-w-3xl mx-auto">
        <h3
          className="font-chaney text-xl md:text-2xl text-black mb-2 uppercase text-center"
          style={{ fontFamily: 'Chaney, serif' }}
        >
          {t('commitment.title')}
        </h3>

        <p
          className="text-xs md:text-sm text-gray-600 mb-3 text-center"
          style={{ fontFamily: 'Silka, sans-serif' }}
        >
          {t('commitment.description')}
        </p>

        <div className="mb-3">
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            placeholder={t('commitment.placeholder')}
            rows={3}
            className={`w-full px-3 py-2 text-base md:text-lg border-2 rounded-md transition-colors duration-200 font-silka resize-none ${
              error || isOverLimit
                ? 'border-red-500 focus:border-red-600'
                : isValid
                ? 'border-green-500 focus:border-green-600'
                : 'border-gray-400 focus:border-[#FF0000]'
            } focus:outline-none bg-white text-black`}
            style={{ fontFamily: 'Silka, sans-serif' }}
          />

          {/* Contador de caracteres */}
          <div className="flex justify-between items-center mt-1">
            <div>
              {error && (
                <span className="text-red-500 text-xs md:text-sm font-silka">{error}</span>
              )}
            </div>
            <span
              className={`text-xs md:text-sm font-silka ${
                isOverLimit
                  ? 'text-red-500'
                  : characterCount < VALIDATION.commitmentMinLength
                  ? 'text-gray-400'
                  : 'text-green-500'
              }`}
            >
              {characterCount} / {VALIDATION.commitmentMaxLength}
            </span>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isValid || isOverLimit}
          className={`w-full py-3 px-6 rounded-md font-silka font-bold text-base md:text-lg uppercase transition-all duration-200 min-h-[44px] ${
            isValid && !isOverLimit
              ? 'bg-[#FF0000] hover:bg-[#E60000] text-white cursor-pointer transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          style={{ fontFamily: 'Silka, sans-serif' }}
        >
          {t('commitment.submit')}
        </button>
      </div>
    </motion.div>
  );
};

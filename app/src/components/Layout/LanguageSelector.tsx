import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-4 right-4 z-50 flex gap-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-1 border border-gray-200"
    >
      <button
        onClick={() => setLanguage('es')}
        className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
          language === 'es'
            ? 'bg-[#FF0000] text-white'
            : 'text-gray-600 hover:text-[#FF0000] hover:bg-gray-100'
        }`}
        style={{ fontFamily: 'Silka, sans-serif' }}
      >
        ES
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
          language === 'en'
            ? 'bg-[#FF0000] text-white'
            : 'text-gray-600 hover:text-[#FF0000] hover:bg-gray-100'
        }`}
        style={{ fontFamily: 'Silka, sans-serif' }}
      >
        EN
      </button>
    </motion.div>
  );
};

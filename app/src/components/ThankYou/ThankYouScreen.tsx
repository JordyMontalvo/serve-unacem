import { motion } from 'framer-motion';
import { useAppContext } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';

export const ThankYouScreen = () => {
  const { userName, commitmentUrl } = useAppContext();
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white flex flex-col items-center justify-center px-5 py-10"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        {/* Título de agradecimiento */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-chaney text-4xl md:text-5xl text-black mb-6 uppercase"
          style={{ fontFamily: 'Chaney, serif' }}
        >
          {t('thankyou.title', { name: userName })}
        </motion.h1>

        {/* Mensaje principal */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-black mb-8 leading-relaxed"
          style={{ fontFamily: 'Silka, sans-serif' }}
        >
          {t('thankyou.message1')}
          <br />
          {t('thankyou.message2')}
        </motion.p>

        {/* Ícono de semilla opcional */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <img
            src="/assets/images/semilla-certificado.png"
            alt="Semilla"
            className="w-32 h-32 mx-auto opacity-80"
          />
        </motion.div>

        {/* URL del compromiso */}
        {commitmentUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg max-w-full"
          >
            <p className="text-sm text-green-800 font-semibold mb-2" style={{ fontFamily: 'Silka, sans-serif' }}>
              {t('thankyou.saved')}
            </p>
            <p className="text-xs text-green-700 mb-2" style={{ fontFamily: 'Silka, sans-serif' }}>
              {t('thankyou.share')}
            </p>
            <a
              href={commitmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-800 underline text-sm break-all block"
              style={{ fontFamily: 'Silka, sans-serif' }}
            >
              {commitmentUrl}
            </a>
          </motion.div>
        )}

        {/* Mensaje final */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: commitmentUrl ? 1.0 : 0.8 }}
          className="text-lg text-gray-600"
          style={{ fontFamily: 'Silka, sans-serif' }}
        >
          {t('thankyou.final')}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};


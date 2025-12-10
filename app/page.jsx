'use client';

import { AnimatePresence } from 'framer-motion';
import { AppProvider, useAppContext } from '@/contexts/AppContext';
import { WelcomeScreen } from '@/components/Welcome/WelcomeScreen';
import { NameInputScreen } from '@/components/NameInput/NameInputScreen';
import { SemillaExperience } from '@/components/Semilla/SemillaExperience';
import { CertificateScreen } from '@/components/Certificate/CertificateScreen';
import { ThankYouScreen } from '@/components/ThankYou/ThankYouScreen';
import { LoadingSpinner } from '@/components/Layout/LoadingSpinner';

function AppContent() {
  const { currentStep, isLoading } = useAppContext();

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingSpinner key="loading" />
        ) : (
          <>
            {currentStep === 'welcome' && <WelcomeScreen key="welcome" />}
            {currentStep === 'name' && <NameInputScreen key="name" />}
            {currentStep === 'seed' && <SemillaExperience key="seed" />}
            {currentStep === 'commitment' && <SemillaExperience key="commitment" />}
            {currentStep === 'certificate' && <CertificateScreen key="certificate" />}
            {currentStep === 'thankyou' && <ThankYouScreen key="thankyou" />}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

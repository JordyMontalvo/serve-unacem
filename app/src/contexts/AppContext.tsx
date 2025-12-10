import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Step, AppState } from '@/types/index';

interface AppContextType extends AppState {
  userName: string;
  commitment: string;
  signature: string;
  commitmentUrl: string | null;
  currentStep: Step;
  isLoading: boolean;
  error: string | null;
  setUserName: (name: string) => void;
  setCommitment: (commitment: string) => void;
  setSignature: (signature: string) => void;
  setCommitmentUrl: (url: string | null) => void;
  setCurrentStep: (step: Step) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  userName: '',
  commitment: '',
  signature: '',
  commitmentUrl: null,
  currentStep: 'welcome',
  isLoading: false,
  error: null,
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(initialState);

  const setUserName = (name: string) => {
    setState((prev) => ({ ...prev, userName: name }));
  };

  const setCommitment = (commitment: string) => {
    setState((prev) => ({ ...prev, commitment }));
  };

  const setSignature = (signature: string) => {
    setState((prev) => ({ ...prev, signature }));
  };

  const setCommitmentUrl = (url: string | null) => {
    setState((prev) => ({ ...prev, commitmentUrl: url }));
  };

  const setCurrentStep = (step: Step) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  };

  const setIsLoading = (loading: boolean) => {
    setState((prev) => ({ ...prev, isLoading: loading }));
  };

  const setError = (error: string | null) => {
    setState((prev) => ({ ...prev, error }));
  };

  const reset = () => {
    setState(initialState);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setUserName,
        setCommitment,
        setSignature,
        setCommitmentUrl,
        setCurrentStep,
        setIsLoading,
        setError,
        reset,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};


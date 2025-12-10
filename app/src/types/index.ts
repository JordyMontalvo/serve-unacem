export type Step = 
  | 'welcome' 
  | 'name' 
  | 'seed' 
  | 'commitment' 
  | 'sending' 
  | 'certificate' 
  | 'thankyou';

export interface AppState {
  userName: string;
  commitment: string;
  signature: string;
  commitmentUrl: string | null;
  currentStep: Step;
  isLoading: boolean;
  error: string | null;
}

export interface CommitmentData {
  userName: string;
  commitment: string;
  signature: string;
  timestamp: Date;
}


import { VALIDATION } from './constants';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Función helper para obtener traducciones (se pasará desde los componentes)
export type GetTranslation = (key: string, params?: Record<string, string | number>) => string;

export const validateName = (name: string, t: GetTranslation): ValidationResult => {
  const trimmed = name.trim();
  
  if (trimmed.length < VALIDATION.nameMinLength) {
    return {
      isValid: false,
      error: t('name.error.minLength'),
    };
  }
  
  if (trimmed.length > VALIDATION.nameMaxLength) {
    return {
      isValid: false,
      error: t('name.error.maxLength'),
    };
  }
  
  // Solo letras y espacios
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(trimmed)) {
    return {
      isValid: false,
      error: t('name.error.invalid'),
    };
  }
  
  return { isValid: true };
};

export const validateCommitment = (text: string, t: GetTranslation): ValidationResult => {
  const trimmed = text.trim();
  
  if (trimmed.length < VALIDATION.commitmentMinLength) {
    return {
      isValid: false,
      error: t('commitment.error.minLength'),
    };
  }
  
  if (trimmed.length > VALIDATION.commitmentMaxLength) {
    return {
      isValid: false,
      error: t('commitment.error.maxLength'),
    };
  }
  
  return { isValid: true };
};

export const validateSignature = (signature: string): ValidationResult => {
  const trimmed = signature.trim();
  
  if (trimmed.length < VALIDATION.signatureMinLength) {
    return {
      isValid: false,
      error: `La firma debe tener al menos ${VALIDATION.signatureMinLength} caracteres`,
    };
  }
  
  return { isValid: true };
};


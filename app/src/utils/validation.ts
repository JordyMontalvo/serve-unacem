import { VALIDATION } from './constants';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateName = (name: string): ValidationResult => {
  const trimmed = name.trim();
  
  if (trimmed.length < VALIDATION.nameMinLength) {
    return {
      isValid: false,
      error: `El nombre debe tener al menos ${VALIDATION.nameMinLength} caracteres`,
    };
  }
  
  if (trimmed.length > VALIDATION.nameMaxLength) {
    return {
      isValid: false,
      error: `El nombre no puede tener más de ${VALIDATION.nameMaxLength} caracteres`,
    };
  }
  
  // Solo letras y espacios
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(trimmed)) {
    return {
      isValid: false,
      error: 'El nombre solo puede contener letras y espacios',
    };
  }
  
  return { isValid: true };
};

export const validateCommitment = (text: string): ValidationResult => {
  const trimmed = text.trim();
  
  if (trimmed.length < VALIDATION.commitmentMinLength) {
    return {
      isValid: false,
      error: `El compromiso debe tener al menos ${VALIDATION.commitmentMinLength} caracteres`,
    };
  }
  
  if (trimmed.length > VALIDATION.commitmentMaxLength) {
    return {
      isValid: false,
      error: `El compromiso no puede tener más de ${VALIDATION.commitmentMaxLength} caracteres`,
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


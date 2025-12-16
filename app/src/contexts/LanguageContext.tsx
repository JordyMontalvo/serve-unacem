import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traducciones
const translations = {
  es: {
    // Welcome Screen
    'welcome.title': 'LA SEMILLA DEL COMPROMISO',
    'welcome.subtitle': 'Sembremos nuestro compromiso con el futuro del Grupo UNACEM',
    'welcome.button': 'COMENZAR',
    'welcome.instruction': 'Presiona comenzar',
    
    // Name Input Screen
    'name.title': '¿Cuál es tu nombre?',
    'name.placeholder': 'Escribe tu nombre aquí',
    'name.continue': 'Continuar',
    'name.error.required': 'El nombre es requerido',
    'name.error.minLength': 'El nombre debe tener al menos 2 caracteres',
    'name.error.maxLength': 'El nombre no puede exceder 50 caracteres',
    'name.error.invalid': 'El nombre contiene caracteres inválidos',
    
    // Narrative Box
    'narrative.line1': '> Esta es una semilla especial...',
    'narrative.line2': '> En su interior hay un compromiso por asumir',
    'narrative.line3': '> Ese compromiso es el núcleo de esta semilla',
    'narrative.line4': '> Es lo que nos impulsa a liberar el valor de nuestras operaciones y llevarlas a su máximo potencial',
    'narrative.line5': '> Y así fortalecer nuestras bases sobre las que queremos construir el futuro',
    'narrative.line6': '> Observa cómo se revela su interior...',
    
    // Commitment Box
    'commitment.title': 'Escribe tu compromiso',
    'commitment.description': 'El núcleo rojo representa tu compromiso. Compártelo con nosotros.',
    'commitment.placeholder': 'Mi compromiso para el 2026 es...',
    'commitment.submit': 'Enviar Compromiso',
    'commitment.error.required': 'El compromiso es requerido',
    'commitment.error.minLength': 'El compromiso debe tener al menos 10 caracteres',
    'commitment.error.maxLength': 'El compromiso no puede exceder 500 caracteres',
    
    // Certificate Screen
    'certificate.title': 'COMPROMISO 2026',
    'certificate.intro': 'Yo, {name}, me comprometo a:',
    'certificate.continue': 'Continuar',
    
    // Thank You Screen
    'thankyou.title': '¡Gracias, {name}!',
    'thankyou.message1': 'Tu compromiso ha sido plantado como una semilla.',
    'thankyou.message2': 'Pronto verás cómo crece y contribuye al futuro del Grupo UNACEM.',
    'thankyou.saved': '✓ Tu compromiso ha sido guardado',
    'thankyou.share': 'Comparte tu compromiso con esta URL:',
    'thankyou.final': 'Puedes volver al Zoom cuando estés listo.',
  },
  en: {
    // Welcome Screen
    'welcome.title': 'THE SEED OF COMMITMENT',
    'welcome.subtitle': 'Let us sow our commitment to the future of UNACEM Group',
    'welcome.button': 'START',
    'welcome.instruction': 'Press start',
    
    // Name Input Screen
    'name.title': 'What is your name?',
    'name.placeholder': 'Enter your name here',
    'name.continue': 'Continue',
    'name.error.required': 'Name is required',
    'name.error.minLength': 'Name must be at least 2 characters',
    'name.error.maxLength': 'Name cannot exceed 50 characters',
    'name.error.invalid': 'Name contains invalid characters',
    
    // Narrative Box
    'narrative.line1': '> This is a special seed...',
    'narrative.line2': '> Inside it there is a commitment to assume',
    'narrative.line3': '> That commitment is the core of this seed',
    'narrative.line4': '> It is what drives us to unlock the value of our operations and take them to their maximum potential',
    'narrative.line5': '> And thus strengthen our foundations on which we want to build the future',
    'narrative.line6': '> Watch how its interior is revealed...',
    
    // Commitment Box
    'commitment.title': 'Write your commitment',
    'commitment.description': 'The red core represents your commitment. Share it with us.',
    'commitment.placeholder': 'My commitment for 2026 is...',
    'commitment.submit': 'Submit Commitment',
    'commitment.error.required': 'Commitment is required',
    'commitment.error.minLength': 'Commitment must be at least 10 characters',
    'commitment.error.maxLength': 'Commitment cannot exceed 500 characters',
    
    // Certificate Screen
    'certificate.title': 'COMMITMENT 2026',
    'certificate.intro': 'I, {name}, commit to:',
    'certificate.continue': 'Continue',
    
    // Thank You Screen
    'thankyou.title': 'Thank you, {name}!',
    'thankyou.message1': 'Your commitment has been planted as a seed.',
    'thankyou.message2': 'Soon you will see how it grows and contributes to the future of UNACEM Group.',
    'thankyou.saved': '✓ Your commitment has been saved',
    'thankyou.share': 'Share your commitment with this URL:',
    'thankyou.final': 'You can return to Zoom when you are ready.',
  },
};

export const LanguageProvider = ({ 
  children, 
  initialLanguage 
}: { 
  children: ReactNode;
  initialLanguage?: Language;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Obtener el idioma de la URL o del prop inicial
  const getLanguageFromPath = (): Language => {
    if (pathname) {
      const lang = pathname.split('/')[1];
      if (lang === 'en' || lang === 'es') {
        return lang;
      }
    }
    return initialLanguage || 'es';
  };

  const [language, setLanguage] = useState<Language>(() => {
    return initialLanguage || getLanguageFromPath();
  });

  // Sincronizar el idioma con la URL cuando cambia el pathname
  useEffect(() => {
    const langFromPath = getLanguageFromPath();
    if (langFromPath !== language) {
      setLanguage(langFromPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const t = (key: string, params?: Record<string, string | number>): string => {
    const translation = translations[language][key as keyof typeof translations.es] || key;
    
    // Reemplazar parámetros como {name}
    if (params) {
      return Object.entries(params).reduce(
        (text, [paramKey, paramValue]) => text.replace(`{${paramKey}}`, String(paramValue)),
        translation
      );
    }
    
    return translation;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
      // Cambiar la URL manteniendo el resto de la ruta
      const currentPath = pathname || '';
      // Si la ruta ya tiene un prefijo de idioma, reemplazarlo
      if (currentPath.startsWith('/es/') || currentPath.startsWith('/en/')) {
        const newPath = currentPath.replace(/^\/(es|en)/, `/${lang}`);
        router.push(newPath);
      } else if (currentPath === '/es' || currentPath === '/en') {
        // Si estamos en la raíz con idioma, cambiar a la nueva
        router.push(`/${lang}`);
      } else {
        // Si no hay prefijo de idioma, agregarlo al inicio
        router.push(`/${lang}${currentPath}`);
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

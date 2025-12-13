import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NarrativeBoxProps {
  onComplete: () => void;
}

const narrativeText = [
  '> Luna te muestra una semilla muy especial...',
  '> Dentro de cada semilla hay un potencial inmenso.',
  '> Pero esta semilla es diferente.',
  '> Contiene un núcleo rojo que representa compromiso.',
  '> Tu compromiso es lo que la hará crecer.',
  '> Observa cómo se revela su interior...',
];

export const NarrativeBox = ({ onComplete }: NarrativeBoxProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLine >= narrativeText.length) {
      setIsTyping(false);
      // Esperar un poco antes de completar
      setTimeout(() => {
        onComplete();
      }, 1000);
      return;
    }

    const line = narrativeText[currentLine];
    let charIndex = 0;
    setDisplayedText('');

    const typingInterval = setInterval(() => {
      if (charIndex < line.length) {
        setDisplayedText(line.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        // Esperar antes de la siguiente línea
        setTimeout(() => {
          setCurrentLine((prev) => prev + 1);
        }, 800);
      }
    }, 30); // Velocidad de typing

    return () => clearInterval(typingInterval);
  }, [currentLine, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-80 text-black p-6 md:p-8 border-t-4 border-[#FF0000]"
      style={{ fontFamily: 'monospace' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-lg md:text-xl leading-relaxed min-h-[80px]">
          {displayedText}
          {isTyping && <span className="animate-pulse">|</span>}
        </div>
      </div>
    </motion.div>
  );
};


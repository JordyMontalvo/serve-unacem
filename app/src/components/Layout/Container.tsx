import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div className={`min-h-screen w-full max-w-[1200px] mx-auto px-5 md:px-10 ${className}`}>
      {children}
    </div>
  );
};


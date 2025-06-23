import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  const baseClasses =
    'px-6 py-3 font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark';

  const variants = {
    primary: 'bg-brand-green text-brand-dark hover:bg-opacity-90',
    secondary: 'bg-transparent border border-brand-light text-brand-light hover:bg-brand-light hover:text-brand-dark',
  };

  return (
    <button className={`${baseClasses} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}

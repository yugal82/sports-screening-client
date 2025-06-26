import React from 'react';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonAsButton extends BaseButtonProps {
  as?: 'button';
  to?: never;
}

interface ButtonAsLink extends LinkProps {
  as: 'link';
  to: string;
}

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
} & (ButtonAsButton | ButtonAsLink);

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  const baseClasses =
    'px-6 py-3 font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark cursor-pointer border border-white';

  const variants = {
    primary: 'bg-brand-green text-brand-dark hover:bg-opacity-90',
    secondary: 'bg-transparent border border-brand-light text-brand-light hover:bg-brand-light hover:text-brand-dark',
  };

  const combinedClasses = `${baseClasses} ${variants[variant]} ${className}`;

  if (props.as === 'link') {
    return (
      <Link to={props.to} className={combinedClasses} {...(props as Omit<LinkProps, 'to'>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...(props as BaseButtonProps)}>
      {children}
    </button>
  );
}

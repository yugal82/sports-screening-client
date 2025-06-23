import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Button } from './Button';
import InfoSectionImage from '../assets/hero_background.webp';

interface InfoSectionProps {
  title: string;
  description: string;
  imageSide?: 'left' | 'right';
  primaryActionText: string;
  secondaryActionText: string;
  icon?: React.ElementType;
}

export function InfoSection({
  title,
  description,
  imageSide = 'right',
  primaryActionText,
  secondaryActionText,
  icon: Icon,
}: InfoSectionProps) {
  const textContent = (
    <div className="lg:w-1/2 text-white">
      {Icon && <Icon className="h-12 w-12 text-brand-green mb-4" />}
      <h2 className="text-4xl font-bold tracking-tight  sm:text-5xl">{title}</h2>
      <p className="mt-6 text-lg leading-8 text-brand-gray">{description}</p>
      <div className="mt-10 flex items-center gap-x-6">
        <Button variant="primary">{primaryActionText}</Button>
        <a href="#" className="flex items-center font-semibold leading-6 hover:text-brand-green">
          {secondaryActionText} <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );

  const imageContent = (
    <div className="lg:w-1/2 flex justify-center items-center">
      <div className="w-4/5 h-96 bg-brand-dark-gray rounded-lg flex items-center justify-center">
        <img src={InfoSectionImage} alt="" />
      </div>
    </div>
  );

  return (
    <div className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col lg:flex-row gap-16 items-center ${
            imageSide === 'left' ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {textContent}
          {imageContent}
        </div>
      </div>
    </div>
  );
}

"use client";

import React from 'react';
import { Button } from './Button';

export const ButtonExample = ({ variant, size, disabled, children }) => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      disabled={disabled} 
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export const ButtonPrimary = (props) => <ButtonExample variant="primary" {...props} />;
export const ButtonSecondary = (props) => <ButtonExample variant="secondary" {...props} />;
export const ButtonOutline = (props) => <ButtonExample variant="outline" {...props} />;
export const ButtonGhost = (props) => <ButtonExample variant="ghost" {...props} />;
export const ButtonSmall = (props) => <ButtonExample size="sm" {...props} />;
export const ButtonMedium = (props) => <ButtonExample size="md" {...props} />;
export const ButtonLarge = (props) => <ButtonExample size="lg" {...props} />;
export const ButtonDisabled = (props) => <ButtonExample disabled {...props} />;

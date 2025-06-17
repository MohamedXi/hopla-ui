import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

interface ButtonProps {
    /**
     * Contenu du bouton
     */
    children: React.ReactNode;
    /**
     * Variante du bouton
     */
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    /**
     * Taille du bouton
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Désactiver le bouton
     */
    disabled?: boolean;
    /**
     * Fonction appelée lorsque le bouton est cliqué
     */
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * Classes CSS additionnelles
     */
    className?: string;
}
/**
 * Composant Button pour les actions utilisateur
 */
declare const Button: ({ children, variant, size, disabled, onClick, className, }: ButtonProps) => react_jsx_runtime.JSX.Element;

export { Button, type ButtonProps };

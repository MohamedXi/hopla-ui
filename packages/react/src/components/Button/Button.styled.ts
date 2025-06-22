import { hoplaVar } from '../../hooks/useHoplaStyles';

// Définition des styles du bouton basés sur les variables CSS du thème
export const buttonStyles = () => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hoplaVar('shape.borderRadius'),
    fontFamily: hoplaVar('typography.button.fontFamily'),
    fontWeight: hoplaVar('typography.button.fontWeight'),
    transitionProperty: 'color, background-color, border-color, box-shadow',
    transitionTimingFunction: hoplaVar('transitions.easing.easeInOut'),
    transitionDuration: hoplaVar('transitions.duration.standard'),
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    userSelect: 'none',
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      boxShadow: `0 0 0 3px ${hoplaVar('colors.primary.300')}`,
      outline: '2px solid transparent',
      outlineOffset: '2px',
    },
  },

  // Variantes
  filled: {
    color: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
  },
  text: {
    backgroundColor: 'transparent',
    padding: '0.5rem 0.75rem',
  },
  ghost: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    color: 'inherit',
  },

  // Tailles
  small: {
    fontSize: '0.75rem', // 12px
    lineHeight: '1rem', // 16px
    padding: '0.375rem 0.75rem', // 6px 12px
    height: '1.75rem', // 28px
    minWidth: '4rem', // 64px
  },
  medium: {
    fontSize: '0.875rem', // 14px
    lineHeight: '1.25rem', // 20px
    padding: '0.5rem 1rem', // 8px 16px
    height: '2.25rem', // 36px
    minWidth: '5rem', // 80px
  },
  large: {
    fontSize: '1rem', // 16px
    lineHeight: '1.5rem', // 24px
    padding: '0.625rem 1.25rem', // 10px 20px
    height: '2.75rem', // 44px
    minWidth: '6rem', // 96px
  },

  // Autres styles
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none',
    boxShadow: 'none',
  },
  startIcon: {
    display: 'inline-flex',
    marginRight: '0.5rem',
    fontSize: '1.25em',
    '& > *': {
      width: '1em',
      height: '1em',
    },
  },
  endIcon: {
    display: 'inline-flex',
    marginLeft: '0.5rem',
    fontSize: '1.25em',
    '& > *': {
      width: '1em',
      height: '1em',
    },
  },
  loadingIcon: {
    animation: 'spin 1s linear infinite',
    marginRight: '0.5rem',
    height: '1rem',
    width: '1rem',
  },

  // Couleurs pour chaque variante
  // Primary
  primaryFilled: {
    backgroundColor: hoplaVar('colors.primary.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.primary.600'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.primary.700'),
    },
  },
  primaryOutlined: {
    borderColor: hoplaVar('colors.primary.500'),
    color: hoplaVar('colors.primary.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.primary.50'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.primary.100'),
    },
  },
  primaryText: {
    color: hoplaVar('colors.primary.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.primary.50'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.primary.100'),
    },
  },
  primaryGhost: {
    backgroundColor: hoplaVar('colors.primary.100'),
    color: hoplaVar('colors.primary.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.primary.200'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.primary.300'),
    },
  },

  // Secondary
  secondaryFilled: {
    backgroundColor: hoplaVar('colors.secondary.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.secondary.600'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.secondary.700'),
    },
  },
  secondaryOutlined: {
    borderColor: hoplaVar('colors.secondary.500'),
    color: hoplaVar('colors.secondary.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.secondary.50'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.secondary.100'),
    },
  },
  secondaryText: {
    color: hoplaVar('colors.secondary.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.secondary.50'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.secondary.100'),
    },
  },
  secondaryGhost: {
    backgroundColor: hoplaVar('colors.secondary.100'),
    color: hoplaVar('colors.secondary.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.secondary.200'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.secondary.300'),
    },
  },

  // Success
  successFilled: {
    backgroundColor: hoplaVar('colors.success.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.success.600'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.success.700'),
    },
  },
  successOutlined: {
    borderColor: hoplaVar('colors.success.500'),
    color: hoplaVar('colors.success.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.success.50'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.success.100'),
    },
  },
  successText: {
    color: hoplaVar('colors.success.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.success.50'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.success.100'),
    },
  },
  successGhost: {
    backgroundColor: hoplaVar('colors.success.100'),
    color: hoplaVar('colors.success.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.success.200'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.success.300'),
    },
  },

  // Error
  errorFilled: {
    backgroundColor: hoplaVar('colors.error.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.error.600'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.error.700'),
    },
  },
  errorOutlined: {
    borderColor: hoplaVar('colors.error.500'),
    color: hoplaVar('colors.error.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.error.50'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.error.100'),
    },
  },
  errorText: {
    color: hoplaVar('colors.error.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.error.50'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.error.100'),
    },
  },
  errorGhost: {
    backgroundColor: hoplaVar('colors.error.100'),
    color: hoplaVar('colors.error.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.error.200'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.error.300'),
    },
  },

  // Warning
  warningFilled: {
    backgroundColor: hoplaVar('colors.warning.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.warning.600'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.warning.700'),
    },
  },
  warningOutlined: {
    borderColor: hoplaVar('colors.warning.500'),
    color: hoplaVar('colors.warning.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.warning.50'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.warning.100'),
    },
  },
  warningText: {
    color: hoplaVar('colors.warning.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.warning.50'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.warning.100'),
    },
  },
  warningGhost: {
    backgroundColor: hoplaVar('colors.warning.100'),
    color: hoplaVar('colors.warning.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.warning.200'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.warning.300'),
    },
  },

  // Info
  infoFilled: {
    backgroundColor: hoplaVar('colors.info.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.info.600'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.info.700'),
    },
  },
  infoOutlined: {
    borderColor: hoplaVar('colors.info.500'),
    color: hoplaVar('colors.info.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.info.50'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.info.100'),
    },
  },
  infoText: {
    color: hoplaVar('colors.info.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.info.50'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.info.100'),
    },
  },
  infoGhost: {
    backgroundColor: hoplaVar('colors.info.100'),
    color: hoplaVar('colors.info.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.info.200'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.info.300'),
    },
  },

  // Neutral
  neutralFilled: {
    backgroundColor: hoplaVar('colors.grey.500'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.grey.600'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.grey.700'),
    },
  },
  neutralOutlined: {
    borderColor: hoplaVar('colors.grey.500'),
    color: hoplaVar('colors.grey.700'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.grey.50'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.grey.100'),
    },
  },
  neutralText: {
    color: hoplaVar('colors.grey.700'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.grey.50'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.grey.100'),
    },
  },
  neutralGhost: {
    backgroundColor: hoplaVar('colors.grey.100'),
    color: hoplaVar('colors.grey.700'),
    '&:hover': {
      backgroundColor: hoplaVar('colors.grey.200'),
    },
    '&:active': {
      backgroundColor: hoplaVar('colors.grey.300'),
    },
  },
});

// Définition des styles pour l'animation de chargement
export const keyframes = {
  spin: {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
};

import clsx from 'clsx';
import { forwardRef } from 'react';

import { Box } from '../Box';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { DividerProps } from '../types';
import styles from './Divider.module.css';

/**
 * Composant Divider - Une ligne de séparation visuelle
 * @param props - Props du composant
 * @returns Composant React
 */
export const Divider = forwardRef<HTMLHRElement, DividerProps>((props, ref) => {
  const {
    children,
    className,
    component = 'hr',
    orientation = 'horizontal',
    flexItem = false,
    variant = 'fullWidth',
    textAlign = 'center',
    ...other
  } = props;

  const theme = useTheme();

  const hasChildren = Boolean(children);

  // Définir un type spécifique pour textAlign
  type TextAlignType = 'left' | 'center' | 'right';
  const textAlignValue = textAlign as TextAlignType;

  // Utiliser un type générique pour éviter les erreurs de typage
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dividerStyles: any = {
    margin: 0,
    flexShrink: 0,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: theme.colors.divider,
    borderBottomWidth: orientation === 'horizontal' ? 'thin' : 0,
    borderRightWidth: orientation === 'vertical' ? 'thin' : 0,
    ...(orientation === 'vertical' && {
      height: '100%',
      borderWidth: '0px thin 0px 0px',
      ...(flexItem && {
        alignSelf: 'stretch',
        height: 'auto',
      }),
    }),
    ...(hasChildren && {
      display: 'flex',
      whiteSpace: 'nowrap',
      // Utiliser le type spécifique pour textAlign
      textAlign: 'center' as const,
      border: 0,
      '&::before, &::after': {
        position: 'relative',
        width: '100%',
        borderTop: `thin solid ${theme.colors.divider}`,
        top: '50%',
        content: '""',
        transform: 'translateY(50%)',
      },
      ...(textAlignValue === 'left' && {
        '&::before': {
          width: '5%',
        },
      }),
      ...(textAlignValue === 'right' && {
        '&::after': {
          width: '5%',
        },
      }),
    }),
    ...(variant === 'inset' && {
      marginLeft: 72,
    }),
    ...(variant === 'middle' && {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    }),
    ...other.sx,
  };

  return (
    <Box
      ref={ref}
      component={component}
      className={clsx(
        styles.divider,
        styles[orientation],
        styles[variant],
        flexItem && styles.flexItem,
        hasChildren && styles.withChildren,
        hasChildren && textAlign !== 'center' && styles[`${textAlign}Text`],
        className
      )}
      sx={dividerStyles}
      {...other}
    >
      {hasChildren ? <span className={styles.childrenWrapper}>{children}</span> : null}
    </Box>
  );
});

Divider.displayName = 'Divider';

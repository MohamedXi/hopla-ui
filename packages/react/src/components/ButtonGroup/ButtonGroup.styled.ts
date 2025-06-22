// Définition des styles du ButtonGroup basés sur les variables CSS du thème
export const buttonGroupStyles = () => ({
  root: {
    display: 'inline-flex',
    position: 'relative',
    '& > button': {
      // Supprimer le focus visible entre les boutons
      '&:focus-visible': {
        position: 'relative',
        zIndex: 1,
      },
    },
  },

  // Orientation verticale
  vertical: {
    flexDirection: 'column',
  },

  // Taille pleine largeur
  fullWidth: {
    width: '100%',
    '& > button': {
      flex: 1,
    },
  },
});

export default buttonGroupStyles;

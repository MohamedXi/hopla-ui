import React from 'react';
import { useTheme, useFonts } from '../hooks/useTheme';
import { Button } from '../components/Button/Button';

/**
 * Composant de démonstration pour le système de polices
 */
export const FontDemo: React.FC = () => {
  const { theme } = useTheme();
  const { primaryFont, fontFamily, fontWeights } = useFonts();

  const containerStyle: React.CSSProperties = {
    padding: '2rem',
    fontFamily: fontFamily,
    maxWidth: '800px',
    margin: '0 auto',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '2rem',
    padding: '1.5rem',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: theme.typography?.h1?.fontFamily,
    fontWeight: theme.typography?.h1?.fontWeight,
    marginBottom: '1rem',
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    marginTop: '1.5rem',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Hopla UI Font System Demo</h1>
      
      <section style={sectionStyle}>
        <h2>Informations sur les polices</h2>
        <ul>
          <li><strong>Police principale :</strong> {primaryFont}</li>
          <li><strong>Famille de polices :</strong> {fontFamily}</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2>Exemples de typographie</h2>
        <div style={{ fontWeight: fontWeights.light }}>Texte en poids léger (300)</div>
        <div style={{ fontWeight: fontWeights.regular }}>Texte en poids normal (400)</div>
        <div style={{ fontWeight: fontWeights.medium }}>Texte en poids moyen (500)</div>
        <div style={{ fontWeight: fontWeights.semiBold }}>Texte en poids semi-gras (600)</div>
        <div style={{ fontWeight: fontWeights.bold }}>Texte en poids gras (700)</div>
      </section>

      <section style={sectionStyle}>
        <h2>Boutons avec la police du thème</h2>
        <p>Les boutons ci-dessous utilisent la police définie dans le thème via les variables CSS.</p>
        
        <div style={buttonContainerStyle}>
          <Button variant="filled" color="primary">Bouton Primary</Button>
          <Button variant="outlined" color="secondary">Bouton Secondary</Button>
          <Button variant="text" color="primary">Bouton Text</Button>
          <Button variant="ghost" color="secondary">Bouton Ghost</Button>
        </div>
      </section>
    </div>
  );
};

export default FontDemo;

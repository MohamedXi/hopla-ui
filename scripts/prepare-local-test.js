#!/usr/bin/env node

/**
 * Script pour préparer les packages Hopla UI pour des tests locaux
 *
 * Ce script utilise yalc pour publier les packages localement et les lier à une application de test.
 * Yalc est préféré à pnpm link car il évite les problèmes courants comme les duplications de React
 * et les problèmes de résolution des peerDependencies.
 *
 * Usage:
 *   node scripts/prepare-local-test.js [--target-app path/to/app]
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
// Note: Nous utilisons uniquement des chemins relatifs ou des chemins absolus fournis par l'utilisateur
// Pas besoin d'utiliser fileURLToPath/import.meta.url pour ce script

// Configuration
const packagesToPublish = [
  'packages/react',
  'packages/core',
  'packages/system',
  'packages/utils',
  'packages/icons',
];

// Vérifier si yalc est installé
function checkYalcInstallation() {
  try {
    execSync('yalc --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Installer yalc si nécessaire
function installYalc() {
  console.log('🔧 Installation de yalc...');
  execSync('npm install -g yalc', { stdio: 'inherit' });
  console.log('✅ yalc installé avec succès!');
}

// Construire les packages
function buildPackages() {
  console.log('🔨 Construction des packages...');
  execSync('pnpm build', { stdio: 'inherit' });
  console.log('✅ Packages construits avec succès!');
}

// Publier les packages avec yalc
function publishPackages() {
  console.log('📦 Publication des packages avec yalc...');
  
  packagesToPublish.forEach(packagePath => {
    if (fs.existsSync(packagePath)) {
      console.log(`📤 Publication de ${packagePath}...`);
      // Utiliser --force pour s'assurer que les packages sont republiés même s'ils existent déjà
      execSync(`cd ${packagePath} && yalc publish --no-scripts --force`, { stdio: 'inherit' });
    } else {
      console.log(`⚠️ Le package ${packagePath} n'existe pas, ignoré.`);
    }
  });
  
  console.log('✅ Packages publiés avec succès!');
}

// Installer les dépendances peer requises dans l'application cible
function installPeerDependencies(targetApp) {
  console.log('📦 Vérification et installation des dépendances peer requises...');
  
  try {
    // Lire le package.json de l'application cible
    const packageJsonPath = path.join(targetApp, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = { ...packageJson.dependencies || {}, ...packageJson.devDependencies || {} };
    
    // Vérifier si React et React DOM sont installés
    const missingDeps = [];
    if (!dependencies.react) missingDeps.push('react@18');
    if (!dependencies['react-dom']) missingDeps.push('react-dom@18');
    
    // Installer les dépendances manquantes
    if (missingDeps.length > 0) {
      console.log(`📥 Installation des dépendances peer manquantes: ${missingDeps.join(', ')}`);
      execSync(`cd ${targetApp} && pnpm add ${missingDeps.join(' ')}`, { stdio: 'inherit' });
      console.log('✅ Dépendances peer installées avec succès!');
    } else {
      console.log('✅ Toutes les dépendances peer requises sont déjà installées.');
    }
  } catch (error) {
    console.error('❌ Erreur lors de l\'installation des dépendances peer:', error.message);
    console.log('⚠️ Vous devrez peut-être installer manuellement react et react-dom dans votre application.');
  }
}

// Ajouter les packages à l'application cible
function addPackagesToApp(targetApp) {
  console.log(`🔗 Ajout des packages à l'application: ${targetApp}`);
  
  if (!fs.existsSync(targetApp)) {
    console.error(`❌ L'application cible n'existe pas: ${targetApp}`);
    process.exit(1);
  }
  
  // Vérifier si le dossier est une application valide (contient package.json)
  const packageJsonPath = path.join(targetApp, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.error(
      `❌ Le dossier cible ne semble pas être une application valide (pas de package.json): ${targetApp}`
    );
    process.exit(1);
  }
  
  // Installer les dépendances peer requises
  installPeerDependencies(targetApp);
  
  // Ajouter chaque package à l'application
  packagesToPublish.forEach(packagePath => {
    // Lire le package.json en utilisant fs au lieu de require
    const packageJsonPath = path.resolve(process.cwd(), packagePath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const packageName = packageJson.name;
    console.log(`🔗 Liaison de ${packageName} à l'application...`);
    // Utiliser l'option --copy pour copier les fichiers au lieu d'utiliser des liens symboliques
    // et --force pour mettre à jour les packages existants
    execSync(`cd ${targetApp} && yalc add ${packageName} --copy --force`, { stdio: 'inherit' });
  });

  // Vérifier l'installation des packages
  verifyPackageInstallation(targetApp, packagesToPublish);
  
  console.log("✅ Packages ajoutés à l'application avec succès!");
  console.log("ℹ️ Pour mettre à jour les packages après des modifications, exécutez à nouveau cette commande.");
}

// Vérifier l'installation des packages
function verifyPackageInstallation(targetApp, packagesToPublish) {
  console.log('🔍 Vérification de l\'installation des packages...');
  
  packagesToPublish.forEach(packagePath => {
    try {
      // Lire le package.json pour obtenir le nom du package
      const packageJsonPath = path.resolve(process.cwd(), packagePath, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      const packageName = packageJson.name;
      
      // Vérifier si le package est installé dans l'application cible
      const targetPackagePath = path.join(targetApp, 'node_modules', packageName);
      
      if (fs.existsSync(targetPackagePath)) {
        // Vérifier si le package contient des fichiers dans dist
        const distPath = path.join(targetPackagePath, 'dist');
        if (fs.existsSync(distPath)) {
          const files = fs.readdirSync(distPath);
          console.log(`✅ ${packageName}: Installé correctement avec ${files.length} fichiers dans /dist`);
        } else {
          console.log(`⚠️ ${packageName}: Installé mais le dossier /dist est manquant ou vide`);
        }
      } else {
        console.log(`❌ ${packageName}: Non installé dans l'application cible`);
      }
    } catch (error) {
      console.error(`❌ Erreur lors de la vérification du package ${packagePath}:`, error.message);
    }
  });
  
  // Vérifier les dépendances peer
  try {
    const targetPackageJsonPath = path.join(targetApp, 'package.json');
    const targetPackageJson = JSON.parse(fs.readFileSync(targetPackageJsonPath, 'utf8'));
    const dependencies = { ...targetPackageJson.dependencies || {}, ...targetPackageJson.devDependencies || {} };
    
    if (dependencies.react) {
      console.log(`✅ React détecté: ${dependencies.react}`);
    } else {
      console.log('⚠️ React non détecté dans les dépendances de l\'application cible');
    }
    
    if (dependencies['react-dom']) {
      console.log(`✅ React DOM détecté: ${dependencies['react-dom']}`);
    } else {
      console.log('⚠️ React DOM non détecté dans les dépendances de l\'application cible');
    }
  } catch (error) {
    console.error('❌ Erreur lors de la vérification des dépendances peer:', error.message);
  }
}

// Configurer le mode watch pour les packages
function setupWatchMode() {
  console.log('👀 Configuration du mode watch pour les packages...');
  console.log('');
  console.log("Pour activer le mode watch et mettre à jour automatiquement l'application cible:");
  console.log('1. Exécutez dans un terminal séparé: pnpm build:watch');
  console.log('2. Dans un autre terminal, exécutez: yalc watch');
  console.log('');
  console.log(
    "Les modifications apportées aux packages seront automatiquement reconstruites et propagées à l'application cible."
  );
}

// Fonction principale
async function main() {
  console.log('🚀 Préparation des packages Hopla UI pour les tests locaux...');

  // Vérifier les arguments
  const args = process.argv.slice(2);
  let targetApp = null;

  // Analyser les arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--target-app' && i + 1 < args.length) {
      targetApp = args[i + 1];
      i++;
    }
  }

  // Si aucune application cible n'est spécifiée, demander à l'utilisateur
  if (!targetApp) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    targetApp = await new Promise(resolve => {
      rl.question("Chemin vers l'application cible (absolu ou relatif): ", answer => {
        rl.close();
        resolve(answer);
      });
    });

    // Si l'utilisateur n'a pas fourni de chemin, utiliser un chemin par défaut
    if (!targetApp) {
      console.log('❌ Aucune application cible spécifiée. Arrêt du script.');
      process.exit(1);
    }
  }

  // Convertir le chemin relatif en chemin absolu si nécessaire
  if (!path.isAbsolute(targetApp)) {
    targetApp = path.resolve(process.cwd(), targetApp);
  }

  // Vérifier si yalc est installé, sinon l'installer
  if (!checkYalcInstallation()) {
    console.log("⚠️ yalc n'est pas installé.");
    installYalc();
  }

  // Construire les packages
  buildPackages();

  // Publier les packages avec yalc
  publishPackages();

  // Ajouter les packages à l'application cible
  addPackagesToApp(targetApp);

  // Configurer le mode watch
  setupWatchMode();

  console.log('');
  console.log('🎉 Préparation terminée! Les packages Hopla UI sont prêts pour les tests locaux.');
  console.log(`📁 Application cible: ${targetApp}`);
}

main().catch(error => {
  console.error("❌ Une erreur s'est produite:", error);
  process.exit(1);
});

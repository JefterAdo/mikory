const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Chemins des fichiers
const schemaPath = path.join(__dirname, '../prisma/schema.prisma');
const authSchemaPath = path.join(__dirname, '../prisma/schema-auth.prisma');

// Lire les fichiers
const mainSchema = fs.readFileSync(schemaPath, 'utf8');
const authSchema = fs.readFileSync(authSchemaPath, 'utf8');

// Vérifier si les modèles d'authentification sont déjà présents
if (mainSchema.includes('model User {') || mainSchema.includes('model Account {')) {
  console.log('Les modèles d\'authentification semblent déjà être présents dans le schéma.');
  process.exit(0);
}

// Fusionner les schémas
const updatedSchema = mainSchema + '\n\n' + authSchema;

// Sauvegarder une copie de sauvegarde
fs.writeFileSync(schemaPath + '.bak', mainSchema, 'utf8');
console.log('Sauvegarde du schéma original créée: schema.prisma.bak');

// Écrire le schéma mis à jour
fs.writeFileSync(schemaPath, updatedSchema, 'utf8');
console.log('Schéma Prisma mis à jour avec les modèles d\'authentification.');

// Exécuter les migrations
try {
  console.log('Génération de la migration...');
  execSync('npx prisma migrate dev --name add_auth_models', { stdio: 'inherit' });
  console.log('Migration réussie!');
  
  console.log('Génération du client Prisma...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('Client Prisma généré avec succès!');
} catch (error) {
  console.error('Erreur lors de la migration:', error.message);
  // Restaurer le schéma original en cas d'erreur
  fs.copyFileSync(schemaPath + '.bak', schemaPath);
  console.log('Le schéma original a été restauré suite à une erreur.');
  process.exit(1);
}

console.log('\nConfiguration de l\'authentification terminée avec succès!');
console.log('Vous pouvez maintenant utiliser NextAuth.js dans votre application.');

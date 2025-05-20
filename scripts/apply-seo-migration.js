const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function applyMigration() {
  console.log('Démarrage de la migration pour ajouter les champs SEO...');
  
  // Lire le fichier SQL
  const sqlFilePath = path.join(__dirname, '../prisma/migrations/add_seo_fields.sql');
  const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
  
  // Créer une connexion à la base de données
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true // Important pour exécuter plusieurs requêtes SQL
  });
  
  try {
    console.log('Connexion à la base de données établie');
    
    // Exécuter les requêtes SQL
    console.log('Exécution des requêtes SQL...');
    await connection.query(sqlContent);
    
    console.log('Migration terminée avec succès!');
  } catch (error) {
    console.error('Erreur lors de la migration:', error);
  } finally {
    // Fermer la connexion
    await connection.end();
    console.log('Connexion à la base de données fermée');
  }
}

// Exécuter la fonction
applyMigration();

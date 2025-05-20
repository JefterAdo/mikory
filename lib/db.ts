import mysql from 'serverless-mysql';

// Configuration de la connexion à la base de données MySQL
const db = mysql({
  config: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    database: process.env.MYSQL_DATABASE || 'mikory_cms',
    user: process.env.MYSQL_USER || 'mikory_user',
    password: process.env.MYSQL_PASSWORD || 'mikory_password',
  }
});

// Fonction pour tester la connexion à la base de données
export async function testConnection() {
  try {
    console.log('Test de connexion à MySQL avec les paramètres suivants:');
    console.log(`Host: ${process.env.MYSQL_HOST || 'localhost'}`);
    console.log(`Port: ${process.env.MYSQL_PORT || '3306'}`);
    console.log(`Database: ${process.env.MYSQL_DATABASE || 'mikory_cms'}`);
    console.log(`User: ${process.env.MYSQL_USER || 'mikory_user'}`);
    
    const result = await db.query('SELECT 1');

    console.log('Connexion à MySQL réussie:', result);
    return true;
  } catch (error) {
    console.error('Erreur de connexion à MySQL:', error);
    throw error;
  }
}

// Fonction pour exécuter des requêtes SQL
export async function executeQuery({ query, values = [] }: { query: string; values?: any[] }) {
  console.log(`[DB] Exécution de la requête : ${query}`, values);
  try {
    // Connexion à la base de données
    const results = await db.query(query, values);
    // Fermeture de la connexion
    console.log('[DB] Requête exécutée avec succès.');
    return results;
  } catch (error) {
    console.error('[DB] Erreur détaillée lors de l\'exécution de la requête SQL:', error);
    if (error instanceof Error) {
      console.error('[DB] Stack Trace:', error.stack);
    }
    throw error;
  }
}

// Fonction pour initialiser la base de données avec les tables nécessaires
export async function initDatabase() {
  try {
    // Création de la table des articles de blog si elle n'existe pas
    await executeQuery({
      query: `
        CREATE TABLE IF NOT EXISTS blog_posts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(255) NOT NULL UNIQUE,
          content TEXT NOT NULL,
          excerpt TEXT,
          category VARCHAR(100),
          status ENUM('draft', 'published', 'review') DEFAULT 'draft',
          featured_image VARCHAR(255),
          meta_title VARCHAR(255),
          meta_description TEXT,
          keywords TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `
    });

    // Création de la table des tags
    await executeQuery({
      query: `
        CREATE TABLE IF NOT EXISTS blog_tags (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          UNIQUE KEY unique_tag_name (name)
        )
      `
    });

    // Création de la table de relation entre articles et tags
    await executeQuery({
      query: `
        CREATE TABLE IF NOT EXISTS blog_post_tags (
          post_id INT NOT NULL,
          tag_id INT NOT NULL,
          PRIMARY KEY (post_id, tag_id),
          FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
          FOREIGN KEY (tag_id) REFERENCES blog_tags(id) ON DELETE CASCADE
        )
      `
    });

    console.log('Base de données initialisée avec succès');
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    throw error;
  }
}

export default db;

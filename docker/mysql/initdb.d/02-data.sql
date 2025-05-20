USE `mikory_cms`;

-- Insertion d'un administrateur par défaut
-- Mot de passe: Admin123! (à changer après la première connexion)
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'Administrateur',
  'admin@mikory.io',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: Admin123!
  'admin',
  NOW(),
  NOW()
);

-- Insertion de catégories par défaut
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `created_at`, `updated_at`)
VALUES 
  (UUID(), 'Actualités', 'actualites', 'Actualités et annonces', NOW(), NOW()),
  (UUID(), 'Tutoriels', 'tutoriels', 'Guides et tutoriels', NOW(), NOW()),
  (UUID(), 'Ressources', 'ressources', 'Ressources utiles', NOW(), NOW());

-- Insertion de paramètres par défaut
INSERT INTO `settings` (`id`, `key`, `value`, `type`, `created_at`, `updated_at`)
VALUES 
  (UUID(), 'site_title', 'Mikory', 'string', NOW(), NOW()),
  (UUID(), 'site_description', 'Votre site web professionnel', 'string', NOW(), NOW()),
  (UUID(), 'posts_per_page', '10', 'number', NOW(), NOW()),
  (UUID(), 'maintenance_mode', 'false', 'boolean', NOW(), NOW());
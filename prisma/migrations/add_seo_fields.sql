-- Ajout des champs SEO à la table blog_posts
ALTER TABLE blog_posts
ADD COLUMN slug VARCHAR(255) UNIQUE,
ADD COLUMN meta_title VARCHAR(255),
ADD COLUMN meta_description TEXT,
ADD COLUMN keywords VARCHAR(255);

-- Mettre à jour les slugs pour les articles existants
UPDATE blog_posts
SET slug = CONCAT(
  LOWER(
    REPLACE(
      REPLACE(
        REPLACE(
          REPLACE(
            REPLACE(
              title,
              ' ', '-'
            ),
            '.', ''
          ),
          ',', ''
        ),
        '?', ''
      ),
      '!', ''
    )
  ),
  '-',
  id
);

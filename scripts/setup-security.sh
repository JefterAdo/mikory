#!/bin/bash

# Script d'installation des améliorations de sécurité pour Mikory Next.js
# Ce script installe les dépendances nécessaires et configure l'environnement

echo "🔒 Configuration des améliorations de sécurité pour Mikory Next.js"
echo "=================================================================="
echo ""

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Veuillez installer Node.js et npm avant de continuer."
    exit 1
fi

# Installer les dépendances
echo "📦 Installation des dépendances de sécurité..."
npm install @auth/prisma-adapter next-auth@5.0.0-beta.15 bcryptjs jsonwebtoken @upstash/ratelimit @upstash/redis
npm install -D @types/bcryptjs @types/jsonwebtoken

# Vérifier si l'installation a réussi
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de l'installation des dépendances."
    exit 1
fi
echo "✅ Dépendances installées avec succès."

# Générer des secrets sécurisés pour l'environnement
echo "🔑 Génération de secrets sécurisés..."

# Fonction pour générer un secret aléatoire
generate_secret() {
    openssl rand -base64 32 | tr -d '\n'
}

# Mettre à jour les secrets dans .env.local
ENV_FILE=".env.local"
NEXTAUTH_SECRET=$(generate_secret)
CSRF_SECRET=$(generate_secret)

# Vérifier si le fichier .env.local existe
if [ -f "$ENV_FILE" ]; then
    # Remplacer les secrets par défaut par des secrets générés
    sed -i '' "s/votre_secret_tres_long_et_securise_a_changer_en_production/$NEXTAUTH_SECRET/" "$ENV_FILE"
    sed -i '' "s/votre_secret_csrf_a_changer_en_production/$CSRF_SECRET/" "$ENV_FILE"
    echo "✅ Secrets mis à jour dans $ENV_FILE"
else
    echo "⚠️ Fichier $ENV_FILE non trouvé. Veuillez configurer manuellement vos secrets."
fi

# Mettre à jour le schéma Prisma et exécuter les migrations
echo "🗃️ Mise à jour du schéma Prisma avec les modèles d'authentification..."
node scripts/update-prisma-schema.js

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de la mise à jour du schéma Prisma."
    exit 1
fi

echo ""
echo "=================================================================="
echo "✅ Configuration de sécurité terminée avec succès!"
echo ""
echo "Prochaines étapes:"
echo "1. Vérifiez vos variables d'environnement dans .env.local"
echo "2. Redémarrez votre serveur de développement: npm run dev"
echo "3. Testez l'authentification en accédant à /login"
echo "=================================================================="

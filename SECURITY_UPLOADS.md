# Sécurité des Téléchargements de Fichiers

Ce document décrit les mesures de sécurité mises en place pour sécuriser les téléchargements de fichiers dans l'application Mikory.

## Fonctionnalités de Sécurité Implémentées

### 1. Validation des Types MIME
- Seuls les types MIME approuvés sont acceptés
- Vérification stricte de la correspondance entre l'extension du fichier et son type MIME
- Liste blanche des types MIME autorisés :
  - Images : JPEG, PNG, WebP, AVIF, GIF, SVG
  - Documents : PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, CSV
  - Archives : ZIP, RAR

### 2. Limitation de Taille
- Taille maximale de fichier : 5 Mo par défaut
- Configuration facilement modifiable dans `lib/file-utils.ts`

### 3. Analyse Antivirus
- Intégration avec ClamAV pour la détection de logiciels malveillants
- Mise en quarantaine automatique des fichiers infectés
- Journalisation des tentatives d'upload de fichiers malveillants

### 4. Protection contre les Fichiers Malveillants
- Vérification de l'intégrité des fichiers
- Détection des extensions doubles (ex: `.jpg.exe`)
- Nettoyage des noms de fichiers pour prévenir les attaques par injection

### 5. Journalisation et Traçabilité
- Toutes les opérations de téléchargement sont journalisées
- Suivi des erreurs et des tentatives de contournement
- Stockage sécurisé des journaux avec rotation automatique

## Configuration Requise

### ClamAV (Optionnel mais Recommandé)

Pour activer l'analyse antivirus, installez ClamAV sur votre serveur :

```bash
# Sur macOS (via Homebrew)
brew install clamav

# Sur Ubuntu/Debian
sudo apt-get update
sudo apt-get install clamav clamav-daemon

# Sur CentOS/RHEL
sudo yum install clamav clamd clamav-update
```

### Variables d'Environnement

Ajoutez les variables suivantes à votre fichier `.env` :

```env
# ClamAV configuration (optionnel)
CLAMAV_ENABLED=true
CLAMAV_HOST=localhost
CLAMAV_PORT=3310

# Taille maximale des fichiers (en octets)
MAX_FILE_SIZE=5242880  # 5MB

# Répertoire de téléchargement
UPLOAD_DIR=./public/uploads/media
```

## API Endpoints

### Télécharger un fichier

```http
POST /api/admin/media
Content-Type: multipart/form-data
```

**Paramètres :**
- `file`: Le fichier à télécharger (obligatoire)

**Réponses :**
- 201 : Fichier téléchargé avec succès
- 400 : Requête invalide (type MIME non autorisé, taille dépassée, etc.)
- 500 : Erreur serveur

### Lister les fichiers

```http
GET /api/admin/media
```

**Réponses :**
- 200 : Liste des fichiers téléchargés

## Gestion des Erreurs

Les erreurs sont catégorisées et documentées dans la réponse de l'API. Les journaux détaillés sont disponibles dans le répertoire `logs/`.

## Bonnes Pratiques

1. **Mise à jour régulière** : Maintenez ClamAV à jour avec les dernières définitions de virus
2. **Surveillance** : Surveillez les journaux pour détecter les activités suspectes
3. **Sauvegarde** : Sauvegardez régulièrement les fichiers importants
4. **Permissions** : Vérifiez que seuls les utilisateurs autorisés peuvent accéder aux endpoints d'upload

## Dépannage

### Problèmes Courants

1. **Fichiers rejetés** : Vérifiez le type MIME et la taille du fichier
2. **Erreurs de scan** : Vérifiez que ClamAV est correctement installé et en cours d'exécution
3. **Problèmes de performances** : Pour les gros volumes, envisagez d'augmenter les limites de taille de fichier ou de mémoire

## Sécurité Supplémentaire

Pour une sécurité renforcée, envisagez :
- L'implémentation d'un CDN avec protection DDoS
- La numérisation des fichiers avec plusieurs moteurs antivirus
- L'analyse des métadonnées des fichiers pour détecter les falsifications
- La mise en place d'un système de réputation des fichiers

## Contact

Pour toute question concernant la sécurité des téléchargements, contactez l'équipe de développement à l'adresse dev@mikory.com.

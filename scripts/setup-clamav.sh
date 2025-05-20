#!/bin/bash

# Script d'installation et de configuration de ClamAV
# Ce script doit être exécuté avec les privilèges root

set -e

# Vérifier si l'utilisateur est root
if [ "$(id -u)" -ne 0 ]; then
  echo "Ce script doit être exécuté en tant que root" >&2
  exit 1
fi

# Détecter la distribution Linux
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
    VERSION=$VERSION_ID
else
    echo "Impossible de détecter la distribution Linux"
    exit 1
fi

# Fonction pour installer ClamAV sur Debian/Ubuntu
install_debian() {
    echo "Mise à jour des paquets..."
    apt-get update
    
    echo "Installation de ClamAV..."
    apt-get install -y clamav clamav-daemon clamav-freshclam
    
    echo "Arrêt des services pour configuration..."
    systemctl stop clamav-freshclam
    systemctl stop clamav-daemon
    
    echo "Mise à jour des définitions de virus..."
    freshclam
    
    echo "Démarrage des services..."
    systemctl start clamav-freshclam
    systemctl start clamav-daemon
    
    echo "Activation du démarrage automatique..."
    systemctl enable clamav-freshclam
    systemctl enable clamav-daemon
}

# Fonction pour installer ClamAV sur CentOS/RHEL
install_centos() {
    echo "Installation du dépôt EPEL..."
    yum install -y epel-release
    
    echo "Installation de ClamAV..."
    yum install -y clamav-server clamav-data clamav-update clamav-filesystem \
        clamav clamav-scanner-systemd clamav-devel clamav-lib clamav-server-systemd
    
    echo "Configuration de ClamAV..."
    setsebool -P antivirus_can_scan_system 1
    
    echo "Mise à jour des définitions de virus..."
    freshclam
    
    echo "Démarrage des services..."
    systemctl start clamd@scan
    systemctl start clamav-freshclam
    
    echo "Activation du démarrage automatique..."
    systemctl enable clamd@scan
    systemctl enable clamav-freshclam
}

# Fonction pour installer ClamAV sur macOS
install_macos() {
    if ! command -v brew &> /dev/null; then
        echo "Homebrew n'est pas installé. Installation en cours..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    
    echo "Installation de ClamAV via Homebrew..."
    brew install clamav
    
    echo "Création du répertoire de configuration..."
    mkdir -p /usr/local/etc/clamav
    
    echo "Téléchargement de la configuration par défaut..."
    if [ ! -f /usr/local/etc/clamav/freshclam.conf ]; then
        cp /usr/local/etc/clamav/freshclam.conf.sample /usr/local/etc/clamav/freshclam.conf
    fi
    
    if [ ! -f /usr/local/etc/clamav/clamd.conf ]; then
        cp /usr/local/etc/clamav/clamd.conf.sample /usr/local/etc/clamav/clamd.conf
    fi
    
    echo "Mise à jour des définitions de virus..."
    freshclam
    
    echo "Pour exécuter le démon ClamAV, utilisez :"
    echo "  clamd -c /usr/local/etc/clamav/clamd.conf --foreground"
}

# Sélection de la procédure d'installation en fonction de la distribution
case $OS in
    debian|ubuntu)
        echo "Détection: Debian/Ubuntu"
        install_debian
        ;;
    centos|rhel|fedora)
        echo "Détection: CentOS/RHEL/Fedora"
        install_centos
        ;;
    darwin)
        echo "Détection: macOS"
        install_macos
        ;;
    *)
        echo "Distribution non supportée: $OS"
        exit 1
        ;;
esac

echo "Installation de ClamAV terminée avec succès!"
echo "Pour tester l'installation, exécutez: clamscan --version"
echo "Pour scanner un répertoire: clamscan -r /chemin/du/dossier"

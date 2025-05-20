import NodeClam from 'clamscan';
import { promises as fs } from 'fs';
import path from 'path';

class VirusScanner {
  private static instance: VirusScanner;
  private scanner: any;
  private isInitialized: boolean = false;

  private constructor() {}

  public static async getInstance(): Promise<VirusScanner> {
    if (!VirusScanner.instance) {
      VirusScanner.instance = new VirusScanner();
      await VirusScanner.instance.initialize();
    }
    return VirusScanner.instance;
  }

  private async initialize(): Promise<void> {
    try {
      const NodeClam = (await import('clamscan')).default;
      const clamscan = await NodeClam.init({
        removeInfected: false, // Ne pas supprimer automatiquement les fichiers infectés
        quarantineInfected: './quarantine', // Dossier de quarantaine
        scanLog: './logs/clamscan.log', // Fichier de log
        debugMode: false,
        fileList: null,
        scanRecursively: true,
        clamdscan: {
          socket: false, // Désactiver le socket Unix
          host: '127.0.0.1', // Adresse du serveur ClamAV
          port: 3310, // Port par défaut de ClamAV
          timeout: 120000, // Timeout de 2 minutes
          localFallback: true, // Utiliser la version locale si le démon n'est pas disponible
          path: '/usr/local/bin/clamscan', // Chemin vers clamscan
          configFile: '/usr/local/etc/clamav/clamd.conf', // Fichier de configuration
          multiscan: true, // Scanner avec plusieurs threads
          reloadDb: false, // Ne pas recharger la base de données à chaque scan
          active: true, // Activer clamdscan
        },
        preference: ['clamdscan', 'clamscan', 'clamav'], // Ordre de préférence des scanners
      });
      this.scanner = clamscan;
      this.isInitialized = true;
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du scanner de virus:', error);
      throw new Error('Impossible d\'initialiser le scanner de virus');
    }
  }

  public async scanFile(filePath: string): Promise<{ isInfected: boolean; viruses?: string[] }> {
    if (!this.isInitialized) {
      throw new Error('Le scanner de virus n\'est pas initialisé');
    }

    try {
      // Vérifier si le fichier existe
      await fs.access(filePath);
      
      // Scanner le fichier
      const { isInfected, viruses } = await this.scanner.isInfected(filePath);
      
      return { isInfected, viruses };
    } catch (error) {
      console.error('Erreur lors de la numérisation du fichier:', error);
      throw new Error('Erreur lors de la numérisation du fichier');
    }
  }
}

export default VirusScanner;

declare module 'clamscan' {
  interface ClamScanOptions {
    removeInfected?: boolean;
    quarantineInfected?: string;
    scanLog?: string;
    debugMode?: boolean;
    fileList?: string | null;
    scanRecursively?: boolean;
    clamdscan?: {
      socket?: boolean | string;
      host?: string;
      port?: number;
      timeout?: number;
      localFallback?: boolean;
      path?: string;
      configFile?: string;
      multiscan?: boolean;
      reloadDb?: boolean;
      active?: boolean;
    };
    preference?: string[];
  }

  interface ScanResult {
    isInfected: boolean;
    viruses?: string[];
    file: string;
  }

  class NodeClam {
    static init(options: ClamScanOptions): Promise<NodeClam>;
    isInfected(filePath: string): Promise<ScanResult>;
  }

  export = NodeClam;
}

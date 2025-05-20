/**
 * Logger simple compatible avec Edge Runtime
 */

// Types de logs
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// Interface du logger
interface EdgeLogger {
  debug: (message: string, ...args: any[]) => void;
  info: (message: string, ...args: any[]) => void;
  warn: (message: string, ...args: any[]) => void;
  error: (message: string, ...args: any[]) => void;
}

// Fonction pour formater la date
const formatDate = (): string => {
  const now = new Date();
  return now.toISOString();
};

// Fonction pour formater le message de log
const formatMessage = (level: LogLevel, message: string, args: any[]): string => {
  const timestamp = formatDate();
  const formattedArgs = args.length > 0 ? ` ${JSON.stringify(args)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${formattedArgs}`;
};

// Création du logger compatible avec Edge Runtime
const logger: EdgeLogger = {
  debug: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(formatMessage('debug', message, args));
    }
  },
  info: (message: string, ...args: any[]) => {
    console.info(formatMessage('info', message, args));
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(formatMessage('warn', message, args));
  },
  error: (message: string, ...args: any[]) => {
    console.error(formatMessage('error', message, args));
  },
};

// Stream pour les logs HTTP (utilisable avec morgan)
const httpLoggerStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export { logger, httpLoggerStream };


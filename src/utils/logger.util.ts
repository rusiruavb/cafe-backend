import { createLogger, format, transports } from 'winston';

const {
  combine, timestamp, printf,
} = format;

const customFormat = printf(
  ({
    level, message, timestamp,
  }) => `${timestamp} ${level}: ${message}`,
);

const logger = createLogger({
  level: 'info',
  format: combine(timestamp({ format: 'HH:mm:ss DD/MM/YYYY' }), customFormat),
  transports: [new transports.Console(), new transports.File({ filename: 'server.log' })],
});

export default logger;

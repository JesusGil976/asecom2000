const levels = ['debug', 'info', 'warn', 'error'];
const configuredLevel = process.env.LOG_LEVEL || 'info';

function log(level, message, data = {}) {
  if (levels.indexOf(level) < levels.indexOf(configuredLevel)) return;

  const output = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...data
  };

  const method = level === 'debug' ? 'log' : level;
  console[method](JSON.stringify(output));
}

module.exports = {
  debug: (message, data) => log('debug', message, data),
  info: (message, data) => log('info', message, data),
  warn: (message, data) => log('warn', message, data),
  error: (message, data) => log('error', message, data)
};

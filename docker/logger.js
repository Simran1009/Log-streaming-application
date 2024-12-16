setInterval(() => {
  const logLevels = ['INFO', 'DEBUG', 'ERROR'];
  const level = logLevels[Math.floor(Math.random() * logLevels.length)];
  const message = `This is a ${level} log at ${new Date().toISOString()}`;
  console.log(`[${level}] ${message}`);
}, 1000);

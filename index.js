const { Monitor } = require('forever-monitor');

const child = new Monitor('./server/index.js', {
    max: 3,
    killTree: true,
    logFile: '/home/pi/Desktop/node_server_logs.txt'
  });

child.on('exit', () => {
  console.log(`Process exited ${new Date().toISOString()}`);
});

child.start();

// This configuration is used to expose QR code in the terminal, you need to set up in package.json as follows: "dev": "pnpm lint && node dev-with-qr.js",

const { exec } = require('child_process');
const qrcode = require('qrcode-terminal');
const os = require('os');

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
}

const ip = getLocalIp();
const port = 5000;
const url = `http://${ip}:${port}`;

const devProcess = exec(`next dev --turbopack -p ${port} -H 0.0.0.0`, (err) => {
  if (err) {
    console.error('Error starting Next.js:', err);
  }
});

// Display QR code in terminal
qrcode.generate(url, { small: true }, (qr) => {
  console.log(`App running at ${url}`);
  console.log('Scan QR code to access:');
  console.log(qr);
});

devProcess.stdout.on('data', (data) => console.log(data.toString()));
devProcess.stderr.on('data', (data) => console.error(data.toString()));

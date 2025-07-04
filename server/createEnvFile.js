const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const envPath = path.resolve(__dirname, '../.env.local');

// Check if file already exists
if (fs.existsSync(envPath)) {
  console.log('\x1b[33m%s\x1b[0m', '.env.local file already exists. Do you want to overwrite it? (y/n)');
  rl.question('', (answer) => {
    if (answer.toLowerCase() !== 'y') {
      console.log('Operation cancelled.');
      rl.close();
      return;
    }
    createEnvFile();
  });
} else {
  createEnvFile();
}

function createEnvFile() {
  console.log('\nPlease provide the following information to create your .env.local file:');
  
  rl.question('\nMongoDB Connection String (mongodb+srv://...): ', (mongodbUri) => {
    rl.question('\nJWT Secret (random string for token encryption): ', (jwtSecret) => {
      rl.question('\nServer Port (default: 5000): ', (port) => {
        rl.question('\nGoogle Maps API Key (for frontend): ', (googleMapsApiKey) => {
          
          // Use default port if not provided
          const finalPort = port || '5000';
          
          // Create the .env.local content
          const envContent = `# MongoDB Connection String
MONGODB_URI=${mongodbUri}

# JWT Secret for authentication
JWT_SECRET=${jwtSecret}

# Server Port
PORT=${finalPort}

# Google Maps API Key (for frontend)
VITE_GOOGLE_MAPS_API_KEY=${googleMapsApiKey}
`;
          
          // Write the file
          fs.writeFileSync(envPath, envContent);
          
          console.log('\n\x1b[32m%s\x1b[0m', '.env.local file has been created successfully!');
          console.log('You can now start the server with: npm run dev:server');
          
          rl.close();
        });
      });
    });
  });
}

rl.on('close', () => {
  process.exit(0);
}); 
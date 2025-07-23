import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
// Render provides the PORT environment variable.
const port = process.env.PORT || 10000; 

// ES module-friendly __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.join(__dirname, 'dist');

// Serve static files from the React app build directory
app.use(express.static(buildPath));

// The "catchall" handler: for any request that doesn't
// match one above, send back the app's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

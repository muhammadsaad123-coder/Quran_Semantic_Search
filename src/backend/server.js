const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Endpoint for search
app.post('/search', (req, res) => {
  const { query, searchType } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  // Run the Python script
  const pythonProcess = spawn('python', [path.join(__dirname, 'search_script.py'), query, searchType]);

  let data = '';

  pythonProcess.stdout.on('data', (chunk) => {
    data += chunk.toString();
  });

  pythonProcess.stderr.on('data', (chunk) => {
    console.error(`stderr: ${chunk}`);
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Failed to process query' });
    }
    res.json(JSON.parse(data));
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Endpoint for search
app.post('/search', (req, res) => {
  const { query, searchType, ngramType } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  let scriptFile = '';
  let args = [];

  if (searchType === 'semantic') {
    // Semantic search
    scriptFile = 'semantic_search.py';
    args = [query];
  } else {
    // Keyword search for unigram or bigram
    scriptFile = 'search_script.py';
    args = [query, ngramType];
  }

  const pythonProcess = spawn('python', [path.join(__dirname, scriptFile), ...args]);

  let data = '';
  let errorData = '';

  // Capture stdout data
  pythonProcess.stdout.on('data', (chunk) => {
    data += chunk.toString();
  });

  // Capture stderr (errors)
  pythonProcess.stderr.on('data', (chunk) => {
    errorData += chunk.toString();
    console.error(`stderr: ${chunk}`);
  });

  // Handle the close event of the Python process
  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Python script exited with code ${code}. Error: ${errorData}`);
      return res.status(500).json({ error: `Python script failed with code ${code}. Error: ${errorData}` });
    }

    try {
      // Parse the JSON output from the Python script
      const result = JSON.parse(data);
      res.json(result);
    } catch (e) {
      console.error('Error parsing JSON output from Python script:', e);
      res.status(500).json({ error: 'Failed to parse Python script output as JSON.' });
    }
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

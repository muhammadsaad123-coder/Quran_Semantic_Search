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
        // Keyword search for unigram or bigram (not implemented here)
        scriptFile = 'search_script.py';
        args = [query, ngramType];
    }

    const pythonProcess = spawn('python', [path.join(__dirname, scriptFile), ...args]);

    let data = '';
    let errorData = '';

    // Capture stdout data (Python output)
    pythonProcess.stdout.on('data', (chunk) => {
        data += chunk.toString();
    });

    // Capture stderr (Python errors)
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
            // Ensure the output from Python is logged before parsing
            console.log('Received data from Python script:', data);  // Add this for debugging
            
            // Parse the accumulated stdout data as JSON
            const result = JSON.parse(data.trim());  // Trim to remove extra spaces/newlines
            res.json(result);
        } catch (e) {
            console.error('Error parsing JSON output from Python script:', e);
            console.error('Received data:', data);  // Log the data that was received
            res.status(500).json({ error: 'Failed to parse Python script output as JSON.' });
        }
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

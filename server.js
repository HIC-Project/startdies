const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5050;

// Middleware
app.use(cors());
app.use(express.json());

const TEST_DATA_PATH = path.join(__dirname, 'TestData.json');

// Helper: Read tests from file
const readTests = () => {
  const data = fs.readFileSync(TEST_DATA_PATH, 'utf-8');
  return JSON.parse(data);
};

// Helper: Save tests to file
const saveTests = (tests) => {
  fs.writeFileSync(TEST_DATA_PATH, JSON.stringify(tests, null, 2), 'utf-8');
};

// Routes

// Get all tests
app.get('/api/tests', (req, res) => {
  const tests = readTests();
  res.json(tests);
});

// Get one test by ID
app.get('/api/tests/:id', (req, res) => {
  const tests = readTests();
  const testId = parseInt(req.params.id);
  const test = tests.find(t => t.id === testId);

  if (!test) {
    return res.status(404).json({ message: 'Test not found' });
  }

  res.json(test);
});

// Create a new test
app.post('/api/tests', (req, res) => {
  const tests = readTests();
  const newTest = req.body;
  newTest.id = Date.now(); // Simple unique ID
  tests.push(newTest);
  saveTests(tests);
  res.status(201).json(newTest);
});

// Update a test
app.put('/api/tests/:id', (req, res) => {
  const tests = readTests();
  const testId = parseInt(req.params.id);
  const updatedTest = req.body;

  const index = tests.findIndex(t => t.id === testId);
  if (index === -1) {
    return res.status(404).json({ message: 'Test not found' });
  }

  tests[index] = { ...tests[index], ...updatedTest };
  saveTests(tests);
  res.json(tests[index]);
});

// Delete a test
app.delete('/api/tests/:id', (req, res) => {
  const tests = readTests();
  const testId = parseInt(req.params.id);
  const filteredTests = tests.filter(t => t.id !== testId);

  if (filteredTests.length === tests.length) {
    return res.status(404).json({ message: 'Test not found' });
  }

  saveTests(filteredTests);
  res.status(204).send(); // No content
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

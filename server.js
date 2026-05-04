const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve design-system files
app.use('/design-system', express.static(path.join(__dirname, 'design-system')));

// Serve components as plain text for Babel to process
app.get('*.jsx', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(__dirname, req.path));
});

// SPA routing - serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Rock N Wok website running on port ${PORT}`);
});

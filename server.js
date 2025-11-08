const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;

// Serve the static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist/myapp')));

// For all other requests, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/myapp/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

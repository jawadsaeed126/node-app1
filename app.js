const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use the environment variable if available.

app.get('/', (req, res) => {
  res.send('Hello from App1!...');
});

app.listen(port, () => {
  console.log(`App1 listening on port ${port}`);
});


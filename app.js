// Require the express module
const express = require('express');
// Create an express application
const app = express();
// Define the port. Use the environment variable PORT if it's available; otherwise, use 3000.
const port = process.env.PORT || 3000;

// Define a route for GET requests to the root URL ("/")
app.get('/', (req, res) => {
  // Send a response containing a message
  res.send('Hello from App1!');
});

// Define a route for GET requests to "/api1"
app.get('/api1', (req, res) => {
  // Send a response specific to api1
  res.send('Response from API1 endpoint');
});

// Start the application, listening on the defined port
app.listen(port, () => {
  // Log a message to the console once the application starts listening
  console.log(`App1 listening on port ${port}`);
});



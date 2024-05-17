const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


// CORS configuration
const corsOptions = {
  origin: 'http://frontend.development.internal',  // Replace with your frontend's actual domain
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,  // If your frontend needs to pass credentials to the backend
};

// Enable CORS with the above options
app.use(cors(corsOptions));


//const allowedOrigins = ['http://frontend.development.internal']; // Service discovery endpoint
//app.use(cors());

app.use(bodyParser.json());

let data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

app.get('/api/items', (req, res) => {
  res.json(data);
});

app.post('/api/items', (req, res) => {
  const newItem = req.body;
  newItem.id = data.length + 1;
  data.push(newItem);
  res.json(newItem);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

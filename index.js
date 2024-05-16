const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

 

const app = express();
const port = 5000;




// Specify your frontend URL here
const allowedOrigins = [
    'http://localhost:3000', // Local development URL
    'http://ecs-LoadBala-EHtVQnf0MWFR-986638486.eu-west-1.elb.amazonaws.com' // ELB URL for production frontend
];

 

app.use(cors());


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

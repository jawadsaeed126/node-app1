const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

 

const app = express();
const port = 3000;




// Specify your frontend URL here
const allowedOrigins = [
    //'http://localhost:3000', // Local development URL
    //'http://ecs-LoadBala-EHtVQnf0MWFR-986638486.eu-west-1.elb.amazonaws.com', // ELB URL for production frontend
    'http://frontend.development.internal' // Service discovery endpoint
];


// CORS options setup
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        // Check if the origin is in the list of allowed origins
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS'), false); // Block the request
        }
    },
    optionsSuccessStatus: 200 // For legacy browsers that choke on 204
};

app.use(cors(corsOptions));


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

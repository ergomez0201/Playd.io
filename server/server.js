const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

// global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello from inside the server!'));
app.get('/api', (req, res) => {
  console.log(req.body);
  res.send('This is your response from the server!');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

// global middleware
app.use(express.json());

app.get('/', (req, res) => res.send('Hello from inside the server!'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

const apiRouter = require('./routes/api');

// global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello from inside the server!'));
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

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

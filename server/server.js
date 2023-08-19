const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));
app.use(cors());
app.use(cookieParser());

const PORT = 3000;

const apiRouter = require('./routes/api');

app.get('/', (req, res) => res.sendStatus(200));
app.use('/api', apiRouter);

app.use((req, res) => res.status(404).json('This page does not exist'));

app.use((err, req, res) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 400,
		message: { err: 'An error occured' },
	};

	const errorObj = Object.assign(defaultErr, err);
	console.log(errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

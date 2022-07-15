require('dotenv').config();

const { Pool } = require('pg');

/* Postgres URI */
const { PG_URI } = process.env;

console.log('inside the model file');

const pool = new Pool({
  connectionString: PG_URI,
  max: 3,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('Here is the query: ', text);
    return pool.query(text, params, callback);
  },
  end: () => pool.end(),
};

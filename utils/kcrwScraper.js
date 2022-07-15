const axios = require('axios');
const { Pool } = require('pg');
const db = require('../server/models/radioShowModels');

// iterate through the URL from November 2, 1994 until today
// Note that today's date is 4/19/2022

// let longDate = new Date(new Date('November 02, 1994'));
// console.log(longDate);
// longDate = JSON.stringify(longDate);
// longDateArr = longDate.split('-').join('/').split('T');
// console.log(longDateArr[0].replace('"', ''));

const year = '2022';
const month = '07';
const day = '01';
const kcrwURL = `https://tracklist-api.kcrw.com/Simulcast/date/${year}/${month}/${day}?page_size=500&page=1`;

axios.get(kcrwURL).then((data) => {
  // actual array is stored in data.data
  // parse through the data for each entry
  for (let i = 0; i < data.data.length; i++) {
    populateSongsTable(data.data[i]);
  }
});

function populateHostTable(trackEntry) {
  const { host } = trackEntry;
  const queryString = `
    INSERT INTO hosts (name)
    VALUES ($1)
    ON CONFLICT (name)
    DO NOTHING
    RETURNING *;
    `;
  const params = [host];
  console.log('inside the for loop');
  db.query(queryString, params, (err, entry) => {
    if (err) console.log(err);
    console.log(entry);
  });
}

function populateSongsTable(trackEntry) {
  const { date, album, spotify_id, title, artist, program_title } = trackEntry;

  const queryString = `
    SELECT _id FROM programs WHERE title='${program_title}';
  `;
  console.log('inside the for loop');
  db.query(queryString, (err, entry) => {
    if (err) console.log(err);
    const programId = entry.rows[0]._id;
    const insertQuery = `
      INSERT INTO tracks (program_id, play_date, spotify_id, album, title, artist)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const params = [programId, date, spotify_id, album, title, artist];
    db.query(insertQuery, params, (err, response) => {
      if (err) console.log(err);
      console.log(response);
    });
  });
}

function populateProgramsTable(trackEntry) {
  const { program_title, host } = trackEntry;

  const queryString = `
    SELECT _id FROM hosts WHERE name='${host}';
  `;
  console.log('inside the for loop');
  db.query(queryString, (err, entry) => {
    if (err) console.log(err);
    const hostId = entry.rows[0]._id;
    const insertQuery = `
      INSERT INTO programs (host_id, title)
      VALUES ($1, $2)
      ON CONFLICT (title)
      DO NOTHING
      RETURNING *
    `;
    const params = [hostId, program_title];
    db.query(insertQuery, params, (err, response) => {
      if (err) console.log(err);
      console.log(response);
    });
  });
}

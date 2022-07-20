const axios = require('axios');

const kcrwController = {};

// kcrwController.getSongs = (req, res, next) => {
//   let { showName, year, month, day } = req.body;
//   if (month < 10) {
//     month = String(month).padStart(2, 0);
//     console.log(month);
//   }
//   if (day < 10) {
//     day = String(day).padStart(2, 0);
//     console.log(day);
//   }
//   axios
//     .get(`https://tracklist-api.kcrw.com/Simulcast/date/${year}/${month}/${day}?page_size=500`)
//     .then((data) => {
//       console.log(typeof data.data[0].play_id);
//       const radioShow = data.data.filter(
//         (songs) => songs.program_title === showName && songs.spotify_id
//       );
//       res.locals.radioShow = radioShow;
//       return next();
//     })
//     .catch((error) => {
//       console.error('Error: ', error);
//     });
// };

kcrwController.getSongs = (req, res, next) => {
  console.log(req.query);
  const { year, month, day } = req.query;
  // axios
  //   .get(`https://tracklist-api.kcrw.com/Simulcast/date/${year}/${month}/${day}?page_size=500`)
  //   .then((data) => {
  //     res.locals.kcrwData = data.data;
  return next();
  // });
};

module.exports = kcrwController;

/*

[1]   {
[1]     affiliateLinkiPhone: 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/search?at=10ld5K&media=music&term=%22Son+Little%22+%22Belladonna%22',
[1]     affiliateLinkiTunes: 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/search?at=10ld5K&media=music&term=%22Son+Little%22+%22Belladonna%22',
[1]     affiliateLinkSpotify: 'spotify:search:Son+Little+Belladonna',
[1]     affiliateLinkAmazon: 'http://www.amazon.com/exec/obidos/external-search?keyword=Son+Little+Belladonna&mode=digital-music&tag=kcco04-20',
[1]     itunes_id: null,
[1]     itunes_time: null,
[1]     itunes_url: null,
[1]     spotify_id: '6E39NM14yu6A6uFjuiQfZt',
[1]     spotify_preview: 'https://p.scdn.co/mp3-preview/25db3095dfb16dbb37d76a81fef578e8429d4b32?cid=61f71d6e30d247dbb387ee7eb52087bf',
[1]     program_id: 'tv',
[1]     program_start: '20:00',
[1]     program_end: '22:00',
[1]     program_title: 'FREAKS ONLY',
[1]     host: 'Ro "Wyldeflower" Contreras',
//NOT INCLUDED IN 1994
[1]     credits: null,
[1]     guest: null,
//
[1]     title: 'Belladonna',
[1]     artist: 'Son Little',
[1]     album: 'Aloha',
[1]     label: 'Anti‐',
[1]     albumImage: 'https://coverartarchive.org/release/c547bfa3-77af-4feb-bb18-1deaf1258eb3/25347259233-250.jpg',
[1]     albumImageLarge: 'https://coverartarchive.org/release/c547bfa3-77af-4feb-bb18-1deaf1258eb3/25347259233-500.jpg',
[1]     year: '2020',
[1]     artist_url: 'http://sonlittlemusic.net/',
[1]     channel: 'Simulcast',
[1]     offset: 3031,
[1]     time: '08:50 PM',
[1]     date: '2022-04-18',
[1]     datetime: '2022-04-18T20:50:31-07:00',
[1]     comments: '',
[1]     play_id: 127052
[1]   },
*/

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './routes/navbar/navbar';
import Music from './routes/music/music';
import About from './routes/about/about';

// styles and assets
import styles from './App.scss';

console.log(styles);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Music />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

// class App extends Component {
//   constructor(props) {
//     super(props);

//     // define initial state

//     this.state = {
//       totalSongs: 0,
//       showHost: '',
//       showTitle: '',
//       showDate: [],
//       songsList: [],
//     };
//     // console.log(this.state);
//     this.getSongs = this.getSongs.bind(this);
//   }

//   getSongs(showName, year, month, day) {
//     const body = {
//       showName,
//       year,
//       month,
//       day,
//     };
//     fetch('/api/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'Application/JSON',
//       },
//       body: JSON.stringify(body),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         const tracksArray = data.trackData.tracks;

//         // checking if tracksArray is null, return initial state
//         // if (!tracksArray) return this.state;

//         return this.setState({
//           totalSongs: tracksArray.length,
//           showHost: data.radioShow[0].host,
//           showTitle: showName,
//           showDate: [year, month, day],
//           songsList: tracksArray,
//         });
//       })
//       .then((data) => {
//         console.log('state: ', this.state);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   }

//   // getSongs('Morning Becomes Eclectic', 2022, 1, 24);

//   render() {
//     return (
//       <main className="outerContainer">
//         <div className="header">
//           <h1 id="appHeader">Playd.io</h1>
//           <h3>Create Playlist from your favorite Radio Show</h3>
//         </div>
//         <div className="showSelectorDiv">
//           <ShowSelector getSongs={this.getSongs} />
//         </div>
//         <div className="showDisplayDiv">
//           <ShowDisplay
//             showTitle={this.state.showTitle}
//             showHost={this.state.showHost}
//             showDate={this.state.showDate}
//           />
//         </div>
//         <div className="songsDisplayDiv">
//           <SongsDisplay
//             totalSongs={this.state.totalSongs}
//             songsList={this.state.songsList}
//             showTitle={this.state.showTitle}
//             showDate={this.state.showDate}
//           />
//         </div>
//       </main>
//     );
//   }
// }

export default App;

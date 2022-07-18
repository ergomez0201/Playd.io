import React from 'react';

function ShowDisplay() {
  return <div>This is the show display</div>;
}

// function ShowDisplay(props) {
//   const [year, month, day] = props.showDate;
//   const date = new Date(year, month - 1, day);
//   return (
//     <div id="showDisplay">
//       <p id="showTitle">Radio Show: {props.showTitle}</p>
//       <p id="showHost">Host(s): {props.showHost}</p>
//       <p id="showDate">Date: {date.toDateString()}</p>
//     </div>
//   );
// }

export default ShowDisplay;

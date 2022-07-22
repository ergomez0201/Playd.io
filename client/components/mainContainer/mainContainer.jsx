import React from 'react';

function MainContainer() {
  const onLoginClick = () => {
    // const win = window.open('http://localhost:8080/api/spotify', '_blank');
    const win = window.open('http://localhost:8080/api/spotify');

    // fetch('/api/spotify')
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  };
  return (
    <div>
      <div>This is the Main Container</div>
      <button type="button" onClick={onLoginClick}>
        Spotify
      </button>
    </div>
  );
}

export default MainContainer;

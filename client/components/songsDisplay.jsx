import React, { Component } from 'react';
import Songs from './songs';

class SongsDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        This is inside the SongsDisplay file
        <Songs />
      </div>
    );
  }
}

export default SongsDisplay;

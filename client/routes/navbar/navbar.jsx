import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import PlaydioLogo from '../../../assets/images/playdio.svg';

import './navbar.styles.scss';

function Navbar() {
  return (
    <>
      <nav>
        {/* <Link to="/"> */}
        <img src={PlaydioLogo} alt="playd.io logo" />
        {/* </Link> */}
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;

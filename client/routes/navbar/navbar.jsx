import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import styles from './navbar.styles.scss';

function Navbar() {
  return (
    <>
      <nav>
        <Link className={styles.logo} to="/">
          <h1>Playd.io</h1>
        </Link>
        <div className="nav-links-container">
          <Link className={styles.navLink} to="/">
            Music
          </Link>
          <Link className={styles.navLink} to="/about">
            About
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;

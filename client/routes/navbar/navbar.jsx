import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isShowDisplayVisibleUpdate } from '../../store/reducers/displayReducer';
import SearchIcon from '../../../assets/images/searchIcon.svg';

import styles from './navbar.styles.scss';

function Navbar() {
  const dispatch = useDispatch();

  return (
    <>
      <nav>
        <Link to="/" onClick={() => dispatch(isShowDisplayVisibleUpdate(true))}>
          <h1 className={styles.logo}>Playd.io</h1>
        </Link>
        <div className="nav-links-container">
          {/* <button
            type="button"
            className={styles.searchButton}
            onClick={() => dispatch(isShowDisplayVisibleUpdate(true))}
          > */}
          {/* <img
              src={SearchIcon}
              alt="search-icon"
              width="40"
              height="40"
              className={styles.search}
            /> */}
          {/* </button> */}
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;

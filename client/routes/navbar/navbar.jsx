import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isShowDisplayVisibleUpdate } from '../../store/reducers/displayReducer';
import PlaydioLogo from '../../../assets/images/playdio.svg';

import './navbar.styles.scss';

function Navbar() {
  const dispatch = useDispatch();

  return (
    <>
      <nav>
        <Link to="/" onClick={() => dispatch(isShowDisplayVisibleUpdate(true))}>
          <img src={PlaydioLogo} alt="playd.io logo" />
        </Link>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;

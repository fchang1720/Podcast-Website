import React from 'react';
import { Link } from 'react-router-dom';
import logo from './pfk.png'
import './style.css'

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-dark mb-4 py-3 flex-row align-center">
      <div className="header-container flex-row justify-space-between-lg justify-center align-center">



        <div className="topnav">
            {Auth.loggedIn() ? (
              <>
                <Link className="btn btn-lg btn-light m-2" to="/me">
                  {Auth.getProfile().data.username}'s profile
                </Link>
                <button className="btn btn-lg btn-light m-2" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-lg btn-light m-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-lg btn-light m-2" to="/signup">
                  Signup
                </Link>
              </>
            )}
        </div>

        <div>
          <Link className="text-dark" to="/">

            <img className="logo" src={logo} alt="pfk" />
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const NavBar = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        
        signOut(auth)
            .then(() => {
            // Sign-out successful.
            navigate('/login'); // Navigate to the login page after successful logout
            })
            .catch((error) => {
            // An error occurred. Handle the error or display a message.
            console.error('Error logging out:', error);
            });
        };

  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="./logo.svg" alt="Logo" width="32" height="32" className="d-inline-block align-text-top me-2" />
            Mickey Arthur's Weather App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-around" id="navbarNav">
            <ul className="navbar-nav  flex-grow-1 justify-content-center">
              <li className="nav-item">
                <a className="nav-link mx-2" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" href="#SearchSection">Search</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" href="#ForecastSection">Forecast</a>
              </li>
            </ul>
            {/* Logout button */}
            <div className="nav-item d-grid gap-2">
              <button
                className="mx-2 btn btn-outline-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
  );
};

export default NavBar;

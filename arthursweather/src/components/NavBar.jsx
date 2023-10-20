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
        <Link className="navbar-brand" to="/">Mickey Arthur's Weather App</Link>
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item ms-5">
              <Link className="nav-link mx-2" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-2" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-2" to="/login">Login</Link>
            </li>
            {/* Logout button */}
            <li className="nav-item">
              <button
                className="nav-link mx-2 btn btn-link"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
